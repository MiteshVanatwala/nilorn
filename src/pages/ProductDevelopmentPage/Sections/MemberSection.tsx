import { Button, Grid, GridItem } from '@chakra-ui/react';
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
    { name: 'Johan Huynh', memberId: 'SEJOHU', role: 'Designer' },
  ];

  const memberGrid = () => {
    const grids = [];
    for (let i = 0; i < members.length; i += 18) {
      const gridMembers = members.slice(i, i + 18);
      grids.push(
        <Grid
          mb={{
            xl: SPACE.MD,
          }}
          columnGap={{
            base: SPACE.XXS,
            lg: SPACE.MD,
          }}
          autoFlow={{
            base: 'row',
            xl: 'column',
          }}
          templateColumns={{
            base: GRID.TEMPLATE_COLUMNS.base,
            lg: 'repeat(9, 1fr)',
            xl: 'repeat(14, 1fr)',
          }}
          key={`${i / 18}`}>
          <GridItem
            mb={SPACE.XS}
            colSpan={{
              base: 1,
              lg: 8,
              xl: 2,
            }}
            colStart={{
              base: 1,
              xl: 13,
            }}
            justifySelf={{
              base: 'start',
              xl: 'end',
            }}
            rowSpan={6}>
            {i === 0 && (
              <Button variant={'secondary'}>{t('PD.AddMember')}</Button>
            )}
          </GridItem>
          {gridMembers.map((member, index) => (
            <Member
              key={member.memberId}
              even={index % 2 !== 0}
              name={member.name}
              id={member.memberId}
              role={member.role}
            />
          ))}
        </Grid>
      );
    }
    return grids;
  };

  return (
    <AccordionItem title={t('PD.Members')}>
      <>{memberGrid()}</>
    </AccordionItem>
  );
};

export default MemberSection;
