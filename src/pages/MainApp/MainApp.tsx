import { Button, Flex } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import NavigationHeader from '../../components/Navigation/NavigationHeader';
import React from 'react';

function MainApp() {
  return (
    <Flex h={'auto'} minH={'100%'} flexDirection="column" p={0}>
      <NavigationHeader />
      <Outlet />
    </Flex>
  );
}
export default MainApp;
