import React, { useState, useEffect } from 'react';
import TextEditor from '../TextEditor';
import LessonModuleCreator from '../../views/ContentCreator/LessonModuleCreator/LessonModuleCreator';
import LessonEditor from '../../views/ContentCreator/LessonEditor/LessonEditor';

export default function LessonEditorTab({classroomId}){

    return (
        <div>
          <div id='page-header'>
            <h1>Lesson Editor</h1>
          </div>
          <div>
            <LessonModuleCreator>

            </LessonModuleCreator>
          </div>
        </div>
    )
}