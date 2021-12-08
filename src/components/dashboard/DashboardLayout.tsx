import * as React from 'react';
import { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import { Footer } from '../app/Footer';
import { Header } from '../app/Header';

export interface DashboardLayoutProps {
    children?: ReactNode;
}

export function DashboardLayout (props: DashboardLayoutProps) {
  return (
    <div>
        <Header/>
            <Outlet />
        <Footer/>
    </div>
  );
}
