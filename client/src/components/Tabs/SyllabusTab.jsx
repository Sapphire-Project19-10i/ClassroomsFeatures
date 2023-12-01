import React, { useState, useEffect } from 'react';
import TextEditor from '../TextEditor';
import { message } from 'antd';
import { createSyllabus, updateSyllabus, getSyllabus, getSyllabi } from '../../Utils/requests';


export default function SyllabusTab({searchParams, setSearchParams, classroomId}){
  let editorRef;
  
  const [syllbusId, setSyllbusId] = useState(0);
  
  
	useEffect(() => {
    const fetchData = async () => {
      let wsResponse;
      if(classroomId){
        wsResponse = await getSyllabus(classroomId);
      }
      else{
        wsResponse = await getSyllabi();
      }
            
      if(wsResponse.data){
        editorRef.setHtml(wsResponse.data.content);
        setSyllbusId(wsResponse.data.id);
      }
      else{
        wsResponse = await createSyllabus('', classroomId);
        setSyllbusId(wsResponse.data.id);
      }
    };
    fetchData();
  }, [classroomId]);
  
  
  const handleSave = async () => {
    let wsResponse;
    wsResponse = await updateSyllabus(syllbusId, editorRef.getHtml());
    
    if(wsResponse.err){
      message.error('Save error');
    }
    else{
      message.success('Save success');
    }
  }
	
  
  return (
    <div>
      
      <div id='page-header'>
        <div id="display-code-modal">
          <button id="display-code-btn" onClick={handleSave}>Save (WYSIWYG)</button>

        </div>
        <h1>Syllabus</h1>
      </div>
      <div
        style={{
          width: '80%',
          margin: '6.6vh auto 0 auto'
        }}
        >
        <TextEditor
          ref={(ref) => (editorRef = ref)}
        />
      </div>
    </div>
  )
}