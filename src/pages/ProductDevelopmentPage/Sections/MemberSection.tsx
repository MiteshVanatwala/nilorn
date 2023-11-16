import { Button, Flex, Grid, GridItem } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { GRID, SPACE } from '../../../theme/Constants';
import AccordionItem from '../../../components/AccordionItem/AccordionItem';
import Member from '../../Members/Member';

const MemberSection = () => {
  const { t } = useTranslation();
  const members = [
    {
      name: 'Lisa Årman',
      memberId: 'SELIÅR',
      role: 'Designer',
    },
    { name: 'Linnea Karlsson', memberId: 'SELIKA', role: 'Administrator' },
    { name: 'Jonas Boyd', memberId: 'SEJOBO', role: 'Designer' },
    { name: 'Johan Huynh', memberId: 'SEJOHUk', role: 'Designer' },
    { name: 'Linnea Karlsson', memberId: 'SELIKAd', role: 'Administrator' },
    { name: 'Jonas Boyd', memberId: 'SEJOBOg', role: 'Designer' },
    { name: 'Linnea Karlsson', memberId: 'SELIKA', role: 'Administrator' },
    { name: 'Jonas Boyd', memberId: 'SEJOBO', role: 'Designer' },
    { name: 'Johan Huynh', memberId: 'SEJOHUk', role: 'Designer' },
    { name: 'Linnea Karlsson', memberId: 'SELIKAd', role: 'Administrator' },
    { name: 'Jonas Boyd', memberId: 'SEJOBOg', role: 'Designer' },
    { name: 'Linnea Karlsson', memberId: 'SELIKA', role: 'Administrator' },
    { name: 'Linnea Karlsson', memberId: 'SELIKA', role: 'Administrator' },
    { name: 'Jonas Boyd', memberId: 'SEJOBO', role: 'Designer' },
    { name: 'Johan Huynh', memberId: 'SEJOHUk', role: 'Designer' },
    { name: 'Linnea Karlsson', memberId: 'SELIKAd', role: 'Administrator' },
    { name: 'Jonas Boyd', memberId: 'SEJOBOg', role: 'Designer' },
    { name: 'Johan Huynh', memberId: 'SEJOHUu', role: 'Designer' },
    { name: 'Linnea Karlsson', memberId: 'SELIKAg', role: 'Administrator' },
    // { name: 'Jonas Boyd', memberId: 'SEJOBOa', role: 'Designer' },
    { name: 'Johan Huynh', memberId: 'SEJOHUy', role: 'Designer' },
  ];

  const memberGrid = () => {
    const grids = [];
    for (let i = 0; i < members.length; i += 6) {
      const sixMembers = members.slice(i, i + 6);
      grids.push(
        <GridItem>
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
    <AccordionItem title={t('PD.Members')}>
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
        <Button variant={'secondary'}>{t('PD.AddMember')}</Button>
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
      </Flex>
    </AccordionItem>
  );
};

export default MemberSection;
