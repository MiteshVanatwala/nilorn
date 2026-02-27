type ErrorExtras = Record<string, unknown> | undefined;

export type ErrorReportingContext = {
  boundaryName?: string;
  extras?: ErrorExtras;
};

const SENSITIVE_KEYS = [
  'password',
  'token',
  'authorization',
  'cookie',
  'email',
  'name',
  'address',
  'phone',
  'ssn',
];

const MAX_STRING_LENGTH = 500;

function isSensitiveKey(key: string) {
  const lowerKey = key.toLowerCase();
  return SENSITIVE_KEYS.some(sensitive =>
    lowerKey.includes(sensitive.toLowerCase())
  );
}

function scrubValue(value: unknown): unknown {
  if (value === null || value === undefined) {
    return value;
  }

  if (typeof value === 'string') {
    if (value.length > MAX_STRING_LENGTH) {
      return `${value.substring(0, MAX_STRING_LENGTH)}…[truncated]`;
    }
    return value;
  }

  if (typeof value !== 'object') {
    return value;
  }

  if (Array.isArray(value)) {
    return value.slice(0, 20).map(item => scrubValue(item));
  }

  const obj = value as Record<string, unknown>;
  const scrubbed: Record<string, unknown> = {};

  Object.keys(obj).forEach(key => {
    if (isSensitiveKey(key)) {
      scrubbed[key] = '[REDACTED]';
    } else {
      scrubbed[key] = scrubValue(obj[key]);
    }
  });

  return scrubbed;
}

export function reportErrorToService(
  error: unknown,
  errorInfo?: { componentStack?: string },
  context?: ErrorReportingContext
) {
  const normalizedError =
    error instanceof Error
      ? error
      : new Error(typeof error === 'string' ? error : 'Unknown error');

  const payload = {
    name: normalizedError.name,
    message: normalizedError.message,
    stack: normalizedError.stack,
    componentStack: errorInfo?.componentStack,
    boundaryName: context?.boundaryName,
    extras: scrubValue(context?.extras),
  };

  // TODO: Integrate with a real error monitoring service (e.g. Sentry, Datadog).
  // Keep this lightweight and non-blocking.
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.error('[ErrorBoundary] Captured error', payload);
  }
}

