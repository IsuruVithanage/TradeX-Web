import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Welcome from '../../Pages/ExternalWallet/Welcome/Welcome';
import LoginPage1 from '../../Pages/ExternalWallet/LoginPage-1/LoginPage1';
import HaveAccount from '../../Pages/ExternalWallet/LoginPage-1/HaveAccount/HaveAccount';
import SetPassword from '../../Pages/ExternalWallet/LoginPage-1/SetPassword/SetPassword';
import SecretPhrase from '../../Pages/ExternalWallet/LoginPage-1/SetPassword/SecretPhrase/SecretPhrase';
import ConfirmSecretPhrase from '../../Pages/ExternalWallet/LoginPage-1/SetPassword/SecretPhrase/ConfirmSecretPhrase/ConfirmSecretPhrase';
import RecoverWallet from '../../Pages/ExternalWallet/LoginPage-1/ChangePassword/RecoverWallet/RecoverWallet';
import ChangePassword from '../../Pages/ExternalWallet/LoginPage-1/ChangePassword/ChangePassword';
import DashBoard from '../../Pages/ExternalWallet/DashBoard/DashBoard';
import History from '../../Pages/ExternalWallet/History/History';

export default function WalletRoutes() {
  return (
    <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<LoginPage1 />} />
        <Route path="/login/HaveAccount" element={<HaveAccount />} />
        <Route path="/login/setpassword" element={<SetPassword />} />
        <Route path="/login/setpassword/secretphrase" element={<SecretPhrase />} />
        <Route path="/login/setpassword/secretphrase/confirmsecretphrase" element={<ConfirmSecretPhrase />} />
        <Route path='/login/changepassword/recoverwallet' element={<RecoverWallet />} />
        <Route path='/login/changepassword' element={<ChangePassword />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/history" element={<History />} />
    </Routes>
  )
}