import React from 'react'
import './PageContainer.css'

export default function PageContainer(props) {
  return (
    <div className='background'>
        {props.children}
    </div>
  )
}
