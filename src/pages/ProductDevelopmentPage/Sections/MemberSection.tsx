import { Box, Flex, Grid, GridItem } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { SPACE } from '../../../theme/Constants';
import AccordionItem from '../../../components/AccordionItem/AccordionItem';
import Member from '../../Members/Member';
import AdvanceFilterSelect from '../../../components/Filter/AdvanceFilterSelect';
import Alert from '../../../components/Feedback/Alert';
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import { ProductDevelopmentDto } from '../../../app/generate';
import { useMembers } from '../../../app/api/productDevelopment';
import { SelectOption } from '../../../app/types/types';
import { MultiValue } from 'react-select';
import { useMemo, useState } from 'react';
import { MemberBriefDto } from '../../../app/generate';
import { useAuthorizedRemoveUser } from '../../../app/Permissions/usePremissions';
import { useMembers as useMembersList } from '../../../app/api/FilterInfo';
type Props = {
  no?: string;
  createNew?: boolean;
  disableEdit: boolean;
  showAllMembers?: boolean;
};

const FORM_KEY: keyof ProductDevelopmentDto = 'members';

const MemberSection = ({
  disableEdit,
  createNew,
  no,
  showAllMembers = false,
}: Props) => {
  const { t } = useTranslation();

  const allowedToRemoveMember = useAuthorizedRemoveUser();

  const { control } = useFormContext();

  const membersFormVaule = useWatch({ name: FORM_KEY });

  const [selected, setSelected] = useState<
    MultiValue<SelectOption<MemberBriefDto>>
  >(membersFormVaule ?? []);

  const { data: membersOptions } = useMembers(no || '');
  const { data: allMembersOptions } = useMembersList();

  const { fields, append, remove } = useFieldArray({
    control,
    name: FORM_KEY,
  });

  function addMember(
    selectedOption: MultiValue<SelectOption<MemberBriefDto>> | undefined
  ) {
    if (selectedOption !== undefined && selectedOption.length > 0) {
      setSelected(selectedOption);
      append(selectedOption[selectedOption.length - 1].value);
      console.log(selectedOption);
    }
  }

  const memberGrid = useMemo(() => {
    function removeMember(indexToRemove: number) {
      remove(indexToRemove);
      const membersLeft = selected.filter((_, j) => j !== indexToRemove);
      setSelected(membersLeft);
    }

    const grids = [];
    for (let i = 0; i < fields.length; i += 6) {
      const sixMembers = fields.slice(i, i + 6) as MemberBriefDto[];

      grids.push(
        <GridItem key={i}>
          {sixMembers.map((member, index) => {
            const indexToRemove = i + index;
            return (
              <Member
                key={`${member?.code}_${index}`}
                even={index % 2 !== 0}
                name={member?.name ?? ''}
                code={member?.code ?? ''}
                role={member?.role ?? ''}
                disableEdit={disableEdit}
                onRemove={
                  allowedToRemoveMember(member)
                    ? () => removeMember(indexToRemove)
                    : undefined
                }
              />
            );
          })}
        </GridItem>
      );
    }
    return grids;
  }, [remove, selected, fields, disableEdit, allowedToRemoveMember]);

  return (
    <AccordionItem title={t('PD.AccordionLabels.Members')}>
      <Flex
        gap={SPACE.MD}
        justifyContent={{
          base: 'flex-start',
          xl: 'space-between',
        }}
        alignItems={'baseline'}
        flexDirection={{
          base: 'column',
          xl: 'row-reverse',
        }}>
        {createNew ? (
          <Alert status="info" title={`${t('PD.MemberInfo')}`} />
        ) : (
          <>
            <Box minW={'20rem'}>
              {!disableEdit && (
                <AdvanceFilterSelect
                  key={`
                    ${membersFormVaule?.length}
                        ${
                          membersFormVaule !== undefined
                            ? membersFormVaule?.length
                            : ''
                        }`}
                  name="AddMembers"
                  placeholder={t('PD.AddMember')}
                  hideSelected={true}
                  options={
                    (showAllMembers ? allMembersOptions : membersOptions)
                      ?.filter(
                        item =>
                          !(membersFormVaule as MemberBriefDto[])?.some(
                            selectedItem => selectedItem?.code === item.code
                          )
                      )
                      .map(
                        m =>
                          ({
                            label: m.name,
                            value: m,
                          } as SelectOption<MemberBriefDto>)
                      )
                      .sort((a, b) => a.label.localeCompare(b.label)) ?? []
                  }
                  onChange={(option, event) => {
                    if (event.action !== 'pop-value') addMember(option);
                  }}
                  value={selected}
                />
              )}
            </Box>
            <Grid
              w="full"
              templateColumns={{
                xl: 'repeat(2, 1fr)',
              }}
              columnGap={{
                xl: SPACE.MD,
              }}
              rowGap={{
                base: 0,
                xl: SPACE.MD,
              }}>
              {memberGrid}
            </Grid>
          </>
        )}
      </Flex>
    </AccordionItem>
  );
};

export default MemberSection;
