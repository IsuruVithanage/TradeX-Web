import * as yup from 'yup';

export const validationSchema = yup.object().shape({
    firstName: yup.string().required('First Name is required'),
    lastName: yup.string().required('Last Name is required'),
    age: yup.number().required('Age is required'),
    phoneNumber: yup.string().matches(/^[0-9]{10}$/, 'Phone Number must be exactly 10 digits').required('Phone Number is required'),
    nic: yup.string().matches(/^[0-9]{12}$/, 'NIC must be 9 digits followed by "v" or "x"').required('NIC is required'),
    dateOfBirth: yup.string().matches(/^\d{4}-\d{2}-\d{2}$/, 'Date of Birth must be in the format YYYY-MM-DD').required('Date of Birth is required')
});




