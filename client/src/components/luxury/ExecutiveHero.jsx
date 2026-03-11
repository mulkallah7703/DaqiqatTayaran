import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useRTL } from '../../hooks/useRTL';
import logodaq from '../../images/logodaq.png';

const ExecutiveHero = () => {
  const { t } = useTranslation();
  const { isRTL } = useRTL();
  // Hero section background with subtle cinematic motion
  const HeroBackground = () => (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
        zIndex: 0,
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          height: '100%',
          backgroundImage: "url('/background for first section.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          transform: 'scale(1.05)',
          willChange: 'transform',
          animation: 'heroBgMotion 25s ease-in-out infinite',
          '@keyframes heroBgMotion': {
            '0%, 100%': { transform: 'scale(1.03)' },
            '50%': { transform: 'scale(1.06)' },
          },
        }}
      />
    </Box>
  );

  return (
    <Box
      sx={{
        minHeight: { xs: 'auto', md: '80vh' },
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        pb: { xs: 3, md: 5 },
      }}
    >
      <HeroBackground />

      {/* Dark overlay for text readability and cinematic look */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1,
        }}
      />

      <Container
        maxWidth="xl"
        sx={{ position: 'relative', zIndex: 2, px: { xs: 2, sm: 3, md: 4 } }}
      >
        <motion.div>
          <Grid
            container
            spacing={{ xs: 4, md: 8 }}
            alignItems="center"
            sx={{ minHeight: { xs: 'auto', md: '80vh' }, py: { xs: 6, md: 0 } }}
          >
            {/* Content - Strategically Positioned with RTL Support */}
            <Grid item xs={12} lg={7}>
              <Box sx={{
                maxWidth: 800,
                pl: { xs: 0, md: 4, lg: isRTL ? 0 : 8 },
                pr: { xs: 0, md: isRTL ? 4 : 2, lg: isRTL ? 8 : 0 },
                textAlign: isRTL ? 'right' : 'left',
                direction: isRTL ? 'rtl' : 'ltr',
              }}>
                {/* Executive Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                >
                  <Box
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 3,
                      mb: 6,
                      px: 4,
                      py: 2,
                      background: 'linear-gradient(135deg, rgba(230, 126, 34, 0.15) 0%, rgba(230, 126, 34, 0.1) 100%)',
                      border: '1px solid rgba(230, 126, 34, 0.25)',
                      borderRadius: 60,
                      backdropFilter: 'blur(16px)',
                      boxShadow: '0 8px 32px rgba(230, 126, 34, 0.2)',
                    }}
                  >
                    <Box
                      sx={{
                        width: 12,
                        height: 12,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, rgb(230, 126, 34) 0%, rgb(230, 126, 34) 100%)',
                        animation: 'executivePulse 3s infinite',
                        '@keyframes executivePulse': {
                          '0%, 100%': { opacity: 1, transform: 'scale(1)', boxShadow: '0 0 0 0 rgba(230, 126, 34, 0.7)' },
                          '50%': { opacity: 0.8, transform: 'scale(1.1)', boxShadow: '0 0 0 8px rgba(230, 126, 34, 0)' },
                        },
                      }}
                    />
                    <Typography
                      variant="body1"
                      sx={{
                        color: 'rgb(245, 243, 238)',
                        fontWeight: 600,
                        letterSpacing: '1.5px',
                        textTransform: 'uppercase',
                        fontSize: '0.95rem',
                      }}
                    >
                      {t('hero.badge')}
                    </Typography>
                  </Box>
                </motion.div>

                {/* Main Headline - Powerful & Balanced */}
                <motion.div
                  initial={{ opacity: 0, y: 60 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
                >
                  <Typography
                    variant="h1"
                    sx={{
                      mb: 4,
                      fontWeight: 800,
                      lineHeight: 0.95,
                      letterSpacing: '-0.025em',
                    }}
                  >
                    {t('hero.title')}
                    <br />
                    <Box component="span" sx={{
                      background: 'linear-gradient(135deg, rgb(245, 243, 238) 0%, rgb(245, 243, 238) 50%, rgb(245, 243, 238) 100%)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      position: 'relative',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: '-8px',
                        left: isRTL ? 'auto' : 0,
                        right: isRTL ? 0 : 'auto',
                        width: '60%',
                        height: '4px',
                        background: 'linear-gradient(90deg, rgb(230, 126, 34) 0%, rgb(230, 126, 34) 100%)',
                        borderRadius: '2px',
                        opacity: 0.6,
                      },
                    }}>
                      {t('hero.titleHighlight')}
                    </Box>
                  </Typography>
                </motion.div>

                {/* Executive Subtitle */}
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{
                      mb: 6,
                      maxWidth: 600,
                      lineHeight: 1.6,
                      fontSize: '1.35rem',
                      fontWeight: 400,
                      color: 'rgb(245, 243, 238)',
                    }}
                  >
                    {t('hero.subtitle')}
                  </Typography>
                </motion.div>

                {/* Executive Metrics */}
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: "easeOut", delay: 1.2 }}
                >
                  <Box sx={{
                    display: 'flex',
                    gap: { xs: 4, md: 6 },
                    flexWrap: { xs: 'wrap', md: 'nowrap' },
                    flexDirection: isRTL ? 'row-reverse' : 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                  }}>
                    {[
                      { label: t('hero.metrics.aiSystems'), value: '4M+' },
                      { label: t('hero.metrics.aviationPartners'), value: '50K+' },
                      { label: t('hero.metrics.successRate'), value: '60%' },
                    ].map((metric) => (
                      <Box
                        key={metric.label}
                        sx={{
                          flex: 1,
                          minWidth: { xs: 160, md: 0 },
                          textAlign: 'center',
                        }}
                      >
                        <Typography
                          variant="h3"
                          sx={{
                            color: 'rgb(245, 243, 238)',
                            fontWeight: 800,
                            mb: 0.5,
                            fontSize: 'clamp(2rem, 4vw, 2.5rem)',
                          }}
                        >
                          {metric.value}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: 'rgb(245, 243, 238)',
                            textTransform: 'uppercase',
                            letterSpacing: '1.2px',
                            fontSize: '0.85rem',
                            fontWeight: 500,
                          }}
                        >
                          {metric.label}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </motion.div>
              </Box>
            </Grid>

            {/* Right Visualization */}
            <Grid item xs={12} lg={5}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8, x: 100 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.6 }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    height: { xs: 400, md: 600 },
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {/* Central AI Core */}
                  <Box
                    sx={{
                      width: { xs: 200, md: 280 },
                      height: { xs: 200, md: 280 },
                      borderRadius: '50%',
                      background: `
                        radial-gradient(circle, 
                          rgba(230, 126, 34, 0.3) 0%, 
                          rgba(230, 126, 34, 0.2) 40%, 
                          rgba(230, 126, 34, 0.1) 70%, 
                          transparent 100%
                        )
                      `,
                      border: '3px solid rgba(230, 126, 34, 0.4)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                      animation: 'coreRotate 30s linear infinite',
                      backdropFilter: 'blur(8px)',
                      boxShadow: '0 0 60px rgba(230, 126, 34, 0.3), inset 0 0 60px rgba(230, 126, 34, 0.2)',
                      '@keyframes coreRotate': {
                        '0%': { transform: 'rotate(0deg)' },
                        '100%': { transform: 'rotate(360deg)' },
                      },
                    }}
                  >
                    <Box
                      component="img"
                      src={logodaq}
                      alt="Daqiqat Tayaran"
                      sx={{
                        width: { xs: '65%', md: '70%' },
                        height: 'auto',
                        display: 'block',
                        borderRadius: '50%',
                        animation: 'counterRotate 30s linear infinite',
                        '@keyframes counterRotate': {
                          '0%': { transform: 'rotate(0deg)' },
                          '100%': { transform: 'rotate(-360deg)' },
                        },
                      }}
                    />
                  </Box>

                  {/* Orbiting Intelligence Nodes */}
                  {[
                    { label: t('pages.home.divisions.tech'), angle: 0, radius: 180, color: 'rgb(245, 243, 238)' },
                    { label: t('pages.home.divisions.media'), angle: 120, radius: 180, color: 'rgb(245, 243, 238)' },
                    { label: t('pages.home.divisions.academy'), angle: 240, radius: 180, color: 'rgb(245, 243, 238)' },
                  ].map((node, index) => (
                    <Box
                      key={node.label}
                      sx={{
                        position: 'absolute',
                        width: { xs: 90, md: 120 },
                        height: { xs: 90, md: 120 },
                        borderRadius: '50%',
                        background: `linear-gradient(135deg, 
                          rgba(11, 11, 11, 0.9) 0%, 
                          rgba(11, 11, 11, 0.8) 100%
                        )`,
                        border: '2px solid rgba(230, 126, 34, 0.4)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backdropFilter: 'blur(12px)',
                        boxShadow: '0 8px 32px rgba(230, 126, 34, 0.3)',
                        animation: `orbit${index} ${25 + index * 5}s linear infinite`,
                        transformOrigin: `${node.radius}px ${node.radius}px`,
                        '@keyframes orbit0': {
                          '0%': { transform: 'rotate(0deg) translateX(180px) rotate(0deg)' },
                          '100%': { transform: 'rotate(360deg) translateX(180px) rotate(-360deg)' },
                        },
                        '@keyframes orbit1': {
                          '0%': { transform: 'rotate(120deg) translateX(180px) rotate(-120deg)' },
                          '100%': { transform: 'rotate(480deg) translateX(180px) rotate(-480deg)' },
                        },
                        '@keyframes orbit2': {
                          '0%': { transform: 'rotate(240deg) translateX(180px) rotate(-240deg)' },
                          '100%': { transform: 'rotate(600deg) translateX(180px) rotate(-600deg)' },
                        },
                      }}
                    >
                      <Typography
                        variant="caption"
                        sx={{
                          color: node.color,
                          fontWeight: 700,
                          fontSize: { xs: '0.65rem', md: '0.75rem' },
                          textAlign: 'center',
                          lineHeight: 1.2,
                          letterSpacing: isRTL ? '0' : '1px',
                          width: '100%',
                          px: 3,
                          direction: isRTL ? 'rtl' : 'ltr',
                          fontFamily: isRTL
                            ? '"DIN Next Arabic", "Cairo", "29LT Bukra", "Tajawal", "Noto Sans Arabic", sans-serif'
                            : '"SF Pro Display", "Inter", "Segoe UI", system-ui, -apple-system, sans-serif',
                        }}
                      >
                        {node.label}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
};

export default ExecutiveHero;
