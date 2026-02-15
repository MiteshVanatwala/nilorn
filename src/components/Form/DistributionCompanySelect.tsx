import { useTranslation } from 'react-i18next';
import Select from './Select';
import { FormInputProps } from '../../app/types/types';
import { useGetDistributionCompaniesOption } from '../../app/api/distributionCompanies';

interface Props extends FormInputProps {
  isSourcingCompany?: boolean;
  isDisabled?: boolean;
  isControlled?: boolean;
  placeholder?: string;
}

const DistributionCompanySelect = ({
  name,
  label,
  registerOptions,
  defaultValue,
  isSourcingCompany = false,
  isDisabled = false,
  isControlled = false,
  placeholder,
}: Props) => {
  const { t } = useTranslation();
  const { data: options } = useGetDistributionCompaniesOption(
    /* enable = */ true
  );

  return (
    <Select
      name={name}
      label={label ?? t('PriceCalc.DistributionCompany')}
      options={(options as any) ?? []}
      placeholder={placeholder ?? t('Common.Select')}
      registerOptions={registerOptions}
      defaultValue={defaultValue}
      isDisabled={isDisabled}
      isControlled={isControlled}
      returnFullObject={true}
    />
  );
};

export default DistributionCompanySelect;
