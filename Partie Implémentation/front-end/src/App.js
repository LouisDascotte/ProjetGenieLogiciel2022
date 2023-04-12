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
//import history from './utils/history';
import { useLocalState } from './utils/useLocalStorage';
import PrivateRoute from './utils/private_route';
import {setAuthToken} from "./utils/setAuthToken";
import ErrorPage from './pages/ErrorPage';
import Testing from './pages/Testing';
import StaffMainPage from './pagesStaff/StaffMainPage';
import StaffManageClients from './pagesStaff/StaffManageClients';
import StaffManageContracts from './pagesStaff/StaffManageContracts';
import StaffManageConsumption from './pagesStaff/StaffManageConsumption';
import StaffViewClient from './pagesStaff/StaffViewClient';
import StaffAddClient from './pagesStaff/StaffAddClient';
import StaffLinkMeter from './pagesStaff/StaffLinkMeter';
import ChartAnalysis from './pages/ChartAnalysis';


function App() {
    const token = localStorage.getItem("jwt");
    if (token){
      setAuthToken(token);
    }
    return (
      <BrowserRouter history={null}>
              <Routes>   
                <Route path="/login" exact element={<LoginPage/>}/>
                <Route path="/register-account" exact element={<RegisterPage/>}/>
                <Route path='/' element={<Navigate to="/login"/>}></Route>

                <Route path='/registration-success' exact element={<RegistrationSuccess/>}/>
                <Route path='/create-pass' exact element={<PrivateRoute>
                    <CreateNewPassword/>
                </PrivateRoute>}/>
                <Route path='/create-pass-success' exact element={<PrivateRoute>
                  <NewPasswordSuccess/>
                  </PrivateRoute>}/>
                <Route path="/main-page" exact element={<PrivateRoute>
                  <MainPage/>
                  </PrivateRoute>}/>
                <Route path="/manage-portfolios" exact element={<PrivateRoute>
                  <ManagePortfolios/>
                </PrivateRoute>}/>
                <Route path="/manage-meters" exact element={<PrivateRoute>
                  <ManageMeters/>
                </PrivateRoute>}/>
                <Route path="/manage-invoices" exact element={<PrivateRoute>
                  <ManageInvoices/>
                  </PrivateRoute>}/>
                <Route path="/manage-contracts" exact element={<PrivateRoute>
                  <ManageContracts/>
                  </PrivateRoute>}/>
                <Route path="/preferences" exact element={<PrivateRoute>
                  <Preferences/>
                  </PrivateRoute>}/>
                <Route path="/profile" exact element={<PrivateRoute>
                  <Profile/>
                  </PrivateRoute>}/>
                <Route path="/notifications" exact element={<PrivateRoute>
                  <Notifications/>
                  </PrivateRoute>}/>
                <Route path='/reset-passwd' exact element={<ResetPassword/>}/>
                  <Route path='/chart' exact element={<ChartAnalysis/>}/>
                  <Route path="*" element={<ErrorPage/>}/>

                  <Route path='/test' exact element={<Testing/>}/>
                  <Route path='/staff' exact element={<StaffMainPage/>}/>
                  <Route path='/staff-contracts' exact element={<StaffManageContracts/>}/>
                  <Route path='/staff-clients' exact element={<StaffManageClients/>}/>
                  <Route path='/staff-cons' exact element={<StaffManageConsumption/>}/>
                  <Route path='/meter/:id' element={<StaffManageConsumption/>}/>
                  <Route path='/staff-clients/:id' element={<StaffViewClient/>}/>
                  <Route path='/staff-clients/new' element={<StaffAddClient/>}/>
                  <Route path='/staff-clients/:id/link-meter' element={<StaffLinkMeter/>}/>
              </Routes>
            
      </BrowserRouter>

  );
};

export default App

/**
 * {history.location.pathname == "/" || history.location.pathname == "/login" || history.location.pathname == "/registration-success"
            || history.location.pathname =="/create-pass" || history.location.pathname == "/create-pass-success" || history.location.pathname == "/reset-passwd" || history.location.pathname == "/coffee"? null : <SideMenu/>}
 */