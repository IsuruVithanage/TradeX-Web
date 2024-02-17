import React from 'react';
import { Modal } from 'antd';
import './Modal.css'

export default function Model(props) {

  return (
    <>
      <Modal 
          open={props.open}  
          onCancel={() => props.close(false)} 
          footer={false}
          destroyOnClose={true}>
            { props.children }
      </Modal>
    </>
  );
};
