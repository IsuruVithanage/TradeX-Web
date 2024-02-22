import React, {useState, useEffect} from 'react';
import BasicPage from '../../Components/BasicPage/BasicPage';
import axios from 'axios';
import Input from '../../Components/Input/Input';

export default function Users() {
  return (
    <BasicPage
        tabs={[
          { label: "All", path: "/watchlist" },
          { label: "Custom", path: "/watchlist/customize" },
          { label: "CoinPage", path: "/watchlist/CoinPage" },
          { label: "Dashboard", path: "/watchlist/AdDashboard" },
          { label: "ViewAll", path: "/watchlist/ViewAll" },
          { label: "Users", path: "/watchlist/Users" },
          { label: "Admin", path: "/watchlist/Admin" },

        ]}
      >
    <div>
      <h1>ViewAll</h1>
    </div>
    </BasicPage>
  )
}

