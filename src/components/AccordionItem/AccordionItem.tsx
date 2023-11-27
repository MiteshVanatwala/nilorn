import {
  AccordionButton,
  AccordionIcon,
  AccordionItem as ChakraAccordionItem,
  AccordionPanel,
} from '@chakra-ui/accordion';
import { HStack, Heading } from '@chakra-ui/layout';
import { COLORS } from '../../theme/Constants';

type Props = {
  title: string;
  children: JSX.Element;
};

const AccordionItem = ({ title, children }: Props) => {
  return (
    <ChakraAccordionItem mb={'0'}>
      <AccordionButton>
        <HStack w={'100%'} justifyContent={'space-between'}>
          <Heading variant={'bodyBold'} color={COLORS.WHITE}>
            {title}
          </Heading>
          <AccordionIcon />
        </HStack>
      </AccordionButton>
      <AccordionPanel>{children}</AccordionPanel>
    </ChakraAccordionItem>
  );
};

export default AccordionItem;
