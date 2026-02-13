import React, { useMemo } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import useTheme from '@mui/material/styles/useTheme';
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

const HomePage = () => {
  const theme = useTheme();
  const { t } = useTranslation();

  const sections = useMemo(() => ([
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
  ]), [t, theme.palette.primary.main]);

  const stats = useMemo(() => ([
    { label: t('pages.home.stats.activeUsers'), value: '10,000+', icon: <TrendingUp /> },
    { label: t('pages.home.stats.coursesAvailable'), value: '150+', icon: <School /> },
    { label: t('pages.home.stats.industryPartners'), value: '50+', icon: <Business /> },
    { label: t('pages.home.stats.successRate'), value: '98%', icon: <Security /> },
  ]), [t]);

  return (
      <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, rgb(11, 11, 11) 0%, rgb(11, 11, 11) 50%, rgb(11, 11, 11) 100%)',
            minHeight: '70vh',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="xl" sx={{ py: { xs: 6, md: 8 }, px: { xs: 2, sm: 3, md: 4 } }}>
          <Grid container spacing={{ xs: 3, md: 4 }} alignItems="center">
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
                    to="/avtech"
                    sx={{
                      px: 3.5,
                      py: 1.25,
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
                      px: 3.5,
                      py: 1.25,
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
                    height: { xs: 280, md: 320 },
                  }}
                >
                  <FlightTakeoff
                    sx={{
                      fontSize: 180,
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
      <Container maxWidth="xl" sx={{ py: { xs: 5, md: 6 }, px: { xs: 2, sm: 3, md: 4 } }}>
        <Grid container spacing={{ xs: 2, md: 3 }} justifyContent="center">
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={stat.label}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Box
                  sx={{
                    textAlign: 'center',
                    p: { xs: 2.5, md: 3 },
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
      <Container maxWidth="xl" sx={{ py: { xs: 6, md: 7 }, px: { xs: 2, sm: 3, md: 4 } }}>
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

        <Grid container spacing={{ xs: 3, md: 4 }} justifyContent="center">
          {sections.map((section, index) => (
            <Grid item xs={12} sm={6} md={6} key={section.title}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <Card
                  sx={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-6px)',
                      boxShadow: '0 18px 32px rgba(230, 126, 34, 0.25)',
                    },
                  }}
                >
                  <CardContent sx={{ flexGrow: 1, p: { xs: 3, md: 3.5 } }}>
                    <Box
                      sx={{
                        color: section.color,
                        mb: 2.5,
                        display: 'flex',
                        justifyContent: 'center',
                      }}
                    >
                      {section.icon}
                    </Box>
                    <Typography
                      variant="h5"
                      align="center"
                      sx={{ mb: 1.5, fontWeight: 600 }}
                    >
                      {section.title}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      align="center"
                      sx={{ mb: 2.5, lineHeight: 1.6 }}
                    >
                      {section.description}
                    </Typography>
                    <Box sx={{ mb: 2.5 }}>
                      {section.features.map((feature, idx) => (
                        <Typography
                          key={idx}
                          variant="body2"
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            mb: 0.75,
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
                  <CardActions sx={{ p: { xs: 3, md: 3.5 }, pt: 0 }}>
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
          py: { xs: 6, md: 7 },
          borderTop: '1px solid rgba(230, 126, 34, 0.2)',
          borderBottom: '1px solid rgba(230, 126, 34, 0.2)',
        }}
      >
        <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
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

export default React.memo(HomePage);
