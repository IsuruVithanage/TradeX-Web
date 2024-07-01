import * as yup from "yup";

export const validationSchema = yup.object().shape({
    AdminName: yup.string().required("Admin Name is required"),
    email: yup.string().email("Invalid email format").required("Email is required"),
    NIC: yup.string().required("NIC is required"),
    Contact: yup.string().required("Contact is required"),
});
