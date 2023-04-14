import { Stack } from "@mui/material";
import React from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import CreateNewPassword from './pages/CreateNewPassword';
import LoginPage from './pages/LoginPage';
import NewPasswordSuccess from './pages/NewPasswordSuccess';
import Notifications from './pages/Notifications';
import Preferences from './pages/Preferences';
import Profile from './pages/Profile';
import RegisterPage from "./pages/RegisterPage";
import ResetPassword from './pages/ResetPassword';
import RegistrationSuccess from './pages/RegistrationSuccess';
//import history from './utils/history';
import { useLocalState } from './utils/useLocalStorage';
import PrivateRoute from './utils/private_route';
import {setAuthToken} from "./utils/setAuthToken";
import ErrorPage from './pages/ErrorPage';
import Testing from './pages/Testing';
import MainPage from './pages/MainPage';
import ManageClients from './pages/ManageClients';
import ManageContracts from './pages/ManageContracts';
import ManageConsumption from './pages/ManageConsumption';
import ViewClient from './pages/ViewClient';
import AddClient from './pages/NewClient';
import LinkMeter from './pages/LinkMeter';
import ViewContract from './pages/ViewContract';
import NewContract from './pages/StaffNewContract';


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
                  <Route path="*" element={<ErrorPage/>}/>

                  <Route path='/test' exact element={<Testing/>}/>
                  <Route path='/staff' exact element={<MainPage/>}/>
                  <Route path='/staff-contracts' exact element={<ManageContracts/>}/>
                  <Route path='/staff-clients' exact element={<ManageClients/>}/>
                  <Route path='/staff-cons' exact element={<ManageConsumption/>}/>
                  <Route path='/meter/:id' element={<ManageConsumption/>}/>
                  <Route path='/staff-clients/:id' element={<ViewClient/>}/>
                  <Route path='/staff-clients/new' element={<AddClient/>}/>
                  <Route path='/staff-clients/:id/link-meter' element={<LinkMeter/>}/>
                  <Route path='/staff-contracts/:id' element={<ViewContract/>}/>
                  <Route path='/staff-contracts/new' element={<NewContract/>}/>
              </Routes>
            
      </BrowserRouter>

  );
};

export default App

/**
 * {history.location.pathname == "/" || history.location.pathname == "/login" || history.location.pathname == "/registration-success"
            || history.location.pathname =="/create-pass" || history.location.pathname == "/create-pass-success" || history.location.pathname == "/reset-passwd" || history.location.pathname == "/coffee"? null : <SideMenu/>}
 */