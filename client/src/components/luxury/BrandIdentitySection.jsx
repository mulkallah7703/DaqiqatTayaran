import React, { useRef } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import ContactPanel from '../common/ContactPanel';

const BrandIdentitySection = () => {
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);
  const sectionRef = useRef(null);

  return (
    <Box
      ref={sectionRef}
      sx={{
        py: { xs: 6, sm: 7, md: 9 },
        backgroundColor: 'rgb(11, 11, 11)',
        position: 'relative',
      }}
    >
      <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          <Box sx={{ maxWidth: { xs: 720, md: 980, lg: 1100 }, mx: 'auto', textAlign: 'center' }}>
            <Typography variant="h2" sx={{ mb: 3 }}>
              {t('brandIdentity.title')}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: '#EAEAEA',
                lineHeight: 1.9,
                whiteSpace: 'pre-line',
                mb: 4,
              }}
            >
              {t('brandIdentity.description')}
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={() => setOpen(true)}
              sx={{
                px: 5,
                py: 1.8,
                fontWeight: 600,
                borderRadius: 3,
                cursor: 'pointer',
                pointerEvents: 'auto',
                position: 'relative',
                zIndex: 2,
                boxShadow: '0 12px 30px rgba(230, 126, 34, 0.35)',
                '&:hover': {
                  boxShadow: '0 18px 40px rgba(230, 126, 34, 0.45)',
                  transform: 'translateY(-1px)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              {t('brandIdentity.cta')}
            </Button>
          </Box>
        </motion.div>
      </Container>
      <ContactPanel open={open} onClose={() => setOpen(false)} container={sectionRef.current} />
    </Box>
  );
};

export default React.memo(BrandIdentitySection);
