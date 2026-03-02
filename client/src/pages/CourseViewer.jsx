import React from 'react';
import Box from '@mui/material/Box';

const CourseViewer = () => {
  const localSrc = `${window.location.origin}/uploads/scorm/index.html`;
  const remoteSrc = 'https://aviationsminute.com/scorm/index.html';
  const src = window.location.hostname === 'localhost' ? localSrc : remoteSrc;

  return (
    <Box sx={{ width: '100vw', height: '100vh', backgroundColor: '#000' }}>
      <iframe
        title="Course Viewer"
        src={src}
        style={{ width: '100%', height: '100%', border: 'none' }}
        allowFullScreen
      />
    </Box>
  );
};

export default CourseViewer;
