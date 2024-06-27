import BasicPage from "../../Components/Layouts/BasicPage/BasicPage";
import React, {useEffect, useRef, useState} from "react";
import Webcam from "react-webcam";
import Input from "../../Components/Input/Input";
import Modal from "../../Components/Modal/Modal";
import './VerifyUser.css'
import {ImCamera} from "react-icons/im";
import {validationSchema} from "../../Validation/UserValidation";
import {yupResolver} from "@hookform/resolvers/yup";
import {get, useForm} from "react-hook-form";
import AWS from 'aws-sdk';
import {v4 as uuidv4} from 'uuid';
import {Upload} from 'antd';
import {showMessage} from "../../Components/Message/Message";
import LinearWithValueLabel from "../../Components/Loading/LinearWithValueLabel";
import {useNavigate} from "react-router-dom";
import {getUser} from "../../Storage/SecureLs";

export default function VerifyUser() {
    const user = getUser();

    useEffect(() => {
        console.log("userId", user.id);
    }, []);


    const {trigger, register, formState: {errors}} = useForm({
        resolver: yupResolver(validationSchema)
    });

    const [isAgeError, setIsAgeError] = useState('');
    const [capturedImage, setCapturedImage] = useState(null);
    const webcamRef = useRef(null);
    const [isSetterModalOpen, setIsSetterModalOpen] = useState(false);
    const [isDateError, setIsDateError] = useState('');
    const [userDetail, setUserDetail] = useState({
        userId: user.id,
        firstName: '',
        lastName: '',
        age: 0,
        phoneNumber: '',
        nic: '',
        dateOfBirth: '',
        userImg: '',
        nicImg1: '',
        nicImg2: ''
    });

    const saveData = async () => {
        console.log(userDetail);
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
            if (!userDetail.userImg || !userDetail.nicImg1 || !userDetail.nicImg2 || !userDetail.dateOfBirth || !userDetail.age || !userDetail.firstName || !userDetail.lastName || !userDetail.phoneNumber || !userDetail.nic) {
                showMessage('Error', 'Some data are not defined!');
                setIsSubmit(false);
                restAll();
                return;
            }

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

    const updateUserVerifyStatus = async () => {
        const ob = {
            id: user.id,
            status: "PendingTrader",
        }
        try {
            await fetch("http://localhost:8004/user/updateUserVerifyStatus", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access-token')}`
                },
                body: JSON.stringify(ob)
            });
        } catch (error) {
            console.error("Error allocating starting fund:", error);
        }
    }

    const videoConstraints = {
        width: '100%',
        height: 720,
        facingMode: "user"
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

    const S3_BUCKET = 'tradexbucket';
    const REGION = 'eu-north-1';


    AWS.config.update({
        accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY
    })

    const myBucket = new AWS.S3({
        params: {Bucket: S3_BUCKET},
        region: REGION,
    })

    const [progress, setProgress] = useState(0);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [fileCount, setFileCount] = useState(0);
    const [isFileSelected, setIsFileSelected] = useState(true);
    const [isSubmit, setIsSubmit] = useState(false);


    const generateUUID = () => {
        return uuidv4();
    };


    const uploadSelectedFiles = async () => {
        try {
            if (selectedFiles.length !== 3) {
                showMessage('Error', 'Please select all files');
                return;
            }

            setIsSubmit(true);
            const uploadedUrls = await uploadFiles(selectedFiles);
            console.log('Uploaded URLs:', uploadedUrls);

            let userImgCount = 0;
            let nicImgCount = 0;

            uploadedUrls.forEach(url => {
                if (url && url.endsWith('cimg.jpg')) {
                    setUserDetail(prevDetails => {
                        console.log('Updating userImg:', url);
                        return {
                            ...prevDetails,
                            userImg: url
                        };
                    });
                    userImgCount++;
                } else {
                    if (nicImgCount === 0) {
                        setUserDetail(prevDetails => {
                            console.log('Updating nicImg1:', url);
                            return {
                                ...prevDetails,
                                nicImg1: url
                            };
                        });
                        nicImgCount++;
                    } else if (nicImgCount === 1) {
                        setUserDetail(prevDetails => {
                            console.log('Updating nicImg2:', url);
                            return {
                                ...prevDetails,
                                nicImg2: url
                            };
                        });
                        nicImgCount++;
                    }
                }
            });
        } catch (error) {
            console.error('Error uploading files:', error);
        }
    };

    const navigate = useNavigate();

    useEffect(() => {
        if (userDetail.userImg && userDetail.nicImg1 && userDetail.nicImg2) {
            console.log('Saving user detail:', userDetail);
            saveData().then(r => {
                setIsSubmit(false);
                showMessage('Success', 'Data saved successfully');
                updateUserVerifyStatus().then(r => navigate('/watchList'));
            });

        }
    }, [userDetail.userImg, userDetail.nicImg1, userDetail.nicImg2]);


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
                                style={{marginTop: '2rem'}}
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
                                        <div style={{display: 'flex', marginBottom: '0.8rem'}}>
                                            <Input type="button" value='Cancel' outlined red onClick={restAll}/>
                                        </div>
                                    </>

                                )}

                            </Upload>
                            <br/>
                            <p>{selectedFiles.length === 0 ? "Max 10MB JPG/JPEG or PNG format" : ''}</p>

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
                    <img src="" alt=""/>
                    <Input type="button" value='Submit' onClick={uploadSelectedFiles}
                           disabled={selectedFiles.length !== 3}/>
                    <div style={{width: '10px'}}></div>
                    <Input type="button" value='Cancel' red/>
                    {capturedImage && (
                        <div style={{marginLeft: 'auto'}}>
                            <Input type="button" value='Retake' onClick={openSetterModel}/>
                        </div>
                    )}
                </div>


            </div>

            <Modal open={isSubmit} close={() => setIsSubmit(true)} closable={false}>
                <div className='upload-progress'>
                    <h1 style={{justifyContent:'center', fontSize:'1.3rem'}}>Uploading Details ....</h1>
                    <LinearWithValueLabel progress={progress}/>
                </div>
            </Modal>

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