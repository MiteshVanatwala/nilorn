import { Grid, GridItem } from '@chakra-ui/react';
import ProjectsActionBar from './ProjectsActionBar';
import {
  Dispatch,
  Fragment,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { SelectOption } from '../../../../app/types/types';
import {
  useGetProjectCard,
  useGetProjectsOptions,
} from '../../../../app/api/Projects';
import { useTranslation } from 'react-i18next';
import { GRID, SPACE } from '../../../../theme/Constants';
import ControlWrapper from '../../../../components/Form/ControlWrapper';
import useFilterOptions from '../../../../app/hooks/useFilterOption';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { SESSION_STORAGE } from '../../../../app/utils/constant';
import LeavePageBlocker from '../../../../components/Modal/LeavePageBlocker';
import SelectBase from '../../../../components/Form/SelectBase';

type Props = {
  setSelectedProjectCode: Dispatch<SetStateAction<string | undefined>>;
  setSelectedClientNo: Dispatch<SetStateAction<string | undefined>>;
  lastModified?: Date;
  clientOptions?: SelectOption[];
};

const ProjectsTopSection = ({
  setSelectedProjectCode,
  setSelectedClientNo,
}: Props) => {
  const { t } = useTranslation();
  const { setValue, reset } = useFormContext();
  const clientOptions = useFilterOptions('clients', true);
  const clientNo = useWatch({ name: 'clientNo' });
  const projectCode = useWatch({ name: 'projectCode' });
  const code = useWatch({ name: 'code' });
  const lastModified = useWatch({ name: 'lastModified' });
  const { data: projectOptionItems } = useGetProjectsOptions(
    clientNo,
    typeof clientNo === 'string'
  );

  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [nextClientNo, setNextClientNo] = useState('');
  const [nextProjectCode, setNextProjectCode] = useState('');

  const projectOptions = useMemo(() => {
    return !!projectOptionItems ? (projectOptionItems as SelectOption[]) : [];
  }, [projectOptionItems]);
  const [showLeavePageBlocker, setShowLeavePageBlocker] = useState(false);
  const [optionItems, setOptionItems] =
    useState<SelectOption[]>(projectOptions);

  const { data: projectCard } = useGetProjectCard(
    clientNo ?? '',
    projectCode ?? ''
  );

  useEffect(() => {
    if (!!clientNo && !!projectCode) {
      if (code !== projectCode) {
        reset({
          ...projectCard,
          projectCode: projectCode,
          clientNo: clientNo,
          code: code,
        });
      } else {
        reset({
          ...projectCard,
          projectCode: projectCode,
          clientNo: clientNo,
          code: projectCode,
        });
      }
    } else {
      reset({
        clientNo: clientNo,
        projectCode: projectCode,
        code: projectCode,
        members: [],
        description: '',
        teamsName: '',
        channelName: '',
        artWorkFolderName: '',
        attachmentFolderName: '',
      });
    }
  }, [clientNo, projectCode, projectCard, reset]);

  useEffect(() => {
    // const storedClientNo = sessionStorage.getItem(
    //   SESSION_STORAGE.PROJECT_PAGE_CLIENT_NO
    // );
    // const storedProjectCode = sessionStorage.getItem(
    //   SESSION_STORAGE.PROJECT_PAGE_PROJECT_NO
    // );
    // if (!!storedClientNo) {
    //   setSelectedClientNo(storedClientNo);
    //   setValue('clientNo', storedClientNo, { shouldDirty: false });
    // }
    // if (!!storedProjectCode) {
    //   setSelectedProjectCode(storedProjectCode);
    //   setValue('projectCode', storedProjectCode);
    //   setValue('code', storedProjectCode);
    // }
    setTimeout(() => {
      setIsInitialLoad(false);
    }, 1000);
  }, []);

  useEffect(() => {
    setValue(
      'clientName',
      clientOptions?.find(t => t.value === clientNo)?.label ?? '',
      { shouldDirty: false }
    );
  }, [clientNo, clientOptions]);

  useEffect(() => {
    setOptionItems(projectOptions);
  }, [projectOptions]);

  useEffect(() => {
    if (!!code) {
      if (
        projectOptions.filter((option: any) => option.value === code).length > 0
      ) {
        setValue('projectCode', code, {
          shouldDirty: true,
        });
        sessionStorage.setItem(SESSION_STORAGE.PROJECT_PAGE_PROJECT_NO, code);
        setSelectedProjectCode(code);
      }
    }
  }, [code, projectOptions]);

  const defaultClientOption = clientOptions?.find(
    (option: any) => option.value === clientNo
  );

  const defaultProjectOption = useMemo(() => {
    return optionItems.find((option: any) => option.value === projectCode);
  }, [optionItems, projectCode]);

  const handleLeavePageBlocker = (accepted?: boolean) => {
    if (accepted) {
      if (nextClientNo === clientNo) {
        setValue('projectCode', nextProjectCode, { shouldDirty: false });
        setValue('code', nextProjectCode, { shouldDirty: false });
        setSelectedProjectCode(nextProjectCode);
        sessionStorage.setItem(
          SESSION_STORAGE.PROJECT_PAGE_PROJECT_NO,
          nextProjectCode
        );
      } else {
        setValue('projectCode', '', { shouldDirty: false });
        setValue('code', '', { shouldDirty: false });
        setSelectedProjectCode('');
        sessionStorage.setItem(SESSION_STORAGE.PROJECT_PAGE_PROJECT_NO, '');
      }
      setValue('clientNo', nextClientNo ? nextClientNo : clientNo, {
        shouldDirty: false,
      });
      setSelectedClientNo(nextClientNo ? nextClientNo : clientNo);
      sessionStorage.setItem(
        SESSION_STORAGE.PROJECT_PAGE_CLIENT_NO,
        nextClientNo ? nextClientNo : clientNo
      );
    }
    setShowLeavePageBlocker(false);
  };

  const handleClientChange = (option: any) => {
    if (sessionStorage.getItem(SESSION_STORAGE.IS_DIRTY) === 'false') {
      reset({
        clientNo: option?.value,
        projectCode: '',
        code: '',
        clientName:
          clientOptions?.find(t => t.value === option?.value)?.label ?? '',
      });
      setSelectedClientNo(option?.value);
      if (!isInitialLoad) {
        setSelectedProjectCode('');
        sessionStorage.setItem(SESSION_STORAGE.PROJECT_PAGE_PROJECT_NO, '');
      }
      sessionStorage.setItem(
        SESSION_STORAGE.PROJECT_PAGE_CLIENT_NO,
        option?.value || ''
      );
    } else {
      setNextClientNo(option?.value);
      setShowLeavePageBlocker(true);
      sessionStorage.setItem(
        SESSION_STORAGE.PROJECT_PAGE_CLIENT_NO,
        option?.value || ''
      );
    }
  };

  const handleProjectChange = (option: any) => {
    if (sessionStorage.getItem(SESSION_STORAGE.IS_DIRTY) === 'false') {
      setValue('code', option?.value, {
        shouldDirty: true,
      });
      setValue('projectCode', option?.value, {
        shouldDirty: true,
      });
      setSelectedProjectCode(option?.value);
      sessionStorage.setItem(
        SESSION_STORAGE.PROJECT_PAGE_PROJECT_NO,
        option?.value || ''
      );
    } else {
      setNextProjectCode(option?.value);
      setShowLeavePageBlocker(true);
    }
  };

  return (
    <>
      <LeavePageBlocker
        isOpen={showLeavePageBlocker}
        closeModal={handleLeavePageBlocker}
      />
      <Grid
        gap={{
          base: SPACE.XXS,
          lg: SPACE.SM,
        }}
        templateColumns={{
          base: GRID.TEMPLATE_COLUMNS.base,
          md: GRID.TEMPLATE_COLUMNS.md,
          lg: GRID.TEMPLATE_COLUMNS.lg,
        }}>
        <GridItem
          colSpan={{
            base: 4,
            lg: 8,
          }}>
          <Grid
            gap={{
              base: SPACE.XXS,
              lg: SPACE.SM,
            }}
            templateColumns={{
              base: GRID.TEMPLATE_COLUMNS.base,
              md: GRID.TEMPLATE_COLUMNS.md,
              lg: GRID.TEMPLATE_COLUMNS.lg,
            }}
            pb={{ base: SPACE.XXS, lg: SPACE.MD }}>
            <GridItem
              colSpan={{
                base: 2,
                lg: 2,
              }}>
              <ControlWrapper name={'client'} label={t('Menu.HypClients')}>
                <Controller
                  name="clientNo"
                  render={() => (
                    <SelectBase
                      isSearchable
                      isControlled
                      name={'clientNo'}
                      options={clientOptions}
                      onChange={handleClientChange}
                      value={defaultClientOption}
                      hideSelected={false}
                    />
                  )}
                />
              </ControlWrapper>
            </GridItem>

            <GridItem
              colSpan={{
                base: 2,
                lg: 2,
              }}>
              <ControlWrapper name={'project'} label={t('Menu.HypProjects')}>
                <Controller
                  name="projectCode"
                  render={() => (
                    <SelectBase
                      isSearchable
                      isControlled
                      name={'projectCode'}
                      options={optionItems}
                      onChange={handleProjectChange}
                      value={
                        defaultProjectOption
                          ? defaultProjectOption
                          : { value: '', label: t('Filter.Select') }
                      }
                      hideSelected={false}
                      isDisabled={!clientNo}
                    />
                  )}
                />
              </ControlWrapper>
              <Fragment />
            </GridItem>
          </Grid>
        </GridItem>

        <GridItem colSpan={2}>
          {clientNo && (
            <ProjectsActionBar
              lastModified={lastModified}
              clientNo={clientNo}
              projectId={projectCode}
              setSelectedProjectCode={setSelectedProjectCode}
            />
          )}
        </GridItem>
      </Grid>
    </>
  );
};

export default ProjectsTopSection;
