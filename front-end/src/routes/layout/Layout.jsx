import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import Loader from '../../components/loader/Loader'
import Header from '../../components/header/Header'
import './layout.scss';

function Layout() {
  return (
    <div className="layout">
      <div className="header">
        <Header/>
      </div>
      <div className="content">
        <Suspense fallback={<Loader/>}>
          <Outlet/>    
        </Suspense>
      </div>
    </div>
  )
}

export default Layout;