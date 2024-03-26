import React, { useEffect, useState } from "react";
import BasicPage from "../../Components/BasicPage/BasicPage";
import "./Users.css";
import "./ViewAll.css";
import axios from "axios";

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
        "http://localhost:8004/user/getAllUsers"
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
        <div className="info">
          <table className="user-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Date</th>
                <th>NIC</th>
                <th>Contact</th>
                <th>Age</th>
                <th>Verified</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
            {userList.map((user, index) => (
                <tr key={index}>
                  <td>{user.userName}</td>
                  <td>{user.Date}</td>
                  <td>{user.NIC}</td>
                  <td>{user.Contact}</td>
                  <td>{user.Age}</td>
                  <td>{user.Verified}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </BasicPage>
  );
}
