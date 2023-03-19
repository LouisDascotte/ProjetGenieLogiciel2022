import { Stack } from "@mui/material";
import React from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import SideMenu from './components/SideMenu';
import MainPage from './pages/MainPage';
import CreateNewPassword from './pages/CreateNewPassword';
import LoginPage from './pages/LoginPage';
import ManageContracts from './pages/ManageContracts';
import ManageInvoices from './pages/ManageInvoices';
import ManageMeters from './pages/ManageMeters';
import ManagePortfolios from './pages/ManagePortfolios';
import NewPasswordSuccess from './pages/NewPasswordSuccess';
import Notifications from './pages/Notifications';
import Preferences from './pages/Preferences';
import Profile from './pages/Profile';
import RegisterPage from "./pages/RegisterPage";
import ResetPassword from './pages/ResetPassword';
import RegistrationSuccess from './pages/RegistrationSuccess';
import CoffeeTest from './pages/CoffeeTest';
import StatAnalysis from './pages/StatAnalysis';
import ErrorPage from './pages/ErrorPage';
import Testing from './pages/Testing';
import {createBrowserHistory} from "history"; 

function App() {
    let history = createBrowserHistory();
    console.log(history.location);
  return (
      <BrowserRouter >
              <Routes>   
                  <Route path='/' element={<Navigate to="/login"/>}></Route>
                  <Route path="/coffee" exact element={<CoffeeTest/>}/> 
                  <Route path='/registration-success' exact element={<RegistrationSuccess/>}/>
                  <Route path='/create-pass' exact element={<CreateNewPassword/>}/>
                  <Route path='/create-pass-success' exact element={<NewPasswordSuccess/>}/>
                  <Route path="/main-page" exact element={<MainPage/>}/>
                  <Route path="/login" exact element={<LoginPage/>}/>
                  <Route path="/manage-portfolios" exact element={<ManagePortfolios/>}/>
                  <Route path="/manage-meters" exact element={<ManageMeters/>}/>
                  <Route path="/manage-invoices" exact element={<ManageInvoices/>}/>
                  <Route path="/manage-contracts" exact element={<ManageContracts/>}/>
                  <Route path="/preferences" exact element={<Preferences/>}/>
                  <Route path="/profile" exact element={<Profile/>}/>
                  <Route path="/notifications" exact element={<Notifications/>}/>
                  <Route path="/register-account" exact element={<RegisterPage/>}/>
                  <Route path='/reset-passwd' exact element={<ResetPassword/>}/>
                  <Route path='/stats' exact element={<StatAnalysis/>}/>
                  <Route path="*" element={<ErrorPage/>}/>
                  <Route path='/Test' exact element={<Testing/>}/>
              </Routes>
            
      </BrowserRouter>

  );
};

export default App

/**
 * {history.location.pathname == "/" || history.location.pathname == "/login" || history.location.pathname == "/registration-success"
            || history.location.pathname =="/create-pass" || history.location.pathname == "/create-pass-success" || history.location.pathname == "/reset-passwd" || history.location.pathname == "/coffee"? null : <SideMenu/>}
 */