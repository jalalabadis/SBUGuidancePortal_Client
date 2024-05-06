import React from 'react';
import { FiDisc } from "react-icons/fi";

function Inventory() {
  return (

<div className='content-mart'>
  <p>Inventory</p>
  <hr />

  <div className="mant_notice_card">
    <div className="itertyms">
  <FiDisc style={{color: "#D9D2D2"}}/> <span>Inventory Notice1</span>
  </div>
  <div className="itertyms">
  <FiDisc style={{color: "#D9D2D2"}}/> <span>Inventory Notice1</span>
  </div>
  <div className="itertyms">
  <FiDisc style={{color: "#D9D2D2"}}/> <span>Inventory Notice1</span>
  </div>
  </div>
</div>
  )
}

export default Inventory