import { useState } from 'react'
import Navigation from "./Navigation";
import Content from './Content'
import '../styles/Layout.css'

function Layout({ data }) {
  const [activeKey, setActiveKey] = useState('bootup-time')

  return (
    <div className="layout-wrapper">
      <Navigation data={data} onActiveNavChange={setActiveKey} />
      <Content content={data[activeKey]} contentKey={activeKey} />
    </div>
  );
}

export default Layout;
