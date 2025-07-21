import { useTranslation } from 'react-i18next';
import AccordionItem from '../../../components/AccordionItem/AccordionItem';
import InputField from '../../../components/Form/InputField';
import { HStack } from '@chakra-ui/react';
import { useWatch } from 'react-hook-form';

type Props = {
  disableEdit?: boolean;
  displayPlaecholder?: boolean; // Optional prop to control placeholder display
};

const ProjectGeneralSection = ({ disableEdit, displayPlaecholder }: Props) => {
  const { t } = useTranslation();
  const projectId = useWatch({ name: 'code' });
  return (
    <AccordionItem title={`${t('PD.AccordionLabels.General')}`}>
      <HStack>
        <InputField
          name={'clientNo'}
          label={t('ManageData.ClientNo')}
          placeholder={displayPlaecholder ? t('Common.Placeholder') : ''}
          readonly={true}
        />
        <InputField
          name={'clientName'}
          label={t('ManageData.ClientName')}
          placeholder={displayPlaecholder ? t('Common.Placeholder') : ''}
          readonly={true}
        />
        <InputField
          name={'code'}
          label={t('ManageData.ProjectCode')}
          placeholder={displayPlaecholder ? t('Common.Placeholder') : ''}
          readonly={disableEdit || !projectId}
          registerOptions={{ maxLength: 50 }}
        />
        <InputField
          name={'description'}
          label={t('ManageData.ProjectDescription')}
          placeholder={displayPlaecholder ? t('Common.Placeholder') : ''}
          readonly={disableEdit || !projectId}
          registerOptions={{ maxLength: 50 }}
        />
      </HStack>
    </AccordionItem>
  );
};

export default ProjectGeneralSection;
