import {
  Button,
  HStack,
  Input,
  ModalBody,
  ModalFooter,
  Text,
} from '@chakra-ui/react';
import { FormEvent, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useCreateProject } from '../../../../app/api/Projects';
import { ModalContext } from '../../../../app/context/ModalContext';
import FormLabelComponent from '../../../../components/Form/FormLabelComponent';
import RemixIcon from '../../../../components/Icon/RemixIcon';
import ModalHeading from '../../../../components/Modal/ModalHeading';
import { COLORS, SPACE } from '../../../../theme/Constants';

type Props = {
  setDefaultProject: (val: string) => void;
  clientNo: string;
};

const AddProjectModal = ({ setDefaultProject, clientNo }: Props) => {
  const { t } = useTranslation();
  const { close } = useContext(ModalContext);
  const [errorMsgName, setErrorMsgName] = useState<string | undefined>();

  const [projectName, setProjectName] = useState<string>('');
  const onCancel = () => {
    close();
  };

  const { mutate: createProject, isSuccess } = useCreateProject();

  async function onSubmit(): Promise<void> {
    if (projectName === '') {
      setErrorMsgName(`${t('ManageData.Feedback.Errors.ProjectName')}`);
    } else if (projectName.length > 30) {
      setErrorMsgName(`${t('ManageData.Feedback.Errors.ProjectNameLength')}`);
    } else {
      setErrorMsgName(undefined);
    }
    if (projectName !== '' && projectName.length <= 30) {
      const projectData = {
        clientNo: clientNo,
        projectCode: projectName,
      };
      createProject(projectData);
      setDefaultProject(projectName);
    }
  }

  const onFormSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (isSuccess) {
      close();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  return (
    <form onSubmit={onFormSubmit}>
      <ModalBody>
        <ModalHeading title={t('ManageData.AddProject')} />
        <FormLabelComponent
          label={`${t('ManageData.ProjectName')} *`}
          name={'projectName'}
        />
        <Input
          variant={'standard'}
          name={'projectName'}
          autoFocus
          onChange={e => {
            setProjectName(e.target.value);
          }}
        />
        {errorMsgName && <Text color={COLORS.ERROR}>{errorMsgName}</Text>}
      </ModalBody>
      <ModalFooter justifyContent={'center'}>
        <HStack spacing={SPACE.LG} marginTop={SPACE.XL}>
          <Button
            type="submit"
            variant={'primary'}
            onClick={onSubmit}
            rightIcon={<RemixIcon component="i" icon="SAVE_LINE" />}>
            {t('Common.Save')}
          </Button>
          <Button
            variant={'secondary'}
            onClick={onCancel}
            rightIcon={<RemixIcon component="i" icon="CLOSE_LINE" />}>
            {t('Common.Cancel')}
          </Button>
        </HStack>
      </ModalFooter>
    </form>
  );
};

export default AddProjectModal;
