import { Outlet, createBrowserRouter } from 'react-router-dom';
// import AddAddressPage from '../Address/AddAddressPage';
// import AddressPage from '../OrderHead/AddressPage';
import HomePage from '../Home/HomePage';
// import MyAccount from '../User/MyAccount';
// import NotFoundPage from '../Errors/NotFoundPage';
// import OrdersLanding from '../Orders/OrdersLanding';
// import SigninOidc from '../Auth/SigninOidc';
import MainApp from './MainApp';
// import CurrentOrderPage from '../CurrentOrder/CurrentOrderPage';
// import ReviewOrderPage from '../ReviewOrder/ReviewOrderPage';
// import ConfirmedOrderPage from '../ConfirmedOrder/ConfirmedOrderPage';
// import ReportsPage from '../Reports/ReportsPage';
import ProductPage from '../Product/ProductPage';
// import HelpPage from '../Help/HelpPage';
// import OrderTrackingPage from '../OrderTracking/OrderTrackingPage';
// import OrderTrackingDetailsPage from '../OrderTracking/OrderTrackingDetailsPage/OrderTrackingDetailsPage';
// import GlobalStockPage from '../GlobalStock/GlobalStockPage';
import RouteError from '../../components/ErrorBoundary/RouteError';
// import ProductConfigPage from '../ProductConfig/ProductConfigPage';
// import TestPage from '../TestPage/TestPage';
// import PreloadedArticlePage from '../PreloadedArticle/PreloadedArticlePage';
// import OrderRowDetailsPage from '../OrderTracking/OrderRowDetails/OrderRowDetailsPage';
// import PreloadedOrdersPage from '../PreloadedOrders/PreloadedOrdersPage';
// import { OrderTrackingProvider } from '../OrderTracking/OrderTrackingContext';
// import { TableProvider } from '../../app/context/TableContext';
import React from 'react';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainApp />,
    children: [
      {
        errorElement: <RouteError />,
        children: [
          { element: <HomePage />, index: true },
          {
            path: 'products',
            element: <ProductPage />,
          },
        ],
      },
    ],
  },
]);

export default router;
