import BasicPage from "../../Components/BasicPage/BasicPage";
import React, {useState, useRef} from "react";
import Webcam from "react-webcam";
import Input from "../../Components/Input/Input";
import Modal from "../../Components/Modal/Modal";
import './VerifyUser.css'
import {ImCamera} from "react-icons/im";
import {MdOutlineFileUpload} from "react-icons/md";
import {validationSchema} from "../../Validation/UserValidation";
import {yupResolver} from "@hookform/resolvers/yup";
import {useForm} from "react-hook-form";

export default function VerifyUser() {

    const {handleSubmit, register, formState: {errors}} = useForm({
        resolver: yupResolver(validationSchema)
    });

    const onSubmit = (data) => {
        console.log(data);
    }

    const videoConstraints = {
        width: '100%',
        height: 720,
        facingMode: "user"
    };


    const [capturedImage, setCapturedImage] = useState(null);
    const webcamRef = useRef(null); // Declare webcamRef
    const [isSetterModalOpen, setIsSetterModalOpen] = useState(false);


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
                        <td><Input label='First Name' name='firstName' type='text' register={register} errors={errors}/></td>
                        <td><Input label='Last Name' name='lastName' type='text' register={register} errors={errors}/></td>
                        <td><Input label='Age' name='age' type='number' register={register} errors={errors}/></td>
                    </tr>
                    <tr>
                        <td><Input label='Phone Number' name='phoneNumber' type='text' register={register} errors={errors}/></td>
                        <td><Input label='NIC' name='nic' type='text' register={register} errors={errors}/></td>
                    </tr>
                    <tr>
                        <td><Input label='Date of Birth' name='dateOfBirth' type='date' register={register} errors={errors}/></td>
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

                <div className='submit-container'>
                    <Input type="button" value='Submit' onClick={handleSubmit(onSubmit)}/>
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