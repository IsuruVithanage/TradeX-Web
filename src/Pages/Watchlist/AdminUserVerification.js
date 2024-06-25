import BasicPage from "../../Components/Layouts/BasicPage/BasicPage";
import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import Input from "../../Components/Input/Input";
import Modal from "../../Components/Modal/Modal";
import "./AdminUserVerification.css";
import { ImCamera } from "react-icons/im";
import { validationSchema } from "../../Validation/UserValidation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import AWS from "aws-sdk";
import { v4 as uuidv4 } from "uuid";
import { Upload } from "antd";
import { showMessage } from "../../Components/Message/Message";
import { useLocation, useParams } from 'react-router-dom';

export default function AdminUserVerification() {
  

  const {id} = useParams();
  useEffect(() => {
    console.log(id);
  }, []);

  const [userDetail, setUserDetail] = useState({
    userId: id,
  });
  const [user, setUser] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    fetch("http://localhost:8004/admin/getUserVerificationDetails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetail),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setUser(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
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
                  value={user?user.firstName:""}
                />
              </td>
              <td>
                <Input
                  label="Last Name"
                  name="lastName"
                  type="text"
                  // value={user.lastName}
                />
              </td>
              <td>
                <Input label="Age" 
                name="age" 
                type="text" 
                // value={user.age} 
                />
              </td>
            </tr>
            <tr>
              <td>
                <Input
                  label="Phone Number"
                  name="phoneNumber"
                  type="text"
                  // value={user.age}
                />
              </td>
              <td>
                <Input label="NIC" 
                name="nic" 
                type="text" 
                // value={user.nic}
                 />
              </td>
            </tr>
            <tr>
              <td>
                <Input
                  label="Date of Birth"
                  name="dateOfBirth"
                  type="date"
                  // value={user.dateOfBirth}
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
              {/* <img src={user.userImg} /> */}
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
              {/* <img src={user.nicImg1} /> */}
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
              {/* <img src={user.nicImg2} /> */}
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
              Issue
            </span>
            <div className="upload-container"></div>
          </div>
        </div>

        <div className="submit-container">
          <Input type="button" value="Submit" />
          <div style={{ width: "10px" }}></div>
          <Input type="button" value="Cancel" red />
        </div>
      </div>
    </BasicPage>
  );
}
