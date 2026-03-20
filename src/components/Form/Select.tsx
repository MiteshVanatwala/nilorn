import { MultiValue } from 'chakra-react-select';
import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FormInputProps, SelectOption } from '../../app/types/types';
import { GroupSelectOption } from '../../app/utils/FilterHelper';
import ControlWrapper from './ControlWrapper';
import SelectBase from './SelectBase';
import { useEffect } from 'react';

interface Props<IsMulti extends boolean = false>
  extends Omit<FormInputProps, 'defaultValue'> {
  options: SelectOption[] | GroupSelectOption[];
  placeholder?: string;
  defaultValue?: true extends IsMulti
    ? MultiValue<SelectOption> | null
    : SelectOption | null;
  isMulti?: IsMulti;
  searchable?: boolean;
  showSelectedCount?: boolean;
  invisible?: boolean;
  components?: any;
  isDisabled?: boolean;
  value?: true extends IsMulti
    ? MultiValue<SelectOption> | null
    : SelectOption | null;
  isControlled?: boolean;
  returnFullObject?: boolean;
}

const Select = <IsMulti extends boolean = false>({
  name,
  label,
  options,
  placeholder,
  registerOptions,
  helperText,
  defaultValue,
  isMulti,
  hideValidationStyle,
  searchable = true,
  showSelectedCount = false,
  invisible = false,
  components,
  isDisabled = false,
  changelog,
  value,
  isControlled = false,
  returnFullObject = false,
}: Props<IsMulti>) => {
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
    getValues,
    setValue,
  } = useFormContext();
 // Helper function to extract primitive values from SelectOptions
  const extractValue = (val: any): any => {
    if (!val) return val;
    // Handle deeply nested objects by recursively extracting
    if (typeof val === 'object' && 'value' in val) {
      return extractValue(val.value); // Recursive to handle nested objects
    }
    return val;
  };

  const extractValues = (vals: any): any => {
    if (!vals) return vals;
    if (Array.isArray(vals)) {
      return vals.map(extractValue);
    }
    return extractValue(vals);
  };

  // Extract primitive value from defaultValue if returnFullObject is false
  const processedDefaultValue = (() => {
    if (returnFullObject || !defaultValue) {
      return defaultValue;
    }
    return extractValues(defaultValue);
  })();

  // Extract primitive value from controlled value if returnFullObject is false
  const processedValue = (() => {
    if (!isControlled || returnFullObject || !value) {
      return value;
    }
    return extractValues(value);
  })();

  // Ensure form state always contains primitives when returnFullObject=false
  useEffect(() => {
    if (returnFullObject) return;

    const currentValue = getValues(name);
    
    if (!isMulti && currentValue && typeof currentValue === 'object' && 'value' in currentValue) {
      // Single select: object found, extract primitive
      setValue(name, currentValue.value, { shouldDirty: false, shouldTouch: false, shouldValidate: false });
    } else if (isMulti && Array.isArray(currentValue)) {
      // Multi select: check if any items are objects
      const hasObjects = currentValue.some((item: any) => 
        item && typeof item === 'object' && 'value' in item
      );
      if (hasObjects) {
        const primitives = currentValue.map((item: any) => 
          item && typeof item === 'object' && 'value' in item ? item.value : item
        );
        setValue(name, primitives, { shouldDirty: false, shouldTouch: false, shouldValidate: false });
      }
    }
  }, [name, isMulti, returnFullObject, getValues, setValue]);

  return (
    <ControlWrapper
      name={name}
      label={label}
      required={registerOptions?.required}
      errors={errors}
      helperText={helperText}
      hideValidationStyle={hideValidationStyle}
      changelog={changelog}>
      <Controller
        control={control}
        name={name}
        rules={registerOptions}
        defaultValue={processedDefaultValue}
        render={({
          field: { onChange, onBlur, name, ref, value: controllerValue },
        }) => {
          // Convert string/primitive values to SelectOption objects for display
          let displayValue = isControlled ? processedValue : controllerValue;
          
          if (!returnFullObject && displayValue !== null && displayValue !== undefined) {
            if (!isMulti) {
              // Single select: if we have a primitive value, find the matching option
              if (typeof displayValue === 'string' || typeof displayValue === 'number') {
                const flatOptions = (options as any) || [];
                const foundOption = flatOptions.find((opt: any) => 
                  opt && typeof opt === 'object' && 'value' in opt && opt.value === displayValue
                );
                // Use found option if available, otherwise set to null for clean state
                displayValue = foundOption !== undefined ? foundOption : null;
              } else if (typeof displayValue === 'object' && 'value' in displayValue) {
                // If somehow an object leaked through, extract its value and find the option
                const flatOptions = (options as any) || [];
                const foundOption = flatOptions.find((opt: any) => 
                  opt && typeof opt === 'object' && 'value' in opt && opt.value === displayValue.value
                );
                displayValue = foundOption !== undefined ? foundOption : null;
              }
            } else if (isMulti && Array.isArray(displayValue)) {
              // Multi-select: convert array of primitives to array of SelectOptions
              const flatOptions = (options as any) || [];
              displayValue = displayValue.map((val: any) => {
                if (typeof val === 'string' || typeof val === 'number') {
                  const foundOption = flatOptions.find((opt: any) => 
                    opt && typeof opt === 'object' && 'value' in opt && opt.value === val
                  );
                  return foundOption;
                } else if (val && typeof val === 'object' && 'value' in val) {
                  const foundOption = flatOptions.find((opt: any) => 
                    opt && typeof opt === 'object' && 'value' in opt && opt.value === val.value
                  );
                  return foundOption;
                }
                return null;
              }).filter(opt => opt !== null && opt !== undefined);
            }
          }

          return (
            <SelectBase
              isMulti={isMulti}
              isSelected={
                (isMulti && controllerValue?.length) ||
                (!isMulti && !!controllerValue)
              }
              isControlled={true}
              readOnly={isDisabled}
              name={name}
              value={displayValue || undefined}
              invisible={invisible}
              passRef={ref}
              showSelectedCount={showSelectedCount}
              onChange={
                isMulti
                  ? (options: any, action) => {
                      if (returnFullObject) {
                        onChange(options, action);
                      } else {
                        // Extract values from array of SelectOptions
                        const values = options ? options.map((opt: any) => opt?.value ?? opt) : options;
                        onChange(values, action);
                      }
                    }
                  : (option: any, action) => {
                      const valueToStore = returnFullObject ? option : (option?.value ?? option);
                      onChange(valueToStore, action);
                    }
              }
              onBlur={onBlur}

              defaultValue={undefined}
              options={options}
              placeholder={
                showSelectedCount && getValues(name)?.length
                  ? `${t('Filter.NumSelected', {
                      num: getValues(name)?.length,
                    })}`
                  : placeholder
              }
              isSearchable={searchable}
              components={components}
            />
          );
        }}
      />
    </ControlWrapper>
  );
};

export default Select;
