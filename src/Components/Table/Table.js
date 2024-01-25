import React from 'react'
import './Table.css'

export default function Table(props) {
  return (
    <div>
        <table className='main-table'>
            <thead className='table-head'>
                {props.children[0]}
            </thead>
            <tbody className='table-body'>
                {props.children.slice(1)}
            </tbody>
        </table>
    </div>
  )
}

export function TableRaw({data}) {
  return (
    <tr>
        {(data) && data.map((cell, index) => (
            <td key={index} className='table-cell'>{cell}</td>
        ))}
    </tr> 
  )
}
