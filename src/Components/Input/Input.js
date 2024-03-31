import React, {lazy, Suspense, useState} from "react";
import "./Input.css";

const Dropdown = lazy(() => import("./Dropdown/Dropdown"));
const NumberInput = lazy(() => import("./NumberInput/NumberInput"));
const Date = lazy(() => import("./Date/Date"));
const TabSwitch = lazy(() => import("./TabSwitch/TabSwitch"));
const Button = lazy(() => import("./Button/Button"));
const FAB = lazy(() => import("./FAB/FAB"));
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
            case "fab":
                return <FAB {...props} />;
            case "button":
                return <Button {...props} />;
            default:
                return <InputField {...props} />;
        }
    };

    return (
        <div className="input-container">
            {props.label && <p className="label-name">{props.label}</p>}
            <Suspense fallback={<div></div>}>
                {renderInputType()}
            </Suspense>
        </div>
    );
}

function InputField(props) {
    const { name, register, errors } = props;

    const handleChange = (e) => {
        props.onChange(e);
    };

    if (typeof register === 'function') {
        return (
            <div>
                <input
                    className={`input-field ${props.className}`}
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
                />
                <p style={{ color: 'red' }}>{errors[name]?.message}</p>
            </div>
        );
    } else {
        return (
            <div>
                <input
                    className={`input-field ${props.className}`}
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
                />
            </div>
        );
    }
}