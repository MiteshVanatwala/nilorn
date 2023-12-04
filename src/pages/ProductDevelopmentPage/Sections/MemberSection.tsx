import { Box, Flex, Grid, GridItem } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { SPACE } from '../../../theme/Constants';
import AccordionItem from '../../../components/AccordionItem/AccordionItem';
import Member from '../../Members/Member';
import AdvanceFilterSelect from '../../../components/Filter/AdvanceFilterSelect';
import Alert from '../../../components/Feedback/Alert';
type Props = {
  createNew?: boolean;
};
const MemberSection = ({ createNew }: Props) => {
  const { t } = useTranslation();
  const members = [
    {
      name: 'Lisa Årman',
      memberId: 'SELIÅR',
      role: 'Designer',
    },
    { name: 'Linnea Karlsson', memberId: 'SELIKA', role: 'Administrator' },
    { name: 'Jonas Boyd', memberId: 'SEJOBO', role: 'Designer' },
    { name: 'Johan Huynh', memberId: 'SEJOHU', role: 'Designer' },
  ];
  function addMember() {
    console.log('add member');
  }
  const memberGrid = () => {
    const grids = [];
    for (let i = 0; i < members.length; i += 6) {
      const sixMembers = members.slice(i, i + 6);
      grids.push(
        <GridItem key={i}>
          {sixMembers.map((member, index) => (
            <Member
              key={member.memberId}
              even={index % 2 !== 0}
              name={member.name}
              id={member.memberId}
              role={member.role}
            />
          ))}
        </GridItem>
      );
    }
    return grids;
  };

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
              <AdvanceFilterSelect
                placeholder={t('PD.AddMember')}
                options={[]}
                onChange={(option, event) => {
                  addMember();
                }}
                value={[]}
              />
            </Box>
            <Grid
              w="full"
              templateColumns={{
                xl: 'repeat(3, 1fr)',
              }}
              columnGap={{
                xl: SPACE.MD,
              }}
              rowGap={{
                base: 0,
                xl: SPACE.MD,
              }}>
              {memberGrid()}
            </Grid>
          </>
        )}
      </Flex>
    </AccordionItem>
  );
};

export default MemberSection;
