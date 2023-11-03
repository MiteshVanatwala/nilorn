import { Flex } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import NavigationHeader from '../../components/Navigation/NavigationHeader';
import React from 'react';
import { ModalProvider } from '../../app/context/ModalContext';

function MainApp() {
  return (
    <Flex h={'100%'} minH={'100%'} flexDirection="column" p={0}>
      <ModalProvider>
        <NavigationHeader />
        <Outlet />
      </ModalProvider>
    </Flex>
  );
}
export default MainApp;
