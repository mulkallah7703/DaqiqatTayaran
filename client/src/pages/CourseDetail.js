import React from 'react';
import { Box, Container, Typography, CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom';

const CourseDetail = () => {
  const { id } = useParams();

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default', py: 8 }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center' }}>
          <CircularProgress sx={{ mb: 2 }} />
          <Typography variant="h4" sx={{ mb: 2 }}>
            Course Detail
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Course ID: {id}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            This page will show detailed course information, lessons, and enrollment options.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default CourseDetail;