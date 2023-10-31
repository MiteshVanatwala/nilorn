import { Controller, FieldError, useFormContext } from 'react-hook-form';
import ControlWrapper from './ControlWrapper';
import SelectBase from './SelectBase';
import { FormInputProps, SelectOption } from '../../app/types/types';
import React, { useEffect } from 'react';
import { GroupSelectOption } from '../Filter/FilterHelper';

interface Props extends Omit<FormInputProps, 'defaultValue'> {
  options: SelectOption[] | GroupSelectOption[];
  placeholder?: string;
  defaultValue?: SelectOption | undefined;
  isMulti?: boolean;
  searchable?: boolean;
}

const Select = ({
  name,
  label,
  options,
  placeholder,
  registerOptions,
  helperText,
  defaultValue,
  isMulti = false,
  hideValidationStyle,
  searchable = true,
}: Props) => {
  const {
    control,
    setValue: setFormContextValue,
    formState,
  } = useFormContext();
  let error = formState.errors?.[name] as FieldError | undefined;

  useEffect(() => {
    setFormContextValue(name, defaultValue?.value);
  }, [defaultValue, name, setFormContextValue]);
  return (
    <ControlWrapper
      name={name}
      label={label}
      required={registerOptions?.required}
      errors={error}
      helperText={helperText}
      hideValidationStyle={hideValidationStyle}>
      <Controller
        control={control}
        name={name}
        rules={registerOptions}
        defaultValue={defaultValue?.value}
        render={({ field: { onChange, onBlur, name, ref } }) => {
          return (
            <SelectBase
              isMulti={isMulti}
              isControlled={false}
              name={name}
              passRef={ref}
              onChange={
                isMulti
                  ? onChange
                  : (option: any, action) => onChange(option?.value)
              }
              onBlur={onBlur}
              defaultValue={defaultValue}
              options={options}
              placeholder={placeholder}
              isSearchable={searchable}
            />
          );
        }}
      />
    </ControlWrapper>
  );
};

export default Select;
