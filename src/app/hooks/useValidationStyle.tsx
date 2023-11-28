import { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { FieldState } from '../types/types';
import { getValidationStyle } from '../../components/Form/Form';

export function useValidationStyleInFormContext(fieldName: string): {
  color: string;
  icon: JSX.Element;
} {
  const { getFieldState } = useFormContext();

  const field = getFieldState(fieldName);

  return useMemo(() => {
    let fieldState = FieldState.NEUTRAL;
    if (field?.error) {
      fieldState = FieldState.ERROR;
    } else if (field?.isTouched && !field?.error) {
      fieldState = FieldState.VALID;
    }
    return getValidationStyle(fieldState);
  }, [field]);
}
