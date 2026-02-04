import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  useTheme,
} from '@mui/material';
import Business from '@mui/icons-material/Business';
import Psychology from '@mui/icons-material/Psychology';
import School from '@mui/icons-material/School';
import ArrowForward from '@mui/icons-material/ArrowForward';
import FlightTakeoff from '@mui/icons-material/FlightTakeoff';
import TrendingUp from '@mui/icons-material/TrendingUp';
import Security from '@mui/icons-material/Security';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useRTL } from '../hooks/useRTL';

const HomePage = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const { isRTL } = useRTL();

  const sections = [
    {
      title: t('platformDivisions.company.title'),
      description: t('platformDivisions.company.description'),
      icon: <Business sx={{ fontSize: 48 }} />,
      path: '/company',
      color: theme.palette.primary.main,
      features: [
        t('platformDivisions.company.features.leadership'),
        t('platformDivisions.company.features.vision'),
        t('platformDivisions.company.features.excellence'),
        t('platformDivisions.company.features.network')
      ]
    },
    {
      title: t('platformDivisions.avtech.title'),
      description: t('platformDivisions.avtech.description'),
      icon: <Psychology sx={{ fontSize: 48 }} />,
      path: '/avtech',
      color: theme.palette.primary.main,
      features: [
        t('platformDivisions.avtech.features.analytics'),
        t('platformDivisions.avtech.features.intelligence'),
        t('platformDivisions.avtech.features.automation'),
        t('platformDivisions.avtech.features.innovation')
      ]
    },
    {
      title: t('platformDivisions.academy.title'),
      description: t('platformDivisions.academy.description'),
      icon: <School sx={{ fontSize: 48 }} />,
      path: '/academy',
      color: theme.palette.primary.main,
      features: [
        t('platformDivisions.academy.features.curriculum'),
        t('platformDivisions.academy.features.certification'),
        t('platformDivisions.academy.features.standards'),
        t('platformDivisions.academy.features.learning')
      ]
    },
  ];

  const stats = [
    { label: t('pages.home.stats.activeUsers'), value: '10,000+', icon: <TrendingUp /> },
    { label: t('pages.home.stats.coursesAvailable'), value: '150+', icon: <School /> },
    { label: t('pages.home.stats.industryPartners'), value: '50+', icon: <Business /> },
    { label: t('pages.home.stats.successRate'), value: '98%', icon: <Security /> },
  ];

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, rgb(11, 11, 11) 0%, rgb(11, 11, 11) 50%, rgb(11, 11, 11) 100%)',
          minHeight: '80vh',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Typography
                  variant="h1"
                  sx={{
                    mb: 3,
                    background: 'linear-gradient(45deg, rgb(245, 243, 238) 30%, rgb(245, 243, 238) 90%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {t('pages.home.title')}
                </Typography>
                <Typography
                  variant="h2"
                  sx={{
                    mb: 4,
                    color: 'text.secondary',
                    fontWeight: 400,
                  }}
                >
                  {t('pages.home.subtitle')}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    mb: 4,
                    color: 'text.secondary',
                    lineHeight: 1.6,
                    maxWidth: 500,
                  }}
                >
                  {t('pages.home.description')}
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <Button
                    variant="contained"
                    size="large"
                    endIcon={<ArrowForward />}
                    component={Link}
                    to="/company"
                    sx={{
                      px: 4,
                      py: 1.5,
                      fontSize: '1.1rem',
                    }}
                  >
                    {t('pages.home.exploreButton')}
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    component={Link}
                    to="/academy"
                    sx={{
                      px: 4,
                      py: 1.5,
                      fontSize: '1.1rem',
                    }}
                  >
                    {t('pages.home.startLearning')}
                  </Button>
                </Box>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 400,
                  }}
                >
                  <FlightTakeoff
                    sx={{
                      fontSize: 200,
                      color: 'primary.main',
                      opacity: 0.8,
                      transform: 'rotate(-15deg)',
                    }}
                  />
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Stats Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4}>
          {stats.map((stat, index) => (
            <Grid item xs={6} md={3} key={stat.label}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Box
                  sx={{
                    textAlign: 'center',
                    p: 3,
                    borderRadius: 2,
                    backgroundColor: 'rgba(230, 126, 34, 0.05)',
                    border: '1px solid rgba(230, 126, 34, 0.2)',
                  }}
                >
                  <Box sx={{ color: 'primary.main', mb: 2 }}>
                    {stat.icon}
                  </Box>
                  <Typography variant="h4" sx={{ mb: 1, fontWeight: 700 }}>
                    {stat.value}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {stat.label}
                  </Typography>
                </Box>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Sections Overview */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography
            variant="h2"
            align="center"
            sx={{ mb: 2 }}
          >
            {t('pages.home.sectionsTitle')}
          </Typography>
          <Typography
            variant="h6"
            align="center"
            color="text.secondary"
            sx={{ mb: 6, maxWidth: 600, mx: 'auto' }}
          >
            {t('pages.home.sectionsSubtitle')}
          </Typography>
        </motion.div>

        <Grid container spacing={4}>
          {sections.map((section, index) => (
            <Grid item xs={12} md={4} key={section.title}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 20px 40px rgba(230, 126, 34, 0.3)',
                    },
                  }}
                >
                  <CardContent sx={{ flexGrow: 1, p: 4 }}>
                    <Box
                      sx={{
                        color: section.color,
                        mb: 3,
                        display: 'flex',
                        justifyContent: 'center',
                      }}
                    >
                      {section.icon}
                    </Box>
                    <Typography
                      variant="h5"
                      align="center"
                      sx={{ mb: 2, fontWeight: 600 }}
                    >
                      {section.title}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      align="center"
                      sx={{ mb: 3, lineHeight: 1.6 }}
                    >
                      {section.description}
                    </Typography>
                    <Box sx={{ mb: 3 }}>
                      {section.features.map((feature, idx) => (
                        <Typography
                          key={idx}
                          variant="body2"
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            mb: 1,
                            color: 'text.secondary',
                          }}
                        >
                          <Box
                            sx={{
                              width: 6,
                              height: 6,
                              borderRadius: '50%',
                              backgroundColor: section.color,
                              mr: 2,
                            }}
                          />
                          {feature}
                        </Typography>
                      ))}
                    </Box>
                  </CardContent>
                  <CardActions sx={{ p: 4, pt: 0 }}>
                    <Button
                      component={Link}
                      to={section.path}
                      variant="contained"
                      fullWidth
                      endIcon={<ArrowForward />}
                      sx={{
                        backgroundColor: section.color,
                        '&:hover': {
                          backgroundColor: section.color,
                          opacity: 0.9,
                        },
                      }}
                    >
                      {t('platformDivisions.exploreButton')} {section.title}
                    </Button>
                  </CardActions>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Vision 2030 Section */}
      <Box
        sx={{
          backgroundColor: 'rgba(230, 126, 34, 0.05)',
          py: 8,
          borderTop: '1px solid rgba(230, 126, 34, 0.2)',
          borderBottom: '1px solid rgba(230, 126, 34, 0.2)',
        }}
      >
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography
              variant="h3"
              align="center"
              sx={{ mb: 4 }}
            >
              {t('pages.home.vision2030Title')}
            </Typography>
            <Typography
              variant="h6"
              align="center"
              color="text.secondary"
              sx={{ maxWidth: 800, mx: 'auto', lineHeight: 1.6 }}
            >
              {t('pages.home.vision2030Description')}
            </Typography>
          </motion.div>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;
