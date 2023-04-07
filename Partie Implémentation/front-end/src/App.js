import React from 'react';
import NavigationBar from './components/NavigationBar';
import SideMenu from './components/SideMenu';
import MainPage from './pages/MainPage';
import { Stack, Grid } from "@mui/material";
import { BrowserRouter, Routes , Route, Navigate, useLocation} from 'react-router-dom';

import { Sidebar, Menu, MenuItem, useProSidebar} from 'react-pro-sidebar';
import ManagePortfolios from './pages/ManagePortfolios';
import ManageMeters from './pages/ManageMeters';
import ManageInvoices from './pages/ManageInvoices';
import ManageContracts from './pages/ManageContracts';
import Preferences from './pages/Preferences';
import Profile from './pages/Profile';
import Notifications from './pages/Notifications';
import LoginPage from './pages/LoginPage';
import RegisterPage from "./pages/RegisterPage";
import ResetPassword from './pages/ResetPassword';
import RegistrationSuccess from './pages/RegistrationSuccess';
import CreateNewPassword from './pages/CreateNewPassword';
import NewPasswordSuccess from './pages/NewPasswordSuccess';
import CoffeeTest from './pages/CoffeeTest'; 
import history from './utils/history';
import { useLocalState } from './utils/useLocalStorage';
import PrivateRoute from './utils/private_route';
import {setAuthToken} from "./utils/setAuthToken";
import CreatePortfolio from './pages/CreatePortfolio';

function App() {
    const token = localStorage.getItem("jwt");
    if (token){
      setAuthToken(token);
    }
    return (
      <BrowserRouter history={history}>
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
                <Route path="/create-portfolio" exact element={
                <PrivateRoute><CreatePortfolio/></PrivateRoute>}/>
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
              </Routes>
            
      </BrowserRouter>

  );
};

export default App

/**
 * {history.location.pathname == "/" || history.location.pathname == "/login" || history.location.pathname == "/registration-success"
            || history.location.pathname =="/create-pass" || history.location.pathname == "/create-pass-success" || history.location.pathname == "/reset-passwd" || history.location.pathname == "/coffee"? null : <SideMenu/>}
 */