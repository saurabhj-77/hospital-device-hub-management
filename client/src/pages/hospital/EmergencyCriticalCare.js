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
  Tab,
  Tabs,
  Switch,
  FormControlLabel,
  TextField,
  InputAdornment,
  Menu,
  MenuItem,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stepper,
  Step,
  StepLabel,
  Select,
  FormControl,
  InputLabel,
  Grid,
  Radio,
  RadioGroup,
  FormControlLabel as MuiFormControlLabel,
  FormLabel,
  Snackbar,
  Alert
} from '@mui/material';
import {
  Favorite as HeartIcon,
  MonitorHeart as MonitorHeartIcon,
  Bloodtype as BloodtypeIcon,
  AirlineSeatReclineNormal as RespiratoryIcon,
  Thermostat as ThermostatIcon,
  Timeline as TimelineIcon,
  NotificationsActive as AlertIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  PlayArrow as PlayIcon,
  Pause as PauseIcon,
  Download as DownloadIcon,
  Share as ShareIcon,
  MoreVert as MoreVertIcon,
  Info as InfoIcon,
  Refresh as RefreshIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  Add as AddIcon,
  Person as PersonIcon,
  Schedule as ScheduleIcon,
  BatteryFull as BatteryIcon,
  SignalCellularAlt as SignalIcon,
  Wifi as WifiIcon,
  LocationOn as LocationIcon,
  ZoomIn as ZoomInIcon,
  ZoomOut as ZoomOutIcon,
  Settings as SettingsIcon,
  MedicalServices as MedicalServicesIcon,
  LocalHospital as HospitalIcon,
  Security as SecurityIcon,
  CloudDownload as CloudDownloadIcon,
  Close as CloseIcon,
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowForwardIcon,
  QrCodeScanner as QrCodeIcon,
  Bluetooth as BluetoothIcon,
  Check as CheckIcon,
  DeviceUnknown as DeviceUnknownIcon
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
  ScatterChart,
  Scatter,
  ZAxis
} from 'recharts';

// Color palette for Care via Device
const CARE_COLORS = {
  primary: { bg: '#F0F7FF', border: '#0066CC', text: '#003366' },
  success: { bg: '#F0FFF4', border: '#38A169', text: '#22543D' },
  warning: { bg: '#FFFBEB', border: '#D69E2E', text: '#744210' },
  danger: { bg: '#FFF5F5', border: '#E53E3E', text: '#742A2A' },
  info: { bg: '#EBF8FF', border: '#3182CE', text: '#234E52' },
  purple: { bg: '#FAF5FF', border: '#805AD5', text: '#44337A' },
  teal: { bg: '#E6FFFA', border: '#319795', text: '#234E52' },
  gray: { bg: '#F7FAFC', border: '#718096', text: '#2D3748' },
  cardiac: { bg: '#FFF5F5', border: '#FC8181', text: '#742A2A' },
  glucose: { bg: '#F0FFF4', border: '#68D391', text: '#22543D' },
  bp: { bg: '#EBF8FF', border: '#63B3ED', text: '#234E52' },
  respiratory: { bg: '#FAF5FF', border: '#B794F4', text: '#44337A' }
};

// Default data structure
const defaultCareData = {
  summary: {
    totalPatients: 156,
    activeMonitors: 289,
    preventedERVisits: 42,
    earlyDetections: 127,
    avgResponseTime: '4.2min',
    complianceRate: 94.3
  },
  
  devices: [
    {
      id: 1,
      type: 'cardiac',
      name: 'CardioGuard Pro',
      model: 'CG-2024',
      fdaStatus: 'Cleared',
      status: 'active',
      patient: 'John D. (Room 304)',
      battery: 87,
      signal: 92,
      lastUpdate: '2 min ago',
      readings: {
        heartRate: { value: 112, status: 'warning', trend: '↑' },
        rhythm: { value: 'Sinus Tachy', status: 'warning' },
        ecgQuality: { value: 'Excellent', status: 'success' }
      },
      alerts: 2,
      uptime: '99.8%'
    },
    {
      id: 2,
      type: 'glucose',
      name: 'GlucoSmart CGM',
      model: 'GS-2024',
      fdaStatus: 'Cleared',
      status: 'active',
      patient: 'Sarah M. (Room 215)',
      battery: 42,
      signal: 88,
      lastUpdate: '5 min ago',
      readings: {
        glucose: { value: 142, status: 'warning', trend: '↓' },
        trend: { value: 'Stabilizing', status: 'improving' },
        insulinReq: { value: '12 units', status: 'normal' }
      },
      alerts: 1,
      uptime: '99.5%'
    },
    {
      id: 3,
      type: 'bp',
      name: 'BP-Sync Monitor',
      model: 'BPS-2024',
      fdaStatus: 'Cleared',
      status: 'active',
      patient: 'Robert K. (Room 112)',
      battery: 91,
      signal: 95,
      lastUpdate: '10 min ago',
      readings: {
        systolic: { value: 118, status: 'normal', trend: '↓' },
        diastolic: { value: 76, status: 'normal', trend: '→' },
        map: { value: 90, status: 'normal' }
      },
      alerts: 0,
      uptime: '99.9%'
    },
    {
      id: 4,
      type: 'respiratory',
      name: 'RespiraWatch',
      model: 'RW-2024',
      fdaStatus: 'Cleared',
      status: 'warning',
      patient: 'Maria L. (Room 418)',
      battery: 76,
      signal: 90,
      lastUpdate: '15 min ago',
      readings: {
        spo2: { value: 94, status: 'warning', trend: '↓' },
        respiratoryRate: { value: 22, status: 'warning', trend: '↑' },
        tidalVolume: { value: '450ml', status: 'normal' }
      },
      alerts: 3,
      uptime: '99.7%'
    },
    {
      id: 5,
      type: 'temperature',
      name: 'TempGuard',
      model: 'TG-2024',
      fdaStatus: 'Cleared',
      status: 'active',
      patient: 'David W. (Room 305)',
      battery: 95,
      signal: 96,
      lastUpdate: '20 min ago',
      readings: {
        temperature: { value: 37.2, status: 'normal', trend: '→' },
        feverDetection: { value: 'None', status: 'success' }
      },
      alerts: 0,
      uptime: '99.9%'
    }
  ],
  
  patientMonitoring: [
    {
      id: 1,
      name: 'John D.',
      room: '304',
      status: 'critical',
      devices: ['Cardiac Monitor', 'Pulse Oximeter'],
      monitoringSince: '3 days',
      lastERAlert: '24 hours ago',
      preventedER: 2,
      riskScore: 78
    },
    {
      id: 2,
      name: 'Sarah M.',
      room: '215',
      status: 'stable',
      devices: ['Glucose Monitor', 'Insulin Pump'],
      monitoringSince: '5 days',
      lastERAlert: '3 days ago',
      preventedER: 1,
      riskScore: 32
    },
    {
      id: 3,
      name: 'Robert K.',
      room: '112',
      status: 'monitoring',
      devices: ['BP Monitor', 'Weight Scale'],
      monitoringSince: '7 days',
      lastERAlert: 'Never',
      preventedER: 0,
      riskScore: 24
    },
    {
      id: 4,
      name: 'Maria L.',
      room: '418',
      status: 'warning',
      devices: ['Respiratory Monitor', 'Oxygen Concentrator'],
      monitoringSince: '2 days',
      lastERAlert: '6 hours ago',
      preventedER: 1,
      riskScore: 65
    }
  ],
  
  realTimeData: [
    { time: '00:00', cardiac: 85, glucose: 120, bp: 120, respiratory: 96 },
    { time: '04:00', cardiac: 82, glucose: 115, bp: 118, respiratory: 95 },
    { time: '08:00', cardiac: 88, glucose: 140, bp: 125, respiratory: 97 },
    { time: '12:00', cardiac: 92, glucose: 135, bp: 130, respiratory: 94 },
    { time: '16:00', cardiac: 87, glucose: 125, bp: 122, respiratory: 96 },
    { time: '20:00', cardiac: 85, glucose: 130, bp: 119, respiratory: 95 }
  ],
  
  earlyWarnings: [
    {
      id: 1,
      type: 'cardiac',
      title: 'Abnormal Heart Rhythm Detected',
      patient: 'John D. (Room 304)',
      device: 'CardioGuard Pro',
      time: '45 min ago',
      severity: 'high',
      action: 'Cardiology consult requested',
      preventedER: true
    },
    {
      id: 2,
      type: 'glucose',
      title: 'Hypoglycemia Risk',
      patient: 'Sarah M. (Room 215)',
      device: 'GlucoSmart CGM',
      time: '2 hours ago',
      severity: 'medium',
      action: 'Glucose administered remotely',
      preventedER: true
    },
    {
      id: 3,
      type: 'respiratory',
      title: 'Oxygen Saturation Drop',
      patient: 'Maria L. (Room 418)',
      device: 'RespiraWatch',
      time: '6 hours ago',
      severity: 'high',
      action: 'Oxygen therapy adjusted',
      preventedER: true
    },
    {
      id: 4,
      type: 'bp',
      title: 'Hypertension Alert',
      patient: 'Robert K. (Room 112)',
      device: 'BP-Sync Monitor',
      time: '1 day ago',
      severity: 'low',
      action: 'Medication review scheduled',
      preventedER: false
    }
  ],
  
  fdaClearedDevices: [
    { name: 'CardioGuard Pro', type: 'Cardiac Monitor', clearance: '510(k) #K202345', date: '2024-01-15' },
    { name: 'GlucoSmart CGM', type: 'Continuous Glucose Monitor', clearance: '510(k) #K202312', date: '2023-11-20' },
    { name: 'BP-Sync Monitor', type: 'Blood Pressure Monitor', clearance: '510(k) #K202401', date: '2024-02-10' },
    { name: 'RespiraWatch', type: 'Respiratory Monitor', clearance: '510(k) #K202356', date: '2024-01-30' },
    { name: 'TempGuard', type: 'Temperature Monitor', clearance: '510(k) #K202389', date: '2023-12-15' }
  ],
  
  stats: {
    erPreventionRate: 86,
    avgDetectionTime: '4.2min',
    patientSatisfaction: 94,
    deviceUptime: 99.8,
    dataAccuracy: 99.7
  }
};

