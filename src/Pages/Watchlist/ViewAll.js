import React, { useState, useEffect } from "react";
import BasicPage from "../../Components/BasicPage/BasicPage";
import Input from "../../Components/Input/Input";
import AdminCard from "../../Components/Admin/AdminCard";
import "./ViewAll.css";
import axios from "axios";

export default function ViewAll() {
  const [adminCount, setAdminCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [pendingUsers, setPendingUsers] = useState([]);
  const [verifiedUserCount, setVerifiedUserCount] = useState(0);

  useEffect(() => {
    const fetchAdminCount = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8003/admin/getAdminCount"
        );
        setAdminCount(response.data.count);
      } catch (error) {
        console.error("Error fetching admin count:", error);
      }
    };

    fetchAdminCount();
  }, []);

  useEffect(() => {
    const fetchPendingUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8004/user/getPendingUsers"
        );
        setPendingUsers(response.data);
      } catch (error) {
        console.error("Error fetching pending users:", error);
      }
    };

    fetchPendingUsers();
  }, []);

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8004/user/getUserCount"
        );
        setUserCount(response.data.count);
      } catch (error) {
        console.error("Error fetching user count:", error);
      }
    };

    fetchUserCount();
  }, []);

  useEffect(() => {
    const fetchVerifiedUserCount = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8004/user/getVerifiedUserCount"
        );
        setVerifiedUserCount(response.data.count);
      } catch (error) {
        console.error("Error fetching verified user count:", error);
      }
    };

    fetchVerifiedUserCount();
  }, []);

  return (
    <BasicPage
      tabs={[
        { label: "All", path: "/watchlist" },
        { label: "Custom", path: "/watchlist/customize" },
        { label: "CoinPage", path: "/watchlist/CoinPage" },
        { label: "Dashboard", path: "/watchlist/AdDashboard" },
        { label: "Users", path: "/watchlist/Users" },
        { label: "Admin", path: "/watchlist/Admin" },
      ]}
    >
      <div style={{ display: "flex" }}>
        <AdminCard>
          <div className="Dash-card">Users</div>
          <div className="count">{userCount}</div>
        </AdminCard>
        <AdminCard>
          <div className="Dash-card">Verified</div>
          <div className="count">{verifiedUserCount}</div>
        </AdminCard>
        <AdminCard>
          <div className="Dash-card">Admin</div>
          <div className="count">{adminCount}</div>
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
              {pendingUsers.map((user) => (
                <tr key={user.userId}>
                  <td style={{ textAlign: "left" }}>{user.userName}</td>
                  <td>{user.Date}</td>
                  <td>{user.NIC}</td>
                  <td>{user.Contact}</td>
                  <td>{user.Age}</td>
                  <td>
                    <Input
                      type="button"
                      value=" View"
                      style={{ width: "90px" }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </BasicPage>
  );
}
