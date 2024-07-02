import * as yup from 'yup';

export const validationSchema = yup.object().shape({
    AdminName: yup.string().required('User Name is required'),
    Contact: yup.string().matches(/^[0-9]{10}$/, 'Phone Number must be exactly 10 digits').required('Phone Number is required'),
    NIC: yup.string().matches(/^[0-9]{12}$/, 'NIC must be 9 digits followed by "v" or "x"').required('NIC is required')

});
