import React, { useEffect, useState } from "react";
import BasicPage from "../../Components/Layouts/BasicPage/BasicPage";
import "./Users.css";
import "./ViewAll.css";
import axios from "axios";
import { RiDeleteBin6Line } from "react-icons/ri";
import Table, { TableRow } from "../../Components/Table/Table";
import Modal from "../../Components/Modal/Modal";
import Input from "../../Components/Input/Input";

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

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

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

  const confirmDeleteUser = (userId) => {
    setUserToDelete(userId);
    setIsDeleteModalOpen(true);
  };

  const deleteUser = async () => {
    try {
      await axios.delete(
        `http://localhost:8004/admin/deleteUser/${userToDelete}`
      );
      setUserList(userList.filter((user) => user.userId !== userToDelete));
      setIsDeleteModalOpen(false);
      setUserToDelete(null);
    } catch (error) {
      console.error("Error deleting user", error);
    }
  };

  return (
    <BasicPage
      tabs={[
        { label: "Dashboard", path: "/admin/AdDashboard" },
        { label: "Users", path: "/admin/Users" },
        { label: "Admin", path: "/admin" },
      ]}
    >
      <div>
        <div>
          <Table hover={true} style={{ marginTop: "15px" }}>
            <TableRow
              data={["Name", "Email", "Role", "NIC", "Contact", "Delete"]}
              classes={["col1", "col2", "col3", "col4", "col5", "col6"]}
            />
            {userList.map((user) => (
              <TableRow
                classes={["col1", "col2", "col3", "col4", "col5", "col6"]}
                key={user.userId}
                data={[
                  user.userName,
                  <span style={{ width: "200px", textAlign: "center" }}>
                    {user.email}
                  </span>,
                  user.role,
                  user.nic,
                  user.phoneNumber,
                  <RiDeleteBin6Line
                    onClick={() => confirmDeleteUser(user.userId)}
                    style={{
                      cursor: "pointer",
                      fontSize: "20px",
                      color: "red",
                    }}
                  />,
                ]}
              />
            ))}
          </Table>
        </div>

        {isDeleteModalOpen && (
          <Modal
            open={isDeleteModalOpen}
            close={() => setIsDeleteModalOpen(false)}
          >
            <div
              style={{ width: "300px", margin: "auto", textAlign: "center" }}
            >
              <h2>Do you confirm to delete this user?</h2>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  marginTop: "20px",
                }}
              >
                <Input
                        type="button"
                        style={{ width: "110px" }}
                        onClick={deleteUser}
                        value="Yes"
                />
                <Input
                        type="button"
                        style={{ width: "110px" }}
                        onClick={() => setIsDeleteModalOpen(false)}
                        value="No"
                        red
                />
              </div>
            </div>
          </Modal>
        )}
      </div>
    </BasicPage>
  );
}
