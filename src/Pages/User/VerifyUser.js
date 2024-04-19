import BasicPage from "../../Components/BasicPage/BasicPage";
import React, {useRef, useState} from "react";
import Webcam from "react-webcam";
import Input from "../../Components/Input/Input";
import Modal from "../../Components/Modal/Modal";
import './VerifyUser.css'
import {ImCamera} from "react-icons/im";
import {validationSchema} from "../../Validation/UserValidation";
import {yupResolver} from "@hookform/resolvers/yup";
import {useForm} from "react-hook-form";
import {useSelector} from "react-redux";
import AWS from 'aws-sdk';
import {v4 as uuidv4} from 'uuid';
import {Upload} from 'antd';

export default function VerifyUser() {
    const user = useSelector(state => state.user);

    const {trigger, register, formState: {errors}} = useForm({
        resolver: yupResolver(validationSchema)
    });

    const [isAgeError, setIsAgeError] = useState('');
    const [capturedImage, setCapturedImage] = useState(null);
    const webcamRef = useRef(null);
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
        console.log("re", result)
        if (result) {
            if (userDetail.dateOfBirth === '') {
                setIsDateError('Please enter a valid date');
            }
            if (userDetail.age === 0) {
                setIsAgeError('Please enter a valid age');
            }
        } else {
            /*if (userDetail.dateOfBirth === '') {
                setIsDateError('Please enter a valid date');
                return;
            }*/
            /*if (userDetail.age === 0) {
                setIsAgeError('Please enter a valid age');
                return;
            }*/

            fetch('http://localhost:8004/user/saveUserVerificationDetails', {
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
    const handleCapture = async () => {
        const imageSrc = webcamRef.current.getScreenshot();
        setCapturedImage(imageSrc);

        const byteCharacters = atob(imageSrc.split(',')[1]);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], {type: 'image/jpeg'});

        const fileId = generateUUID();
        blob.name = `${fileId}cimg.jpg`;

        setSelectedFiles([...selectedFiles, blob]);
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
        const {name, value} = event.target;
        setUserDetail(prevDetails => ({
            ...prevDetails,
            [name]: value
        }));
    };

    const handleAge = (value) => {
        if (value < 8) {
            setIsAgeError('Age must be greater than 8');
        } else if (value > 80) {
            setIsAgeError('Age must be lower than 80');
        } else {
            setIsAgeError(null);
            setUserDetail(prevDetails => ({
                ...prevDetails,
                age: value
            }));
        }
    }

    const handleDate = (date, dateString) => {
        if (dateString === null) {
            setIsAgeError('Please enter a valid date');
        } else {
            setUserDetail(prevDetails => ({
                ...prevDetails,
                dateOfBirth: dateString
            }));
        }
    }

    const S3_BUCKET = 'tradexbucket';
    const REGION = 'eu-north-1';


    AWS.config.update({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    })

    const myBucket = new AWS.S3({
        params: {Bucket: S3_BUCKET},
        region: REGION,
    })

    const [progress, setProgress] = useState(0);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [fileCount, setFileCount] = useState(0);
    const [isFileSelected, setIsFileSelected] = useState(true);


    const generateUUID = () => {
        return uuidv4();
    };


    const uploadSelectedFiles = async () => {
        try {
            const uploadedUrls = await uploadFiles(selectedFiles);
            console.log('Uploaded URLs:', uploadedUrls);
            // Now you have all the uploaded URLs in the 'uploadedUrls' array
            // You can use them as needed
        } catch (error) {
            console.error('Error uploading files:', error);
        }
    }

    const uploadFiles = (files) => {
        return new Promise((resolve, reject) => {
            const fileList = Array.from(files);
            const uploadedUrls = [];

            let uploadedCount = 0;

            fileList.forEach(file => {
                const fileId = generateUUID();

                const params = {
                    ACL: 'public-read',
                    Body: file,
                    Bucket: S3_BUCKET,
                    Key: `${fileId}-${file.name}`
                };

                myBucket.putObject(params)
                    .on('httpUploadProgress', (evt) => {
                        setProgress(Math.round((evt.loaded / evt.total) * 100))
                    })
                    .send((err, data) => {
                        if (err) {
                            console.error('Error uploading file:', err);
                            reject(err);
                        } else {
                            const url = `https://${S3_BUCKET}.s3.${REGION}.amazonaws.com/${params.Key}`;
                            uploadedUrls.push(url);

                            uploadedCount++;

                            if (uploadedCount === fileList.length) {
                                resolve(uploadedUrls);
                            }
                        }
                    });
            });
        });
    };


    const handleFileUpload = (file) => {
        setIsFileSelected(true);
        setSelectedFiles([...selectedFiles, file]);

    };

    const handleFileRemove = (file) => {
        setSelectedFiles(selectedFiles.filter(f => f.uid !== file.uid));
    };


    const restAll = () => {
        setSelectedFiles([]);
        capturedImage && setCapturedImage(null);
        setFileCount(0);
        setIsFileSelected(false);
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
                        <td><Input label='First Name' name='firstName' type='text' register={register} errors={errors}
                                   onChange={handleInputChange}/></td>
                        <td><Input label='Last Name' name='lastName' type='text' register={register} errors={errors}
                                   onChange={handleInputChange}/></td>
                        <td>
                            <Input label='Age' min={0} name='age' type='number' register={register} errors={errors}
                                   onChange={handleAge}/>
                            <p className={isAgeError !== null ? 'order-error' : 'order-noerror'}>{isAgeError}</p>
                        </td>
                    </tr>
                    <tr>
                        <td><Input label='Phone Number' name='phoneNumber' type='text' register={register}
                                   errors={errors} onChange={handleInputChange}/></td>
                        <td><Input label='NIC' name='nic' type='text' register={register} errors={errors}
                                   onChange={handleInputChange}/></td>
                    </tr>
                    <tr>
                        <td>
                            <Input label='Date of Birth' name='dateOfBirth' type='date' register={register}
                                   errors={errors} onChange={handleDate}/>
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
                            <Upload
                                listType="picture"
                                maxCount={2}
                                showUploadList={isFileSelected}
                                multiple
                                beforeUpload={(file) => {
                                    handleFileUpload(file);
                                    return false;
                                }}
                                onRemove={(file) => handleFileRemove(file)}
                            >
                                {selectedFiles.length !== 3 ? (
                                    <Input type="button" value={fileCount !== 2 ? "Select Files" : "upload"}/>
                                ) : (
                                    <>
                                        <div style={{display:'flex',marginBottom:'0.8rem'}}>
                                            <Input type="button" style={{}} value="Upload"
                                                   onClick={uploadSelectedFiles}/>
                                            <div style={{width:'0.8rem'}}></div>
                                            <Input type="button" value='Cancel' red onClick={restAll}/>
                                        </div>
                                    </>

                                )}

                            </Upload>
                            <br/>
                            <p style={{paddingTop: '3rem'}}>{selectedFiles.length === 0 ? "Max 10MB JPG/JPEG or PNG format" : ''}</p>

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
                    <div style={{width: '10px'}}></div>
                    <Input type="button" value='Cancel' red/>
                    {capturedImage && (
                        <div style={{marginLeft: 'auto'}}>
                            <Input type="button" value='Retake' onClick={openSetterModel}/>
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