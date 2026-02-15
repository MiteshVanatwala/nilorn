import { MultiValue } from 'chakra-react-select';
import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FormInputProps, SelectOption } from '../../app/types/types';
import { GroupSelectOption } from '../../app/utils/FilterHelper';
import ControlWrapper from './ControlWrapper';
import SelectBase from './SelectBase';

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
}: Props<IsMulti>) => {
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
    getValues,
  } = useFormContext();

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
        defaultValue={defaultValue}
        render={({
          field: { onChange, onBlur, name, ref, value: controllerValue },
        }) => {
          return (
            <SelectBase
              isMulti={isMulti}
              isSelected={
                (isMulti && controllerValue?.length) ||
                (!isMulti && !!controllerValue)
              }
              isControlled={isControlled}
              readOnly={isDisabled}
              name={name}
              value={isControlled ? (value || undefined) : undefined}
              invisible={invisible}
              passRef={ref}
              showSelectedCount={showSelectedCount}
              onChange={
                isMulti
                  ? onChange
                  : (option: any, action) => onChange(option?.value)
              }
              onBlur={onBlur}
              defaultValue={defaultValue}
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
