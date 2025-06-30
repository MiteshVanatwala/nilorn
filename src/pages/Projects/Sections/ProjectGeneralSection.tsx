import { useTranslation } from 'react-i18next';
import AccordionItem from '../../../components/AccordionItem/AccordionItem';
import InputField from '../../../components/Form/InputField';
import { HStack } from '@chakra-ui/react';
import TextArea from '../../../components/Form/TextArea';
import { useWatch } from 'react-hook-form';

type Props = {
  disableEdit?: boolean;
};

const ProjectGeneralSection = ({ disableEdit }: Props) => {
  const { t } = useTranslation();
  const projectId = useWatch({ name: 'code' });
  return (
    <AccordionItem title={`${t('PD.AccordionLabels.General')}`}>
      <HStack>
        <InputField
          name={'clientNo'}
          label={t('ManageData.ClientNo')}
          placeholder={t('Common.Placeholder')}
          readonly={true}
        />
        <InputField
          name={'clientName'}
          label={t('ManageData.ClientName')}
          placeholder={t('Common.Placeholder')}
          readonly={true}
        />
        <InputField
          name={'code'}
          label={t('ManageData.ProjectCode')}
          placeholder={t('Common.Placeholder')}
          readonly={disableEdit || !projectId}
        />
        <TextArea
          name={'description'}
          label={t('ManageData.ProjectDescription')}
          placeholder={t('Common.Placeholder')}
          readonly={disableEdit || !projectId}
        />
      </HStack>
    </AccordionItem>
  );
};

export default ProjectGeneralSection;
