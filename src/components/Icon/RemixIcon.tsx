import { Text, TextProps } from '@chakra-ui/react';
import { HTMLAttributes } from 'react';
import { REMIX_ICONS } from '../../theme/Constants';

type RemixIconProps = {
  component?: 'Text' | 'i';
  icon: keyof typeof REMIX_ICONS.CLASS_NAMES;
};

type RemixIconTextProps = RemixIconProps & TextProps;
type RemixIconIProps = RemixIconProps & HTMLAttributes<HTMLElement>;

type Props = RemixIconIProps | RemixIconTextProps;

const RemixIcon = ({ icon, component = 'i', style, ...rest }: Props) => {
  switch (component) {
    case 'i':
      return <i style={style} className={REMIX_ICONS.CLASS_NAMES[icon]} />;
    case 'Text':
      return (
        <Text
          {...rest}
          style={style}
          className={REMIX_ICONS.CLASS_NAMES[icon]}
        />
      );
    default:
      return null;
  }
};

export default RemixIcon;
