import React, { useState, useEffect } from 'react';
import TextEditor from '../TextEditor';

export default function SyllabusTab({classroomId}){

    return (
        <div>
          <div id='page-header'>
            <h1>Syllabus</h1>
          </div>
          <div>
            <TextEditor>
              
            </TextEditor>
          </div>
        </div>
    )
}