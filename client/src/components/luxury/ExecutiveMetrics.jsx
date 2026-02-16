import React, { useEffect, useState, useMemo } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useRTL } from '../../hooks/useRTL';

const ACCENT_COLOR = 'rgb(230, 126, 34)';

const ExecutiveMetrics = () => {
  const { t } = useTranslation();
  const { isRTL } = useRTL();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.3 });

  const metrics = useMemo(() => ([
    {
      value: 4,
      suffix: 'M+',
      label: t('executiveMetrics.vision2030'),
      description: t('executiveMetrics.visionDescription'),
      color: ACCENT_COLOR,
    },
    {
      value: 3,
      suffix: 'M+',
      label: t('executiveMetrics.aiModels'),
      description: t('executiveMetrics.aiDescription'),
      color: ACCENT_COLOR,
    },
    {
      value: 50000,
      suffix: '+',
      label: t('executiveMetrics.activeProjects'),
      description: t('executiveMetrics.projectsDescription'),
      color: ACCENT_COLOR,
    },
    {
      value: 100,
      suffix: '+',
      label: t('executiveMetrics.successRate'),
      description: t('executiveMetrics.successDescription'),
      color: ACCENT_COLOR,
    },
    {
      value: 170,
      suffix: '+',
      label: t('executiveMetrics.operations'),
      description: t('executiveMetrics.operationsDescription'),
      color: ACCENT_COLOR,
    },
    {
      value: 60,
      suffix: '%',
      label: t('executiveMetrics.digitalSolutions'),
      description: t('executiveMetrics.solutionsDescription'),
      color: ACCENT_COLOR,
    },
  ]), [t]);

  const AnimatedCounter = ({ value, suffix, isVisible, delay = 0 }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!isVisible) return;

      const timer = setTimeout(() => {
        const duration = 2000;
        const steps = 60;
        const increment = value / steps;
        let current = 0;

        const counter = setInterval(() => {
          current += increment;
          if (current >= value) {
            setCount(value);
            clearInterval(counter);
          } else {
            setCount(Math.floor(current));
          }
        }, duration / steps);

        return () => clearInterval(counter);
      }, delay);

      return () => clearTimeout(timer);
    }, [isVisible, value, delay]);

    return (
      <Typography
        variant="h2"
        sx={{
          fontWeight: 800,
          fontSize: 'clamp(2.5rem, 5vw, 4rem)',
          lineHeight: 1,
          background: 'linear-gradient(135deg, rgb(245, 243, 238) 0%, rgb(245, 243, 238) 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        {count.toLocaleString()}{suffix}
      </Typography>
    );
  };

  return (
    <Box
      ref={ref}
      sx={{
        py: 12,
        position: 'relative',
        background: 'linear-gradient(180deg, rgba(11, 11, 11, 1) 0%, rgba(11, 11, 11, 1) 100%)',
        overflow: 'hidden',
      }}
    >
      {/* Background Elements */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(ellipse at center, rgba(230, 126, 34, 0.03) 0%, transparent 70%)',
        }}
      />

      {/* Animated Grid Pattern */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.1,
          backgroundImage: `
            linear-gradient(rgba(230, 126, 34, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(230, 126, 34, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'gridMove 20s linear infinite',
          '@keyframes gridMove': {
            '0%': { transform: 'translate(0, 0)' },
            '100%': { transform: 'translate(50px, 50px)' },
          },
        }}
      />

      <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Box sx={{
            textAlign: 'center',
            mb: 10,
            direction: isRTL ? 'rtl' : 'ltr',
          }}>
            <Typography
              variant="h6"
              sx={{
                color: 'rgb(245, 243, 238)',
                fontWeight: 600,
                letterSpacing: '2px',
                textTransform: 'uppercase',
                mb: 2,
              }}
            >
              {t('executiveMetrics.sectionTitle')}
            </Typography>
            <Typography
              variant="h2"
              sx={{
                mb: 3,
                maxWidth: 800,
                mx: 'auto',
              }}
            >
              {t('executiveMetrics.mainTitle')}
              <Box component="span" sx={{
                background: 'linear-gradient(135deg, rgb(230, 126, 34) 0%, rgb(230, 126, 34) 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                ml: 2,
              }}>
                {t('executiveMetrics.mainTitleHighlight')}
              </Box>
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: 'rgb(245, 243, 238)',
                maxWidth: 600,
                mx: 'auto',
                lineHeight: 1.6,
              }}
            >
              {t('executiveMetrics.description')}
            </Typography>
          </Box>
        </motion.div>

        {/* Metrics Grid */}
        <Grid container spacing={4}>
          {metrics.map((metric, index) => (
            <Grid item xs={12} sm={6} lg={4} key={metric.label}>
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{
                  duration: 0.8,
                  ease: "easeOut",
                  delay: index * 0.1
                }}
              >
                <Box
                  sx={{
                    p: 4,
                    height: '100%',
                    background: 'linear-gradient(145deg, rgba(11, 11, 11, 0.8) 0%, rgba(11, 11, 11, 0.6) 100%)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(230, 126, 34, 0.2)',
                    borderRadius: 3,
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '3px',
                      background: 'linear-gradient(90deg, rgb(230, 126, 34) 0%, transparent 100%)',
                    },
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      border: '1px solid rgba(230, 126, 34, 0.4)',
                      boxShadow: '0 20px 40px rgba(230, 126, 34, 0.2)',
                      '&::after': {
                        opacity: 1,
                      },
                    },
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'radial-gradient(circle at center, rgba(230, 126, 34, 0.1) 0%, transparent 70%)',
                      opacity: 0,
                      transition: 'opacity 0.4s ease',
                    },
                  }}
                >
                  <Box sx={{ position: 'relative', zIndex: 1 }}>
                    {/* Metric Value */}
                    <Box sx={{
                      mb: 2,
                      textAlign: isRTL ? 'right' : 'left',
                    }}>
                      <AnimatedCounter
                        value={metric.value}
                        suffix={metric.suffix}
                        isVisible={isInView}
                        delay={index * 100}
                      />
                    </Box>

                    {/* Metric Label */}
                    <Typography
                      variant="h6"
                      sx={{
                        mb: 1,
                        fontWeight: 600,
                        color: 'rgb(245, 243, 238)',
                      }}
                    >
                      {metric.label}
                    </Typography>

                    {/* Metric Description */}
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'rgb(245, 243, 238)',
                        lineHeight: 1.5,
                      }}
                    >
                      {metric.description}
                    </Typography>

                    {/* Decorative Element */}
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 16,
                        right: isRTL ? 'auto' : 16,
                        left: isRTL ? 16 : 'auto',
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(230, 126, 34, 0.3) 0%, transparent 70%)',
                        border: '1px solid rgba(230, 126, 34, 0.4)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          background: 'rgb(230, 126, 34)',
                          animation: 'pulse 2s infinite',
                          '@keyframes pulse': {
                            '0%, 100%': { opacity: 1, transform: 'scale(1)' },
                            '50%': { opacity: 0.7, transform: 'scale(1.2)' },
                          },
                        }}
                      />
                    </Box>
                  </Box>
                </Box>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Bottom Insight */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
        >
          <Box
            sx={{
              mt: 10,
              p: 6,
              textAlign: 'center',
              background: 'linear-gradient(135deg, rgba(230, 126, 34, 0.1) 0%, rgba(230, 126, 34, 0.1) 100%)',
              border: '1px solid rgba(230, 126, 34, 0.2)',
              borderRadius: 4,
              backdropFilter: 'blur(20px)',
              direction: isRTL ? 'rtl' : 'ltr',
            }}
          >
            <Typography
              variant="h5"
              sx={{
                mb: 2,
                fontWeight: 600,
                background: 'linear-gradient(135deg, rgb(230, 126, 34) 0%, rgb(230, 126, 34) 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {t('executiveMetrics.bottomTitle')}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: 'rgb(245, 243, 238)',
                maxWidth: 800,
                mx: 'auto',
                lineHeight: 1.7,
              }}
            >
              {t('executiveMetrics.bottomDescription')}
            </Typography>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default React.memo(ExecutiveMetrics);
