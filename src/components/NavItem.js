import '../styles/NavItem.css'

function NavItem({activeNav, navId, onNavClick}) {
    return (
      <div className={activeNav === navId ? 'nav-item active' : 'nav-item'} onClick={onNavClick} id={navId}>
          { navId.split('-').join(' ') }
      </div>
    );
  }
  
  export default NavItem;