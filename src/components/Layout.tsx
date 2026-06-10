import React from 'react';
import Header from './Header';
import { Navbar } from './Navbar';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({children}) => {
    return (
        <div className='layout-wrapper'>
            <Header />
            <main className="content">
                {children}
            </main>
        </div>
    );
};

export default Layout;