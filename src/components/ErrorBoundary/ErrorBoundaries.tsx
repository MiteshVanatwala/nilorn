import React, { ReactNode } from 'react';
import ErrorPage from './ErrorPage';
import { reportErrorToService } from '../../app/utils/errorReporting';

type ErrorBoundaryProps = {
  children: ReactNode;
  /**
   * Optional custom fallback UI. If not provided, a full-page `ErrorPage` is shown.
   */
  fallback?: ReactNode;
  /**
   * Logical name to help identify where the error occurred in monitoring.
   */
  boundaryName?: string;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown, errorInfo: { componentStack: string }) {
    reportErrorToService(
      error,
      { componentStack: errorInfo.componentStack },
      { boundaryName: this.props.boundaryName }
    );
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return <ErrorPage />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

