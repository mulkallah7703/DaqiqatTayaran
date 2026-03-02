import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const AcademySection = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'background.default',
        px: 2,
      }}
    >
      <Button
        variant="contained"
        size="large"
        onClick={() => navigate('/academy-login')}
        sx={{
          color: 'rgb(245, 243, 238)',
          borderRadius: 20,
          px: { xs: 4, md: 6 },
          py: { xs: 1.5, md: 2 },
          fontSize: { xs: '1rem', md: '1.1rem' },
          boxShadow: '0 12px 30px rgba(230, 126, 34, 0.35)',
          '&:hover': {
            boxShadow: '0 18px 45px rgba(230, 126, 34, 0.45)',
          },
        }}
      >
        {t('academy.entryButton')}
      </Button>
    </Box>
  );
};

export default AcademySection;
