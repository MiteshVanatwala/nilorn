import { Box, Grid, GridItem, HStack, Heading, Text } from '@chakra-ui/layout';
import { BOX_SHADOW, COLORS, GRID, SIZES, SPACE } from '../../theme/Constants';
import ContentSection from '../Templates/ContentSection';
import ActionBar from './ActionBar';
import { Image, VStack } from '@chakra-ui/react';
import TRANSITION from '../../theme/Constants/transition';
import EditableInputField from '../../components/Form/EditableInputField';
import { useTranslation } from 'react-i18next';
import Select from '../../components/Form/Select';
import useFilterOptions from '../../app/hooks/useFilterOption';
import BackLink from './BackLink';

type Props = {
  productNo: string;
  scrolledPast: boolean;
  createNew?: boolean;
};
const TopSection = ({ productNo, scrolledPast, createNew }: Props) => {
  const { t } = useTranslation();
  const clientOptions = useFilterOptions('clients');

  //TODO remvove hard coded value
  const showingChanges = true;
  return (
    <Box
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
            transition={TRANSITION.EASEOUT}
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
              transition={TRANSITION.EASEOUT}
              gap={{
                base: SPACE.XXS,
                md: scrolledPast ? SPACE.XXS : SPACE.MD,
              }}
              alignItems={'top'}>
              <Image
                maxHeight={scrolledPast ? '0' : 'none'}
                maxWidth={scrolledPast ? '0' : 'none'}
                visibility={scrolledPast ? 'hidden' : 'visible'}
                width={'60'}
                height={'60'}
                objectFit={'cover'}
                src="https://static-cdn.sr.se/images/99/83d9ce09-41ea-4197-951e-48e2c17a7c81.jpg"></Image>
              <VStack
                transition={TRANSITION.EASEOUT}
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
                  transition={TRANSITION.EASEOUT}
                  fontSize={scrolledPast ? SIZES.FONT.SM : SIZES.FONT.MD}>
                  <EditableInputField
                    fontWeight="700"
                    letterSpacing="0.02em"
                    placeholder={`${t(`PD.PDNamePlaceholder`)}`}
                    variant="filled"
                    scrolledPast={scrolledPast}
                    hideValidationStyle={true}
                    name="name"
                    registerOptions={{ required: true }}
                  />
                </Heading>
                <Text px={SPACE.SM}>
                  {!createNew && '#'}
                  {productNo}
                </Text>
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
            transition={TRANSITION.EASEOUT}
            alignItems={scrolledPast ? 'center' : 'flex-start'}
            colSpan={{
              base: 1,
              md: 3,
              lg: 2,
            }}>
            {createNew ? (
              <Box zIndex={9} width={'100%'}>
                <Select
                  placeholder={t('PD.Client')}
                  name="client"
                  options={clientOptions}
                />
              </Box>
            ) : (
              <Text p={SPACE.XXS}>[CLIENT]</Text>
            )}
            <Box zIndex={8} width={'100%'}>
              <Select
                placeholder={t('PD.Project')}
                name="project"
                invisible={!createNew}
                options={clientOptions}
              />
            </Box>
          </GridItem>
          <GridItem
            colSpan={{
              base: 1,
              md: 10,
              lg: 5,
            }}>
            <ActionBar showingChanges={showingChanges} createNew={createNew} />
          </GridItem>
        </Grid>
      </ContentSection>
    </Box>
  );
};

export default TopSection;
