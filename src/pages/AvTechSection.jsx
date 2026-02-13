import React, { useState, useEffect, useCallback } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import LinearProgress from '@mui/material/LinearProgress';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AutoAwesome from '@mui/icons-material/AutoAwesome';
import Speed from '@mui/icons-material/Speed';
import Security from '@mui/icons-material/Security';
import Analytics from '@mui/icons-material/Analytics';
import Rocket from '@mui/icons-material/Rocket';
import CheckCircle from '@mui/icons-material/CheckCircle';
import ArrowForward from '@mui/icons-material/ArrowForward';
import Code from '@mui/icons-material/Code';
import SmartToy from '@mui/icons-material/SmartToy';
import Engineering from '@mui/icons-material/Engineering';
import Psychology from '@mui/icons-material/Psychology';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useRTL } from '../hooks/useRTL';
import axios from 'axios';

const TOOL_CARD_PADDING = { xs: 2.5, sm: 3, md: 4 };

const ToolCard = React.memo(({ tool, t, isRTL }) => (
  <Card
    sx={{
      width: '100%',
      maxWidth: 640,
      mx: 'auto',
      height: '100%',
      borderRadius: 2,
      background: 'linear-gradient(180deg, rgba(11, 11, 11, 0.9) 0%, rgba(11, 11, 11, 0.75) 100%)',
      border: '1px solid rgba(230, 126, 34, 0.4)',
      boxShadow: '0 12px 28px rgba(230, 126, 34, 0.2)',
      transition: 'all 0.3s ease',
      '&:hover': {
        transform: 'translateY(-6px)',
        borderColor: 'rgba(230, 126, 34, 0.6)',
        boxShadow: '0 16px 32px rgba(230, 126, 34, 0.28)',
      },
    }}
  >
    <CardContent
      sx={{
        p: TOOL_CARD_PADDING,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Box sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2.5, gap: 1.5, flexDirection: isRTL ? 'row-reverse' : 'row' }}>
          <Box sx={{ color: tool.color }}>{tool.icon}</Box>
          <Typography variant="h5">{tool.title}</Typography>
        </Box>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2.5 }}>
          {tool.description}
        </Typography>
        <Box sx={{ mb: 2.5, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {tool.features.map((feature, idx) => (
            <Chip
              key={idx}
              label={feature}
              size="small"
              sx={{
                backgroundColor: 'rgba(230, 126, 34, 0.2)',
                color: tool.color,
                border: '1px solid rgba(230, 126, 34, 0.5)',
              }}
            />
          ))}
        </Box>
      </Box>
      <Box sx={{ mt: 1.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <LinearProgress
            variant="determinate"
            value={tool.progress}
            sx={{
              flexGrow: 1,
              height: 8,
              borderRadius: 4,
              backgroundColor: 'rgba(11, 11, 11, 0.1)',
              '& .MuiLinearProgress-bar': {
                backgroundColor: tool.color,
              },
            }}
          />
          <Typography variant="body2" sx={{ minWidth: 40 }}>
            {tool.progress}%
          </Typography>
        </Box>
        <Button
          fullWidth
          variant="contained"
          endIcon={isRTL ? undefined : <ArrowForward />}
          startIcon={isRTL ? <ArrowForward /> : undefined}
        >
          {t('avtech.cta.button')}
        </Button>
      </Box>
    </CardContent>
  </Card>
));

const AvTechSection = () => {
  const { t } = useTranslation();
  const { isRTL } = useRTL();
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchContent = useCallback(async () => {
    try {
      const response = await axios.get('/api/content/avtech');
      const contentData = {};
      response.data.forEach(item => {
        contentData[item.type] = item;
      });
      setContent(contentData);
    } catch (error) {
      setContent({
        hero: {
          title: t('avtech.hero.title'),
          subtitle: t('avtech.hero.subtitle'),
          content: t('avtech.hero.description')
        }
      });
    } finally {
      setLoading(false);
    }
  }, [t]);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  const aiTools = [
    {
      title: t('avtech.tools.flightPlanning.title'),
      description: t('avtech.tools.flightPlanning.description'),
      icon: <Rocket />,
      features: [
        t('avtech.tools.flightPlanning.features.routeOptimization'),
        t('avtech.tools.flightPlanning.features.weatherIntegration'),
        t('avtech.tools.flightPlanning.features.fuelEfficiency'),
        t('avtech.tools.flightPlanning.features.realTimeUpdates')
      ],
      color: 'rgb(230, 126, 34)',
      progress: 95
    },
    {
      title: t('avtech.tools.maintenancePredictor.title'),
      description: t('avtech.tools.maintenancePredictor.description'),
      icon: <Engineering />,
      features: [
        t('avtech.tools.maintenancePredictor.features.predictiveAnalytics'),
        t('avtech.tools.maintenancePredictor.features.costReduction'),
        t('avtech.tools.maintenancePredictor.features.safetyEnhancement'),
        t('avtech.tools.maintenancePredictor.features.automatedAlerts')
      ],
      color: 'rgb(230, 126, 34)',
      progress: 88
    },
    {
      title: t('avtech.tools.safetyAnalytics.title'),
      description: t('avtech.tools.safetyAnalytics.description'),
      icon: <Security />,
      features: [
        t('avtech.tools.safetyAnalytics.features.riskAssessment'),
        t('avtech.tools.safetyAnalytics.features.incidentAnalysis'),
        t('avtech.tools.safetyAnalytics.features.safetyScoring'),
        t('avtech.tools.safetyAnalytics.features.complianceTracking')
      ],
      color: 'rgb(230, 126, 34)',
      progress: 92
    },
    {
      title: t('avtech.tools.operationsDashboard.title'),
      description: t('avtech.tools.operationsDashboard.description'),
      icon: <Analytics />,
      features: [
        t('avtech.tools.operationsDashboard.features.realTimeMonitoring'),
        t('avtech.tools.operationsDashboard.features.performanceMetrics'),
        t('avtech.tools.operationsDashboard.features.customReports'),
        t('avtech.tools.operationsDashboard.features.dataVisualization')
      ],
      color: 'rgb(230, 126, 34)',
      progress: 90
    }
  ];

  const useCases = [
    {
      title: t('avtech.useCases.designCreativity.title'),
      description: t('avtech.useCases.designCreativity.description'),
      icon: <AutoAwesome />,
      examples: [
        t('avtech.useCases.designCreativity.examples.liveryDesign'),
        t('avtech.useCases.designCreativity.examples.interiorLayout'),
        t('avtech.useCases.designCreativity.examples.marketingMaterial'),
        t('avtech.useCases.designCreativity.examples.technicalDocumentation')
      ]
    },
    {
      title: t('avtech.useCases.analysisInsights.title'),
      description: t('avtech.useCases.analysisInsights.description'),
      icon: <Analytics />,
      examples: [
        t('avtech.useCases.analysisInsights.examples.performanceTrends'),
        t('avtech.useCases.analysisInsights.examples.marketResearch'),
        t('avtech.useCases.analysisInsights.examples.competitiveIntelligence'),
        t('avtech.useCases.analysisInsights.examples.financialForecasting')
      ]
    },
    {
      title: t('avtech.useCases.problemSolving.title'),
      description: t('avtech.useCases.problemSolving.description'),
      icon: <SmartToy />,
      examples: [
        t('avtech.useCases.problemSolving.examples.technicalDiagnosis'),
        t('avtech.useCases.problemSolving.examples.maintenanceScheduling'),
        t('avtech.useCases.problemSolving.examples.resourceAllocation'),
        t('avtech.useCases.problemSolving.examples.emergencyResponse')
      ]
    },
    {
      title: t('avtech.useCases.automation.title'),
      description: t('avtech.useCases.automation.description'),
      icon: <Speed />,
      examples: [
        t('avtech.useCases.automation.examples.documentProcessing'),
        t('avtech.useCases.automation.examples.complianceChecking'),
        t('avtech.useCases.automation.examples.inventoryManagement'),
        t('avtech.useCases.automation.examples.qualityAssurance')
      ]
    }
  ];

  const promptEngineering = {
    title: t('avtech.promptEngineering.title'),
    description: t('avtech.promptEngineering.description'),
    benefits: [
      t('avtech.promptEngineering.benefits.productivity'),
      t('avtech.promptEngineering.benefits.manualWork'),
      t('avtech.promptEngineering.benefits.accuracy'),
      t('avtech.promptEngineering.benefits.decisionMaking')
    ],
    examples: [
      {
        category: t('avtech.promptEngineering.examples.flightOperations.category'),
        prompt: t('avtech.promptEngineering.examples.flightOperations.prompt')
      },
      {
        category: t('avtech.promptEngineering.examples.maintenance.category'),
        prompt: t('avtech.promptEngineering.examples.maintenance.prompt')
      },
      {
        category: t('avtech.promptEngineering.examples.safety.category'),
        prompt: t('avtech.promptEngineering.examples.safety.prompt')
      }
    ]
  };

  const technologies = [
    { name: t('avtech.technologies.machineLearning'), level: 95, color: 'rgb(230, 126, 34)' },
    { name: t('avtech.technologies.nlp'), level: 88, color: 'rgb(230, 126, 34)' },
    { name: t('avtech.technologies.computerVision'), level: 85, color: 'rgb(230, 126, 34)' },
    { name: t('avtech.technologies.predictiveAnalytics'), level: 92, color: 'rgb(230, 126, 34)' },
    { name: t('avtech.technologies.cloudComputing'), level: 90, color: 'rgb(230, 126, 34)' },
    { name: t('avtech.technologies.iotIntegration'), level: 87, color: 'rgb(230, 126, 34)' }
  ];

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <LinearProgress sx={{ width: '50%' }} />
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default', direction: isRTL ? 'rtl' : 'ltr' }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, rgb(11, 11, 11) 0%, rgb(11, 11, 11) 50%, rgb(11, 11, 11) 100%)',
          minHeight: '60vh',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Box sx={{ textAlign: 'center', mb: 6 }}>
              <Psychology sx={{ fontSize: 80, color: 'rgb(230, 126, 34)', mb: 3 }} />
              <Typography
                variant="h1"
                sx={{
                  mb: 2,
                  background: 'linear-gradient(45deg, rgb(245, 243, 238) 30%, rgb(245, 243, 238) 90%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {content.hero?.title || t('avtech.hero.title')}
              </Typography>
              <Typography variant="h4" color="text.secondary" sx={{ mb: 4 }}>
                {content.hero?.subtitle || t('avtech.hero.subtitle')}
              </Typography>
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{ maxWidth: 800, mx: 'auto', lineHeight: 1.6 }}
              >
                {content.hero?.content}
              </Typography>
            </Box>
          </motion.div>
        </Container>
      </Box>

      {/* AI Tools Section */}
      <Container maxWidth="xl" sx={{ py: { xs: 8, md: 10 }, px: { xs: 2, sm: 3, md: 4 } }}>
        <Typography variant="h3" align="center" sx={{ mb: 6 }}>
          {t('avtech.aiPoweredTools')}
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: { xs: 3, md: 4 },
            maxWidth: 1200,
            mx: 'auto',
          }}
        >
          {aiTools.map((tool, index) => (
            <Box
              key={tool.title}
              component={motion.div}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              sx={{ display: 'flex' }}
            >
              <ToolCard tool={tool} t={t} isRTL={isRTL} />
            </Box>
          ))}
        </Box>
      </Container>

      {/* Use Cases Section */}
      <Box sx={{ backgroundColor: 'rgba(230, 126, 34, 0.05)', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" align="center" sx={{ mb: 6 }}>
            {t('avtech.aiUseCases')}
          </Typography>
          <Grid container spacing={4}>
            {useCases.map((useCase, index) => (
              <Grid item xs={12} md={6} key={useCase.title}>
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                >
                  <Card sx={{ height: '100%' }}>
                    <CardContent sx={{ p: 4 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                        <Box sx={{ color: 'rgb(230, 126, 34)', mr: 2 }}>
                          {useCase.icon}
                        </Box>
                        <Typography variant="h5">
                          {useCase.title}
                        </Typography>
                      </Box>
                      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                        {useCase.description}
                      </Typography>
                      <List dense>
                        {useCase.examples.map((example, idx) => (
                          <ListItem key={idx} sx={{ px: 0 }}>
                            <ListItemIcon sx={{ minWidth: 32 }}>
                              <CheckCircle sx={{ fontSize: 16, color: 'rgb(230, 126, 34)' }} />
                            </ListItemIcon>
                            <ListItemText
                              primary={example}
                              primaryTypographyProps={{
                                variant: 'body2',
                                color: 'text.secondary'
                              }}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Prompt Engineering Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography variant="h3" align="center" sx={{ mb: 2 }}>
            {promptEngineering.title}
          </Typography>
          <Typography
            variant="h6"
            align="center"
            color="text.secondary"
            sx={{ mb: 6, maxWidth: 800, mx: 'auto' }}
          >
            {promptEngineering.description}
          </Typography>
        </motion.div>

        <Grid container spacing={6}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" sx={{ mb: 3 }}>
                  {t('avtech.promptEngineering.benefitsTitle')}
                </Typography>
                <List>
                  {promptEngineering.benefits.map((benefit, index) => (
                    <ListItem key={index} sx={{ px: 0 }}>
                      <ListItemIcon>
                        <CheckCircle sx={{ color: 'rgb(230, 126, 34)' }} />
                      </ListItemIcon>
                      <ListItemText
                        primary={benefit}
                        primaryTypographyProps={{ variant: 'body1' }}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" sx={{ mb: 3 }}>
                  {t('avtech.promptEngineering.examplesTitle')}
                </Typography>
                {promptEngineering.examples.map((example, index) => (
                  <Paper
                    key={index}
                    sx={{
                      p: 3,
                      mb: 2,
                      backgroundColor: 'rgba(230, 126, 34, 0.05)',
                      border: '1px solid rgba(230, 126, 34, 0.2)',
                    }}
                  >
                    <Typography variant="subtitle2" color="primary" sx={{ mb: 1 }}>
                      {example.category}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      "{example.prompt}"
                    </Typography>
                  </Paper>
                ))}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Technologies Section */}
      <Box sx={{ backgroundColor: 'rgba(11, 11, 11, 0.02)', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" align="center" sx={{ mb: 6 }}>
            {t('avtech.coreTechnologies')}
          </Typography>
          <Grid container spacing={4}>
            {technologies.map((tech, index) => (
              <Grid item xs={12} md={6} key={tech.name}>
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Box sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="h6">{tech.name}</Typography>
                      <Typography variant="body2">{tech.level}%</Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={tech.level}
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        backgroundColor: 'rgba(11, 11, 11, 0.1)',
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: tech.color,
                        },
                      }}
                    />
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Paper
            sx={{
              p: 6,
              textAlign: 'center',
              background: 'linear-gradient(135deg, rgb(230, 126, 34) 0%, rgb(230, 126, 34) 100%)',
              color: 'rgb(245, 243, 238)',
            }}
          >
            <Code sx={{ fontSize: 60, mb: 3 }} />
            <Typography variant="h3" sx={{ mb: 2 }}>
              {t('avtech.cta.title')}
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
              {t('avtech.cta.subtitle')}
            </Typography>
            <Button
              variant="contained"
              size="large"
              endIcon={<ArrowForward />}
              sx={{
                backgroundColor: 'rgb(11, 11, 11)',
                color: 'rgb(245, 243, 238)',
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                '&:hover': {
                  backgroundColor: 'rgba(11, 11, 11, 0.9)',
                },
              }}
            >
              {t('avtech.cta.button')}
            </Button>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default AvTechSection;
