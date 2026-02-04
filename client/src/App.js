import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

// Initialize i18n
import './i18n';
import './styles/rtl.css';

// Components
import LuxuryNavbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import LuxuryAIAssistant from './components/luxury/LuxuryAIAssistant';

// Pages
import LuxuryHomePage from './pages/LuxuryHomePage';
import CompanySection from './pages/CompanySection';
import AvTechSection from './pages/AvTechSection';
import AcademySection from './pages/AcademySection';
import CourseDetail from './pages/CourseDetail';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import AdminDashboard from './pages/admin/AdminDashboard';

// Context
import { AuthProvider } from './context/AuthContext';

// EXECUTIVE AI AVIATION PLATFORM - PRODUCTION THEME SYSTEM WITH FULL RTL SUPPORT
const COLORS = {
  background: 'rgb(11, 11, 11)',
  text: 'rgb(245, 243, 238)',
  accent: 'rgb(230, 126, 34)',
};

const createAppTheme = (direction = 'ltr') => {
  const isRTL = direction === 'rtl';
  
  return createTheme({
    direction,
    palette: {
      mode: 'dark',
      primary: {
        main: COLORS.accent,
        light: COLORS.accent,
        dark: COLORS.accent,
        contrastText: COLORS.text,
      },
      secondary: {
        main: COLORS.text,
        light: COLORS.text,
        dark: COLORS.text,
        contrastText: COLORS.background,
      },
      background: {
        default: `linear-gradient(180deg, ${COLORS.background} 0%, ${COLORS.background} 100%)`,
        paper: 'linear-gradient(145deg, rgba(11, 11, 11, 0.9) 0%, rgba(11, 11, 11, 0.8) 100%)',
      },
      text: {
        primary: COLORS.text,
        secondary: COLORS.text,
      },
      info: {
        main: COLORS.accent,
        light: COLORS.accent,
        dark: COLORS.accent,
      },
      divider: 'rgba(230, 126, 34, 0.12)',
    },
    typography: {
      fontFamily: isRTL 
        ? '"Noto Sans Arabic", "Cairo", "Tajawal", "SF Pro Display", "Inter", system-ui, sans-serif'
        : '"SF Pro Display", "Inter", "Segoe UI", system-ui, -apple-system, sans-serif',
      h1: {
        fontWeight: 800,
        fontSize: 'clamp(3.5rem, 8vw, 7rem)',
        lineHeight: 0.95,
        letterSpacing: isRTL ? '0.025em' : '-0.025em',
        background: 'linear-gradient(135deg, rgb(245, 243, 238) 0%, rgb(245, 243, 238) 40%, rgb(245, 243, 238) 100%)',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        textShadow: '0 0 60px rgba(230, 126, 34, 0.4)',
        fontFeatureSettings: '"ss01", "cv01"',
        textAlign: isRTL ? 'right' : 'left',
      },
      h2: {
        fontWeight: 700,
        fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
        lineHeight: 1.1,
        letterSpacing: isRTL ? '0.02em' : '-0.02em',
        color: COLORS.text,
        fontFeatureSettings: '"ss01"',
        textAlign: isRTL ? 'right' : 'left',
      },
      h3: {
        fontWeight: 600,
        fontSize: 'clamp(2rem, 4vw, 3rem)',
        lineHeight: 1.2,
        letterSpacing: isRTL ? '0.01em' : '-0.01em',
        color: COLORS.text,
        textAlign: isRTL ? 'right' : 'left',
      },
      h4: {
        fontWeight: 600,
        fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
        lineHeight: 1.3,
        color: COLORS.text,
        textAlign: isRTL ? 'right' : 'left',
      },
      h5: {
        fontWeight: 500,
        fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
        lineHeight: 1.4,
        color: COLORS.text,
        textAlign: isRTL ? 'right' : 'left',
      },
      h6: {
        fontWeight: 500,
        fontSize: 'clamp(1.125rem, 2vw, 1.5rem)',
        lineHeight: 1.5,
        color: COLORS.text,
        letterSpacing: '0.025em',
        textAlign: isRTL ? 'right' : 'left',
      },
      body1: {
        fontSize: '1.125rem',
        lineHeight: 1.75,
        color: COLORS.text,
        fontWeight: 400,
        letterSpacing: '0.01em',
        textAlign: isRTL ? 'right' : 'left',
      },
      body2: {
        fontSize: '1rem',
        lineHeight: 1.6,
        color: COLORS.text,
        fontWeight: 400,
        textAlign: isRTL ? 'right' : 'left',
      },
      subtitle1: {
        fontSize: '1.25rem',
        lineHeight: 1.6,
        color: COLORS.text,
        fontWeight: 400,
        letterSpacing: '0.015em',
        textAlign: isRTL ? 'right' : 'left',
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            background: 'linear-gradient(180deg, rgb(11, 11, 11) 0%, rgb(11, 11, 11) 30%, rgb(11, 11, 11) 60%, rgb(11, 11, 11) 90%, rgb(11, 11, 11) 100%)',
            minHeight: '100vh',
            overflow: 'hidden auto',
            scrollBehavior: 'smooth',
            direction: direction,
          },
          '*': {
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgba(230, 126, 34, 0.3) transparent',
          },
          '*::-webkit-scrollbar': {
            width: '6px',
          },
          '*::-webkit-scrollbar-track': {
            background: 'transparent',
          },
          '*::-webkit-scrollbar-thumb': {
            background: 'rgba(230, 126, 34, 0.3)',
            borderRadius: '3px',
          },
          // RTL Support
          '[dir="rtl"]': {
            '& .MuiButton-root': {
              flexDirection: isRTL ? 'row-reverse' : 'row',
            },
            '& .MuiToolbar-root': {
              flexDirection: 'row-reverse',
            },
            '& .MuiGrid-container': {
              direction: 'rtl',
            },
            '& .MuiTypography-root': {
              textAlign: 'right',
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            borderRadius: 16,
            padding: '18px 36px',
            fontSize: '1.1rem',
            fontWeight: 600,
            letterSpacing: '0.5px',
            transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
            position: 'relative',
            overflow: 'hidden',
            flexDirection: isRTL ? 'row-reverse' : 'row',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: isRTL ? '100%' : '-100%',
              width: '100%',
              height: '100%',
              background: 'linear-gradient(90deg, transparent, rgba(245, 243, 238, 0.15), transparent)',
              transition: 'left 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
            },
            '&:hover::before': {
              left: isRTL ? '-100%' : '100%',
            },
            '&:hover': {
              transform: 'translateY(-3px)',
              boxShadow: '0 25px 50px rgba(230, 126, 34, 0.4)',
            },
          },
          startIcon: {
            marginLeft: isRTL ? 8 : 0,
            marginRight: isRTL ? 0 : 8,
          },
          endIcon: {
            marginLeft: isRTL ? 0 : 8,
            marginRight: isRTL ? 8 : 0,
          },
          contained: {
            background: 'linear-gradient(135deg, rgb(230, 126, 34) 0%, rgb(230, 126, 34) 100%)',
            color: COLORS.text,
            boxShadow: '0 12px 40px rgba(230, 126, 34, 0.4), inset 0 1px 0 rgba(245, 243, 238, 0.2)',
            '&:hover': {
              background: 'linear-gradient(135deg, rgb(230, 126, 34) 0%, rgb(230, 126, 34) 100%)',
              boxShadow: '0 20px 60px rgba(230, 126, 34, 0.5), inset 0 1px 0 rgba(245, 243, 238, 0.3)',
            },
          },
          outlined: {
            border: '2px solid rgba(230, 126, 34, 0.4)',
            color: COLORS.text,
            background: 'rgba(11, 11, 11, 0.08)',
            backdropFilter: 'blur(12px)',
            '&:hover': {
              border: '2px solid rgba(230, 126, 34, 0.7)',
              background: 'rgba(11, 11, 11, 0.15)',
              boxShadow: '0 12px 40px rgba(230, 126, 34, 0.2)',
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 28,
            background: 'linear-gradient(145deg, rgba(11, 11, 11, 0.85) 0%, rgba(11, 11, 11, 0.7) 100%)',
            backdropFilter: 'blur(24px)',
            border: '1px solid rgba(230, 126, 34, 0.15)',
            boxShadow: '0 32px 64px rgba(11, 11, 11, 0.5), inset 0 1px 0 rgba(245, 243, 238, 0.1)',
            transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
            direction: direction,
            textAlign: isRTL ? 'right' : 'left',
            '&:hover': {
              transform: 'translateY(-12px)',
              boxShadow: '0 40px 80px rgba(11, 11, 11, 0.6), 0 0 0 1px rgba(230, 126, 34, 0.3), inset 0 1px 0 rgba(245, 243, 238, 0.2)',
              border: '1px solid rgba(230, 126, 34, 0.25)',
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            background: 'linear-gradient(145deg, rgba(11, 11, 11, 0.9) 0%, rgba(11, 11, 11, 0.8) 100%)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(230, 126, 34, 0.12)',
            direction: direction,
            textAlign: isRTL ? 'right' : 'left',
          },
        },
      },
      MuiToolbar: {
        styleOverrides: {
          root: {
            flexDirection: isRTL ? 'row-reverse' : 'row',
          },
        },
      },
      MuiGrid: {
        styleOverrides: {
          container: {
            direction: direction,
          },
          item: {
            textAlign: isRTL ? 'right' : 'left',
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            direction: direction,
            '& .MuiInputBase-root': {
              direction: direction,
            },
            '& .MuiInputBase-input': {
              textAlign: isRTL ? 'right' : 'left',
            },
            '& .MuiInputLabel-root': {
              left: isRTL ? 'auto' : 14,
              right: isRTL ? 14 : 'auto',
              transformOrigin: isRTL ? 'top right' : 'top left',
            },
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paperAnchorLeft: {
            right: isRTL ? 0 : 'auto',
            left: isRTL ? 'auto' : 0,
          },
          paperAnchorRight: {
            right: isRTL ? 'auto' : 0,
            left: isRTL ? 0 : 'auto',
          },
        },
      },
      MuiList: {
        styleOverrides: {
          root: {
            direction: direction,
            textAlign: isRTL ? 'right' : 'left',
          },
        },
      },
      MuiListItem: {
        styleOverrides: {
          root: {
            flexDirection: isRTL ? 'row-reverse' : 'row',
            textAlign: isRTL ? 'right' : 'left',
          },
        },
      },
      MuiListItemIcon: {
        styleOverrides: {
          root: {
            marginLeft: isRTL ? 16 : 0,
            marginRight: isRTL ? 0 : 16,
            minWidth: 'auto',
          },
        },
      },
      MuiListItemText: {
        styleOverrides: {
          root: {
            textAlign: isRTL ? 'right' : 'left',
          },
        },
      },
      MuiMenu: {
        styleOverrides: {
          paper: {
            transformOrigin: isRTL ? 'top left !important' : 'top right !important',
          },
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            flexDirection: isRTL ? 'row-reverse' : 'row',
            textAlign: isRTL ? 'right' : 'left',
            justifyContent: isRTL ? 'flex-end' : 'flex-start',
          },
        },
      },
    },
  });
};

// Create query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  const { i18n } = useTranslation();
  const theme = React.useMemo(() => createAppTheme(i18n.language === 'ar' ? 'rtl' : 'ltr'), [i18n.language]);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <Router>
            <div className="App" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
              <LuxuryNavbar />
              <main>
                <Routes>
                  <Route path="/" element={<LuxuryHomePage />} />
                  <Route path="/company" element={<CompanySection />} />
                  <Route path="/avtech" element={<AvTechSection />} />
                  <Route path="/academy" element={<AcademySection />} />
                  <Route path="/course/:id" element={<CourseDetail />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/admin/*" element={<AdminDashboard />} />
                </Routes>
              </main>
              <Footer />
              <LuxuryAIAssistant />
            </div>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
