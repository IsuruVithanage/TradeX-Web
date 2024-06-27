import React from 'react'
import { Routes, Route } from 'react-router-dom';
import NotFound from '../../Pages/NotFound/NotFound';
import Home from '../../Pages/ExternalWallet/Home/Home';
import StartPage from '../../Pages/ExternalWallet/Start/StartPage';
import LoginAccount from '../../Pages/ExternalWallet/Login/LoginAccount';
import CreateOrResetWallet from '../../Pages/ExternalWallet/CreateOrResetWallet/CreateOrResetWallet';
import GenerateSP from '../../Pages/ExternalWallet/SecretPhrase/Generate/GenerateSP';
import ConfirmSP from '../../Pages/ExternalWallet/SecretPhrase/Confirm/ConfirmSP';
import DashBoard from '../../Pages/ExternalWallet/DashBoard/DashBoard';
import History from '../../Pages/ExternalWallet/History/History';


export default function WalletRoutes() {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/start" element={<StartPage />} />
        <Route path="/login" element={<LoginAccount />} />
        <Route path="/create" element={<CreateOrResetWallet />} />
        <Route path="/reset" element={<CreateOrResetWallet />} />
        <Route path="/secret-phrase" element={<GenerateSP />} />
        <Route path="/secret-phrase/confirm" element={<ConfirmSP />} />
        <Route path="/secret-phrase/validate" element={<ConfirmSP />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/history" element={<History />} />
        <Route path="*" element={<NotFound />} />
    </Routes>
  )
}