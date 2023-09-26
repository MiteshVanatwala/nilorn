import { Link as LinkComponent } from '@chakra-ui/react';
import React from 'react';
import { NavLink } from 'react-router-dom';
import COLORS from '../../theme/Constants/colors';

interface Props {
  title?: string | JSX.Element;
  path: string;
}

const HeaderLink: React.FC<Props> = ({ path, title }) => {
  return (
    <LinkComponent
      _hover={{ bg: COLORS.GRAY[0], color: COLORS.BLUE[200] }}
      as={NavLink}
      end
      variant="headerLink"
      to={path}
      whiteSpace={'nowrap'}>
      {title}
    </LinkComponent>
  );
};

export default HeaderLink;
