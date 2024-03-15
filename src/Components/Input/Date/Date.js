import React from 'react'
import { IoCalendarOutline } from "react-icons/io5";
import { GrClose } from "react-icons/gr";
import { DatePicker } from 'antd';

export default function Date(props) {
    return (
        <DatePicker
            style={{
            backgroundColor: '#3C3C3C',
            border: 'none',
            height: '40px',
            width: '100%',
            }}
    
            clearIcon={<span className="calendar-icon" > <GrClose /></span>}
            suffixIcon={<span className="calendar-icon" > <IoCalendarOutline /></span>}
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
  
