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
  headlineColor?: string;
  panelPadding?: string;
};

const AccordionItem = ({
  title,
  children,
  headlineColor = COLORS.WHITE,
  panelPadding,
}: Props) => {
  return (
    <ChakraAccordionItem>
      <AccordionButton>
        <HStack w={'100%'} justifyContent={'space-between'}>
          <Heading variant={'bodyBold'} color={headlineColor}>
            {title}
          </Heading>
          <AccordionIcon />
        </HStack>
      </AccordionButton>
      <AccordionPanel p={panelPadding}>{children}</AccordionPanel>
    </ChakraAccordionItem>
  );
};

export default AccordionItem;
