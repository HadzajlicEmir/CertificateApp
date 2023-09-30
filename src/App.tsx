import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './Header';
import SideMenu from './SideMenu';
import CertificateOverview from './CertificateOverview';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Start from './Start';
import Example1 from './Example1';
import Example2 from './Example2';
import Example3 from './Example3';
import NewCertificate from './NewCertificate';

function App() {
  return (
   <Router>
    <Header />
    <div style={{ display: "flex", flexDirection: "row"}}>
      <SideMenu />
           <Routes>
        <Route path={"/start"} element={<Start />} />
        <Route path={"/example1"} element={<Example1 />} />
        <Route path={"/example2"} element={<Example2 />} />
        <Route path={"/example3"} element={<Example3 />} />
        <Route path={"/new-certificate"} element={<NewCertificate />} />
        <Route path={"/"} element={<Start />} />
      </Routes>  
    </div>
    </Router>
  );
}

export default App;
