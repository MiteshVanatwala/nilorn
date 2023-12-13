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
import { FormEvent, useContext, useState } from 'react';
import { ModalContext } from '../../../../app/context/ModalContext';
import FormLabelComponent from '../../../../components/Form/FormLabelComponent';
type Props = {
  setDefaultProject(val: string): void;
};

const AddProjectModal = ({ setDefaultProject }: Props) => {
  const { t } = useTranslation();
  const { close } = useContext(ModalContext);
  const [errorMsgName, setErrorMsgName] = useState<string | undefined>();

  const [projectName, setProjectName] = useState<string>('');
  const onCancel = () => {
    close();
  };
  async function onSubmit(): Promise<void> {
    if (projectName === '') {
      setErrorMsgName(`${t('Errors.ProjectName')}`);
    } else {
      setErrorMsgName(undefined);
    }
    if (projectName !== '') {
      //TODO Create project
      setDefaultProject(projectName);
      close();
    }
  }
  const onFormSubmit = (e: FormEvent) => {
    e.preventDefault();
  };
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
