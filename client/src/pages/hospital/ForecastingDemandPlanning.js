import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Button,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Switch,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tabs,
  Tab,
  Alert,
  LinearProgress,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction,
  Divider,
  Badge,
  Tooltip,
  Autocomplete,
  Grid,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Slider,
  InputAdornment,
  CircularProgress
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  TrendingFlat,
  Warning,
  CheckCircle,
  Error,
  Timeline,
  Assessment,
  Analytics,
  ShowChart,
  BarChart,
  PieChart,
  Lightbulb,
  Notifications,
  Search,
  FilterList,
  Download,
  Print,
  Refresh,
  Settings,
  CompareArrows,
  Timeline as TimelineIcon,
  CalendarToday,
  AccessTime,
  Inventory,
  LocalShipping,
  LocalHospital,
  DeviceHub,
  Psychology,
  AutoGraph,
  Calculate,
  PlayArrow,
  Pause,
  Speed,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Risk
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LineChart,
  Line,
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  PieChart as RePieChart,
  Pie,
  Cell,
  Legend,
  Area,
  AreaChart,
  ScatterChart,
  Scatter,
  ZAxis
} from 'recharts';

const ForecastingDemandPlanning = () => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const [scenarioDialogOpen, setScenarioDialogOpen] = useState(false);
  const [forecastDetailsOpen, setForecastDetailsOpen] = useState(false);
  const [selectedForecast, setSelectedForecast] = useState(null);
  const [selectedScenario, setSelectedScenario] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [filterDeviceType, setFilterDeviceType] = useState('all');
  const [filterCriticality, setFilterCriticality] = useState('all');
  const [forecastPeriod, setForecastPeriod] = useState('3m'); // 1m, 3m, 6m, 1y
  const [confidenceLevel, setConfidenceLevel] = useState(85);
  const [simulationRunning, setSimulationRunning] = useState(false);
  const [showAlertsOnly, setShowAlertsOnly] = useState(false);

  // Forecast data for different categories
  const initialDemandForecasts = [
    {
      id: 1,
      deviceType: 'ventilator',
      deviceName: 'Ventilator X200',
      department: 'ICU',
      currentInventory: 12,
      predictedDemand: 18,
      confidence: 92,
      timeline: 'Q2 2024',
      riskLevel: 'high',
      action: 'Increase stock by 50%',
      reasons: ['Seasonal respiratory cases', 'ICU expansion project'],
      historicalAccuracy: 94.5
    },
    {
      id: 2,
      deviceType: 'infusion-pump',
      deviceName: 'Infusion Pump Pro',
      department: 'ER',
      currentInventory: 8,
      predictedDemand: 10,
      confidence: 88,
      timeline: 'Next 3 months',
      riskLevel: 'medium',
      action: 'Increase stock by 25%',
      reasons: ['Increasing patient volume', 'New protocols'],
      historicalAccuracy: 91.2
    },
    {
      id: 3,
      deviceType: 'patient-monitor',
      deviceName: 'Patient Monitor V5',
      department: 'Surgery',
      currentInventory: 15,
      predictedDemand: 16,
      confidence: 78,
      timeline: 'Q3 2024',
      riskLevel: 'low',
      action: 'Maintain current levels',
      reasons: ['Stable surgical schedule'],
      historicalAccuracy: 89.7
    },
    {
      id: 4,
      deviceType: 'defibrillator',
      deviceName: 'Defibrillator A9',
      department: 'Cardiology',
      currentInventory: 5,
      predictedDemand: 8,
      confidence: 95,
      timeline: 'Immediate',
      riskLevel: 'critical',
      action: 'Urgent purchase required',
      reasons: ['High failure rate trend', 'Critical department'],
      historicalAccuracy: 96.8
    },
    {
      id: 5,
      deviceType: 'oxygen-concentrator',
      deviceName: 'Portable Oxygen Concentrator',
      department: 'Pediatrics',
      currentInventory: 7,
      predictedDemand: 12,
      confidence: 85,
      timeline: 'Next 6 months',
      riskLevel: 'high',
      action: 'Plan for 5 additional units',
      reasons: ['Seasonal respiratory surge', 'Clinic expansion'],
      historicalAccuracy: 87.3
    },
    {
      id: 6,
      deviceType: 'ecg-monitor',
      deviceName: 'ECG Monitor E-500',
      department: 'Cardiology',
      currentInventory: 10,
      predictedDemand: 9,
      confidence: 90,
      timeline: 'Q2 2024',
      riskLevel: 'low',
      action: 'Reduce stock by 10%',
      reasons: ['Updated patient monitoring protocols'],
      historicalAccuracy: 93.1
    }
  ];

  // Failure rate predictions
  const initialFailureForecasts = [
    {
      id: 1,
      deviceId: 'DEV-2023-045',
      deviceName: 'Ventilator X200',
      currentFailureRate: '2.4%',
      predictedFailureRate: '4.8%',
      increase: '+100%',
      riskLevel: 'high',
      predictedFailures: 6,
      timeline: 'Next 6 months',
      mainCause: 'Motor wear-out',
      recommendedAction: 'Schedule preventive maintenance',
      costImpact: '$45,000'
    },
    {
      id: 2,
      deviceId: 'DEV-2023-128',
      deviceName: 'Infusion Pump Pro',
      currentFailureRate: '1.2%',
      predictedFailureRate: '1.8%',
      increase: '+50%',
      riskLevel: 'medium',
      predictedFailures: 3,
      timeline: 'Next 3 months',
      mainCause: 'Battery degradation',
      recommendedAction: 'Battery replacement program',
      costImpact: '$12,000'
    },
    {
      id: 3,
      deviceId: 'DEV-2023-089',
      deviceName: 'Patient Monitor V5',
      currentFailureRate: '0.8%',
      predictedFailureRate: '0.9%',
      increase: '+12%',
      riskLevel: 'low',
      predictedFailures: 2,
      timeline: 'Next year',
      mainCause: 'Screen calibration drift',
      recommendedAction: 'Routine calibration',
      costImpact: '$3,500'
    },
    {
      id: 4,
      deviceId: 'DEV-2023-156',
      deviceName: 'Defibrillator A9',
      currentFailureRate: '3.5%',
      predictedFailureRate: '6.2%',
      increase: '+77%',
      riskLevel: 'critical',
      predictedFailures: 4,
      timeline: 'Next 4 months',
      mainCause: 'Capacitor aging',
      recommendedAction: 'Immediate inspection',
      costImpact: '$28,000'
    }
  ];

  // Replacement cycle predictions
  const initialReplacementForecasts = [
    {
      id: 1,
      deviceId: 'DEV-2021-023',
      deviceName: 'Ventilator Legacy',
      currentAge: '3.2 years',
      usageHours: '26,450',
      predictedEOL: 'Q4 2024',
      replacementUrgency: 'high',
      replacementCost: '$42,000',
      optimalReplacement: 'Q2 2024',
      savingsPotential: '$8,500',
      recommendation: 'Schedule replacement'
    },
    {
      id: 2,
      deviceId: 'DEV-2020-156',
      deviceName: 'Infusion Pump Classic',
      currentAge: '4.1 years',
      usageHours: '18,920',
      predictedEOL: 'Q3 2024',
      replacementUrgency: 'critical',
      replacementCost: '$15,000',
      optimalReplacement: 'Immediate',
      savingsPotential: '$3,200',
      recommendation: 'Immediate replacement'
    },
    {
      id: 3,
      deviceId: 'DEV-2022-089',
      deviceName: 'Patient Monitor Pro',
      currentAge: '1.8 years',
      usageHours: '12,340',
      predictedEOL: 'Q4 2025',
      replacementUrgency: 'low',
      replacementCost: '$28,000',
      optimalReplacement: 'Q1 2025',
      savingsPotential: '$5,600',
      recommendation: 'Monitor condition'
    }
  ];

  // AI recommendations
  const initialAIRecommendations = [
    {
      id: 1,
      category: 'Inventory Optimization',
      title: 'Increase ventilator buffer stock',
      description: 'AI predicts 40% demand increase in ICU for Q2 2024',
      impact: 'High',
      confidence: 92,
      estimatedSavings: '$65,000',
      implementationEffort: 'Medium',
      priority: 'Critical'
    },
    {
      id: 2,
      category: 'Maintenance Planning',
      title: 'Accelerate defibrillator maintenance schedule',
      description: 'Failure risk increased by 77% in next 4 months',
      impact: 'High',
      confidence: 95,
      estimatedSavings: '$28,000',
      implementationEffort: 'Low',
      priority: 'High'
    },
    {
      id: 3,
      category: 'Procurement Strategy',
      title: 'Bulk purchase of infusion pumps',
      description: 'Volume discount opportunity for 10+ units',
      impact: 'Medium',
      confidence: 85,
      estimatedSavings: '$15,000',
      implementationEffort: 'Medium',
      priority: 'Medium'
    },
    {
      id: 4,
      category: 'Resource Allocation',
      title: 'Reallocate underutilized patient monitors',
      description: 'Shift 3 monitors from Surgery to ER',
      impact: 'Medium',
      confidence: 88,
      estimatedSavings: '$12,000',
      implementationEffort: 'Low',
      priority: 'Medium'
    }
  ];

  // Departments for filtering
  const departments = [
    { id: 'all', name: 'All Departments' },
    { id: 'ICU', name: 'Intensive Care Unit' },
    { id: 'ER', name: 'Emergency Room' },
    { id: 'Surgery', name: 'Surgery Department' },
    { id: 'Cardiology', name: 'Cardiology' },
    { id: 'Pediatrics', name: 'Pediatrics' },
    { id: 'Radiology', name: 'Radiology' }
  ];

  // Device types for filtering
  const deviceTypes = [
    { id: 'all', name: 'All Types' },
    { id: 'ventilator', name: 'Ventilators' },
    { id: 'infusion-pump', name: 'Infusion Pumps' },
    { id: 'patient-monitor', name: 'Patient Monitors' },
    { id: 'defibrillator', name: 'Defibrillators' },
    { id: 'oxygen-concentrator', name: 'Oxygen Concentrators' },
    { id: 'ecg-monitor', name: 'ECG Monitors' }
  ];

  // Criticality levels
  const criticalityLevels = [
    { id: 'all', name: 'All Levels' },
    { id: 'critical', name: 'Critical' },
    { id: 'high', name: 'High' },
    { id: 'medium', name: 'Medium' },
    { id: 'low', name: 'Low' }
  ];

  // Chart data
  const demandTrendData = [
    { month: 'Jan', actual: 12, forecast: 13, confidenceMin: 11, confidenceMax: 15 },
    { month: 'Feb', actual: 14, forecast: 15, confidenceMin: 13, confidenceMax: 17 },
    { month: 'Mar', actual: 13, forecast: 16, confidenceMin: 14, confidenceMax: 18 },
    { month: 'Apr', actual: 15, forecast: 18, confidenceMin: 16, confidenceMax: 20 },
    { month: 'May', actual: null, forecast: 19, confidenceMin: 17, confidenceMax: 21 },
    { month: 'Jun', actual: null, forecast: 21, confidenceMin: 19, confidenceMax: 23 },
    { month: 'Jul', actual: null, forecast: 22, confidenceMin: 20, confidenceMax: 24 },
    { month: 'Aug', actual: null, forecast: 23, confidenceMin: 21, confidenceMax: 25 }
  ];

  const failureRateData = [
    { device: 'Ventilator', current: 2.4, predicted: 4.8 },
    { device: 'Infusion Pump', current: 1.2, predicted: 1.8 },
    { device: 'Patient Monitor', current: 0.8, predicted: 0.9 },
    { device: 'Defibrillator', current: 3.5, predicted: 6.2 },
    { device: 'Oxygen Concentrator', current: 1.5, predicted: 2.1 }
  ];

  const departmentDemandData = [
    { department: 'ICU', current: 28, predicted: 42, change: '+50%' },
    { department: 'ER', current: 22, predicted: 28, change: '+27%' },
    { department: 'Surgery', current: 35, predicted: 38, change: '+9%' },
    { department: 'Cardiology', current: 24, predicted: 32, change: '+33%' },
    { department: 'Pediatrics', current: 18, predicted: 26, change: '+44%' },
    { department: 'Radiology', current: 12, predicted: 14, change: '+17%' }
  ];

  const riskDistributionData = [
    { name: 'Critical', value: 3, color: theme.palette.error.main },
    { name: 'High', value: 8, color: theme.palette.warning.main },
    { name: 'Medium', value: 12, color: theme.palette.info.main },
    { name: 'Low', value: 24, color: theme.palette.success.main }
  ];

  // What-if scenarios
  const scenarios = [
    {
      id: 1,
      name: 'Seasonal Surge',
      description: '20% increase in respiratory cases',
      impact: 'ICU ventilator demand +40%',
      costImplication: '$120,000',
      probability: 'High (75%)'
    },
    {
      id: 2,
      name: 'New Hospital Wing',
      description: 'Addition of 50 beds',
      impact: 'Overall device demand +25%',
      costImplication: '$350,000',
      probability: 'Medium (50%)'
    },
    {
      id: 3,
      name: 'Supply Chain Disruption',
      description: '30-day delay in shipments',
      impact: 'Buffer stock requirement +50%',
      costImplication: '$85,000',
      probability: 'Low (30%)'
    },
    {
      id: 4,
      name: 'Technology Upgrade',
      description: 'Replace legacy devices',
      impact: 'Capital expenditure +15%',
      costImplication: '$220,000',
      probability: 'High (80%)'
    }
  ];

  const [demandForecasts, setDemandForecasts] = useState(initialDemandForecasts);
  const [failureForecasts, setFailureForecasts] = useState(initialFailureForecasts);
  const [replacementForecasts, setReplacementForecasts] = useState(initialReplacementForecasts);
  const [aiRecommendations, setAiRecommendations] = useState(initialAIRecommendations);
  const [activeScenario, setActiveScenario] = useState(null);
  const [simulationProgress, setSimulationProgress] = useState(0);

  // Load from localStorage
  useEffect(() => {
    const savedForecasts = localStorage.getItem('demandForecasts');
    const savedFailures = localStorage.getItem('failureForecasts');
    const savedReplacements = localStorage.getItem('replacementForecasts');
    const savedRecommendations = localStorage.getItem('aiRecommendations');

    if (savedForecasts) setDemandForecasts(JSON.parse(savedForecasts));
    if (savedFailures) setFailureForecasts(JSON.parse(savedFailures));
    if (savedReplacements) setReplacementForecasts(JSON.parse(savedReplacements));
    if (savedRecommendations) setAiRecommendations(JSON.parse(savedRecommendations));
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('demandForecasts', JSON.stringify(demandForecasts));
    localStorage.setItem('failureForecasts', JSON.stringify(failureForecasts));
    localStorage.setItem('replacementForecasts', JSON.stringify(replacementForecasts));
    localStorage.setItem('aiRecommendations', JSON.stringify(aiRecommendations));
  }, [demandForecasts, failureForecasts, replacementForecasts, aiRecommendations]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const getRiskColor = (riskLevel) => {
    switch (riskLevel) {
      case 'critical':
        return 'error';
      case 'high':
        return 'warning';
      case 'medium':
        return 'info';
      case 'low':
        return 'success';
      default:
        return 'default';
    }
  };

  const getRiskIcon = (riskLevel) => {
    switch (riskLevel) {
      case 'critical':
        return <Error />;
      case 'high':
        return <Warning />;
      case 'medium':
        return <Warning />;
      case 'low':
        return <CheckCircle />;
      default:
        return <TrendingFlat />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Critical':
        return 'error';
      case 'High':
        return 'warning';
      case 'Medium':
        return 'info';
      case 'Low':
        return 'success';
      default:
        return 'default';
    }
  };

const formatCurrency = (amount) => {
  if (amount == null) return '$0';

  // If already formatted currency string
  if (typeof amount === 'string' && amount.includes('$')) {
    return amount;
  }

  const numericValue =
    typeof amount === 'number'
      ? amount
      : Number(String(amount).replace(/[^0-9]/g, ''));

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(numericValue || 0);
};


  const filteredDemandForecasts = demandForecasts.filter(forecast => {
    const matchesSearch = 
      forecast.deviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      forecast.department.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = filterDepartment === 'all' || forecast.department === filterDepartment;
    const matchesDeviceType = filterDeviceType === 'all' || forecast.deviceType === filterDeviceType;
    const matchesCriticality = filterCriticality === 'all' || forecast.riskLevel === filterCriticality;
    const matchesAlerts = !showAlertsOnly || forecast.riskLevel === 'critical' || forecast.riskLevel === 'high';
    
    return matchesSearch && matchesDepartment && matchesDeviceType && matchesCriticality && matchesAlerts;
  });

  const startSimulation = () => {
    setSimulationRunning(true);
    setSimulationProgress(0);
    
    const interval = setInterval(() => {
      setSimulationProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setSimulationRunning(false);
          
          // Simulate new forecast data
          const newForecast = {
            id: demandForecasts.length + 1,
            deviceType: 'ventilator',
            deviceName: 'Ventilator Advanced',
            department: 'ICU',
            currentInventory: 10,
            predictedDemand: 16,
            confidence: 90,
            timeline: 'Q3 2024',
            riskLevel: 'high',
            action: 'Consider advanced models',
            reasons: ['Technology advancement', 'Efficiency gains'],
            historicalAccuracy: 91.5
          };
          
          setDemandForecasts(prev => [...prev, newForecast]);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleRunScenario = (scenario) => {
    setSelectedScenario(scenario);
    setActiveScenario(scenario);
    setScenarioDialogOpen(true);
  };

  const handleApplyRecommendation = (recommendationId) => {
    setAiRecommendations(prev => 
      prev.map(rec => 
        rec.id === recommendationId 
          ? { ...rec, applied: true, appliedDate: new Date().toISOString().split('T')[0] }
          : rec
      )
    );
  };

  // Statistics
  const stats = {
    totalForecasts: demandForecasts.length,
    highRiskForecasts: demandForecasts.filter(f => f.riskLevel === 'critical' || f.riskLevel === 'high').length,
    averageConfidence: demandForecasts.reduce((sum, f) => sum + f.confidence, 0) / demandForecasts.length,
    totalSavingsPotential: aiRecommendations.reduce((sum, r) => sum + parseInt(r.estimatedSavings.replace(/[^0-9]/g, '') || 0), 0),
    predictedFailures: failureForecasts.reduce((sum, f) => sum + f.predictedFailures, 0)
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: theme.palette.primary.main }}>
            <AutoGraph sx={{ verticalAlign: 'middle', mr: 2 }} />
            AI Forecasting & Demand Planning
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Predictive insights for device demand, failure rates, and supply optimization
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            startIcon={simulationRunning ? <Pause /> : <PlayArrow />}
            onClick={startSimulation}
            disabled={simulationRunning}
            color={simulationRunning ? 'warning' : 'primary'}
          >
            {simulationRunning ? 'Running...' : 'Run Forecast'}
          </Button>
          <Button
            variant="outlined"
            startIcon={<CompareArrows />}
            onClick={() => setScenarioDialogOpen(true)}
          >
            Scenario Analysis
          </Button>
        </Box>
      </Box>

      {/* Simulation Progress */}
      {simulationRunning && (
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <CircularProgress variant="determinate" value={simulationProgress} />
              <Box sx={{ flex: 1 }}>
                <Typography variant="body1" gutterBottom>
                  Running AI Forecast Simulation...
                </Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={simulationProgress}
                  sx={{ mt: 1 }}
                />
                <Typography variant="caption" color="text.secondary">
                  {simulationProgress}% complete • Analyzing historical data and patterns
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      )}

      {/* Stats Cards */}
      <Box sx={{ display: 'flex', gap: 3, mb: 4, flexWrap: 'wrap' }}>
        <motion.div whileHover={{ scale: 1.02 }} style={{ flex: 1, minWidth: 200 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="text.secondary" gutterBottom>
                    Active Forecasts
                  </Typography>
                  <Typography variant="h4">
                    {stats.totalForecasts}
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'primary.light' }}>
                  <Analytics />
                </Avatar>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {stats.highRiskForecasts} high-risk predictions
              </Typography>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} style={{ flex: 1, minWidth: 200 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="text.secondary" gutterBottom>
                    Average Confidence
                  </Typography>
                  <Typography variant="h4" color="info.main">
                    {stats.averageConfidence.toFixed(1)}%
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'info.light' }}>
                  <Psychology />
                </Avatar>
              </Box>
              <LinearProgress 
                variant="determinate" 
                value={stats.averageConfidence}
                sx={{ mt: 2 }}
                color="info"
              />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} style={{ flex: 1, minWidth: 200 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="text.secondary" gutterBottom>
                    Savings Potential
                  </Typography>
                  <Typography variant="h4" color="success.main">
                    {formatCurrency(stats.totalSavingsPotential)}
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'success.light' }}>
                  <TrendingUp />
                </Avatar>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                From AI recommendations
              </Typography>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} style={{ flex: 1, minWidth: 200 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="text.secondary" gutterBottom>
                    Predicted Failures
                  </Typography>
                  <Typography variant="h4" color="warning.main">
                    {stats.predictedFailures}
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'warning.light' }}>
                  <Warning />
                </Avatar>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Next 12 months
              </Typography>
            </CardContent>
          </Card>
        </motion.div>
      </Box>

      {/* Charts Section */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Demand Forecast Trend
              </Typography>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={demandTrendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
                    <XAxis dataKey="month" stroke={theme.palette.text.secondary} />
                    <YAxis stroke={theme.palette.text.secondary} />
                    <RechartsTooltip />
                    <Area 
                      type="monotone" 
                      dataKey="confidenceMax" 
                      stroke="transparent" 
                      fill={theme.palette.info.light} 
                      fillOpacity={0.3}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="confidenceMin" 
                      stroke="transparent" 
                      fill={theme.palette.background.paper}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="actual" 
                      stroke={theme.palette.success.main} 
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      name="Actual"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="forecast" 
                      stroke={theme.palette.primary.main} 
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      dot={{ r: 4 }}
                      name="Forecast"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </Box>
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                95% confidence interval shown
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Risk Distribution
              </Typography>
              <Box sx={{ height: 300, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <RePieChart>
                    <Pie
                      data={riskDistributionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}`}
                    >
                      {riskDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <RechartsTooltip />
                    <Legend />
                  </RePieChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Main Content Tabs */}
      <Card sx={{ mb: 4 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="Demand Forecasts" icon={<TimelineIcon />} iconPosition="start" />
            <Tab label="Failure Predictions" icon={<Warning />} iconPosition="start" />
            <Tab label="Replacement Planning" icon={<Refresh />} iconPosition="start" />
            <Tab label="AI Recommendations" icon={<Lightbulb />} iconPosition="start" />
          </Tabs>
        </Box>

        <CardContent>
          <AnimatePresence mode="wait">
            {/* Demand Forecasts Tab */}
            {tabValue === 0 && (
              <motion.div
                key="demand"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
                    <TextField
                      placeholder="Search forecasts..."
                      size="small"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      sx={{ width: 250 }}
                      InputProps={{
                        startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />
                      }}
                    />
                    
                    <FormControl size="small" sx={{ minWidth: 180 }}>
                      <InputLabel>Department</InputLabel>
                      <Select
                        value={filterDepartment}
                        label="Department"
                        onChange={(e) => setFilterDepartment(e.target.value)}
                      >
                        {departments.map(dept => (
                          <MenuItem key={dept.id} value={dept.id}>
                            {dept.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <FormControl size="small" sx={{ minWidth: 150 }}>
                      <InputLabel>Device Type</InputLabel>
                      <Select
                        value={filterDeviceType}
                        label="Device Type"
                        onChange={(e) => setFilterDeviceType(e.target.value)}
                      >
                        {deviceTypes.map(type => (
                          <MenuItem key={type.id} value={type.id}>
                            {type.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <FormControl size="small" sx={{ minWidth: 150 }}>
                      <InputLabel>Criticality</InputLabel>
                      <Select
                        value={filterCriticality}
                        label="Criticality"
                        onChange={(e) => setFilterCriticality(e.target.value)}
                      >
                        {criticalityLevels.map(level => (
                          <MenuItem key={level.id} value={level.id}>
                            {level.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <FormControlLabel
                      control={
                        <Switch
                          checked={showAlertsOnly}
                          onChange={(e) => setShowAlertsOnly(e.target.checked)}
                          size="small"
                        />
                      }
                      label="Show Alerts Only"
                    />
                  </Box>

                  <FormControl size="small" sx={{ minWidth: 120 }}>
                    <InputLabel>Forecast Period</InputLabel>
                    <Select
                      value={forecastPeriod}
                      label="Forecast Period"
                      onChange={(e) => setForecastPeriod(e.target.value)}
                    >
                      <MenuItem value="1m">1 Month</MenuItem>
                      <MenuItem value="3m">3 Months</MenuItem>
                      <MenuItem value="6m">6 Months</MenuItem>
                      <MenuItem value="1y">1 Year</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                <TableContainer component={Paper} variant="outlined">
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Device</TableCell>
                        <TableCell>Department</TableCell>
                        <TableCell>Current Inventory</TableCell>
                        <TableCell>Predicted Demand</TableCell>
                        <TableCell>Confidence</TableCell>
                        <TableCell>Risk Level</TableCell>
                        <TableCell>Timeline</TableCell>
                        <TableCell>Recommended Action</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredDemandForecasts.map((forecast) => (
                        <TableRow 
                          key={forecast.id}
                          hover
                          sx={{ 
                            '&:hover': { 
                              backgroundColor: theme.palette.action.hover 
                            },
                            borderLeft: forecast.riskLevel === 'critical' 
                              ? `4px solid ${theme.palette.error.main}`
                              : forecast.riskLevel === 'high'
                              ? `4px solid ${theme.palette.warning.main}`
                              : 'none'
                          }}
                        >
                          <TableCell>
                            <Typography fontWeight={500}>
                              {forecast.deviceName}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {forecast.deviceType}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={forecast.department}
                              size="small"
                              variant="outlined"
                            />
                          </TableCell>
                          <TableCell>
                            <Typography variant="h6" color="primary">
                              {forecast.currentInventory}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Typography variant="h6" color="warning.main">
                                {forecast.predictedDemand}
                              </Typography>
                              <TrendingUpIcon color="warning" fontSize="small" />
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <LinearProgress 
                                variant="determinate" 
                                value={forecast.confidence}
                                sx={{ width: 60 }}
                                color={forecast.confidence > 90 ? 'success' : forecast.confidence > 75 ? 'warning' : 'error'}
                              />
                              <Typography variant="body2">
                                {forecast.confidence}%
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Chip
                              icon={getRiskIcon(forecast.riskLevel)}
                              label={forecast.riskLevel}
                              color={getRiskColor(forecast.riskLevel)}
                              size="small"
                            />
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2">
                              {forecast.timeline}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2">
                              {forecast.action}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {forecast.reasons[0]}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Button
                              size="small"
                              onClick={() => {
                                setSelectedForecast(forecast);
                                setForecastDetailsOpen(true);
                              }}
                            >
                              Details
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </motion.div>
            )}

            {/* Failure Predictions Tab */}
            {tabValue === 1 && (
              <motion.div
                key="failure"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Failure Rate Predictions
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    AI-powered predictions of device failure rates based on usage patterns and maintenance history
                  </Typography>
                </Box>

                <Grid container spacing={3}>
                  <Grid item xs={12} md={8}>
                    <Card>
                      <CardContent>
                        <Typography variant="subtitle1" gutterBottom>
                          Current vs Predicted Failure Rates
                        </Typography>
                        <Box sx={{ height: 300 }}>
                          <ResponsiveContainer width="100%" height="100%">
                            <ReBarChart data={failureRateData}>
                              <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
                              <XAxis dataKey="device" stroke={theme.palette.text.secondary} />
                              <YAxis stroke={theme.palette.text.secondary} />
                              <RechartsTooltip />
                              <Bar dataKey="current" fill={theme.palette.info.main} name="Current Rate" />
                              <Bar dataKey="predicted" fill={theme.palette.warning.main} name="Predicted Rate" />
                            </ReBarChart>
                          </ResponsiveContainer>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <Card>
                      <CardContent>
                        <Typography variant="subtitle1" gutterBottom>
                          Confidence Settings
                        </Typography>
                        <Box sx={{ mb: 3 }}>
                          <Typography variant="body2" gutterBottom>
                            Confidence Level: {confidenceLevel}%
                          </Typography>
                          <Slider
                            value={confidenceLevel}
                            onChange={(e, newValue) => setConfidenceLevel(newValue)}
                            valueLabelDisplay="auto"
                            step={5}
                            marks
                            min={70}
                            max={95}
                          />
                        </Box>
                        <Typography variant="body2" color="text.secondary" paragraph>
                          Higher confidence levels result in more conservative predictions with larger safety margins.
                        </Typography>
                        <Alert severity="info">
                          Current model accuracy: 92.3% based on historical predictions
                        </Alert>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>

                <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
                  Detailed Failure Predictions
                </Typography>
                <TableContainer component={Paper} variant="outlined">
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Device</TableCell>
                        <TableCell>Current Failure Rate</TableCell>
                        <TableCell>Predicted Rate</TableCell>
                        <TableCell>Increase</TableCell>
                        <TableCell>Predicted Failures</TableCell>
                        <TableCell>Main Cause</TableCell>
                        <TableCell>Recommended Action</TableCell>
                        <TableCell>Cost Impact</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {failureForecasts.map((forecast) => (
                        <TableRow key={forecast.id} hover>
                          <TableCell>
                            <Typography fontWeight={500}>
                              {forecast.deviceName}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {forecast.deviceId}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2">
                              {forecast.currentFailureRate}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Typography variant="body2" color="warning.main" fontWeight={500}>
                                {forecast.predictedFailureRate}
                              </Typography>
                              <TrendingUpIcon color="warning" fontSize="small" />
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={forecast.increase}
                              color={forecast.increase.includes('+100') ? 'error' : forecast.increase.includes('+50') ? 'warning' : 'info'}
                              size="small"
                            />
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" fontWeight={500}>
                              {forecast.predictedFailures}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {forecast.timeline}
                            </Typography>
                          </TableCell>
                          <TableCell>{forecast.mainCause}</TableCell>
                          <TableCell>
                            <Typography variant="body2">
                              {forecast.recommendedAction}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" color="error.main" fontWeight={500}>
                              {forecast.costImpact}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </motion.div>
            )}

            {/* Replacement Planning Tab */}
            {tabValue === 2 && (
              <motion.div
                key="replacement"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Replacement Cycle Planning
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    Optimal replacement timing based on usage, age, and total cost of ownership
                  </Typography>
                </Box>

                <TableContainer component={Paper} variant="outlined">
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Device</TableCell>
                        <TableCell>Age</TableCell>
                        <TableCell>Usage Hours</TableCell>
                        <TableCell>Predicted EOL</TableCell>
                        <TableCell>Replacement Urgency</TableCell>
                        <TableCell>Replacement Cost</TableCell>
                        <TableCell>Optimal Timing</TableCell>
                        <TableCell>Savings Potential</TableCell>
                        <TableCell>Recommendation</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {replacementForecasts.map((forecast) => (
                        <TableRow key={forecast.id} hover>
                          <TableCell>
                            <Typography fontWeight={500}>
                              {forecast.deviceName}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {forecast.deviceId}
                            </Typography>
                          </TableCell>
                          <TableCell>{forecast.currentAge}</TableCell>
                          <TableCell>
                            <Typography variant="body2" fontWeight={500}>
                              {forecast.usageHours}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2">
                              {forecast.predictedEOL}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Chip
                              icon={getRiskIcon(forecast.replacementUrgency)}
                              label={forecast.replacementUrgency}
                              color={getRiskColor(forecast.replacementUrgency)}
                              size="small"
                            />
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" fontWeight={500}>
                              {forecast.replacementCost}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" color="info.main" fontWeight={500}>
                              {forecast.optimalReplacement}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" color="success.main" fontWeight={500}>
                              {forecast.savingsPotential}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Button
                              size="small"
                              variant={forecast.replacementUrgency === 'critical' ? 'contained' : 'outlined'}
                              color={forecast.replacementUrgency === 'critical' ? 'error' : 'primary'}
                            >
                              {forecast.recommendation}
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </motion.div>
            )}

            {/* AI Recommendations Tab */}
            {tabValue === 3 && (
              <motion.div
                key="recommendations"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    AI-Driven Recommendations
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    Smart suggestions for inventory optimization, cost savings, and operational efficiency
                  </Typography>
                </Box>

                <Grid container spacing={3}>
                  {aiRecommendations.map((recommendation) => (
                    <Grid item xs={12} md={6} key={recommendation.id}>
                      <motion.div whileHover={{ scale: 1.02 }}>
                        <Card>
                          <CardContent>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                              <Box>
                                <Chip
                                  label={recommendation.category}
                                  color="primary"
                                  size="small"
                                  sx={{ mb: 1 }}
                                />
                                <Typography variant="h6" gutterBottom>
                                  {recommendation.title}
                                </Typography>
                              </Box>
                              <Chip
                                label={recommendation.priority}
                                color={getPriorityColor(recommendation.priority)}
                                size="small"
                              />
                            </Box>

                            <Typography variant="body2" paragraph>
                              {recommendation.description}
                            </Typography>

                            <Grid container spacing={2} sx={{ mb: 2 }}>
                              <Grid item xs={6}>
                                <Typography variant="caption" color="text.secondary">
                                  Confidence
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                  <LinearProgress 
                                    variant="determinate" 
                                    value={recommendation.confidence}
                                    sx={{ flex: 1 }}
                                    color={recommendation.confidence > 90 ? 'success' : 'info'}
                                  />
                                  <Typography variant="body2">
                                    {recommendation.confidence}%
                                  </Typography>
                                </Box>
                              </Grid>
                              <Grid item xs={6}>
                                <Typography variant="caption" color="text.secondary">
                                  Estimated Savings
                                </Typography>
                                <Typography variant="body1" color="success.main" fontWeight={500}>
                                  {recommendation.estimatedSavings}
                                </Typography>
                              </Grid>
                            </Grid>

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <Typography variant="caption" color="text.secondary">
                                Impact: {recommendation.impact} • Effort: {recommendation.implementationEffort}
                              </Typography>
                              <Button
                                size="small"
                                variant="contained"
                                onClick={() => handleApplyRecommendation(recommendation.id)}
                                disabled={recommendation.applied}
                              >
                                {recommendation.applied ? 'Applied' : 'Apply'}
                              </Button>
                            </Box>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </Grid>
                  ))}
                </Grid>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>

      {/* Scenario Analysis Section */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CompareArrows />
            What-If Scenario Analysis
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Simulate different operational scenarios to understand their impact on device demand
          </Typography>
          
          <Grid container spacing={3}>
            {scenarios.map((scenario) => (
              <Grid item xs={12} md={6} key={scenario.id}>
                <Card variant="outlined">
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                      <Typography variant="h6">
                        {scenario.name}
                      </Typography>
                      <Chip
                        label={scenario.probability}
                        color={
                          scenario.probability.includes('High') ? 'error' :
                          scenario.probability.includes('Medium') ? 'warning' : 'info'
                        }
                        size="small"
                      />
                    </Box>
                    
                    <Typography variant="body2" paragraph>
                      {scenario.description}
                    </Typography>
                    
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" fontWeight={500}>
                        Impact: {scenario.impact}
                      </Typography>
                      <Typography variant="body2" color="error.main" fontWeight={500}>
                        Cost Implication: {scenario.costImplication}
                      </Typography>
                    </Box>
                    
                    <Button
                      fullWidth
                      variant={activeScenario?.id === scenario.id ? 'contained' : 'outlined'}
                      onClick={() => handleRunScenario(scenario)}
                      startIcon={<PlayArrow />}
                    >
                      {activeScenario?.id === scenario.id ? 'Scenario Active' : 'Run Scenario'}
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      {/* Department Demand Comparison */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Department Demand Comparison
          </Typography>
          <Box sx={{ height: 400 }}>
            <ResponsiveContainer width="100%" height="100%">
              <ReBarChart data={departmentDemandData}>
                <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
                <XAxis dataKey="department" stroke={theme.palette.text.secondary} />
                <YAxis stroke={theme.palette.text.secondary} />
                <RechartsTooltip />
                <Bar dataKey="current" fill={theme.palette.primary.main} name="Current Demand" />
                <Bar dataKey="predicted" fill={theme.palette.warning.main} name="Predicted Demand" />
              </ReBarChart>
            </ResponsiveContainer>
          </Box>
        </CardContent>
      </Card>

      {/* Dialogs */}
      {/* Forecast Details Dialog */}
      <Dialog 
        open={forecastDetailsOpen} 
        onClose={() => setForecastDetailsOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Forecast Details
          {selectedForecast && (
            <Chip
              label={selectedForecast.riskLevel}
              color={getRiskColor(selectedForecast.riskLevel)}
              size="small"
              sx={{ ml: 2 }}
            />
          )}
        </DialogTitle>
        <DialogContent>
          {selectedForecast && (
            <Box sx={{ pt: 2 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Device Information
                  </Typography>
                  <Typography variant="body1" paragraph>
                    <strong>Device:</strong> {selectedForecast.deviceName}<br />
                    <strong>Type:</strong> {selectedForecast.deviceType}<br />
                    <strong>Department:</strong> {selectedForecast.department}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Forecast Metrics
                  </Typography>
                  <Typography variant="body1" paragraph>
                    <strong>Current Inventory:</strong> {selectedForecast.currentInventory}<br />
                    <strong>Predicted Demand:</strong> {selectedForecast.predictedDemain}<br />
                    <strong>Confidence:</strong> {selectedForecast.confidence}%
                  </Typography>
                </Grid>
              </Grid>

              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Key Factors
              </Typography>
              <List dense>
                {selectedForecast.reasons.map((reason, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={reason} />
                  </ListItem>
                ))}
              </List>

              <Typography variant="subtitle2" color="text.secondary" gutterBottom sx={{ mt: 2 }}>
                Recommended Action
              </Typography>
              <Alert severity={
                selectedForecast.riskLevel === 'critical' ? 'error' :
                selectedForecast.riskLevel === 'high' ? 'warning' : 'info'
              }>
                {selectedForecast.action}
              </Alert>

              <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
                Historical accuracy of similar predictions: {selectedForecast.historicalAccuracy}%
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setForecastDetailsOpen(false)}>Close</Button>
          <Button variant="contained" onClick={() => {
            // Add to action items
            alert('Added to action items');
            setForecastDetailsOpen(false);
          }}>
            Add to Action Plan
          </Button>
        </DialogActions>
      </Dialog>

      {/* Scenario Analysis Dialog */}
      <Dialog 
        open={scenarioDialogOpen} 
        onClose={() => setScenarioDialogOpen(false)}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>
          Scenario Analysis: {selectedScenario?.name}
        </DialogTitle>
        <DialogContent>
          {selectedScenario && (
            <Box sx={{ pt: 2 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Impact Analysis
                      </Typography>
                      <Box sx={{ height: 300 }}>
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={demandTrendData}>
                            <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
                            <XAxis dataKey="month" stroke={theme.palette.text.secondary} />
                            <YAxis stroke={theme.palette.text.secondary} />
                            <RechartsTooltip />
                            <Line 
                              type="monotone" 
                              dataKey="forecast" 
                              stroke={theme.palette.primary.main} 
                              strokeWidth={2}
                              name="Baseline Forecast"
                            />
                            <Line 
                              type="monotone" 
                              dataKey={(data) => data.forecast * 1.25}
                              stroke={theme.palette.error.main}
                              strokeWidth={2}
                              strokeDasharray="5 5"
                              name="Scenario Impact"
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Scenario Details
                      </Typography>
                      <Typography variant="body2" paragraph>
                        {selectedScenario.description}
                      </Typography>
                      <Divider sx={{ my: 2 }} />
                      <Typography variant="body2" gutterBottom>
                        <strong>Primary Impact:</strong><br />
                        {selectedScenario.impact}
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        <strong>Cost Implication:</strong><br />
                        {selectedScenario.costImplication}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Probability:</strong><br />
                        {selectedScenario.probability}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>

              <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
                Recommended Mitigation Strategies
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Alert severity="warning">
                    Increase buffer stock by 30% for critical devices
                  </Alert>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Alert severity="info">
                    Diversify supplier base to reduce dependency
                  </Alert>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Alert severity="success">
                    Accelerate preventive maintenance schedule
                  </Alert>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Alert severity="error">
                    Create emergency procurement protocol
                  </Alert>
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setScenarioDialogOpen(false)}>Close</Button>
          <Button
            variant="contained"
            onClick={() => {
              // Export scenario analysis
              alert('Scenario analysis exported');
              setScenarioDialogOpen(false);
            }}
          >
            Export Analysis
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ForecastingDemandPlanning;