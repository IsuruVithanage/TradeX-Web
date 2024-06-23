import React from 'react'
import { Routes, Route } from 'react-router-dom';
import NotFound from '../../Pages/NotFound/NotFound';
import Home from '../../Pages/ExternalWallet/Home/Home';
import StartPage from '../../Pages/ExternalWallet/Start/StartPage';
import LoginAccount from '../../Pages/ExternalWallet/Login/LoginAccount';
import CreateWallet from '../../Pages/ExternalWallet/CreateWallet/CreateWallet';
import GenerateSP from '../../Pages/ExternalWallet/SecretPhrase/Generate/GenerateSP';
import ConfirmSP from '../../Pages/ExternalWallet/SecretPhrase/Confirm/ConfirmSP';
import RecoverWallet from '../../Pages/ExternalWallet/SecretPhrase/Reset/RecoverWallet';
import ChangePassword from '../../Pages/ExternalWallet/ChangePassword/ChangePassword/ChangePassword';
import DashBoard from '../../Pages/ExternalWallet/DashBoard/DashBoard';
import History from '../../Pages/ExternalWallet/History/History';

export default function WalletRoutes() {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<StartPage />} />
        <Route path="/login/HaveAccount" element={<LoginAccount />} />
        <Route path="/login/setpassword" element={<CreateWallet />} />
        <Route path="/login/setpassword/secretphrase" element={<GenerateSP />} />
        <Route path="/login/setpassword/secretphrase/confirmsecretphrase" element={<ConfirmSP />} />
        <Route path='/login/changepassword/recoverwallet' element={<RecoverWallet />} />
        <Route path='/login/changepassword' element={<ChangePassword />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/history" element={<History />} />

        <Route path="/" element={<Home />} />
        <Route path="/start" element={<StartPage />} />
        <Route path="/login" element={<LoginAccount />} />
        <Route path="/create" element={<CreateWallet />} />
        <Route path="/secret-phrase" element={<GenerateSP />} />
        <Route path="/secret-phrase/confirm" element={<ConfirmSP />} />
        <Route path='/recover' element={<RecoverWallet />} />
        <Route path='/changePassword' element={<ChangePassword />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/history" element={<History />} />
        <Route path="*" element={<NotFound />} />
    </Routes>
  )
}