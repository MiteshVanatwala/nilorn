import { Box, Grid, GridItem, HStack, Heading, Text } from '@chakra-ui/layout';
import {
  BOX_SHADOW,
  COLORS,
  GRID,
  SIZES,
  SPACE,
} from '../../../theme/Constants';
import ContentSection from '../../Templates/ContentSection';
import ActionBar from './SectionComponents/ActionBar';
import { Image, VStack } from '@chakra-ui/react';
import TRANSITION from '../../../theme/Constants/transition';
import EditableInputField from '../../../components/Form/EditableInputField';
import { useTranslation } from 'react-i18next';
import Select from '../../../components/Form/Select';
import useFilterOptions from '../../../app/hooks/useFilterOption';
import BackLink from './SectionComponents/BackLink';
import { useFormContext, useWatch } from 'react-hook-form';
import StatusBadge from '../../../components/Status/StatusBadge';
import ProjectSelect from './SectionComponents/ProjectSelect';
import { useGetProjects } from '../../../app/api/Projects';
import { SelectOption } from '../../../app/types/types';
import PDImage from './SectionComponents/PDImage';

type Props = {
  no: string;
  scrolledPast: boolean;
  createNew: boolean;
};
const TopSection = ({ no, scrolledPast, createNew }: Props) => {
  const { t } = useTranslation();
  const clientOptions = useFilterOptions(createNew ? 'clients' : undefined);
  const { getValues } = useFormContext();
  const clientNo = useWatch({ name: 'clientNo' });

  let { data: projectOptions } = useGetProjects(
    clientNo,
    typeof clientNo === 'string' ?? false
  );

  //TODO remvove hard coded value
  const showingChanges = true;
  return (
    <Box
      id="top-section"
      py={{
        base: SPACE.XS,
        md: scrolledPast ? SPACE.XXS : SPACE.MD,
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
              <PDImage
                imageUrl={getValues('imageUrl')}
                scrolledPast={scrolledPast}
              />
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
                    defaultValue={getValues('name')}
                    name="name"
                    registerOptions={{ required: true }}
                  />
                </Heading>
                <Text px={SPACE.SM}>
                  {!createNew && '#'}
                  {no}
                </Text>
                <Box mx={SPACE.XS}>
                  <StatusBadge status={getValues('status')} />
                </Box>
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
              md: 3,
              lg: 3,
            }}>
            {createNew || !getValues('client') ? (
              <Box zIndex={9} width={'100%'}>
                <Select
                  placeholder={t('PD.Client')}
                  name="clientNo"
                  options={clientOptions}
                  registerOptions={{ required: true }}
                />
              </Box>
            ) : (
              <Text p={SPACE.XXS}>{getValues('client')}</Text>
            )}
            <ProjectSelect
              options={projectOptions as SelectOption[]}
              createNew={createNew}
              clientNo={clientNo}
              scrolledPast={scrolledPast}
            />
          </GridItem>
          <GridItem
            colSpan={{
              base: 1,
              md: 10,
              lg: 4,
            }}>
            <ActionBar
              showingChanges={showingChanges}
              createNew={createNew}
              no={no}
            />
          </GridItem>
        </Grid>
      </ContentSection>
    </Box>
  );
};

export default TopSection;
