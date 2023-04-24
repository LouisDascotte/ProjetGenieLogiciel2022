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
import MainPage from './pages/MainPage';
import ManageClients from './pages/ManageClients';
import ManageContracts from './pages/ManageContracts';
import ManageConsumption from './pages/ManageConsumption';
import ViewClient from './pages/ViewClient';
import LinkMeter from './pages/LinkMeter';
import ViewContract from './pages/ViewContract';
import NewContract from './pages/NewContract';
import ContractsRequests from "./pages/ContractsRequests";
import ViewContractRequest from "./pages/ViewContractRequest";
import ViewConsumption from "./pages/ViewConsumption";
import ImportConsumption from "./pages/ImportConsumption";
import ViewMeter from "./pages/ViewMeter";
import ManageOffer from "./pages/ManageOffer";
import NewOffer from "./pages/NewOffer";


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

                  <Route path='/main-page' exact element={<PrivateRoute><MainPage/></PrivateRoute>}/>
                  <Route path='/contracts' exact element={<PrivateRoute><ManageContracts/></PrivateRoute>}/>
                  <Route path='/clients' exact element={<PrivateRoute><ManageClients/></PrivateRoute>}/>
                  <Route path='/consumption' exact element={<PrivateRoute><ManageConsumption/></PrivateRoute>}/>
                  <Route path='/clients/:clientId' element={<PrivateRoute><ViewClient/></PrivateRoute>}/>
                  <Route path='/clients/:clientId/link-meter' element={<PrivateRoute><LinkMeter/></PrivateRoute>}/>
                  <Route path='/contracts/:contractId' element={<PrivateRoute><ViewContract/></PrivateRoute>}/>
                  <Route path='/contracts/new' element={<PrivateRoute><NewContract/></PrivateRoute>}/>
                  <Route path='/contracts/requests' element={<PrivateRoute><ContractsRequests/></PrivateRoute>}/>
                  <Route path='/contracts/requests/:requestId' element={<PrivateRoute><ViewContractRequest/></PrivateRoute>}/>
                  <Route path='/consumption/meter/:meterId' element={<PrivateRoute><ViewMeter/></PrivateRoute>}/>
                  <Route path='/consumption/meter/:meterId/:date' element={<PrivateRoute><ViewConsumption/></PrivateRoute>}/>
                  <Route path='/consumption/meter/:meterId/import' element={<PrivateRoute><ImportConsumption/></PrivateRoute>}/>
                  <Route path='/offers' element={<PrivateRoute><ManageOffer/></PrivateRoute>}/>
                  <Route path='/offers/new' element={<PrivateRoute><NewOffer/></PrivateRoute>}/>
              </Routes>
            
      </BrowserRouter>

  );
};

export default App

/**
 * {history.location.pathname == "/" || history.location.pathname == "/login" || history.location.pathname == "/registration-success"
            || history.location.pathname =="/create-pass" || history.location.pathname == "/create-pass-success" || history.location.pathname == "/reset-passwd" || history.location.pathname == "/coffee"? null : <SideMenu/>}
 */