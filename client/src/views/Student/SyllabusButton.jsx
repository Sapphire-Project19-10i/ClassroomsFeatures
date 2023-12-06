import React, { useState, useEffect } from 'react';
import { getSyllabus } from '../../Utils/requests';
import sanitizeHTML from '../../components/Sanitizer';


export default function SyllabusButton({id}) {
  const [display, setDisplay] = useState(false);
  const [syllabus, setSyllabus] = useState('');


  const fetchData = async () => {
    let wsResponse = await getSyllabus(id);
    if(wsResponse.data){
      setSyllabus(wsResponse.data.content);
    }
  };


  return (
    <div>
      <div id="display-code-modal" style={{ marginTop: '0', top: '-20px' }}>
        <button onClick={() => {fetchData();setDisplay(!display);}} style={{ fontSize: '1.3em' }}>
          {display ? 'Close' : 'Show'} Syllabus
        </button>
      </div>
      {display && (
        <div
        id='display-syllabus-wrapper'
        style={{ position: 'fixed', top: '60%',  left: '50%', transform: 'translate(-50%, -50%)', padding: '20px', background: '#fff', border: '1px solid #ccc', borderRadius: '5px', zIndex: '1000', color: 'black',height:'60%', width: '60%' }}
        dangerouslySetInnerHTML={sanitizeHTML(syllabus)}
        >
        </div>
      )}
    </div>
  );
}


