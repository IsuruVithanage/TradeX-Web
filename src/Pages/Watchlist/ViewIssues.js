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
import Table, { TableRow } from "../../Components/Table/Table";

export default function ViewAll() {
  const [adminCount, setAdminCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [pendingUsers, setPendingUsers] = useState([]);
  const [verifiedUserCount, setVerifiedUserCount] = useState(0);
  const [verificationIssues, setVerificationIssues] = useState([]);
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
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching verification issues:", error);
      }
    };

    fetchVerificationIssues();
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
        <div>
          <Table
              hover={true}
              style={{ height: "65vh", overflowY: "auto", fontSize: "1.10rem" }}
            >
              <TableRow data={["Name", "Email", "Contact", "Issue", "Upload Materials"]} />
              {verificationIssues.map((user) => (
                <TableRow
                  key={user.userId}
                  data={[
                    user.userName,
                    user.email,
                    user.phoneNumber,
                    user.issue,
                    <Input
                    type="button"
                    value=" View"
                    style={{ width: "90px" }}
                    onClick={() => navigate(`/Admin/AdminUserVerification/${user.userId}`)}
                    />,
                  ]}
                />
              ))}
            </Table>
        </div>
      </div>
    </BasicPage>
  );
}
