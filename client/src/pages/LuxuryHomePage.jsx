import React, { Suspense } from 'react';
import Box from '@mui/material/Box';
import MinimalLoader from '../components/common/MinimalLoader';

const ExecutiveHero = React.lazy(() => import('../components/luxury/ExecutiveHero'));
const PlatformDivisions = React.lazy(() => import('../components/luxury/PlatformDivisions'));
const ExecutiveMetrics = React.lazy(() => import('../components/luxury/ExecutiveMetrics'));
const BrandIdentitySection = React.lazy(() => import('../components/luxury/BrandIdentitySection'));
const HomeAdditionalSections = React.lazy(() => import('../components/luxury/HomeAdditionalSections'));

const LuxuryHomePage = () => {
  return (
    <Box sx={{ overflowX: 'hidden' }}>
      <Suspense fallback={<MinimalLoader />}>
        <ExecutiveHero />
        <ExecutiveMetrics />
        <BrandIdentitySection />
        <HomeAdditionalSections />
        <PlatformDivisions />
      </Suspense>
    </Box>
  );
};

export default LuxuryHomePage;
