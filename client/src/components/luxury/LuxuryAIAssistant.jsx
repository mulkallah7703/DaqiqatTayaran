import React, { useState, useRef, useEffect } from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import Chip from '@mui/material/Chip';
import Slide from '@mui/material/Slide';
import SmartToy from '@mui/icons-material/SmartToy';
import Close from '@mui/icons-material/Close';
import Send from '@mui/icons-material/Send';
import Person from '@mui/icons-material/Person';
import Android from '@mui/icons-material/Android';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useRTL } from '../../hooks/useRTL';
import axios from 'axios';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const LuxuryAIAssistant = () => {
  const { t } = useTranslation();
  const { isRTL } = useRTL();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: t('aiAssistant.welcomeMessage'),
      sender: 'ai',
      timestamp: new Date(),
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const quickQuestions = [
    t('aiAssistant.quickQuestions.capabilities'),
    t('aiAssistant.quickQuestions.solutions'),
    t('aiAssistant.quickQuestions.partnerships'),
    t('aiAssistant.quickQuestions.transformation'),
    t('aiAssistant.quickQuestions.vision2030'),
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (message = inputMessage) => {
    if (!message.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: message,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    setIsTyping(true);

    try {
      const response = await axios.post('/api/ai/chat', {
        message: message,
        context: `Aviation AI Platform - Executive Level Assistant. Current page: ${window.location.pathname}`,
      });

      // Simulate typing delay for premium feel
      setTimeout(() => {
        const aiMessage = {
          id: Date.now() + 1,
          text: response.data.response,
          sender: 'ai',
          timestamp: new Date(),
        };

        setMessages(prev => [...prev, aiMessage]);
        setIsTyping(false);
      }, 1500);
    } catch (error) {
      setTimeout(() => {
        const errorMessage = {
          id: Date.now() + 1,
          text: "I apologize for the temporary service interruption. Our AI systems are currently being optimized. Please try again shortly, or contact our executive support team for immediate assistance.",
          sender: 'ai',
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, errorMessage]);
        setIsTyping(false);
      }, 1500);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {/* Floating AI Button - RTL Positioned */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          delay: 2, 
          type: 'spring', 
          stiffness: 260, 
          damping: 20 
        }}
        style={{
          position: 'fixed',
          bottom: 32,
          right: isRTL ? 'auto' : 32,
          left: isRTL ? 32 : 'auto',
          zIndex: 1300,
        }}
      >
        <Fab
          onClick={() => setOpen(true)}
          sx={{
            width: 72,
            height: 72,
            background: 'linear-gradient(135deg, rgb(230, 126, 34) 0%, rgb(230, 126, 34) 100%)',
            color: 'rgb(245, 243, 238)',
            boxShadow: '0 12px 32px rgba(230, 126, 34, 0.4), 0 0 0 1px rgba(230, 126, 34, 0.2)',
            '&:hover': {
              background: 'linear-gradient(135deg, rgb(230, 126, 34) 0%, rgb(230, 126, 34) 100%)',
              transform: 'scale(1.1)',
              boxShadow: '0 16px 40px rgba(230, 126, 34, 0.5), 0 0 0 1px rgba(230, 126, 34, 0.3)',
            },
            '&::before': {
              content: '""',
              position: 'absolute',
              top: -2,
              left: -2,
              right: -2,
              bottom: -2,
              background: 'linear-gradient(45deg, rgb(230, 126, 34), rgb(230, 126, 34), rgb(230, 126, 34))',
              borderRadius: '50%',
              zIndex: -1,
              animation: 'rotate 3s linear infinite',
              '@keyframes rotate': {
                '0%': { transform: 'rotate(0deg)' },
                '100%': { transform: 'rotate(360deg)' },
              },
            },
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          <SmartToy sx={{ fontSize: 36 }} />
        </Fab>

        {/* Pulsing indicator - RTL positioned */}
        <Box
          sx={{
            position: 'absolute',
            top: 8,
            right: isRTL ? 'auto' : 8,
            left: isRTL ? 8 : 'auto',
            width: 16,
            height: 16,
            borderRadius: '50%',
            background: 'rgb(230, 126, 34)',
            animation: 'pulse 2s infinite',
            '@keyframes pulse': {
              '0%, 100%': { opacity: 1, transform: 'scale(1)' },
              '50%': { opacity: 0.7, transform: 'scale(1.2)' },
            },
          }}
        />
      </motion.div>

      {/* AI Assistant Dialog */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        TransitionComponent={Transition}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            height: '85vh',
            background: 'linear-gradient(145deg, rgba(11, 11, 11, 0.95) 0%, rgba(11, 11, 11, 0.95) 100%)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(230, 126, 34, 0.2)',
            borderRadius: 4,
            boxShadow: '0 32px 64px rgba(11, 11, 11, 0.5)',
            direction: isRTL ? 'rtl' : 'ltr',
          },
        }}
      >
        {/* Header */}
        <Box
          sx={{
            p: 3,
            borderBottom: '1px solid rgba(230, 126, 34, 0.1)',
            background: 'linear-gradient(135deg, rgba(230, 126, 34, 0.1) 0%, rgba(230, 126, 34, 0.1) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 2,
            flexDirection: isRTL ? 'row-reverse' : 'row',
          }}>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, rgb(230, 126, 34) 0%, rgb(230, 126, 34) 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'rgb(245, 243, 238)',
              }}
            >
              <SmartToy sx={{ fontSize: 24 }} />
            </Box>
            <Box>
              <Typography variant="h6" sx={{ 
                fontWeight: 600,
                textAlign: isRTL ? 'right' : 'left',
              }}>
                {t('aiAssistant.title')}
              </Typography>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1,
                flexDirection: isRTL ? 'row-reverse' : 'row',
                justifyContent: isRTL ? 'flex-end' : 'flex-start',
              }}>
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: 'rgb(230, 126, 34)',
                    animation: 'pulse 2s infinite',
                  }}
                />
                <Typography variant="body2" sx={{ 
                  color: 'rgb(245, 243, 238)',
                  textAlign: isRTL ? 'right' : 'left',
                }}>
                  {t('aiAssistant.status')}
                </Typography>
              </Box>
            </Box>
          </Box>
          <IconButton 
            onClick={() => setOpen(false)}
            sx={{ 
              color: 'rgb(245, 243, 238)',
              '&:hover': { 
                color: 'rgb(230, 126, 34)',
                background: 'rgba(230, 126, 34, 0.1)',
              },
            }}
          >
            <Close />
          </IconButton>
        </Box>

        <DialogContent sx={{ p: 0, display: 'flex', flexDirection: 'column', height: '100%' }}>
          {/* Messages Area */}
          <Box
            sx={{
              flexGrow: 1,
              overflowY: 'auto',
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              gap: 3,
            }}
          >
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: message.sender === 'user' 
                        ? (isRTL ? 'flex-start' : 'flex-end')
                        : (isRTL ? 'flex-end' : 'flex-start'),
                      mb: 2,
                    }}
                  >
                    <Paper
                      sx={{
                        p: 3,
                        maxWidth: '80%',
                        background: message.sender === 'user' 
                          ? 'linear-gradient(135deg, rgb(230, 126, 34) 0%, rgb(230, 126, 34) 100%)'
                          : 'linear-gradient(145deg, rgba(11, 11, 11, 0.8) 0%, rgba(11, 11, 11, 0.6) 100%)',
                        color: 'rgb(245, 243, 238)',
                        borderRadius: message.sender === 'user' 
                          ? (isRTL ? '8px 24px 24px 24px' : '24px 24px 8px 24px')
                          : (isRTL ? '24px 8px 24px 24px' : '24px 24px 24px 8px'),
                        border: message.sender === 'ai' ? '1px solid rgba(230, 126, 34, 0.1)' : 'none',
                        boxShadow: message.sender === 'user'
                          ? '0 8px 32px rgba(230, 126, 34, 0.3)'
                          : '0 8px 32px rgba(11, 11, 11, 0.2)',
                      }}
                    >
                      <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'flex-start', 
                        gap: 2,
                        flexDirection: isRTL ? 'row-reverse' : 'row',
                      }}>
                        {message.sender === 'ai' && (
                          <Android sx={{ 
                            fontSize: 20, 
                            mt: 0.5, 
                            color: 'rgb(230, 126, 34)',
                            flexShrink: 0,
                          }} />
                        )}
                        {message.sender === 'user' && (
                          <Person sx={{ 
                            fontSize: 20, 
                            mt: 0.5,
                            flexShrink: 0,
                          }} />
                        )}
                        <Box sx={{ flexGrow: 1 }}>
                          <Typography 
                            variant="body1" 
                            sx={{ 
                              whiteSpace: 'pre-wrap',
                              lineHeight: 1.6,
                            }}
                          >
                            {message.text}
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{
                              opacity: 0.7,
                              display: 'block',
                              mt: 1,
                              textAlign: message.sender === 'user' 
                                ? (isRTL ? 'left' : 'right')
                                : (isRTL ? 'right' : 'left'),
                            }}
                          >
                            {formatTime(message.timestamp)}
                          </Typography>
                        </Box>
                      </Box>
                    </Paper>
                  </Box>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Typing Indicator */}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: isRTL ? 'flex-end' : 'flex-start', 
                  mb: 2 
                }}>
                  <Paper
                    sx={{
                      p: 3,
                      background: 'linear-gradient(145deg, rgba(11, 11, 11, 0.8) 0%, rgba(11, 11, 11, 0.6) 100%)',
                      border: '1px solid rgba(230, 126, 34, 0.1)',
                      borderRadius: isRTL ? '8px 24px 24px 24px' : '24px 24px 24px 8px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      flexDirection: isRTL ? 'row-reverse' : 'row',
                    }}
                  >
                    <Android sx={{ fontSize: 20, color: 'rgb(230, 126, 34)' }} />
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      {[0, 1, 2].map((i) => (
                        <Box
                          key={i}
                          sx={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            background: 'rgb(230, 126, 34)',
                            animation: `typing 1.4s infinite ${i * 0.2}s`,
                            '@keyframes typing': {
                              '0%, 60%, 100%': { opacity: 0.3, transform: 'scale(1)' },
                              '30%': { opacity: 1, transform: 'scale(1.2)' },
                            },
                          }}
                        />
                      ))}
                    </Box>
                    <Typography variant="body2" sx={{ 
                      color: 'rgb(245, 243, 238)',
                      textAlign: isRTL ? 'right' : 'left',
                    }}>
                      {t('aiAssistant.analyzing')}
                    </Typography>
                  </Paper>
                </Box>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </Box>

          {/* Quick Questions */}
          {messages.length === 1 && (
            <Box sx={{ 
              p: 3, 
              borderTop: '1px solid rgba(230, 126, 34, 0.1)',
              direction: isRTL ? 'rtl' : 'ltr',
            }}>
              <Typography variant="body2" sx={{ 
                color: 'rgb(245, 243, 238)', 
                mb: 2,
                textAlign: isRTL ? 'right' : 'left',
              }}>
                {t('aiAssistant.quickAccess')}
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {quickQuestions.map((question, index) => (
                  <Chip
                    key={index}
                    label={question}
                    variant="outlined"
                    size="small"
                    onClick={() => handleSendMessage(question)}
                    sx={{
                      borderColor: 'rgba(230, 126, 34, 0.3)',
                      color: 'rgb(230, 126, 34)',
                      '&:hover': {
                        backgroundColor: 'rgba(230, 126, 34, 0.1)',
                        borderColor: 'rgba(230, 126, 34, 0.5)',
                      },
                    }}
                  />
                ))}
              </Box>
            </Box>
          )}

          {/* Input Area */}
          <Box
            sx={{
              p: 3,
              borderTop: '1px solid rgba(230, 126, 34, 0.1)',
              background: 'linear-gradient(135deg, rgba(230, 126, 34, 0.05) 0%, rgba(230, 126, 34, 0.05) 100%)',
              direction: isRTL ? 'rtl' : 'ltr',
            }}
          >
            <Box sx={{ 
              display: 'flex', 
              gap: 2, 
              alignItems: 'flex-end',
              flexDirection: isRTL ? 'row-reverse' : 'row',
            }}>
              <TextField
                fullWidth
                multiline
                maxRows={3}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={t('aiAssistant.placeholder')}
                variant="outlined"
                disabled={isLoading}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 3,
                    background: 'rgba(11, 11, 11, 0.8)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(230, 126, 34, 0.2)',
                    '&:hover': {
                      border: '1px solid rgba(230, 126, 34, 0.4)',
                    },
                    '&.Mui-focused': {
                      border: '1px solid rgba(230, 126, 34, 0.6)',
                    },
                  },
                  '& .MuiOutlinedInput-input': {
                    color: 'rgb(245, 243, 238)',
                  },
                }}
              />
              <IconButton
                onClick={() => handleSendMessage()}
                disabled={!inputMessage.trim() || isLoading}
                sx={{
                  width: 48,
                  height: 48,
                  background: 'linear-gradient(135deg, rgb(230, 126, 34) 0%, rgb(230, 126, 34) 100%)',
                  color: 'rgb(245, 243, 238)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, rgb(230, 126, 34) 0%, rgb(230, 126, 34) 100%)',
                    transform: 'scale(1.05)',
                  },
                  '&:disabled': {
                    background: 'rgba(230, 126, 34, 0.3)',
                    color: 'rgba(245, 243, 238, 0.5)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                {isLoading ? <CircularProgress size={20} sx={{ color: 'rgb(245, 243, 238)' }} /> : <Send />}
              </IconButton>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default React.memo(LuxuryAIAssistant);
