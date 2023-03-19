import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ProSidebarProvider } from "react-pro-sidebar";
import SideMenu from './components/SideMenu';
import { AuthProvider } from './context/AuthProvider';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <ProSidebarProvider>
        <App/>
      </ProSidebarProvider>
    </AuthProvider>
  </React.StrictMode>
);
