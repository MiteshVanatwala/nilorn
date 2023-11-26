import SelectBase from '../Form/SelectBase';
import {
  ActionMeta,
  DropdownIndicatorProps,
  MultiValue,
  components,
} from 'chakra-react-select';
import { useTranslation } from 'react-i18next';
import { Text } from '@chakra-ui/react';
import { COLORS } from '../../theme/Constants';
import { AdvanceFilter, SelectOption } from '../../app/types/types';

const DropdownIndicator = (props: DropdownIndicatorProps) => {
  return (
    <components.DropdownIndicator {...props}>
      <Text as={'i'} color={COLORS.WHITE} className={'ri-add-line'} />
    </components.DropdownIndicator>
  );
};

type Props = {
  options: SelectOption<AdvanceFilter>[];
  onChange: (
    selectedOption: MultiValue<SelectOption<AdvanceFilter>> | undefined,
    actionMeta: ActionMeta<SelectOption<AdvanceFilter>>
  ) => void;
  value: MultiValue<SelectOption<AdvanceFilter>>;
  placeholder?: string;
};

const AdvanceFilterSelect = ({
  options,
  value,
  onChange,
  placeholder,
}: Props) => {
  const { t } = useTranslation();

  return (
    <SelectBase
      name="ov-advance"
      isMulti={true}
      options={options}
      value={value}
      isSearchable={true}
      showSelectedCount={true}
      dark={true}
      components={{ DropdownIndicator }}
      placeholder={
        value.length
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
