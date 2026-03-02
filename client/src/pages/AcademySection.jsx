import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import Rating from '@mui/material/Rating';
import LinearProgress from '@mui/material/LinearProgress';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Alert from '@mui/material/Alert';
import School from '@mui/icons-material/School';
import Search from '@mui/icons-material/Search';
import PlayArrow from '@mui/icons-material/PlayArrow';
import AccessTime from '@mui/icons-material/AccessTime';
import People from '@mui/icons-material/People';
import Star from '@mui/icons-material/Star';
import EmojiEvents from '@mui/icons-material/EmojiEvents';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

const AcademySection = () => {
  const { t } = useTranslation();
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
  const [authUsername, setAuthUsername] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [levelFilter, setLevelFilter] = useState('');

  const { isLoading } = useQuery({
    queryKey: ['courses', searchTerm, categoryFilter, levelFilter],
    enabled: false,
    queryFn: async () => {
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (categoryFilter) params.append('category', categoryFilter);
      if (levelFilter) params.append('level', levelFilter);

      const response = await axios.get(`/courses?${params}`);
      return response.data;
    },
  });

  const stats = [
    { label: t('academy.stats.activeCourses'), value: '150+', icon: <School /> },
    { label: t('academy.stats.studentsEnrolled'), value: '10,000+', icon: <People /> },
    { label: t('academy.stats.completionRate'), value: '95%', icon: <EmojiEvents /> },
    { label: t('academy.stats.averageRating'), value: '4.8', icon: <Star /> },
  ];

  const courseCard = {
    title: t('academy.singleCourse.title'),
    description: t('academy.singleCourse.description'),
    level: t('academy.singleCourse.level'),
    url: 'https://aviationsminute.com/scorm/index.html',
  };

  const handleAuthOpen = () => {
    setAuthError('');
    setIsAuthDialogOpen(true);
  };

  const handleAuthClose = () => {
    setIsAuthDialogOpen(false);
  };

  const handleAuthSubmit = () => {
    if (authUsername === 'daqiqattayaran' && authPassword === 'daqiqattayaran1234') {
      setIsAuthorized(true);
      setIsAuthDialogOpen(false);
      setAuthError('');
      setAuthUsername('');
      setAuthPassword('');
      return;
    }
    setAuthError(t('academy.authError'));
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, rgb(11, 11, 11) 0%, rgb(11, 11, 11) 50%, rgb(11, 11, 11) 100%)',
          minHeight: '60vh',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Box sx={{ textAlign: 'center', mb: 6 }}>
              <School sx={{ fontSize: 80, color: 'rgb(230, 126, 34)', mb: 3 }} />
              <Typography
                variant="h1"
                sx={{
                  mb: 2,
                  background: 'linear-gradient(45deg, rgb(245, 243, 238) 30%, rgb(245, 243, 238) 90%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {t('academy.hero.title')}
              </Typography>
              <Typography variant="h4" color="text.secondary" sx={{ mb: 4 }}>
                {t('academy.hero.subtitle')}
              </Typography>
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{ maxWidth: 800, mx: 'auto', lineHeight: 1.6 }}
              >
                {t('academy.hero.description')}
              </Typography>
            </Box>
          </motion.div>
        </Container>
      </Box>

      {!isAuthorized && (
        <Container maxWidth="lg" sx={{ py: 10 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button variant="contained" size="large" onClick={handleAuthOpen}>
              {t('academy.openCourses')}
            </Button>
          </Box>
        </Container>
      )}

      <Dialog open={isAuthDialogOpen} onClose={handleAuthClose} maxWidth="xs" fullWidth>
        <DialogTitle>{t('academy.authTitle')}</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          {authError && <Alert severity="error" sx={{ mb: 2 }}>{authError}</Alert>}
          <TextField
            label={t('academy.username')}
            value={authUsername}
            onChange={(e) => setAuthUsername(e.target.value)}
            fullWidth
            margin="dense"
          />
          <TextField
            label={t('academy.password')}
            type="password"
            value={authPassword}
            onChange={(e) => setAuthPassword(e.target.value)}
            fullWidth
            margin="dense"
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button variant="outlined" onClick={handleAuthClose}>
            {t('academy.cancel')}
          </Button>
          <Button variant="contained" onClick={handleAuthSubmit}>
            {t('academy.submit')}
          </Button>
        </DialogActions>
      </Dialog>

      {isAuthorized && isLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
          <LinearProgress sx={{ width: '50%' }} />
        </Box>
      )}

      {isAuthorized && !isLoading && (
        <>
          <Container maxWidth="lg" sx={{ py: 8 }}>
            <Typography variant="h3" align="center" sx={{ mb: 6 }}>
              {t('academy.allCourses')}
            </Typography>

            {/* Courses Grid */}
            <Grid container spacing={4} justifyContent="center">
              <Grid item xs={12} sm={8} md={6}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 10px 20px rgba(11, 11, 11, 0.3)',
                      },
                    }}
                  >
                    <CardMedia
                      component="div"
                      sx={{
                        height: 180,
                        backgroundColor: 'rgb(230, 126, 34)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <PlayArrow sx={{ fontSize: 44, color: 'rgb(245, 243, 238)' }} />
                    </CardMedia>
                    <CardContent sx={{ flexGrow: 1, p: 3 }}>
                      <Chip label={courseCard.level} size="small" sx={{ mb: 1 }} />
                      <Typography variant="h6" sx={{ mb: 1 }}>
                        {courseCard.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {courseCard.description}
                      </Typography>
                      <Button
                        component="a"
                        href={courseCard.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="outlined"
                        fullWidth
                        size="small"
                      >
                        {t('academy.openCourse')}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            </Grid>
          </Container>
        </>
      )}
    </Box>
  );
};

export default AcademySection;
