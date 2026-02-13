import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useRTL } from '../../hooks/useRTL';

const ExecutiveHero = () => {
  const { t } = useTranslation();
  const { isRTL } = useRTL();
  const containerRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // AI Sky Background Component
  const AISkySphere = () => (
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
      {/* Aviation Sky Gradient */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(ellipse at top center, rgba(230, 126, 34, 0.15) 0%, transparent 50%),
            linear-gradient(180deg, 
              rgba(11, 11, 11, 0.9) 0%, 
              rgba(11, 11, 11, 0.7) 30%, 
              rgba(11, 11, 11, 0.5) 60%, 
              rgba(11, 11, 11, 0.8) 90%, 
              rgba(11, 11, 11, 1) 100%
            )
          `,
        }}
      />

      {/* Neural Network SVG */}
      <svg
        width="100%"
        height="100%"
        style={{ position: 'absolute', top: 0, left: 0 }}
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="neuralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(230, 126, 34, 0.2)" />
            <stop offset="50%" stopColor="rgba(230, 126, 34, 0.15)" />
            <stop offset="100%" stopColor="rgba(230, 126, 34, 0.1)" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Slow-moving neural pathways */}
        <motion.path
          d="M-200,400 Q400,200 800,300 T1600,250 Q1800,200 2200,300"
          stroke="url(#neuralGradient)"
          strokeWidth="2"
          fill="none"
          filter="url(#glow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.7 }}
          transition={{ 
            duration: 8, 
            ease: "easeInOut", 
            repeat: Infinity, 
            repeatType: "reverse" 
          }}
        />
        <motion.path
          d="M-100,600 Q600,400 1200,500 T2400,450"
          stroke="url(#neuralGradient)"
          strokeWidth="1.5"
          fill="none"
          filter="url(#glow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.5 }}
          transition={{ 
            duration: 12, 
            ease: "easeInOut", 
            repeat: Infinity, 
            repeatType: "reverse", 
            delay: 2 
          }}
        />
        <motion.path
          d="M0,800 Q300,600 600,700 T1200,650 Q1500,600 1920,700"
          stroke="url(#neuralGradient)"
          strokeWidth="1"
          fill="none"
          filter="url(#glow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.3 }}
          transition={{ 
            duration: 15, 
            ease: "easeInOut", 
            repeat: Infinity, 
            repeatType: "reverse", 
            delay: 4 
          }}
        />
      </svg>

      {/* Floating AI Particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            width: Math.random() * 6 + 3,
            height: Math.random() * 6 + 3,
            background: `radial-gradient(circle, ${
              Math.random() > 0.5 ? 'rgba(230, 126, 34, 0.8)' : 'rgba(230, 126, 34, 0.6)'
            } 0%, transparent 70%)`,
            borderRadius: '50%',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            filter: 'blur(1px)',
          }}
          animate={{
            y: [0, -40, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.3, 1, 0.3],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: Math.random() * 8 + 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 5,
          }}
        />
      ))}

      {/* Data Wave Overlay */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(ellipse at 20% 50%, rgba(230, 126, 34, 0.08) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 30%, rgba(230, 126, 34, 0.06) 0%, transparent 50%)
          `,
          animation: 'dataWave 20s ease-in-out infinite',
          '@keyframes dataWave': {
            '0%, 100%': { opacity: 0.5, transform: 'scale(1)' },
            '50%': { opacity: 0.8, transform: 'scale(1.05)' },
          },
        }}
      />
    </Box>
  );

  return (
    <Box
      ref={containerRef}
      sx={{
        minHeight: '100vh',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      <AISkySphere />
      
      <Container
        maxWidth="xl"
        sx={{ position: 'relative', zIndex: 2, px: { xs: 2, sm: 3, md: 4 } }}
      >
        <motion.div style={{ y, opacity }}>
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

                {/* Executive Actions */}
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.9 }}
                >
                  <Box sx={{ 
                    display: 'flex', 
                    gap: 4, 
                    flexWrap: 'wrap', 
                    mb: 8,
                    flexDirection: isRTL ? 'row-reverse' : 'row',
                    justifyContent: isRTL ? 'flex-end' : 'flex-start',
                  }}>
                    <Button
                      component={Link}
                      to="/avtech"
                      variant="contained"
                      size="large"
                      sx={{
                        px: 5,
                        py: 2.5,
                        fontSize: '1.15rem',
                        fontWeight: 600,
                        minWidth: 200,
                      }}
                    >
                      {t('hero.exploreButton')}
                    </Button>
                    <Button
                      component={Link}
                      to="/avtech"
                      variant="outlined"
                      size="large"
                      sx={{
                        px: 5,
                        py: 2.5,
                        fontSize: '1.15rem',
                        fontWeight: 600,
                        minWidth: 180,
                      }}
                    >
                      {t('hero.aiSolutionsButton')}
                    </Button>
                  </Box>
                </motion.div>

                {/* Executive Metrics */}
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: "easeOut", delay: 1.2 }}
                >
                  <Box sx={{ 
                    display: 'flex', 
                    gap: 8, 
                    flexWrap: 'wrap',
                    flexDirection: isRTL ? 'row-reverse' : 'row',
                    justifyContent: isRTL ? 'flex-end' : 'flex-start',
                  }}>
                    {[
                      { label: t('hero.metrics.aiSystems'), value: '150+' },
                      { label: t('hero.metrics.aviationPartners'), value: '500+' },
                      { label: t('hero.metrics.successRate'), value: '99.8%' },
                    ].map((metric) => (
                      <Box key={metric.label} sx={{ textAlign: isRTL ? 'right' : 'left' }}>
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
                    <Typography
                      variant="h5"
                      sx={{
                        color: 'rgb(245, 243, 238)',
                        fontWeight: 700,
                        textAlign: 'center',
                        letterSpacing: '2px',
                        animation: 'counterRotate 30s linear infinite',
                        '@keyframes counterRotate': {
                          '0%': { transform: 'rotate(0deg)' },
                          '100%': { transform: 'rotate(-360deg)' },
                        },
                      }}
                    >
                      AI
                      <br />
                      CORE
                    </Typography>
                  </Box>

                  {/* Orbiting Intelligence Nodes */}
                  {[
                    { label: 'AVIATION', angle: 0, radius: 180, color: 'rgb(245, 243, 238)' },
                    { label: 'INTELLIGENCE', angle: 120, radius: 180, color: 'rgb(245, 243, 238)' },
                    { label: 'VISION 2030', angle: 240, radius: 180, color: 'rgb(245, 243, 238)' },
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
                          letterSpacing: '1px',
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
