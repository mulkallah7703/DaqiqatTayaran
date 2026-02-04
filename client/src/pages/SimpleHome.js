import React from 'react';
import { Box, Container, Typography, Button, Grid, Card, CardContent } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useRTL } from '../hooks/useRTL';

const SimpleHome = () => {
  const { t } = useTranslation();
  const { isRTL } = useRTL();

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'rgb(11, 11, 11)', color: 'rgb(245, 243, 238)', py: 8 }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h1" sx={{ mb: 4, color: 'rgb(245, 243, 238)' }}>
            {t('pages.simple.title')}
          </Typography>
          <Typography variant="h4" sx={{ mb: 4, color: 'rgb(245, 243, 238)' }}>
            {t('pages.simple.subtitle')}
          </Typography>
          <Typography variant="h6" sx={{ mb: 6, color: 'rgb(245, 243, 238)', maxWidth: 800, mx: 'auto' }}>
            {t('pages.simple.description')}
          </Typography>
          
          <Grid container spacing={4} sx={{ mt: 4 }}>
            <Grid item xs={12} md={4}>
              <Card sx={{ backgroundColor: 'rgb(11, 11, 11)', color: 'rgb(245, 243, 238)', height: '100%' }}>
                <CardContent sx={{ p: 4, textAlign: 'center' }}>
                  <Typography variant="h5" sx={{ mb: 2, color: 'rgb(245, 243, 238)' }}>
                    {t('platformDivisions.company.title')}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 3 }}>
                    {t('platformDivisions.company.description')}
                  </Typography>
                  <Button 
                    component={Link} 
                    to="/company" 
                    variant="contained" 
                    sx={{ backgroundColor: 'rgb(230, 126, 34)' }}
                  >
                    {t('platformDivisions.exploreButton')}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Card sx={{ backgroundColor: 'rgb(11, 11, 11)', color: 'rgb(245, 243, 238)', height: '100%' }}>
                <CardContent sx={{ p: 4, textAlign: 'center' }}>
                  <Typography variant="h5" sx={{ mb: 2, color: 'rgb(245, 243, 238)' }}>
                    {t('platformDivisions.avtech.title')}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 3 }}>
                    {t('platformDivisions.avtech.description')}
                  </Typography>
                  <Button 
                    component={Link} 
                    to="/avtech" 
                    variant="contained" 
                    sx={{ backgroundColor: 'rgb(230, 126, 34)' }}
                  >
                    {t('platformDivisions.exploreButton')}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Card sx={{ backgroundColor: 'rgb(11, 11, 11)', color: 'rgb(245, 243, 238)', height: '100%' }}>
                <CardContent sx={{ p: 4, textAlign: 'center' }}>
                  <Typography variant="h5" sx={{ mb: 2, color: 'rgb(245, 243, 238)' }}>
                    {t('platformDivisions.academy.title')}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 3 }}>
                    {t('platformDivisions.academy.description')}
                  </Typography>
                  <Button 
                    component={Link} 
                    to="/academy" 
                    variant="contained" 
                    sx={{ backgroundColor: 'rgb(230, 126, 34)' }}
                  >
                    {t('pages.home.startLearning')}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default SimpleHome;
