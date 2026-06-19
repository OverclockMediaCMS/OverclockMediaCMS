import React from 'react';
import Header from './Header';
import { Navbar } from './Navbar';
import { useGlobalContext } from '../GlobalContext';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({children}) => {
    const context = useGlobalContext();

    return (
        <div className='layout-wrapper'>
            <Header />
            <div className="layout-body">
                {context?.user && <Navbar />}
                <div className="content">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Layout;