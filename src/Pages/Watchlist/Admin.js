import React, { useEffect, useState } from "react";
import BasicPage from "../../Components/Layouts/BasicPage/BasicPage";
import Input from "../../Components/Input/Input";
import "./Admin.css";
import "./ViewAll.css";
import Modal from "../../Components/Modal/Modal";
import axios from "axios";
import { RiDeleteBin6Line } from "react-icons/ri";
import Table, { TableRow } from "../../Components/Table/Table";

export default function Admin() {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] =
    useState(false);
  const [adminList, setAdminList] = useState([]);
  const [admin, setAdmin] = useState({
    AdminName: "",
    NIC: "",
    Contact: "",
    email: "",
  });
  const [errors, setErrors] = useState({});
  const [adminToDelete, setAdminToDelete] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdmin((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!admin.AdminName) newErrors.AdminName = "Admin Name is required";
    if (!admin.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(admin.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!admin.NIC) {
      newErrors.NIC = "NIC is required";
    } else if (!/^\d{9}[vVxX]$/.test(admin.NIC)) {
      newErrors.NIC = "NIC is invalid";
    }
    if (!admin.Contact) {
      newErrors.Contact = "Contact is required";
    } else if (!/^\d{10}$/.test(admin.Contact)) {
      newErrors.Contact = "Contact must be 10 digits";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handledSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    const body = { ...admin, password: generatePassword() };

    try {
      const response = await fetch("http://localhost:8003/admin/saveAdmin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        console.log("Data sent successfully");

        setAdmin({
          AdminName: "",
          NIC: "",
          Contact: "",
          email: "",
          password: "",
        });
        await loadAdmins();
      } else {
        console.error("Error sending data:", response.statusText);
      }
    } catch (error) {
      console.error("Error sending data:", error.message);
    }
  };

  const generatePassword = () => {
    const length = 15;
    const chars = ['ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz', '0123456789@'];
    let password = '';
    for (let i = 0; i < length; i++) {
        password += chars[i % 3].charAt(Math.floor(Math.random() * chars[i % 3].length));
    }
    console.log(password);
    return password;
  };

  const loadAdmins = async () => {
    try {
      const result = await axios.get(
        "http://localhost:8003/admin/getAllAdmins"
      );
      setAdminList(result.data);
      console.log(result.data);
    } catch (error) {
      console.error("Error fetching Admins", error);
    }
  };

  useEffect(() => {
    loadAdmins();
  }, []);

  const confirmDeleteAdmin = (AdminId) => {
    setAdminToDelete(AdminId);
    setIsConfirmDeleteModalOpen(true);
  };
   

  const deleteAdmin = async () => {
    try {
      await axios.delete(`http://localhost:8003/admin/${adminToDelete}`);
      setAdminList(
        adminList.filter((admin) => admin.AdminId !== adminToDelete)
      );
      setIsConfirmDeleteModalOpen(false);
      setAdminToDelete(null);
    } catch (error) {
      console.error("Error deleting admin", error);
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
          <div>
            <Input
              type="button"
              value="Create Account"
              style={{
                width: "150px",
                marginLeft: "85%",
                marginBottom: "15px",
                marginTop: "15px",
              }}
              onClick={() => setIsDeleteModalOpen(true)}
            />
            <Modal
              open={isDeleteModalOpen}
              close={() => setIsDeleteModalOpen(false)}
            >
              <div style={{ width: "450px" }}>
                <div
                  style={{
                    width: "335px",
                    margin: "auto",
                    marginBottom: "25px",
                  }}
                >
                  <h1
                    style={{
                      textAlign: "center",
                      marginBottom: "20px",
                      color: "white",
                    }}
                  >
                    Create Admin
                  </h1>
                  <form>
                    <Input
                      type="text"
                      placeholder="AdminName"
                      className="Admin-details"
                      name="AdminName"
                      id="AdminName"
                      value={admin.AdminName}
                      onChange={handleChange}
                      underline
                      style={{ marginBottom: "20px" }}
                    />
                    {errors.AdminName && (
                      <p style={{ color: "red", marginTop: "5px" }}>
                        {errors.AdminName}
                      </p>
                    )}
                    <Input
                      type="text"
                      placeholder="Email"
                      className="Admin-details"
                      name="email"
                      id="Email"
                      value={admin.email}
                      onChange={handleChange}
                      underline
                      style={{ marginBottom: "20px" }}
                    />
                    {errors.email && (
                      <p style={{ color: "red", marginTop: "5px" }}>
                        {errors.email}
                      </p>
                    )}
                    <Input
                      type="text"
                      placeholder="NIC"
                      className="Admin-details"
                      name="NIC"
                      id="NIC"
                      value={admin.NIC}
                      onChange={handleChange}
                      underline
                      style={{ marginBottom: "20px" }}
                    />
                    {errors.NIC && (
                      <p style={{ color: "red", marginTop: "5px" }}>
                        {errors.NIC}
                      </p>
                    )}
                    <Input
                      type="text"
                      placeholder="Contact"
                      className="Admin-details"
                      name="Contact"
                      id="Contact"
                      value={admin.Contact}
                      onChange={handleChange}
                      underline
                      style={{ marginBottom: "20px" }}
                    />
                    {errors.Contact && (
                      <p style={{ color: "red", marginTop: "5px" }}>
                        {errors.Contact}
                      </p>
                    )}
                    <div className="create-admin-btn">
                      <Input
                        type="button"
                        style={{ width: "110px" }}
                        value="Submit"
                        onClick={handledSubmit}
                      />
                      <Input
                        type="button"
                        style={{ width: "110px" }}
                        onClick={() => setIsDeleteModalOpen(false)}
                        value="Cancel"
                        red
                      />
                    </div>
                  </form>
                </div>
              </div>
            </Modal>
          </div>
          <Table hover={true}>
            <TableRow data={["Name", "Email", "NIC", "Contact", "Delete"]} />
            {adminList.map((admin) => (
              <TableRow
                key={admin.AdminId}
                data={[
                  admin.AdminName,
                  admin.email,
                  admin.NIC,
                  admin.Contact,
                  <RiDeleteBin6Line
                    onClick={() => confirmDeleteAdmin(admin.AdminId)}
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
        
        {isConfirmDeleteModalOpen && (
          <Modal
            open={isConfirmDeleteModalOpen}
            close={() => setIsConfirmDeleteModalOpen(false)}
          >
            <div
              style={{ width: "300px", margin: "auto", textAlign: "center", marginBottom:"20px" }}
            >
              <h2>Do you confirm to delete this admin?</h2>
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
                        onClick={deleteAdmin}
                        value="Yes"
                />
                <Input
                        type="button"
                        style={{ width: "110px" }}
                        onClick={() => setIsConfirmDeleteModalOpen(false)}
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
