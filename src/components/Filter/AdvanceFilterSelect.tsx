import SelectBase from '../Form/SelectBase';
import {
  ActionMeta,
  DropdownIndicatorProps,
  MultiValue,
  components,
} from 'chakra-react-select';
import { useTranslation } from 'react-i18next';
import { COLORS } from '../../theme/Constants';
import { SelectOption } from '../../app/types/types';
import RemixIcon from '../Icon/RemixIcon';

const DropdownIndicator = (props: DropdownIndicatorProps) => {
  return (
    <components.DropdownIndicator {...props}>
      <RemixIcon component='Text' color={COLORS.WHITE} icon='ADD_LINE' />
    </components.DropdownIndicator>
  );
};

type Props<T> = {
  name: string;
  options: SelectOption<T>[];
  onChange: (
    selectedOption: MultiValue<SelectOption<T>> | undefined,
    actionMeta: ActionMeta<SelectOption<T>>
  ) => void;
  value: MultiValue<SelectOption<T>>;
  placeholder?: string;
  hideSelected?: boolean;
};

const AdvanceFilterSelect = <T extends object>({
  name,
  options,
  value,
  onChange,
  placeholder,
  hideSelected,
}: Props<T>) => {
  const { t } = useTranslation();

  return (
    <SelectBase
      name={name}
      isMulti={true}
      options={options}
      value={value}
      isSearchable={true}
      showSelectedCount={true}
      dark={true}
      hideSelected={hideSelected}
      components={{ DropdownIndicator }}
      placeholder={
        hideSelected
          ? placeholder
          : value.length
          ? `${t('Filter.NumSelected', { num: value.length })}`
          : placeholder
          ? placeholder
          : `${t('Filter.Select')}`
      }
      onChange={(option, event) => {
        onChange(option, event);
      }}
    />
  );
};

export default AdvanceFilterSelect;
