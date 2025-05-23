import { Tooltip, Text } from '@chakra-ui/react';

type Props = {
  text: string;
};

const TruncateTextTooltip = ({ text }: Props) => {
  const content = (
    <Text noOfLines={1} maxW={'24rem'}>
      {text}
    </Text>
  );

  if (text.length > 30) {
    return <Tooltip label={text}>{content}</Tooltip>;
  }

  return content;
};

export default TruncateTextTooltip;
