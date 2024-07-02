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

    const onSubmit = (data) => {
        console.log(data);
    }

    const [isdeleteModalOpen, setIsdeleteModalOpen] = useState(false);
    const [adminList, setAdminList] = useState([]);
    const [admin, setAdmin] = useState({
        AdminName: "",
        NIC: "",
        Contact: "",
        email: "",
    });

    const [errors, setErrors] = useState({
        AdminName: "",
        email: "",
        NIC: "",
        Contact: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAdmin((prevState) => ({
            ...prevState,
            [name]: value,
        }));

        // Validation logic
        let error = "";
        switch (name) {
            case "AdminName":
                if (!value) error = "Admin Name is required.";
                break;
            case "email":
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) error = "Invalid email format.";
                break;
            case "NIC":
                if (!value) error = "NIC is required.";
                break;
            case "Contact":
                const phoneRegex = /^\d{10}$/; // Assumes a 10-digit phone number
                if (!phoneRegex.test(value)) error = "Invalid contact number.";
                break;
            default:
                break;
        }
        setErrors((prevState) => ({
            ...prevState,
            [name]: error,
        }));
    };

    const handledSubmit = async () => {
        const isFormValid = Object.values(errors).every((err) => err === "") &&
                            Object.values(admin).every((field) => field !== "");
        // if (!isFormValid) {
        //     console.error("Validation errors:", errors);
        //     return;
        // }

        const body = {...admin, password: generatePassword()};
        
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
        const length = 10;
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?';
        let password = '';
        for (let i = 0; i < length; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length));
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

    const deleteAdmin = async (AdminId) => {
        try {
            await axios.delete(`http://localhost:8003/admin/${AdminId}`);
            setAdminList(adminList.filter(admin => admin.AdminId !== AdminId));
        } catch (error) {
            console.error("Error deleting admin", error);
        }
    };

    useEffect(() => {
        loadAdmins();
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
                                        width: "335px",
                                        margin: "auto",
                                        marginBottom: "25px",
                                    }}
                                >
                                    <h1 style={{ textAlign: "center", marginBottom: "20px", color: "white" }}>Create Admin</h1>
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
                                            style={{marginBottom:"20px"}}
                                        />
                                        {errors.AdminName && <p className="error">{errors.AdminName}</p>}
                                        <Input
                                            type="text"
                                            placeholder="Email"
                                            className="Admin-details"
                                            name="email"
                                            id="Email"
                                            value={admin.email}
                                            onChange={handleChange}
                                            underline
                                            style={{marginBottom:"20px"}}
                                        />
                                        {errors.email && <p className="error">{errors.email}</p>}
                                        <Input
                                            type="text"
                                            placeholder="NIC"
                                            className="Admin-details"
                                            name="NIC"
                                            id="NIC"
                                            value={admin.NIC}
                                            onChange={handleChange}
                                            underline
                                            style={{marginBottom:"20px"}}
                                        />
                                        {errors.NIC && <p className="error">{errors.NIC}</p>}
                                        <Input
                                            type="text"
                                            placeholder="Contact"
                                            className="Admin-details"
                                            name="Contact"
                                            id="Contact"
                                            value={admin.Contact}
                                            onChange={handleChange}
                                            underline
                                            style={{marginBottom:"20px"}}
                                        />
                                        {errors.Contact && <p className="error">{errors.Contact}</p>}

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
                    <Table
                        hover={true}
                        style={{ height: "65vh", overflowY: "auto", fontSize: "1.10rem" }}
                    >
                        <TableRow data={["Name", "Email", "NIC", "Contact", "Delete"]} />
                        {adminList.map((admin) => (
                            <TableRow
                                key={admin.AdminId}
                                data={[
                                    admin.AdminName,
                                    admin.email,
                                    admin.NIC,
                                    admin.Contact,
                                    <RiDeleteBin6Line onClick={() => deleteAdmin(admin.AdminId)}
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
