import React from 'react';
import './SidePanelInput.css';
import Dropdown from '../../Dropdown/Dropdown';

export default function SidePanelInput(props) {
  return (
    <div className='input-container'>
        <p className='label-name'>{props.label}</p>
        { 
          props.type === 'dropdown' ? 
          <Dropdown {...props} /> : 
          <InputField {...props} />
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
