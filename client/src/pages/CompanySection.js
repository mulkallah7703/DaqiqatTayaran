import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Chip,
  LinearProgress,
  Paper,
} from '@mui/material';
import Business from '@mui/icons-material/Business';
import Visibility from '@mui/icons-material/Visibility';
import Flag from '@mui/icons-material/Flag';
import TrendingUp from '@mui/icons-material/TrendingUp';
import People from '@mui/icons-material/People';
import Public from '@mui/icons-material/Public';
import Star from '@mui/icons-material/Star';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useRTL } from '../hooks/useRTL';
import axios from 'axios';

const CompanySection = () => {
  const { t } = useTranslation();
  const { isRTL } = useRTL();
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await axios.get('/api/content/company');
      const contentData = {};
      response.data.forEach(item => {
        contentData[item.type] = item;
      });
      setContent(contentData);
    } catch (error) {
      console.error('Error fetching content:', error);
      // Set default content if API fails
      setContent({
        hero: {
          title: t('company.hero.title'),
          subtitle: t('company.hero.subtitle'),
          content: t('company.hero.description')
        },
        vision: {
          title: t('company.vision.title'),
          content: t('company.vision.content')
        },
        mission: {
          title: t('company.mission.title'),
          content: t('company.mission.content')
        }
      });
    } finally {
      setLoading(false);
    }
  };

  const metrics = [
    { label: t('company.metrics.growthTarget'), value: '150%', icon: <TrendingUp />, color: 'rgb(230, 126, 34)' },
    { label: t('company.metrics.activeUsers'), value: '10,000+', icon: <People />, color: 'rgb(230, 126, 34)' },
    { label: t('company.metrics.globalReach'), value: '25+ Countries', icon: <Public />, color: 'rgb(230, 126, 34)' },
    { label: t('company.metrics.clientSatisfaction'), value: '98%', icon: <Star />, color: 'rgb(230, 126, 34)' },
  ];

  const strategicEnablers = [
    {
      title: t('company.enablers.digitalInnovation.title'),
      description: t('company.enablers.digitalInnovation.description'),
      progress: 85,
      color: 'rgb(230, 126, 34)'
    },
    {
      title: t('company.enablers.humanCapital.title'),
      description: t('company.enablers.humanCapital.description'),
      progress: 92,
      color: 'rgb(230, 126, 34)'
    },
    {
      title: t('company.enablers.industryPartnerships.title'),
      description: t('company.enablers.industryPartnerships.description'),
      progress: 78,
      color: 'rgb(230, 126, 34)'
    },
    {
      title: t('company.enablers.sustainableGrowth.title'),
      description: t('company.enablers.sustainableGrowth.description'),
      progress: 88,
      color: 'rgb(230, 126, 34)'
    }
  ];

  const teamMembers = [
    {
      name: t('company.team.ceo.name'),
      position: t('company.team.ceo.position'),
      bio: t('company.team.ceo.bio'),
      avatar: '/api/placeholder/150/150'
    },
    {
      name: t('company.team.cto.name'),
      position: t('company.team.cto.position'),
      bio: t('company.team.cto.bio'),
      avatar: '/api/placeholder/150/150'
    },
    {
      name: t('company.team.headOperations.name'),
      position: t('company.team.headOperations.position'),
      bio: t('company.team.headOperations.bio'),
      avatar: '/api/placeholder/150/150'
    },
    {
      name: t('company.team.directorLearning.name'),
      position: t('company.team.directorLearning.position'),
      bio: t('company.team.directorLearning.bio'),
      avatar: '/api/placeholder/150/150'
    }
  ];

  const clients = [
    t('company.clients.saudiAirlines'),
    t('company.clients.emirates'),
    t('company.clients.qatarAirways'),
    t('company.clients.etihadAirways'),
    t('company.clients.flynas'),
    t('company.clients.saudiAerospace'),
    t('company.clients.kingAbdulazizAirport'),
    t('company.clients.riyadhAir'),
    t('company.clients.neomAviation'),
    t('company.clients.saudiAviationAcademy')
  ];

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <LinearProgress sx={{ width: '50%' }} />
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default', direction: isRTL ? 'rtl' : 'ltr' }}>
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
              <Business sx={{ fontSize: 80, color: 'primary.main', mb: 3 }} />
              <Typography
                variant="h1"
                sx={{
                  mb: 2,
                  background: 'linear-gradient(45deg, rgb(245, 243, 238) 30%, rgb(245, 243, 238) 90%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textAlign: 'center',
                }}
              >
                {content.hero?.title || t('company.hero.title')}
              </Typography>
              <Typography variant="h4" color="text.secondary" sx={{ mb: 4 }}>
                {content.hero?.subtitle || t('company.hero.subtitle')}
              </Typography>
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{ 
                  maxWidth: 800, 
                  mx: 'auto', 
                  lineHeight: 1.6,
                  textAlign: 'center',
                }}
              >
                {content.hero?.content}
              </Typography>
            </Box>
          </motion.div>
        </Container>
      </Box>

      {/* Metrics Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" align="center" sx={{ mb: 6, textAlign: 'center' }}>
          {t('company.performanceTitle')}
        </Typography>
        <Grid container spacing={4}>
          {metrics.map((metric, index) => (
            <Grid item xs={6} md={3} key={metric.label}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card
                  sx={{
                    textAlign: 'center',
                    height: '100%',
                    background: 'linear-gradient(135deg, rgba(230, 126, 34, 0.15) 0%, rgba(230, 126, 34, 0.05) 100%)',
                    border: '1px solid rgba(230, 126, 34, 0.3)',
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ color: metric.color, mb: 2 }}>
                      {metric.icon}
                    </Box>
                    <Typography variant="h4" sx={{ mb: 1, fontWeight: 700 }}>
                      {metric.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {metric.label}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Vision & Mission */}
      <Box sx={{ backgroundColor: 'rgba(230, 126, 34, 0.05)', py: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={6}>
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Card sx={{ height: '100%' }}>
                  <CardContent sx={{ p: 4 }}>
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      mb: 3,
                      flexDirection: isRTL ? 'row-reverse' : 'row',
                    }}>
                      <Visibility sx={{ 
                        fontSize: 40, 
                        color: 'primary.main', 
                        mr: isRTL ? 0 : 2,
                        ml: isRTL ? 2 : 0,
                      }} />
                      <Typography variant="h4">
                        {content.vision?.title || t('company.vision.title')}
                      </Typography>
                    </Box>
                    <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                      {content.vision?.content}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Card sx={{ height: '100%' }}>
                  <CardContent sx={{ p: 4 }}>
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      mb: 3,
                      flexDirection: isRTL ? 'row-reverse' : 'row',
                    }}>
                      <Flag sx={{ 
                        fontSize: 40, 
                        color: 'primary.main', 
                        mr: isRTL ? 0 : 2,
                        ml: isRTL ? 2 : 0,
                      }} />
                      <Typography variant="h4">
                        {content.mission?.title || t('company.mission.title')}
                      </Typography>
                    </Box>
                    <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                      {content.mission?.content}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Strategic Enablers */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" align="center" sx={{ mb: 6, textAlign: 'center' }}>
          {t('company.strategicEnablers')}
        </Typography>
        <Grid container spacing={4}>
          {strategicEnablers.map((enabler, index) => (
            <Grid item xs={12} md={6} key={enabler.title}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card>
                  <CardContent sx={{ p: 4 }}>
                    <Typography variant="h5" sx={{ mb: 2 }}>
                      {enabler.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                      {enabler.description}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <LinearProgress
                        variant="determinate"
                        value={enabler.progress}
                        sx={{
                          flexGrow: 1,
                          height: 8,
                          borderRadius: 4,
                          backgroundColor: 'rgba(11, 11, 11, 0.1)',
                          '& .MuiLinearProgress-bar': {
                            backgroundColor: enabler.color,
                          },
                        }}
                      />
                      <Typography variant="body2" sx={{ minWidth: 40 }}>
                        {enabler.progress}%
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Team Section */}
      <Box sx={{ backgroundColor: 'rgba(11, 11, 11, 0.02)', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" align="center" sx={{ mb: 6, textAlign: 'center' }}>
            {t('company.leadershipTeam')}
          </Typography>
          <Grid container spacing={4}>
            {teamMembers.map((member, index) => (
              <Grid item xs={12} sm={6} md={3} key={member.name}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card sx={{ textAlign: 'center', height: '100%' }}>
                    <CardContent sx={{ p: 3 }}>
                      <Avatar
                        src={member.avatar}
                        alt={member.name}
                        sx={{
                          width: 100,
                          height: 100,
                          mx: 'auto',
                          mb: 2,
                          backgroundColor: 'primary.main',
                        }}
                      >
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </Avatar>
                      <Typography variant="h6" sx={{ mb: 1 }}>
                        {member.name}
                      </Typography>
                      <Typography variant="body2" color="primary.main" sx={{ mb: 2 }}>
                        {member.position}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {member.bio}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Clients & Partners */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" align="center" sx={{ mb: 6, textAlign: 'center' }}>
          {t('company.trustedByIndustry')}
        </Typography>
        <Paper
          sx={{
            p: 4,
            backgroundColor: 'rgba(11, 11, 11, 0.02)',
            border: '1px solid rgba(11, 11, 11, 0.1)',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 2,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {clients.map((client, index) => (
              <motion.div
                key={client}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Chip
                  label={client}
                  variant="outlined"
                  sx={{
                    fontSize: '0.9rem',
                    py: 2,
                    px: 1,
                    '&:hover': {
                      backgroundColor: 'rgba(230, 126, 34, 0.1)',
                      borderColor: 'primary.main',
                    },
                  }}
                />
              </motion.div>
            ))}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default CompanySection;
