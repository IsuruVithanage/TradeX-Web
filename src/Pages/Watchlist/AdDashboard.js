import React, { useState, useEffect } from "react";
import BasicPage from "../../Components/Layouts/BasicPage/BasicPage";
import Input from "../../Components/Input/Input";
import AdminCard from "../../Components/Admin/AdminCard";
import "./AdDashboard.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaUsers } from "react-icons/fa";
import { FaUserCheck } from "react-icons/fa";
import { FaUserCog } from "react-icons/fa";

export default function AdDashboard() {
  const [adminCount, setAdminCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [pendingUsers, setPendingUsers] = useState([]);
  const [verifiedUserCount, setVerifiedUserCount] = useState(0);
  const [verificationIssues, setVerificationIssues] = useState([]);

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
          "http://localhost:8004/admin/getPendingUsers"
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
          "http://localhost:8004/admin/getUserCount"
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
          "http://localhost:8004/admin/getVerifiedUserCount"
        );
        setVerifiedUserCount(response.data.count);
      } catch (error) {
        console.error("Error fetching verified user count:", error);
      }
    };

    fetchVerifiedUserCount();
  }, []);

  useEffect(() => {
    const fetchVerificationIssues = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8004/admin/getUsersWithVerificationIssues"
        );
        setVerificationIssues(response.data);
        console.log(response.data)
      } catch (error) {
        console.error("Error fetching verification issues:", error);
      }
    };

    fetchVerificationIssues();
  }, []);

  return (
    <BasicPage
      tabs={[
        { label: "Dashboard", path: "/admin/AdDashboard" },
        { label: "Users", path: "/admin/Users" },
        { label: "Admin", path: "/admin" },
        { label: "Education", path: "/admin/AddResources" },
      ]}
    >
      <div style={{ display: "flex" }}>
        <AdminCard>
          <div style={{ display: "flex" }}>
            <div>
              <div className="Dash-card">Users</div>
              <div className="count">{userCount}</div>
            </div>
            <div className="user-icon">
              <FaUsers />
            </div>
          </div>
        </AdminCard>
        <AdminCard>
          <div style={{ display: "flex" }}>
            <div>
              <div className="Dash-card">Verified</div>
              <div className="count">{verifiedUserCount}</div>
            </div>
            <div className="user-icon">
              <FaUserCheck />
            </div>
          </div>
        </AdminCard>
        <AdminCard>
          <div style={{ display: "flex" }}>
            <div>
              <div className="Dash-card">Admin</div>
              <div className="count">{adminCount}</div>
            </div>
            <div className="user-icon">
              <FaUserCog />
            </div>
          </div>
        </AdminCard>
      </div>
      <div style={{ display: "flex" }}>
        <div className="requests">
          Verify Requests
          <div style={{height:'410px'}}>
            <table className="verify-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {pendingUsers.slice(0,7).map((user) => (
                  <tr key={user.userId}>
                    <td style={{ textAlign: "left" }}>{user.userName}</td>
                    <td>{user.requestDate}</td>
                    <td>
                      <Input type="button" value=" Verify" outlined />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="ViewAll-btn">
            <Link to="/admin/ViewAll">
              <Input type="button" value=" View All" />
            </Link>
          </div>
        </div>
        <div className="issues">
          Verification Issues
          <div style={{height:'410px'}}>
            <table className="verify-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Issue</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
              {verificationIssues.map((user) => (
                  <tr key={user.userId}>
                    <td style={{ textAlign: "left" }}>{user.userName}</td>
                    <td>{user.issue}</td>
                    <td>
                      <Input type="button" value="Review" outlined red/>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="ViewAll-btn">
            <Link to="/admin/ViewIssues">
              <Input type="button" value=" View All" />
            </Link>
          </div>
        </div>
      </div>
    </BasicPage>
  );
}
