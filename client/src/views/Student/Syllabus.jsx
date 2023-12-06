import React, { useState } from 'react';

export default function ClickButton() {
  const [clickCount, setClickCount] = useState(0);
  const [popupContent, setPopupContent] = useState('');

  const handleClick = async () => {
    setClickCount(clickCount + 1);

    if (clickCount === 1) {
      // On the first click, set the popup content to "teacher's syllabus"
      try {
        setPopupContent(<p style={{ fontSize: '50px' }}>Teacher's Syllabus</p>);
      } catch (error) {
        alert('Error fetching syllabus');
      }
    } else if (clickCount === 2) {
      // On the second click, close the pop-up
      alert('Exit');
      setPopupContent('');
      setClickCount(0); // Reset click count
    }
  };

  return (
    <div>
      <button style={{top: '100%',  left: '50%', fontSize: '25px', backgroundColor: 'white',color: 'grey', borderRadius: 10, marginRight: '10px', padding: '30px 50px' }} onClick={handleClick}>
        show teacher's syllabus
        </button>
      {popupContent && (
        <div style={{position: 'fixed', top: '60%',  left: '50%', transform: 'translate(-50%, -50%)', padding: '20px', background: '#fff', border: '1px solid #ccc', borderRadius: '5px', zIndex: '1000', color: 'black',height:'60%', width: '60%' }}>
          <pre style={{ color: 'black' }}>{popupContent}</pre>
        </div>
      )}
    </div>
  );
}


