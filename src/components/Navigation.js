import {useState} from 'react'
import NavItem from './NavItem'
import '../styles/Navigation.css'

function Navigation() {
    let [activeNavItem, setActiveNavItem] = useState('bootup-time')

    function handleActiveNav(e){
        setActiveNavItem(e.target.id)
    }

    return (
      <div className="nav">
          <NavItem activeNav={activeNavItem} navId={"bootup-time"} onNavClick={handleActiveNav}/>
          <NavItem activeNav={activeNavItem} navId={"third-party-summary"} onNavClick={handleActiveNav}/>
      </div>
    );
  }
  
  export default Navigation;
  