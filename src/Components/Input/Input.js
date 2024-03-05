import React from 'react';
import './Input.css';
import { IoCalendarOutline } from "react-icons/io5";
import { GrClose } from "react-icons/gr";
import { DatePicker } from 'antd';
import Dropdown from './Dropdown/Dropdown';
import NumberInput from './NumberInput/NumberInput';
import TabSwitch from './TabSwitch/TabSwitch';
import { ButtonComponent, FABComponent, SwitchComponent } from './MUIComponents/MUIComponents';

export default function SidePanelInput(props) {
  return (
    <div className='input-container'>
        { props.label && <p className='label-name'>{props.label}</p> }
        {
           (() => {
              switch (props.type) {
                case 'number':
                  return <NumberInput {...props} />;
                case 'date':
                  return <DateInput {...props} />;
                case 'dropdown':
                  return <Dropdown {...props} />;
                case 'switch':
                  return <TabSwitch {...props} />;
                case 'toggle':
                  return <SwitchComponent {...props} />;
                case 'fab':
                  return <FABComponent {...props} />;
                case 'button':
                  return <ButtonComponent {...props} />;
                default:
                  return <InputField {...props} />;
              }
            })()
        }
    </div>
  );
}

function InputField(props) {
  const handleChange = (e) => {
    props.onChange(e.target.value);
  }

  return (
      <input  
        className={`input-field ${props.className}`} 
        type={props.type}
        value={props.value}
        id={props.id}
        name={props.name}
        placeholder={props.placeholder}
        style={props.style}
        onBlur={props.onBlur}
        onChange={props.onChange ? handleChange : null}
        onClick={props.onClick}
      />
  );
}

function DateInput(props) {
  return (
    <DatePicker
      style={{
          backgroundColor: '#3C3C3C',
          border: 'none',
          height: '40px',
          width: '100%',
      }}
      
      clearIcon={<span className="calendar-icon" > <GrClose/></span>}
      suffixIcon={<span className="calendar-icon" > <IoCalendarOutline/></span>}
      format="DD-MM-YY"
      placement="topRight"
      id={props.id}
      name={props.name}
      placeholder={props.placeholder ? props.placeholder : ""}
      onBlur={props.onBlur}
      onChange={props.onChange}
  />
  );
}
