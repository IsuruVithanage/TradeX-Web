import BasicPage from "../../Components/BasicPage/BasicPage";
import React, {useState, useRef, useEffect} from "react";
import Webcam from "react-webcam";
import Input from "../../Components/Input/Input";
import Modal from "../../Components/Modal/Modal";
import './VerifyUser.css'
import {ImCamera} from "react-icons/im";
import {MdOutlineFileUpload} from "react-icons/md";
import {validationSchema} from "../../Validation/UserValidation";
import {yupResolver} from "@hookform/resolvers/yup";
import {useForm} from "react-hook-form";
import {useSelector} from "react-redux";

export default function VerifyUser() {
    const user = useSelector(state => state.user);

    const {trigger, register, formState: {errors}} = useForm({
        resolver: yupResolver(validationSchema)
    });

    const [isAgeError, setIsAgeError] = useState('');
    const [capturedImage, setCapturedImage] = useState(null);
    const webcamRef = useRef(null); // Declare webcamRef
    const [isSetterModalOpen, setIsSetterModalOpen] = useState(false);
    const [isDateError, setIsDateError] = useState('');
    const [userDetail, setUserDetail] = useState({
        userId: user.user.id,
        firstName: '',
        lastName: '',
        age: 0,
        phoneNumber: '',
        nic: '',
        dateOfBirth: ''
    });

    const saveData = async () => {
        const result = await trigger();
        if (!result) {
            if (userDetail.dateOfBirth === '') {
                setIsDateError('Please enter a valid date');
            }
            if (userDetail.age === 0) {
                setIsAgeError('Please enter a valid age');
            }
        }else {
            if (userDetail.dateOfBirth === '') {
                setIsDateError('Please enter a valid date');
                return;
            }
            if (userDetail.age === 0) {
                setIsAgeError('Please enter a valid age');
                return;
            }

            fetch('http://localhost:8004/user/verifyUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userDetail)
            }).then(response => response.json())
                .then(data => {
                    console.log(data);
                })
                .catch(error => {
                    console.error('Error:', error);

            })
        }
    }

    const videoConstraints = {
        width: '100%',
        height: 720,
        facingMode: "user"
    };


    console.log(capturedImage);
    const handleCapture = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        setCapturedImage(imageSrc);
        setIsSetterModalOpen(false);
    };

    const openSetterModel = () => {
        if (isSetterModalOpen) {
            setIsSetterModalOpen(false);
        } else {
            setIsSetterModalOpen(true)
        }

    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserDetail(prevDetails => ({
            ...prevDetails,
            [name]: value
        }));
    };

    useEffect(() => {
        console.log(userDetail);
    }, [userDetail]);
    const handleAge = (value) => {
        if (value< 8) {
            setIsAgeError('Age must be greater than 8');
        }else if(value >80 ){
            setIsAgeError('Age must be lower than 80');
        } else {
            setIsAgeError(null);
            setUserDetail(prevDetails => ({
                ...prevDetails,
                age: value
            }));
        }
    }

    const handleDate = (value) => {
        if (value !== null) {
            setIsAgeError('Please enter a valid date');
        }else {
            console.log(value);
        }
    }


    return (
        <BasicPage>
            <div className='uploaddata-container'>
                <p>Verify Your Account</p>
                <table className='input-table'>
                    <thead>
                    <tr>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td><Input label='First Name' name='firstName' type='text' register={register} errors={errors} onChange={handleInputChange}/></td>
                        <td><Input label='Last Name' name='lastName' type='text' register={register} errors={errors} onChange={handleInputChange}/></td>
                        <td>
                            <Input label='Age' min={0} name='age' type='number' register={register} errors={errors} onChange={handleAge}/>
                            <p className={isAgeError !== null ? 'order-error' : 'order-noerror'}>{isAgeError}</p>
                        </td>
                    </tr>
                    <tr>
                        <td><Input label='Phone Number' name='phoneNumber' type='text' register={register} errors={errors} onChange={handleInputChange}/></td>
                        <td><Input label='NIC' name='nic' type='text' register={register} errors={errors} onChange={handleInputChange}/></td>
                    </tr>
                    <tr>
                        <td>
                            <Input label='Date of Birth' name='dateOfBirth' type='date' register={register} errors={errors} onChange={handleDate}/>
                            <p className={isDateError !== null ? 'order-error' : 'order-noerror'}>{isDateError}</p>
                        </td>
                    </tr>
                    </tbody>
                </table>


                <div className='material-container'>
                    <div className='material-div'>
                <span style={{
                    color: '#9E9E9E',
                    fontWeight: 'bold',
                    marginBottom: '12px'
                }}>Identification Upload</span>
                        <div className='upload-container'>
                            <Input type='button' value='Upload'
                                   icon={<MdOutlineFileUpload size={25} style={{paddingTop: '0.5rem'}}/>}/>
                            <p style={{paddingTop: '10px'}}>Max 10MB JPG/JPEG or PNG format</p>
                        </div>
                    </div>

                    <div className='material-div'>
                    <span style={{
                        color: '#9E9E9E',
                        fontWeight: 'bold',
                        marginBottom: '12px'
                    }}>Identification Upload</span>
                        <div className='upload-container'>
                            {capturedImage ? (
                                <img
                                    src={capturedImage}
                                    alt="Captured"
                                    width='480'
                                />
                            ) : (
                                <>
                                    <ImCamera size={90} fill='#6D6D6D' onClick={openSetterModel}/>
                                    <p>Real-time identification</p>
                                </>
                            )}
                        </div>
                    </div>

                </div>
on
                <div className='submit-container'>
                    <Input type="button" value='Submit' onClick={saveData}/>
                    <div style={{ width: '10px' }}></div>
                    <Input type="button" value='Cancel' red/>
                    {capturedImage && (
                        <div style={{ marginLeft: 'auto' }}>
                            <Input type="button" value='Retake' onClick={openSetterModel} />
                        </div>
                    )}
                </div>


            </div>

            <Modal open={isSetterModalOpen} close={() => setIsSetterModalOpen(false)}>
                <Webcam
                    audio={false}
                    height={520}
                    screenshotFormat="image/jpeg"
                    width={980}
                    videoConstraints={videoConstraints}
                    style={{borderRadius: '10px'}}
                    ref={(webcam) => (webcamRef.current = webcam)} // Assign webcamRef
                />
                <div>
                    <Input type='button' value='Capture' onClick={handleCapture}/>
                </div>

            </Modal>
        </BasicPage>
    );
}