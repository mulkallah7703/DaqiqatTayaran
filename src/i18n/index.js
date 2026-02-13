import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import enTranslations from './locales/en.json';
import arTranslations from './locales/ar.json';

const resources = {
  en: {
    translation: enTranslations
  },
  ar: {
    translation: arTranslations
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },

    interpolation: {
      escapeValue: false,
    },

    react: {
      useSuspense: false,
    },
  });

// Set document direction based on language with comprehensive RTL support
i18n.on('languageChanged', (lng) => {
  const dir = lng === 'ar' ? 'rtl' : 'ltr';
  const isRTL = lng === 'ar';
  
  // Set document attributes
  document.documentElement.dir = dir;
  document.documentElement.lang = lng;
  
  // Add/remove RTL class for global styling
  if (isRTL) {
    document.documentElement.classList.add('rtl');
    document.documentElement.classList.remove('ltr');
    document.body.classList.add('rtl');
    document.body.classList.remove('ltr');
  } else {
    document.documentElement.classList.add('ltr');
    document.documentElement.classList.remove('rtl');
    document.body.classList.add('ltr');
    document.body.classList.remove('rtl');
  }
  
  // Update CSS custom properties for direction-aware styling
  document.documentElement.style.setProperty('--text-align-start', isRTL ? 'right' : 'left');
  document.documentElement.style.setProperty('--text-align-end', isRTL ? 'left' : 'right');
  document.documentElement.style.setProperty('--margin-start', isRTL ? 'margin-right' : 'margin-left');
  document.documentElement.style.setProperty('--margin-end', isRTL ? 'margin-left' : 'margin-right');
  document.documentElement.style.setProperty('--padding-start', isRTL ? 'padding-right' : 'padding-left');
  document.documentElement.style.setProperty('--padding-end', isRTL ? 'padding-left' : 'padding-right');
  document.documentElement.style.setProperty('--border-start', isRTL ? 'border-right' : 'border-left');
  document.documentElement.style.setProperty('--border-end', isRTL ? 'border-left' : 'border-right');
  document.documentElement.style.setProperty('--transform-x', isRTL ? 'scaleX(-1)' : 'scaleX(1)');
});

// Set initial direction with comprehensive setup
const currentLang = i18n.language || 'en';
const initialDir = currentLang === 'ar' ? 'rtl' : 'ltr';
const isInitialRTL = currentLang === 'ar';

document.documentElement.dir = initialDir;
document.documentElement.lang = currentLang;

if (isInitialRTL) {
  document.documentElement.classList.add('rtl');
  document.body.classList.add('rtl');
} else {
  document.documentElement.classList.add('ltr');
  document.body.classList.add('ltr');
}

// Set initial CSS custom properties
document.documentElement.style.setProperty('--text-align-start', isInitialRTL ? 'right' : 'left');
document.documentElement.style.setProperty('--text-align-end', isInitialRTL ? 'left' : 'right');
document.documentElement.style.setProperty('--margin-start', isInitialRTL ? 'margin-right' : 'margin-left');
document.documentElement.style.setProperty('--margin-end', isInitialRTL ? 'margin-left' : 'margin-right');
document.documentElement.style.setProperty('--padding-start', isInitialRTL ? 'padding-right' : 'padding-left');
document.documentElement.style.setProperty('--padding-end', isInitialRTL ? 'padding-left' : 'padding-right');
document.documentElement.style.setProperty('--border-start', isInitialRTL ? 'border-right' : 'border-left');
document.documentElement.style.setProperty('--border-end', isInitialRTL ? 'border-left' : 'border-right');
document.documentElement.style.setProperty('--transform-x', isInitialRTL ? 'scaleX(-1)' : 'scaleX(1)');

export default i18n;