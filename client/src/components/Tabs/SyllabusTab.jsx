import React, { useState, useEffect } from 'react';
import TextEditor from '../TextEditor';
import {
    createSyllabus,
    getSyllabus,
    getSyllabi,
  } from '../../Utils/requests';

export default function SyllabusTab({searchParams, setSearchParams, classroomId}){
  let editorRef;
  
  const [syllabus, setSyllabus] = useState('');

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
        setSyllabus(wsResponse.data.content);
      }
    };
    fetchData();
  }, [classroomId]);
  
  const handleGetHtmlContent = () => {
    if (editorRef) {
      const htmlContent = editorRef.getHtml();
      console.log('HTML Content:', htmlContent);
    }
  };
  
  const handleSyllabus = async () => {
    let wsResponse;
    let content = 'hello';
    if(syllabus){
    }
    else{
      wsResponse = await createSyllabus(content, classroomId);
    }
    console.log(wsResponse);
  }
	
  return (
    <div>
      <div id='page-header'>
        <h1>Syllabus</h1>
      </div>
      <div id='content-creator-table-container'>
        <TextEditor
          html={syllabus}
          ref={(ref) => (editorRef = ref)}
        />
      </div>
    </div>
  )
}