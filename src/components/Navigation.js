import {useState} from 'react'
import NavItem from './NavItem'
import '../styles/Navigation.css'

function Navigation({data, onActiveNavChange}) {
    let [activeNavItem, setActiveNavItem] = useState('bootup-time')
    function handleActiveNav(e){
        setActiveNavItem(e.target.id)
        onActiveNavChange(e.target.id)
    }

    return (
      <div className="nav">
        {
          Object.keys(data).map(key =>
            <NavItem activeNav={activeNavItem} navId={key} key={data[key].id} onNavClick={handleActiveNav}/>
          )
        }
      </div>
    );
  }
  
  export default Navigation;
  