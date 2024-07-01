import React, { useState, useEffect } from "react";
import BasicPage from "../../Components/Layouts/BasicPage/BasicPage";
import Input from "../../Components/Input/Input";
import AdminCard from "../../Components/Admin/AdminCard";
import "./ViewAll.css";
import axios from "axios";
import { FaUsers } from "react-icons/fa";
import { FaUserCheck } from "react-icons/fa";
import { FaUserCog } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "./AdminUserVerification";

export default function ViewAll() {
  const [adminCount, setAdminCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [pendingUsers, setPendingUsers] = useState([]);
  const [verifiedUserCount, setVerifiedUserCount] = useState(0);
  const navigate = useNavigate();

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

  const viewDetails = (id) => {
    navigate(`/Admin/AdminUserVerification/${id}`);

  }

  return (
    <BasicPage
      tabs={[
        { label: "Dashboard", path: "/admin/AdDashboard" },
        { label: "Users", path: "/admin/Users" },
        { label: "Admin", path: "/admin/Admin" },
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
      <div>
        <div className="info">
          <table className="info-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Level</th>
                <th>Quiz Taken</th>
                <th>Upload Materials</th>
              </tr>
            </thead>
            <tbody>
              {pendingUsers.map((user) => (
                <tr key={user.userId}>
                  <td style={{ textAlign: "left" }}>{user.userName}</td>
                  <td>{user.email}</td>
                  <td>{user.level}</td>
                  <td>{user.hasTakenQuiz}</td>
                  <td>
                    <Input
                      type="button"
                      value=" View"
                      style={{ width: "90px" }}
                      onClick={() => navigate(`/Admin/AdminUserVerification/${user.userId}`)}
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
