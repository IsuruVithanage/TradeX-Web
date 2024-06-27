import React from 'react';
import "./Documentation.css"

export default function Documentation({id}) {
  return (
    <div id={id} className='documentation-container'>
        <h1>{id}</h1>
    </div>
  )
}
