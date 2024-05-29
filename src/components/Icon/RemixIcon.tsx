import { Text, TextProps } from '@chakra-ui/react';
import { HTMLAttributes } from 'react';
import { REMIX_ICONS } from '../../theme/Constants';

type RemixIconTextProps = {
  component?: 'Text';
  icon: keyof typeof REMIX_ICONS.CLASS_NAMES;
} & TextProps;

type RemixIconIProps = {
  component?: 'i';
  icon: keyof typeof REMIX_ICONS.CLASS_NAMES;
} & HTMLAttributes<HTMLElement>;

type Props = RemixIconIProps | RemixIconTextProps;

const RemixIcon = ({
  icon,
  component = 'i',
  style,
  className,
  ...rest
}: Props) => {
  switch (component) {
    case 'i':
      return (
        <i
          style={style}
          className={className ?? REMIX_ICONS.CLASS_NAMES[icon]}
        />
      );
    case 'Text':
      return (
        <Text
          {...rest}
          style={style}
          className={className ?? REMIX_ICONS.CLASS_NAMES[icon]}
        />
      );
    default:
      return null;
  }
};

export default RemixIcon;
