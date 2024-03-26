import React, { useEffect, useState } from "react";
import BasicPage from "../../Components/BasicPage/BasicPage";
import Input from "../../Components/Input/Input";
import "./Admin.css";
import "./ViewAll.css";
import Modal from "../../Components/Modal/Modal";
import axios from "axios";

export default function Admin() {
  const [isdeleteModalOpen, setIsdeleteModalOpen] = useState(false);
  const [adminList, setAdminList] = useState([]);
  const [admin, setAdmin] = useState({
    AdminName: "",
    Date: "",
    NIC: "",
    Contact: "",
    Age: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdmin((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setAdmin({
      AdminName: document.getElementById("AdminName").value,
      Date: document.getElementById("Date").value,
      NIC: document.getElementById("NIC").value,
      Contact: document.getElementById("Contact").value,
      Age: document.getElementById("Age").value,
    });

    console.log(admin);

    try {
      const response = await fetch("http://localhost:8003/admin/saveAdmin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(admin),
      });

      if (response.ok) {
        console.log("Data sent successfully");

        setAdmin({
          AdminName: "",
          Date: "",
          NIC: "",
          Contact: "",
          Age: "",
        });
        await loadAdmins();
      } else {
        console.error("Error sending data:", response.statusText);
      }
    } catch (error) {
      console.error("Error sending data:", error.message);
    }
  };

  const loadAdmins = async () => {
    try {
      const result = await axios.get(
        "http://localhost:8003/admin/getAllAdmins"
      );
      setAdminList(result.data);
    } catch (error) {
      console.error("Error fetching Admins", error);
    }
  };

  useEffect(() => {
    loadAdmins();
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
          <div>
            <Input
              type="button"
              value="Create Account"
              style={{ width: "150px", marginLeft: "85%" }}
              onClick={() => setIsdeleteModalOpen(true)}
            />
            <Modal
              open={isdeleteModalOpen}
              close={() => setIsdeleteModalOpen(false)}
            >
              <div
                style={{
                  width: "450px",
                }}
              >
                <div
                  style={{
                    width: "300px",
                    margin: "auto",
                    marginBottom: "25px",
                  }}
                >
                  <h1 style={{ textAlign: "center" }}>Create Admin</h1>
                  <Input
                    type="text"
                    placeholder="Username"
                    className="Admin-details"
                    name="AdminName"
                    id="AdminName"
                    value={admin.AdminName}
                    onChange={handleChange}
                  />
                  <Input
                    type="text"
                    placeholder="Date"
                    className="Admin-details"
                    name="Date"
                    id="Date"
                    value={admin.Date}
                    onChange={handleChange}
                  />
                  <Input
                    type="text"
                    placeholder="NIC"
                    className="Admin-details"
                    name="NIC"
                    id="NIC"
                    value={admin.NIC}
                    onChange={handleChange}
                  />
                  <Input
                    type="text"
                    placeholder="Contact"
                    className="Admin-details"
                    name="Contact"
                    id="Contact"
                    value={admin.Contact}
                    onChange={handleChange}
                  />
                  <Input
                    type="text"
                    placeholder="Age"
                    className="Admin-details"
                    name="Age"
                    id="Age"
                    value={admin.Age}
                    onChange={handleChange}
                  />

                  <div className="create-admin-btn">
                    <Input
                      type="button"
                      style={{ width: "110px" }}
                      value="Submit"
                      onClick={handleSubmit}
                    />
                    <Input
                      type="button"
                      style={{ width: "110px" }}
                      onClick={() => setIsdeleteModalOpen(false)}
                      value="Cancel"
                      red
                    />
                  </div>
                </div>
              </div>
            </Modal>
          </div>
          <table className="Admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Date</th>
                <th>NIC</th>
                <th>Contact</th>
                <th>Age</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {adminList.map((admin, index) => (
                <tr key={index}>
                  <td>{admin.AdminName}</td>
                  <td>{admin.Date}</td>
                  <td>{admin.NIC}</td>
                  <td>{admin.Contact}</td>
                  <td>{admin.Age}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </BasicPage>
  );
}
