import React from 'react';
import { FiDisc } from "react-icons/fi";

function Inventory({data}) {
  return (

<div className='content-mart'>
  <p>Inventory</p>
  <hr />

  <div className="mant_notice_card">
    {data?.sort((a, b) => b.Mstimer - a.Mstimer).map((item, index) => (
    
<div className="itertyms" key={index}>
  <FiDisc style={{color: "#D9D2D2"}}/> <span>{item.notice}</span>
  </div>
    
))}
  </div>
</div>
  )
}

export default Inventory