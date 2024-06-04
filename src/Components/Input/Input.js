import React, {lazy, Suspense} from "react";
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

    const handleChange = (e) => {
        props.onChange(e);
    };

    return (
        <div>
            <input
                {...(!register ? {} : register(name))}
                className={`input-field ${props.className || ''}`}
                type={props.type}
                value={props.value}
                defaultValue={props.defaultValue}
                id={props.id}
                name={props.name}
                placeholder={props.placeholder}
                style={props.style}
                onBlur={props.onBlur}
                onChange={props.onChange ? handleChange : null}
                onClick={props.onClick}
                autoComplete="off"
            />
            
            <p style={{color: 'red'}}>{!register ? '' : (errors[name]?.message ? errors[name]?.message : '')}</p>
        </div>
    );
}