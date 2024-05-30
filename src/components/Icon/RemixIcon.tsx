import { Text, TextProps } from '@chakra-ui/react';
import { HTMLAttributes } from 'react';
import { REMIX_ICONS } from '../../theme/Constants';

type RemixIconTextProps = {
  component: 'Text';
  icon: keyof typeof REMIX_ICONS.CLASS_NAMES;
} & Omit<TextProps, 'className' | 'as'>;

type RemixIconIProps = {
  component: 'i';
  icon: keyof typeof REMIX_ICONS.CLASS_NAMES;
} & Pick<HTMLAttributes<HTMLElement>, 'style'>;

type Props = RemixIconIProps | RemixIconTextProps;

const RemixIcon = (props: Props) => {
  const { component } = props || {};
  if (component === 'i') {
    const { icon, style } = (props as RemixIconIProps) || {};
    return <i style={style} className={REMIX_ICONS.CLASS_NAMES[icon]} />;
  } else {
    const { icon, component, ...rest } = (props as RemixIconTextProps) || {};
    return (
      <Text {...rest} as={'i'} className={REMIX_ICONS.CLASS_NAMES[icon]} />
    );
  }
};

export default RemixIcon;
