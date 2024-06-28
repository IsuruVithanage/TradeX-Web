import React, {useState, lazy, Suspense} from "react";
import { PiEye, PiEyeClosed } from "react-icons/pi";
import "./Input.css";

const Dropdown = lazy(() => import("./Dropdown/Dropdown"));
const NumberInput = lazy(() => import("./NumberInput/NumberInput"));
const Date = lazy(() => import("./Date/Date"));
const TabSwitch = lazy(() => import("./TabSwitch/TabSwitch"));
const Button = lazy(() => import("./Button/Button"));
const Toggle = lazy(() => import("./Toggle/Toggle"));

export default function Input(props) {
    const renderInputType = () => {
        switch (props.type) {
            case "number":
                return <NumberInput {...props} />;
            case "password":
                return <PasswordInput {...props} />;
            case "date":
                return <Date {...props} />;
            case "dropdown":
                return <Dropdown {...props} />;
            case "switch":
                return <TabSwitch {...props} />;
            case "toggle":
                return <Toggle {...props} />;
            case "button":
                return <Button {...props} />;
            default:
                return <InputField {...props} />;
        }
    };


    const renderLoginInput = () => {
        return (
            <div style={{position: "relative"}}>
                <InputField {...props} />
            </div>
        );
    }

    return (
        <div className="input-container">
            {props.label && <p className="label-name">{props.label}</p>}
            <Suspense fallback={<div style={{backgroundColor: "#3C3C3C", height: "35px"}}/>}>
                {renderInputType()}
            </Suspense>
        </div>
    );
}

function InputField(props) {
    const {name, register, errors} = props;


    return (
        <div>
            <div className={`input-field-item-container ${props.underline ? "login" : ""}`} style={{display: "flex", ...props.style}}>
                <input
                    {...(!register ? {} : register(name))}
                    className={`input-field ${props.className || ''}`}
                    type={props.type}
                    value={props.value}
                    defaultValue={props.defaultValue}
                    id={props.id}
                    name={props.name}
                    placeholder={props.placeholder}
                    onBlur={props.onBlur}
                    onChange={props.onChange ? props.onChange : null}
                    onClick={props.onClick}
                    onKeyDown={props.onKeyDown}
                    autoComplete="off"
                />

                { props.icon && <div className="input-icon" onClick={props.onIconClick} >{props.icon}</div>}
            </div>
            
            <p style={{color: 'red'}}>{!register ? '' : (errors[name]?.message ? errors[name]?.message : '')}</p>
        </div>
    );
}


function PasswordInput(props) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <InputField {...props} 
            type={!showPassword ? "password" : "text"} 
            icon={!showPassword ? <PiEyeClosed/> : <PiEye/>} 
            onIconClick={() => setShowPassword(!showPassword)}/>
    );
}