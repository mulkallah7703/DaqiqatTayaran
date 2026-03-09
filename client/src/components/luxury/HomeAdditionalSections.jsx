import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';

const HomeAdditionalSections = () => {
  const { t } = useTranslation();

  return (
    <Box sx={{ backgroundColor: 'rgb(11, 11, 11)', py: { xs: 6, sm: 7, md: 9 } }}>
      <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
        <Box sx={{ maxWidth: { xs: 720, md: 980, lg: 1100 }, mx: 'auto' }}>
          <Box sx={{ mb: { xs: 4, md: 5 } }}>
            <Typography variant="h2" sx={{ mb: 3, textAlign: 'center' }}>
              {t('pages.home.programmingSolutions.title')}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: '#EAEAEA',
                lineHeight: 1.9,
                textAlign: 'center',
              }}
            >
              {t('pages.home.programmingSolutions.description')}
            </Typography>
          </Box>

          <Box>
            <Typography variant="h2" sx={{ mb: 3, textAlign: 'center' }}>
              {t('pages.home.creativeProduction.title')}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: '#EAEAEA',
                lineHeight: 1.9,
                textAlign: 'center',
              }}
            >
              {t('pages.home.creativeProduction.description')}
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default React.memo(HomeAdditionalSections);
