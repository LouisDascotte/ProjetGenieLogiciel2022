import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ProSidebarProvider } from "react-pro-sidebar";
import SideMenu from './components/SideMenu';
import { AuthProvider } from './context/AuthProvider';
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

// Got from the react-i18next documentation and a youtube video https://www.youtube.com/watch?v=w04LXKlusCQ&ab_channel=Classsed
i18n
  .use(initReactI18next) 
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    supportedLngs: ['en', 'fr'],
    fallbackLng: "en",
    detection: {
      order: [ 'cookie', 'htmlTag', 'localStorage', 'sessionStorage', 'navigator', 'path', 'subdomain'],
      caches: ['cookie']
    },
    backend : {
      'loadPath': '/assets/locales/{{lng}}/translation.json'
    }, 
    react : {
      useSuspense: false
    },
  });


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
