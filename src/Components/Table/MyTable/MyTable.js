import React from 'react'
import './MyTable.css'

export default function MyTable(props) {
  return (
    <div>
        <div className='main-Mytable'>
            <div className='Mytable-head'>
                {props.children[0]}
            </div>
            <div className='Mytable-body'>
                {props.children.slice(1)}
            </div>
        </div>
    </div>
  )
}

export function MyTableRaw({data}) {
  return (
    <div className='Mytable-row'>
        {(data) && data.map((cell, index) => (
            <div key={index} className='Mytable-cell'>{cell}</div>
        ))}
    </div> 
  )
}
