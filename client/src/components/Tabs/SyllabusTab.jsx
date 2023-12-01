import React, { useState, useEffect } from 'react';
import TextEditor from '../TextEditor';


function value(setOpenState){
 setOpenState(!openState);
}

export default function SyllabusTab({classroomId}){
  const [openState, setOpenState] = useState(true);
    return (
        <div>
          <div id='page-header'>
            <h1>Syllabus</h1>
          </div>
          <div>
          {openState && <TextEditor/>}
            <button id ="testButton" onClick = {() => value(setOpenState)} text = "BUTTON">BUTTON
              
            </button>
            

          </div>

        </div>
    )
}