import React, { useState, useEffect, useRef } from 'react';
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
  Tabs,
  Tab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  FormControl,
  InputLabel,
  Switch,
  FormControlLabel,
  Snackbar,
  Alert,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  TableSortLabel,
  TablePagination,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Radio,
  RadioGroup,
  FormLabel,
  CircularProgress,
  Slide,
  Collapse,
  Drawer,
  Slider,
  Grid,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  AlertTitle,
  Backdrop,
  CircularProgress as MuiCircularProgress,
} from '@mui/material';
import {
  Analytics as AnalyticsIcon,
  Timeline as TimelineIcon,
  ShowChart as ChartIcon,
  MultilineChart as MultiChartIcon,
  BubbleChart as BubbleChartIcon,
  ScatterPlot as ScatterPlotIcon,
  DonutLarge as DonutIcon,
  BarChart as BarChartIcon,
  PieChart as PieChartIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  DeviceHub as DeviceHubIcon,
  Memory as MemoryIcon,
  Psychology as PsychologyIcon,
  Science as ScienceIcon,
  Biotech as BiotechIcon,
  Coronavirus as CoronavirusIcon,
  Favorite as HeartIcon,
  MonitorHeart as MonitorHeartIcon,
  LocalHospital as HospitalIcon,
  Person as PersonIcon,
  Groups as GroupsIcon,
  School as ResearchIcon,
  MedicalServices as MedicalIcon,
  Description as ReportIcon,
  Download as DownloadIcon,
  Upload as UploadIcon,
  FilterList as FilterIcon,
  Search as SearchIcon,
  Refresh as RefreshIcon,
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Share as ShareIcon,
  Print as PrintIcon,
  Save as SaveIcon,
  Close as CloseIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Info as InfoIcon,
  Notifications as NotificationsIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  Insights as InsightsIcon,
  CompareArrows as CompareIcon,
  CalendarToday as CalendarIcon,
  AccessTime as TimeIcon,
  GridView as GridIcon,
  List as ListIcon,
  Settings as SettingsIcon,
  AutoGraph as AutoGraphIcon,
  ModelTraining as ModelTrainingIcon,
  DataObject as DataObjectIcon,
  Dataset as DatasetIcon,
  TableChart as TableChartIcon,
  CloudDownload as CloudDownloadIcon,
  CloudUpload as CloudUploadIcon,
  Bolt as BoltIcon,
  Speed as SpeedIcon,
  PrecisionManufacturing as ManufacturingIcon,
  Security as SecurityIcon,
  Assessment as AssessmentIcon,
  AreaChart as AreaChartIcon
} from '@mui/icons-material';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Treemap,
  TreeMap,
  Sankey,
  ComposedChart,
  ReferenceLine
} from 'recharts';

// Color palette for Analytics Lab
const ANALYTICS_COLORS = {
  primary: { bg: '#E6F7FF', border: '#1890FF', text: '#0050B3' },
  secondary: { bg: '#F6FFED', border: '#52C41A', text: '#237804' },
  warning: { bg: '#FFF7E6', border: '#FA8C16', text: '#AD4E00' },
  danger: { bg: '#FFF1F0', border: '#FF4D4F', text: '#A8071A' },
  success: { bg: '#F6FFED', border: '#52C41A', text: '#237804' },
  info: { bg: '#E6F7FF', border: '#1890FF', text: '#0050B3' },
  purple: { bg: '#F9F0FF', border: '#722ED1', text: '#391085' },
  teal: { bg: '#E6FFFB', border: '#13C2C2', text: '#006D75' },
  gray: { bg: '#FAFAFA', border: '#D9D9D9', text: '#595959' },
  research: { bg: '#F0F5FF', border: '#2F54EB', text: '#10239E' },
  clinical: { bg: '#F6FFED', border: '#52C41A', text: '#135200' }
};

// Analysis Types
const ANALYSIS_TYPES = {
  TREND: 'trend',
  CLUSTER: 'cluster',
  CORRELATION: 'correlation',
  ANOMALY: 'anomaly',
  PREDICTIVE: 'predictive',
  COMPARATIVE: 'comparative'
};

// Device Categories for Analytics
const DEVICE_CATEGORIES_ANALYTICS = {
  CARDIAC: 'cardiac',
  RESPIRATORY: 'respiratory',
  NEUROLOGICAL: 'neurological',
  METABOLIC: 'metabolic',
  VITAL_SIGNS: 'vital_signs',
  DIAGNOSTIC: 'diagnostic'
};

// Time Ranges
const TIME_RANGES = {
  HOUR_24: '24h',
  WEEK_1: '1w',
  MONTH_1: '1m',
  QUARTER_1: '3m',
  YEAR_1: '1y',
  CUSTOM: 'custom'
};

// Default data structure
const defaultAnalyticsData = {
  summary: {
    totalDataPoints: '2.4M',
    activeDevices: 156,
    patientCohorts: 12,
    mlModels: 8,
    avgAccuracy: '94.7%',
    anomaliesDetected: 47,
    fdaReports: 5,
    researchStudies: 3
  },
  
  continuousDataStreams: [
    {
      id: 'STREAM-001',
      deviceType: 'Cardiac Monitor',
      deviceId: 'DEV-001',
      dataType: 'ECG',
      frequency: '500Hz',
      dataPoints: '1.2M',
      startTime: '2024-01-01',
      endTime: '2024-01-20',
      qualityScore: 98,
      anomalies: 12,
      status: 'active'
    },
    {
      id: 'STREAM-002',
      deviceType: 'Pulse Oximeter',
      deviceId: 'DEV-003',
      dataType: 'SpO2',
      frequency: '1Hz',
      dataPoints: '864k',
      startTime: '2024-01-05',
      endTime: '2024-01-20',
      qualityScore: 96,
      anomalies: 8,
      status: 'active'
    },
    {
      id: 'STREAM-003',
      deviceType: 'Glucose Monitor',
      deviceId: 'DEV-005',
      dataType: 'Blood Glucose',
      frequency: '0.1Hz',
      dataPoints: '172k',
      startTime: '2024-01-10',
      endTime: '2024-01-20',
      qualityScore: 99,
      anomalies: 3,
      status: 'active'
    },
    {
      id: 'STREAM-004',
      deviceType: 'Blood Pressure Monitor',
      deviceId: 'DEV-008',
      dataType: 'BP',
      frequency: '0.05Hz',
      dataPoints: '86k',
      startTime: '2024-01-15',
      endTime: '2024-01-20',
      qualityScore: 94,
      anomalies: 5,
      status: 'active'
    }
  ],
  
  longitudinalPatientSignals: [
    {
      patientId: 'P-001',
      age: 62,
      gender: 'M',
      condition: 'Hypertension',
      deviceType: 'Blood Pressure Monitor',
      signalType: 'BP Trends',
      duration: '6 months',
      dataPoints: '18.2k',
      trend: 'improving',
      baseline: '140/90',
      current: '128/82',
      improvement: '8.6%'
    },
    {
      patientId: 'P-002',
      age: 45,
      gender: 'F',
      condition: 'Diabetes Type 2',
      deviceType: 'Glucose Monitor',
      signalType: 'Blood Glucose',
      duration: '4 months',
      dataPoints: '11.5k',
      trend: 'stable',
      baseline: '180 mg/dL',
      current: '142 mg/dL',
      improvement: '21.1%'
    },
    {
      patientId: 'P-003',
      age: 58,
      gender: 'M',
      condition: 'Heart Failure',
      deviceType: 'Cardiac Monitor',
      signalType: 'ECG Patterns',
      duration: '8 months',
      dataPoints: '2.4M',
      trend: 'improving',
      baseline: 'EF 35%',
      current: 'EF 42%',
      improvement: '20%'
    },
    {
      patientId: 'P-004',
      age: 72,
      gender: 'F',
      condition: 'COPD',
      deviceType: 'Pulse Oximeter',
      signalType: 'SpO2',
      duration: '3 months',
      dataPoints: '258k',
      trend: 'declining',
      baseline: '94%',
      current: '91%',
      improvement: '-3.2%'
    }
  ],
  
  trendAnalysis: [
    { time: 'Jan 1', cardiac: 125, respiratory: 92, metabolic: 88, neurological: 76 },
    { time: 'Jan 5', cardiac: 128, respiratory: 94, metabolic: 86, neurological: 78 },
    { time: 'Jan 10', cardiac: 132, respiratory: 96, metabolic: 85, neurological: 82 },
    { time: 'Jan 15', cardiac: 135, respiratory: 98, metabolic: 84, neurological: 85 },
    { time: 'Jan 20', cardiac: 138, respiratory: 97, metabolic: 83, neurological: 88 },
    { time: 'Jan 25', cardiac: 142, respiratory: 95, metabolic: 82, neurological: 92 },
    { time: 'Jan 30', cardiac: 145, respiratory: 94, metabolic: 81, neurological: 95 }
  ],
  
  populationAnalytics: [
    { cohort: 'Age 18-35', size: 125, avgHeartRate: 72, avgBP: '118/76', avgGlucose: 95, riskScore: 12 },
    { cohort: 'Age 36-50', size: 189, avgHeartRate: 74, avgBP: '124/80', avgGlucose: 102, riskScore: 24 },
    { cohort: 'Age 51-65', size: 156, avgHeartRate: 76, avgBP: '132/84', avgGlucose: 115, riskScore: 38 },
    { cohort: 'Age 66+', size: 92, avgHeartRate: 78, avgBP: '140/88', avgGlucose: 128, riskScore: 51 }
  ],
  
  devicePerformance: [
    {
      deviceId: 'DEV-001',
      deviceType: 'Cardiac Monitor',
      accuracy: 98.7,
      reliability: 99.2,
      usageEfficiency: 94.5,
      avgResponseTime: '1.2s',
      uptime: '99.8%',
      calibrationCount: 3,
      lastCalibration: '2024-01-15'
    },
    {
      deviceId: 'DEV-002',
      deviceType: 'Pulse Oximeter',
      accuracy: 96.4,
      reliability: 97.8,
      usageEfficiency: 92.1,
      avgResponseTime: '0.8s',
      uptime: '98.7%',
      calibrationCount: 2,
      lastCalibration: '2024-01-18'
    },
    {
      deviceId: 'DEV-003',
      deviceType: 'Glucose Monitor',
      accuracy: 95.8,
      reliability: 96.5,
      usageEfficiency: 88.9,
      avgResponseTime: '1.5s',
      uptime: '97.2%',
      calibrationCount: 4,
      lastCalibration: '2024-01-12'
    },
    {
      deviceId: 'DEV-004',
      deviceType: 'Blood Pressure Monitor',
      accuracy: 97.2,
      reliability: 98.1,
      usageEfficiency: 91.3,
      avgResponseTime: '2.1s',
      uptime: '99.1%',
      calibrationCount: 1,
      lastCalibration: '2024-01-20'
    }
  ],
  
  fdaInsights: [
    {
      id: 'FDA-001',
      reportType: '510(k) Submission',
      deviceType: 'Cardiac Monitor Pro',
      status: 'approved',
      submissionDate: '2024-01-10',
      reviewDate: '2024-01-20',
      accuracyData: '98.7%',
      safetyData: '99.2%',
      complianceScore: 96
    },
    {
      id: 'FDA-002',
      reportType: 'PMA Supplement',
      deviceType: 'Glucose Monitor CGM',
      status: 'under_review',
      submissionDate: '2024-01-15',
      reviewDate: null,
      accuracyData: '95.8%',
      safetyData: '96.5%',
      complianceScore: 92
    },
    {
      id: 'FDA-003',
      reportType: 'Annual Report',
      deviceType: 'Portable Ultrasound',
      status: 'draft',
      submissionDate: null,
      reviewDate: null,
      accuracyData: '97.5%',
      safetyData: '98.2%',
      complianceScore: 94
    }
  ],
  
  mlModels: [
    {
      id: 'ML-001',
      name: 'Cardiac Anomaly Detection',
      type: 'LSTM',
      accuracy: 96.8,
      precision: 95.2,
      recall: 97.1,
      f1Score: 96.1,
      trainingData: '1.2M samples',
      lastUpdated: '2024-01-18',
      status: 'production'
    },
    {
      id: 'ML-002',
      name: 'Glucose Trend Prediction',
      type: 'XGBoost',
      accuracy: 93.5,
      precision: 92.8,
      recall: 94.1,
      f1Score: 93.4,
      trainingData: '850k samples',
      lastUpdated: '2024-01-15',
      status: 'production'
    },
    {
      id: 'ML-003',
      name: 'Patient Risk Stratification',
      type: 'Random Forest',
      accuracy: 91.2,
      precision: 90.5,
      recall: 92.0,
      f1Score: 91.2,
      trainingData: '2.1M samples',
      lastUpdated: '2024-01-12',
      status: 'testing'
    },
    {
      id: 'ML-004',
      name: 'Device Failure Prediction',
      type: 'Neural Network',
      accuracy: 94.7,
      precision: 93.9,
      recall: 95.4,
      f1Score: 94.6,
      trainingData: '1.8M samples',
      lastUpdated: '2024-01-10',
      status: 'production'
    }
  ],
  
  significantAnomalies: [
    {
      id: 'ANO-001',
      deviceId: 'DEV-001',
      patientId: 'P-003',
      type: 'Cardiac Arrhythmia',
      severity: 'high',
      confidence: 96.7,
      timestamp: '2024-01-20 14:32',
      value: 'VT detected',
      baseline: 'Normal sinus rhythm',
      action: 'Alert sent to cardiology team'
    },
    {
      id: 'ANO-002',
      deviceId: 'DEV-005',
      patientId: 'P-002',
      type: 'Hypoglycemia',
      severity: 'medium',
      confidence: 92.3,
      timestamp: '2024-01-20 08:15',
      value: '52 mg/dL',
      baseline: '142 mg/dL',
      action: 'Patient notified, nurse alerted'
    },
    {
      id: 'ANO-003',
      deviceId: 'DEV-008',
      patientId: 'P-001',
      type: 'Hypertensive Crisis',
      severity: 'high',
      confidence: 94.8,
      timestamp: '2024-01-19 22:45',
      value: '185/110 mmHg',
      baseline: '128/82 mmHg',
      action: 'Emergency protocol initiated'
    }
  ],
  
  comparativeAnalytics: {
    deviceComparison: [
      { metric: 'Accuracy', cardiac: 98.7, respiratory: 96.4, metabolic: 95.8 },
      { metric: 'Reliability', cardiac: 99.2, respiratory: 97.8, metabolic: 96.5 },
      { metric: 'Uptime', cardiac: 99.8, respiratory: 98.7, metabolic: 97.2 },
      { metric: 'Response Time', cardiac: 1.2, respiratory: 0.8, metabolic: 1.5 }
    ],
    cohortComparison: [
      { ageGroup: '18-35', avgHR: 72, avgBP: '118/76', avgGlucose: 95 },
      { ageGroup: '36-50', avgHR: 74, avgBP: '124/80', avgGlucose: 102 },
      { ageGroup: '51-65', avgHR: 76, avgBP: '132/84', avgGlucose: 115 },
      { ageGroup: '66+', avgHR: 78, avgBP: '140/88', avgGlucose: 128 }
    ]
  },
  
  researchStudies: [
    {
      id: 'RES-001',
      title: 'Impact of Continuous Monitoring on Heart Failure Outcomes',
      leadResearcher: 'Dr. Sarah Chen',
      institution: 'Cardiology Research Unit',
      status: 'active',
      patientsEnrolled: 156,
      duration: '12 months',
      devicesUsed: ['Cardiac Monitor', 'Pulse Oximeter'],
      insights: '27% reduction in hospital readmissions'
    },
    {
      id: 'RES-002',
      title: 'ML Prediction of Diabetic Complications',
      leadResearcher: 'Dr. Michael Rodriguez',
      institution: 'Endocrinology Lab',
      status: 'analysis',
      patientsEnrolled: 89,
      duration: '8 months',
      devicesUsed: ['Glucose Monitor'],
      insights: '92% accuracy in complication prediction'
    },
    {
      id: 'RES-003',
      title: 'Wearable Device Adherence in Elderly Patients',
      leadResearcher: 'Dr. Emily Watson',
      institution: 'Geriatrics Research',
      status: 'completed',
      patientsEnrolled: 42,
      duration: '6 months',
      devicesUsed: ['All device types'],
      insights: '78% adherence rate, highest with simplified interfaces'
    }
  ],
  
  recentActivities: [
    { id: 1, action: 'ML model retrained', model: 'Cardiac Anomaly Detection', time: '2 hours ago' },
    { id: 2, action: 'FDA report generated', report: '510(k) Submission', time: '1 day ago' },
    { id: 3, action: 'Significant anomaly detected', device: 'Cardiac Monitor DEV-001', time: '2 days ago' },
    { id: 4, action: 'New research study initiated', study: 'Heart Failure Outcomes', time: '3 days ago' },
    { id: 5, action: 'Population analysis completed', cohort: 'Age 51-65', time: '4 days ago' }
  ]
};

