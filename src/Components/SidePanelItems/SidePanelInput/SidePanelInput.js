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
        className='input-field' 
        type={props.type}
        value={props.value}
        id={props.id}
        name={props.name}
        style={props.style}
      />
  );
}
