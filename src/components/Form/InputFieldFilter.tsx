import { Input } from '@chakra-ui/react';
import { Controller, FieldError, useFormContext } from 'react-hook-form';
import { FormInputProps, SelectOption } from '../../app/types/types';
import { HTMLInputTypeAttribute, useEffect } from 'react';
import ControlWrapper from './ControlWrapper';

interface Props extends FormInputProps {
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  defaultValue?: string | number | SelectOption;
  variant?: 'standard' | 'light' | 'outline' | 'filled';
  filterLabel?: string;
  isDisabled?: boolean;
}

const InputFieldFilter = ({
  name,
  placeholder,
  defaultValue,
  type = 'text',
  variant = 'standard',
  isDisabled = false,
  filterLabel,
}: Props) => {
  const { formState, setValue, control, getValues } = useFormContext();
  let error = formState.errors?.[name] as FieldError | undefined;

  useEffect(() => {
    if (defaultValue) {
      if (typeof getValues(name) === 'string') {
        setValue(name, {
          value: defaultValue,
          label: defaultValue,
          filterLabel: filterLabel,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <ControlWrapper name={name} errors={error}>
      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue}
        render={({ field: { value, onChange } }) => {
          return (
            <Input
              variant={variant}
              disabled={isDisabled}
              placeholder={placeholder}
              value={value?.value ? value?.value : ''}
              type={type}
              height={'auto'}
              name={name}
              onChange={e => {
                setValue(name, {
                  value: e.target.value,
                  label: e.target.value,
                  filterLabel: filterLabel,
                });
              }}
            />
          );
        }}
      />
    </ControlWrapper>
  );
};

export default InputFieldFilter;
