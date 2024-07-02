import React, { useEffect, useState } from "react";
import BasicPage from "../../Components/Layouts/BasicPage/BasicPage";
import "./Users.css";
import "./ViewAll.css";
import axios from "axios";
import { RiDeleteBin6Line } from "react-icons/ri";
import Table, { TableRow } from "../../Components/Table/Table";


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

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:8004/admin/deleteUser/${userId}`);
      setUserList(userList.filter(user => user.userId !== userId));
    } catch (error) {
      console.error("Error deleting user", error);
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

      ]}
    >
      <div>
        <div className="info">
          <Table
              hover={true}
            >
              <TableRow data={["Name", "Email", "Role", "NIC", "Contact", "Delete"]} classes={["col1","col2","col3","col4", "col5","col6"]}/>
              {userList.map((user) => (
                <TableRow 
                  classes={["col1","col2","col3","col4", "col5","col6"]}
                  key={user.userId}
                  data={[
                    user.userName,
                    <span style={{width: "50px"}}>{user.email}</span>,
                    user.role,
                    user.nic,
                    user.phoneNumber,
                    <RiDeleteBin6Line onClick={() => deleteUser(user.userId)}
                    style={{ cursor: "pointer" }} />
                  ]}
                />
              ))}
            </Table>
        </div>
      </div>
    </BasicPage>
  );
}
