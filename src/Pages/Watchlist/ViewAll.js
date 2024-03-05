import React from "react";
import BasicPage from "../../Components/BasicPage/BasicPage";
import Input from "../../Components/Input/Input";
import AdminCard from "../../Components/Admin/AdminCard";
import "./ViewAll.css";

export default function ViewAll() {
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
      <div style={{ display: "flex" }}>
        <AdminCard>
          <div className="Dash-card">Users</div>
          <div className="count">120</div>
        </AdminCard>
        <AdminCard>
          <div className="Dash-card">Verified</div>
          <div className="count">110</div>
        </AdminCard>
        <AdminCard>
          <div className="Dash-card">Admin</div>
          <div className="count">020</div>
        </AdminCard>
      </div>
      <div>
        <div className="info">
          <table className="info-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Date</th>
                <th>NIC</th>
                <th>Contact</th>
                <th>Age</th>
                <th>Upload Materials</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Nimal Rathnayaka</td>
                <td>02.12.2023</td>
                <td>123456789V</td>
                <td>9876543210</td>
                <td>25</td>
                <td>
                  <Input
                    type="button"
                    value=" View"
                    style={{ width: "90px" }}
                  />
                </td>
              </tr>
              <tr>
                <td>Kamal Silva</td>
                <td>03.12.2023</td>
                <td>987654321V</td>
                <td>8765432109</td>
                <td>30</td>
                <td>
                  <Input
                    type="button"
                    value=" View"
                    style={{ width: "90px" }}
                  />
                </td>
              </tr>
              <tr>
                <td>Saman Perera</td>
                <td>04.12.2023</td>
                <td>654321987V</td>
                <td>7654321098</td>
                <td>22</td>
                <td>
                  <Input
                    type="button"
                    value=" View"
                    style={{ width: "90px" }}
                  />
                </td>
              </tr>
              <tr>
                <td>Chamari Fernando</td>
                <td>05.12.2023</td>
                <td>789012345V</td>
                <td>6543210987</td>
                <td>28</td>
                <td>
                  <Input
                    type="button"
                    value=" View"
                    style={{ width: "90px" }}
                  />
                </td>
              </tr>
              <tr>
                <td>Ruwan Rajapakse</td>
                <td>06.12.2023</td>
                <td>234567890V</td>
                <td>5432109876</td>
                <td>35</td>
                <td>
                  <Input
                    type="button"
                    value=" View"
                    style={{ width: "90px" }}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </BasicPage>
  );
}
