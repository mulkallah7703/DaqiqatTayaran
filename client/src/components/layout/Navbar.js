import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  useMediaQuery,
  useTheme,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import FlightTakeoff from '@mui/icons-material/FlightTakeoff';
import Business from '@mui/icons-material/Business';
import Psychology from '@mui/icons-material/Psychology';
import School from '@mui/icons-material/School';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import { useRTL } from '../../hooks/useRTL';
import LanguageSwitcher from '../common/LanguageSwitcher';
import logo from '../../logo.png';

const LuxuryNavbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  const { t } = useTranslation();
  const { isRTL } = useRTL();

  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
    navigate('/');
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navItems = [
    { label: t('nav.home'), path: '/', icon: <FlightTakeoff fontSize="small" /> },
    { label: t('nav.company'), path: '/company', icon: <Business fontSize="small" /> },
    { label: t('nav.avtech'), path: '/avtech', icon: <Psychology fontSize="small" /> },
    { label: t('nav.academy'), path: '/academy', icon: <School fontSize="small" /> },
  ];

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const drawer = (
    <Box sx={{ width: 280, pt: 3 }}>
      <Box sx={{ px: 3, mb: 4 }}>
        <Typography
          variant="h6"
          sx={{
            color: 'rgb(245, 243, 238)',
            fontWeight: 700,
            letterSpacing: '1px',
          }}
        >
          Dagigat Tayran
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: 'rgb(245, 243, 238)',
            mt: 0.5,
          }}
        >
          Platform
        </Typography>
      </Box>
      <List>
        {navItems.map((item) => (
          <ListItem
            key={item.label}
            component={Link}
            to={item.path}
            onClick={handleDrawerToggle}
            sx={{
              mx: 2,
              mb: 1,
              borderRadius: 2,
              color: 'rgb(245, 243, 238)',
              background: isActive(item.path) ? 'rgba(230, 126, 34, 0.1)' : 'transparent',
              '&:hover': {
                backgroundColor: 'rgba(230, 126, 34, 0.1)',
                color: 'rgb(245, 243, 238)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            <Box sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>{item.icon}</Box>
            <ListItemText
              primary={item.label}
              primaryTypographyProps={{
                fontWeight: isActive(item.path) ? 600 : 400,
              }}
            />
          </ListItem>
        ))}
        {!isAuthenticated && (
          <>
            <Box sx={{ mx: 2, my: 2, height: 1, background: 'rgba(230, 126, 34, 0.1)' }} />
            <ListItem
              component={Link}
              to="/login"
              onClick={handleDrawerToggle}
              sx={{
                mx: 2,
                mb: 1,
                borderRadius: 2,
                '&:hover': { backgroundColor: 'rgba(230, 126, 34, 0.1)' }
              }}
            >
              <ListItemText primary="Executive Access" />
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          background: scrolled
            ? 'linear-gradient(145deg, rgba(11, 11, 11, 0.95) 0%, rgba(11, 11, 11, 0.95) 100%)'
            : 'linear-gradient(145deg, rgba(11, 11, 11, 0.8) 0%, rgba(11, 11, 11, 0.8) 100%)',
          backdropFilter: 'blur(20px)',
          borderBottom: scrolled
            ? '1px solid rgba(230, 126, 34, 0.2)'
            : '1px solid rgba(230, 126, 34, 0.1)',
          boxShadow: scrolled
            ? '0 8px 32px rgba(11, 11, 11, 0.3)'
            : 'none',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <Toolbar sx={{
          px: { xs: 2, md: 4 },
          py: { xs: 0.5, md: 0.75 },
          minHeight: { xs: 56, md: 64 },
          flexDirection: isRTL ? 'row-reverse' : 'row',
        }}>
          {/* Mobile Menu Button - Position 1 in RTL, Position 1 in LTR */}
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{
                marginInlineEnd: 2,
                color: 'rgb(245, 243, 238)',
                '&:hover': {
                  background: 'rgba(230, 126, 34, 0.1)',
                },
              }}
            >
              <MenuIcon sx={{ fontSize: 20 }} />
            </IconButton>
          )}

          {/* Logo - Position 2 in RTL, Position 1 in LTR */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            style={{}}
          >
            <Box
              component={Link}
              to="/"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                textDecoration: 'none',
                color: 'inherit',
                flexDirection: isRTL ? 'row-reverse' : 'row',
              }}
            >
              <Box
                component="img"
                src={logo}
                alt="Brand logo"
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  objectFit: 'contain',
                  boxShadow: '0 8px 24px rgba(11, 11, 11, 0.35)',
                }}
              />
              <Box
                sx={{
                  textAlign: isRTL ? 'right' : 'left',
                  minWidth: 180,
                  maxWidth: 180,
                  flexShrink: 0,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    fontSize: '1.1rem',
                    background: 'linear-gradient(135deg, rgb(245, 243, 238) 0%, rgb(245, 243, 238) 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    lineHeight: 1.2,
                  }}
                >
                  {t('nav.brand')}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: 'rgb(245, 243, 238)',
                    fontSize: '0.75rem',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                  }}
                >
                  {t('nav.tagline')}
                </Typography>
              </Box>
            </Box>
          </motion.div>

          {/* Spacer */}
          <Box sx={{ flexGrow: 1 }} />

          {/* Navigation Items - Desktop Only */}
          {!isMobile && (
            <Box sx={{
              display: 'flex',
              gap: 1,
              flexDirection: isRTL ? 'row-reverse' : 'row',
            }}>
              {navItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Button
                    component={Link}
                    to={item.path}
                    startIcon={isRTL ? null : item.icon}
                    endIcon={isRTL ? item.icon : null}
                    sx={{
                      color: isActive(item.path) ? 'rgb(230, 126, 34)' : 'rgb(245, 243, 238)',
                      fontWeight: isActive(item.path) ? 600 : 400,
                      px: 2.5,
                      py: 0.5,
                      borderRadius: 2,
                      position: 'relative',
                      flexDirection: isRTL ? 'row-reverse' : 'row',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: 0,
                        left: '50%',
                        width: isActive(item.path) ? '80%' : '0%',
                        height: '2px',
                        background: 'linear-gradient(90deg, rgb(230, 126, 34) 0%, rgb(230, 126, 34) 100%)',
                        transform: 'translateX(-50%)',
                        transition: 'width 0.3s ease',
                      },
                      '&:hover': {
                        backgroundColor: 'rgba(230, 126, 34, 0.1)',
                        color: 'rgb(245, 243, 238)',
                        '&::after': {
                          width: '80%',
                        },
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {item.label}
                  </Button>
                </motion.div>
              ))}
            </Box>
          )}

          {/* Language Switcher */}
          <Box sx={{
            marginInlineStart: 2,
          }}>
            <LanguageSwitcher />
          </Box>

          {/* User Menu */}
          <Box sx={{
            marginInlineStart: 3,
          }}>
            {isAuthenticated ? (
              <>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="primary-search-account-menu"
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  sx={{
                    color: 'rgb(245, 243, 238)',
                    '&:hover': {
                      background: 'rgba(230, 126, 34, 0.1)',
                    },
                  }}
                >
                  {user?.avatar ? (
                    <Avatar
                      src={user.avatar}
                      alt={user.name}
                      sx={{
                        width: 36,
                        height: 36,
                        border: '2px solid rgba(230, 126, 34, 0.3)',
                      }}
                    />
                  ) : (
                    <AccountCircle sx={{ fontSize: 36 }} />
                  )}
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  PaperProps={{
                    sx: {
                      mt: 1,
                      background: 'linear-gradient(145deg, rgba(11, 11, 11, 0.95) 0%, rgba(11, 11, 11, 0.95) 100%)',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(230, 126, 34, 0.2)',
                      borderRadius: 2,
                      minWidth: 200,
                    },
                  }}
                >
                  <MenuItem
                    onClick={handleMenuClose}
                    sx={{
                      color: 'rgb(245, 243, 238)',
                      '&:hover': { background: 'rgba(230, 126, 34, 0.1)' },
                    }}
                  >
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {user?.name}
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'rgb(245, 243, 238)' }}>
                        Executive Access
                      </Typography>
                    </Box>
                  </MenuItem>
                  {(user?.role === 'admin' || user?.role === 'editor') && (
                    <MenuItem
                      onClick={() => {
                        navigate('/admin');
                        handleMenuClose();
                      }}
                      sx={{
                        color: 'rgb(245, 243, 238)',
                        '&:hover': { background: 'rgba(230, 126, 34, 0.1)' },
                      }}
                    >
                      Executive Dashboard
                    </MenuItem>
                  )}
                  <MenuItem
                    onClick={handleLogout}
                    sx={{
                      color: 'rgb(245, 243, 238)',
                      '&:hover': { background: 'rgba(230, 126, 34, 0.1)' },
                    }}
                  >
                    Sign Out
                  </MenuItem>
                </Menu>
              </>
            ) : (
              !isMobile && (
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button
                    component={Link}
                    to="/login"
                    variant="outlined"
                    size="small"
                    sx={{
                      borderColor: 'rgba(230, 126, 34, 0.3)',
                      color: 'rgb(245, 243, 238)',
                      py: 0.5,
                      '&:hover': {
                        borderColor: 'rgba(230, 126, 34, 0.6)',
                        background: 'rgba(230, 126, 34, 0.1)',
                      },
                    }}
                  >
                    {t('nav.login')}
                  </Button>
                </Box>
              )
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 280,
            background: 'linear-gradient(145deg, rgba(11, 11, 11, 0.95) 0%, rgba(11, 11, 11, 0.95) 100%)',
            backdropFilter: 'blur(20px)',
            borderRight: '1px solid rgba(230, 126, 34, 0.2)',
          },
        }}
      >
        {drawer}
      </Drawer>

      {/* Spacer for fixed navbar */}
      <Toolbar />
    </>
  );
};

export default LuxuryNavbar;
