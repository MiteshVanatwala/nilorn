import { Box, Flex, Grid, GridItem } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { SPACE } from '../../../theme/Constants';
import AccordionItem from '../../../components/AccordionItem/AccordionItem';
import Member from '../../Members/Member';
import AdvanceFilterSelect from '../../../components/Filter/AdvanceFilterSelect';
import Alert from '../../../components/Feedback/Alert';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { useMembers } from '../../../app/api/productDevelopment';
import { SelectOption } from '../../../app/types/types';
import { MultiValue } from 'react-select';
import { useEffect, useMemo, useState } from 'react';
import { MemberBriefDto, ProductDevelopmentDto } from '../../../app/generate';
type Props = {
  no: string;
  createNew?: boolean;
  disableEdit: boolean;
};

const FORM_KEY: keyof ProductDevelopmentDto = 'members';

const MemberSection = ({ disableEdit, createNew, no }: Props) => {
  const { t } = useTranslation();

  const { getValues, control } = useFormContext();

  const [selected, setSelected] = useState<
    MultiValue<SelectOption<MemberBriefDto>>
  >(getValues(FORM_KEY) ?? []);
  const [membersDefaultValue, setMembersDefaultVaule] =
    useState<MemberBriefDto[]>();

  const { data } = useMembers(no);

  const { fields, append, remove } = useFieldArray({
    control,
    name: FORM_KEY,
  });
  function addMember(
    selectedOption: MultiValue<SelectOption<MemberBriefDto>> | undefined
  ) {
    if (selectedOption !== undefined) {
      setSelected(selectedOption);
      append(selectedOption[selectedOption.length - 1].value);
    }
  }
  const membersFormVaule = getValues(FORM_KEY) as MemberBriefDto[];
  useEffect(() => {
    setMembersDefaultVaule(membersFormVaule);
  }, [membersFormVaule]);

  const memberGrid = useMemo(() => {
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
                onRemove={() => {
                  remove(indexToRemove);
                  const myArray = selected.filter(
                    (_, j) => j !== indexToRemove
                  );
                  setSelected(myArray);
                }}
              />
            );
          })}
        </GridItem>
      );
    }
    return grids;
  }, [disableEdit, fields, remove, selected]);

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
                          membersDefaultValue !== undefined
                            ? membersDefaultValue?.length
                            : ''
                        }`}
                  name="AddMembers"
                  placeholder={t('PD.AddMember')}
                  hideSelected={true}
                  options={
                    data
                      ?.filter(
                        item =>
                          !membersDefaultValue?.some(
                            selectedItem => selectedItem.code === item.code
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
                  onChange={option => {
                    addMember(option);
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
