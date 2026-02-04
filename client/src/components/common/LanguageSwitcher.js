import React from 'react';
import { Box, Button, Menu, MenuItem, Typography } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import LanguageIcon from '@mui/icons-material/Language';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (language) => {
    i18n.changeLanguage(language);
    handleClose();
  };

  const languages = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'ar', name: 'Arabic', nativeName: 'العربية' }
  ];

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  return (
    <Box sx={{ position: 'relative' }}>
      <Button
        onClick={handleClick}
        sx={{
          minWidth: 'auto',
          px: 3,
          py: 1.5,
          borderRadius: 12,
          background: 'rgba(11, 11, 11, 0.08)',
          border: '1px solid rgba(230, 126, 34, 0.2)',
          backdropFilter: 'blur(12px)',
          color: 'rgb(245, 243, 238)',
          fontSize: '0.95rem',
          fontWeight: 600,
          letterSpacing: '0.5px',
          textTransform: 'none',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            background: 'rgba(11, 11, 11, 0.15)',
            border: '1px solid rgba(230, 126, 34, 0.4)',
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 25px rgba(230, 126, 34, 0.2)',
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <LanguageIcon sx={{ fontSize: '1.1rem', opacity: 0.8 }} />
          <Typography
            variant="body2"
            sx={{
              fontWeight: 600,
              letterSpacing: '0.5px',
              color: 'inherit',
            }}
          >
            {currentLanguage.code.toUpperCase()}
          </Typography>
        </Box>
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: i18n.language === 'ar' ? 'left' : 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: i18n.language === 'ar' ? 'left' : 'right',
        }}
        sx={{
          '& .MuiPaper-root': {
            mt: 1,
            borderRadius: 16,
            background: 'linear-gradient(145deg, rgba(11, 11, 11, 0.95) 0%, rgba(11, 11, 11, 0.9) 100%)',
            backdropFilter: 'blur(24px)',
            border: '1px solid rgba(230, 126, 34, 0.2)',
            boxShadow: '0 20px 40px rgba(11, 11, 11, 0.4), 0 0 0 1px rgba(230, 126, 34, 0.1)',
            minWidth: 180,
          },
        }}
      >
        <AnimatePresence>
          {languages.map((language, index) => (
            <motion.div
              key={language.code}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
            >
              <MenuItem
                onClick={() => handleLanguageChange(language.code)}
                selected={language.code === i18n.language}
                sx={{
                  px: 3,
                  py: 2,
                  mx: 1,
                  my: 0.5,
                  borderRadius: 12,
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    background: 'rgba(230, 126, 34, 0.15)',
                    transform: 'translateX(4px)',
                  },
                  '&.Mui-selected': {
                    background: 'rgba(230, 126, 34, 0.2)',
                    '&:hover': {
                      background: 'rgba(230, 126, 34, 0.25)',
                    },
                  },
                }}
              >
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%' }}>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 600,
                      color: 'rgb(245, 243, 238)',
                      mb: 0.5,
                    }}
                  >
                    {language.name}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: 'rgb(245, 243, 238)',
                      fontSize: '0.85rem',
                      opacity: 0.8,
                    }}
                  >
                    {language.nativeName}
                  </Typography>
                </Box>
              </MenuItem>
            </motion.div>
          ))}
        </AnimatePresence>
      </Menu>
    </Box>
  );
};

export default LanguageSwitcher;