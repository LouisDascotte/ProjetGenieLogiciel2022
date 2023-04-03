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
import {createBrowserHistory} from "history"; 
import { useLocalState } from './utils/useLocalStorage';
import PrivateRoute from './utils/private_route';

function App() {
    let history = createBrowserHistory();
    const [jwt, setJwt] = useLocalState("", "jwt");
    /*
    useEffect(() => {
        const reqBody={
            username:"random",
            password:"random"
        }
    });

    fetch("http://localhost:8080/api/client/auth/login")*/
    return (
      <BrowserRouter >
              <Routes>   
                <Route path="/login" exact element={<LoginPage/>}/>
                <Route path="/register-account" exact element={<RegisterPage/>}/>
                <Route path='/' element={<Navigate to="/login"/>}></Route>

                <Route path='/registration-success' exact element={<RegistrationSuccess/>}/>
                <Route path='/create-pass' exact element={<PrivateRoute>
                    <CreateNewPassword/>
                </PrivateRoute>}/>
                <Route path='/create-pass-success' exact element={<PrivateRoute><NewPasswordSuccess/></PrivateRoute>}/>
                <Route path="/main-page" exact element={<PrivateRoute><MainPage/></PrivateRoute>}/>
                
                <Route path="/manage-portfolios" exact element={<ManagePortfolios/>}/>
                <Route path="/manage-meters" exact element={<ManageMeters/>}/>
                <Route path="/manage-invoices" exact element={<ManageInvoices/>}/>
                <Route path="/manage-contracts" exact element={<ManageContracts/>}/>
                <Route path="/preferences" exact element={<Preferences/>}/>
                <Route path="/profile" exact element={<Profile/>}/>
                <Route path="/notifications" exact element={<Notifications/>}/>
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