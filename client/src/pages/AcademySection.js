import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  Rating,
  LinearProgress,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import School from '@mui/icons-material/School';
import Search from '@mui/icons-material/Search';
import PlayArrow from '@mui/icons-material/PlayArrow';
import AccessTime from '@mui/icons-material/AccessTime';
import People from '@mui/icons-material/People';
import Star from '@mui/icons-material/Star';
import EmojiEvents from '@mui/icons-material/EmojiEvents';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { useRTL } from '../hooks/useRTL';
import axios from 'axios';

const AcademySection = () => {
  const { t } = useTranslation();
  const { isRTL } = useRTL();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [levelFilter, setLevelFilter] = useState('');

  const { data: coursesData, isLoading } = useQuery({
    queryKey: ['courses', searchTerm, categoryFilter, levelFilter],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (categoryFilter) params.append('category', categoryFilter);
      if (levelFilter) params.append('level', levelFilter);
      
      const response = await axios.get(`/api/courses?${params}`);
      return response.data;
    },
  });

  const { data: featuredCourses } = useQuery({
    queryKey: ['featured-courses'],
    queryFn: async () => {
      const response = await axios.get('/api/courses/featured');
      return response.data;
    },
  });

  const categories = [
    'aviation-basics',
    'ai-tools',
    'safety',
    'regulations',
    'technology',
    'leadership'
  ];

  const levels = ['beginner', 'intermediate', 'advanced'];

  const stats = [
    { label: t('academy.stats.activeCourses'), value: '150+', icon: <School /> },
    { label: t('academy.stats.studentsEnrolled'), value: '10,000+', icon: <People /> },
    { label: t('academy.stats.completionRate'), value: '95%', icon: <EmojiEvents /> },
    { label: t('academy.stats.averageRating'), value: '4.8', icon: <Star /> },
  ];

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <LinearProgress sx={{ width: '50%' }} />
      </Box>
    );
  }

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
                <Card
                  sx={{
                    textAlign: 'center',
                    background: 'linear-gradient(135deg, rgba(230, 126, 34, 0.08) 0%, rgba(230, 126, 34, 0.02) 100%)',
                    border: '1px solid rgba(230, 126, 34, 0.19)',
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ color: 'rgb(230, 126, 34)', mb: 2 }}>
                      {stat.icon}
                    </Box>
                    <Typography variant="h4" sx={{ mb: 1, fontWeight: 700 }}>
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {stat.label}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Featured Courses */}
      {featuredCourses && featuredCourses.length > 0 && (
        <Box sx={{ backgroundColor: 'rgba(230, 126, 34, 0.05)', py: 8 }}>
          <Container maxWidth="lg">
            <Typography variant="h3" align="center" sx={{ mb: 6 }}>
              {t('academy.featuredCourses')}
            </Typography>
            <Grid container spacing={4}>
              {featuredCourses.slice(0, 3).map((course, index) => (
                <Grid item xs={12} md={4} key={course._id}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
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
                      <CardMedia
                        component="div"
                        sx={{
                          height: 200,
                          backgroundColor: 'rgb(230, 126, 34)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <PlayArrow sx={{ fontSize: 60, color: 'rgb(245, 243, 238)' }} />
                      </CardMedia>
                      <CardContent sx={{ flexGrow: 1, p: 3 }}>
                        <Chip
                          label={course.category?.replace('-', ' ').toUpperCase()}
                          size="small"
                          sx={{ mb: 2, backgroundColor: 'rgb(230, 126, 34)', color: 'rgb(245, 243, 238)' }}
                        />
                        <Typography variant="h6" sx={{ mb: 2 }}>
                          {course.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                          {course.shortDescription || course.description?.substring(0, 100) + '...'}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <Rating value={course.rating?.average || 4.5} readOnly size="small" />
                          <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                            ({course.rating?.count || 0})
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <AccessTime sx={{ fontSize: 16, mr: 0.5 }} />
                            <Typography variant="body2">
                              {Math.floor((course.duration || 0) / 60)}h {(course.duration || 0) % 60}m
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <People sx={{ fontSize: 16, mr: 0.5 }} />
                            <Typography variant="body2">
                              {course.enrollmentCount || 0}
                            </Typography>
                          </Box>
                        </Box>
                        <Button
                          component={Link}
                          to={`/course/${course._id}`}
                          variant="contained"
                          fullWidth
                          sx={{ mt: 'auto' }}
                        >
                          {t('academy.viewCourse')}
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
      )}

      {/* Search and Filter */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" align="center" sx={{ mb: 6 }}>
          {t('academy.allCourses')}
        </Typography>
        
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder={t('academy.search.placeholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>{t('academy.category')}</InputLabel>
              <Select
                value={categoryFilter}
                label={t('academy.category')}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <MenuItem value="">{t('academy.filters.allCategories')}</MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {t(`academy.categories.${category}`)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>{t('academy.level')}</InputLabel>
              <Select
                value={levelFilter}
                label={t('academy.level')}
                onChange={(e) => setLevelFilter(e.target.value)}
              >
                <MenuItem value="">{t('academy.filters.allLevels')}</MenuItem>
                {levels.map((level) => (
                  <MenuItem key={level} value={level}>
                    {t(`academy.levels.${level}`)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {/* Courses Grid */}
        <Grid container spacing={4}>
          {coursesData?.courses?.map((course, index) => (
            <Grid item xs={12} sm={6} md={4} key={course._id}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
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
                      height: 160,
                      backgroundColor: 'rgb(230, 126, 34)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <PlayArrow sx={{ fontSize: 40, color: 'rgb(245, 243, 238)' }} />
                  </CardMedia>
                  <CardContent sx={{ flexGrow: 1, p: 2 }}>
                    <Chip
                      label={course.level?.toUpperCase()}
                      size="small"
                      sx={{ mb: 1 }}
                      color={
                        course.level === 'beginner' ? 'success' :
                        course.level === 'intermediate' ? 'warning' : 'error'
                      }
                    />
                    <Typography variant="h6" sx={{ mb: 1, fontSize: '1rem' }}>
                      {course.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {course.shortDescription || course.description?.substring(0, 80) + '...'}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Rating value={course.rating?.average || 4.5} readOnly size="small" />
                      <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                        ({course.rating?.count || 0})
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Typography variant="body2">
                        {Math.floor((course.duration || 0) / 60)}h {(course.duration || 0) % 60}m
                      </Typography>
                      <Typography variant="body2">
                        {course.enrollmentCount || 0} {t('academy.students')}
                      </Typography>
                    </Box>
                    <Button
                      component={Link}
                      to={`/course/${course._id}`}
                      variant="outlined"
                      fullWidth
                      size="small"
                    >
                      {t('academy.viewCourse')}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {coursesData?.courses?.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary">
              {t('academy.noCourses')}
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default AcademySection;
