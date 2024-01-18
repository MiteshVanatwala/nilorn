import { Text } from '@chakra-ui/react';
import { COLORS } from '../../theme/Constants';
import fontSizes from '../../theme/fontSizes';
import { useTranslation } from 'react-i18next';
import { ValidationRule } from 'react-hook-form';

interface Props {
  maxLength: ValidationRule<number>;
}

const MaxLengthError = ({ maxLength }: Props) => {
  const { t } = useTranslation();

  return (
    <Text fontSize={fontSizes.xs} color={COLORS.ERROR} variant={'bodyRegular'}>
      {t('PD.Feedback.Error.FieldLength', {
        length: maxLength,
      })}
    </Text>
  );
};

export default MaxLengthError;
