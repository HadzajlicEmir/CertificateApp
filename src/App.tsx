import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './Header';
import SideMenu from './SideMenu';
import CertificateOverview from './CertificateOverview';

function App() {
  return (
    <div>
     <Header />
     <SideMenu />
     <CertificateOverview />
    </div>
  );
}

export default App;
