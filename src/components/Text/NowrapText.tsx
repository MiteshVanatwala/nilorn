import { Text } from '@chakra-ui/layout';

type Props = { text: string; variant?: string };
const NowrapText = ({ text, variant = 'span' }: Props) => {
  return (
    <Text variant={variant} whiteSpace={'nowrap'} display={'inline-block'}>
      {text}
    </Text>
  );
};
export default NowrapText;
