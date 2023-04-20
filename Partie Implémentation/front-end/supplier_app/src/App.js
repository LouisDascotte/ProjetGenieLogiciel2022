import { Stack } from "@mui/material";
import React from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Notifications from './pages/Notifications';
import Preferences from './pages/Preferences';
import Profile from './pages/Profile';
//import history from './utils/history';
import { useLocalState } from './utils/useLocalStorage';
import PrivateRoute from './utils/private_route';
import {setAuthToken} from "./utils/setAuthToken";
import ResetPassword from "./pages/ResetPassword";
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
import NewContract from './pages/NewContract';
import ContractsRequests from "./pages/ContractsRequests";
import ViewContractRequest from "./pages/ViewContractRequest";
import ViewConsumption from "./pages/ViewConsumption";
import ImportConsumption from "./pages/ImportConsumption";
import ViewMeter from "./pages/ViewMeter";
import ManageOffer from "./pages/ManageOffer";


function App() {
    const token = localStorage.getItem("jwt");
    if (token){
      setAuthToken(token);
    }
    return (
      <BrowserRouter history={null}>
              <Routes>   
                <Route path="/login" exact element={<LoginPage/>}/>
                <Route path='/' element={<Navigate to="/login"/>}/>
                <Route path="/preferences" exact element={<PrivateRoute>
                  <Preferences/>
                  </PrivateRoute>}/>
                <Route path="/profile" exact element={<PrivateRoute>
                  <Profile/>
                  </PrivateRoute>}/>
                <Route path="/notifications" exact element={<PrivateRoute>
                  <Notifications/>
                  </PrivateRoute>}/>
                  <Route path="*" element={<ErrorPage/>}/>
                  <Route path="/reset-passwd" element={<ResetPassword/>}/>

                  <Route path='/test' exact element={<Testing/>}/>
                  <Route path='/main-page' exact element={<MainPage/>}/>
                  <Route path='/contracts' exact element={<ManageContracts/>}/>
                  <Route path='/clients' exact element={<ManageClients/>}/>
                  <Route path='/consumption' exact element={<ManageConsumption/>}/>
                  <Route path='/clients/:clientId' element={<ViewClient/>}/>
                  <Route path='/clients/new' element={<AddClient/>}/>
                  <Route path='/clients/:clientId/link-meter' element={<LinkMeter/>}/>
                  <Route path='/contracts/:contractId' element={<ViewContract/>}/>
                  <Route path='/contracts/new' element={<NewContract/>}/>
                  <Route path='/contracts/requests' element={<ContractsRequests/>}/>
                  <Route path='/contracts/requests/:requestId' element={<ViewContractRequest/>}/>
                  <Route path='/consumption/meter/:meterId' element={<ViewMeter/>}/>
                  <Route path='/consumption/meter/:meterId/:date' element={<ViewConsumption/>}/>
                  <Route path='/consumption/meter/:meterId/import' element={<ImportConsumption/>}/>
                  <Route path='/offers' element={<ManageOffer/>}/>
              </Routes>
            
      </BrowserRouter>

  );
};

export default App

/**
 * {history.location.pathname == "/" || history.location.pathname == "/login" || history.location.pathname == "/registration-success"
            || history.location.pathname =="/create-pass" || history.location.pathname == "/create-pass-success" || history.location.pathname == "/reset-passwd" || history.location.pathname == "/coffee"? null : <SideMenu/>}
 */