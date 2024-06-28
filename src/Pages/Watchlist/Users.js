import React, { useEffect, useState } from "react";
import BasicPage from "../../Components/Layouts/BasicPage/BasicPage";
import "./Users.css";
import "./ViewAll.css";
import axios from "axios";
import { RiDeleteBin6Line } from "react-icons/ri";


export default function Users() {
  const getVerifiedCellStyle = (isVerified) => {
    return isVerified ? { color: "#21DB9A" } : { color: "red" };
  };

  const [userList, setUserList] = useState([]);
  const [user, setUser] = useState({
    AdminName: "",
    Date: "",
    NIC: "",
    Contact: "",
    Age: "",
  });

  const loadUsers = async () => {
    try {
      const result = await axios.get(
        "http://localhost:8004/admin/getAllUserDetails"
      );
      setUserList(result.data);
    } catch (error) {
      console.error("Error fetching Users", error);
    }
  };

  useEffect(() => {
    loadUsers();
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
      <div>
        <div className="info">
          <table className="user-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Verification Status</th>
                <th>Levels</th>
                <th>Quiz Taken</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
            {userList.map((user, index) => (
                <tr key={index}>
                  <td>{user.userName}</td>
                  <td>{user.email}</td>
                  <td>{user.isVerified}</td>
                  <td>{user.level}</td>
                  <td>{user.hasTakenQuiz}</td>
                  <td><RiDeleteBin6Line /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </BasicPage>
  );
}
