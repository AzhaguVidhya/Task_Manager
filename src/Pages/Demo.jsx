import React from 'react'
import {useState} from 'react'
function Demo() {
    const[btn,setBtn]=useState('')
    function handleClick(){
        console.log("Button Clicked")
    }
  return (
    <div>
      <button onClick={handleClick}>Click</button>
    </div>
  )
}

export default Demo
