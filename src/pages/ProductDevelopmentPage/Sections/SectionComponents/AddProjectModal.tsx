import {
  Button,
  HStack,
  Input,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/react';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useCreateProject } from '../../../../app/api/Projects';
import { ModalContext } from '../../../../app/context/ModalContext';
import RemixIcon from '../../../../components/Icon/RemixIcon';
import ModalHeading from '../../../../components/Modal/ModalHeading';
import { SPACE } from '../../../../theme/Constants';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import ControlWrapper from '../../../../components/Form/ControlWrapper';
type Props = {
  setDefaultProject(val: string): void;
  clientNo: string;
};

const AddProjectModal = ({ setDefaultProject, clientNo }: Props) => {
  const name = 'projectName';
  const { t } = useTranslation();
  const { close } = useContext(ModalContext);
  const methods = useForm({mode: 'onChange'});
  const { errors } = methods.formState;

  const { mutate: createProject } = useCreateProject();

  const onCancel = () => {
    close();
  };

  async function onSubmit(FieldValues: FieldValues) {
    const projectData = {
      clientNo: clientNo,
      projectCode: FieldValues.projectName,
    };
    createProject(projectData, {
      onSuccess: () => {
        close();
      },
    });
    setDefaultProject(FieldValues.projectName);
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <ModalBody>
          <ModalHeading title={t('PD.AddProject')} />
          <ControlWrapper
            name={name}
            label={`${t('PD.ProjectName')} *`}
            errors={errors}>
            <Input
              variant={'standard'}
              {...methods.register(name, {
                required: {
                  value: true,
                  message: `${t('Errors.ProjectName')}`,
                },
                maxLength: {
                  value: 30,
                  message: `${t('Errors.ProjectNameLength')}`,
                },
              })}
            />
          </ControlWrapper>
        </ModalBody>
        <ModalFooter justifyContent={'center'}>
          <HStack spacing={SPACE.LG} marginTop={SPACE.XL}>
            <Button
              type="submit"
              variant={'primary'}
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
    </FormProvider>
  );
};

export default AddProjectModal;
