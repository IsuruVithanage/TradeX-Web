import React, { useEffect, useState } from "react";
import BasicPage from "../../Components/Layouts/BasicPage/BasicPage";
import Input from "../../Components/Input/Input";
import { useParams, useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import "./AdminUserVerification.css";
import { showMessage } from "../../Components/Message/Message";

export default function AdminUserVerification() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [issue, setIssue] = useState("");
  const [userDetail, setUserDetail] = useState({
    userId: id,
  });
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log(id);
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await fetch(
        "http://localhost:8004/admin/getUserVerificationDetails",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: id }),
        }
      );
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const verifyUser = async () => {
    try {
      if (issue) {
        const ob = {
          id: id,
          issue: issue,
        };
        const response = await fetch("http://localhost:8004/admin/addIssue", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(ob),
        });
        if (response.ok) {
          showMessage("warning", "Issue added successfully!");
          navigate(`/admin/AdDashboard/`);
        }
      } else {
        const ob = {
          id: id,
          status: "Trader",
        };
        const response = await fetch(
          "http://localhost:8004/admin/changeUserRole",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(ob),
          }
        );
        if (response.ok) {
          showMessage("success", "User verified successfully!");
          navigate(`/admin/AdDashboard/`);
          
        }
      }
    } catch (error) {
      console.error("Error allocating starting fund:", error);
    }
  };

  return (
    <BasicPage>
      <div className="uploaddata-container">
        <p>Verify Your Account</p>
        <table className="input-table">
          <thead>
            <tr></tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <Input
                  label="First Name"
                  name="firstName"
                  type="text"
                  value={user ? user.firstName : ""}
                />
              </td>
              <td>
                <Input
                  label="Last Name"
                  name="lastName"
                  type="text"
                  value={user ? user.lastName : ""}
                />
              </td>
              <td>
                <Input
                  label="Age"
                  name="age"
                  type="text"
                  value={user ? user.age : ""}
                />
              </td>
            </tr>
            <tr>
              <td>
                <Input
                  label="Phone Number"
                  name="phoneNumber"
                  type="text"
                  value={user ? user.phoneNumber : ""}
                />
              </td>
              <td>
                <Input
                  label="NIC"
                  name="nic"
                  type="text"
                  value={user ? user.nic : ""}
                />
              </td>
            </tr>
            <tr>
              <td>
                <Input
                  label="Date of Birth"
                  name="dateOfBirth"
                  type="text"
                  value={user ? user.dateOfBirth : ""}
                />
              </td>
            </tr>
          </tbody>
        </table>

        <div className="material-container">
          <div className="material-div">
            <span
              style={{
                color: "#9E9E9E",
                fontWeight: "bold",
                marginBottom: "12px",
              }}
            >
              Identification Upload
            </span>
            <div className="upload-container">
              <img src={user ? user.userImg : ""} width={620} height={250} />
            </div>
          </div>
          <div className="material-div">
            <span
              style={{
                color: "#9E9E9E",
                fontWeight: "bold",
                marginBottom: "12px",
              }}
            >
              Identification Upload
            </span>
            <div className="upload-container">
              <img src={user ? user.nicImg1 : ""} width={620} height={250} />
            </div>
          </div>
        </div>

        <div className="material-container">
          <div className="material-div">
            <span
              style={{
                color: "#9E9E9E",
                fontWeight: "bold",
                marginBottom: "12px",
              }}
            >
              Identification Upload
            </span>
            <div className="upload-container">
              <img src={user ? user.nicImg2 : ""} width={620} height={250} />
            </div>
          </div>

          <div className="material-div">
            <span
              style={{
                color: "#9E9E9E",
                fontWeight: "bold",
                marginBottom: "12px",
                marginTop:"20px"
              }}
            >
              Issue
            </span>
            <div className="upload-container">
              <TextField
                className="custom-textfield"
                style={{ width: "620px", height: "250px" }}
                multiline
                rows={9}
                variant="outlined"
                value={issue}
                onChange={(e) => setIssue(e.target.value)}

              />
            </div>
          </div>
        </div>

        <div className="submit-container">
          <Input type="button" value="Submit" onClick={verifyUser} />
          <div style={{ width: "10px" }}></div>
          <Input
            type="button"
            value="Cancel"
            red
            onClick={() => navigate(`/admin/ViewAll/`)}
          />
        </div>
      </div>
    </BasicPage>
  );
}
