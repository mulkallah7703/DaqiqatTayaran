import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Dashboard from '@mui/icons-material/Dashboard';
import People from '@mui/icons-material/People';
import School from '@mui/icons-material/School';
import Article from '@mui/icons-material/Article';
import TrendingUp from '@mui/icons-material/TrendingUp';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const { t } = useTranslation();

  if (!isAuthenticated || (user?.role !== 'admin' && user?.role !== 'editor')) {
    return <Navigate to="/login" replace />;
  }

  const stats = [
    { title: t('admin.stats.totalUsers'), value: '1,234', icon: <People />, color: 'rgb(230, 126, 34)' },
    { title: t('admin.stats.activeCourses'), value: '56', icon: <School />, color: 'rgb(230, 126, 34)' },
    { title: t('admin.stats.contentItems'), value: '89', icon: <Article />, color: 'rgb(230, 126, 34)' },
    { title: t('admin.stats.monthlyGrowth'), value: '+15%', icon: <TrendingUp />, color: 'rgb(230, 126, 34)' },
  ];

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default', py: 4 }}>
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <Dashboard sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
          <Typography variant="h3">
            {t('admin.title')}
          </Typography>
        </Box>

        <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
          {t('admin.welcome', { name: user?.name })}
        </Typography>

        <Grid container spacing={4}>
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={stat.title}>
              <Card
                sx={{
                  background: 'linear-gradient(135deg, rgba(230, 126, 34, 0.15) 0%, rgba(230, 126, 34, 0.05) 100%)',
                  border: '1px solid rgba(230, 126, 34, 0.3)',
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Box sx={{ color: stat.color, mr: 2 }}>
                      {stat.icon}
                    </Box>
                    <Typography variant="h4" sx={{ fontWeight: 700 }}>
                      {stat.value}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {stat.title}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Paper sx={{ p: 4, mt: 4 }}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Admin Features
          </Typography>
          <Typography variant="body1" color="text.secondary">
            The admin dashboard will include:
          </Typography>
          <Box component="ul" sx={{ mt: 2, color: 'text.secondary' }}>
            <li>Content management for all three sections</li>
            <li>Course creation and editing tools</li>
            <li>User management and role assignment</li>
            <li>Analytics and reporting</li>
            <li>Platform settings and configuration</li>
            <li>Bulk operations and data export</li>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default AdminDashboard;
