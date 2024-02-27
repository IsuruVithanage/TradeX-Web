import BasicPage from "../../Components/BasicPage/BasicPage";
import React, {useState, useRef} from "react";
import Webcam from "react-webcam";
import Input from "../../Components/Input/Input";
import Modal from "../../Components/Modal/Modal";

export default function VerifyUser() {
    const videoConstraints = {
        width: '100%',
        height: 720,
        facingMode: "user"
    };

    const [capturedImage, setCapturedImage] = useState(null);
    const webcamRef = useRef(null); // Declare webcamRef
    const [isSetterModalOpen, setIsSetterModalOpen] = useState(false);

    const handleCapture = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        setCapturedImage(imageSrc);
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
            <div className=''>
                <div className='capture'>
                    <Input type="button" value='Capture' onClick={openSetterModel}/>
                </div>

                {capturedImage && (
                    <img src={capturedImage} alt="Captured"/>
                )}
            </div>

            <Modal open={isSetterModalOpen} close={() => setIsSetterModalOpen(false)}>
                <Webcam
                    audio={false}
                    height={520}
                    screenshotFormat="image/jpeg"
                    width={980}
                    videoConstraints={videoConstraints}
                    style={{borderRadius:'10px'}}
                    ref={(webcam) => (webcamRef.current = webcam)} // Assign webcamRef
                />
                <div>
                    <Input type='button' value='Capture'  onClick={handleCapture}/>
                </div>

            </Modal>
        </BasicPage>
    );
}
