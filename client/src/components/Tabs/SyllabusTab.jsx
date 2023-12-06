import React, { useState, useEffect } from 'react';
import TextEditor from '../TextEditor';
import { message } from 'antd';
import { createSyllabus, updateSyllabus, getSyllabi } from '../../Utils/requests';
import { sanitizeHTML } from '../Sanitizer';
import './SyllabusTab.css';


export default function SyllabusTab({searchParams, setSearchParams, classroomId}){
  let editorRef;
  
  const [syllbusId, setSyllbusId] = useState(0);
  const [syllbusContent, setSyllbusContent] = useState('');
  const [modifier, setModifier] = useState(false);
  
  
	useEffect(() => {
    const fetchData = async () => {
      let wsResponse;
      if(classroomId){
        wsResponse = await getSyllabi(classroomId);
        
        if(wsResponse.data){
          setSyllbusContent(wsResponse.data.content);
          setSyllbusId(wsResponse.data.id);
        }
        else{
          wsResponse = await createSyllabus('', classroomId);
          setSyllbusId(wsResponse.data.id);
        }
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
      setSyllbusContent(wsResponse.data.content);
    }
  }
  
  const handleModifier = async () => {
    if(modifier){
      await handleSave();
    }
    setModifier(!modifier);
  }
	
  
  return (
    <div>
      <div id='page-header'>
        <div id="display-code-modal">
          <button id="display-code-btn" onClick={handleModifier} style={{ fontSize: '1.5em' }}>
            {modifier ? 'Save' : 'Modify'}
          </button>
        </div>
        <h1>Syllabus</h1>
      </div>
      <div style={{ width: '80%', margin: '6.6vh auto 0 auto' }}>
        {modifier &&
          <TextEditor html={syllbusContent} ref={(ref) => {editorRef = ref;}}/>
        }
        {!modifier &&
          <div
            id="display-syllabus-wrapper"
            dangerouslySetInnerHTML={sanitizeHTML(syllbusContent)}
          ></div>
        }
      </div>
    </div>
  )
}