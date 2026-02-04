import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  IconButton,
  Typography,
  Paper,
  CircularProgress,
  Chip,
} from '@mui/material';
import SmartToy from '@mui/icons-material/SmartToy';
import Close from '@mui/icons-material/Close';
import Send from '@mui/icons-material/Send';
import Person from '@mui/icons-material/Person';
import Android from '@mui/icons-material/Android';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const AIAssistant = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your AI assistant for the Aviation Platform. I can help you with navigation, course recommendations, aviation knowledge, and platform features. How can I assist you today?",
      sender: 'ai',
      timestamp: new Date(),
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const quickQuestions = [
    "How do I enroll in a course?",
    "What AI tools are available?",
    "Tell me about the company",
    "Show me aviation courses",
    "How does the platform work?",
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

    try {
      const response = await axios.post('/api/ai/chat', {
        message: message,
        context: window.location.pathname,
      });

      const aiMessage = {
        id: Date.now() + 1,
        text: response.data.response,
        sender: 'ai',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage = {
        id: Date.now() + 1,
        text: "I'm sorry, I'm currently unavailable. Please try again later or contact support for assistance.",
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
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
      {/* Floating Action Button */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 260, damping: 20 }}
        style={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          zIndex: 1000,
        }}
      >
        <Fab
          color="primary"
          onClick={() => setOpen(true)}
          sx={{
            width: 64,
            height: 64,
            background: 'linear-gradient(45deg, rgb(230, 126, 34) 30%, rgb(230, 126, 34) 90%)',
            '&:hover': {
              background: 'linear-gradient(45deg, rgb(230, 126, 34) 30%, rgb(230, 126, 34) 90%)',
              transform: 'scale(1.1)',
            },
            transition: 'all 0.3s ease',
          }}
        >
          <SmartToy sx={{ fontSize: 32 }} />
        </Fab>
      </motion.div>

      {/* AI Assistant Dialog */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            height: '80vh',
            backgroundColor: 'background.paper',
            border: '1px solid rgba(230, 126, 34, 0.3)',
          },
        }}
      >
        <DialogTitle
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'rgba(230, 126, 34, 0.1)',
            borderBottom: '1px solid rgba(230, 126, 34, 0.3)',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <SmartToy color="primary" />
            <Typography variant="h6">AI Assistant</Typography>
            <Chip
              label="Online"
              size="small"
              color="success"
              sx={{ ml: 1 }}
            />
          </Box>
          <IconButton onClick={() => setOpen(false)}>
            <Close />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ p: 0, display: 'flex', flexDirection: 'column', height: '100%' }}>
          {/* Messages Area */}
          <Box
            sx={{
              flexGrow: 1,
              overflowY: 'auto',
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                      mb: 1,
                    }}
                  >
                    <Paper
                      sx={{
                        p: 2,
                        maxWidth: '80%',
                        backgroundColor: message.sender === 'user' 
                          ? 'primary.main' 
                          : 'rgba(11, 11, 11, 0.05)',
                        color: 'text.primary',
                        borderRadius: message.sender === 'user' 
                          ? '20px 20px 5px 20px' 
                          : '20px 20px 20px 5px',
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                        {message.sender === 'ai' && (
                          <Android sx={{ fontSize: 20, mt: 0.5, color: 'primary.main' }} />
                        )}
                        {message.sender === 'user' && (
                          <Person sx={{ fontSize: 20, mt: 0.5 }} />
                        )}
                        <Box sx={{ flexGrow: 1 }}>
                          <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                            {message.text}
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{
                              opacity: 0.7,
                              display: 'block',
                              mt: 0.5,
                              textAlign: message.sender === 'user' ? 'right' : 'left',
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

            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 1 }}>
                  <Paper
                    sx={{
                      p: 2,
                      backgroundColor: 'rgba(11, 11, 11, 0.05)',
                      borderRadius: '20px 20px 20px 5px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                    }}
                  >
                    <Android sx={{ fontSize: 20, color: 'primary.main' }} />
                    <CircularProgress size={16} />
                    <Typography variant="body2" color="text.secondary">
                      Thinking...
                    </Typography>
                  </Paper>
                </Box>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </Box>

          {/* Quick Questions */}
          {messages.length === 1 && (
            <Box sx={{ p: 2, borderTop: '1px solid rgba(230, 126, 34, 0.1)' }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Quick questions:
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
                      '&:hover': {
                        backgroundColor: 'rgba(230, 126, 34, 0.1)',
                        borderColor: 'primary.main',
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
              p: 2,
              borderTop: '1px solid rgba(230, 126, 34, 0.1)',
              backgroundColor: 'rgba(11, 11, 11, 0.02)',
            }}
          >
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-end' }}>
              <TextField
                fullWidth
                multiline
                maxRows={3}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about the platform..."
                variant="outlined"
                size="small"
                disabled={isLoading}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 3,
                    backgroundColor: 'rgba(11, 11, 11, 0.05)',
                  },
                }}
              />
              <IconButton
                color="primary"
                onClick={() => handleSendMessage()}
                disabled={!inputMessage.trim() || isLoading}
                sx={{
                  backgroundColor: 'primary.main',
                  color: 'rgb(245, 243, 238)',
                  '&:hover': {
                    backgroundColor: 'primary.dark',
                  },
                  '&:disabled': {
                    backgroundColor: 'rgba(230, 126, 34, 0.3)',
                  },
                }}
              >
                <Send />
              </IconButton>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AIAssistant;