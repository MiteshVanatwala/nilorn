import { useTranslation } from 'react-i18next';
import {
  Button,
  HStack,
  Input,
  ModalBody,
  ModalFooter,
  Text,
} from '@chakra-ui/react';
import { COLORS, SPACE } from '../../../../theme/Constants';
import ModalHeading from '../../../../components/Modal/ModalHeading';
import { FormEvent, useContext, useEffect, useState } from 'react';
import { ModalContext } from '../../../../app/context/ModalContext';
import FormLabelComponent from '../../../../components/Form/FormLabelComponent';
import { useCreateProject } from '../../../../app/api/Projects';
import { useToast } from '../../../../app/hooks/useToast';
type Props = {
  setDefaultProject(val: string): void;
  clientNo: string;
};

const AddProjectModal = ({ setDefaultProject, clientNo }: Props) => {
  const { showToast } = useToast();
  const { t } = useTranslation();
  const { close } = useContext(ModalContext);
  const [errorMsgName, setErrorMsgName] = useState<string | undefined>();

  const [projectName, setProjectName] = useState<string>('');
  const onCancel = () => {
    close();
  };
  const { mutate: createProject, isSuccess, isError } = useCreateProject();
  async function onSubmit(): Promise<void> {
    if (projectName === '') {
      setErrorMsgName(`${t('Errors.ProjectName')}`);
    } else {
      setErrorMsgName(undefined);
    }
    if (projectName !== '') {
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

      showToast({
        status: 'success',
        description: t('PD.ProjectCreated'),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError]);
  useEffect(() => {
    if (isError) {
      showToast({
        status: 'error',
        description: t('Errors.ProjectCreate'),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError]);
  return (
    <form onSubmit={onFormSubmit}>
      <ModalBody>
        <ModalHeading title={t('PD.AddProject')} />
        <FormLabelComponent
          label={`${t('PD.ProjectName')} *`}
          name={'projectName'}
        />
        <Input
          variant={'standard'}
          name={'projectName'}
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
            rightIcon={<i className="ri-save-line" />}>
            {t('Common.Save')}
          </Button>
          <Button
            variant={'secondary'}
            onClick={onCancel}
            rightIcon={<i className="ri-close-line" />}>
            {t('Common.Cancel')}
          </Button>
        </HStack>
      </ModalFooter>
    </form>
  );
};

export default AddProjectModal;
