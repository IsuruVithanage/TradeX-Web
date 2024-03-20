import React, { useEffect, useState } from "react";
import BasicPage from "../../Components/BasicPage/BasicPage";
import Input from "../../Components/Input/Input";
import "./Admin.css";
import "./ViewAll.css";
import Modal from "../../Components/Modal/Modal";
import axios from "axios";

export default function Admin() {
  const [isdeleteModalOpen, setIsdeleteModalOpen] = useState(false);
  const [isSetterModalOpen, setIsSetterModalOpen] = useState(false);
  const [adminList, setAdminList] = useState([]);

  const getVerifiedCellStyle = (isVerified) => {
    return isVerified ? { color: "#21DB9A" } : { color: "red" };
  };

  const loadAdmins = async () => {
    try {
      const result = await axios.get(
        `http://localhost:8002/admin/getAllAdmins`
      );
      setAdminList(result.data);
    } catch (error) {
      console.error("Error fetching Admins", error);
    }
  };
  useEffect(() => {
    loadAdmins();
  }, []);

  console.log(adminList);

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
                  />
                  <Input
                    type="text"
                    placeholder="Email"
                    className="Admin-details"
                  />
                  <Input
                    type="text"
                    placeholder="Contact"
                    className="Admin-details"
                  />
                  <Input
                    type="text"
                    placeholder="Address"
                    className="Admin-details"
                  />
                  <Input
                    type="text"
                    placeholder="NIC"
                    className="Admin-details"
                  />

                  <div className="create-admin-btn">
                    <Input
                      type="button"
                      style={{ width: "110px" }}
                      value="Submit"
                    />
                    <Input
                      type="button"
                      style={{ width: "110px" }}
                      onClick={() => setIsSetterModalOpen(false)}
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
