import { Box, Grid, GridItem, HStack, Heading, Text } from '@chakra-ui/layout';
import {
  BOX_SHADOW,
  COLORS,
  GRID,
  SIZES,
  SPACE,
} from '../../../theme/Constants';
import ContentSection from '../../Templates/ContentSection';
import ActionBar from './SectionComponents/ActionBar/ActionBar';
import { VStack, Input, Tooltip } from '@chakra-ui/react';
import TRANSITION from '../../../theme/Constants/transition';
import EditableInputField from '../../../components/Form/EditableInputField';
import { useTranslation } from 'react-i18next';
import Select from '../../../components/Form/Select';
import useFilterOptions from '../../../app/hooks/useFilterOption';
import BackLink from './SectionComponents/BackLink';
import { useWatch } from 'react-hook-form';
import StatusBadge from '../../../components/Status/StatusBadge';
import ProjectSelect from './SectionComponents/ProjectSelect';
import { useGetProjectsOptions } from '../../../app/api/Projects';
import { SelectOption } from '../../../app/types/types';
import PDImage from './SectionComponents/PDImage';
import ChangelogPopup from '../../../components/Changelog/ChangelogPopup';
import { useProductDevelopmentChangelog } from '../../../app/hooks/useChangelog';

type Props = {
  no: string;
  scrolledPast: boolean;
  createNew: boolean;
  disableEdit: boolean;
  hasPriceCalculation: boolean;
  hasProductions: boolean;
};
const TopSection = ({
  no,
  scrolledPast,
  createNew,
  disableEdit,
  hasPriceCalculation,
  hasProductions,
}: Props) => {
  const { t } = useTranslation();
  const clientOptions = useFilterOptions(
    createNew ? 'clients' : undefined,
    true
  );

  const client = useWatch({ name: 'client' });
  const clientNo = useWatch({ name: 'clientNo' });
  const clientRequirement = useWatch({ name: 'clientRequirement' });
  const pdName = useWatch({ name: 'name' });
  const status = useWatch({ name: 'status' });

  const { data: projectOptions } = useGetProjectsOptions(
    clientNo,
    typeof clientNo === 'string'
  );
  const statusChangelog = useProductDevelopmentChangelog('Status');

  return (
    <Box
      id="top-section"
      pt={{
        base: SPACE.XS,
        md: scrolledPast ? SPACE.XXS : SPACE.SM,
      }}
      position={'sticky'}
      top={0}
      zIndex={89}
      bgColor={COLORS.WHITE}
      transition={TRANSITION.EASEOUT}
      boxShadow={scrolledPast ? BOX_SHADOW.CARD : 'none'}>
      <ContentSection>
        <BackLink scrolledPast={scrolledPast} />
        <Grid
          alignItems={scrolledPast ? 'center' : ''}
          templateColumns={{
            base: GRID.TEMPLATE_COLUMNS.base,
            md: GRID.TEMPLATE_COLUMNS.lg,
            lg: GRID.TEMPLATE_COLUMNS.xl,
          }}
          gap={{
            base: SPACE.XXS,
            md: SPACE.SM,
          }}>
          <GridItem
            colSpan={{
              base: 1,
              md: scrolledPast ? 5 : 6,
              lg: 5,
            }}>
            <HStack
              flexDir={{
                base: 'column',
                md: 'row',
              }}
              gap={{
                base: SPACE.XXS,
                md: scrolledPast ? SPACE.XXS : SPACE.MD,
              }}
              alignItems={'top'}>
              {!createNew ? (
                <PDImage
                  pdName={pdName}
                  no={no}
                  scrolledPast={scrolledPast}
                  disableEdit={disableEdit}
                  status={status}
                />
              ) : (
                <HStack
                  maxHeight={scrolledPast ? '0' : '20rem'}
                  maxWidth={scrolledPast ? '0' : '20rem'}
                  visibility={scrolledPast ? 'hidden' : 'visible'}
                  width={'60'}
                  height={'60'}
                  px={SPACE.SM}
                  textAlign={'center'}
                  bg={COLORS.GRAY[5]}>
                  <Text fontSize={SIZES.FONT.XXS}>
                    {t(`PD.SaveBeforeUploadImg`)}
                  </Text>
                </HStack>
              )}
              <VStack
                gap={{
                  base: scrolledPast ? SPACE.XS : SPACE.XXS,
                  md: scrolledPast ? SPACE.MD : SPACE.XS,
                }}
                flexDir={scrolledPast ? 'row' : 'column'}
                py={{
                  base: '0',
                  lg: scrolledPast ? SPACE.XXS : SPACE.MD,
                }}
                alignItems={scrolledPast ? 'center' : 'flex-start'}>
                <Heading
                  fontSize={scrolledPast ? SIZES.FONT.SM : SIZES.FONT.MD}>
                  <EditableInputField
                    fontWeight="700"
                    letterSpacing="0.02em"
                    placeholder={`${t(`PD.PDNamePlaceholder`)}`}
                    variant="filled"
                    scrolledPast={scrolledPast}
                    hideValidationStyle={true}
                    defaultValue={pdName}
                    value={pdName}
                    name="name"
                    isDisabled={disableEdit}
                    registerOptions={{ maxLength: 30 }}
                  />
                </Heading>
                <Text px={SPACE.SM}>{no}</Text>
                <HStack mx={SPACE.XS} spacing={SPACE.XS}>
                  <StatusBadge status={status} />
                  <ChangelogPopup data={statusChangelog} />
                </HStack>
              </VStack>
            </HStack>
          </GridItem>
          <GridItem
            py={{
              base: scrolledPast ? '0' : SPACE.XXS,
              md: scrolledPast ? SPACE.XXS : SPACE.SM,
              lg: scrolledPast ? SPACE.XXS : SPACE.LG,
            }}
            display={'flex'}
            flexDir={scrolledPast ? 'row' : 'column'}
            gap={{
              base: SPACE.XXS,
              md: SPACE.XS,
            }}
            alignItems={scrolledPast ? 'center' : 'flex-start'}
            colSpan={{
              base: 1,
              md: scrolledPast ? 3 : 2,
            }}>
            {createNew || !client ? (
              <Box zIndex={9} w={'100%'}>
                <Select
                  placeholder={t('PD.Client')}
                  name="clientNo"
                  options={clientOptions}
                  registerOptions={{ required: true }}
                />
              </Box>
            ) : (
              <>
                <HStack p={SPACE.XXS} alignItems="center">
                  <Text>{client}</Text>
                  {clientRequirement && clientRequirement !== '<p><br></p>' && (
                    <Tooltip
                      label={
                        <Box
                          className="ql-editor"
                          dangerouslySetInnerHTML={{
                            __html: clientRequirement,
                          }}
                        />
                      }
                      variant={'attachmentTooltip'}
                      className="attachment-tooltip"
                      placement="right-start">
                      <Text color="red" cursor="pointer">
                        <i className="ri-information-line"></i>
                      </Text>
                    </Tooltip>
                  )}
                </HStack>
                <Input display="none" name="clientNo" />
              </>
            )}
            <ProjectSelect
              options={projectOptions as SelectOption[]}
              createNew={createNew}
              clientNo={clientNo}
              scrolledPast={scrolledPast}
              disableEdit={disableEdit}
            />
          </GridItem>
          <GridItem
            colSpan={{
              base: 1,
              md: 10,
              lg: scrolledPast ? 4 : 5,
            }}>
            <ActionBar
              createNew={createNew}
              no={no}
              disableEdit={disableEdit}
              hasPriceCalculation={hasPriceCalculation}
              hasProductions={hasProductions}
            />
          </GridItem>
        </Grid>
      </ContentSection>
    </Box>
  );
};

export default TopSection;
