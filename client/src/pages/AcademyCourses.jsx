import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const AUTH_KEY = 'academyAuth';

const AcademyCourses = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem(AUTH_KEY) !== 'true') {
      navigate('/academy-login');
    }
  }, [navigate]);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: 'background.default',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
      }}
    >
      <Card
        sx={{
          width: '100%',
          maxWidth: 680,
          borderRadius: 28,
          border: '1px solid rgba(230, 126, 34, 0.18)',
          boxShadow: '0 30px 70px rgba(0, 0, 0, 0.5)',
        }}
      >
        <CardContent sx={{ p: { xs: 3, md: 5 }, textAlign: 'center' }}>
          <Typography variant="h3" sx={{ mb: 4 }}>
            {t('academy.courseTitle')}
          </Typography>
          <Button
            component="a"
            href="https://aviationsminute.com/scorm/index.html"
            target="_blank"
            rel="noopener noreferrer"
            variant="contained"
            size="large"
          >
            {t('academy.courseButton')}
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AcademyCourses;
