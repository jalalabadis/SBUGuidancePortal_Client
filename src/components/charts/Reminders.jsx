import React from 'react';
import { FaPlus } from "react-icons/fa6";
import { Input } from '../elements';
import { FaSearch } from "react-icons/fa";

function Reminders() {
  return (

    <div className='content-mart'>
    <p>Pop-up Reminders</p>
    <hr />
    <div class="container poport_remainers mt-5">
  <button className='popr_remainers_editor'  style={{background: '#51A24F' , color: 'white', padding: '10px 20px', borderRadius: '6px'}}>Edit</button>

<h5>Pop-up Reminders Title</h5>

<span>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.</span>

<h4>1 Day 6hours 12min Left</h4>

<div className='popr_remainers_stattus'>Active</div>
</div></div>
  )
}

export default Reminders