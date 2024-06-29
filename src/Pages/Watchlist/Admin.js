import React, {useEffect, useState} from "react";
import BasicPage from "../../Components/Layouts/BasicPage/BasicPage";
import Input from "../../Components/Input/Input";
import "./Admin.css";
import "./ViewAll.css";
import Modal from "../../Components/Modal/Modal";
import axios from "axios";
import {RiDeleteBin6Line} from "react-icons/ri";
import {validationSchema} from "../../Validation/AdminValidation";
import {yupResolver} from "@hookform/resolvers/yup";
import {useForm} from "react-hook-form";

export default function Admin() {
    const currentDate = new Date().toISOString();
    console.log(currentDate);

    /*const {handleSubmit, register, formState: {errors}} = useForm({
        resolver: yupResolver(validationSchema)
    });*/

    const onSubmit = (data) => {
        console.log(data);
    }

    const [isdeleteModalOpen, setIsdeleteModalOpen] = useState(false);
    const [adminList, setAdminList] = useState([]);
    const [admin, setAdmin] = useState({
        AdminName: "",
        Date: currentDate,
        NIC: "",
        Contact: "",
        Age: "",
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setAdmin((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handledSubmit = async () => {
        const currentDate = new Date().toISOString();
        console.log(currentDate);

        /*setAdmin({
            AdminName: document.getElementById("AdminName").value,
            NIC: document.getElementById("NIC").value,
            Contact: document.getElementById("Contact").value,
            Age: document.getElementById("Age").value,
        });*/

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
            console.log(result.data);
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
                {label: "Dashboard", path: "/admin/AdDashboard"},
                {label: "Users", path: "/admin/Users"},
                {label: "Admin", path: "/admin"},
            ]}
        >
            <div>
                <div className="info">
                    <div>
                        <Input
                            type="button"
                            value="Create Account"
                            style={{width: "150px", marginLeft: "85%"}}
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
                                    <h1 style={{textAlign: "center", marginBottom:"20px"}}>Create Admin</h1>
                                    <form>
                                        <Input
                                            type="text"
                                            placeholder="AdminName"
                                            className="Admin-details"
                                            name="AdminName"
                                            id="AdminName"
                                            value={admin.AdminName}
                                            onChange={handleChange}
                                            /*register={register} errors={errors}*/
                                        />
                                        <Input
                                            type="text"
                                            placeholder="Email"
                                            className="Admin-details"
                                            name="Email"
                                            id="Email"
                                            value={admin.email}
                                            onChange={handleChange}
                                            /*register={register} errors={errors}*/
                                        />
                                           <Input
                                            type="text"
                                            placeholder="Password"
                                            className="Admin-details"
                                            name="Password"
                                            id="Password"
                                            value={admin.password}
                                            onChange={handleChange}
                                            /*register={register} errors={errors}*/
                                        />
                                        <Input
                                            type="text"
                                            placeholder="NIC"
                                            className="Admin-details"
                                            name="NIC"
                                            id="NIC"
                                            value={admin.NIC}
                                            onChange={handleChange}
                                            /*register={register} errors={errors}*/
                                        />
                                        <Input
                                            type="text"
                                            placeholder="Contact"
                                            className="Admin-details"
                                            name="Contact"
                                            id="Contact"
                                            value={admin.Contact}
                                            onChange={handleChange}
                                            /*register={register} errors={errors}*/
                                        />

                                        <div className="create-admin-btn">
                                            <Input
                                                type="button"
                                                style={{width: "110px"}}
                                                value="Submit"
                                                onClick={handledSubmit}
                                            />
                                            <Input
                                                type="button"
                                                style={{width: "110px"}}
                                                onClick={() => setIsdeleteModalOpen(false)}
                                                value="Cancel"
                                                red
                                            />

                                        </div>
                                    </form>
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
                                <td>{new Date(admin.Date).toLocaleDateString()}</td>
                                <td>{admin.NIC}</td>
                                <td>{admin.Contact}</td>
                                <td>{admin.Age}</td>
                                <td><RiDeleteBin6Line/></td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </BasicPage>
    );
}
