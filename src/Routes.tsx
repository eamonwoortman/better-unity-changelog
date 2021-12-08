
import { Suspense, lazy } from 'react';
import type { RouteObject } from 'react-router';
import { Navigate } from 'react-router-dom';
import { DashboardLayout } from './components/dashboard/DashboardLayout';

// screens
import { LoadingScreen } from './components/LoadingScreen';

const Loadable = (Component) => (props) => (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );
  
const Home = Loadable(lazy(() => import('./components/app/Home')));
const NotFound = Loadable(lazy(() => import('./pages/NotFound')));
  
const routes: RouteObject [] = [
/*
  {
    path: 'dashboard',
    element: (
      <DashboardLayout />
    ),
    children: [
      {
        path: '/',
        element: <Home />
      }      
    ]
  },*/
  /*
  {
    path: 'dashboard',
    element: <DashboardLayout />,
    children: [
      {
        path: '',
        element: <Home/>
      },
    ]
  },*/
  {
    path: '*',
    element: <DashboardLayout />,
    children: [
      
      {
        path: '',
        element: <Home />
        /*element: <Navigate to="/dashboard" />*/
      },
      {
        path: '*',
        element: <NotFound />
      }
    ]
  }
];

export default routes;