import { Outlet } from 'react-router-dom';
import Header from '../../components/header/Header'
import './layout.scss';

function Layout() {
  return (
    <div className="layout">
      <div className="header">
        <Header/>
      </div>
      <div className="content">
        <Outlet/>    
      </div>
    </div>
  )
}

export default Layout;