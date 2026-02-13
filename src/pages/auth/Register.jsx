import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Link from '@mui/material/Link';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';

const Register = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError(t('auth.register.errors.passwordMismatch'));
      return;
    }

    if (formData.password.length < 6) {
      setError(t('auth.register.errors.passwordLength'));
      return;
    }

    setLoading(true);

    try {
      const result = await register(formData.name, formData.email, formData.password);
      if (result.success) {
        navigate('/');
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError(t('auth.register.errors.failed'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'background.default',
      }}
    >
      <Container maxWidth="sm">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Paper
            sx={{
              p: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography variant="h4" sx={{ mb: 4 }}>
              {t('auth.register.title')}
            </Typography>
            
            {error && (
              <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
                {error}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label={t('auth.register.name')}
                name="name"
                autoComplete="name"
                autoFocus
                value={formData.name}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label={t('auth.register.email')}
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label={t('auth.register.password')}
                type="password"
                id="password"
                autoComplete="new-password"
                value={formData.password}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label={t('auth.register.confirmPassword')}
                type="password"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={loading}
              >
                {loading ? t('auth.register.creatingAccount') : t('auth.register.createAccount')}
              </Button>
              <Box sx={{ textAlign: 'center' }}>
                <Link component={RouterLink} to="/login" variant="body2">
                  {t('auth.register.haveAccount')} {t('auth.register.signIn')}
                </Link>
              </Box>
            </Box>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Register;