// Device types for the Add Device modal
const DEVICE_TYPES = [
  { value: 'cardiac', label: 'Cardiac Monitor', icon: HeartIcon },
  { value: 'glucose', label: 'Glucose Monitor', icon: BloodtypeIcon },
  { value: 'bp', label: 'Blood Pressure Monitor', icon: MonitorHeartIcon },
  { value: 'respiratory', label: 'Respiratory Monitor', icon: RespiratoryIcon },
  { value: 'temperature', label: 'Temperature Monitor', icon: ThermostatIcon },
  { value: 'other', label: 'Other Device', icon: DeviceUnknownIcon }
];

// Predefined patients for assignment
const AVAILABLE_PATIENTS = [
  { id: 1, name: 'John D.', room: '304', status: 'critical' },
  { id: 2, name: 'Sarah M.', room: '215', status: 'stable' },
  { id: 3, name: 'Robert K.', room: '112', status: 'monitoring' },
  { id: 4, name: 'Maria L.', room: '418', status: 'warning' },
  { id: 5, name: 'David W.', room: '305', status: 'stable' },
  { id: 6, name: 'Emma S.', room: '207', status: 'stable' }
];

// Care via Device Component
const CareViaDevice = () => {
  const theme = useTheme();
  const [careData, setCareData] = useState(defaultCareData);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [liveMonitoring, setLiveMonitoring] = useState(true);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [timeRange, setTimeRange] = useState('24h');
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  
  // Add Device Modal States
  const [addDeviceOpen, setAddDeviceOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [newDevice, setNewDevice] = useState({
    type: 'cardiac',
    name: '',
    model: '',
    serialNumber: '',
    patientId: '',
    location: '',
    connectionType: 'bluetooth',
    fdaStatus: 'Cleared'
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  useEffect(() => {
    const loadCareData = () => {
      const savedData = localStorage.getItem('deviceHub_care_via_device');
      if (savedData) {
        try {
          const parsedData = JSON.parse(savedData);
          setCareData({
            ...defaultCareData,
            ...parsedData
          });
        } catch (error) {
          console.error('Error parsing care data:', error);
          setCareData(defaultCareData);
        }
      }
      setLoading(false);
    };

    loadCareData();
    
    // Simulate real-time updates
    const interval = setInterval(() => {
      if (liveMonitoring) {
        updateLiveData();
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [liveMonitoring]);

  const updateLiveData = () => {
    setCareData(prev => ({
      ...prev,
      devices: prev.devices.map(device => ({
        ...device,
        lastUpdate: 'Just now',
        battery: Math.max(10, device.battery - Math.random()),
        readings: {
          ...device.readings,
          ...(device.type === 'cardiac' && {
            heartRate: {
              ...device.readings.heartRate,
              value: Math.floor(Math.random() * 40) + 80
            }
          }),
          ...(device.type === 'glucose' && {
            glucose: {
              ...device.readings.glucose,
              value: Math.floor(Math.random() * 100) + 80
            }
          })
        }
      }))
    }));
  };

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      const updatedData = {
        ...careData,
        summary: {
          ...careData.summary,
          preventedERVisits: careData.summary.preventedERVisits + Math.floor(Math.random() * 3),
          earlyDetections: careData.summary.earlyDetections + Math.floor(Math.random() * 5)
        }
      };
      
      setCareData(updatedData);
      localStorage.setItem('deviceHub_care_via_device', JSON.stringify(updatedData));
      setLoading(false);
    }, 1000);
  };

  const handleFilterClick = (event) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  const getDeviceColor = (type) => {
    switch (type) {
      case 'cardiac': return CARE_COLORS.cardiac;
      case 'glucose': return CARE_COLORS.glucose;
      case 'bp': return CARE_COLORS.bp;
      case 'respiratory': return CARE_COLORS.respiratory;
      case 'temperature': return CARE_COLORS.info;
      default: return CARE_COLORS.gray;
    }
  };

  const getDeviceIcon = (type) => {
    switch (type) {
      case 'cardiac': return <HeartIcon />;
      case 'glucose': return <BloodtypeIcon />;
      case 'bp': return <MonitorHeartIcon />;
      case 'respiratory': return <RespiratoryIcon />;
      case 'temperature': return <ThermostatIcon />;
      default: return <MedicalServicesIcon />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'critical': return CARE_COLORS.danger.border;
      case 'warning': return CARE_COLORS.warning.border;
      case 'active': return CARE_COLORS.success.border;
      case 'normal': return CARE_COLORS.success.border;
      case 'improving': return CARE_COLORS.info.border;
      default: return CARE_COLORS.gray.border;
    }
  };

  const StatusIndicator = ({ status, size = 8 }) => (
    <Box
      sx={{
        width: size,
        height: size,
        borderRadius: '50%',
        bgcolor: getStatusColor(status),
        display: 'inline-block',
        mr: 1
      }}
    />
  );

  // Add Device Modal Functions
  const handleAddDeviceClick = () => {
    setAddDeviceOpen(true);
    setActiveStep(0);
    setNewDevice({
      type: 'cardiac',
      name: '',
      model: '',
      serialNumber: '',
      patientId: '',
      location: '',
      connectionType: 'bluetooth',
      fdaStatus: 'Cleared'
    });
  };

  const handleAddDeviceClose = () => {
    setAddDeviceOpen(false);
  };

  const handleNextStep = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handlePrevStep = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleNewDeviceChange = (field, value) => {
    setNewDevice(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const generateDeviceData = (type) => {
    const deviceData = {
      cardiac: {
        name: 'CardioGuard Pro',
        model: `CG-${Math.floor(Math.random() * 9000) + 1000}`,
        readings: {
          heartRate: { value: Math.floor(Math.random() * 40) + 80, status: 'normal', trend: '→' },
          rhythm: { value: 'Normal Sinus', status: 'normal' },
          ecgQuality: { value: 'Excellent', status: 'success' }
        }
      },
      glucose: {
        name: 'GlucoSmart CGM',
        model: `GS-${Math.floor(Math.random() * 9000) + 1000}`,
        readings: {
          glucose: { value: Math.floor(Math.random() * 100) + 80, status: 'normal', trend: '→' },
          trend: { value: 'Stable', status: 'normal' },
          insulinReq: { value: '8 units', status: 'normal' }
        }
      },
      bp: {
        name: 'BP-Sync Monitor',
        model: `BPS-${Math.floor(Math.random() * 9000) + 1000}`,
        readings: {
          systolic: { value: 120, status: 'normal', trend: '→' },
          diastolic: { value: 80, status: 'normal', trend: '→' },
          map: { value: 93, status: 'normal' }
        }
      },
      respiratory: {
        name: 'RespiraWatch',
        model: `RW-${Math.floor(Math.random() * 9000) + 1000}`,
        readings: {
          spo2: { value: 98, status: 'normal', trend: '→' },
          respiratoryRate: { value: 16, status: 'normal', trend: '→' },
          tidalVolume: { value: '500ml', status: 'normal' }
        }
      },
      temperature: {
        name: 'TempGuard',
        model: `TG-${Math.floor(Math.random() * 9000) + 1000}`,
        readings: {
          temperature: { value: 36.8, status: 'normal', trend: '→' },
          feverDetection: { value: 'None', status: 'success' }
        }
      },
      other: {
        name: 'Multi-Function Monitor',
        model: `MFM-${Math.floor(Math.random() * 9000) + 1000}`,
        readings: {
          status: { value: 'Active', status: 'normal' },
          battery: { value: '100%', status: 'success' }
        }
      }
    };

    return deviceData[type] || deviceData.other;
  };

  const handleAddDeviceSubmit = () => {
    // Generate unique ID
    const newId = Math.max(...careData.devices.map(d => d.id)) + 1;
    
    // Get selected patient
    const selectedPatient = AVAILABLE_PATIENTS.find(p => p.id.toString() === newDevice.patientId);
    
    // Generate device data based on type
    const deviceTemplate = generateDeviceData(newDevice.type);
    
    // Create new device object
    const newDeviceObj = {
      id: newId,
      type: newDevice.type,
      name: newDevice.name || deviceTemplate.name,
      model: newDevice.model || deviceTemplate.model,
      fdaStatus: newDevice.fdaStatus,
      status: 'active',
      patient: selectedPatient ? `${selectedPatient.name} (Room ${selectedPatient.room})` : 'Unassigned',
      battery: Math.floor(Math.random() * 50) + 50,
      signal: Math.floor(Math.random() * 20) + 80,
      lastUpdate: 'Just added',
      readings: deviceTemplate.readings,
      alerts: 0,
      uptime: '100%'
    };
    
    // Update care data
    const updatedData = {
      ...careData,
      devices: [...careData.devices, newDeviceObj],
      summary: {
        ...careData.summary,
        activeMonitors: careData.summary.activeMonitors + 1
      }
    };
    
    setCareData(updatedData);
    localStorage.setItem('deviceHub_care_via_device', JSON.stringify(updatedData));
    
    // Show success message
    setSnackbar({
      open: true,
      message: `Device "${newDeviceObj.name}" added successfully!`,
      severity: 'success'
    });
    
    // Close modal
    handleAddDeviceClose();
  };

  const handleSnackbarClose = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const renderReading = (label, data) => (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
      <Typography variant="body2" sx={{ color: CARE_COLORS.gray.text }}>
        {label}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography variant="body2" fontWeight="bold" sx={{ color: CARE_COLORS.gray.text }}>
          {data.value}
        </Typography>
        {data.trend && (
          <Typography variant="caption" sx={{ 
            color: data.trend === '↑' ? CARE_COLORS.danger.border : 
                   data.trend === '↓' ? CARE_COLORS.success.border : 
                   CARE_COLORS.gray.border 
          }}>
            {data.trend}
          </Typography>
        )}
        <StatusIndicator status={data.status} />
      </Box>
    </Box>
  );

  // Tab content renderer
  const renderTabContent = () => {
    switch (activeTab) {
      case 0: // Device Monitoring
        return (
          <Box>
            {/* Real-time Monitoring Chart */}
            <Card sx={{ 
              borderRadius: 3, 
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
              backgroundColor: CARE_COLORS.gray.bg,
              border: `2px solid ${CARE_COLORS.gray.border}`,
              mb: 3
            }}>
              <CardHeader
                title={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <TimelineIcon sx={{ color: CARE_COLORS.gray.border }} />
                    <Typography variant="h6" sx={{ color: CARE_COLORS.gray.text }}>
                      Real-time Vital Signs Monitor
                    </Typography>
                    <Chip
                      icon={liveMonitoring ? <PlayIcon /> : <PauseIcon />}
                      label={liveMonitoring ? "LIVE" : "PAUSED"}
                      size="small"
                      sx={{
                        bgcolor: liveMonitoring ? CARE_COLORS.success.border : CARE_COLORS.gray.border,
                        color: 'white'
                      }}
                    />
                  </Box>
                }
                action={
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Tooltip title="Zoom In">
                      <IconButton size="small">
                        <ZoomInIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Zoom Out">
                      <IconButton size="small">
                        <ZoomOutIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Settings">
                      <IconButton size="small">
                        <SettingsIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                }
              />
              <CardContent>
                <Box sx={{ height: 300 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={careData.realTimeData}>
                      <CartesianGrid strokeDasharray="3 3" stroke={alpha(CARE_COLORS.gray.border, 0.2)} />
                      <XAxis dataKey="time" stroke={CARE_COLORS.gray.text} />
                      <YAxis stroke={CARE_COLORS.gray.text} />
                      <RechartsTooltip 
                        contentStyle={{ 
                          backgroundColor: CARE_COLORS.gray.bg,
                          border: `1px solid ${CARE_COLORS.gray.border}`,
                          borderRadius: 8,
                          color: CARE_COLORS.gray.text
                        }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="cardiac" 
                        stroke={CARE_COLORS.cardiac.border} 
                        fill={alpha(CARE_COLORS.cardiac.border, 0.2)}
                        strokeWidth={2}
                        name="Heart Rate"
                      />
                      <Area 
                        type="monotone" 
                        dataKey="glucose" 
                        stroke={CARE_COLORS.glucose.border} 
                        fill={alpha(CARE_COLORS.glucose.border, 0.2)}
                        strokeWidth={2}
                        name="Glucose"
                      />
                      <Area 
                        type="monotone" 
                        dataKey="bp" 
                        stroke={CARE_COLORS.bp.border} 
                        fill={alpha(CARE_COLORS.bp.border, 0.2)}
                        strokeWidth={2}
                        name="Blood Pressure"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </Box>
                
                <Divider sx={{ my: 2, borderColor: alpha(CARE_COLORS.gray.border, 0.3) }} />
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', textAlign: 'center' }}>
                  {Object.entries(careData.stats).map(([key, value], index) => (
                    <Box key={key}>
                      <Typography variant="caption" sx={{ color: CARE_COLORS.gray.text }} display="block">
                        {key.replace(/([A-Z])/g, ' $1').toUpperCase()}
                      </Typography>
                      <Typography variant="h6" fontWeight="bold" sx={{ color: CARE_COLORS.gray.text }}>
                        {typeof value === 'number' ? `${value}%` : value}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>

            {/* Device Grid */}
            <Typography variant="h6" sx={{ color: CARE_COLORS.gray.text, mb: 2 }}>
              Connected Devices ({careData.devices.length})
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
              {careData.devices.map((device, index) => {
                const deviceColor = getDeviceColor(device.type);
                
                return (
                  <Grow in={true} timeout={600 + index * 100} key={device.id}>
                    <Card sx={{ 
                      flex: '1 1 300px', 
                      borderRadius: 3, 
                      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                      backgroundColor: deviceColor.bg,
                      border: `2px solid ${deviceColor.border}`,
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)'
                      }
                    }}>
                      <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Avatar sx={{ 
                              bgcolor: alpha(deviceColor.border, 0.1), 
                              color: deviceColor.border 
                            }}>
                              {getDeviceIcon(device.type)}
                            </Avatar>
                            <Box>
                              <Typography variant="subtitle1" fontWeight="bold" sx={{ color: deviceColor.text }}>
                                {device.name}
                              </Typography>
                              <Typography variant="caption" sx={{ color: deviceColor.text }}>
                                {device.model}
                              </Typography>
                            </Box>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            {device.alerts > 0 && (
                              <Badge badgeContent={device.alerts} color="error">
                                <AlertIcon sx={{ color: CARE_COLORS.danger.border }} />
                              </Badge>
                            )}
                            <IconButton size="small">
                              <MoreVertIcon sx={{ color: deviceColor.border }} />
                            </IconButton>
                          </Box>
                        </Box>
                        
                        <Box sx={{ mb: 2 }}>
                          <Chip
                            icon={<PersonIcon />}
                            label={device.patient}
                            size="small"
                            sx={{ 
                              bgcolor: alpha(deviceColor.border, 0.1),
                              color: deviceColor.text,
                              mb: 2
                            }}
                          />
                          
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                            <Chip
                              icon={<BatteryIcon />}
                              label={`${device.battery}%`}
                              size="small"
                              sx={{ 
                                bgcolor: device.battery < 30 ? CARE_COLORS.danger.bg : 
                                        device.battery < 50 ? CARE_COLORS.warning.bg : 
                                        CARE_COLORS.success.bg,
                                color: device.battery < 30 ? CARE_COLORS.danger.text : 
                                       device.battery < 50 ? CARE_COLORS.warning.text : 
                                       CARE_COLORS.success.text
                              }}
                            />
                            <Chip
                              icon={<SignalIcon />}
                              label={`${device.signal}%`}
                              size="small"
                              sx={{ 
                                bgcolor: device.signal < 80 ? CARE_COLORS.warning.bg : CARE_COLORS.success.bg,
                                color: device.signal < 80 ? CARE_COLORS.warning.text : CARE_COLORS.success.text
                              }}
                            />
                            <Chip
                              label={`Uptime: ${device.uptime}`}
                              size="small"
                              variant="outlined"
                              sx={{ borderColor: deviceColor.border, color: deviceColor.text }}
                            />
                          </Box>
                          
                          <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: 'white', mb: 2 }}>
                            {Object.entries(device.readings).map(([key, data]) => 
                              renderReading(key, data)
                            )}
                          </Box>
                          
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Chip
                              icon={<CheckCircleIcon />}
                              label={device.fdaStatus}
                              size="small"
                              sx={{ 
                                bgcolor: CARE_COLORS.success.bg,
                                color: CARE_COLORS.success.text
                              }}
                            />
                            <Typography variant="caption" sx={{ color: deviceColor.text }}>
                              Updated {device.lastUpdate}
                            </Typography>
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grow>
                );
              })}
            </Box>
          </Box>
        );

      case 1: // Patient Overview
        return (
          <Card sx={{ 
            borderRadius: 3, 
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
            backgroundColor: CARE_COLORS.success.bg,
            border: `2px solid ${CARE_COLORS.success.border}`
          }}>
            <CardHeader
              title={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <PersonIcon sx={{ color: CARE_COLORS.success.border }} />
                  <Typography variant="h6" sx={{ color: CARE_COLORS.success.text }}>
                    Patient Monitoring Overview
                  </Typography>
                  <Chip label={`${careData.patientMonitoring.length} Patients`} size="small" />
                </Box>
              }
              action={
                <Button startIcon={<AddIcon />} variant="outlined" size="small">
                  Add Patient
                </Button>
              }
            />
            <CardContent>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                {careData.patientMonitoring.map((patient, index) => (
                  <Grow in={true} timeout={500 + index * 100} key={patient.id}>
                    <Card sx={{ 
                      flex: '1 1 300px', 
                      borderRadius: 3,
                      backgroundColor: 'white',
                      border: `2px solid ${getStatusColor(patient.status)}`
                    }}>
                      <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                          <Box>
                            <Typography variant="h6" sx={{ color: CARE_COLORS.gray.text }}>
                              {patient.name}
                            </Typography>
                            <Typography variant="body2" sx={{ color: CARE_COLORS.gray.text }}>
                              Room {patient.room}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <StatusIndicator status={patient.status} />
                            <Chip
                              label={patient.status.toUpperCase()}
                              size="small"
                              sx={{ 
                                bgcolor: getStatusColor(patient.status),
                                color: 'white'
                              }}
                            />
                          </Box>
                        </Box>
                        
                        <Box sx={{ mb: 2 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                            <Typography variant="body2" sx={{ color: CARE_COLORS.gray.text }}>
                              Monitoring Since:
                            </Typography>
                            <Typography variant="body2" fontWeight="bold" sx={{ color: CARE_COLORS.gray.text }}>
                              {patient.monitoringSince}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                            <Typography variant="body2" sx={{ color: CARE_COLORS.gray.text }}>
                              Risk Score:
                            </Typography>
                            <Chip
                              label={`${patient.riskScore}%`}
                              size="small"
                              sx={{ 
                                bgcolor: patient.riskScore > 50 ? CARE_COLORS.danger.bg : 
                                        patient.riskScore > 25 ? CARE_COLORS.warning.bg : 
                                        CARE_COLORS.success.bg,
                                color: patient.riskScore > 50 ? CARE_COLORS.danger.text : 
                                       patient.riskScore > 25 ? CARE_COLORS.warning.text : 
                                       CARE_COLORS.success.text
                              }}
                            />
                          </Box>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                            <Typography variant="body2" sx={{ color: CARE_COLORS.gray.text }}>
                              ER Visits Prevented:
                            </Typography>
                            <Typography variant="body2" fontWeight="bold" sx={{ color: CARE_COLORS.success.text }}>
                              {patient.preventedER}
                            </Typography>
                          </Box>
                        </Box>
                        
                        <Divider sx={{ my: 2 }} />
                        
                        <Box>
                          <Typography variant="body2" sx={{ color: CARE_COLORS.gray.text, mb: 1 }}>
                            Assigned Devices:
                          </Typography>
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {patient.devices.map((device, idx) => (
                              <Chip
                                key={idx}
                                label={device}
                                size="small"
                                sx={{ 
                                  bgcolor: alpha(CARE_COLORS.info.border, 0.1),
                                  color: CARE_COLORS.info.text
                                }}
                              />
                            ))}
                          </Box>
                        </Box>
                        
                        <Typography variant="caption" sx={{ 
                          color: CARE_COLORS.gray.border, 
                          display: 'block', 
                          mt: 2,
                          textAlign: 'right'
                        }}>
                          Last ER Alert: {patient.lastERAlert}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grow>
                ))}
              </Box>
            </CardContent>
          </Card>
        );

      case 2: // Early Warnings
        return (
          <Card sx={{ 
            borderRadius: 3, 
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
            backgroundColor: CARE_COLORS.warning.bg,
            border: `2px solid ${CARE_COLORS.warning.border}`
          }}>
            <CardHeader
              title={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <AlertIcon sx={{ color: CARE_COLORS.warning.border }} />
                  <Typography variant="h6" sx={{ color: CARE_COLORS.warning.text }}>
                    Early Warning Signals
                  </Typography>
                  <Badge badgeContent={careData.earlyWarnings.length} color="error" />
                </Box>
              }
              subheader="Preventing unnecessary ER visits"
              action={
                <Button startIcon={<DownloadIcon />} variant="outlined" size="small">
                  Export Alerts
                </Button>
              }
            />
            <CardContent>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                {careData.earlyWarnings.map((warning, index) => {
                  const severityColor = warning.severity === 'high' ? CARE_COLORS.danger : 
                                       warning.severity === 'medium' ? CARE_COLORS.warning : 
                                       CARE_COLORS.info;
                  
                  return (
                    <Grow in={true} timeout={500 + index * 100} key={warning.id}>
                      <Card sx={{ 
                        flex: '1 1 350px', 
                        borderRadius: 3,
                        backgroundColor: severityColor.bg,
                        border: `2px solid ${severityColor.border}`
                      }}>
                        <CardContent>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                            <Box>
                              <Chip
                                label={warning.severity.toUpperCase()}
                                size="small"
                                sx={{ 
                                  bgcolor: alpha(severityColor.border, 0.2),
                                  color: severityColor.text,
                                  fontWeight: 'bold',
                                  mb: 1
                                }}
                              />
                              <Typography variant="h6" sx={{ color: severityColor.text }}>
                                {warning.title}
                              </Typography>
                            </Box>
                            {warning.preventedER && (
                              <Chip
                                icon={<HospitalIcon />}
                                label="ER Prevented"
                                size="small"
                                sx={{ 
                                  bgcolor: CARE_COLORS.success.bg,
                                  color: CARE_COLORS.success.text
                                }}
                              />
                            )}
                          </Box>
                          
                          <Box sx={{ mb: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                              <Chip
                                icon={<PersonIcon />}
                                label={warning.patient}
                                size="small"
                                variant="outlined"
                                sx={{ borderColor: severityColor.border, color: severityColor.text }}
                              />
                              <Chip
                                icon={<MedicalServicesIcon />}
                                label={warning.device}
                                size="small"
                                variant="outlined"
                                sx={{ borderColor: severityColor.border, color: severityColor.text }}
                              />
                            </Box>
                            
                            <Typography variant="body2" sx={{ color: severityColor.text, mb: 2 }}>
                              <strong>Action Taken:</strong> {warning.action}
                            </Typography>
                            
                            <Box sx={{ 
                              p: 2, 
                              borderRadius: 2,
                              backgroundColor: alpha(severityColor.border, 0.05),
                              border: `1px solid ${alpha(severityColor.border, 0.2)}`
                            }}>
                              <Typography variant="caption" sx={{ color: severityColor.text, display: 'block' }}>
                                <strong>Impact:</strong> Early detection allowed for remote intervention, preventing escalation to emergency care.
                              </Typography>
                            </Box>
                          </Box>
                          
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="caption" sx={{ color: alpha(severityColor.text, 0.7) }}>
                              Detected {warning.time}
                            </Typography>
                            <Button size="small" variant="outlined">
                              View Details
                            </Button>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grow>
                  );
                })}
              </Box>
              
              <Divider sx={{ my: 3 }} />
              
              <Box sx={{ textAlign: 'center', p: 3 }}>
                <Typography variant="h5" sx={{ color: CARE_COLORS.warning.text, mb: 1 }}>
                  {careData.summary.preventedERVisits} ER Visits Prevented
                </Typography>
                <Typography variant="body2" sx={{ color: CARE_COLORS.warning.text }}>
                  Through early warning signals and remote intervention
                </Typography>
              </Box>
            </CardContent>
          </Card>
        );

      case 3: // FDA Clearances
        return (
          <Card sx={{ 
            borderRadius: 3, 
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
            backgroundColor: CARE_COLORS.info.bg,
            border: `2px solid ${CARE_COLORS.info.border}`
          }}>
            <CardHeader
              title={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <SecurityIcon sx={{ color: CARE_COLORS.info.border }} />
                  <Typography variant="h6" sx={{ color: CARE_COLORS.info.text }}>
                    FDA-cleared Medical Devices
                  </Typography>
                  <Chip label={`${careData.fdaClearedDevices.length} Devices`} size="small" />
                </Box>
              }
              subheader="Regulatory compliance & safety certifications"
            />
            <CardContent>
              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" sx={{ color: CARE_COLORS.info.text, mb: 2 }}>
                  All medical devices used in remote monitoring are FDA-cleared under 510(k) premarket notification, 
                  ensuring they are safe and effective for their intended use.
                </Typography>
                
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                  {careData.fdaClearedDevices.map((device, index) => (
                    <Grow in={true} timeout={500 + index * 100} key={index}>
                      <Card sx={{ 
                        flex: '1 1 250px', 
                        borderRadius: 3,
                        backgroundColor: 'white',
                        border: `2px solid ${CARE_COLORS.info.border}`
                      }}>
                        <CardContent>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                            <Avatar sx={{ 
                              bgcolor: alpha(CARE_COLORS.info.border, 0.1), 
                              color: CARE_COLORS.info.border 
                            }}>
                              {getDeviceIcon(device.type.toLowerCase())}
                            </Avatar>
                            <Box>
                              <Typography variant="subtitle1" fontWeight="bold" sx={{ color: CARE_COLORS.info.text }}>
                                {device.name}
                              </Typography>
                              <Typography variant="caption" sx={{ color: CARE_COLORS.info.text }}>
                                {device.type}
                              </Typography>
                            </Box>
                          </Box>
                          
                          <Divider sx={{ my: 2 }} />
                          
                          <Box>
                            <Typography variant="caption" sx={{ color: CARE_COLORS.info.text, display: 'block', mb: 0.5 }}>
                              FDA Clearance
                            </Typography>
                            <Chip
                              label={device.clearance}
                              size="small"
                              sx={{ 
                                bgcolor: CARE_COLORS.success.bg,
                                color: CARE_COLORS.success.text,
                                mb: 2
                              }}
                            />
                            
                            <Typography variant="caption" sx={{ color: CARE_COLORS.info.text, display: 'block', mb: 0.5 }}>
                              Cleared Date
                            </Typography>
                            <Typography variant="body2" sx={{ color: CARE_COLORS.info.text, mb: 2 }}>
                              {device.date}
                            </Typography>
                            
                            <Typography variant="caption" sx={{ color: CARE_COLORS.info.text, display: 'block', mb: 0.5 }}>
                              Status
                            </Typography>
                            <Chip
                              icon={<CheckCircleIcon />}
                              label="Active & Compliant"
                              size="small"
                              sx={{ 
                                bgcolor: alpha(CARE_COLORS.success.border, 0.1),
                                color: CARE_COLORS.success.text
                              }}
                            />
                          </Box>
                        </CardContent>
                      </Card>
                    </Grow>
                  ))}
                </Box>
              </Box>
              
              <Divider sx={{ my: 3 }} />
              
              <Box sx={{ p: 3, borderRadius: 3, backgroundColor: alpha(CARE_COLORS.success.border, 0.05) }}>
                <Typography variant="h6" sx={{ color: CARE_COLORS.success.text, mb: 1 }}>
                  Compliance Status: 100%
                </Typography>
                <Typography variant="body2" sx={{ color: CARE_COLORS.success.text }}>
                  All remote monitoring devices are fully compliant with FDA regulations, 
                  HIPAA requirements, and medical device safety standards.
                </Typography>
                
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<CloudDownloadIcon />}
                  sx={{ 
                    mt: 2,
                    bgcolor: CARE_COLORS.success.border,
                    '&:hover': { bgcolor: alpha(CARE_COLORS.success.border, 0.9) }
                  }}
                >
                  Download Compliance Documentation
                </Button>
              </Box>
            </CardContent>
          </Card>
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
          <Typography variant="h5" gutterBottom sx={{ color: CARE_COLORS.primary.text }}>
            Loading Care via Device
          </Typography>
          <LinearProgress sx={{ height: 8, borderRadius: 4, bgcolor: CARE_COLORS.primary.bg }} />
          <Typography variant="body2" sx={{ mt: 2, color: CARE_COLORS.gray.text }}>
            Initializing remote monitoring systems...
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
            backgroundColor: CARE_COLORS.primary.bg,
            border: `2px solid ${CARE_COLORS.primary.border}`,
            position: 'relative',
            overflow: 'hidden'
          }}>
            <Box sx={{ 
              position: 'absolute', 
              top: 0, 
              right: 0,
              width: 300,
              height: 300,
              background: `radial-gradient(circle, ${alpha(CARE_COLORS.primary.border, 0.1)} 0%, transparent 70%)`,
              transform: 'translate(30%, -30%)'
            }} />
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                  <Avatar sx={{ 
                    bgcolor: alpha(CARE_COLORS.primary.border, 0.1), 
                    color: CARE_COLORS.primary.border,
                    width: 56,
                    height: 56
                  }}>
                    <MedicalServicesIcon fontSize="large" />
                  </Avatar>
                  <Box>
                    <Typography variant="h3" fontWeight="bold" sx={{ color: CARE_COLORS.primary.text }}>
                      Care via Device
                    </Typography>
                    <Typography variant="body1" sx={{ color: CARE_COLORS.primary.text }}>
                      FDA-cleared remote monitoring for continuous care
                    </Typography>
                  </Box>
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Chip
                    icon={liveMonitoring ? <PlayIcon /> : <PauseIcon />}
                    label={liveMonitoring ? "LIVE MONITORING" : "PAUSED"}
                    sx={{
                      bgcolor: liveMonitoring ? CARE_COLORS.success.border : CARE_COLORS.warning.border,
                      color: 'white',
                      fontWeight: 'bold'
                    }}
                    size="small"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={liveMonitoring}
                        onChange={(e) => setLiveMonitoring(e.target.checked)}
                        color="primary"
                      />
                    }
                    label=""
                  />
                </Box>
                <Typography variant="caption" sx={{ color: CARE_COLORS.primary.text }}>
                  FDA-cleared devices providing early warning signals
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<RefreshIcon />}
                  onClick={handleRefresh}
                  sx={{ 
                    borderRadius: 2,
                    px: 3,
                    py: 1,
                    bgcolor: CARE_COLORS.primary.border,
                    '&:hover': {
                      bgcolor: alpha(CARE_COLORS.primary.border, 0.9)
                    }
                  }}
                >
                  Refresh Data
                </Button>
              </Box>
            </Box>
          </Box>
        </Grow>

        {/* Summary Cards */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 4 }}>
          {[
            { 
              title: 'Patients Monitored', 
              value: careData.summary.totalPatients, 
              icon: <PersonIcon />, 
              color: CARE_COLORS.success,
              trend: '+3',
              description: 'Active remote monitoring'
            },
            { 
              title: 'Active Devices', 
              value: careData.summary.activeMonitors, 
              icon: <MonitorHeartIcon />, 
              color: CARE_COLORS.primary,
              trend: '+5',
              description: 'FDA-cleared devices'
            },
            { 
              title: 'ER Visits Prevented', 
              value: careData.summary.preventedERVisits, 
              icon: <HospitalIcon />, 
              color: CARE_COLORS.danger,
              trend: '+2',
              description: 'Through early detection'
            },
            { 
              title: 'Early Detections', 
              value: careData.summary.earlyDetections, 
              icon: <AlertIcon />, 
              color: CARE_COLORS.warning,
              trend: '+8',
              description: 'Warning signals identified'
            },
            { 
              title: 'Avg Response Time', 
              value: careData.summary.avgResponseTime, 
              icon: <ScheduleIcon />, 
              color: CARE_COLORS.info,
              trend: '-0.3min',
              description: 'To critical alerts'
            },
            { 
              title: 'Compliance Rate', 
              value: `${careData.summary.complianceRate}%`, 
              icon: <CheckCircleIcon />, 
              color: CARE_COLORS.purple,
              trend: '+1.2%',
              description: 'Patient adherence'
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

        {/* Control Bar */}
        <Box sx={{ display: 'flex', gap: 2, mb: 4, flexWrap: 'wrap', alignItems: 'center' }}>
          <TextField
            placeholder="Search devices or patients..."
            variant="outlined"
            size="small"
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
                  <SearchIcon sx={{ color: CARE_COLORS.gray.border }} />
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
              borderColor: CARE_COLORS.gray.border,
              color: CARE_COLORS.gray.text
            }}
          >
            Filter
          </Button>
          <Box sx={{ display: 'flex', gap: 1 }}>
            {['24h', '7d', '30d', 'All'].map(range => (
              <Chip
                key={range}
                label={range}
                variant={timeRange === range ? 'filled' : 'outlined'}
                onClick={() => setTimeRange(range)}
                sx={{
                  borderColor: CARE_COLORS.primary.border,
                  color: timeRange === range ? 'white' : CARE_COLORS.primary.border,
                  bgcolor: timeRange === range ? CARE_COLORS.primary.border : 'transparent'
                }}
              />
            ))}
          </Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddDeviceClick}
            sx={{ 
              borderRadius: 2,
              bgcolor: CARE_COLORS.success.border,
              '&:hover': { bgcolor: alpha(CARE_COLORS.success.border, 0.9) }
            }}
          >
            Add Device
          </Button>
        </Box>

        <Menu
          anchorEl={filterAnchorEl}
          open={Boolean(filterAnchorEl)}
          onClose={handleFilterClose}
        >
          <MenuItem>All Devices</MenuItem>
          <MenuItem>Cardiac Only</MenuItem>
          <MenuItem>Glucose Only</MenuItem>
          <MenuItem>Blood Pressure</MenuItem>
          <MenuItem>Respiratory</MenuItem>
          <MenuItem>Critical Alerts Only</MenuItem>
        </Menu>

        {/* Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs 
            value={activeTab} 
            onChange={(e, newValue) => setActiveTab(newValue)}
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab 
              label="Device Monitoring" 
              icon={<MonitorHeartIcon />} 
              iconPosition="start" 
              sx={{ minHeight: 48 }}
            />
            <Tab 
              label="Patient Overview" 
              icon={<PersonIcon />} 
              iconPosition="start" 
              sx={{ minHeight: 48 }}
            />
            <Tab 
              label="Early Warnings" 
              icon={<AlertIcon />} 
              iconPosition="start" 
              sx={{ minHeight: 48 }}
            />
            <Tab 
              label="FDA Clearances" 
              icon={<SecurityIcon />} 
              iconPosition="start" 
              sx={{ minHeight: 48 }}
            />
          </Tabs>
        </Box>

        {/* Tab Content with Smooth Transition */}
        <Fade in={true} timeout={300} key={activeTab}>
          <Box>
            {renderTabContent()}
          </Box>
        </Fade>

        {/* Add Device Modal */}
        <Dialog 
          open={addDeviceOpen} 
          onClose={handleAddDeviceClose}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar sx={{ bgcolor: CARE_COLORS.primary.bg, color: CARE_COLORS.primary.border }}>
                <AddIcon />
              </Avatar>
              <Typography variant="h6">Add New Medical Device</Typography>
            </Box>
            <Stepper activeStep={activeStep} sx={{ mt: 3 }}>
              <Step>
                <StepLabel>Device Type</StepLabel>
              </Step>
              <Step>
                <StepLabel>Device Details</StepLabel>
              </Step>
              <Step>
                <StepLabel>Patient Assignment</StepLabel>
              </Step>
              <Step>
                <StepLabel>Review & Confirm</StepLabel>
              </Step>
            </Stepper>
          </DialogTitle>
          
          <DialogContent dividers>
            {activeStep === 0 && (
              <Box>
                <Typography variant="subtitle1" gutterBottom sx={{ color: CARE_COLORS.gray.text }}>
                  Select the type of medical device you want to add:
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 2 }}>
                  {DEVICE_TYPES.map((deviceType) => {
                    const Icon = deviceType.icon;
                    const color = getDeviceColor(deviceType.value);
                    
                    return (
                      <Card
                        key={deviceType.value}
                        onClick={() => handleNewDeviceChange('type', deviceType.value)}
                        sx={{
                          flex: '1 1 200px',
                          p: 2,
                          cursor: 'pointer',
                          border: `2px solid ${newDevice.type === deviceType.value ? color.border : CARE_COLORS.gray.border}`,
                          bgcolor: newDevice.type === deviceType.value ? color.bg : 'white',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: 2
                          }
                        }}
                      >
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                          <Avatar sx={{ bgcolor: color.bg, color: color.border }}>
                            <Icon />
                          </Avatar>
                          <Typography variant="body2" sx={{ 
                            color: newDevice.type === deviceType.value ? color.text : CARE_COLORS.gray.text,
                            fontWeight: 'bold',
                            textAlign: 'center'
                          }}>
                            {deviceType.label}
                          </Typography>
                          {newDevice.type === deviceType.value && (
                            <CheckIcon sx={{ color: color.border }} />
                          )}
                        </Box>
                      </Card>
                    );
                  })}
                </Box>
              </Box>
            )}
            
            {activeStep === 1 && (
              <Box>
                <Typography variant="subtitle1" gutterBottom sx={{ color: CARE_COLORS.gray.text }}>
                  Enter device details:
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 2 }}>
                  <TextField
                    label="Device Name"
                    value={newDevice.name}
                    onChange={(e) => handleNewDeviceChange('name', e.target.value)}
                    fullWidth
                    placeholder="e.g., CardioGuard Pro"
                  />
                  <TextField
                    label="Model Number"
                    value={newDevice.model}
                    onChange={(e) => handleNewDeviceChange('model', e.target.value)}
                    fullWidth
                    placeholder="e.g., CG-2024"
                  />
                  <TextField
                    label="Serial Number"
                    value={newDevice.serialNumber}
                    onChange={(e) => handleNewDeviceChange('serialNumber', e.target.value)}
                    fullWidth
                    placeholder="Enter unique serial number"
                  />
                  <FormControl fullWidth>
                    <InputLabel>FDA Status</InputLabel>
                    <Select
                      value={newDevice.fdaStatus}
                      label="FDA Status"
                      onChange={(e) => handleNewDeviceChange('fdaStatus', e.target.value)}
                    >
                      <MenuItem value="Cleared">FDA Cleared</MenuItem>
                      <MenuItem value="Approved">FDA Approved</MenuItem>
                      <MenuItem value="Pending">FDA Pending</MenuItem>
                      <MenuItem value="Exempt">FDA Exempt</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">Connection Type</FormLabel>
                    <RadioGroup
                      row
                      value={newDevice.connectionType}
                      onChange={(e) => handleNewDeviceChange('connectionType', e.target.value)}
                    >
                      <MuiFormControlLabel value="bluetooth" control={<Radio />} label="Bluetooth" />
                      <MuiFormControlLabel value="wifi" control={<Radio />} label="Wi-Fi" />
                      <MuiFormControlLabel value="cellular" control={<Radio />} label="Cellular" />
                    </RadioGroup>
                  </FormControl>
                </Box>
              </Box>
            )}
            
            {activeStep === 2 && (
              <Box>
                <Typography variant="subtitle1" gutterBottom sx={{ color: CARE_COLORS.gray.text }}>
                  Assign device to a patient:
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <FormControl fullWidth>
                    <InputLabel>Select Patient</InputLabel>
                    <Select
                      value={newDevice.patientId}
                      label="Select Patient"
                      onChange={(e) => handleNewDeviceChange('patientId', e.target.value)}
                    >
                      <MenuItem value="">Unassigned</MenuItem>
                      {AVAILABLE_PATIENTS.map(patient => (
                        <MenuItem key={patient.id} value={patient.id.toString()}>
                          {patient.name} (Room {patient.room}) - {patient.status}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  
                  {newDevice.patientId && (
                    <Box sx={{ mt: 3, p: 2, borderRadius: 2, bgcolor: CARE_COLORS.info.bg }}>
                      <Typography variant="body2" sx={{ color: CARE_COLORS.info.text, mb: 1 }}>
                        Selected Patient:
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar sx={{ bgcolor: CARE_COLORS.info.border, width: 40, height: 40 }}>
                          <PersonIcon />
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle2" sx={{ color: CARE_COLORS.info.text }}>
                            {AVAILABLE_PATIENTS.find(p => p.id.toString() === newDevice.patientId)?.name}
                          </Typography>
                          <Typography variant="caption" sx={{ color: CARE_COLORS.info.text }}>
                            Room {AVAILABLE_PATIENTS.find(p => p.id.toString() === newDevice.patientId)?.room}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  )}
                  
                  <TextField
                    label="Device Location"
                    value={newDevice.location}
                    onChange={(e) => handleNewDeviceChange('location', e.target.value)}
                    fullWidth
                    sx={{ mt: 2 }}
                    placeholder="e.g., Patient Room, Nursing Station"
                  />
                </Box>
              </Box>
            )}
            
            {activeStep === 3 && (
              <Box>
                <Typography variant="subtitle1" gutterBottom sx={{ color: CARE_COLORS.gray.text }}>
                  Review device details:
                </Typography>
                <Card sx={{ mt: 2, p: 3, bgcolor: getDeviceColor(newDevice.type).bg }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                    <Avatar sx={{ 
                      bgcolor: alpha(getDeviceColor(newDevice.type).border, 0.1), 
                      color: getDeviceColor(newDevice.type).border 
                    }}>
                      {getDeviceIcon(newDevice.type)}
                    </Avatar>
                    <Box>
                      <Typography variant="h6" sx={{ color: getDeviceColor(newDevice.type).text }}>
                        {newDevice.name || 'New Device'}
                      </Typography>
                      <Typography variant="body2" sx={{ color: getDeviceColor(newDevice.type).text }}>
                        {newDevice.model || 'Model number'}
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Divider sx={{ my: 2 }} />
                  
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2" sx={{ color: getDeviceColor(newDevice.type).text }}>
                        Device Type:
                      </Typography>
                      <Typography variant="body2" fontWeight="bold" sx={{ color: getDeviceColor(newDevice.type).text }}>
                        {DEVICE_TYPES.find(d => d.value === newDevice.type)?.label}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2" sx={{ color: getDeviceColor(newDevice.type).text }}>
                        Serial Number:
                      </Typography>
                      <Typography variant="body2" fontWeight="bold" sx={{ color: getDeviceColor(newDevice.type).text }}>
                        {newDevice.serialNumber || 'To be assigned'}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2" sx={{ color: getDeviceColor(newDevice.type).text }}>
                        FDA Status:
                      </Typography>
                      <Chip
                        label={newDevice.fdaStatus}
                        size="small"
                        sx={{ 
                          bgcolor: CARE_COLORS.success.bg,
                          color: CARE_COLORS.success.text
                        }}
                      />
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2" sx={{ color: getDeviceColor(newDevice.type).text }}>
                        Patient:
                      </Typography>
                      <Typography variant="body2" fontWeight="bold" sx={{ color: getDeviceColor(newDevice.type).text }}>
                        {newDevice.patientId ? 
                          AVAILABLE_PATIENTS.find(p => p.id.toString() === newDevice.patientId)?.name : 
                          'Unassigned'}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2" sx={{ color: getDeviceColor(newDevice.type).text }}>
                        Connection:
                      </Typography>
                      <Typography variant="body2" fontWeight="bold" sx={{ color: getDeviceColor(newDevice.type).text }}>
                        {newDevice.connectionType.toUpperCase()}
                      </Typography>
                    </Box>
                  </Box>
                </Card>
                
                <Box sx={{ mt: 3, p: 2, borderRadius: 2, bgcolor: CARE_COLORS.success.bg }}>
                  <Typography variant="body2" sx={{ color: CARE_COLORS.success.text }}>
                    <CheckCircleIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                    Device will be added to the monitoring system and appear in real-time dashboards.
                  </Typography>
                </Box>
              </Box>
            )}
          </DialogContent>
          
          <DialogActions>
            <Button onClick={handleAddDeviceClose} color="inherit">
              Cancel
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            {activeStep > 0 && (
              <Button onClick={handlePrevStep} startIcon={<ArrowBackIcon />}>
                Back
              </Button>
            )}
            {activeStep < 3 ? (
              <Button 
                onClick={handleNextStep} 
                variant="contained" 
                endIcon={<ArrowForwardIcon />}
                disabled={activeStep === 1 && (!newDevice.name || !newDevice.model)}
              >
                Next
              </Button>
            ) : (
              <Button 
                onClick={handleAddDeviceSubmit} 
                variant="contained" 
                startIcon={<CheckIcon />}
                sx={{ bgcolor: CARE_COLORS.success.border }}
              >
                Add Device
              </Button>
            )}
          </DialogActions>
        </Dialog>

        {/* Snackbar for notifications */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert 
            onClose={handleSnackbarClose} 
            severity={snackbar.severity}
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>

        {/* Footer */}
        <Box sx={{ 
          mt: 4, 
          pt: 2, 
          borderTop: `1px solid ${CARE_COLORS.gray.border}`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Typography variant="caption" sx={{ color: CARE_COLORS.gray.text }}>
            Care via Device • Continuous remote monitoring • FDA-cleared medical devices • Version 2.4.1
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Tooltip title="Emergency Override">
              <Button
                variant="outlined"
                startIcon={<HospitalIcon />}
                size="small"
                sx={{ 
                  borderColor: CARE_COLORS.danger.border,
                  color: CARE_COLORS.danger.border
                }}
              >
                Emergency
              </Button>
            </Tooltip>
            <Tooltip title="Share Report">
              <IconButton size="small" sx={{ color: CARE_COLORS.gray.border }}>
                <ShareIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Box>
    </Fade>
  );
};

export default CareViaDevice;