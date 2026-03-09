import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import FlightTakeoff from '@mui/icons-material/FlightTakeoff';
import LinkedIn from '@mui/icons-material/LinkedIn';
import Twitter from '@mui/icons-material/Twitter';
import Facebook from '@mui/icons-material/Facebook';
import Instagram from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { FaTiktok } from 'react-icons/fa';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useRTL } from '../../hooks/useRTL';

const Footer = () => {
  const { t, i18n } = useTranslation();
  const { isRTL } = useRTL();
  const isArabic = i18n.language === 'ar';
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    [t('footer.platform')]: [
      { label: t('nav.avtech'), path: '/avtech' },
      { label: t('nav.academy'), path: '/academy' },
    ],
    [t('footer.resources')]: [
      { label: t('footer.documentation'), path: '#' },
      { label: t('footer.apiReference'), path: '#' },
      { label: t('footer.supportCenter'), path: '#' },
      { label: t('footer.community'), path: '#' },
    ],
    [t('footer.legal')]: [
      { label: t('footer.privacyPolicy'), path: '#' },
      { label: t('footer.termsOfService'), path: 'https://www.youtube.com/watch?v=fxA1PuoQLsQ&list=PL9NlbH_3GufXDwq7vSXoNurvWEYqmVrOf' },
      { label: t('footer.cookiePolicy'), path: '#' },
      { label: t('footer.gdprCompliance'), path: '#' },
    ],
  };

  const socialLinks = [
    { icon: <LinkedIn />, url: '#', label: 'LinkedIn' },
    { icon: <Twitter />, url: 'https://x.com/avsahaab?s=21', label: 'Twitter' },
    { icon: <Facebook />, url: '#', label: 'Facebook' },
    { icon: <Instagram />, url: '#', label: 'Instagram' },
  ];

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'rgba(11, 11, 11, 0.9)',
        borderTop: '1px solid rgba(230, 126, 34, 0.1)',
        mt: 'auto',
        direction: isRTL ? 'rtl' : 'ltr',
      }}
    >
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={4}>
          {/* Brand Section - Daqiqat Tayaran introduction */}
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                direction: isArabic ? 'rtl' : 'ltr',
                textAlign: isArabic ? 'right' : 'left',
              }}
            >
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                mb: 2,
                flexDirection: isRTL ? 'row-reverse' : 'row',
                justifyContent: isArabic ? 'flex-end' : 'flex-start',
              }}>
                <FlightTakeoff sx={{
                  color: 'primary.main',
                  mr: isRTL ? 0 : 1,
                  ml: isRTL ? 1 : 0,
                }} />
                <Typography variant="h6" sx={{
                  color: 'primary.main',
                  fontWeight: 700,
                  textAlign: 'inherit',
                }}>
                  {t('nav.brand')}
                </Typography>
              </Box>
              <Typography
                variant="subtitle2"
                sx={{
                  color: 'primary.main',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  mb: 1,
                  textAlign: 'inherit',
                }}
              >
                {t('footer.subBrand')}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{
                mb: 3,
                lineHeight: 1.6,
                textAlign: 'inherit',
              }}>
                {t('footer.description')}
              </Typography>

              {/* Social Links */}
              <Box sx={{
                display: 'flex',
                flexDirection: isRTL ? 'row-reverse' : 'row',
                justifyContent: isRTL ? 'flex-end' : 'flex-start',
              }}>
              {socialLinks.map((social, index) => (
                <IconButton
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: 'text.secondary',
                    mr: isRTL ? 0 : 1,
                    ml: isRTL ? 1 : 0,
                    '&:hover': {
                      color: 'primary.main',
                      backgroundColor: 'rgba(230, 126, 34, 0.1)',
                    },
                  }}
                  aria-label={social.label}
                >
                  {social.icon}
                </IconButton>
              ))}
              <IconButton
                href="https://m.youtube.com/watch?v=aCr0jjI_lDU&t=874s&pp=2AHqBpACAcoFHtiz2K3Yp9ioINi32KfYTYudmK_Zig%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: 'text.secondary',
                  mr: isRTL ? 0 : 1,
                  ml: isRTL ? 1 : 0,
                  '&:hover': {
                    color: 'primary.main',
                    backgroundColor: 'rgba(230, 126, 34, 0.1)',
                  },
                }}
                aria-label="YouTube"
              >
                <YouTubeIcon fontSize="medium" />
              </IconButton>
              <IconButton
                href="https://www.tiktok.com/@avsahaab?_r=1&_t=ZS-93xKQHZr5PB"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: 'text.secondary',
                  mr: isRTL ? 0 : 1,
                  ml: isRTL ? 1 : 0,
                  '&:hover': {
                    color: 'primary.main',
                    backgroundColor: 'rgba(230, 126, 34, 0.1)',
                  },
                }}
                aria-label="TikTok"
              >
                <FaTiktok size={20} />
              </IconButton>
            </Box>
            </Box>
          </Grid>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <Grid item xs={12} sm={4} md={2.67} key={title}>
              <Typography variant="h6" sx={{
                mb: 2,
                color: 'text.primary',
                textAlign: isRTL ? 'right' : 'left',
              }}>
                {title}
              </Typography>
              <Box>
                {links.map((link, index) => (
                  <Link
                    key={index}
                    component={link.path.startsWith('http') || link.path.startsWith('#') ? 'a' : RouterLink}
                    to={link.path.startsWith('http') || link.path.startsWith('#') ? undefined : link.path}
                    href={link.path.startsWith('http') || link.path.startsWith('#') ? link.path : undefined}
                    target={link.path.startsWith('http') ? '_blank' : undefined}
                    rel={link.path.startsWith('http') ? 'noopener noreferrer' : undefined}
                    sx={{
                      display: 'block',
                      color: 'text.secondary',
                      textDecoration: 'none',
                      mb: 1,
                      fontSize: '0.875rem',
                      '&:hover': {
                        color: 'primary.main',
                      },
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
              </Box>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ my: 4, borderColor: 'rgba(230, 126, 34, 0.1)' }} />

        {/* Bottom Section */}
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="body2" color="text.secondary" sx={{
              textAlign: isRTL ? 'right' : 'left',
            }}>
              {t('footer.copyright', { year: currentYear })}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{
              display: 'flex',
              justifyContent: {
                xs: isRTL ? 'flex-end' : 'flex-start',
                md: isRTL ? 'flex-start' : 'flex-end'
              }
            }}>
              <Typography variant="body2" color="text.secondary">
                {t('footer.builtWith')}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default React.memo(Footer);
