import { Box } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
// import { useLanguages } from '../../app/api/utils';
import HeaderMenu from '../Navigation/HeaderMenu';
import { HeaderMenuButton } from '../Navigation/HeaderMenuLink';
import Flag from './Flag';
import React from 'react';

const LanguageSwitcher = () => {
  // const { user } = useAuth();

  const { i18n } = useTranslation();
  const [language, setLanguage] = useState<string>('123');
  // (user?.profile?.userUICulture as string) ?? i18n.language
  // const { data } = useLanguages();
  const data = [
    { name: 'Swedish', langTagLcid: '123' },
    { name: 'English', langTagLcid: '1234' },
  ];
  useEffect(() => {
    i18n.changeLanguage(language);
  }, [i18n, language]);

  const handleChange = (lang: string) => {
    setLanguage(lang);
  };

  return (
    <HeaderMenu title={language ? language : ''}>
      <>
        {/* {data?.length &&
          data.map((lang, i) => (
            <HeaderMenuButton
              key={'LanguageSwitcher-' + lang.langTagLcid}
              onClick={() => handleChange(lang.langTagLcid ?? '')}>
              <Box display={'flex'} gap={'1rem'}>
                <Flag langTagLcid={lang.langTagLcid ?? ''} />
                {lang.name}
              </Box>
            </HeaderMenuButton>
          ))} */}
      </>
    </HeaderMenu>
  );
};

export default LanguageSwitcher;
