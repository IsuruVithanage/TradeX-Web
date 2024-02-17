import React from 'react'
import "./BlackBar.css"

export default function BlackBar(props) {
  return (
    <div className='black-background'>
            {props.children}
    </div>
  )
}
