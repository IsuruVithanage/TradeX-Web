import React from 'react'
import './Table.css'

export default function Table(props) {
  return (
    <div className='table-container' style={props.style}>
        <table className='main-table'>
            <thead className='table-head'>
                {props.children[0]}
            </thead>
            <tbody className={`table-body ${(props.hover) ? 'hoverble' : ''}`}>
                {props.children.slice(1)}
            </tbody>
        </table>
    </div>
  )
}

export function TableRaw({data}) {
  return (
    <tr className='table-row'>
        {(data) && data.map((cell, index) => {
            
            if (Array.isArray(cell) && cell.length === 1) {
              cell = 
                <div> 
                  <img 
                      className='coin-icon' 
                      src={require('../../Assets/Images/Coin Images.json')[cell[0]]} 
                      alt={cell[0]} /> 
                  {cell[0]} 
                </div>;
            }
            
            return <td key={index} className={`table-cell ${(index === 0) ? 'first-column' : ''}`}>{cell}</td>
        })}
    </tr> 
  )
}