// Device Data Analytics Lab Component
const DeviceDataAnalyticsLab = () => {
  const theme = useTheme();
  const [analyticsData, setAnalyticsData] = useState(defaultAnalyticsData);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [analysisType, setAnalysisType] = useState(ANALYSIS_TYPES.TREND);
  const [timeRange, setTimeRange] = useState(TIME_RANGES.MONTH_1);
  const [deviceCategory, setDeviceCategory] = useState('all');
  const [patientGroup, setPatientGroup] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [selectedInsights, setSelectedInsights] = useState([]);
  const [insightDialogOpen, setInsightDialogOpen] = useState(false);
  const [selectedInsight, setSelectedInsight] = useState(null);
  const [mlTrainingDialogOpen, setMlTrainingDialogOpen] = useState(false);
  const [exportDialogOpen, setExportDialogOpen] = useState(false);
  const [viewMode, setViewMode] = useState('clinical'); // 'clinical' or 'research'
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('confidence');
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  
  // ML Training State
  const [mlTraining, setMlTraining] = useState({
    modelType: 'LSTM',
    targetMetric: 'accuracy',
    trainingDataSize: 500000,
    epochs: 100,
    learningRate: 0.001
  });
  
  // Advanced Filter State
  const [advancedFilters, setAdvancedFilters] = useState({
    minConfidence: 90,
    dateRange: [new Date('2024-01-01'), new Date('2024-01-20')],
    deviceTypes: [],
    patientConditions: []
  });

  useEffect(() => {
    const loadAnalyticsData = () => {
      const savedData = localStorage.getItem('deviceHub_analytics');
      if (savedData) {
        try {
          const parsedData = JSON.parse(savedData);
          setAnalyticsData({
            ...defaultAnalyticsData,
            ...parsedData
          });
        } catch (error) {
          console.error('Error parsing analytics data:', error);
          setAnalyticsData(defaultAnalyticsData);
        }
      }
      setLoading(false);
    };

    loadAnalyticsData();
  }, []);

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      const updatedData = {
        ...analyticsData,
        summary: {
          ...analyticsData.summary,
          totalDataPoints: `${(Math.random() * 0.5 + 2.3).toFixed(1)}M`,
          anomaliesDetected: analyticsData.summary.anomaliesDetected + Math.floor(Math.random() * 5)
        }
      };
      
      setAnalyticsData(updatedData);
      localStorage.setItem('deviceHub_analytics', JSON.stringify(updatedData));
      setLoading(false);
      
      setSnackbar({
        open: true,
        message: 'Analytics data refreshed with latest insights!',
        severity: 'success'
      });
    }, 1500);
  };

  const handleFilterClick = (event) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  const handleAnalysisTypeChange = (type) => {
    setAnalysisType(type);
  };

  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
  };

  const handleDeviceCategoryChange = (category) => {
    setDeviceCategory(category);
  };

  const handlePatientGroupChange = (group) => {
    setPatientGroup(group);
  };

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  const handleInsightSelect = (id) => {
    const selectedIndex = selectedInsights.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedInsights, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedInsights.slice(1));
    } else if (selectedIndex === selectedInsights.length - 1) {
      newSelected = newSelected.concat(selectedInsights.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedInsights.slice(0, selectedIndex),
        selectedInsights.slice(selectedIndex + 1)
      );
    }

    setSelectedInsights(newSelected);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = analyticsData.significantAnomalies.map((anomaly) => anomaly.id);
      setSelectedInsights(newSelecteds);
      return;
    }
    setSelectedInsights([]);
  };

  const handleViewInsight = (insight) => {
    setSelectedInsight(insight);
    setInsightDialogOpen(true);
  };

  const handleCloseInsightDialog = () => {
    setInsightDialogOpen(false);
    setSelectedInsight(null);
  };

  const handleOpenMlTrainingDialog = () => {
    setMlTrainingDialogOpen(true);
  };

  const handleCloseMlTrainingDialog = () => {
    setMlTrainingDialogOpen(false);
  };

  const handleOpenExportDialog = () => {
    setExportDialogOpen(true);
  };

  const handleCloseExportDialog = () => {
    setExportDialogOpen(false);
  };

  const handleMlTrainingChange = (field, value) => {
    setMlTraining(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleStartMlTraining = () => {
    setLoading(true);
    setTimeout(() => {
      const newModel = {
        id: `ML-00${analyticsData.mlModels.length + 1}`,
        name: `New ${mlTraining.modelType} Model`,
        type: mlTraining.modelType,
        accuracy: Math.random() * 5 + 90,
        precision: Math.random() * 5 + 90,
        recall: Math.random() * 5 + 90,
        f1Score: Math.random() * 5 + 90,
        trainingData: `${mlTraining.trainingDataSize.toLocaleString()} samples`,
        lastUpdated: new Date().toISOString().split('T')[0],
        status: 'training'
      };

      const updatedData = {
        ...analyticsData,
        mlModels: [newModel, ...analyticsData.mlModels],
        summary: {
          ...analyticsData.summary,
          mlModels: analyticsData.summary.mlModels + 1
        },
        recentActivities: [
          {
            id: analyticsData.recentActivities.length + 1,
            action: 'New ML model training started',
            model: newModel.name,
            time: 'Just now'
          },
          ...analyticsData.recentActivities
        ]
      };

      setAnalyticsData(updatedData);
      localStorage.setItem('deviceHub_analytics', JSON.stringify(updatedData));
      setLoading(false);
      handleCloseMlTrainingDialog();
      
      setSnackbar({
        open: true,
        message: 'Machine learning model training initiated!',
        severity: 'success'
      });
    }, 2000);
  };

  const handleExportData = (format) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      handleCloseExportDialog();
      
      setSnackbar({
        open: true,
        message: `Analytics data exported successfully as ${format.toUpperCase()}!`,
        severity: 'success'
      });
    }, 1000);
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getAnalysisTypeColor = (type) => {
    switch (type) {
      case ANALYSIS_TYPES.TREND:
        return ANALYTICS_COLORS.primary;
      case ANALYSIS_TYPES.CLUSTER:
        return ANALYTICS_COLORS.secondary;
      case ANALYSIS_TYPES.CORRELATION:
        return ANALYTICS_COLORS.warning;
      case ANALYSIS_TYPES.ANOMALY:
        return ANALYTICS_COLORS.danger;
      case ANALYSIS_TYPES.PREDICTIVE:
        return ANALYTICS_COLORS.purple;
      case ANALYSIS_TYPES.COMPARATIVE:
        return ANALYTICS_COLORS.teal;
      default:
        return ANALYTICS_COLORS.gray;
    }
  };

  const getDeviceCategoryColor = (category) => {
    switch (category) {
      case DEVICE_CATEGORIES_ANALYTICS.CARDIAC:
        return ANALYTICS_COLORS.danger;
      case DEVICE_CATEGORIES_ANALYTICS.RESPIRATORY:
        return ANALYTICS_COLORS.info;
      case DEVICE_CATEGORIES_ANALYTICS.NEUROLOGICAL:
        return ANALYTICS_COLORS.purple;
      case DEVICE_CATEGORIES_ANALYTICS.METABOLIC:
        return ANALYTICS_COLORS.secondary;
      case DEVICE_CATEGORIES_ANALYTICS.VITAL_SIGNS:
        return ANALYTICS_COLORS.primary;
      case DEVICE_CATEGORIES_ANALYTICS.DIAGNOSTIC:
        return ANALYTICS_COLORS.warning;
      default:
        return ANALYTICS_COLORS.gray;
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high':
        return ANALYTICS_COLORS.danger;
      case 'medium':
        return ANALYTICS_COLORS.warning;
      case 'low':
        return ANALYTICS_COLORS.info;
      default:
        return ANALYTICS_COLORS.gray;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
      case 'production':
      case 'approved':
        return ANALYTICS_COLORS.success;
      case 'under_review':
      case 'testing':
      case 'analysis':
        return ANALYTICS_COLORS.warning;
      case 'draft':
      case 'training':
        return ANALYTICS_COLORS.info;
      case 'completed':
        return ANALYTICS_COLORS.secondary;
      default:
        return ANALYTICS_COLORS.gray;
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'improving':
        return <TrendingUpIcon sx={{ color: ANALYTICS_COLORS.success.border }} />;
      case 'stable':
        return <TimelineIcon sx={{ color: ANALYTICS_COLORS.info.border }} />;
      case 'declining':
        return <TrendingDownIcon sx={{ color: ANALYTICS_COLORS.danger.border }} />;
      default:
        return <TimelineIcon />;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return 'N/A';
    const date = new Date(dateTimeString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Filter and sort anomalies
  const filteredAnomalies = analyticsData.significantAnomalies.filter(anomaly => {
    const matchesSearch = searchQuery === '' || 
      anomaly.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      anomaly.deviceId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      anomaly.patientId.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSearch;
  });

  const sortedAnomalies = filteredAnomalies.sort((a, b) => {
    if (orderBy === 'confidence' || orderBy === 'severity') {
      const aValue = orderBy === 'confidence' ? a.confidence : 
                    a.severity === 'high' ? 3 : a.severity === 'medium' ? 2 : 1;
      const bValue = orderBy === 'confidence' ? b.confidence : 
                    b.severity === 'high' ? 3 : b.severity === 'medium' ? 2 : 1;
      return order === 'asc' ? aValue - bValue : bValue - aValue;
    }
    return 0;
  });

  const paginatedAnomalies = sortedAnomalies.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  // Render different chart based on analysis type
  const renderAnalysisChart = () => {
    switch (analysisType) {
      case ANALYSIS_TYPES.TREND:
        return (
          <Box sx={{ height: 400 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={analyticsData.trendAnalysis}>
                <CartesianGrid strokeDasharray="3 3" stroke={ANALYTICS_COLORS.gray.border} />
                <XAxis dataKey="time" stroke={ANALYTICS_COLORS.gray.text} />
                <YAxis stroke={ANALYTICS_COLORS.gray.text} />
                <RechartsTooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="cardiac" 
                  stroke={ANALYTICS_COLORS.danger.border} 
                  strokeWidth={3}
                  dot={{ r: 4 }}
                  activeDot={{ r: 8 }}
                  name="Cardiac Devices"
                />
                <Line 
                  type="monotone" 
                  dataKey="respiratory" 
                  stroke={ANALYTICS_COLORS.info.border} 
                  strokeWidth={2}
                  name="Respiratory Devices"
                />
                <Line 
                  type="monotone" 
                  dataKey="metabolic" 
                  stroke={ANALYTICS_COLORS.secondary.border} 
                  strokeWidth={2}
                  name="Metabolic Devices"
                />
                <Line 
                  type="monotone" 
                  dataKey="neurological" 
                  stroke={ANALYTICS_COLORS.purple.border} 
                  strokeWidth={2}
                  name="Neurological Devices"
                />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        );

      case ANALYSIS_TYPES.CLUSTER:
        return (
          <Box sx={{ height: 400 }}>
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart>
                <CartesianGrid strokeDasharray="3 3" stroke={ANALYTICS_COLORS.gray.border} />
                <XAxis 
                  type="number" 
                  dataKey="x" 
                  name="Heart Rate" 
                  stroke={ANALYTICS_COLORS.gray.text}
                  domain={[60, 100]}
                />
                <YAxis 
                  type="number" 
                  dataKey="y" 
                  name="Blood Pressure (Sys)" 
                  stroke={ANALYTICS_COLORS.gray.text}
                  domain={[100, 160]}
                />
                <ZAxis type="number" dataKey="z" range={[50, 500]} />
                <RechartsTooltip cursor={{ strokeDasharray: '3 3' }} />
                <Legend />
                <Scatter 
                  name="Cluster 1" 
                  data={[
                    { x: 72, y: 118, z: 100 },
                    { x: 74, y: 124, z: 120 },
                    { x: 76, y: 132, z: 150 },
                    { x: 78, y: 140, z: 180 }
                  ]} 
                  fill={ANALYTICS_COLORS.primary.border}
                  shape="circle"
                />
                <Scatter 
                  name="Cluster 2" 
                  data={[
                    { x: 68, y: 110, z: 80 },
                    { x: 70, y: 116, z: 100 },
                    { x: 72, y: 120, z: 120 },
                    { x: 74, y: 126, z: 140 }
                  ]} 
                  fill={ANALYTICS_COLORS.secondary.border}
                  shape="triangle"
                />
              </ScatterChart>
            </ResponsiveContainer>
          </Box>
        );

      case ANALYSIS_TYPES.CORRELATION:
        return (
          <Box sx={{ height: 400 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analyticsData.comparativeAnalytics.deviceComparison}>
                <CartesianGrid strokeDasharray="3 3" stroke={ANALYTICS_COLORS.gray.border} />
                <XAxis dataKey="metric" stroke={ANALYTICS_COLORS.gray.text} />
                <YAxis stroke={ANALYTICS_COLORS.gray.text} />
                <RechartsTooltip />
                <Legend />
                <Bar dataKey="cardiac" fill={ANALYTICS_COLORS.danger.border} name="Cardiac Devices" />
                <Bar dataKey="respiratory" fill={ANALYTICS_COLORS.info.border} name="Respiratory Devices" />
                <Bar dataKey="metabolic" fill={ANALYTICS_COLORS.secondary.border} name="Metabolic Devices" />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        );

      case ANALYSIS_TYPES.ANOMALY:
        return (
          <Box sx={{ height: 400 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analyticsData.trendAnalysis}>
                <CartesianGrid strokeDasharray="3 3" stroke={ANALYTICS_COLORS.gray.border} />
                <XAxis dataKey="time" stroke={ANALYTICS_COLORS.gray.text} />
                <YAxis stroke={ANALYTICS_COLORS.gray.text} />
                <RechartsTooltip />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="cardiac" 
                  stroke={ANALYTICS_COLORS.danger.border} 
                  fill={alpha(ANALYTICS_COLORS.danger.border, 0.3)} 
                  name="Cardiac Anomalies"
                />
                <ReferenceLine y={130} stroke={ANALYTICS_COLORS.danger.border} strokeDasharray="3 3" label="Threshold" />
              </AreaChart>
            </ResponsiveContainer>
          </Box>
        );

      case ANALYSIS_TYPES.PREDICTIVE:
        return (
          <Box sx={{ height: 400 }}>
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={analyticsData.trendAnalysis}>
                <CartesianGrid strokeDasharray="3 3" stroke={ANALYTICS_COLORS.gray.border} />
                <XAxis dataKey="time" stroke={ANALYTICS_COLORS.gray.text} />
                <YAxis stroke={ANALYTICS_COLORS.gray.text} />
                <RechartsTooltip />
                <Legend />
                <Bar dataKey="respiratory" fill={alpha(ANALYTICS_COLORS.info.border, 0.5)} name="Actual" />
                <Line 
                  type="monotone" 
                  dataKey="cardiac" 
                  stroke={ANALYTICS_COLORS.primary.border} 
                  strokeWidth={2}
                  name="Predicted"
                  dot={false}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </Box>
        );

      case ANALYSIS_TYPES.COMPARATIVE:
        return (
          <Box sx={{ height: 400 }}>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={analyticsData.comparativeAnalytics.cohortComparison}>
                <PolarGrid />
                <PolarAngleAxis dataKey="ageGroup" />
                <PolarRadiusAxis />
                <Radar 
                  name="Heart Rate" 
                  dataKey="avgHR" 
                  stroke={ANALYTICS_COLORS.danger.border} 
                  fill={alpha(ANALYTICS_COLORS.danger.border, 0.3)} 
                  fillOpacity={0.6}
                />
                <Radar 
                  name="Glucose" 
                  dataKey="avgGlucose" 
                  stroke={ANALYTICS_COLORS.secondary.border} 
                  fill={alpha(ANALYTICS_COLORS.secondary.border, 0.3)} 
                  fillOpacity={0.6}
                />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </Box>
        );

      default:
        return (
          <Box sx={{ height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography sx={{ color: ANALYTICS_COLORS.gray.text }}>
              Select an analysis type to view visualization
            </Typography>
          </Box>
        );
    }
  };

  // Render tab content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 0: // Data Streams
        return (
          <Box>
            <Card sx={{ 
              borderRadius: 3, 
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
              backgroundColor: ANALYTICS_COLORS.gray.bg,
              border: `2px solid ${ANALYTICS_COLORS.gray.border}`,
              mb: 3
            }}>
              <CardHeader
                title={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <DataObjectIcon sx={{ color: ANALYTICS_COLORS.primary.border }} />
                    <Typography variant="h6" sx={{ color: ANALYTICS_COLORS.primary.text }}>
                      Continuous Data Streams
                    </Typography>
                  </Box>
                }
                subheader="Real-time data feeds from connected medical devices"
              />
              <CardContent>
                <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 'none' }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Stream ID</TableCell>
                        <TableCell>Device Type</TableCell>
                        <TableCell>Data Type</TableCell>
                        <TableCell>Frequency</TableCell>
                        <TableCell>Data Points</TableCell>
                        <TableCell>Quality Score</TableCell>
                        <TableCell>Anomalies</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell align="right">Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {analyticsData.continuousDataStreams.map((stream) => (
                        <TableRow key={stream.id} hover>
                          <TableCell>
                            <Typography variant="body2" fontWeight="bold">
                              {stream.id}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <DeviceHubIcon fontSize="small" sx={{ color: ANALYTICS_COLORS.primary.border }} />
                              <Typography variant="body2">
                                {stream.deviceType}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={stream.dataType}
                              size="small"
                              sx={{ 
                                bgcolor: ANALYTICS_COLORS.info.bg,
                                color: ANALYTICS_COLORS.info.text
                              }}
                            />
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2">
                              {stream.frequency}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" fontWeight="bold">
                              {stream.dataPoints}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <LinearProgress 
                                variant="determinate" 
                                value={stream.qualityScore}
                                sx={{
                                  width: 60,
                                  height: 8,
                                  borderRadius: 4,
                                  bgcolor: ANALYTICS_COLORS.gray.bg,
                                  '& .MuiLinearProgress-bar': {
                                    bgcolor: stream.qualityScore > 95 ? ANALYTICS_COLORS.success.border : 
                                           stream.qualityScore > 90 ? ANALYTICS_COLORS.warning.border : 
                                           ANALYTICS_COLORS.danger.border
                                  }
                                }}
                              />
                              <Typography variant="caption">
                                {stream.qualityScore}%
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={stream.anomalies}
                              size="small"
                              sx={{ 
                                bgcolor: stream.anomalies > 10 ? ANALYTICS_COLORS.danger.bg :
                                       stream.anomalies > 5 ? ANALYTICS_COLORS.warning.bg :
                                       ANALYTICS_COLORS.info.bg,
                                color: stream.anomalies > 10 ? ANALYTICS_COLORS.danger.text :
                                       stream.anomalies > 5 ? ANALYTICS_COLORS.warning.text :
                                       ANALYTICS_COLORS.info.text
                              }}
                            />
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={stream.status.toUpperCase()}
                              size="small"
                              sx={{ 
                                bgcolor: stream.status === 'active' ? ANALYTICS_COLORS.success.bg : ANALYTICS_COLORS.warning.bg,
                                color: stream.status === 'active' ? ANALYTICS_COLORS.success.text : ANALYTICS_COLORS.warning.text
                              }}
                            />
                          </TableCell>
                          <TableCell align="right">
                            <IconButton size="small">
                              <VisibilityIcon fontSize="small" />
                            </IconButton>
                            <IconButton size="small">
                              <DownloadIcon fontSize="small" />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Box>
        );

      case 1: // Patient Signals
        return (
          <Box>
            <Card sx={{ 
              borderRadius: 3, 
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
              backgroundColor: ANALYTICS_COLORS.info.bg,
              border: `2px solid ${ANALYTICS_COLORS.info.border}`,
              mb: 3
            }}>
              <CardHeader
                title={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <TimelineIcon sx={{ color: ANALYTICS_COLORS.info.border }} />
                    <Typography variant="h6" sx={{ color: ANALYTICS_COLORS.info.text }}>
                      Longitudinal Patient Signals
                    </Typography>
                  </Box>
                }
                subheader="Long-term patient monitoring and trend analysis"
              />
              <CardContent>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 4 }}>
                  {analyticsData.longitudinalPatientSignals.map((patient, index) => (
                    <Grow in={true} timeout={500 + index * 100} key={patient.patientId}>
                      <Card sx={{ 
                        flex: '1 1 300px', 
                        borderRadius: 3,
                        backgroundColor: 'white',
                        border: `2px solid ${getDeviceCategoryColor(
                          patient.deviceType.includes('Cardiac') ? DEVICE_CATEGORIES_ANALYTICS.CARDIAC :
                          patient.deviceType.includes('Glucose') ? DEVICE_CATEGORIES_ANALYTICS.METABOLIC :
                          patient.deviceType.includes('Blood') ? DEVICE_CATEGORIES_ANALYTICS.VITAL_SIGNS :
                          DEVICE_CATEGORIES_ANALYTICS.RESPIRATORY
                        ).border}`,
                        transition: 'transform 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-4px)'
                        }
                      }}>
                        <CardContent>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                            <Box>
                              <Typography variant="subtitle1" fontWeight="bold">
                                Patient {patient.patientId}
                              </Typography>
                              <Typography variant="caption" sx={{ color: ANALYTICS_COLORS.gray.text }}>
                                {patient.age}y • {patient.gender} • {patient.condition}
                              </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              {getTrendIcon(patient.trend)}
                              <Chip
                                label={patient.trend.toUpperCase()}
                                size="small"
                                sx={{ 
                                  bgcolor: patient.trend === 'improving' ? ANALYTICS_COLORS.success.bg :
                                         patient.trend === 'stable' ? ANALYTICS_COLORS.info.bg :
                                         ANALYTICS_COLORS.danger.bg,
                                  color: patient.trend === 'improving' ? ANALYTICS_COLORS.success.text :
                                         patient.trend === 'stable' ? ANALYTICS_COLORS.info.text :
                                         ANALYTICS_COLORS.danger.text
                                }}
                              />
                            </Box>
                          </Box>
                          
                          <Divider sx={{ my: 2 }} />
                          
                          <Box sx={{ mb: 2 }}>
                            <Typography variant="caption" sx={{ color: ANALYTICS_COLORS.gray.text, display: 'block', mb: 1 }}>
                              Device & Signal
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                              <Chip
                                icon={<DeviceHubIcon />}
                                label={patient.deviceType}
                                size="small"
                                sx={{ 
                                  bgcolor: ANALYTICS_COLORS.info.bg,
                                  color: ANALYTICS_COLORS.info.text
                                }}
                              />
                              <Chip
                                label={patient.signalType}
                                size="small"
                                variant="outlined"
                              />
                            </Box>
                          </Box>
                          
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                            <Box>
                              <Typography variant="caption" sx={{ color: ANALYTICS_COLORS.gray.text, display: 'block' }}>
                                Baseline
                              </Typography>
                              <Typography variant="body2">
                                {patient.baseline}
                              </Typography>
                            </Box>
                            <Box>
                              <Typography variant="caption" sx={{ color: ANALYTICS_COLORS.gray.text, display: 'block' }}>
                                Current
                              </Typography>
                              <Typography variant="body2" fontWeight="bold">
                                {patient.current}
                              </Typography>
                            </Box>
                            <Box>
                              <Typography variant="caption" sx={{ color: ANALYTICS_COLORS.gray.text, display: 'block' }}>
                                Improvement
                              </Typography>
                              <Typography variant="body2" sx={{ 
                                color: patient.improvement.includes('-') ? ANALYTICS_COLORS.danger.text : ANALYTICS_COLORS.success.text 
                              }}>
                                {patient.improvement}
                              </Typography>
                            </Box>
                          </Box>
                          
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="caption" sx={{ color: ANALYTICS_COLORS.gray.text }}>
                              {patient.dataPoints} data points • {patient.duration}
                            </Typography>
                            <Button size="small" variant="outlined">
                              Analyze
                            </Button>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grow>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Box>
        );

      case 2: // Device Performance
        return (
          <Box>
            <Card sx={{ 
              borderRadius: 3, 
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
              backgroundColor: ANALYTICS_COLORS.warning.bg,
              border: `2px solid ${ANALYTICS_COLORS.warning.border}`,
              mb: 3
            }}>
              <CardHeader
                title={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <AssessmentIcon sx={{ color: ANALYTICS_COLORS.warning.border }} />
                    <Typography variant="h6" sx={{ color: ANALYTICS_COLORS.warning.text }}>
                      Device Performance Benchmarking
                    </Typography>
                  </Box>
                }
                subheader="Accuracy, reliability, and usage efficiency metrics"
              />
              <CardContent>
                <Box sx={{ height: 300, mb: 4 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={analyticsData.devicePerformance}>
                      <CartesianGrid strokeDasharray="3 3" stroke={ANALYTICS_COLORS.gray.border} />
                      <XAxis dataKey="deviceType" stroke={ANALYTICS_COLORS.gray.text} />
                      <YAxis stroke={ANALYTICS_COLORS.gray.text} />
                      <RechartsTooltip />
                      <Legend />
                      <Bar dataKey="accuracy" fill={ANALYTICS_COLORS.success.border} name="Accuracy %" />
                      <Bar dataKey="reliability" fill={ANALYTICS_COLORS.info.border} name="Reliability %" />
                      <Bar dataKey="usageEfficiency" fill={ANALYTICS_COLORS.warning.border} name="Usage Efficiency %" />
                    </BarChart>
                  </ResponsiveContainer>
                </Box>

                <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 'none' }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Device ID</TableCell>
                        <TableCell>Device Type</TableCell>
                        <TableCell align="right">Accuracy</TableCell>
                        <TableCell align="right">Reliability</TableCell>
                        <TableCell align="right">Uptime</TableCell>
                        <TableCell align="right">Response Time</TableCell>
                        <TableCell align="right">Calibration</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {analyticsData.devicePerformance.map((device) => (
                        <TableRow key={device.deviceId} hover>
                          <TableCell>
                            <Typography variant="body2" fontWeight="bold">
                              {device.deviceId}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2">
                              {device.deviceType}
                            </Typography>
                          </TableCell>
                          <TableCell align="right">
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 1 }}>
                              <LinearProgress 
                                variant="determinate" 
                                value={device.accuracy}
                                sx={{
                                  width: 60,
                                  height: 8,
                                  borderRadius: 4,
                                  bgcolor: ANALYTICS_COLORS.gray.bg,
                                  '& .MuiLinearProgress-bar': {
                                    bgcolor: device.accuracy > 97 ? ANALYTICS_COLORS.success.border : 
                                           device.accuracy > 95 ? ANALYTICS_COLORS.warning.border : 
                                           ANALYTICS_COLORS.danger.border
                                  }
                                }}
                              />
                              <Typography variant="body2">
                                {device.accuracy}%
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell align="right">
                            <Typography variant="body2" sx={{ color: ANALYTICS_COLORS.info.text }}>
                              {device.reliability}%
                            </Typography>
                          </TableCell>
                          <TableCell align="right">
                            <Typography variant="body2" sx={{ color: ANALYTICS_COLORS.success.text }}>
                              {device.uptime}
                            </Typography>
                          </TableCell>
                          <TableCell align="right">
                            <Typography variant="body2">
                              {device.avgResponseTime}
                            </Typography>
                          </TableCell>
                          <TableCell align="right">
                            <Chip
                              label={`${device.calibrationCount}x`}
                              size="small"
                              sx={{ 
                                bgcolor: ANALYTICS_COLORS.info.bg,
                                color: ANALYTICS_COLORS.info.text
                              }}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Box>
        );

      case 3: // ML Models
        return (
          <Box>
            <Card sx={{ 
              borderRadius: 3, 
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
              backgroundColor: ANALYTICS_COLORS.purple.bg,
              border: `2px solid ${ANALYTICS_COLORS.purple.border}`,
              mb: 3
            }}>
              <CardHeader
                title={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <PsychologyIcon sx={{ color: ANALYTICS_COLORS.purple.border }} />
                    <Typography variant="h6" sx={{ color: ANALYTICS_COLORS.purple.text }}>
                      Machine Learning Models
                    </Typography>
                  </Box>
                }
                subheader="AI-powered predictive models for clinical insights"
                action={
                  <Button
                    variant="contained"
                    startIcon={<ModelTrainingIcon />}
                    onClick={handleOpenMlTrainingDialog}
                    sx={{ bgcolor: ANALYTICS_COLORS.purple.border }}
                  >
                    Train New Model
                  </Button>
                }
              />
              <CardContent>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 4 }}>
                  {analyticsData.mlModels.map((model, index) => (
                    <Grow in={true} timeout={500 + index * 100} key={model.id}>
                      <Card sx={{ 
                        flex: '1 1 300px', 
                        borderRadius: 3,
                        backgroundColor: 'white',
                        border: `2px solid ${ANALYTICS_COLORS.purple.border}`,
                        transition: 'transform 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-4px)'
                        }
                      }}>
                        <CardContent>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                            <Box>
                              <Typography variant="subtitle1" fontWeight="bold" sx={{ color: ANALYTICS_COLORS.purple.text }}>
                                {model.name}
                              </Typography>
                              <Chip
                                label={model.type}
                                size="small"
                                sx={{ 
                                  mt: 0.5,
                                  bgcolor: ANALYTICS_COLORS.info.bg,
                                  color: ANALYTICS_COLORS.info.text
                                }}
                              />
                            </Box>
                            <Chip
                              label={model.status.toUpperCase()}
                              size="small"
                              sx={{ 
                                bgcolor: getStatusColor(model.status).bg,
                                color: getStatusColor(model.status).text
                              }}
                            />
                          </Box>
                          
                          <Divider sx={{ my: 2 }} />
                          
                          <Box sx={{ mb: 2 }}>
                            <Typography variant="caption" sx={{ color: ANALYTICS_COLORS.gray.text, display: 'block', mb: 1 }}>
                              Performance Metrics
                            </Typography>
                            <Grid container spacing={2}>
                              <Grid item xs={6}>
                                <Box>
                                  <Typography variant="caption" sx={{ color: ANALYTICS_COLORS.gray.text, display: 'block' }}>
                                    Accuracy
                                  </Typography>
                                  <Typography variant="body2" fontWeight="bold" sx={{ color: ANALYTICS_COLORS.success.text }}>
                                    {model.accuracy}%
                                  </Typography>
                                </Box>
                              </Grid>
                              <Grid item xs={6}>
                                <Box>
                                  <Typography variant="caption" sx={{ color: ANALYTICS_COLORS.gray.text, display: 'block' }}>
                                    F1 Score
                                  </Typography>
                                  <Typography variant="body2" fontWeight="bold" sx={{ color: ANALYTICS_COLORS.info.text }}>
                                    {model.f1Score}%
                                  </Typography>
                                </Box>
                              </Grid>
                              <Grid item xs={6}>
                                <Box>
                                  <Typography variant="caption" sx={{ color: ANALYTICS_COLORS.gray.text, display: 'block' }}>
                                    Precision
                                  </Typography>
                                  <Typography variant="body2" sx={{ color: ANALYTICS_COLORS.warning.text }}>
                                    {model.precision}%
                                  </Typography>
                                </Box>
                              </Grid>
                              <Grid item xs={6}>
                                <Box>
                                  <Typography variant="caption" sx={{ color: ANALYTICS_COLORS.gray.text, display: 'block' }}>
                                    Recall
                                  </Typography>
                                  <Typography variant="body2" sx={{ color: ANALYTICS_COLORS.primary.text }}>
                                    {model.recall}%
                                  </Typography>
                                </Box>
                              </Grid>
                            </Grid>
                          </Box>
                          
                          <Divider sx={{ my: 2 }} />
                          
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="caption" sx={{ color: ANALYTICS_COLORS.gray.text }}>
                              {model.trainingData} • Updated: {formatDate(model.lastUpdated)}
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 1 }}>
                              <IconButton size="small">
                                <VisibilityIcon fontSize="small" />
                              </IconButton>
                              <IconButton size="small">
                                <DownloadIcon fontSize="small" />
                              </IconButton>
                            </Box>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grow>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Box>
        );

      case 4: // FDA Insights
        return (
          <Box>
            <Card sx={{ 
              borderRadius: 3, 
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
              backgroundColor: ANALYTICS_COLORS.success.bg,
              border: `2px solid ${ANALYTICS_COLORS.success.border}`,
              mb: 3
            }}>
              <CardHeader
                title={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <SecurityIcon sx={{ color: ANALYTICS_COLORS.success.border }} />
                    <Typography variant="h6" sx={{ color: ANALYTICS_COLORS.success.text }}>
                      FDA Reporting & Compliance
                    </Typography>
                  </Box>
                }
                subheader="Structured analytics for regulatory submissions"
              />
              <CardContent>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 4 }}>
                  {analyticsData.fdaInsights.map((report, index) => (
                    <Grow in={true} timeout={500 + index * 100} key={report.id}>
                      <Card sx={{ 
                        flex: '1 1 300px', 
                        borderRadius: 3,
                        backgroundColor: 'white',
                        border: `2px solid ${getStatusColor(report.status).border}`,
                        transition: 'transform 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-4px)'
                        }
                      }}>
                        <CardContent>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                            <Box>
                              <Typography variant="subtitle1" fontWeight="bold">
                                {report.reportType}
                              </Typography>
                              <Typography variant="caption" sx={{ color: ANALYTICS_COLORS.gray.text }}>
                                {report.deviceType}
                              </Typography>
                            </Box>
                            <Chip
                              label={report.status.replace('_', ' ').toUpperCase()}
                              size="small"
                              sx={{ 
                                bgcolor: getStatusColor(report.status).bg,
                                color: getStatusColor(report.status).text
                              }}
                            />
                          </Box>
                          
                          <Divider sx={{ my: 2 }} />
                          
                          <Box sx={{ mb: 2 }}>
                            <Grid container spacing={2}>
                              <Grid item xs={6}>
                                <Box>
                                  <Typography variant="caption" sx={{ color: ANALYTICS_COLORS.gray.text, display: 'block' }}>
                                    Accuracy Data
                                  </Typography>
                                  <Typography variant="body2" fontWeight="bold" sx={{ color: ANALYTICS_COLORS.success.text }}>
                                    {report.accuracyData}
                                  </Typography>
                                </Box>
                              </Grid>
                              <Grid item xs={6}>
                                <Box>
                                  <Typography variant="caption" sx={{ color: ANALYTICS_COLORS.gray.text, display: 'block' }}>
                                    Safety Data
                                  </Typography>
                                  <Typography variant="body2" fontWeight="bold" sx={{ color: ANALYTICS_COLORS.info.text }}>
                                    {report.safetyData}
                                  </Typography>
                                </Box>
                              </Grid>
                              <Grid item xs={12}>
                                <Box>
                                  <Typography variant="caption" sx={{ color: ANALYTICS_COLORS.gray.text, display: 'block' }}>
                                    Compliance Score
                                  </Typography>
                                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <LinearProgress 
                                      variant="determinate" 
                                      value={report.complianceScore}
                                      sx={{
                                        flex: 1,
                                        height: 8,
                                        borderRadius: 4,
                                        bgcolor: ANALYTICS_COLORS.gray.bg,
                                        '& .MuiLinearProgress-bar': {
                                          bgcolor: report.complianceScore > 95 ? ANALYTICS_COLORS.success.border : 
                                                 report.complianceScore > 90 ? ANALYTICS_COLORS.warning.border : 
                                                 ANALYTICS_COLORS.danger.border
                                        }
                                      }}
                                    />
                                    <Typography variant="body2">
                                      {report.complianceScore}%
                                    </Typography>
                                  </Box>
                                </Box>
                              </Grid>
                            </Grid>
                          </Box>
                          
                          <Divider sx={{ my: 2 }} />
                          
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="caption" sx={{ color: ANALYTICS_COLORS.gray.text }}>
                              {report.submissionDate ? `Submitted: ${formatDate(report.submissionDate)}` : 'Not submitted'}
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 1 }}>
                              <Button size="small" variant="outlined">
                                View Report
                              </Button>
                              <Button size="small" variant="contained">
                                Export
                              </Button>
                            </Box>
                          </Box>
                        </CardContent>
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

  if (loading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        flexDirection: 'column',
        gap: 3
      }}>
        <Box sx={{ width: '300px', textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom sx={{ color: ANALYTICS_COLORS.primary.text }}>
            Loading Analytics Lab
          </Typography>
          <LinearProgress sx={{ height: 8, borderRadius: 4, bgcolor: ANALYTICS_COLORS.primary.bg }} />
          <Typography variant="body2" sx={{ mt: 2, color: ANALYTICS_COLORS.gray.text }}>
            Processing device data and generating insights...
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Fade in={true} timeout={500}>
      <Box sx={{ 
        p: 3, 
        backgroundColor: '#F8FAFC', 
        minHeight: '100vh',
        maxWidth: '100%',
        overflowX: 'hidden'
      }}>
        {/* Header */}
        <Grow in={true} timeout={700}>
          <Box sx={{ 
            mb: 4,
            p: 3,
            borderRadius: 3,
            backgroundColor: ANALYTICS_COLORS.primary.bg,
            border: `2px solid ${ANALYTICS_COLORS.primary.border}`,
            position: 'relative',
            overflow: 'hidden'
          }}>
            <Box sx={{ 
              position: 'absolute', 
              top: 0, 
              right: 0,
              width: 300,
              height: 300,
              background: `radial-gradient(circle, ${alpha(ANALYTICS_COLORS.primary.border, 0.1)} 0%, transparent 70%)`,
              transform: 'translate(30%, -30%)'
            }} />
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                  <Avatar sx={{ 
                    bgcolor: alpha(ANALYTICS_COLORS.primary.border, 0.1), 
                    color: ANALYTICS_COLORS.primary.border,
                    width: 56,
                    height: 56
                  }}>
                    <AnalyticsIcon fontSize="large" />
                  </Avatar>
                  <Box>
                    <Typography variant="h3" fontWeight="bold" sx={{ color: ANALYTICS_COLORS.primary.text }}>
                      Data Analytics Lab
                    </Typography>
                    <Typography variant="body1" sx={{ color: ANALYTICS_COLORS.primary.text }}>
                      AI-powered insights for clinical research and device optimization
                    </Typography>
                  </Box>
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 1 }}>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Chip
                    icon={<ScienceIcon />}
                    label="RESEARCH MODE"
                    sx={{
                      bgcolor: viewMode === 'research' ? ANALYTICS_COLORS.research.border : ANALYTICS_COLORS.clinical.border,
                      color: 'white',
                      fontWeight: 'bold'
                    }}
                    size="small"
                    onClick={() => handleViewModeChange(viewMode === 'clinical' ? 'research' : 'clinical')}
                  />
                  <Chip
                    icon={<PsychologyIcon />}
                    label="AI-ENABLED"
                    sx={{
                      bgcolor: ANALYTICS_COLORS.purple.border,
                      color: 'white',
                      fontWeight: 'bold'
                    }}
                    size="small"
                  />
                </Box>
                <Typography variant="caption" sx={{ color: ANALYTICS_COLORS.primary.text }}>
                  {analyticsData.summary.totalDataPoints} data points analyzed
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    variant="outlined"
                    startIcon={<CloudDownloadIcon />}
                    onClick={handleOpenExportDialog}
                    sx={{ 
                      borderRadius: 2,
                      borderColor: ANALYTICS_COLORS.primary.border,
                      color: ANALYTICS_COLORS.primary.border
                    }}
                  >
                    Export Data
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<RefreshIcon />}
                    onClick={handleRefresh}
                    sx={{ 
                      borderRadius: 2,
                      bgcolor: ANALYTICS_COLORS.primary.border,
                      '&:hover': {
                        bgcolor: alpha(ANALYTICS_COLORS.primary.border, 0.9)
                      }
                    }}
                  >
                    Refresh Analysis
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
              title: 'Data Points', 
              value: analyticsData.summary.totalDataPoints, 
              icon: <DataObjectIcon />, 
              color: ANALYTICS_COLORS.primary,
              trend: '+125k',
              description: 'Analyzed'
            },
            { 
              title: 'Active Devices', 
              value: analyticsData.summary.activeDevices, 
              icon: <DeviceHubIcon />, 
              color: ANALYTICS_COLORS.info,
              trend: '+3',
              description: 'Streaming data'
            },
            { 
              title: 'ML Models', 
              value: analyticsData.summary.mlModels, 
              icon: <PsychologyIcon />, 
              color: ANALYTICS_COLORS.purple,
              trend: '+1',
              description: 'AI-powered'
            },
            { 
              title: 'Avg Accuracy', 
              value: analyticsData.summary.avgAccuracy, 
              icon: <CheckCircleIcon />, 
              color: ANALYTICS_COLORS.success,
              trend: '+0.3%',
              description: 'Model performance'
            },
            { 
              title: 'Anomalies', 
              value: analyticsData.summary.anomaliesDetected, 
              icon: <WarningIcon />, 
              color: ANALYTICS_COLORS.danger,
              trend: '+2',
              description: 'Detected'
            },
            { 
              title: 'Research Studies', 
              value: analyticsData.summary.researchStudies, 
              icon: <ResearchIcon />, 
              color: ANALYTICS_COLORS.research,
              trend: '+1',
              description: 'Active studies'
            }
          ].map((item, index) => (
            <Grow in={true} timeout={800 + index * 100} key={item.title}>
              <Card sx={{ 
                flex: '1 1 250px', 
                borderRadius: 3, 
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                backgroundColor: item.color.bg,
                border: `2px solid ${item.color.border}`,
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)'
                }
              }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ 
                      bgcolor: alpha(item.color.border, 0.1), 
                      color: item.color.border 
                    }}>
                      {item.icon}
                    </Avatar>
                    <Chip
                      label={item.trend}
                      size="small"
                      sx={{ 
                        bgcolor: alpha(item.color.border, 0.1),
                        color: item.color.border,
                        fontWeight: 'bold'
                      }}
                    />
                  </Box>
                  <Typography variant="h3" fontWeight="bold" sx={{ color: item.color.text, mb: 0.5 }}>
                    {item.value}
                  </Typography>
                  <Typography variant="body2" sx={{ color: item.color.text, fontWeight: 'medium' }}>
                    {item.title}
                  </Typography>
                  <Typography variant="caption" sx={{ color: alpha(item.color.text, 0.7), display: 'block' }}>
                    {item.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grow>
          ))}
        </Box>

        {/* Analysis Type Selector */}
        <Card sx={{ 
          mb: 4, 
          borderRadius: 3,
          backgroundColor: ANALYTICS_COLORS.gray.bg,
          border: `2px solid ${ANALYTICS_COLORS.gray.border}`
        }}>
          <CardContent>
            <Typography variant="subtitle2" sx={{ color: ANALYTICS_COLORS.gray.text, mb: 2 }}>
              Analysis Type
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
              {Object.values(ANALYSIS_TYPES).map((type) => (
                <Button
                  key={type}
                  variant={analysisType === type ? 'contained' : 'outlined'}
                  startIcon={
                    type === ANALYSIS_TYPES.TREND ? <TimelineIcon /> :
                    type === ANALYSIS_TYPES.CLUSTER ? <BubbleChartIcon /> :
                    type === ANALYSIS_TYPES.CORRELATION ? <ScatterPlotIcon /> :
                    type === ANALYSIS_TYPES.ANOMALY ? <WarningIcon /> :
                    type === ANALYSIS_TYPES.PREDICTIVE ? <AutoGraphIcon /> :
                    <CompareIcon />
                  }
                  onClick={() => handleAnalysisTypeChange(type)}
                  sx={{ 
                    borderRadius: 2,
                    ...(analysisType === type ? {
                      bgcolor: getAnalysisTypeColor(type).border,
                      '&:hover': { bgcolor: alpha(getAnalysisTypeColor(type).border, 0.9) }
                    } : {
                      borderColor: getAnalysisTypeColor(type).border,
                      color: getAnalysisTypeColor(type).text
                    })
                  }}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)} Analysis
                </Button>
              ))}
            </Box>
          </CardContent>
        </Card>

        {/* Control Bar */}
        <Box sx={{ display: 'flex', gap: 2, mb: 4, flexWrap: 'wrap', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', gap: 2, flex: '1 1 300px', flexWrap: 'wrap' }}>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Time Range</InputLabel>
              <Select
                value={timeRange}
                label="Time Range"
                onChange={(e) => handleTimeRangeChange(e.target.value)}
              >
                {Object.values(TIME_RANGES).map((range) => (
                  <MenuItem key={range} value={range}>{range}</MenuItem>
                ))}
              </Select>
            </FormControl>
            
            <FormControl size="small" sx={{ minWidth: 140 }}>
              <InputLabel>Device Category</InputLabel>
              <Select
                value={deviceCategory}
                label="Device Category"
                onChange={(e) => handleDeviceCategoryChange(e.target.value)}
              >
                <MenuItem value="all">All Categories</MenuItem>
                {Object.values(DEVICE_CATEGORIES_ANALYTICS).map((category) => (
                  <MenuItem key={category} value={category}>
                    {category.replace('_', ' ').toUpperCase()}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            
            <FormControl size="small" sx={{ minWidth: 140 }}>
              <InputLabel>Patient Group</InputLabel>
              <Select
                value={patientGroup}
                label="Patient Group"
                onChange={(e) => handlePatientGroupChange(e.target.value)}
              >
                <MenuItem value="all">All Groups</MenuItem>
                <MenuItem value="age_18_35">Age 18-35</MenuItem>
                <MenuItem value="age_36_50">Age 36-50</MenuItem>
                <MenuItem value="age_51_65">Age 51-65</MenuItem>
                <MenuItem value="age_66_plus">Age 66+</MenuItem>
              </Select>
            </FormControl>
            
            <Button
              variant="outlined"
              startIcon={<FilterIcon />}
              onClick={handleFilterClick}
              sx={{ 
                borderRadius: 2,
                borderColor: ANALYTICS_COLORS.gray.border,
                color: ANALYTICS_COLORS.gray.text
              }}
            >
              Advanced Filters
            </Button>
          </Box>
          
          <TextField
            placeholder="Search insights, anomalies, or patterns..."
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ 
              flex: '1 1 300px',
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                bgcolor: 'white'
              }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: ANALYTICS_COLORS.gray.border }} />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {/* Main Analysis Visualization */}
        <Card sx={{ 
          mb: 4, 
          borderRadius: 3,
          backgroundColor: 'white',
          border: `2px solid ${getAnalysisTypeColor(analysisType).border}`,
          boxShadow: `0 4px 20px ${alpha(getAnalysisTypeColor(analysisType).border, 0.1)}`
        }}>
          <CardHeader
            title={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                {analysisType === ANALYSIS_TYPES.TREND ? <TimelineIcon /> :
                 analysisType === ANALYSIS_TYPES.CLUSTER ? <BubbleChartIcon /> :
                 analysisType === ANALYSIS_TYPES.CORRELATION ? <ScatterPlotIcon /> :
                 analysisType === ANALYSIS_TYPES.ANOMALY ? <WarningIcon /> :
                 analysisType === ANALYSIS_TYPES.PREDICTIVE ? <AutoGraphIcon /> :
                 <CompareIcon />}
                <Typography variant="h6" sx={{ color: getAnalysisTypeColor(analysisType).text }}>
                  {analysisType.charAt(0).toUpperCase() + analysisType.slice(1)} Analysis
                </Typography>
              </Box>
            }
            subheader={`${timeRange} • ${deviceCategory === 'all' ? 'All Devices' : deviceCategory} • ${patientGroup === 'all' ? 'All Patients' : patientGroup}`}
            action={
              <Box sx={{ display: 'flex', gap: 1 }}>
                <IconButton>
                  <DownloadIcon />
                </IconButton>
                <IconButton>
                  <PrintIcon />
                </IconButton>
                <IconButton>
                  <ShareIcon />
                </IconButton>
              </Box>
            }
          />
          <CardContent>
            {renderAnalysisChart()}
            
            <Box sx={{ mt: 4, display: 'flex', gap: 3, flexWrap: 'wrap' }}>
              <Card sx={{ flex: '1 1 200px', p: 2, borderRadius: 2, bgcolor: ANALYTICS_COLORS.info.bg }}>
                <Typography variant="caption" sx={{ color: ANALYTICS_COLORS.gray.text, display: 'block' }}>
                  Correlation Strength
                </Typography>
                <Typography variant="h5" sx={{ color: ANALYTICS_COLORS.info.text }}>
                  0.87
                </Typography>
              </Card>
              <Card sx={{ flex: '1 1 200px', p: 2, borderRadius: 2, bgcolor: ANALYTICS_COLORS.success.bg }}>
                <Typography variant="caption" sx={{ color: ANALYTICS_COLORS.gray.text, display: 'block' }}>
                  Statistical Significance
                </Typography>
                <Typography variant="h5" sx={{ color: ANALYTICS_COLORS.success.text }}>
                   0.01
                </Typography>
              </Card>
              <Card sx={{ flex: '1 1 200px', p: 2, borderRadius: 2, bgcolor: ANALYTICS_COLORS.warning.bg }}>
                <Typography variant="caption" sx={{ color: ANALYTICS_COLORS.gray.text, display: 'block' }}>
                  Sample Size
                </Typography>
                <Typography variant="h5" sx={{ color: ANALYTICS_COLORS.warning.text }}>
                  1,245
                </Typography>
              </Card>
              <Card sx={{ flex: '1 1 200px', p: 2, borderRadius: 2, bgcolor: ANALYTICS_COLORS.danger.bg }}>
                <Typography variant="caption" sx={{ color: ANALYTICS_COLORS.gray.text, display: 'block' }}>
                  Anomalies Detected
                </Typography>
                <Typography variant="h5" sx={{ color: ANALYTICS_COLORS.danger.text }}>
                  12
                </Typography>
              </Card>
            </Box>
          </CardContent>
        </Card>

        {/* Tabs for Detailed Views */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs 
            value={activeTab} 
            onChange={(e, newValue) => setActiveTab(newValue)}
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab 
              label="Data Streams" 
              icon={<DataObjectIcon />} 
              iconPosition="start" 
              sx={{ minHeight: 48 }}
            />
            <Tab 
              label="Patient Signals" 
              icon={<TimelineIcon />} 
              iconPosition="start" 
              sx={{ minHeight: 48 }}
            />
            <Tab 
              label="Device Performance" 
              icon={<AssessmentIcon />} 
              iconPosition="start" 
              sx={{ minHeight: 48 }}
            />
            <Tab 
              label="ML Models" 
              icon={<PsychologyIcon />} 
              iconPosition="start" 
              sx={{ minHeight: 48 }}
            />
            <Tab 
              label="FDA Insights" 
              icon={<SecurityIcon />} 
              iconPosition="start" 
              sx={{ minHeight: 48 }}
            />
            <Tab 
              label="Significant Anomalies" 
              icon={<WarningIcon />} 
              iconPosition="start" 
              sx={{ minHeight: 48 }}
            />
          </Tabs>
        </Box>

        {/* Tab Content */}
        <Fade in={true} timeout={300} key={activeTab}>
          <Box>
            {activeTab === 5 ? (
              <Card sx={{ 
                borderRadius: 3, 
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                backgroundColor: ANALYTICS_COLORS.danger.bg,
                border: `2px solid ${ANALYTICS_COLORS.danger.border}`,
                mb: 3
              }}>
                <CardHeader
                  title={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <WarningIcon sx={{ color: ANALYTICS_COLORS.danger.border }} />
                      <Typography variant="h6" sx={{ color: ANALYTICS_COLORS.danger.text }}>
                        Significant Anomalies & Trends
                      </Typography>
                    </Box>
                  }
                  subheader="Statistically significant deviations requiring attention"
                />
                <CardContent>
                  <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 'none' }}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell padding="checkbox">
                            <Checkbox
                              indeterminate={selectedInsights.length > 0 && selectedInsights.length < filteredAnomalies.length}
                              checked={filteredAnomalies.length > 0 && selectedInsights.length === filteredAnomalies.length}
                              onChange={handleSelectAllClick}
                            />
                          </TableCell>
                          <TableCell>
                            <TableSortLabel
                              active={orderBy === 'severity'}
                              direction={orderBy === 'severity' ? order : 'asc'}
                              onClick={() => handleRequestSort('severity')}
                            >
                              Severity
                            </TableSortLabel>
                          </TableCell>
                          <TableCell>Type</TableCell>
                          <TableCell>Device & Patient</TableCell>
                          <TableCell>
                            <TableSortLabel
                              active={orderBy === 'confidence'}
                              direction={orderBy === 'confidence' ? order : 'asc'}
                              onClick={() => handleRequestSort('confidence')}
                            >
                              Confidence
                            </TableSortLabel>
                          </TableCell>
                          <TableCell>Value vs Baseline</TableCell>
                          <TableCell>Timestamp</TableCell>
                          <TableCell align="right">Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {paginatedAnomalies.map((anomaly) => {
                          const isSelected = selectedInsights.indexOf(anomaly.id) !== -1;
                          const severityColor = getSeverityColor(anomaly.severity);

                          return (
                            <TableRow
                              key={anomaly.id}
                              hover
                              selected={isSelected}
                              sx={{ 
                                '&:hover': {
                                  backgroundColor: alpha(severityColor.border, 0.05)
                                }
                              }}
                            >
                              <TableCell padding="checkbox">
                                <Checkbox
                                  checked={isSelected}
                                  onChange={() => handleInsightSelect(anomaly.id)}
                                />
                              </TableCell>
                              <TableCell>
                                <Chip
                                  label={anomaly.severity.toUpperCase()}
                                  size="small"
                                  sx={{ 
                                    bgcolor: severityColor.bg,
                                    color: severityColor.text
                                  }}
                                />
                              </TableCell>
                              <TableCell>
                                <Typography variant="body2" fontWeight="medium">
                                  {anomaly.type}
                                </Typography>
                              </TableCell>
                              <TableCell>
                                <Box>
                                  <Typography variant="body2">
                                    {anomaly.deviceId}
                                  </Typography>
                                  <Typography variant="caption" sx={{ color: ANALYTICS_COLORS.gray.text }}>
                                    Patient {anomaly.patientId}
                                  </Typography>
                                </Box>
                              </TableCell>
                              <TableCell>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                  <CircularProgress 
                                    variant="determinate" 
                                    value={anomaly.confidence}
                                    size={24}
                                    thickness={4}
                                    sx={{ 
                                      color: anomaly.confidence > 95 ? ANALYTICS_COLORS.success.border :
                                             anomaly.confidence > 90 ? ANALYTICS_COLORS.warning.border :
                                             ANALYTICS_COLORS.danger.border
                                    }}
                                  />
                                  <Typography variant="body2">
                                    {anomaly.confidence}%
                                  </Typography>
                                </Box>
                              </TableCell>
                              <TableCell>
                                <Box>
                                  <Typography variant="body2">
                                    {anomaly.value}
                                  </Typography>
                                  <Typography variant="caption" sx={{ color: ANALYTICS_COLORS.gray.text }}>
                                    Baseline: {anomaly.baseline}
                                  </Typography>
                                </Box>
                              </TableCell>
                              <TableCell>
                                <Typography variant="body2">
                                  {formatDateTime(anomaly.timestamp)}
                                </Typography>
                              </TableCell>
                              <TableCell align="right">
                                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                                  <Tooltip title="View Details">
                                    <IconButton 
                                      size="small"
                                      onClick={() => handleViewInsight(anomaly)}
                                    >
                                      <VisibilityIcon fontSize="small" />
                                    </IconButton>
                                  </Tooltip>
                                  <Tooltip title="Export">
                                    <IconButton size="small">
                                      <DownloadIcon fontSize="small" />
                                    </IconButton>
                                  </Tooltip>
                                </Box>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={filteredAnomalies.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </CardContent>
              </Card>
            ) : (
              renderTabContent()
            )}
          </Box>
        </Fade>

        {/* Research & Clinical Section */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mt: 4 }}>
          {/* Research Studies */}
          <Card sx={{ 
            flex: '1 1 500px', 
            borderRadius: 3, 
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
            backgroundColor: ANALYTICS_COLORS.research.bg,
            border: `2px solid ${ANALYTICS_COLORS.research.border}`
          }}>
            <CardHeader
              title={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <ResearchIcon sx={{ color: ANALYTICS_COLORS.research.border }} />
                  <Typography variant="h6" sx={{ color: ANALYTICS_COLORS.research.text }}>
                    Active Research Studies
                  </Typography>
                </Box>
              }
            />
            <CardContent>
              <List sx={{ maxHeight: 300, overflow: 'auto' }}>
                {analyticsData.researchStudies.map((study) => (
                  <ListItem key={study.id} sx={{ py: 2 }}>
                    <ListItemAvatar>
                      <Avatar sx={{ 
                        bgcolor: alpha(ANALYTICS_COLORS.research.border, 0.1), 
                        color: ANALYTICS_COLORS.research.border 
                      }}>
                        <ScienceIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={study.title}
                      secondary={
                        <Box>
                          <Typography variant="caption" sx={{ color: ANALYTICS_COLORS.gray.text, display: 'block' }}>
                            {study.leadResearcher} • {study.institution}
                          </Typography>
                          <Typography variant="caption" sx={{ color: ANALYTICS_COLORS.gray.text }}>
                            {study.patientsEnrolled} patients • {study.duration} • {study.insights}
                          </Typography>
                        </Box>
                      }
                    />
                    <ListItemSecondaryAction>
                      <Chip
                        label={study.status.toUpperCase()}
                        size="small"
                        sx={{ 
                          bgcolor: getStatusColor(study.status).bg,
                          color: getStatusColor(study.status).text
                        }}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>

          {/* Recent Activities */}
          <Card sx={{ 
            flex: '1 1 400px', 
            borderRadius: 3, 
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
            backgroundColor: ANALYTICS_COLORS.info.bg,
            border: `2px solid ${ANALYTICS_COLORS.info.border}`
          }}>
            <CardHeader
              title={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <ScienceIcon sx={{ color: ANALYTICS_COLORS.info.border }} />
                  <Typography variant="h6" sx={{ color: ANALYTICS_COLORS.info.text }}>
                    Recent Analytics Activities
                  </Typography>
                </Box>
              }
            />
            <CardContent>
              <List sx={{ maxHeight: 300, overflow: 'auto' }}>
                {analyticsData.recentActivities.map((activity) => (
                  <ListItem key={activity.id} sx={{ py: 1 }}>
                    <ListItemAvatar>
                      <Avatar sx={{ 
                        width: 32, 
                        height: 32, 
                        bgcolor: alpha(ANALYTICS_COLORS.info.border, 0.1),
                        color: ANALYTICS_COLORS.info.border 
                      }}>
                        {activity.action.charAt(0)}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={activity.action}
                      secondary={`${activity.model || activity.report || activity.device || activity.cohort} • ${activity.time}`}
                      primaryTypographyProps={{ variant: 'body2' }}
                      secondaryTypographyProps={{ variant: 'caption' }}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Box>

        {/* ML Training Dialog */}
        <Dialog 
          open={mlTrainingDialogOpen} 
          onClose={handleCloseMlTrainingDialog}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar sx={{ 
                bgcolor: alpha(ANALYTICS_COLORS.purple.border, 0.1), 
                color: ANALYTICS_COLORS.purple.border 
              }}>
                <ModelTrainingIcon />
              </Avatar>
              <Box>
                <Typography variant="h6">Train New ML Model</Typography>
                <Typography variant="caption" sx={{ color: ANALYTICS_COLORS.gray.text }}>
                  Configure parameters for machine learning model training
                </Typography>
              </Box>
            </Box>
          </DialogTitle>
          <DialogContent dividers>
            <Box sx={{ mt: 2 }}>
              <FormControl fullWidth size="small" sx={{ mb: 3 }}>
                <InputLabel>Model Type</InputLabel>
                <Select
                  value={mlTraining.modelType}
                  label="Model Type"
                  onChange={(e) => handleMlTrainingChange('modelType', e.target.value)}
                >
                  <MenuItem value="LSTM">LSTM (Time Series)</MenuItem>
                  <MenuItem value="XGBoost">XGBoost (Ensemble)</MenuItem>
                  <MenuItem value="Random Forest">Random Forest</MenuItem>
                  <MenuItem value="Neural Network">Neural Network</MenuItem>
                  <MenuItem value="CNN">CNN (Image Data)</MenuItem>
                </Select>
              </FormControl>
              
              <FormControl fullWidth size="small" sx={{ mb: 3 }}>
                <InputLabel>Target Metric</InputLabel>
                <Select
                  value={mlTraining.targetMetric}
                  label="Target Metric"
                  onChange={(e) => handleMlTrainingChange('targetMetric', e.target.value)}
                >
                  <MenuItem value="accuracy">Accuracy</MenuItem>
                  <MenuItem value="precision">Precision</MenuItem>
                  <MenuItem value="recall">Recall</MenuItem>
                  <MenuItem value="f1">F1 Score</MenuItem>
                </Select>
              </FormControl>
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" sx={{ color: ANALYTICS_COLORS.gray.text, mb: 1 }}>
                  Training Data Size: {mlTraining.trainingDataSize.toLocaleString()} samples
                </Typography>
                <Slider
                  value={mlTraining.trainingDataSize}
                  onChange={(e, value) => handleMlTrainingChange('trainingDataSize', value)}
                  min={10000}
                  max={1000000}
                  step={10000}
                  valueLabelDisplay="auto"
                  valueLabelFormat={(value) => value.toLocaleString()}
                />
              </Box>
              
              <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                <TextField
                  fullWidth
                  label="Epochs"
                  type="number"
                  value={mlTraining.epochs}
                  onChange={(e) => handleMlTrainingChange('epochs', parseInt(e.target.value))}
                  variant="outlined"
                  size="small"
                />
                <TextField
                  fullWidth
                  label="Learning Rate"
                  type="number"
                  value={mlTraining.learningRate}
                  onChange={(e) => handleMlTrainingChange('learningRate', parseFloat(e.target.value))}
                  variant="outlined"
                  size="small"
                  step={0.0001}
                />
              </Box>
              
              <Alert severity="info" sx={{ mt: 2 }}>
                Training will use {mlTraining.trainingDataSize.toLocaleString()} data samples and may take several hours to complete.
              </Alert>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseMlTrainingDialog} startIcon={<CloseIcon />}>
              Cancel
            </Button>
            <Button 
              onClick={handleStartMlTraining} 
              variant="contained" 
              startIcon={<ModelTrainingIcon />}
              sx={{ bgcolor: ANALYTICS_COLORS.purple.border }}
            >
              Start Training
            </Button>
          </DialogActions>
        </Dialog>

        {/* Export Dialog */}
        <Dialog 
          open={exportDialogOpen} 
          onClose={handleCloseExportDialog}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar sx={{ 
                bgcolor: alpha(ANALYTICS_COLORS.primary.border, 0.1), 
                color: ANALYTICS_COLORS.primary.border 
              }}>
                <DownloadIcon />
              </Avatar>
              <Box>
                <Typography variant="h6">Export Analytics Data</Typography>
                <Typography variant="caption" sx={{ color: ANALYTICS_COLORS.gray.text }}>
                  Select format and data range for export
                </Typography>
              </Box>
            </Box>
          </DialogTitle>
          <DialogContent dividers>
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle2" sx={{ color: ANALYTICS_COLORS.gray.text, mb: 2 }}>
                Export Format
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() => handleExportData('csv')}
                  sx={{ 
                    borderColor: ANALYTICS_COLORS.info.border,
                    color: ANALYTICS_COLORS.info.text
                  }}
                >
                  CSV
                </Button>
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() => handleExportData('json')}
                  sx={{ 
                    borderColor: ANALYTICS_COLORS.warning.border,
                    color: ANALYTICS_COLORS.warning.text
                  }}
                >
                  JSON
                </Button>
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() => handleExportData('pdf')}
                  sx={{ 
                    borderColor: ANALYTICS_COLORS.danger.border,
                    color: ANALYTICS_COLORS.danger.text
                  }}
                >
                  PDF Report
                </Button>
              </Box>
              
              <Typography variant="subtitle2" sx={{ color: ANALYTICS_COLORS.gray.text, mb: 2 }}>
                Data Range
              </Typography>
              <FormControl fullWidth size="small" sx={{ mb: 3 }}>
                <InputLabel>Time Range</InputLabel>
                <Select value={timeRange} label="Time Range">
                  {Object.values(TIME_RANGES).map((range) => (
                    <MenuItem key={range} value={range}>{range}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              
              <Typography variant="subtitle2" sx={{ color: ANALYTICS_COLORS.gray.text, mb: 2 }}>
                Include
              </Typography>
              <Box>
                <FormControlLabel 
                  control={<Checkbox defaultChecked />} 
                  label="Statistical Analysis" 
                />
                <FormControlLabel 
                  control={<Checkbox defaultChecked />} 
                  label="ML Model Performance" 
                />
                <FormControlLabel 
                  control={<Checkbox defaultChecked />} 
                  label="Significant Anomalies" 
                />
                <FormControlLabel 
                  control={<Checkbox />} 
                  label="Raw Data Samples" 
                />
              </Box>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseExportDialog} startIcon={<CloseIcon />}>
              Cancel
            </Button>
            <Button 
              onClick={() => handleExportData('csv')} 
              variant="contained" 
              startIcon={<CloudDownloadIcon />}
              sx={{ bgcolor: ANALYTICS_COLORS.primary.border }}
            >
              Export All Data
            </Button>
          </DialogActions>
        </Dialog>

        {/* Insight Details Dialog */}
        <Dialog 
          open={insightDialogOpen} 
          onClose={handleCloseInsightDialog}
          maxWidth="md"
          fullWidth
        >
          {selectedInsight && (
            <>
              <DialogTitle>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar sx={{ 
                    bgcolor: alpha(getSeverityColor(selectedInsight.severity).border, 0.1), 
                    color: getSeverityColor(selectedInsight.severity).border 
                  }}>
                    <WarningIcon />
                  </Avatar>
                  <Box>
                    <Typography variant="h6">{selectedInsight.type}</Typography>
                    <Typography variant="caption" sx={{ color: ANALYTICS_COLORS.gray.text }}>
                      {selectedInsight.deviceId} • Patient {selectedInsight.patientId}
                    </Typography>
                  </Box>
                </Box>
              </DialogTitle>
              <DialogContent dividers>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                  <Box sx={{ flex: '1 1 300px' }}>
                    <Typography variant="subtitle2" sx={{ color: ANALYTICS_COLORS.gray.text, mb: 2 }}>
                      Anomaly Details
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" sx={{ color: ANALYTICS_COLORS.gray.text }}>
                          Severity:
                        </Typography>
                        <Chip
                          label={selectedInsight.severity.toUpperCase()}
                          size="small"
                          sx={{ 
                            bgcolor: getSeverityColor(selectedInsight.severity).bg,
                            color: getSeverityColor(selectedInsight.severity).text
                          }}
                        />
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" sx={{ color: ANALYTICS_COLORS.gray.text }}>
                          Confidence:
                        </Typography>
                        <Typography variant="body2" fontWeight="bold">
                          {selectedInsight.confidence}%
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" sx={{ color: ANALYTICS_COLORS.gray.text }}>
                          Detected Value:
                        </Typography>
                        <Typography variant="body2" fontWeight="medium">
                          {selectedInsight.value}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" sx={{ color: ANALYTICS_COLORS.gray.text }}>
                          Baseline:
                        </Typography>
                        <Typography variant="body2">
                          {selectedInsight.baseline}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" sx={{ color: ANALYTICS_COLORS.gray.text }}>
                          Deviation:
                        </Typography>
                        <Typography variant="body2" sx={{ 
                          color: selectedInsight.value.includes('detected') ? ANALYTICS_COLORS.danger.text : 
                                 selectedInsight.value.includes('185/110') ? ANALYTICS_COLORS.danger.text : 
                                 ANALYTICS_COLORS.warning.text 
                        }}>
                          Significant
                        </Typography>
                      </Box>
                    </Box>
                  </Box>

                  <Box sx={{ flex: '1 1 300px' }}>
                    <Typography variant="subtitle2" sx={{ color: ANALYTICS_COLORS.gray.text, mb: 2 }}>
                      Timeline & Context
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" sx={{ color: ANALYTICS_COLORS.gray.text }}>
                          Timestamp:
                        </Typography>
                        <Typography variant="body2">
                          {formatDateTime(selectedInsight.timestamp)}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" sx={{ color: ANALYTICS_COLORS.gray.text }}>
                          Detected By:
                        </Typography>
                        <Typography variant="body2">
                          ML Anomaly Detection Model
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" sx={{ color: ANALYTICS_COLORS.gray.text }}>
                          Algorithm:
                        </Typography>
                        <Typography variant="body2">
                          Isolation Forest
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>

                {/* Action Taken */}
                <Box sx={{ mt: 3 }}>
                  <Typography variant="subtitle2" sx={{ color: ANALYTICS_COLORS.gray.text, mb: 1 }}>
                    Action Taken
                  </Typography>
                  <Card sx={{ p: 2, bgcolor: ANALYTICS_COLORS.info.bg }}>
                    <Typography variant="body2">
                      {selectedInsight.action}
                    </Typography>
                  </Card>
                </Box>

                {/* Statistical Significance */}
                <Box sx={{ mt: 3, p: 2, borderRadius: 2, bgcolor: ANALYTICS_COLORS.success.bg }}>
                  <Typography variant="subtitle2" sx={{ color: ANALYTICS_COLORS.success.text, mb: 1 }}>
                    Statistical Significance
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 3 }}>
                    <Box>
                      <Typography variant="caption" sx={{ color: ANALYTICS_COLORS.gray.text, display: 'block' }}>
                        p-value
                      </Typography>
                      <Typography variant="body2" fontWeight="bold" sx={{ color: ANALYTICS_COLORS.success.text }}>
                         0.001
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="caption" sx={{ color: ANALYTICS_COLORS.gray.text, display: 'block' }}>
                        Effect Size
                      </Typography>
                      <Typography variant="body2" fontWeight="bold" sx={{ color: ANALYTICS_COLORS.success.text }}>
                        0.89
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="caption" sx={{ color: ANALYTICS_COLORS.gray.text, display: 'block' }}>
                        Confidence Interval
                      </Typography>
                      <Typography variant="body2" fontWeight="bold" sx={{ color: ANALYTICS_COLORS.success.text }}>
                        95%
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseInsightDialog}>Close</Button>
                <Button variant="contained" startIcon={<DownloadIcon />}>
                  Export Report
                </Button>
                <Button variant="contained" startIcon={<ShareIcon />} sx={{ bgcolor: ANALYTICS_COLORS.primary.border }}>
                  Share with Team
                </Button>
              </DialogActions>
            </>
          )}
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
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>

        {/* Speed Dial for Quick Actions */}
        <SpeedDial
          ariaLabel="Analytics Quick Actions"
          sx={{ position: 'fixed', bottom: 32, right: 32 }}
          icon={<SpeedDialIcon />}
        >
          <SpeedDialAction
            icon={<ModelTrainingIcon />}
            tooltipTitle="Train ML Model"
            onClick={handleOpenMlTrainingDialog}
          />
          <SpeedDialAction
            icon={<DownloadIcon />}
            tooltipTitle="Export Data"
            onClick={handleOpenExportDialog}
          />
          <SpeedDialAction
            icon={<RefreshIcon />}
            tooltipTitle="Refresh Analysis"
            onClick={handleRefresh}
          />
          <SpeedDialAction
            icon={<PrintIcon />}
            tooltipTitle="Print Report"
          />
        </SpeedDial>

        {/* Footer */}
        <Box sx={{ 
          mt: 4, 
          pt: 2, 
          borderTop: `1px solid ${ANALYTICS_COLORS.gray.border}`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Typography variant="caption" sx={{ color: ANALYTICS_COLORS.gray.text }}>
            Device Data Analytics Lab • AI-powered clinical insights • Last updated: Today
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Tooltip title="Export All Data">
              <IconButton size="small" sx={{ color: ANALYTICS_COLORS.gray.border }}>
                <CloudDownloadIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Print Analytics Report">
              <IconButton size="small" sx={{ color: ANALYTICS_COLORS.gray.border }}>
                <PrintIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Settings">
              <IconButton size="small" sx={{ color: ANALYTICS_COLORS.gray.border }}>
                <SettingsIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Box>
    </Fade>
  );
};

export default DeviceDataAnalyticsLab;