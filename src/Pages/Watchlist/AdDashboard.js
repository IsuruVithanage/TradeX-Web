import React, { useState, useEffect } from "react";
import BasicPage from "../../Components/BasicPage/BasicPage";
import Input from "../../Components/Input/Input";
import AdminCard from "../../Components/Admin/AdminCard";
import "./AdDashboard.css";
import axios from "axios";

export default function AdDashboard() {
    const [adminCount, setAdminCount] = useState(0);
  
    useEffect(() => {
      const fetchAdminCount = async () => {
        try {
          const response = await axios.get("http://localhost:8003/admin/getAdminCount");
          setAdminCount(response.data.count);
        } catch (error) {
          console.error("Error fetching admin count:", error);
        }
      };
  
      fetchAdminCount();
    }, []);
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
          <div className="count">{adminCount}</div>
        </AdminCard>
      </div>
      <div style={{ display: "flex" }}>
        <div className="requests">
          Verify Requests
          <div>
            <table className="verify-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Nimal Rathnayaka</td>
                  <td>02.12.2023</td>
                  <td>
                    <Input type="button" value=" Verify" outlined />
                  </td>
                </tr>
                <tr>
                  <td>Nimal Rathnayaka</td>
                  <td>02.12.2023</td>
                  <td>
                    <Input type="button" value=" Verify" outlined />
                  </td>
                </tr>
                <tr>
                  <td>Nimal Rathnayaka</td>
                  <td>02.12.2023</td>
                  <td>
                    <Input type="button" value=" Verify" outlined />
                  </td>
                </tr>
                <tr>
                  <td>Nimal Rathnayaka</td>
                  <td>02.12.2023</td>
                  <td>
                    <Input type="button" value=" Verify" outlined />
                  </td>
                </tr>
                <tr>
                  <td>Nimal Rathnayaka</td>
                  <td>02.12.2023</td>
                  <td>
                    <Input type="button" value=" Verify" outlined />
                  </td>
                </tr>
                <tr>
                  <td>Nimal Rathnayaka</td>
                  <td>02.12.2023</td>
                  <td>
                    <Input type="button" value=" Verify" outlined />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="ViewAll-btn">
            <Input type="button" value=" View All" />
          </div>
        </div>
        <div className="issues">
          Verification Issues
          <div>
            <table className="verify-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Issue</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Nimal Rathnayaka</td>
                  <td>NIC is not matching</td>
                  <td>
                    <Input type="button" value="Review" outlined red />
                  </td>
                </tr>
                <tr>
                  <td>Nimal Rathnayaka</td>
                  <td>Phone number is not verified</td>
                  <td>
                    <Input type="button" value="Review" outlined red />
                  </td>
                </tr>
                <tr>
                  <td>Nimal Rathnayaka</td>
                  <td>Files are blured</td>
                  <td>
                    <Input type="button" value="Review" outlined red />
                  </td>
                </tr>
                <tr>
                  <td>Nimal Rathnayaka</td>
                  <td>NIC is not matching</td>
                  <td>
                    <Input type="button" value="Review" outlined red />
                  </td>
                </tr>
                <tr>
                  <td>Nimal Rathnayaka</td>
                  <td>NIC is not matching</td>
                  <td>
                    <Input type="button" value="Review" outlined red />
                  </td>
                </tr>
                <tr>
                  <td>Nimal Rathnayaka</td>
                  <td>Files are blured</td>
                  <td>
                    <Input type="button" value="Review" outlined red />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="ViewAll-btn">
            <Input type="button" value=" View All" />
          </div>
        </div>
      </div>
    </BasicPage>
  );
}
