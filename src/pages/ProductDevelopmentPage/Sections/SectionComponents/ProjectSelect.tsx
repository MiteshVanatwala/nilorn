import { useTranslation } from 'react-i18next';
import { useFormContext } from 'react-hook-form';
import { SelectOption } from '../../../../app/types/types';
import Select from '../../../../components/Form/Select';
import { MenuListProps } from 'chakra-react-select';
import { Box, Button } from '@chakra-ui/react';
import { useModal } from '../../../../app/hooks/useModal';
type Props = {
  options: SelectOption[];
  createNew: boolean;
};
const MenuListWithAddBtn = ({
  children,
}: MenuListProps<SelectOption, boolean, any>) => {
  const { t } = useTranslation();
  const { handleModal } = useModal();

  return (
    <Box>
      <Button
        variant={'secondarySmall'}
        onClick={() => handleModal(<div>Modal</div>)}
        rightIcon={<i className={'ri-add-line'} />}>
        {t('Common.Add')}
      </Button>
      {children}
    </Box>
  );
};

const ProjectSelect = ({ options, createNew }: Props) => {
  const { t } = useTranslation();
  const { getValues } = useFormContext();
  options = [{ label: 'any', value: 'T' }];
  return (
    <Select
      placeholder={t('PD.Project')}
      name="project"
      invisible={!createNew}
      options={options}
      defaultValue={options.find(co => co.value === getValues('project'))}
      components={{ MenuList: MenuListWithAddBtn }}
    />
  );
};

export default ProjectSelect;
