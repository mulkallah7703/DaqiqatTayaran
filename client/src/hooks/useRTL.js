import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';

export const useRTL = () => {
  const { i18n } = useTranslation();
  
  const isRTL = useMemo(() => i18n.language === 'ar', [i18n.language]);
  
  const rtlProps = useMemo(() => ({
    direction: isRTL ? 'rtl' : 'ltr',
    textAlign: isRTL ? 'right' : 'left',
  }), [isRTL]);

  // Comprehensive directional utilities
  const getFlexDirection = (defaultDirection = 'row') => {
    if (!isRTL) return defaultDirection;
    
    switch (defaultDirection) {
      case 'row':
        return 'row-reverse';
      case 'row-reverse':
        return 'row';
      default:
        return defaultDirection;
    }
  };

  const getTextAlign = (align = 'left') => {
    if (!isRTL) return align;
    
    switch (align) {
      case 'left':
        return 'right';
      case 'right':
        return 'left';
      default:
        return align;
    }
  };

  const getMargin = (margin) => {
    if (!isRTL || typeof margin !== 'object') return margin;
    
    return {
      ...margin,
      marginLeft: margin.marginRight,
      marginRight: margin.marginLeft,
      ml: margin.mr,
      mr: margin.ml,
    };
  };

  const getPadding = (padding) => {
    if (!isRTL || typeof padding !== 'object') return padding;
    
    return {
      ...padding,
      paddingLeft: padding.paddingRight,
      paddingRight: padding.paddingLeft,
      pl: padding.pr,
      pr: padding.pl,
    };
  };

  // Grid and layout utilities
  const getGridDirection = () => isRTL ? 'row-reverse' : 'row';
  
  const getJustifyContent = (justify = 'flex-start') => {
    if (!isRTL) return justify;
    
    switch (justify) {
      case 'flex-start':
        return 'flex-end';
      case 'flex-end':
        return 'flex-start';
      case 'left':
        return 'right';
      case 'right':
        return 'left';
      default:
        return justify;
    }
  };

  const getAlignItems = (align = 'flex-start') => {
    if (!isRTL) return align;
    
    switch (align) {
      case 'flex-start':
        return 'flex-end';
      case 'flex-end':
        return 'flex-start';
      default:
        return align;
    }
  };

  // Position utilities
  const getPosition = (position) => {
    if (!isRTL || typeof position !== 'object') return position;
    
    return {
      ...position,
      left: position.right,
      right: position.left,
    };
  };

  // Transform utilities
  const getTransform = (transform) => {
    if (!isRTL) return transform;
    
    if (typeof transform === 'string') {
      // Handle translateX transformations
      return transform.replace(/translateX\(([^)]+)\)/g, (match, value) => {
        if (value.includes('-')) {
          return `translateX(${value.replace('-', '')})`;
        } else {
          return `translateX(-${value})`;
        }
      });
    }
    
    return transform;
  };

  // Animation direction utilities
  const getSlideDirection = (direction = 'left') => {
    if (!isRTL) return direction;
    
    switch (direction) {
      case 'left':
        return 'right';
      case 'right':
        return 'left';
      default:
        return direction;
    }
  };

  // Icon utilities
  const shouldFlipIcon = (iconType) => {
    const flipIcons = [
      'arrow-right', 'arrow-left', 'chevron-right', 'chevron-left',
      'angle-right', 'angle-left', 'caret-right', 'caret-left',
      'forward', 'back', 'next', 'previous'
    ];
    
    return isRTL && flipIcons.includes(iconType);
  };

  const getIconTransform = (iconType) => {
    return shouldFlipIcon(iconType) ? 'scaleX(-1)' : 'none';
  };

  // Comprehensive style object generator
  const getDirectionalStyles = (styles = {}) => {
    if (!isRTL) return styles;
    
    const directionalStyles = { ...styles };
    
    // Handle margin properties
    if (styles.marginLeft !== undefined || styles.marginRight !== undefined) {
      directionalStyles.marginLeft = styles.marginRight;
      directionalStyles.marginRight = styles.marginLeft;
    }
    
    // Handle padding properties
    if (styles.paddingLeft !== undefined || styles.paddingRight !== undefined) {
      directionalStyles.paddingLeft = styles.paddingRight;
      directionalStyles.paddingRight = styles.paddingLeft;
    }
    
    // Handle border properties
    if (styles.borderLeft !== undefined || styles.borderRight !== undefined) {
      directionalStyles.borderLeft = styles.borderRight;
      directionalStyles.borderRight = styles.borderLeft;
    }
    
    // Handle position properties
    if (styles.left !== undefined || styles.right !== undefined) {
      directionalStyles.left = styles.right;
      directionalStyles.right = styles.left;
    }
    
    // Handle text alignment
    if (styles.textAlign === 'left') {
      directionalStyles.textAlign = 'right';
    } else if (styles.textAlign === 'right') {
      directionalStyles.textAlign = 'left';
    }
    
    // Handle flex direction
    if (styles.flexDirection === 'row') {
      directionalStyles.flexDirection = 'row-reverse';
    } else if (styles.flexDirection === 'row-reverse') {
      directionalStyles.flexDirection = 'row';
    }
    
    return directionalStyles;
  };

  return {
    isRTL,
    rtlProps,
    getFlexDirection,
    getTextAlign,
    getMargin,
    getPadding,
    getGridDirection,
    getJustifyContent,
    getAlignItems,
    getPosition,
    getTransform,
    getSlideDirection,
    shouldFlipIcon,
    getIconTransform,
    getDirectionalStyles,
  };
};