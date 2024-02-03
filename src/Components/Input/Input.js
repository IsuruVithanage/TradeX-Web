import React from 'react';
import './Input.css';
import { IoCalendarOutline } from "react-icons/io5";
import { GrClose } from "react-icons/gr";
import { DatePicker } from 'antd';
import Dropdown from '../Dropdown/Dropdown';

export default function SidePanelInput(props) {
  return (
    <div className='input-container'>
        <p className='label-name'>{props.label}</p>
        {
           (() => {
              switch (props.type) {
                case 'date':
                  return <DateInput {...props} />;
                case 'dropdown':
                  return <Dropdown {...props} />;
                default:
                  return <InputField {...props} />;
              }
            })()
        }
    </div>
  );
}

function InputField(props) {
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
        onChange={props.onChange}
      />
  );
}

function DateInput(props) {
  return (
    <DatePicker
      style={{
          backgroundColor: '#1E1E1F',
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
