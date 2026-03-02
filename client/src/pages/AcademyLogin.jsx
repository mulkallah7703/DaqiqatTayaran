import React, { useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const AUTH_KEY = 'academyAuth';
const USERNAME = 'Tariq';
const PASSWORD = 'Tariq1234';

const AcademyLogin = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const isRTL = useMemo(() => t('nav.home') !== 'Home', [t]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (username === USERNAME && password === PASSWORD) {
      localStorage.setItem(AUTH_KEY, 'true');
      navigate('/academy-courses');
      return;
    }
    setError(t('academy.login.error'));
  };

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
          maxWidth: 420,
          borderRadius: 24,
          border: '1px solid rgba(230, 126, 34, 0.2)',
          boxShadow: '0 24px 60px rgba(0, 0, 0, 0.45)',
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h4" sx={{ mb: 3, textAlign: 'center' }}>
            {t('academy.login.title')}
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'grid', gap: 2 }}>
            {error && <Alert severity="error">{error}</Alert>}
            <TextField
              label={t('academy.login.username')}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
              dir={isRTL ? 'rtl' : 'ltr'}
            />
            <TextField
              label={t('academy.login.password')}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              dir={isRTL ? 'rtl' : 'ltr'}
            />
            <Button type="submit" variant="contained" size="large">
              {t('academy.login.submit')}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AcademyLogin;
