import React, { useEffect } from 'react'
import './Table.css'

export default function Table(props) {


    useEffect(() => {
        const table = document.querySelector('.table-body');
        table.classList.add('restart');

        setTimeout(() => {
            table.classList.remove('restart');
        }, 300);    
        
    }, [props.restart]);

    return (
        <div className='table-container' style={props.style}>
            <table className='main-table' id={props.id}>
                <thead className='table-head'>
                    { props.children[0] }
                </thead>
                <tbody className={`table-body ${(props.hover) ? 'hoverble' : ''}`}>
                    { props.children.slice(1) }
                </tbody>
            </table>

            { props.children[1].length === 0 && <p className='empty-message'>{ props.emptyMessage }</p> }
        </div>
    )
}

export function TableRow(props) {
    const handleRowClick = () => {
        if (props.onClick) {
            props.onClick();
        }
    };

    return (
        <tr className={`table-row ${props.isSelected ? 'selected' : ''}`} onClick={handleRowClick}>
            {props.data &&
                props.data.map((cell, index) => {
                    if (Array.isArray(cell) && cell.length === 1) {
                        cell = (
                            <div className='table-coin-container'>
                                <img className='coin-icon' src={require('../../Assets/Images/Coin Images.json')[cell[0]].img} alt={cell[0]} />
                                {cell[0]}
                            </div>
                        );
                    }

                    return (
                        <td key={index} className={`${props.classes && props.classes[index]}`}>
                            {cell}
                        </td>
                    );
                })}
        </tr>
    );
}