import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  LinearProgress,
  Chip,
  Avatar,
  Button,
  Divider,
  Badge,
  alpha,
  useTheme,
  Fade,
  Grow,
  Zoom,
  Tooltip,
  TextField,
  InputAdornment,
  Menu,
  MenuItem,
  Tab,
  Tabs,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  FormControl,
  InputLabel,
  Switch,
  FormControlLabel,
  Slider,
  Snackbar,
  Alert,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction,
  RadioGroup,
  Radio,
  FormControlLabel as MuiFormControlLabel,
  FormLabel
} from '@mui/material';
import {
  SmartToy as AIIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  People as PeopleIcon,
  Devices as DevicesIcon,
  LocalHospital as HospitalIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  Download as DownloadIcon,
  MoreVert as MoreVertIcon,
  Info as InfoIcon,
  Refresh as RefreshIcon,
  Chat as ChatIcon,
  Insights as InsightsIcon,
  NotificationsActive as NotificationsIcon,
  Security as SecurityIcon,
  Timeline as TimelineIcon,
  Assessment as AssessmentIcon,
  Person as PersonIcon,
  BatteryFull as BatteryIcon,
  SignalCellularAlt as SignalIcon,
  Schedule as ScheduleIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Message as MessageIcon,
  AutoGraph as AutoGraphIcon,
  Psychology as PsychologyIcon,
  Close as CloseIcon,
  Add as AddIcon,
  Star as StarIcon,
  History as HistoryIcon,
  Settings as SettingsIcon,
  Science as ScienceIcon,
  PriorityHigh as PriorityHighIcon,
  ArrowDropDown as ArrowDropDownIcon,
  ArrowDropUp as ArrowDropUpIcon,
  Bolt as BoltIcon,
  Analytics as AnalyticsIcon,
  MedicalServices as MedicalServicesIcon,
  Biotech as BiotechIcon,
  ShowChart as ShowChartIcon
} from '@mui/icons-material';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  Legend,
  AreaChart,
  Area,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  RadialBarChart,
  RadialBar
} from 'recharts';

// Enhanced AI color palette with gradients
const AI_COLORS = {
  primary: { 
    bg: 'linear-gradient(135deg, #F0F7FF 0%, #E6F0FF 100%)', 
    border: '#0066CC', 
    text: '#003366',
    light: '#E6F0FF'
  },
  success: { 
    bg: 'linear-gradient(135deg, #F0FFF4 0%, #E6F7ED 100%)', 
    border: '#38A169', 
    text: '#22543D',
    light: '#C6F6D5'
  },
  warning: { 
    bg: 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)', 
    border: '#D69E2E', 
    text: '#744210',
    light: '#FEF3C7'
  },
  danger: { 
    bg: 'linear-gradient(135deg, #FFF5F5 0%, #FED7D7 100%)', 
    border: '#E53E3E', 
    text: '#742A2A',
    light: '#FED7D7'
  },
  info: { 
    bg: 'linear-gradient(135deg, #EBF8FF 0%, #C3EBFF 100%)', 
    border: '#3182CE', 
    text: '#234E52',
    light: '#BEE3F8'
  },
  purple: { 
    bg: 'linear-gradient(135deg, #FAF5FF 0%, #E9D8FD 100%)', 
    border: '#805AD5', 
    text: '#44337A',
    light: '#D6BCFA'
  },
  teal: { 
    bg: 'linear-gradient(135deg, #E6FFFA 0%, #B2F5EA 100%)', 
    border: '#319795', 
    text: '#234E52',
    light: '#81E6D9'
  },
  gray: { 
    bg: 'linear-gradient(135deg, #F7FAFC 0%, #EDF2F7 100%)', 
    border: '#718096', 
    text: '#2D3748',
    light: '#E2E8F0'
  },
  aiBlue: { 
    bg: 'linear-gradient(135deg, #E8F4FD 0%, #C3E4FF 100%)', 
    border: '#2B6CB0', 
    text: '#2C5282',
    light: '#90CDF4'
  },
  aiPurple: { 
    bg: 'linear-gradient(135deg, #F3E8FF 0%, #E9D5FF 100%)', 
    border: '#9F7AEA', 
    text: '#553C9A',
    light: '#D6BCFA'
  },
  aiCyan: {
    bg: 'linear-gradient(135deg, #CFFAFE 0%, #A5F3FC 100%)',
    border: '#0E7490',
    text: '#164E63',
    light: '#67E8F9'
  }
};

// Glass morphism effect
const GLASS_EFFECT = {
  background: 'rgba(255, 255, 255, 0.85)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  boxShadow: '0 8px 32px rgba(31, 38, 135, 0.1)'
};

// Default data structure (unchanged)
const defaultAIData = {
  summary: {
    totalAnalyses: 1248,
    activePatients: 156,
    criticalAlerts: 12,
    riskFlags: 47,
    deviceIssues: 28,
    avgResponseTime: '2.3s',
    accuracyScore: 96.8
  },
  
  aiInsights: [
    {
      id: 1,
      type: 'patient_risk',
      title: 'High Heart Rate Variability Detected',
      patient: 'John D. (Room 304)',
      device: 'Cardiac Monitor #CM-4567',
      timestamp: '5 min ago',
      confidence: 94,
      severity: 'high',
      description: 'Patient showing abnormal HRV patterns indicating possible arrhythmia. Recommend ECG review.',
      actions: ['Review ECG', 'Notify Cardiologist', 'Adjust Monitoring'],
      category: 'cardiac',
      priority: 'P1'
    },
    {
      id: 2,
      type: 'device_health',
      title: 'Battery Performance Degradation',
      device: 'Glucose Monitor #GM-8912',
      patient: 'Sarah M. (Room 215)',
      timestamp: '15 min ago',
      confidence: 88,
      severity: 'medium',
      description: 'Battery drain 40% faster than average. Replace within 24 hours.',
      actions: ['Schedule Replacement', 'Check Calibration'],
      category: 'device',
      priority: 'P2'
    },
    {
      id: 3,
      type: 'data_quality',
      title: 'Signal Interference Detected',
      device: 'BP Monitor #BP-678 (Ward B)',
      timestamp: '30 min ago',
      confidence: 92,
      severity: 'medium',
      description: 'Multiple signal drops detected. Check device placement and WiFi interference.',
      actions: ['Relocate Device', 'Check Network', 'Run Diagnostics'],
      category: 'device',
      priority: 'P2'
    },
    {
      id: 4,
      type: 'clinical_insight',
      title: 'Blood Pressure Trend Analysis',
      patient: 'Robert K. (Room 112)',
      device: 'BP Monitor #BP-345',
      timestamp: '1 hour ago',
      confidence: 96,
      severity: 'low',
      description: 'Systolic pressure trending downward 15% over 48 hours. Consider medication review.',
      actions: ['Review Medication', 'Schedule Check-up'],
      category: 'clinical',
      priority: 'P3'
    },
    {
      id: 5,
      type: 'compliance',
      title: 'FDA Guideline Compliance Alert',
      device: 'Ventilator #V-789 (ICU)',
      timestamp: '2 hours ago',
      confidence: 89,
      severity: 'high',
      description: 'Usage pattern deviation detected from FDA recommended protocols.',
      actions: ['Review Protocol', 'Update Settings', 'Staff Training'],
      category: 'compliance',
      priority: 'P1'
    }
  ],
  
  patientSummaries: [
    {
      id: 1,
      name: 'John D.',
      room: '304',
      status: 'critical',
      devices: ['Cardiac Monitor', 'Pulse Oximeter'],
      lastUpdate: '2 min ago',
      vitalSigns: {
        heartRate: { value: 112, trend: '↑', status: 'warning' },
        bloodPressure: { value: '145/92', trend: '→', status: 'warning' },
        oxygen: { value: 96, trend: '→', status: 'normal' },
        temperature: { value: 37.2, trend: '↑', status: 'normal' }
      },
      riskScore: 78,
      insights: ['High HRV detected', 'Elevated BP trend'],
      aiRecommendations: ['Cardiology consult', 'Continuous monitoring']
    },
    {
      id: 2,
      name: 'Sarah M.',
      room: '215',
      status: 'stable',
      devices: ['Glucose Monitor', 'Insulin Pump'],
      lastUpdate: '5 min ago',
      vitalSigns: {
        glucose: { value: 142, trend: '↓', status: 'improving' },
        heartRate: { value: 82, trend: '→', status: 'normal' },
        bloodPressure: { value: '128/84', trend: '→', status: 'normal' }
      },
      riskScore: 32,
      insights: ['Glucose stabilizing', 'Regular insulin response'],
      aiRecommendations: ['Maintain current regimen', 'Daily check-ins']
    },
    {
      id: 3,
      name: 'Robert K.',
      room: '112',
      status: 'monitoring',
      devices: ['BP Monitor', 'Weight Scale'],
      lastUpdate: '10 min ago',
      vitalSigns: {
        bloodPressure: { value: '118/76', trend: '↓', status: 'improving' },
        weight: { value: 85.2, trend: '→', status: 'normal' },
        heartRate: { value: 78, trend: '→', status: 'normal' }
      },
      riskScore: 24,
      insights: ['BP trending normal', 'Stable vitals'],
      aiRecommendations: ['Continue monitoring', 'Weekly review']
    }
  ],
  
  deviceIntelligence: [
    { device: 'Cardiac Monitor #CM-4567', battery: 87, signal: 92, accuracy: 96, uptime: 99.8, anomalies: 12 },
    { device: 'Glucose Monitor #GM-8912', battery: 42, signal: 88, accuracy: 94, uptime: 99.5, anomalies: 8 },
    { device: 'BP Monitor #BP-678', battery: 91, signal: 95, accuracy: 98, uptime: 99.9, anomalies: 3 },
    { device: 'Ventilator #V-789', battery: 76, signal: 90, accuracy: 97, uptime: 99.7, anomalies: 5 },
    { device: 'Pulse Oximeter #PO-123', battery: 95, signal: 96, accuracy: 99, uptime: 99.9, anomalies: 1 }
  ],
  
  riskAnalysis: [
    { category: 'Cardiac', count: 24, trend: 12, severity: 'high', patients: 18 },
    { category: 'Respiratory', count: 18, trend: 8, severity: 'medium', patients: 12 },
    { category: 'Glucose', count: 32, trend: -5, severity: 'medium', patients: 24 },
    { category: 'Blood Pressure', count: 41, trend: 15, severity: 'high', patients: 31 },
    { category: 'Device Health', count: 28, trend: 3, severity: 'low', patients: 0 },
    { category: 'Medication', count: 15, trend: 6, severity: 'medium', patients: 15 }
  ],
  
  trendData: [
    { hour: '00:00', anomalies: 2, predictions: 12, accuracy: 95 },
    { hour: '04:00', anomalies: 1, predictions: 8, accuracy: 96 },
    { hour: '08:00', anomalies: 5, predictions: 24, accuracy: 94 },
    { hour: '12:00', anomalies: 3, predictions: 31, accuracy: 97 },
    { hour: '16:00', anomalies: 4, predictions: 28, accuracy: 95 },
    { hour: '20:00', anomalies: 2, predictions: 19, accuracy: 96 }
  ],
  
  aiMetrics: {
    totalPredictions: 1248,
    accuracyRate: 96.8,
    falsePositives: 2.3,
    responseTime: '2.3s',
    modelVersion: ' AI v3.2.1',
    trainingData: '5.2M samples'
  },
  
  aiModels: [
    { name: 'Cardiac Risk Model', accuracy: 97.2, lastTrained: '2024-01-15', status: 'active' },
    { name: 'Glucose Prediction', accuracy: 95.8, lastTrained: '2024-01-10', status: 'active' },
    { name: 'BP Trend Analysis', accuracy: 96.5, lastTrained: '2024-01-12', status: 'active' },
    { name: 'Respiratory Alert', accuracy: 94.3, lastTrained: '2024-01-08', status: 'training' },
    { name: 'Device Failure Predict', accuracy: 98.1, lastTrained: '2024-01-18', status: 'active' }
  ]
};

