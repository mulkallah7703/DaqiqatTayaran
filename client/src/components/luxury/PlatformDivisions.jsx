import React, { useMemo } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useRTL } from '../../hooks/useRTL';
import Psychology from '@mui/icons-material/Psychology';
import School from '@mui/icons-material/School';

const PlatformDivisions = () => {
  const { t } = useTranslation();
  const { isRTL } = useRTL();
  
  const divisions = useMemo(() => ([
    {
      title: t('platformDivisions.avtech.title'),
      subtitle: t('platformDivisions.avtech.subtitle'),
      description: t('platformDivisions.avtech.description'),
      icon: <Psychology sx={{ fontSize: 48 }} />,
      path: '/avtech',
      gradient: 'linear-gradient(135deg, rgba(230, 126, 34, 0.15) 0%, rgba(230, 126, 34, 0.05) 100%)',
      borderColor: 'rgba(230, 126, 34, 0.2)',
      features: [
        t('platformDivisions.avtech.features.analytics'),
        t('platformDivisions.avtech.features.intelligence'),
        t('platformDivisions.avtech.features.automation'),
        t('platformDivisions.avtech.features.innovation')
      ]
    },
    {
      title: t('platformDivisions.academy.title'),
      subtitle: t('platformDivisions.academy.subtitle'),
      description: t('platformDivisions.academy.description'),
      icon: <School sx={{ fontSize: 48 }} />,
      path: '/academy',
      gradient: 'linear-gradient(135deg, rgba(230, 126, 34, 0.15) 0%, rgba(230, 126, 34, 0.05) 100%)',
      borderColor: 'rgba(230, 126, 34, 0.2)',
      features: [
        t('platformDivisions.academy.features.curriculum'),
        t('platformDivisions.academy.features.certification'),
        t('platformDivisions.academy.features.standards'),
        t('platformDivisions.academy.features.learning')
      ]
    }
  ]), [t]);

  return (
    <Box
      sx={{
        py: 12,
        position: 'relative',
        background: 'linear-gradient(180deg, rgba(11, 11, 11, 1) 0%, rgba(11, 11, 11, 1) 100%)',
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
          opacity: 0.3,
          background: 'radial-gradient(ellipse at center, rgba(230, 126, 34, 0.05) 0%, transparent 70%)',
        }}
      />

      <Container
        maxWidth="xl"
        sx={{ px: { xs: 2, sm: 3, md: 4 } }}
      >
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <Box sx={{ 
            textAlign: 'center', 
            mb: 8,
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
              {t('platformDivisions.sectionTitle')}
            </Typography>
            <Typography
              variant="h2"
              sx={{
                mb: 3,
                maxWidth: 800,
                mx: 'auto',
              }}
            >
              {t('platformDivisions.mainTitle')}
              <Box component="span" sx={{ 
                background: 'linear-gradient(135deg, rgb(245, 243, 238) 0%, rgb(245, 243, 238) 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                ml: 2,
              }}>
                {t('platformDivisions.mainTitleHighlight')}
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
              {t('platformDivisions.description')}
            </Typography>
          </Box>
        </motion.div>

        {/* Divisions Grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: { xs: 3, md: 4 },
            maxWidth: 1200,
            mx: 'auto',
          }}
        >
          {divisions.map((division, index) => (
            <Box
              key={division.title}
              component={motion.div}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                ease: 'easeOut',
                delay: index * 0.2,
              }}
              viewport={{ once: true }}
              sx={{ display: 'flex' }}
            >
              <Card
                sx={{
                  flex: 1,
                  height: '100%',
                  background: division.gradient,
                  border: `1px solid ${division.borderColor}`,
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: `linear-gradient(90deg, ${division.borderColor} 0%, transparent 100%)`,
                  },
                  '&:hover': {
                    '& .division-icon': {
                      transform: 'scale(1.1) rotate(5deg)',
                    },
                    '& .division-features': {
                      transform: 'translateY(0)',
                      opacity: 1,
                    },
                  },
                }}
              >
                  <CardContent sx={{ 
                    p: 4, 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    textAlign: isRTL ? 'right' : 'left',
                    direction: isRTL ? 'rtl' : 'ltr',
                  }}>
                    {/* Icon */}
                    <Box
                      className="division-icon"
                      sx={{
                        color: division.borderColor.replace('0.2', '0.8'),
                        mb: 3,
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      }}
                    >
                      {division.icon}
                    </Box>

                    {/* Content */}
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'rgb(245, 243, 238)',
                          textTransform: 'uppercase',
                          letterSpacing: '1px',
                          mb: 1,
                          fontSize: '0.875rem',
                        }}
                      >
                        {division.subtitle}
                      </Typography>
                      
                      <Typography
                        variant="h4"
                        sx={{
                          mb: 3,
                          fontWeight: 600,
                          lineHeight: 1.3,
                        }}
                      >
                        {division.title}
                      </Typography>

                      <Typography
                        variant="body1"
                        sx={{
                          mb: 4,
                          color: 'rgb(245, 243, 238)',
                          lineHeight: 1.7,
                        }}
                      >
                        {division.description}
                      </Typography>

                      {/* Features */}
                      <Box
                        className="division-features"
                        sx={{
                          transform: 'translateY(20px)',
                          opacity: 0,
                          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                          mb: 4,
                        }}
                      >
                        {division.features.map((feature, idx) => (
                          <Box
                            key={idx}
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              mb: 1.5,
                              flexDirection: isRTL ? 'row-reverse' : 'row',
                            }}
                          >
                            <Box
                              sx={{
                                width: 6,
                                height: 6,
                                borderRadius: '50%',
                                background: division.borderColor.replace('0.2', '0.6'),
                                mr: isRTL ? 0 : 2,
                                ml: isRTL ? 2 : 0,
                                flexShrink: 0,
                              }}
                            />
                            <Typography
                              variant="body2"
                              sx={{
                                color: 'rgb(245, 243, 238)',
                                fontSize: '0.95rem',
                              }}
                            >
                              {feature}
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    </Box>

                    {/* CTA Button */}
                    <Button
                      component={Link}
                      to={division.path}
                      variant="outlined"
                      fullWidth
                      sx={{
                        mt: 'auto',
                        borderColor: division.borderColor,
                        color: division.borderColor.replace('0.2', '0.8'),
                        '&:hover': {
                          borderColor: division.borderColor.replace('0.2', '0.6'),
                          background: division.borderColor.replace('0.2', '0.1'),
                        },
                      }}
                    >
                      {t('platformDivisions.exploreButton')}
                    </Button>
                  </CardContent>
              </Card>
            </Box>
          ))}
        </Box>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
          viewport={{ once: true }}
        >
          <Box sx={{ 
            textAlign: 'center', 
            mt: 10,
            direction: isRTL ? 'rtl' : 'ltr',
          }}>
            <Typography
              variant="h5"
              sx={{
                mb: 4,
                color: 'rgb(245, 243, 238)',
                maxWidth: 600,
                mx: 'auto',
              }}
            >
              {t('platformDivisions.bottomDescription')}
            </Typography>
            <Button
              component={Link}
              to="/login"
              variant="contained"
              size="large"
              sx={{
                px: 6,
                py: 2,
                fontSize: '1.1rem',
                fontWeight: 600,
              }}
            >
              {t('platformDivisions.accessButton')}
            </Button>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default React.memo(PlatformDivisions);
