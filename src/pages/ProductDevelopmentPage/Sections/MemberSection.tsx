import { Button, Grid, GridItem } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { SPACE } from '../../../theme/Constants';
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
      <>
        <Grid
          autoFlow={{
            base: 'row',
            xl: 'column',
          }}
          columnGap={{
            base: SPACE.XXS,
            lg: SPACE.MD,
          }}
          templateColumns={{
            // base: GRID.TEMPLATE_COLUMNS.base,
            // lg: 'repeat(9, 1fr)',
            xl: 'repeat(7, 1fr)',
          }}>
          <GridItem
            mb={SPACE.XS}
            colSpan={{
              base: 1,
            }}
            colStart={{
              base: 1,
              xl: 7,
            }}
            justifySelf={{
              base: 'start',
              xl: 'end',
            }}
            // rowSpan={6}
          >
            <Button variant={'secondary'}>{t('PD.AddMember')}</Button>
          </GridItem>
          <GridItem
            className="item"
            colSpan={{
              base: 1,
              lg: 9,
              xl: 6,
            }}>
            <Grid
              templateColumns={{
                xl: 'repeat(3, 1fr)',
              }}
              columnGap={{
                base: SPACE.XXS,
                lg: SPACE.MD,
              }}
              rowGap={SPACE.MD}>
              {memberGrid()}
            </Grid>
          </GridItem>
        </Grid>
      </>
    </AccordionItem>
  );
};

export default MemberSection;