// AI Assistant Component
const AIAssistant = () => {
  const theme = useTheme();
  const [aiData, setAiData] = useState(defaultAIData);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [expandedInsights, setExpandedInsights] = useState({});
  const [filterCategory, setFilterCategory] = useState('all');
  const [aiChatOpen, setAiChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  const [aiSettings, setAiSettings] = useState({
    alertThreshold: 75,
    autoRefresh: true,
    notificationLevel: 'medium'
  });
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
 const loadAIData = () => {
  const savedData = localStorage.getItem('deviceHub_ai_assistant');
  if (savedData) {
    try {
      const parsedData = JSON.parse(savedData);
      setAiData({
        ...defaultAIData,
        ...parsedData,
        // Ensure all arrays are new instances
        aiInsights: parsedData.aiInsights || [...defaultAIData.aiInsights],
        patientSummaries: parsedData.patientSummaries || [...defaultAIData.patientSummaries],
        deviceIntelligence: parsedData.deviceIntelligence || [...defaultAIData.deviceIntelligence],
        riskAnalysis: parsedData.riskAnalysis || [...defaultAIData.riskAnalysis],
        aiModels: parsedData.aiModels || [...defaultAIData.aiModels],
        trendData: parsedData.trendData || [...defaultAIData.trendData]
      });
    } catch (error) {
      console.error('Error parsing AI data:', error);
      // Create mutable copies of default data
      setAiData({
        ...defaultAIData,
        aiInsights: [...defaultAIData.aiInsights],
        patientSummaries: [...defaultAIData.patientSummaries],
        deviceIntelligence: [...defaultAIData.deviceIntelligence],
        riskAnalysis: [...defaultAIData.riskAnalysis],
        aiModels: [...defaultAIData.aiModels],
        trendData: [...defaultAIData.trendData]
      });
    }
  } else {
    // Create mutable copies of default data
    setAiData({
      ...defaultAIData,
      aiInsights: [...defaultAIData.aiInsights],
      patientSummaries: [...defaultAIData.patientSummaries],
      deviceIntelligence: [...defaultAIData.deviceIntelligence],
      riskAnalysis: [...defaultAIData.riskAnalysis],
      aiModels: [...defaultAIData.aiModels],
      trendData: [...defaultAIData.trendData]
    });
  }
  setLoading(false);
};

    loadAIData();
  }, []);

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      const updatedData = {
        ...aiData,
        summary: {
          ...aiData.summary,
          totalAnalyses: aiData.summary.totalAnalyses + Math.floor(Math.random() * 10),
          criticalAlerts: Math.floor(Math.random() * 3) + 10
        },
        lastUpdated: new Date().toISOString()
      };
      
      setAiData(updatedData);
      localStorage.setItem('deviceHub_ai_assistant', JSON.stringify(updatedData));
      setLoading(false);
      
      setSnackbar({
        open: true,
        message: 'AI insights refreshed successfully!',
        severity: 'success'
      });
    }, 1000);
  };

  const handleFilterClick = (event) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = (category) => {
    if (category) {
      setFilterCategory(category);
    }
    setFilterAnchorEl(null);
  };

  const toggleInsightExpansion = (id) => {
    setExpandedInsights(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleAIChatOpen = () => {
    setAiChatOpen(true);
  };

  const handleAIChatClose = () => {
    setAiChatOpen(false);
    setChatMessage('');
  };

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      setSnackbar({
        open: true,
        message: 'Message sent to AI assistant',
        severity: 'info'
      });
      setChatMessage('');
    }
  };

  const handleSettingsChange = (field, value) => {
    setAiSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical':
      case 'high':
        return AI_COLORS.danger;
      case 'medium':
        return AI_COLORS.warning;
      case 'low':
        return AI_COLORS.info;
      default:
        return AI_COLORS.gray;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'critical':
        return AI_COLORS.danger.border;
      case 'warning':
        return AI_COLORS.warning.border;
      case 'normal':
        return AI_COLORS.success.border;
      case 'improving':
        return AI_COLORS.info.border;
      default:
        return AI_COLORS.gray.border;
    }
  };

  const StatusIndicator = ({ status, size = 10, pulse = false }) => (
    <Box
      sx={{
        width: size,
        height: size,
        borderRadius: '50%',
        bgcolor: getStatusColor(status),
        display: 'inline-block',
        mr: 1,
        boxShadow: `0 0 8px ${alpha(getStatusColor(status), 0.5)}`,
        animation: pulse ? 'pulse 2s infinite' : 'none',
        '@keyframes pulse': {
          '0%': { boxShadow: `0 0 0 0 ${alpha(getStatusColor(status), 0.7)}` },
          '70%': { boxShadow: `0 0 0 6px ${alpha(getStatusColor(status), 0)}` },
          '100%': { boxShadow: `0 0 0 0 ${alpha(getStatusColor(status), 0)}` }
        }
      }}
    />
  );

  const renderVitalSign = (label, data) => (
    <Box sx={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between', 
      mb: 1,
      p: 1,
      borderRadius: 1,
      bgcolor: alpha(getStatusColor(data.status), 0.05),
      transition: 'all 0.2s ease',
      '&:hover': {
        bgcolor: alpha(getStatusColor(data.status), 0.1),
        transform: 'translateX(4px)'
      }
    }}>
      <Typography variant="body2" sx={{ color: AI_COLORS.gray.text, fontWeight: 500 }}>
        {label}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography variant="body2" fontWeight="bold" sx={{ 
          color: getStatusColor(data.status),
          minWidth: 50,
          textAlign: 'right'
        }}>
          {data.value}
        </Typography>
        {data.trend && (
          <Box sx={{
            width: 24,
            height: 24,
            borderRadius: '50%',
            bgcolor: data.trend === '↑' ? alpha(AI_COLORS.danger.border, 0.1) : 
                     data.trend === '↓' ? alpha(AI_COLORS.success.border, 0.1) : 
                     alpha(AI_COLORS.gray.border, 0.1),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Typography variant="caption" sx={{ 
              color: data.trend === '↑' ? AI_COLORS.danger.border : 
                     data.trend === '↓' ? AI_COLORS.success.border : 
                     AI_COLORS.gray.border,
              fontWeight: 'bold'
            }}>
              {data.trend}
            </Typography>
          </Box>
        )}
        <StatusIndicator status={data.status} pulse={data.status === 'critical' || data.status === 'warning'} />
      </Box>
    </Box>
  );

  // Filter insights based on selected category
  const filteredInsights = filterCategory === 'all' 
    ? aiData.aiInsights 
    : aiData.aiInsights.filter(insight => insight.category === filterCategory);

  // Tab content renderer
  const renderTabContent = () => {
    switch (activeTab) {
      case 0: // AI Insights
        return (
          <Box>
            {/* AI Insights Panel */}
            <Card 
              elevation={0}
              sx={{ 
                borderRadius: 3, 
                background: AI_COLORS.aiBlue.bg,
                border: `2px solid ${alpha(AI_COLORS.aiBlue.border, 0.3)}`,
                mb: 4,
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: hoveredCard === 'insights' ? 'translateY(-8px)' : 'translateY(0)',
                boxShadow: hoveredCard === 'insights' 
                  ? `0 20px 40px ${alpha(AI_COLORS.aiBlue.border, 0.2)}`
                  : '0 4px 20px rgba(0, 0, 0, 0.05)',
                cursor: 'pointer'
              }}
              onMouseEnter={() => setHoveredCard('insights')}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <CardHeader
                title={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{
                      width: 48,
                      height: 48,
                      borderRadius: '50%',
                      background: `linear-gradient(135deg, ${AI_COLORS.aiBlue.border}, ${AI_COLORS.info.border})`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white'
                    }}>
                      <InsightsIcon fontSize="medium" />
                    </Box>
                    <Box>
                      <Typography variant="h6" sx={{ 
                        color: AI_COLORS.aiBlue.text, 
                        fontWeight: 700,
                        mb: 0.5
                      }}>
                        AI Insights & Recommendations
                      </Typography>
                      <Typography variant="caption" sx={{ 
                        color: alpha(AI_COLORS.aiBlue.text, 0.7),
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1
                      }}>
                        <Badge 
                          badgeContent={filteredInsights.length} 
                          color="error" 
                          sx={{
                            '& .MuiBadge-badge': {
                              bgcolor: AI_COLORS.danger.border,
                              color: 'white',
                              fontWeight: 'bold',
                              boxShadow: `0 0 0 2px ${AI_COLORS.aiBlue.bg}`
                            }
                          }}
                        />
                        Real-time clinical intelligence
                      </Typography>
                    </Box>
                  </Box>
                }
                action={
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<FilterIcon />}
                      onClick={handleFilterClick}
                      sx={{ 
                        borderRadius: 2,
                        borderColor: AI_COLORS.aiBlue.border, 
                        color: AI_COLORS.aiBlue.border,
                        bgcolor: 'white',
                        '&:hover': {
                          borderColor: AI_COLORS.aiBlue.border,
                          bgcolor: alpha(AI_COLORS.aiBlue.border, 0.05)
                        }
                      }}
                    >
                      Filter
                    </Button>
                    <Chip
                      label={`Filter: ${filterCategory === 'all' ? 'All' : filterCategory}`}
                      size="small"
                      onDelete={() => setFilterCategory('all')}
                      deleteIcon={<CloseIcon />}
                      sx={{ 
                        bgcolor: alpha(AI_COLORS.aiBlue.border, 0.1),
                        color: AI_COLORS.aiBlue.border,
                        fontWeight: 500
                      }}
                    />
                  </Box>
                }
              />
              <CardContent>
                <Box sx={{ maxHeight: 500, overflow: 'auto' }}>
                  {filteredInsights.map((insight, index) => {
                    const severityColor = getSeverityColor(insight.severity);
                    const isExpanded = expandedInsights[insight.id];
                    
                    return (
                      <Grow in={true} timeout={500 + index * 100} key={insight.id}>
                        <Card 
                          elevation={0}
                          sx={{ 
                            mb: 2, 
                            borderRadius: 3,
                            background: severityColor.bg,
                            border: `2px solid ${alpha(severityColor.border, 0.3)}`,
                            overflow: 'hidden',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              borderColor: severityColor.border,
                              transform: 'translateX(4px)',
                              boxShadow: `0 8px 24px ${alpha(severityColor.border, 0.15)}`
                            }
                          }}
                        >
                          <Box sx={{ p: 2.5 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
                              <Box sx={{ flex: 1 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5, flexWrap: 'wrap' }}>
                                  <Chip
                                    icon={<BoltIcon sx={{ fontSize: 14 }} />}
                                    label={insight.type.replace('_', ' ').toUpperCase()}
                                    size="small"
                                    sx={{ 
                                      bgcolor: alpha(severityColor.border, 0.15),
                                      color: severityColor.border,
                                      fontWeight: 'bold',
                                      border: `1px solid ${alpha(severityColor.border, 0.3)}`
                                    }}
                                  />
                                  <Chip
                                    icon={<TrendingUpIcon sx={{ fontSize: 14 }} />}
                                    label={`${insight.confidence}% confidence`}
                                    size="small"
                                    variant="outlined"
                                    sx={{ 
                                      borderColor: alpha(severityColor.border, 0.3),
                                      color: severityColor.border,
                                      bgcolor: alpha(severityColor.border, 0.05)
                                    }}
                                  />
                                  <Chip
                                    label={insight.priority}
                                    size="small"
                                    sx={{ 
                                      bgcolor: severityColor.border,
                                      color: 'white',
                                      fontWeight: 'bold',
                                      boxShadow: `0 2px 8px ${alpha(severityColor.border, 0.3)}`
                                    }}
                                  />
                                </Box>
                                <Typography variant="h6" fontWeight="700" sx={{ 
                                  color: severityColor.text,
                                  mb: 1.5,
                                  lineHeight: 1.3
                                }}>
                                  {insight.title}
                                </Typography>
                              </Box>
                              <IconButton 
                                size="small" 
                                onClick={() => toggleInsightExpansion(insight.id)}
                                sx={{ 
                                  color: severityColor.border,
                                  bgcolor: alpha(severityColor.border, 0.1),
                                  '&:hover': {
                                    bgcolor: alpha(severityColor.border, 0.2)
                                  }
                                }}
                              >
                                {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                              </IconButton>
                            </Box>
                            
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                              {insight.patient && (
                                <Chip
                                  icon={<PersonIcon sx={{ fontSize: 14 }} />}
                                  label={insight.patient}
                                  size="small"
                                  variant="outlined"
                                  sx={{ 
                                    borderColor: alpha(severityColor.border, 0.3), 
                                    color: severityColor.text,
                                    bgcolor: alpha(severityColor.border, 0.05)
                                  }}
                                />
                              )}
                              {insight.device && (
                                <Chip
                                  icon={<DevicesIcon sx={{ fontSize: 14 }} />}
                                  label={insight.device}
                                  size="small"
                                  variant="outlined"
                                  sx={{ 
                                    borderColor: alpha(severityColor.border, 0.3), 
                                    color: severityColor.text,
                                    bgcolor: alpha(severityColor.border, 0.05)
                                  }}
                                />
                              )}
                              <Typography variant="caption" sx={{ 
                                color: alpha(severityColor.text, 0.7), 
                                ml: 'auto',
                                bgcolor: alpha(severityColor.border, 0.05),
                                px: 1.5,
                                py: 0.5,
                                borderRadius: 1,
                                fontWeight: 500
                              }}>
                                {insight.timestamp}
                              </Typography>
                            </Box>

                            {isExpanded && (
                              <Fade in={isExpanded}>
                                <Box sx={{ mt: 2 }}>
                                  <Box sx={{
                                    p: 2.5,
                                    borderRadius: 2,
                                    bgcolor: alpha(severityColor.border, 0.05),
                                    border: `1px solid ${alpha(severityColor.border, 0.1)}`,
                                    mb: 2.5
                                  }}>
                                    <Typography variant="body1" sx={{ 
                                      color: severityColor.text,
                                      mb: 0,
                                      lineHeight: 1.6
                                    }}>
                                      {insight.description}
                                    </Typography>
                                  </Box>
                                  
                                  <Divider sx={{ 
                                    my: 2.5, 
                                    borderColor: alpha(severityColor.border, 0.2),
                                    borderStyle: 'dashed'
                                  }} />
                                  
                                  <Typography variant="subtitle2" fontWeight="600" sx={{ 
                                    color: severityColor.text, 
                                    mb: 1.5,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1
                                  }}>
                                    <BoltIcon fontSize="small" />
                                    Recommended Actions:
                                  </Typography>
                                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                                    {insight.actions.map((action, actionIndex) => (
                                      <Chip
                                        key={actionIndex}
                                        label={action}
                                        size="small"
                                        sx={{ 
                                          bgcolor: alpha(severityColor.border, 0.15),
                                          color: severityColor.border,
                                          border: `1px solid ${alpha(severityColor.border, 0.3)}`,
                                          fontWeight: 500,
                                          '&:hover': {
                                            bgcolor: alpha(severityColor.border, 0.25)
                                          }
                                        }}
                                      />
                                    ))}
                                  </Box>
                                  
                                  <Box sx={{ display: 'flex', gap: 2 }}>
                                    <Button
                                      variant="contained"
                                      size="small"
                                      startIcon={<CheckCircleIcon />}
                                      sx={{ 
                                        borderRadius: 2,
                                        bgcolor: severityColor.border,
                                        boxShadow: `0 4px 12px ${alpha(severityColor.border, 0.3)}`,
                                        '&:hover': {
                                          bgcolor: alpha(severityColor.border, 0.9),
                                          transform: 'translateY(-2px)',
                                          boxShadow: `0 6px 16px ${alpha(severityColor.border, 0.4)}`
                                        },
                                        transition: 'all 0.3s ease'
                                      }}
                                    >
                                      Mark as Resolved
                                    </Button>
                                    <Button
                                      variant="outlined"
                                      size="small"
                                      sx={{ 
                                        borderRadius: 2,
                                        borderColor: alpha(severityColor.border, 0.3),
                                        color: severityColor.text,
                                        '&:hover': {
                                          borderColor: severityColor.border,
                                          bgcolor: alpha(severityColor.border, 0.05)
                                        }
                                      }}
                                    >
                                      View Details
                                    </Button>
                                  </Box>
                                </Box>
                              </Fade>
                            )}
                          </Box>
                        </Card>
                      </Grow>
                    );
                  })}
                </Box>
              </CardContent>
            </Card>

            {/* AI Models Performance */}
            <Card 
              elevation={0}
              sx={{ 
                borderRadius: 3, 
                background: AI_COLORS.teal.bg,
                border: `2px solid ${alpha(AI_COLORS.teal.border, 0.3)}`,
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: hoveredCard === 'models' ? 'translateY(-8px)' : 'translateY(0)',
                boxShadow: hoveredCard === 'models' 
                  ? `0 20px 40px ${alpha(AI_COLORS.teal.border, 0.2)}`
                  : '0 4px 20px rgba(0, 0, 0, 0.05)',
                cursor: 'pointer'
              }}
              onMouseEnter={() => setHoveredCard('models')}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <CardHeader
                title={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{
                      width: 48,
                      height: 48,
                      borderRadius: '50%',
                      background: `linear-gradient(135deg, ${AI_COLORS.teal.border}, ${AI_COLORS.aiCyan.border})`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white'
                    }}>
                      <ScienceIcon fontSize="medium" />
                    </Box>
                    <Box>
                      <Typography variant="h6" sx={{ 
                        color: AI_COLORS.teal.text, 
                        fontWeight: 700,
                        mb: 0.5
                      }}>
                        AI Models Performance
                      </Typography>
                      <Typography variant="caption" sx={{ 
                        color: alpha(AI_COLORS.teal.text, 0.7),
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1
                      }}>
                        <BiotechIcon fontSize="small" />
                        {aiData.aiModels.length} active machine learning models
                      </Typography>
                    </Box>
                  </Box>
                }
                action={
                  <IconButton sx={{ color: AI_COLORS.teal.border }}>
                    <MoreVertIcon />
                  </IconButton>
                }
              />
              <CardContent>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                  {aiData.aiModels.map((model, index) => (
                    <Grow in={true} timeout={500 + index * 100} key={index}>
                      <Card 
                        elevation={0}
                        sx={{ 
                          flex: '1 1 220px', 
                          p: 3,
                          borderRadius: 3,
                          background: model.status === 'active' 
                            ? `linear-gradient(135deg, ${AI_COLORS.success.bg}, ${alpha(AI_COLORS.success.border, 0.1)})`
                            : `linear-gradient(135deg, ${AI_COLORS.warning.bg}, ${alpha(AI_COLORS.warning.border, 0.1)})`,
                          border: `2px solid ${
                            model.status === 'active' 
                              ? alpha(AI_COLORS.success.border, 0.3)
                              : alpha(AI_COLORS.warning.border, 0.3)
                          }`,
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'translateY(-4px)',
                            boxShadow: `0 12px 28px ${
                              model.status === 'active'
                                ? alpha(AI_COLORS.success.border, 0.2)
                                : alpha(AI_COLORS.warning.border, 0.2)
                            }`
                          }
                        }}
                      >
                        <Typography variant="subtitle2" sx={{ 
                          color: model.status === 'active' ? AI_COLORS.success.text : AI_COLORS.warning.text,
                          mb: 2,
                          fontWeight: 600,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1
                        }}>
                          <MedicalServicesIcon fontSize="small" />
                          {model.name}
                        </Typography>
                        
                        <Box sx={{ mb: 2 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                            <Typography variant="caption" sx={{ 
                              color: alpha(model.status === 'active' ? AI_COLORS.success.text : AI_COLORS.warning.text, 0.7)
                            }}>
                              Accuracy Score
                            </Typography>
                            <Typography variant="body2" fontWeight="bold" sx={{ 
                              color: model.status === 'active' ? AI_COLORS.success.text : AI_COLORS.warning.text
                            }}>
                              {model.accuracy}%
                            </Typography>
                          </Box>
                          <LinearProgress 
                            variant="determinate" 
                            value={model.accuracy}
                            sx={{ 
                              height: 8, 
                              borderRadius: 4,
                              bgcolor: alpha(model.status === 'active' ? AI_COLORS.success.border : AI_COLORS.warning.border, 0.1),
                              '& .MuiLinearProgress-bar': {
                                background: `linear-gradient(90deg, ${
                                  model.status === 'active' ? AI_COLORS.success.border : AI_COLORS.warning.border
                                }, ${
                                  model.status === 'active' ? alpha(AI_COLORS.success.border, 0.7) : alpha(AI_COLORS.warning.border, 0.7)
                                })`,
                                borderRadius: 4
                              }
                            }}
                          />
                        </Box>
                        
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Chip
                            label={model.status}
                            size="small"
                            sx={{ 
                              bgcolor: model.status === 'active' 
                                ? alpha(AI_COLORS.success.border, 0.2)
                                : alpha(AI_COLORS.warning.border, 0.2),
                              color: model.status === 'active' 
                                ? AI_COLORS.success.border
                                : AI_COLORS.warning.border,
                              fontWeight: 'bold',
                              border: `1px solid ${
                                model.status === 'active'
                                  ? alpha(AI_COLORS.success.border, 0.3)
                                  : alpha(AI_COLORS.warning.border, 0.3)
                              }`
                            }}
                          />
                          <Typography variant="caption" sx={{ 
                            color: alpha(model.status === 'active' ? AI_COLORS.success.text : AI_COLORS.warning.text, 0.7)
                          }}>
                            {model.lastTrained}
                          </Typography>
                        </Box>
                      </Card>
                    </Grow>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Box>
        );

      case 1: // Patient Summary
        return (
          <Box>
            <Card 
              elevation={0}
              sx={{ 
                borderRadius: 3, 
                background: AI_COLORS.success.bg,
                border: `2px solid ${alpha(AI_COLORS.success.border, 0.3)}`,
                mb: 4,
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: hoveredCard === 'patientSummary' ? 'translateY(-8px)' : 'translateY(0)',
                boxShadow: hoveredCard === 'patientSummary' 
                  ? `0 20px 40px ${alpha(AI_COLORS.success.border, 0.2)}`
                  : '0 4px 20px rgba(0, 0, 0, 0.05)',
                cursor: 'pointer'
              }}
              onMouseEnter={() => setHoveredCard('patientSummary')}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <CardHeader
                title={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{
                      width: 48,
                      height: 48,
                      borderRadius: '50%',
                      background: `linear-gradient(135deg, ${AI_COLORS.success.border}, ${AI_COLORS.info.border})`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white'
                    }}>
                      <PeopleIcon fontSize="medium" />
                    </Box>
                    <Box>
                      <Typography variant="h6" sx={{ 
                        color: AI_COLORS.success.text, 
                        fontWeight: 700,
                        mb: 0.5
                      }}>
                        AI-Generated Patient Summaries
                      </Typography>
                      <Typography variant="caption" sx={{ 
                        color: alpha(AI_COLORS.success.text, 0.7),
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1
                      }}>
                        <Chip 
                          label={`${aiData.patientSummaries.length} Patients`} 
                          size="small" 
                          sx={{ 
                            bgcolor: alpha(AI_COLORS.success.border, 0.15),
                            color: AI_COLORS.success.border,
                            height: 20
                          }}
                        />
                        Real-time patient monitoring
                      </Typography>
                    </Box>
                  </Box>
                }
                action={
                  <Button 
                    variant="contained" 
                    startIcon={<AddIcon />} 
                    size="small"
                    sx={{ 
                      borderRadius: 2,
                      bgcolor: AI_COLORS.success.border,
                      boxShadow: `0 4px 12px ${alpha(AI_COLORS.success.border, 0.3)}`,
                      '&:hover': {
                        bgcolor: alpha(AI_COLORS.success.border, 0.9),
                        transform: 'translateY(-2px)',
                        boxShadow: `0 6px 16px ${alpha(AI_COLORS.success.border, 0.4)}`
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Generate Report
                  </Button>
                }
              />
              <CardContent>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                  {aiData.patientSummaries.map((patient, index) => (
                    <Grow in={true} timeout={500 + index * 100} key={patient.id}>
                      <Card 
                        elevation={0}
                        sx={{ 
                          flex: '1 1 350px', 
                          borderRadius: 3,
                          background: 'white',
                          border: `2px solid ${alpha(getStatusColor(patient.status), 0.3)}`,
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            borderColor: getStatusColor(patient.status),
                            transform: 'translateY(-4px)',
                            boxShadow: `0 12px 28px ${alpha(getStatusColor(patient.status), 0.15)}`
                          }
                        }}
                      >
                        <CardContent>
                          {/* Patient Header */}
                          <Box sx={{ 
                            p: 2, 
                            mb: 3, 
                            borderRadius: 2,
                            background: `linear-gradient(90deg, ${alpha(getStatusColor(patient.status), 0.1)}, transparent)`,
                            borderLeft: `4px solid ${getStatusColor(patient.status)}`
                          }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                                  <Typography variant="h6" sx={{ 
                                    color: AI_COLORS.gray.text,
                                    fontWeight: 700
                                  }}>
                                    {patient.name}
                                  </Typography>
                                  <StatusIndicator status={patient.status} size={12} pulse={patient.status === 'critical'} />
                                </Box>
                                <Typography variant="body2" sx={{ 
                                  color: alpha(AI_COLORS.gray.text, 0.7),
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: 1
                                }}>
                                  <HospitalIcon fontSize="small" />
                                  Room {patient.room}
                                </Typography>
                              </Box>
                              <Box sx={{ textAlign: 'right' }}>
                                <Chip
                                  label={`Risk: ${patient.riskScore}%`}
                                  size="small"
                                  sx={{ 
                                    bgcolor: patient.riskScore > 50 
                                      ? `linear-gradient(135deg, ${AI_COLORS.danger.border}, ${alpha(AI_COLORS.danger.border, 0.7)})`
                                      : patient.riskScore > 25 
                                      ? `linear-gradient(135deg, ${AI_COLORS.warning.border}, ${alpha(AI_COLORS.warning.border, 0.7)})`
                                      : `linear-gradient(135deg, ${AI_COLORS.success.border}, ${alpha(AI_COLORS.success.border, 0.7)})`,
                                    color: 'white',
                                    fontWeight: 'bold',
                                    boxShadow: `0 2px 8px ${
                                      patient.riskScore > 50 
                                        ? alpha(AI_COLORS.danger.border, 0.3)
                                        : patient.riskScore > 25
                                        ? alpha(AI_COLORS.warning.border, 0.3)
                                        : alpha(AI_COLORS.success.border, 0.3)
                                    }`
                                  }}
                                />
                                <Typography variant="caption" sx={{ 
                                  color: alpha(AI_COLORS.gray.text, 0.6),
                                  display: 'block',
                                  mt: 0.5
                                }}>
                                  {patient.devices.length} devices
                                </Typography>
                              </Box>
                            </Box>
                          </Box>
                          
                          {/* Vital Signs */}
                          <Box sx={{ mb: 3 }}>
                            <Typography variant="subtitle2" sx={{ 
                              color: AI_COLORS.gray.text, 
                              mb: 2, 
                              fontWeight: 600,
                              display: 'flex',
                              alignItems: 'center',
                              gap: 1
                            }}>
                              <ShowChartIcon fontSize="small" />
                              Vital Signs
                            </Typography>
                            <Box sx={{ 
                              p: 2.5, 
                              borderRadius: 2, 
                              bgcolor: AI_COLORS.gray.bg,
                              border: `1px solid ${alpha(AI_COLORS.gray.border, 0.2)}`
                            }}>
                              {Object.entries(patient.vitalSigns).map(([key, data]) => 
                                renderVitalSign(key.charAt(0).toUpperCase() + key.slice(1), data)
                              )}
                            </Box>
                          </Box>
                          
                          {/* AI Insights & Recommendations */}
                          <Box sx={{ mb: 3 }}>
                            <Typography variant="subtitle2" sx={{ 
                              color: AI_COLORS.gray.text, 
                              mb: 1.5, 
                              fontWeight: 600,
                              display: 'flex',
                              alignItems: 'center',
                              gap: 1
                            }}>
                              <PsychologyIcon fontSize="small" />
                              AI Insights
                            </Typography>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2.5 }}>
                              {patient.insights.map((insight, idx) => (
                                <Chip
                                  key={idx}
                                  label={insight}
                                  size="small"
                                  sx={{ 
                                    bgcolor: alpha(AI_COLORS.info.border, 0.1),
                                    color: AI_COLORS.info.text,
                                    border: `1px solid ${alpha(AI_COLORS.info.border, 0.2)}`,
                                    fontWeight: 500
                                  }}
                                />
                              ))}
                            </Box>
                            
                            <Typography variant="subtitle2" sx={{ 
                              color: AI_COLORS.gray.text, 
                              mb: 1.5, 
                              fontWeight: 600,
                              display: 'flex',
                              alignItems: 'center',
                              gap: 1
                            }}>
                              <BoltIcon fontSize="small" />
                              AI Recommendations
                            </Typography>
                            <List dense sx={{ p: 0 }}>
                              {patient.aiRecommendations.map((rec, idx) => (
                                <ListItem 
                                  key={idx} 
                                  sx={{ 
                                    py: 1,
                                    '&:hover': {
                                      bgcolor: alpha(AI_COLORS.success.border, 0.05),
                                      borderRadius: 1
                                    }
                                  }}
                                >
                                  <ListItemIcon sx={{ minWidth: 32 }}>
                                    <Box sx={{
                                      width: 20,
                                      height: 20,
                                      borderRadius: '50%',
                                      bgcolor: alpha(AI_COLORS.success.border, 0.1),
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center'
                                    }}>
                                      <CheckCircleIcon fontSize="small" sx={{ color: AI_COLORS.success.border }} />
                                    </Box>
                                  </ListItemIcon>
                                  <ListItemText 
                                    primary={rec}
                                    primaryTypographyProps={{ 
                                      variant: 'body2',
                                      sx: { color: AI_COLORS.gray.text }
                                    }}
                                  />
                                </ListItem>
                              ))}
                            </List>
                          </Box>
                          
                          {/* Footer */}
                          <Divider sx={{ 
                            my: 2, 
                            borderColor: alpha(AI_COLORS.gray.border, 0.2),
                            borderStyle: 'dashed'
                          }} />
                          
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <DevicesIcon sx={{ 
                                fontSize: 16, 
                                color: alpha(AI_COLORS.gray.text, 0.6) 
                              }} />
                              <Typography variant="caption" sx={{ color: alpha(AI_COLORS.gray.text, 0.7) }}>
                                {patient.devices.join(', ')}
                              </Typography>
                            </Box>
                            <Typography variant="caption" sx={{ 
                              color: alpha(AI_COLORS.gray.text, 0.6),
                              bgcolor: alpha(AI_COLORS.gray.border, 0.1),
                              px: 1.5,
                              py: 0.5,
                              borderRadius: 1,
                              fontWeight: 500
                            }}>
                              Updated {patient.lastUpdate}
                            </Typography>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grow>
                  ))}
                </Box>
              </CardContent>
            </Card>

            {/* Patient Risk Distribution */}
            <Card 
              elevation={0}
              sx={{ 
                borderRadius: 3, 
                background: AI_COLORS.purple.bg,
                border: `2px solid ${alpha(AI_COLORS.purple.border, 0.3)}`,
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: hoveredCard === 'riskDistribution' ? 'translateY(-8px)' : 'translateY(0)',
                boxShadow: hoveredCard === 'riskDistribution' 
                  ? `0 20px 40px ${alpha(AI_COLORS.purple.border, 0.2)}`
                  : '0 4px 20px rgba(0, 0, 0, 0.05)',
                cursor: 'pointer'
              }}
              onMouseEnter={() => setHoveredCard('riskDistribution')}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <CardHeader
                title={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{
                      width: 48,
                      height: 48,
                      borderRadius: '50%',
                      background: `linear-gradient(135deg, ${AI_COLORS.purple.border}, ${AI_COLORS.aiPurple.border})`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white'
                    }}>
                      <AssessmentIcon fontSize="medium" />
                    </Box>
                    <Box>
                      <Typography variant="h6" sx={{ 
                        color: AI_COLORS.purple.text, 
                        fontWeight: 700,
                        mb: 0.5
                      }}>
                        Patient Risk Distribution
                      </Typography>
                      <Typography variant="caption" sx={{ 
                        color: alpha(AI_COLORS.purple.text, 0.7),
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1
                      }}>
                        <AnalyticsIcon fontSize="small" />
                        AI-powered risk assessment visualization
                      </Typography>
                    </Box>
                  </Box>
                }
                action={
                  <Tooltip title="Export Risk Report">
                    <IconButton sx={{ color: AI_COLORS.purple.border }}>
                      <DownloadIcon />
                    </IconButton>
                  </Tooltip>
                }
              />
              <CardContent>
                <Box sx={{ height: 300 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart 
                      data={aiData.patientSummaries}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <defs>
                        <linearGradient id="riskGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={AI_COLORS.purple.border} stopOpacity={0.8}/>
                          <stop offset="95%" stopColor={AI_COLORS.purple.border} stopOpacity={0.2}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid 
                        strokeDasharray="3 3" 
                        stroke={alpha(AI_COLORS.purple.border, 0.15)}
                        vertical={false}
                      />
                      <XAxis 
                        dataKey="name" 
                        stroke={alpha(AI_COLORS.purple.text, 0.7)}
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis 
                        stroke={alpha(AI_COLORS.purple.text, 0.7)}
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        label={{ 
                          value: 'Risk Score %', 
                          angle: -90, 
                          position: 'insideLeft',
                          style: { 
                            fill: alpha(AI_COLORS.purple.text, 0.7),
                            fontSize: 12
                          }
                        }}
                      />
                      <RechartsTooltip 
                        contentStyle={{ 
                          ...GLASS_EFFECT,
                          color: AI_COLORS.purple.text,
                          fontSize: '12px',
                          borderRadius: 8,
                          padding: 12
                        }}
                        formatter={(value) => [`${value}%`, 'Risk Score']}
                        cursor={{ 
                          fill: alpha(AI_COLORS.purple.border, 0.1)
                        }}
                      />
                      <Bar 
                        dataKey="riskScore" 
                        fill="url(#riskGradient)" 
                        name="Risk Score %" 
                        radius={[8, 8, 0, 0]}
                        maxBarSize={50}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>
          </Box>
        );

case 2: // Device Intelligence
  return (
    <Box>
      <Card 
        elevation={0}
        sx={{ 
          borderRadius: 3, 
          background: AI_COLORS.info.bg,
          border: `2px solid ${alpha(AI_COLORS.info.border, 0.3)}`,
          mb: 4,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: hoveredCard === 'deviceIntel' ? 'translateY(-8px)' : 'translateY(0)',
          boxShadow: hoveredCard === 'deviceIntel' 
            ? `0 20px 40px ${alpha(AI_COLORS.info.border, 0.2)}`
            : '0 4px 20px rgba(0, 0, 0, 0.05)',
          cursor: 'pointer'
        }}
        onMouseEnter={() => setHoveredCard('deviceIntel')}
        onMouseLeave={() => setHoveredCard(null)}
      >
        <CardHeader
          title={
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                background: `linear-gradient(135deg, ${AI_COLORS.info.border}, ${AI_COLORS.aiBlue.border})`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white'
              }}>
                <DevicesIcon fontSize="medium" />
              </Box>
              <Box>
                <Typography variant="h6" sx={{ 
                  color: AI_COLORS.info.text, 
                  fontWeight: 700,
                  mb: 0.5
                }}>
                  Device Intelligence & Performance
                </Typography>
                <Typography variant="caption" sx={{ 
                  color: alpha(AI_COLORS.info.text, 0.7),
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}>
                  <BoltIcon fontSize="small" />
                  Predictive maintenance and performance analytics
                </Typography>
              </Box>
            </Box>
          }
          action={
            <IconButton sx={{ color: AI_COLORS.info.border }}>
              <MoreVertIcon />
            </IconButton>
          }
        />
        <CardContent>
          <Box sx={{ height: 300, mb: 4 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={aiData.deviceIntelligence}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <defs>
                  <linearGradient id="batteryGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={AI_COLORS.warning.border} stopOpacity={0.8}/>
                    <stop offset="95%" stopColor={AI_COLORS.warning.border} stopOpacity={0.2}/>
                  </linearGradient>
                  <linearGradient id="signalGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={AI_COLORS.info.border} stopOpacity={0.8}/>
                    <stop offset="95%" stopColor={AI_COLORS.info.border} stopOpacity={0.2}/>
                  </linearGradient>
                  <linearGradient id="accuracyGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={AI_COLORS.success.border} stopOpacity={0.8}/>
                    <stop offset="95%" stopColor={AI_COLORS.success.border} stopOpacity={0.2}/>
                  </linearGradient>
                </defs>
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  stroke={alpha(AI_COLORS.info.border, 0.15)}
                  vertical={false}
                />
                <XAxis 
                  dataKey="device" 
                  stroke={alpha(AI_COLORS.info.text, 0.7)}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  stroke={alpha(AI_COLORS.info.text, 0.7)}
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <RechartsTooltip 
                  contentStyle={{ 
                    ...GLASS_EFFECT,
                    color: AI_COLORS.info.text,
                    fontSize: '12px',
                    borderRadius: 8,
                    padding: 12
                  }}
                  cursor={{ 
                    fill: alpha(AI_COLORS.info.border, 0.1)
                  }}
                />
                <Legend 
                  wrapperStyle={{
                    paddingTop: '20px',
                    fontSize: '12px'
                  }}
                />
                <Bar 
                  dataKey="battery" 
                  fill="url(#batteryGradient)" 
                  name="Battery %" 
                  radius={[8, 8, 0, 0]}
                  maxBarSize={35}
                />
                <Bar 
                  dataKey="signal" 
                  fill="url(#signalGradient)" 
                  name="Signal %" 
                  radius={[8, 8, 0, 0]}
                  maxBarSize={35}
                />
                <Bar 
                  dataKey="accuracy" 
                  fill="url(#accuracyGradient)" 
                  name="Accuracy %" 
                  radius={[8, 8, 0, 0]}
                  maxBarSize={35}
                />
              </BarChart>
            </ResponsiveContainer>
          </Box>
          
          <Divider sx={{ 
            my: 3, 
            borderColor: alpha(AI_COLORS.info.border, 0.2),
            borderStyle: 'dashed'
          }} />
          
          <Box>
            <Typography variant="subtitle2" sx={{ 
              color: AI_COLORS.info.text, 
              mb: 2, 
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}>
              <WarningIcon fontSize="small" />
              Device Anomaly Detection
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {/* FIX: Create a copy of the array before sorting */}
              {[...aiData.deviceIntelligence]
                .sort((a, b) => b.anomalies - a.anomalies)
                .map((device, index) => {
                  const anomalyColor = device.anomalies > 5 ? AI_COLORS.danger : 
                                     device.anomalies > 2 ? AI_COLORS.warning : 
                                     AI_COLORS.success;
                  
                  return (
                    <Grow in={true} timeout={500 + index * 100} key={index}>
                      <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        p: 2.5,
                        borderRadius: 2,
                        background: anomalyColor.bg,
                        border: `1px solid ${alpha(anomalyColor.border, 0.3)}`,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateX(4px)',
                          boxShadow: `0 8px 20px ${alpha(anomalyColor.border, 0.15)}`
                        }
                      }}>
                        <Typography variant="body2" sx={{ 
                          color: anomalyColor.text,
                          fontWeight: 500,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1
                        }}>
                          <DevicesIcon fontSize="small" />
                          {device.device}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
                          <Chip
                            label={`${device.anomalies} anomalies`}
                            size="small"
                            sx={{ 
                              bgcolor: alpha(anomalyColor.border, 0.15),
                              color: anomalyColor.text,
                              border: `1px solid ${alpha(anomalyColor.border, 0.3)}`,
                              fontWeight: 'bold'
                            }}
                          />
                          {device.anomalies > 5 && (
                            <Box sx={{
                              width: 24,
                              height: 24,
                              borderRadius: '50%',
                              bgcolor: alpha(AI_COLORS.danger.border, 0.1),
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              animation: 'pulse 2s infinite',
                              '@keyframes pulse': {
                                '0%': { transform: 'scale(1)' },
                                '50%': { transform: 'scale(1.1)' },
                                '100%': { transform: 'scale(1)' }
                              }
                            }}>
                              <PriorityHighIcon sx={{ 
                                fontSize: 14, 
                                color: AI_COLORS.danger.border 
                              }} />
                            </Box>
                          )}
                        </Box>
                      </Box>
                    </Grow>
                  );
                })}
            </Box>
          </Box>
        </CardContent>
      </Card>

            {/* AI Performance Metrics */}
            <Card 
              elevation={0}
              sx={{ 
                borderRadius: 3, 
                background: AI_COLORS.teal.bg,
                border: `2px solid ${alpha(AI_COLORS.teal.border, 0.3)}`,
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: hoveredCard === 'aiMetrics' ? 'translateY(-8px)' : 'translateY(0)',
                boxShadow: hoveredCard === 'aiMetrics' 
                  ? `0 20px 40px ${alpha(AI_COLORS.teal.border, 0.2)}`
                  : '0 4px 20px rgba(0, 0, 0, 0.05)',
                cursor: 'pointer'
              }}
              onMouseEnter={() => setHoveredCard('aiMetrics')}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <CardHeader
                title={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{
                      width: 48,
                      height: 48,
                      borderRadius: '50%',
                      background: `linear-gradient(135deg, ${AI_COLORS.teal.border}, ${AI_COLORS.aiCyan.border})`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white'
                    }}>
                      <AutoGraphIcon fontSize="medium" />
                    </Box>
                    <Box>
                      <Typography variant="h6" sx={{ 
                        color: AI_COLORS.teal.text, 
                        fontWeight: 700,
                        mb: 0.5
                      }}>
                        AI Performance Metrics
                      </Typography>
                      <Typography variant="caption" sx={{ 
                        color: alpha(AI_COLORS.teal.text, 0.7),
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1
                      }}>
                        <TimelineIcon fontSize="small" />
                        Real-time AI model performance tracking
                      </Typography>
                    </Box>
                  </Box>
                }
                action={
                  <Tooltip title="View Detailed Metrics">
                    <IconButton sx={{ color: AI_COLORS.teal.border }}>
                      <InfoIcon />
                    </IconButton>
                  </Tooltip>
                }
              />
              <CardContent>
                <Box sx={{ height: 250 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart 
                      data={aiData.trendData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="predictionsGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={AI_COLORS.primary.border} stopOpacity={0.8}/>
                          <stop offset="95%" stopColor={AI_COLORS.primary.border} stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="anomaliesGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={AI_COLORS.danger.border} stopOpacity={0.8}/>
                          <stop offset="95%" stopColor={AI_COLORS.danger.border} stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid 
                        strokeDasharray="3 3" 
                        stroke={alpha(AI_COLORS.teal.border, 0.15)}
                        horizontal={true}
                        vertical={false}
                      />
                      <XAxis 
                        dataKey="hour" 
                        stroke={alpha(AI_COLORS.teal.text, 0.7)}
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis 
                        stroke={alpha(AI_COLORS.teal.text, 0.7)}
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                      />
                      <RechartsTooltip 
                        contentStyle={{ 
                          ...GLASS_EFFECT,
                          color: AI_COLORS.teal.text,
                          fontSize: '12px',
                          borderRadius: 8,
                          padding: 12
                        }}
                        cursor={{ strokeDasharray: '3 3' }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="predictions" 
                        stroke={AI_COLORS.primary.border} 
                        fill="url(#predictionsGradient)"
                        strokeWidth={3}
                        name="Predictions"
                        dot={{ 
                          stroke: AI_COLORS.primary.border, 
                          strokeWidth: 2, 
                          r: 4,
                          fill: 'white'
                        }}
                        activeDot={{ 
                          r: 6, 
                          strokeWidth: 2,
                          stroke: AI_COLORS.primary.border,
                          fill: 'white'
                        }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="anomalies" 
                        stroke={AI_COLORS.danger.border} 
                        fill="url(#anomaliesGradient)"
                        strokeWidth={3}
                        name="Anomalies"
                        dot={{ 
                          stroke: AI_COLORS.danger.border, 
                          strokeWidth: 2, 
                          r: 4,
                          fill: 'white'
                        }}
                        activeDot={{ 
                          r: 6, 
                          strokeWidth: 2,
                          stroke: AI_COLORS.danger.border,
                          fill: 'white'
                        }}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </Box>
                
                <Divider sx={{ 
                  my: 3, 
                  borderColor: alpha(AI_COLORS.teal.border, 0.2),
                  borderStyle: 'dashed'
                }} />
                
                <Box sx={{ 
                  display: 'flex', 
                  flexWrap: 'wrap', 
                  gap: 3,
                  justifyContent: 'center'
                }}>
                  {Object.entries(aiData.aiMetrics).map(([key, value], index) => (
                    <Grow in={true} timeout={500 + index * 100} key={key}>
                      <Box sx={{ 
                        flex: '1 1 150px', 
                        textAlign: 'center',
                        p: 2,
                        borderRadius: 2,
                        bgcolor: alpha(AI_COLORS.teal.border, 0.05),
                        border: `1px solid ${alpha(AI_COLORS.teal.border, 0.1)}`,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          bgcolor: alpha(AI_COLORS.teal.border, 0.1),
                          transform: 'translateY(-4px)'
                        }
                      }}>
                        <Typography variant="caption" sx={{ 
                          color: alpha(AI_COLORS.teal.text, 0.7),
                          display: 'block',
                          mb: 1,
                          fontWeight: 500
                        }}>
                          {key.replace(/([A-Z])/g, ' $1').toUpperCase()}
                        </Typography>
                        <Typography variant="h5" fontWeight="800" sx={{ 
                          color: AI_COLORS.teal.text,
                          background: `linear-gradient(90deg, ${AI_COLORS.teal.border}, ${AI_COLORS.info.border})`,
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent'
                        }}>
                          {value}
                        </Typography>
                      </Box>
                    </Grow>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Box>
        );

      case 3: // Risk Analysis
        return (
          <Box>
            <Card 
              elevation={0}
              sx={{ 
                borderRadius: 3, 
                background: AI_COLORS.warning.bg,
                border: `2px solid ${alpha(AI_COLORS.warning.border, 0.3)}`,
                mb: 4,
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: hoveredCard === 'riskAnalysis' ? 'translateY(-8px)' : 'translateY(0)',
                boxShadow: hoveredCard === 'riskAnalysis' 
                  ? `0 20px 40px ${alpha(AI_COLORS.warning.border, 0.2)}`
                  : '0 4px 20px rgba(0, 0, 0, 0.05)',
                cursor: 'pointer'
              }}
              onMouseEnter={() => setHoveredCard('riskAnalysis')}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <CardHeader
                title={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{
                      width: 48,
                      height: 48,
                      borderRadius: '50%',
                      background: `linear-gradient(135deg, ${AI_COLORS.warning.border}, ${AI_COLORS.danger.border})`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white'
                    }}>
                      <WarningIcon fontSize="medium" />
                    </Box>
                    <Box>
                      <Typography variant="h6" sx={{ 
                        color: AI_COLORS.warning.text, 
                        fontWeight: 700,
                        mb: 0.5
                      }}>
                        Comprehensive Risk Analysis
                      </Typography>
                      <Typography variant="caption" sx={{ 
                        color: alpha(AI_COLORS.warning.text, 0.7),
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1
                      }}>
                        <AssessmentIcon fontSize="small" />
                        Multi-dimensional risk assessment across clinical domains
                      </Typography>
                    </Box>
                  </Box>
                }
                action={
                  <Button 
                    variant="contained" 
                    startIcon={<DownloadIcon />} 
                    size="small"
                    sx={{ 
                      borderRadius: 2,
                      bgcolor: AI_COLORS.warning.border,
                      boxShadow: `0 4px 12px ${alpha(AI_COLORS.warning.border, 0.3)}`,
                      '&:hover': {
                        bgcolor: alpha(AI_COLORS.warning.border, 0.9),
                        transform: 'translateY(-2px)',
                        boxShadow: `0 6px 16px ${alpha(AI_COLORS.warning.border, 0.4)}`
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Export Report
                  </Button>
                }
              />
              <CardContent>
                {/* Risk Cards */}
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 4 }}>
                  {aiData.riskAnalysis.map((risk, index) => {
                    const severityColor = getSeverityColor(risk.severity);
                    
                    return (
                      <Grow in={true} timeout={500 + index * 100} key={index}>
                        <Card 
                          elevation={0}
                          sx={{ 
                            flex: '1 1 250px', 
                            borderRadius: 3,
                            background: severityColor.bg,
                            border: `2px solid ${alpha(severityColor.border, 0.3)}`,
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              borderColor: severityColor.border,
                              transform: 'translateY(-4px)',
                              boxShadow: `0 12px 28px ${alpha(severityColor.border, 0.15)}`
                            }
                          }}
                        >
                          <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                              <Box sx={{
                                width: 40,
                                height: 40,
                                borderRadius: '50%',
                                bgcolor: alpha(severityColor.border, 0.1),
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}>
                                <MedicalServicesIcon sx={{ color: severityColor.border }} />
                              </Box>
                              <Box>
                                <Typography variant="subtitle1" sx={{ 
                                  color: severityColor.text,
                                  fontWeight: 'bold',
                                  mb: 0.5
                                }}>
                                  {risk.category}
                                </Typography>
                                <Typography variant="caption" sx={{ 
                                  color: alpha(severityColor.text, 0.7),
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: 0.5
                                }}>
                                  <PeopleIcon fontSize="small" />
                                  {risk.patients} patients affected
                                </Typography>
                              </Box>
                            </Box>
                            
                            <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mb: 2 }}>
                              <Typography variant="h3" sx={{ 
                                color: severityColor.text,
                                fontWeight: 800
                              }}>
                                {risk.count}
                              </Typography>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                {risk.trend > 0 ? (
                                  <ArrowDropUpIcon sx={{ 
                                    color: AI_COLORS.danger.border,
                                    fontSize: 32
                                  }} />
                                ) : (
                                  <ArrowDropDownIcon sx={{ 
                                    color: AI_COLORS.success.border,
                                    fontSize: 32
                                  }} />
                                )}
                                <Typography variant="body1" sx={{ 
                                  color: risk.trend > 0 ? AI_COLORS.danger.border : AI_COLORS.success.border,
                                  fontWeight: 'bold'
                                }}>
                                  {risk.trend > 0 ? '+' : ''}{risk.trend}%
                                </Typography>
                              </Box>
                            </Box>
                            
                            <LinearProgress
                              variant="determinate"
                              value={(risk.count / 50) * 100}
                              sx={{ 
                                height: 10, 
                                borderRadius: 5,
                                bgcolor: alpha(severityColor.border, 0.1),
                                mb: 2,
                                '& .MuiLinearProgress-bar': {
                                  background: `linear-gradient(90deg, ${severityColor.border}, ${alpha(severityColor.border, 0.7)})`,
                                  borderRadius: 5
                                }
                              }}
                            />
                            
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <Chip
                                label={risk.severity.toUpperCase()}
                                size="small"
                                sx={{ 
                                  bgcolor: alpha(severityColor.border, 0.15),
                                  color: severityColor.text,
                                  fontWeight: 'bold',
                                  border: `1px solid ${alpha(severityColor.border, 0.3)}`
                                }}
                              />
                              <Typography variant="caption" sx={{ 
                                color: alpha(severityColor.text, 0.7),
                                fontWeight: 500
                              }}>
                                {((risk.count / 50) * 100).toFixed(0)}% of max
                              </Typography>
                            </Box>
                          </CardContent>
                        </Card>
                      </Grow>
                    );
                  })}
                </Box>
                
                {/* Risk Radar Chart */}
                <Box sx={{ height: 350, mb: 4 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart 
                      data={aiData.riskAnalysis}
                      margin={{ top: 30, right: 30, bottom: 30, left: 30 }}
                    >
                      <PolarGrid 
                        stroke={alpha(AI_COLORS.warning.border, 0.2)}
                      />
                      <PolarAngleAxis 
                        dataKey="category" 
                        tick={{ 
                          fill: alpha(AI_COLORS.warning.text, 0.8),
                          fontSize: 12,
                          fontWeight: 500
                        }}
                      />
                      <PolarRadiusAxis 
                        angle={30}
                        domain={[0, 50]}
                        tick={{ 
                          fill: alpha(AI_COLORS.warning.text, 0.6),
                          fontSize: 10
                        }}
                      />
                      <Radar
                        name="Risk Count"
                        dataKey="count"
                        stroke={AI_COLORS.danger.border}
                        fill={alpha(AI_COLORS.danger.border, 0.2)}
                        fillOpacity={0.6}
                        strokeWidth={2}
                      />
                      <RechartsTooltip 
                        contentStyle={{ 
                          ...GLASS_EFFECT,
                          color: AI_COLORS.warning.text,
                          fontSize: '12px',
                          borderRadius: 8,
                          padding: 12
                        }}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>

            {/* Risk Mitigation Strategies */}
            <Card 
              elevation={0}
              sx={{ 
                borderRadius: 3, 
                background: AI_COLORS.success.bg,
                border: `2px solid ${alpha(AI_COLORS.success.border, 0.3)}`,
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: hoveredCard === 'mitigation' ? 'translateY(-8px)' : 'translateY(0)',
                boxShadow: hoveredCard === 'mitigation' 
                  ? `0 20px 40px ${alpha(AI_COLORS.success.border, 0.2)}`
                  : '0 4px 20px rgba(0, 0, 0, 0.05)',
                cursor: 'pointer'
              }}
              onMouseEnter={() => setHoveredCard('mitigation')}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <CardHeader
                title={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{
                      width: 48,
                      height: 48,
                      borderRadius: '50%',
                      background: `linear-gradient(135deg, ${AI_COLORS.success.border}, ${AI_COLORS.teal.border})`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white'
                    }}>
                      <SecurityIcon fontSize="medium" />
                    </Box>
                    <Box>
                      <Typography variant="h6" sx={{ 
                        color: AI_COLORS.success.text, 
                        fontWeight: 700,
                        mb: 0.5
                      }}>
                        AI-Recommended Risk Mitigation
                      </Typography>
                      <Typography variant="caption" sx={{ 
                        color: alpha(AI_COLORS.success.text, 0.7),
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1
                      }}>
                        <BoltIcon fontSize="small" />
                        Proactive strategies based on risk analysis
                      </Typography>
                    </Box>
                  </Box>
                }
              />
              <CardContent>
                <Box sx={{ 
                  display: 'grid', 
                  gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                  gap: 3
                }}>
                  {[
                    { 
                      title: 'Cardiac Risk Reduction', 
                      description: 'Increase monitoring frequency for high-risk patients. Schedule cardiology reviews within 24 hours.',
                      color: AI_COLORS.danger
                    },
                    { 
                      title: 'Glucose Management', 
                      description: 'Implement automated insulin adjustments. Set tighter glucose control parameters.',
                      color: AI_COLORS.warning
                    },
                    { 
                      title: 'Device Maintenance', 
                      description: 'Schedule preventive maintenance for devices showing performance degradation.',
                      color: AI_COLORS.info
                    },
                    { 
                      title: 'Staff Training', 
                      description: 'Conduct training on new AI insights interpretation and response protocols.',
                      color: AI_COLORS.success
                    }
                  ].map((strategy, index) => (
                    <Grow in={true} timeout={500 + index * 100} key={index}>
                      <Card 
                        elevation={0}
                        sx={{ 
                          p: 3,
                          borderRadius: 3,
                          background: strategy.color.bg,
                          border: `2px solid ${alpha(strategy.color.border, 0.3)}`,
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'translateY(-4px)',
                            boxShadow: `0 12px 28px ${alpha(strategy.color.border, 0.15)}`
                          }
                        }}
                      >
                        <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                          <Box sx={{
                            width: 40,
                            height: 40,
                            borderRadius: '50%',
                            bgcolor: alpha(strategy.color.border, 0.1),
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                          }}>
                            <CheckCircleIcon sx={{ color: strategy.color.border }} />
                          </Box>
                          <Box>
                            <Typography variant="subtitle1" sx={{ 
                              color: strategy.color.text,
                              fontWeight: 600,
                              mb: 1
                            }}>
                              {strategy.title}
                            </Typography>
                            <Typography variant="body2" sx={{ 
                              color: alpha(strategy.color.text, 0.8),
                              lineHeight: 1.6
                            }}>
                              {strategy.description}
                            </Typography>
                          </Box>
                        </Box>
                      </Card>
                    </Grow>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Box>
        );

      default:
        return null;
    }
  };

  // Filter Menu
  const filterMenu = (
    <Menu
      anchorEl={filterAnchorEl}
      open={Boolean(filterAnchorEl)}
      onClose={() => handleFilterClose(null)}
      PaperProps={{
        sx: {
          ...GLASS_EFFECT,
          mt: 1,
          minWidth: 200
        }
      }}
    >
      <MenuItem onClick={() => handleFilterClose('all')}>
        <ListItemIcon>
          <InsightsIcon />
        </ListItemIcon>
        All Insights
      </MenuItem>
      <MenuItem onClick={() => handleFilterClose('cardiac')}>
        <ListItemIcon>
          <DevicesIcon />
        </ListItemIcon>
        Cardiac Risks
      </MenuItem>
      <MenuItem onClick={() => handleFilterClose('device')}>
        <ListItemIcon>
          <DevicesIcon />
        </ListItemIcon>
        Device Issues
      </MenuItem>
      <MenuItem onClick={() => handleFilterClose('clinical')}>
        <ListItemIcon>
          <HospitalIcon />
        </ListItemIcon>
        Clinical Insights
      </MenuItem>
      <MenuItem onClick={() => handleFilterClose('compliance')}>
        <ListItemIcon>
          <SecurityIcon />
        </ListItemIcon>
        Compliance Alerts
      </MenuItem>
    </Menu>
  );

  if (loading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        flexDirection: 'column',
        gap: 3,
        background: `linear-gradient(135deg, ${AI_COLORS.aiPurple.border}, ${AI_COLORS.aiBlue.border})`
      }}>
        <Box sx={{ 
          ...GLASS_EFFECT, 
          width: '400px', 
          textAlign: 'center',
          p: 4,
          borderRadius: 3
        }}>
          <Box sx={{ 
            width: 80, 
            height: 80, 
            borderRadius: '50%',
            background: `linear-gradient(135deg, ${AI_COLORS.aiPurple.border}, ${AI_COLORS.aiBlue.border})`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 3,
            mx: 'auto'
          }}>
            <AIIcon sx={{ fontSize: 40, color: 'white' }} />
          </Box>
          <Typography variant="h5" gutterBottom sx={{ 
            color: 'white',
            fontWeight: 700,
            background: `linear-gradient(90deg, white, ${AI_COLORS.aiCyan.light})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Loading AI Assistant
          </Typography>
          <LinearProgress sx={{ 
            height: 6, 
            borderRadius: 3, 
            bgcolor: 'rgba(255, 255, 255, 0.2)',
            '& .MuiLinearProgress-bar': {
              background: `linear-gradient(90deg, ${AI_COLORS.aiPurple.border}, ${AI_COLORS.aiBlue.border})`
            }
          }} />
          <Typography variant="body2" sx={{ 
            mt: 2, 
            color: 'rgba(255, 255, 255, 0.8)',
            fontStyle: 'italic'
          }}>
            Initializing AI intelligence layer...
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Fade in={true} timeout={500}>
      <Box sx={{ 
        p: 3, 
        background: `linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)`,
        minHeight: '100vh',
        maxWidth: '100%',
        overflowX: 'hidden'
      }}>
        {/* Header */}
        <Grow in={true} timeout={700}>
          <Box sx={{ 
            mb: 4,
            p: 4,
            borderRadius: 3,
            background: `linear-gradient(135deg, ${AI_COLORS.aiPurple.bg}, ${AI_COLORS.aiBlue.bg})`,
            border: `2px solid ${alpha(AI_COLORS.aiPurple.border, 0.3)}`,
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 10px 40px rgba(159, 122, 234, 0.15)'
          }}>
            {/* Background decorative elements */}
            <Box sx={{ 
              position: 'absolute', 
              top: -100, 
              right: -100,
              width: 400,
              height: 400,
              background: `radial-gradient(circle, ${alpha(AI_COLORS.aiPurple.border, 0.1)} 0%, transparent 70%)`,
              borderRadius: '50%'
            }} />
            <Box sx={{ 
              position: 'absolute', 
              bottom: -50, 
              left: -50,
              width: 200,
              height: 200,
              background: `radial-gradient(circle, ${alpha(AI_COLORS.aiBlue.border, 0.1)} 0%, transparent 70%)`,
              borderRadius: '50%'
            }} />
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative' }}>
              <Box sx={{ flex: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 2 }}>
                  <Avatar sx={{ 
                    width: 64,
                    height: 64,
                    background: `linear-gradient(135deg, ${AI_COLORS.aiPurple.border}, ${AI_COLORS.aiBlue.border})`,
                    color: 'white',
                    boxShadow: `0 8px 24px ${alpha(AI_COLORS.aiPurple.border, 0.3)}`
                  }}>
                    <AIIcon fontSize="large" />
                  </Avatar>
                  <Box>
                    <Typography variant="h2" fontWeight="800" sx={{ 
                      color: AI_COLORS.aiPurple.text,
                      background: `linear-gradient(90deg, ${AI_COLORS.aiPurple.text}, ${AI_COLORS.aiBlue.text})`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      mb: 1
                    }}>
                      AI Assistant
                    </Typography>
                    <Typography variant="h6" sx={{ 
                      color: alpha(AI_COLORS.aiPurple.text, 0.8),
                      maxWidth: 600
                    }}>
                      Clinical intelligence layer for medical device data interpretation
                    </Typography>
                  </Box>
                </Box>
                
                {/* Quick stats chips */}
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt: 3 }}>
                  <Chip
                    icon={<PsychologyIcon />}
                    label="AI ACTIVE"
                    sx={{
                      background: `linear-gradient(135deg, ${AI_COLORS.success.border}, ${alpha(AI_COLORS.success.border, 0.7)})`,
                      color: 'white',
                      fontWeight: 'bold',
                      border: 'none',
                      boxShadow: `0 4px 12px ${alpha(AI_COLORS.success.border, 0.3)}`,
                      '& .MuiChip-icon': {
                        color: 'white',
                        animation: 'pulse 2s infinite',
                        '@keyframes pulse': {
                          '0%, 100%': { opacity: 1 },
                          '50%': { opacity: 0.7 }
                        }
                      }
                    }}
                    size="small"
                  />
                  <Chip
                    icon={<BoltIcon />}
                    label={`Model: ${aiData.aiMetrics.modelVersion}`}
                    sx={{
                      bgcolor: alpha(AI_COLORS.aiPurple.border, 0.1),
                      color: AI_COLORS.aiPurple.text,
                      border: `1px solid ${alpha(AI_COLORS.aiPurple.border, 0.3)}`,
                      '& .MuiChip-icon': { color: AI_COLORS.aiPurple.border }
                    }}
                    size="small"
                  />
                  <Chip
                    icon={<TrendingUpIcon />}
                    label={`${aiData.aiMetrics.accuracyRate}% Accuracy`}
                    sx={{
                      bgcolor: alpha(AI_COLORS.success.border, 0.1),
                      color: AI_COLORS.success.text,
                      border: `1px solid ${alpha(AI_COLORS.success.border, 0.3)}`,
                      '& .MuiChip-icon': { color: AI_COLORS.success.border }
                    }}
                    size="small"
                  />
                </Box>
              </Box>
              
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'flex-end', 
                gap: 2,
                minWidth: 200 
              }}>
                <Box sx={{ textAlign: 'right' }}>
                  <Typography variant="caption" sx={{ 
                    color: alpha(AI_COLORS.aiPurple.text, 0.6),
                    display: 'block',
                    mb: 0.5
                  }}>
                    AI Status
                  </Typography>
                  <Typography variant="h6" sx={{ 
                    color: AI_COLORS.aiPurple.text,
                    fontWeight: 'bold'
                  }}>
                    Active & Learning
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    variant="outlined"
                    startIcon={<ChatIcon />}
                    onClick={handleAIChatOpen}
                    sx={{ 
                      borderRadius: 2,
                      borderColor: AI_COLORS.aiPurple.border,
                      color: AI_COLORS.aiPurple.border,
                      bgcolor: 'white',
                      '&:hover': {
                        borderColor: AI_COLORS.aiPurple.border,
                        bgcolor: alpha(AI_COLORS.aiPurple.border, 0.05)
                      }
                    }}
                  >
                    Chat
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<RefreshIcon sx={{ 
                      animation: loading ? 'spin 1s linear infinite' : 'none',
                      '@keyframes spin': {
                        '0%': { transform: 'rotate(0deg)' },
                        '100%': { transform: 'rotate(360deg)' }
                      }
                    }} />}
                    onClick={handleRefresh}
                    sx={{ 
                      borderRadius: 2,
                      px: 3,
                      background: `linear-gradient(135deg, ${AI_COLORS.aiPurple.border}, ${AI_COLORS.aiBlue.border})`,
                      boxShadow: `0 4px 15px ${alpha(AI_COLORS.aiPurple.border, 0.3)}`,
                      '&:hover': {
                        background: `linear-gradient(135deg, ${alpha(AI_COLORS.aiPurple.border, 0.9)}, ${alpha(AI_COLORS.aiBlue.border, 0.9)})`,
                        transform: 'translateY(-2px)',
                        boxShadow: `0 6px 20px ${alpha(AI_COLORS.aiPurple.border, 0.4)}`
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Refresh
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Grow>

        {/* Summary Cards */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 4 }}>
          {[
            { 
              title: 'Total Analyses', 
              value: aiData.summary.totalAnalyses, 
              icon: <AssessmentIcon />, 
              color: AI_COLORS.primary,
              trend: '+12%',
              description: 'Data interpretations'
            },
            { 
              title: 'Active Patients', 
              value: aiData.summary.activePatients, 
              icon: <PersonIcon />, 
              color: AI_COLORS.success,
              trend: '+3',
              description: 'Being monitored'
            },
            { 
              title: 'Critical Alerts', 
              value: aiData.summary.criticalAlerts, 
              icon: <WarningIcon />, 
              color: AI_COLORS.danger,
              trend: '+2',
              description: 'Require attention'
            },
            { 
              title: 'Risk Flags', 
              value: aiData.summary.riskFlags, 
              icon: <ErrorIcon />, 
              color: AI_COLORS.warning,
              trend: '+8',
              description: 'Identified risks'
            },
            { 
              title: 'Accuracy Score', 
              value: `${aiData.summary.accuracyScore}%`, 
              icon: <CheckCircleIcon />, 
              color: AI_COLORS.info,
              trend: '+1.2%',
              description: 'AI prediction accuracy'
            },
            { 
              title: 'Response Time', 
              value: aiData.summary.avgResponseTime, 
              icon: <ScheduleIcon />, 
              color: AI_COLORS.teal,
              trend: '-0.3s',
              description: 'Average processing'
            }
          ].map((item, index) => (
            <Grow in={true} timeout={800 + index * 100} key={item.title}>
              <Card 
                elevation={0}
                sx={{ 
                  flex: '1 1 250px', 
                  borderRadius: 3, 
                  background: item.color.bg,
                  border: `2px solid ${alpha(item.color.border, 0.3)}`,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: `0 20px 40px ${alpha(item.color.border, 0.2)}`,
                    borderColor: item.color.border
                  },
                  cursor: 'pointer'
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ 
                      bgcolor: 'white', 
                      color: item.color.border,
                      boxShadow: `0 4px 12px ${alpha(item.color.border, 0.2)}`
                    }}>
                      {item.icon}
                    </Avatar>
                    <Chip
                      label={item.trend}
                      size="small"
                      sx={{ 
                        bgcolor: alpha(item.color.border, 0.1),
                        color: item.color.border,
                        fontWeight: 'bold',
                        border: `1px solid ${alpha(item.color.border, 0.3)}`
                      }}
                    />
                  </Box>
                  <Typography variant="h3" fontWeight="800" sx={{ 
                    color: item.color.text,
                    mb: 0.5,
                    background: `linear-gradient(90deg, ${item.color.border}, ${alpha(item.color.border, 0.7)})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}>
                    {item.value}
                  </Typography>
                  <Typography variant="subtitle1" sx={{ color: item.color.text, fontWeight: 600 }}>
                    {item.title}
                  </Typography>
                  <Typography variant="caption" sx={{ 
                    color: alpha(item.color.text, 0.7), 
                    display: 'block',
                    mt: 0.5
                  }}>
                    {item.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grow>
          ))}
        </Box>

        {/* Control Bar */}
        <Box sx={{ 
          display: 'flex', 
          gap: 2, 
          mb: 4, 
          flexWrap: 'wrap', 
          alignItems: 'center',
          p: 3,
          borderRadius: 3,
          background: GLASS_EFFECT.background,
          backdropFilter: GLASS_EFFECT.backdropFilter,
          border: GLASS_EFFECT.border,
          boxShadow: GLASS_EFFECT.boxShadow
        }}>
          <TextField
            placeholder="Search insights, patients, or devices..."
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ 
              flex: '1 1 300px',
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                bgcolor: 'white',
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: AI_COLORS.aiPurple.border
                }
              }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: AI_COLORS.aiPurple.border }} />
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="outlined"
            startIcon={<FilterIcon />}
            onClick={handleFilterClick}
            sx={{ 
              borderRadius: 2,
              borderColor: AI_COLORS.aiPurple.border,
              color: AI_COLORS.aiPurple.border,
              bgcolor: 'white',
              '&:hover': {
                borderColor: AI_COLORS.aiPurple.border,
                bgcolor: alpha(AI_COLORS.aiPurple.border, 0.05)
              }
            }}
          >
            Filter
          </Button>
          <Button
            variant="outlined"
            startIcon={<SettingsIcon />}
            onClick={() => {/* Open settings */}}
            sx={{ 
              borderRadius: 2,
              borderColor: AI_COLORS.gray.border,
              color: AI_COLORS.gray.text,
              '&:hover': {
                borderColor: AI_COLORS.info.border,
                color: AI_COLORS.info.border
              }
            }}
          >
            AI Settings
          </Button>
          <Button
            variant="contained"
            startIcon={<DownloadIcon />}
            sx={{ 
              borderRadius: 2,
              background: `linear-gradient(135deg, ${AI_COLORS.success.border}, ${AI_COLORS.teal.border})`,
              boxShadow: `0 4px 12px ${alpha(AI_COLORS.success.border, 0.3)}`,
              '&:hover': {
                background: `linear-gradient(135deg, ${alpha(AI_COLORS.success.border, 0.9)}, ${alpha(AI_COLORS.teal.border, 0.9)})`,
                transform: 'translateY(-2px)',
                boxShadow: `0 6px 16px ${alpha(AI_COLORS.success.border, 0.4)}`
              },
              transition: 'all 0.3s ease'
            }}
          >
            Export Insights
          </Button>
        </Box>

        {filterMenu}

        {/* Tabs */}
        <Box sx={{ 
          borderBottom: 1, 
          borderColor: alpha(AI_COLORS.gray.border, 0.2),
          mb: 4,
          '& .MuiTabs-indicator': {
            background: `linear-gradient(90deg, ${AI_COLORS.aiPurple.border}, ${AI_COLORS.aiBlue.border})`,
            height: 3,
            borderRadius: '3px 3px 0 0'
          }
        }}>
          <Tabs 
            value={activeTab} 
            onChange={(e, newValue) => setActiveTab(newValue)}
            variant="scrollable"
            scrollButtons="auto"
            textColor="inherit"
          >
            <Tab 
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <InsightsIcon fontSize="small" />
                  AI Insights
                </Box>
              }
              sx={{ 
                minHeight: 48,
                fontWeight: activeTab === 0 ? 600 : 400,
                color: activeTab === 0 ? AI_COLORS.aiPurple.text : AI_COLORS.gray.text,
                '&.Mui-selected': {
                  color: AI_COLORS.aiPurple.text
                }
              }}
            />
            <Tab 
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <PeopleIcon fontSize="small" />
                  Patient Summary
                </Box>
              }
              sx={{ 
                minHeight: 48,
                fontWeight: activeTab === 1 ? 600 : 400,
                color: activeTab === 1 ? AI_COLORS.success.text : AI_COLORS.gray.text,
                '&.Mui-selected': {
                  color: AI_COLORS.success.text
                }
              }}
            />
            <Tab 
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <DevicesIcon fontSize="small" />
                  Device Intelligence
                </Box>
              }
              sx={{ 
                minHeight: 48,
                fontWeight: activeTab === 2 ? 600 : 400,
                color: activeTab === 2 ? AI_COLORS.info.text : AI_COLORS.gray.text,
                '&.Mui-selected': {
                  color: AI_COLORS.info.text
                }
              }}
            />
            <Tab 
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <WarningIcon fontSize="small" />
                  Risk Analysis
                </Box>
              }
              sx={{ 
                minHeight: 48,
                fontWeight: activeTab === 3 ? 600 : 400,
                color: activeTab === 3 ? AI_COLORS.warning.text : AI_COLORS.gray.text,
                '&.Mui-selected': {
                  color: AI_COLORS.warning.text
                }
              }}
            />
          </Tabs>
        </Box>

        {/* Tab Content with Smooth Transition */}
        <Fade in={true} timeout={300} key={activeTab}>
          <Box>
            {renderTabContent()}
          </Box>
        </Fade>

        {/* AI Chat Dialog */}
        <Dialog 
          open={aiChatOpen} 
          onClose={handleAIChatClose}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: 3,
              background: `linear-gradient(135deg, ${AI_COLORS.aiPurple.bg}, ${AI_COLORS.aiBlue.bg})`,
              border: `2px solid ${alpha(AI_COLORS.aiPurple.border, 0.3)}`
            }
          }}
        >
          <DialogTitle>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar sx={{ 
                bgcolor: 'white', 
                color: AI_COLORS.aiPurple.border,
                boxShadow: `0 4px 12px ${alpha(AI_COLORS.aiPurple.border, 0.2)}`
              }}>
                <AIIcon />
              </Avatar>
              <Box>
                <Typography variant="h6" sx={{ color: AI_COLORS.aiPurple.text }}>
                  Chat with  AI Assistant
                </Typography>
                <Typography variant="caption" sx={{ color: alpha(AI_COLORS.aiPurple.text, 0.7) }}>
                  Ask about device data, patient insights, or risk analysis
                </Typography>
              </Box>
            </Box>
          </DialogTitle>
          <DialogContent>
            <Box sx={{ 
              height: 300, 
              overflow: 'auto', 
              mb: 3,
              p: 2.5,
              borderRadius: 2,
              bgcolor: 'rgba(255, 255, 255, 0.9)',
              border: `1px solid ${alpha(AI_COLORS.aiPurple.border, 0.1)}`
            }}>
              <Box sx={{ textAlign: 'center', py: 8 }}>
                <Avatar sx={{ 
                  bgcolor: alpha(AI_COLORS.aiPurple.border, 0.1), 
                  color: AI_COLORS.aiPurple.border,
                  width: 64,
                  height: 64,
                  mb: 2,
                  mx: 'auto'
                }}>
                  <AIIcon fontSize="large" />
                </Avatar>
                <Typography variant="body2" sx={{ 
                  color: alpha(AI_COLORS.aiPurple.text, 0.7),
                  maxWidth: 400,
                  mx: 'auto'
                }}>
                  Start a conversation with the AI assistant about device data, patient insights, or risk analysis.
                </Typography>
              </Box>
            </Box>
            <TextField
              fullWidth
              placeholder="Type your question about device data or patient insights..."
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              multiline
              rows={2}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  bgcolor: 'white',
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: AI_COLORS.aiPurple.border
                  }
                }
              }}
            />
          </DialogContent>
          <DialogActions sx={{ p: 3, pt: 0 }}>
            <Button 
              onClick={handleAIChatClose}
              sx={{ 
                color: AI_COLORS.aiPurple.text,
                '&:hover': {
                  bgcolor: alpha(AI_COLORS.aiPurple.border, 0.05)
                }
              }}
            >
              Cancel
            </Button>
            <Button 
              variant="contained" 
              onClick={handleSendMessage}
              disabled={!chatMessage.trim()}
              sx={{ 
                borderRadius: 2,
                background: `linear-gradient(135deg, ${AI_COLORS.aiPurple.border}, ${AI_COLORS.aiBlue.border})`,
                boxShadow: `0 4px 12px ${alpha(AI_COLORS.aiPurple.border, 0.3)}`,
                '&:hover': {
                  background: `linear-gradient(135deg, ${alpha(AI_COLORS.aiPurple.border, 0.9)}, ${alpha(AI_COLORS.aiBlue.border, 0.9)})`,
                  transform: 'translateY(-2px)',
                  boxShadow: `0 6px 16px ${alpha(AI_COLORS.aiPurple.border, 0.4)}`
                },
                transition: 'all 0.3s ease'
              }}
            >
              Send Message
            </Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert 
            onClose={() => setSnackbar(prev => ({ ...prev, open: false }))} 
            severity={snackbar.severity}
            sx={{ 
              width: '100%',
              borderRadius: 2,
              boxShadow: `0 4px 12px ${alpha(
                snackbar.severity === 'success' ? AI_COLORS.success.border :
                snackbar.severity === 'warning' ? AI_COLORS.warning.border :
                snackbar.severity === 'error' ? AI_COLORS.danger.border :
                AI_COLORS.info.border, 0.3
              )}`
            }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>

        {/* Footer */}
        <Box sx={{ 
          mt: 4, 
          pt: 3, 
          pb: 2,
          borderTop: `1px solid ${alpha(AI_COLORS.gray.border, 0.3)}`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 2
        }}>
          <Box>
            <Typography variant="body2" sx={{ 
              color: AI_COLORS.gray.text,
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}>
              <PsychologyIcon fontSize="small" />
               AI Assistant • Real-time medical device data interpretation
            </Typography>
            <Typography variant="caption" sx={{ 
              color: alpha(AI_COLORS.gray.text, 0.6),
              display: 'block',
              mt: 0.5
            }}>
              Version 3.2.1 • {aiData.aiMetrics.trainingData} training samples • Last refresh: Just now
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Tooltip title="AI Settings">
              <IconButton size="small" sx={{ 
                color: AI_COLORS.gray.border,
                '&:hover': {
                  color: AI_COLORS.info.border,
                  bgcolor: alpha(AI_COLORS.info.border, 0.05)
                }
              }}>
                <SettingsIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="System Information">
              <IconButton size="small" sx={{ 
                color: AI_COLORS.gray.border,
                '&:hover': {
                  color: AI_COLORS.info.border,
                  bgcolor: alpha(AI_COLORS.info.border, 0.05)
                }
              }}>
                <InfoIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Box>
    </Fade>
  );
};

export default AIAssistant;