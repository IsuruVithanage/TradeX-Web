import React from 'react'
import './Table.css'

export default function Table(props) {
  return (
    <div className='table-container'>
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
            if (typeof cell === 'object' && cell[0] !== ( undefined || '' )) {
              cell = 
                <div> 
                  <img className='coin-icon' src={cell[0]} alt={cell[1]} /> 
                  {cell[1]} 
                </div>;
            }
            
            return <td key={index} className={`table-cell ${(index == 0) ? 'first-column' : ''}`}>{cell}</td>
        })}
    </tr> 
  )
}
