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
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  AlertTitle,
  Radio,
  RadioGroup,
  FormLabel,
  CircularProgress,
  Slide,
  Collapse,
  Drawer
} from '@mui/material';
import {
  // Emergency as DevicesIcon,
  Devices as DevicesIcon,
  MedicalServices as MedicalServicesIcon,
  Favorite as HeartIcon,
  Favorite as MonitorHeartIcon,
  LocalHospital as HospitalIcon,
  Person as PersonIcon,
  LocationOn as LocationIcon,
  History as HistoryIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Info as InfoIcon,
  Refresh as RefreshIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  Download as DownloadIcon,
  MoreVert as MoreVertIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  Print as PrintIcon,
  Share as ShareIcon,
  Sync as SyncIcon,
  CalendarToday as CalendarIcon,
  Category as CategoryIcon,
  Timeline as TimelineIcon,
  Build as BuildIcon,
  LocalOffer as LocalOfferIcon,
  AttachMoney as MoneyIcon,
  Close as CloseIcon,
  Save as SaveIcon,
  Clear as ClearIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Timer as TimerIcon,
  TimerOff as TimerOffIcon,
  PriorityHigh as PriorityHighIcon,
  LowPriority as LowPriorityIcon,
  BatteryAlert as BatteryAlertIcon,
  BatteryFull as BatteryFullIcon,
  Bluetooth as BluetoothIcon,
  BluetoothDisabled as BluetoothDisabledIcon,
  Speed as SpeedIcon,
  LocalFireDepartment as FireIcon,
  HealthAndSafety as HealthIcon,
  AirportShuttle as ShuttleIcon,
  AssignmentReturn as ReturnIcon,
  NotificationsActive as AlertIcon,
  PlayArrow as PlayIcon,
  Stop as StopIcon,
  Pause as PauseIcon,
  GpsFixed as GpsIcon,
  Schedule as ScheduleIcon,
  AccessTime as AccessTimeIcon,
  DirectionsRun as RunIcon,
  MedicalServices as MedicalIcon,
  CrisisAlert as CrisisIcon,
  Biotech as BiotechIcon,
  Coronavirus as VirusIcon,
  CardiacMonitor as CardiacMonitorIcon
} from '@mui/icons-material';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts';

// Color palette for Emergency Devices
const EMERGENCY_COLORS = {
  primary: { bg: '#FFF5F5', border: '#E53E3E', text: '#742A2A' },
  secondary: { bg: '#FFFBEB', border: '#D69E2E', text: '#744210' },
  success: { bg: '#F0FFF4', border: '#38A169', text: '#22543D' },
  warning: { bg: '#FFFBEB', border: '#D69E2E', text: '#744210' },
  danger: { bg: '#FFF5F5', border: '#E53E3E', text: '#742A2A' },
  info: { bg: '#EBF8FF', border: '#3182CE', text: '#234E52' },
  purple: { bg: '#FAF5FF', border: '#805AD5', text: '#44337A' },
  teal: { bg: '#E6FFFA', border: '#319795', text: '#234E52' },
  gray: { bg: '#F7FAFC', border: '#718096', text: '#2D3748' },
  available: { bg: '#D1FAE5', border: '#059669', text: '#065F46' },
  in_use: { bg: '#DBEAFE', border: '#2563EB', text: '#1E40AF' },
  maintenance: { bg: '#FEF3C7', border: '#D97706', text: '#92400E' },
  critical: { bg: '#FEE2E2', border: '#DC2626', text: '#7F1D1D' },
  low_stock: { bg: '#FFEDD5', border: '#EA580C', text: '#9A3412' }
};

// Device Categories
const DEVICE_CATEGORIES = {
  STETHOSCOPE: 'stethoscope',
  ECG_MONITOR: 'ecg_monitor',
  PULSE_OXIMETER: 'pulse_oximeter',
  PORTABLE_DIAGNOSTIC: 'portable_diagnostic',
  DEFIBRILLATOR: 'defibrillator',
  VENTILATOR: 'ventilator',
  INFUSION_PUMP: 'infusion_pump',
  BLOOD_PRESSURE: 'blood_pressure',
  GLUCOSE_MONITOR: 'glucose_monitor'
};

// Device Status Types
const DEVICE_STATUS = {
  AVAILABLE: 'available',
  IN_USE: 'in_use',
  MAINTENANCE: 'maintenance',
  CRITICAL: 'critical',
  LOW_BATTERY: 'low_battery'
};

// Priority Levels
const PRIORITY_LEVELS = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  CRITICAL: 'critical'
};

// Emergency Levels
const EMERGENCY_LEVELS = {
  ROUTINE: 'routine',
  URGENT: 'urgent',
  EMERGENCY: 'emergency',
  CODE_BLUE: 'code_blue'
};

// Default data structure
const defaultEmergencyData = {
  summary: {
    totalDevices: 156,
    availableDevices: 89,
    inUseDevices: 52,
    criticalDevices: 8,
    maintenanceDevices: 7,
    averageResponseTime: '2.4 min',
    emergencyDeployments: 24,
    activeAlerts: 3
  },
  
  devices: [
    {
      id: 'EMG-001',
      name: 'Digital Stethoscope Pro',
      category: DEVICE_CATEGORIES.STETHOSCOPE,
      status: DEVICE_STATUS.AVAILABLE,
      priority: PRIORITY_LEVELS.HIGH,
      emergencyLevel: EMERGENCY_LEVELS.URGENT,
      location: 'Emergency Room - Bay 1',
      department: 'Emergency',
      assignedTo: 'Not Assigned',
      patientId: null,
      batteryLevel: 92,
      lastUsed: '2024-01-15 14:30',
      deploymentStart: null,
      deploymentDuration: null,
      signalStrength: 95,
      bluetoothStatus: 'connected',
      notes: 'Ready for immediate use',
      critical: false,
      responseTime: '1.2 min'
    },
    {
      id: 'EMG-002',
      name: 'Portable ECG Monitor',
      category: DEVICE_CATEGORIES.ECG_MONITOR,
      status: DEVICE_STATUS.IN_USE,
      priority: PRIORITY_LEVELS.CRITICAL,
      emergencyLevel: EMERGENCY_LEVELS.CODE_BLUE,
      location: 'ICU - Room 304',
      department: 'Intensive Care',
      assignedTo: 'Dr. Sarah Miller',
      patientId: 'P-789012',
      batteryLevel: 45,
      lastUsed: '2024-01-20 09:15',
      deploymentStart: '2024-01-20 09:15',
      deploymentDuration: '2.5 hours',
      signalStrength: 88,
      bluetoothStatus: 'connected',
      notes: 'Monitoring cardiac patient',
      critical: true,
      responseTime: '0.8 min'
    },
    {
      id: 'EMG-003',
      name: 'Wireless Pulse Oximeter',
      category: DEVICE_CATEGORIES.PULSE_OXIMETER,
      status: DEVICE_STATUS.AVAILABLE,
      priority: PRIORITY_LEVELS.HIGH,
      emergencyLevel: EMERGENCY_LEVELS.EMERGENCY,
      location: 'ER Triage Desk',
      department: 'Emergency',
      assignedTo: 'Not Assigned',
      patientId: null,
      batteryLevel: 78,
      lastUsed: '2024-01-19 22:45',
      deploymentStart: null,
      deploymentDuration: null,
      signalStrength: 92,
      bluetoothStatus: 'connected',
      notes: 'Calibrated today',
      critical: false,
      responseTime: '1.5 min'
    },
    {
      id: 'EMG-004',
      name: 'Portable Ultrasound Scanner',
      category: DEVICE_CATEGORIES.PORTABLE_DIAGNOSTIC,
      status: DEVICE_STATUS.CRITICAL,
      priority: PRIORITY_LEVELS.CRITICAL,
      emergencyLevel: EMERGENCY_LEVELS.CODE_BLUE,
      location: 'Trauma Center',
      department: 'Trauma',
      assignedTo: 'Dr. James Wilson',
      patientId: 'P-345678',
      batteryLevel: 22,
      lastUsed: '2024-01-20 08:00',
      deploymentStart: '2024-01-20 08:00',
      deploymentDuration: '3.8 hours',
      signalStrength: 75,
      bluetoothStatus: 'connected',
      notes: 'Low battery - needs charging',
      critical: true,
      responseTime: '0.5 min'
    },
    {
      id: 'EMG-005',
      name: 'Automated Defibrillator',
      category: DEVICE_CATEGORIES.DEFIBRILLATOR,
      status: DEVICE_STATUS.AVAILABLE,
      priority: PRIORITY_LEVELS.CRITICAL,
      emergencyLevel: EMERGENCY_LEVELS.CODE_BLUE,
      location: 'Code Blue Cart - Floor 3',
      department: 'Cardiology',
      assignedTo: 'Not Assigned',
      patientId: null,
      batteryLevel: 100,
      lastUsed: '2024-01-18 16:20',
      deploymentStart: null,
      deploymentDuration: null,
      signalStrength: 98,
      bluetoothStatus: 'connected',
      notes: 'Fully charged and tested',
      critical: true,
      responseTime: '0.3 min'
    },
    {
      id: 'EMG-006',
      name: 'Portable Ventilator',
      category: DEVICE_CATEGORIES.VENTILATOR,
      status: DEVICE_STATUS.IN_USE,
      priority: PRIORITY_LEVELS.CRITICAL,
      emergencyLevel: EMERGENCY_LEVELS.EMERGENCY,
      location: 'ICU - Room 412',
      department: 'ICU',
      assignedTo: 'Nurse Emma Davis',
      patientId: 'P-901234',
      batteryLevel: 65,
      lastUsed: '2024-01-20 07:30',
      deploymentStart: '2024-01-20 07:30',
      deploymentDuration: '4.2 hours',
      signalStrength: 85,
      bluetoothStatus: 'connected',
      notes: 'Post-operative monitoring',
      critical: true,
      responseTime: '1.0 min'
    },
    {
      id: 'EMG-007',
      name: 'Emergency Infusion Pump',
      category: DEVICE_CATEGORIES.INFUSION_PUMP,
      status: DEVICE_STATUS.MAINTENANCE,
      priority: PRIORITY_LEVELS.HIGH,
      emergencyLevel: EMERGENCY_LEVELS.URGENT,
      location: 'Biomedical Workshop',
      department: 'Maintenance',
      assignedTo: 'Tech Mike',
      patientId: null,
      batteryLevel: 15,
      lastUsed: '2024-01-19 18:45',
      deploymentStart: null,
      deploymentDuration: null,
      signalStrength: 0,
      bluetoothStatus: 'disconnected',
      notes: 'Under calibration - available in 2 hours',
      critical: false,
      responseTime: 'N/A'
    },
    {
      id: 'EMG-008',
      name: 'Digital Blood Pressure Monitor',
      category: DEVICE_CATEGORIES.BLOOD_PRESSURE,
      status: DEVICE_STATUS.LOW_BATTERY,
      priority: PRIORITY_LEVELS.MEDIUM,
      emergencyLevel: EMERGENCY_LEVELS.URGENT,
      location: 'ER Supply Room',
      department: 'Emergency',
      assignedTo: 'Not Assigned',
      patientId: null,
      batteryLevel: 18,
      lastUsed: '2024-01-19 23:15',
      deploymentStart: null,
      deploymentDuration: null,
      signalStrength: 60,
      bluetoothStatus: 'connected',
      notes: 'Needs battery replacement',
      critical: false,
      responseTime: '2.1 min'
    },
    {
      id: 'EMG-009',
      name: 'Continuous Glucose Monitor',
      category: DEVICE_CATEGORIES.GLUCOSE_MONITOR,
      status: DEVICE_STATUS.IN_USE,
      priority: PRIORITY_LEVELS.HIGH,
      emergencyLevel: EMERGENCY_LEVELS.EMERGENCY,
      location: 'ICU - Room 305',
      department: 'Endocrinology',
      assignedTo: 'Dr. Robert Chen',
      patientId: 'P-567890',
      batteryLevel: 82,
      lastUsed: '2024-01-20 06:45',
      deploymentStart: '2024-01-20 06:45',
      deploymentDuration: '5.1 hours',
      signalStrength: 90,
      bluetoothStatus: 'connected',
      notes: 'Critical diabetic patient',
      critical: true,
      responseTime: '0.9 min'
    },
    {
      id: 'EMG-010',
      name: 'Cardiac Monitor Mobile',
      category: DEVICE_CATEGORIES.ECG_MONITOR,
      status: DEVICE_STATUS.AVAILABLE,
      priority: PRIORITY_LEVELS.CRITICAL,
      emergencyLevel: EMERGENCY_LEVELS.CODE_BLUE,
      location: 'Rapid Response Cart',
      department: 'Cardiac ICU',
      assignedTo: 'Not Assigned',
      patientId: null,
      batteryLevel: 95,
      lastUsed: '2024-01-20 03:30',
      deploymentStart: null,
      deploymentDuration: null,
      signalStrength: 96,
      bluetoothStatus: 'connected',
      notes: 'Ready for cardiac emergencies',
      critical: true,
      responseTime: '0.4 min'
    }
  ],
  
  emergencyDeployments: [
    {
      id: 'DEP-001',
      deviceId: 'EMG-002',
      deviceName: 'Portable ECG Monitor',
      emergencyLevel: EMERGENCY_LEVELS.CODE_BLUE,
      department: 'ICU',
      assignedTo: 'Dr. Sarah Miller',
      patientId: 'P-789012',
      deploymentStart: '2024-01-20 09:15',
      deploymentEnd: null,
      duration: '2.5 hours',
      status: 'active',
      notes: 'Cardiac arrest - ongoing resuscitation'
    },
    {
      id: 'DEP-002',
      deviceId: 'EMG-004',
      deviceName: 'Portable Ultrasound Scanner',
      emergencyLevel: EMERGENCY_LEVELS.CODE_BLUE,
      department: 'Trauma',
      assignedTo: 'Dr. James Wilson',
      patientId: 'P-345678',
      deploymentStart: '2024-01-20 08:00',
      deploymentEnd: null,
      duration: '3.8 hours',
      status: 'active',
      notes: 'Internal bleeding assessment'
    },
    {
      id: 'DEP-003',
      deviceId: 'EMG-006',
      deviceName: 'Portable Ventilator',
      emergencyLevel: EMERGENCY_LEVELS.EMERGENCY,
      department: 'ICU',
      assignedTo: 'Nurse Emma Davis',
      patientId: 'P-901234',
      deploymentStart: '2024-01-20 07:30',
      deploymentEnd: null,
      duration: '4.2 hours',
      status: 'active',
      notes: 'Post-operative respiratory support'
    },
    {
      id: 'DEP-004',
      deviceId: 'EMG-009',
      deviceName: 'Continuous Glucose Monitor',
      emergencyLevel: EMERGENCY_LEVELS.EMERGENCY,
      department: 'Endocrinology',
      assignedTo: 'Dr. Robert Chen',
      patientId: 'P-567890',
      deploymentStart: '2024-01-20 06:45',
      deploymentEnd: null,
      duration: '5.1 hours',
      status: 'active',
      notes: 'Diabetic ketoacidosis management'
    },
    {
      id: 'DEP-005',
      deviceId: 'EMG-003',
      deviceName: 'Wireless Pulse Oximeter',
      emergencyLevel: EMERGENCY_LEVELS.URGENT,
      department: 'ER',
      assignedTo: 'Nurse Johnson',
      patientId: 'P-123456',
      deploymentStart: '2024-01-19 22:45',
      deploymentEnd: '2024-01-20 01:30',
      duration: '2.75 hours',
      status: 'completed',
      notes: 'COPD exacerbation monitoring'
    }
  ],
  
  alerts: [
    {
      id: 'ALT-001',
      deviceId: 'EMG-004',
      deviceName: 'Portable Ultrasound Scanner',
      type: 'low_battery',
      severity: 'high',
      message: 'Battery level critical (22%) - needs immediate charging',
      timestamp: '2024-01-20 10:15',
      status: 'active'
    },
    {
      id: 'ALT-002',
      deviceId: 'EMG-008',
      deviceName: 'Digital Blood Pressure Monitor',
      type: 'low_battery',
      severity: 'medium',
      message: 'Low battery (18%) - schedule replacement',
      timestamp: '2024-01-20 09:30',
      status: 'active'
    },
    {
      id: 'ALT-003',
      deviceId: 'EMG-007',
      deviceName: 'Emergency Infusion Pump',
      type: 'maintenance',
      severity: 'medium',
      message: 'Device under calibration - unavailable',
      timestamp: '2024-01-20 08:45',
      status: 'active'
    },
    {
      id: 'ALT-004',
      deviceId: 'EMG-001',
      deviceName: 'Digital Stethoscope Pro',
      type: 'availability',
      severity: 'low',
      message: 'Only 2 stethoscopes available in ER',
      timestamp: '2024-01-19 18:20',
      status: 'resolved'
    }
  ],
  
  statistics: {
    categoryDistribution: [
      { name: 'ECG Monitors', value: 25, color: EMERGENCY_COLORS.danger.border },
      { name: 'Stethoscopes', value: 40, color: EMERGENCY_COLORS.info.border },
      { name: 'Pulse Oximeters', value: 30, color: EMERGENCY_COLORS.success.border },
      { name: 'Portable Diagnostics', value: 18, color: EMERGENCY_COLORS.purple.border },
      { name: 'Defibrillators', value: 12, color: EMERGENCY_COLORS.critical.border },
      { name: 'Ventilators', value: 15, color: EMERGENCY_COLORS.teal.border },
      { name: 'Other', value: 16, color: EMERGENCY_COLORS.gray.border }
    ],
    statusDistribution: [
      { name: 'Available', value: 89, color: EMERGENCY_COLORS.success.border },
      { name: 'In Use', value: 52, color: EMERGENCY_COLORS.info.border },
      { name: 'Critical', value: 8, color: EMERGENCY_COLORS.danger.border },
      { name: 'Maintenance', value: 7, color: EMERGENCY_COLORS.warning.border }
    ]
  },
  
  recentActivities: [
    { id: 1, action: 'Device deployed for Code Blue', device: 'Portable ECG Monitor', user: 'Dr. Sarah Miller', time: '2 hours ago' },
    { id: 2, action: 'Low battery alert', device: 'Portable Ultrasound Scanner', user: 'System', time: '3 hours ago' },
    { id: 3, action: 'Device returned from deployment', device: 'Wireless Pulse Oximeter', user: 'Nurse Johnson', time: '12 hours ago' },
    { id: 4, action: 'Emergency ventilator deployed', device: 'Portable Ventilator', user: 'ICU Team', time: '1 day ago' },
    { id: 5, action: 'New emergency device added', device: 'Cardiac Monitor Mobile', user: 'Admin', time: '2 days ago' }
  ]
};

// Emergency Devices Component
const EmergencyDevices = () => {
  const theme = useTheme();
  const [emergencyData, setEmergencyData] = useState(defaultEmergencyData);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [selectedDevices, setSelectedDevices] = useState([]);
  const [deviceDialogOpen, setDeviceDialogOpen] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [deployDialogOpen, setDeployDialogOpen] = useState(false);
  const [returnDialogOpen, setReturnDialogOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('id');
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  
  // Deployment Form State
  const [deploymentForm, setDeploymentForm] = useState({
    deviceId: '',
    emergencyLevel: EMERGENCY_LEVELS.EMERGENCY,
    department: 'Emergency',
    assignedTo: '',
    patientId: '',
    notes: ''
  });

  useEffect(() => {
    const loadEmergencyData = () => {
      const savedData = localStorage.getItem('deviceHub_emergency');
      if (savedData) {
        try {
          const parsedData = JSON.parse(savedData);
          setEmergencyData({
            ...defaultEmergencyData,
            ...parsedData
          });
        } catch (error) {
          console.error('Error parsing emergency data:', error);
          setEmergencyData(defaultEmergencyData);
        }
      }
      setLoading(false);
    };

    loadEmergencyData();
  }, []);

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      const updatedData = {
        ...emergencyData,
        summary: {
          ...emergencyData.summary,
          emergencyDeployments: emergencyData.summary.emergencyDeployments + Math.floor(Math.random() * 3)
        }
      };
      
      setEmergencyData(updatedData);
      localStorage.setItem('deviceHub_emergency', JSON.stringify(updatedData));
      setLoading(false);
      
      setSnackbar({
        open: true,
        message: 'Emergency devices data refreshed!',
        severity: 'success'
      });
    }, 1000);
  };

  const handleFilterClick = (event) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setFilterAnchorEl(null);
  };

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
    setFilterAnchorEl(null);
  };

  const handlePriorityChange = (priority) => {
    setSelectedPriority(priority);
    setFilterAnchorEl(null);
  };

  const handleDeviceSelect = (id) => {
    const selectedIndex = selectedDevices.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedDevices, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedDevices.slice(1));
    } else if (selectedIndex === selectedDevices.length - 1) {
      newSelected = newSelected.concat(selectedDevices.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedDevices.slice(0, selectedIndex),
        selectedDevices.slice(selectedIndex + 1)
      );
    }

    setSelectedDevices(newSelected);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = filteredDevices.map((device) => device.id);
      setSelectedDevices(newSelecteds);
      return;
    }
    setSelectedDevices([]);
  };

  const handleViewDevice = (device) => {
    setSelectedDevice(device);
    setDeviceDialogOpen(true);
  };

  const handleCloseDeviceDialog = () => {
    setDeviceDialogOpen(false);
    setSelectedDevice(null);
  };

  const handleDeployDevice = (device) => {
    setSelectedDevice(device);
    setDeploymentForm({
      ...deploymentForm,
      deviceId: device.id,
      deviceName: device.name
    });
    setDeployDialogOpen(true);
  };

  const handleCloseDeployDialog = () => {
    setDeployDialogOpen(false);
    setSelectedDevice(null);
    setDeploymentForm({
      deviceId: '',
      emergencyLevel: EMERGENCY_LEVELS.EMERGENCY,
      department: 'Emergency',
      assignedTo: '',
      patientId: '',
      notes: ''
    });
  };

  const handleReturnDevice = (device) => {
    setSelectedDevice(device);
    setReturnDialogOpen(true);
  };

  const handleCloseReturnDialog = () => {
    setReturnDialogOpen(false);
    setSelectedDevice(null);
  };

  const handleDeploymentFormChange = (field, value) => {
    setDeploymentForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmitDeployment = () => {
    if (!deploymentForm.assignedTo.trim()) {
      setSnackbar({
        open: true,
        message: 'Please enter the name of the person deploying the device',
        severity: 'error'
      });
      return;
    }

    // Update device status
    const updatedDevices = emergencyData.devices.map(device => {
      if (device.id === deploymentForm.deviceId) {
        return {
          ...device,
          status: DEVICE_STATUS.IN_USE,
          assignedTo: deploymentForm.assignedTo,
          patientId: deploymentForm.patientId || null,
          deploymentStart: new Date().toISOString(),
          emergencyLevel: deploymentForm.emergencyLevel
        };
      }
      return device;
    });

    // Create deployment record
    const newDeployment = {
      id: `DEP-${String(emergencyData.emergencyDeployments.length + 1).padStart(3, '0')}`,
      deviceId: deploymentForm.deviceId,
      deviceName: selectedDevice?.name || '',
      emergencyLevel: deploymentForm.emergencyLevel,
      department: deploymentForm.department,
      assignedTo: deploymentForm.assignedTo,
      patientId: deploymentForm.patientId || null,
      deploymentStart: new Date().toISOString(),
      deploymentEnd: null,
      duration: '0 hours',
      status: 'active',
      notes: deploymentForm.notes
    };

    const updatedData = {
      ...emergencyData,
      devices: updatedDevices,
      emergencyDeployments: [newDeployment, ...emergencyData.emergencyDeployments],
      summary: {
        ...emergencyData.summary,
        availableDevices: emergencyData.summary.availableDevices - 1,
        inUseDevices: emergencyData.summary.inUseDevices + 1,
        emergencyDeployments: emergencyData.summary.emergencyDeployments + 1
      },
      recentActivities: [
        {
          id: emergencyData.recentActivities.length + 1,
          action: `Device deployed for ${deploymentForm.emergencyLevel.replace('_', ' ')}`,
          device: selectedDevice?.name || '',
          user: deploymentForm.assignedTo,
          time: 'Just now'
        },
        ...emergencyData.recentActivities
      ]
    };

    setEmergencyData(updatedData);
    localStorage.setItem('deviceHub_emergency', JSON.stringify(updatedData));
    
    handleCloseDeployDialog();
    
    setSnackbar({
      open: true,
      message: `Device "${selectedDevice?.name}" deployed successfully!`,
      severity: 'success'
    });
  };

  const handleSubmitReturn = () => {
    if (!selectedDevice) return;

    // Update device status
    const updatedDevices = emergencyData.devices.map(device => {
      if (device.id === selectedDevice.id) {
        return {
          ...device,
          status: DEVICE_STATUS.AVAILABLE,
          assignedTo: 'Not Assigned',
          patientId: null,
          deploymentStart: null,
          deploymentDuration: null,
          lastUsed: new Date().toISOString()
        };
      }
      return device;
    });

    // Update deployment record
    const updatedDeployments = emergencyData.emergencyDeployments.map(deployment => {
      if (deployment.deviceId === selectedDevice.id && deployment.status === 'active') {
        const startTime = new Date(deployment.deploymentStart);
        const endTime = new Date();
        const durationHours = ((endTime - startTime) / (1000 * 60 * 60)).toFixed(1);
        
        return {
          ...deployment,
          deploymentEnd: endTime.toISOString(),
          duration: `${durationHours} hours`,
          status: 'completed'
        };
      }
      return deployment;
    });

    const updatedData = {
      ...emergencyData,
      devices: updatedDevices,
      emergencyDeployments: updatedDeployments,
      summary: {
        ...emergencyData.summary,
        availableDevices: emergencyData.summary.availableDevices + 1,
        inUseDevices: emergencyData.summary.inUseDevices - 1
      },
      recentActivities: [
        {
          id: emergencyData.recentActivities.length + 1,
          action: 'Device returned from deployment',
          device: selectedDevice.name,
          user: 'System',
          time: 'Just now'
        },
        ...emergencyData.recentActivities
      ]
    };

    setEmergencyData(updatedData);
    localStorage.setItem('deviceHub_emergency', JSON.stringify(updatedData));
    
    handleCloseReturnDialog();
    
    setSnackbar({
      open: true,
      message: `Device "${selectedDevice.name}" returned successfully!`,
      severity: 'success'
    });
  };

  const handleDeleteSelected = () => {
    if (selectedDevices.length === 0) return;

    const updatedData = {
      ...emergencyData,
      devices: emergencyData.devices.filter(device => !selectedDevices.includes(device.id)),
      summary: {
        ...emergencyData.summary,
        totalDevices: emergencyData.summary.totalDevices - selectedDevices.length
      }
    };

    setEmergencyData(updatedData);
    localStorage.setItem('deviceHub_emergency', JSON.stringify(updatedData));
    setSelectedDevices([]);
    
    setSnackbar({
      open: true,
      message: `${selectedDevices.length} device(s) removed from emergency pool!`,
      severity: 'success'
    });
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

  const getCategoryColor = (category) => {
    switch (category) {
      case DEVICE_CATEGORIES.STETHOSCOPE:
        return EMERGENCY_COLORS.info;
      case DEVICE_CATEGORIES.ECG_MONITOR:
        return EMERGENCY_COLORS.danger;
      case DEVICE_CATEGORIES.PULSE_OXIMETER:
        return EMERGENCY_COLORS.success;
      case DEVICE_CATEGORIES.PORTABLE_DIAGNOSTIC:
        return EMERGENCY_COLORS.purple;
      case DEVICE_CATEGORIES.DEFIBRILLATOR:
        return EMERGENCY_COLORS.critical;
      case DEVICE_CATEGORIES.VENTILATOR:
        return EMERGENCY_COLORS.teal;
      case DEVICE_CATEGORIES.INFUSION_PUMP:
        return EMERGENCY_COLORS.warning;
      case DEVICE_CATEGORIES.BLOOD_PRESSURE:
        return EMERGENCY_COLORS.primary;
      case DEVICE_CATEGORIES.GLUCOSE_MONITOR:
        return EMERGENCY_COLORS.secondary;
      default:
        return EMERGENCY_COLORS.gray;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case DEVICE_STATUS.AVAILABLE:
        return EMERGENCY_COLORS.available;
      case DEVICE_STATUS.IN_USE:
        return EMERGENCY_COLORS.in_use;
      case DEVICE_STATUS.MAINTENANCE:
        return EMERGENCY_COLORS.maintenance;
      case DEVICE_STATUS.CRITICAL:
        return EMERGENCY_COLORS.critical;
      case DEVICE_STATUS.LOW_BATTERY:
        return EMERGENCY_COLORS.low_stock;
      default:
        return EMERGENCY_COLORS.gray;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case PRIORITY_LEVELS.LOW:
        return EMERGENCY_COLORS.success;
      case PRIORITY_LEVELS.MEDIUM:
        return EMERGENCY_COLORS.info;
      case PRIORITY_LEVELS.HIGH:
        return EMERGENCY_COLORS.warning;
      case PRIORITY_LEVELS.CRITICAL:
        return EMERGENCY_COLORS.critical;
      default:
        return EMERGENCY_COLORS.gray;
    }
  };

  const getEmergencyLevelColor = (level) => {
    switch (level) {
      case EMERGENCY_LEVELS.ROUTINE:
        return EMERGENCY_COLORS.success;
      case EMERGENCY_LEVELS.URGENT:
        return EMERGENCY_COLORS.warning;
      case EMERGENCY_LEVELS.EMERGENCY:
        return EMERGENCY_COLORS.danger;
      case EMERGENCY_LEVELS.CODE_BLUE:
        return EMERGENCY_COLORS.critical;
      default:
        return EMERGENCY_COLORS.gray;
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case DEVICE_CATEGORIES.STETHOSCOPE:
        return <MedicalServicesIcon />;
      case DEVICE_CATEGORIES.ECG_MONITOR:
        return <MonitorHeartIcon />;
      case DEVICE_CATEGORIES.PULSE_OXIMETER:
        return <MonitorHeartIcon />;
      case DEVICE_CATEGORIES.PORTABLE_DIAGNOSTIC:
        return <MedicalIcon />;
      case DEVICE_CATEGORIES.DEFIBRILLATOR:
        return <HeartIcon />;
      case DEVICE_CATEGORIES.VENTILATOR:
        return <VirusIcon />;
      case DEVICE_CATEGORIES.INFUSION_PUMP:
        return <MedicalIcon />;
      case DEVICE_CATEGORIES.BLOOD_PRESSURE:
        return <HeartIcon />;
      case DEVICE_CATEGORIES.GLUCOSE_MONITOR:
        return <BiotechIcon />;
      default:
        return <DevicesIcon />;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case DEVICE_STATUS.AVAILABLE:
        return <CheckCircleIcon />;
      case DEVICE_STATUS.IN_USE:
        return <PlayIcon />;
      case DEVICE_STATUS.MAINTENANCE:
        return <BuildIcon />;
      case DEVICE_STATUS.CRITICAL:
        return <WarningIcon />;
      case DEVICE_STATUS.LOW_BATTERY:
        return <BatteryAlertIcon />;
      default:
        return <InfoIcon />;
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case PRIORITY_LEVELS.LOW:
        return <LowPriorityIcon />;
      case PRIORITY_LEVELS.MEDIUM:
        return <InfoIcon />;
      case PRIORITY_LEVELS.HIGH:
        return <WarningIcon />;
      case PRIORITY_LEVELS.CRITICAL:
        return <PriorityHighIcon />;
      default:
        return <InfoIcon />;
    }
  };

  const getEmergencyLevelIcon = (level) => {
    switch (level) {
      case EMERGENCY_LEVELS.ROUTINE:
        return <InfoIcon />;
      case EMERGENCY_LEVELS.URGENT:
        return <WarningIcon />;
      case EMERGENCY_LEVELS.EMERGENCY:
        return <DevicesIcon />;
      case EMERGENCY_LEVELS.CODE_BLUE:
        return <CrisisIcon />;
      default:
        return <InfoIcon />;
    }
  };

  const getBluetoothIcon = (status) => {
    switch (status) {
      case 'connected':
        return <BluetoothIcon sx={{ color: EMERGENCY_COLORS.success.border }} />;
      case 'disconnected':
        return <BluetoothDisabledIcon sx={{ color: EMERGENCY_COLORS.danger.border }} />;
      default:
        return <BluetoothIcon sx={{ color: EMERGENCY_COLORS.gray.border }} />;
    }
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

  const formatTimeAgo = (dateTimeString) => {
    if (!dateTimeString) return 'N/A';
    const date = new Date(dateTimeString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  // Filter and sort devices
  const filteredDevices = emergencyData.devices.filter(device => {
    const matchesSearch = searchQuery === '' || 
      device.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      device.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      device.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      device.department.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'all' || device.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || device.status === selectedStatus;
    const matchesPriority = selectedPriority === 'all' || device.priority === selectedPriority;

    return matchesSearch && matchesCategory && matchesStatus && matchesPriority;
  });

  const sortedDevices = filteredDevices.sort((a, b) => {
    if (orderBy === 'id' || orderBy === 'name' || orderBy === 'location') {
      return order === 'asc' 
        ? a[orderBy].localeCompare(b[orderBy])
        : b[orderBy].localeCompare(a[orderBy]);
    }
    if (orderBy === 'batteryLevel' || orderBy === 'responseTime') {
      const aValue = orderBy === 'batteryLevel' ? a.batteryLevel : parseFloat(a.responseTime);
      const bValue = orderBy === 'batteryLevel' ? b.batteryLevel : parseFloat(b.responseTime);
      return order === 'asc' ? aValue - bValue : bValue - aValue;
    }
    return 0;
  });

  const paginatedDevices = sortedDevices.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  // Calculate quick stats
  const criticalDevices = emergencyData.devices.filter(d => d.critical).length;
  const lowBatteryDevices = emergencyData.devices.filter(d => d.batteryLevel < 30).length;
  const rapidResponseDevices = emergencyData.devices.filter(d => parseFloat(d.responseTime) < 1).length;

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
          <Typography variant="h5" gutterBottom sx={{ color: EMERGENCY_COLORS.primary.text }}>
            Loading Emergency Devices
          </Typography>
          <LinearProgress sx={{ height: 8, borderRadius: 4, bgcolor: EMERGENCY_COLORS.primary.bg }} />
          <Typography variant="body2" sx={{ mt: 2, color: EMERGENCY_COLORS.gray.text }}>
            Loading critical care equipment data...
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
            backgroundColor: EMERGENCY_COLORS.primary.bg,
            border: `2px solid ${EMERGENCY_COLORS.primary.border}`,
            position: 'relative',
            overflow: 'hidden'
          }}>
            <Box sx={{ 
              position: 'absolute', 
              top: 0, 
              right: 0,
              width: 300,
              height: 300,
              background: `radial-gradient(circle, ${alpha(EMERGENCY_COLORS.primary.border, 0.1)} 0%, transparent 70%)`,
              transform: 'translate(30%, -30%)'
            }} />
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                  <Avatar sx={{ 
                    bgcolor: alpha(EMERGENCY_COLORS.primary.border, 0.1), 
                    color: EMERGENCY_COLORS.primary.border,
                    width: 56,
                    height: 56
                  }}>
                    <DevicesIcon fontSize="large" />
                  </Avatar>
                  <Box>
                    <Typography variant="h3" fontWeight="bold" sx={{ color: EMERGENCY_COLORS.primary.text }}>
                      Emergency Devices
                    </Typography>
                    <Typography variant="body1" sx={{ color: EMERGENCY_COLORS.primary.text }}>
                      Rapid-access critical care equipment management
                    </Typography>
                  </Box>
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 1 }}>
                <Chip
                  icon={<CrisisIcon />}
                  label="CRITICAL CARE READY"
                  sx={{
                    bgcolor: EMERGENCY_COLORS.danger.border,
                    color: 'white',
                    fontWeight: 'bold'
                  }}
                  size="small"
                />
                <Typography variant="caption" sx={{ color: EMERGENCY_COLORS.primary.text }}>
                  {emergencyData.summary.availableDevices} devices ready for emergency use
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    variant="outlined"
                    startIcon={<PrintIcon />}
                    sx={{ 
                      borderRadius: 2,
                      borderColor: EMERGENCY_COLORS.primary.border,
                      color: EMERGENCY_COLORS.primary.border
                    }}
                  >
                    Quick Report
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<RefreshIcon />}
                    onClick={handleRefresh}
                    sx={{ 
                      borderRadius: 2,
                      bgcolor: EMERGENCY_COLORS.primary.border,
                      '&:hover': {
                        bgcolor: alpha(EMERGENCY_COLORS.primary.border, 0.9)
                      }
                    }}
                  >
                    Refresh
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Grow>

        {/* Alert Banner */}
        {emergencyData.alerts.filter(a => a.status === 'active').length > 0 && (
          <Slide direction="down" in={true} timeout={800}>
            <Alert 
              severity="warning" 
              sx={{ 
                mb: 4, 
                borderRadius: 3,
                backgroundColor: EMERGENCY_COLORS.warning.bg,
                border: `2px solid ${EMERGENCY_COLORS.warning.border}`,
                color: EMERGENCY_COLORS.warning.text
              }}
              icon={<AlertIcon />}
            >
              <AlertTitle>Emergency Alerts Active</AlertTitle>
              {emergencyData.alerts.filter(a => a.status === 'active').length} active alerts requiring attention
            </Alert>
          </Slide>
        )}

        {/* Summary Cards */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 4 }}>
          {[
            { 
              title: 'Available Now', 
              value: emergencyData.summary.availableDevices, 
              icon: <CheckCircleIcon />, 
              color: EMERGENCY_COLORS.success,
              trend: '+3',
              description: 'Ready for immediate deployment'
            },
            { 
              title: 'In Use', 
              value: emergencyData.summary.inUseDevices, 
              icon: <PlayIcon />, 
              color: EMERGENCY_COLORS.info,
              trend: '+2',
              description: 'Currently deployed'
            },
            { 
              title: 'Critical Devices', 
              value: criticalDevices, 
              icon: <PriorityHighIcon />, 
              color: EMERGENCY_COLORS.critical,
              trend: '+1',
              description: 'High-priority equipment'
            },
            { 
              title: 'Avg Response Time', 
              value: emergencyData.summary.averageResponseTime, 
              icon: <SpeedIcon />, 
              color: EMERGENCY_COLORS.teal,
              trend: '-0.2m',
              description: 'Time to deployment'
            },
            { 
              title: 'Low Battery', 
              value: lowBatteryDevices, 
              icon: <BatteryAlertIcon />, 
              color: EMERGENCY_COLORS.warning,
              trend: '+1',
              description: 'Need charging'
            },
            { 
              title: 'Active Deployments', 
              value: emergencyData.summary.emergencyDeployments, 
              icon: <ShuttleIcon />, 
              color: EMERGENCY_COLORS.purple,
              trend: '+3',
              description: 'Ongoing emergencies'
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
            placeholder="Search emergency devices by ID, name, or location..."
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
                  <SearchIcon sx={{ color: EMERGENCY_COLORS.gray.border }} />
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
              borderColor: EMERGENCY_COLORS.gray.border,
              color: EMERGENCY_COLORS.gray.text
            }}
          >
            Filter
          </Button>
          <Button
            variant="outlined"
            startIcon={<SpeedIcon />}
            sx={{ 
              borderRadius: 2,
              borderColor: EMERGENCY_COLORS.info.border,
              color: EMERGENCY_COLORS.info.text
            }}
          >
            Rapid Response
          </Button>
          <Button
            variant="contained"
            startIcon={<DevicesIcon />}
            onClick={() => {
              const availableDevice = emergencyData.devices.find(d => d.status === DEVICE_STATUS.AVAILABLE);
              if (availableDevice) {
                handleDeployDevice(availableDevice);
              } else {
                setSnackbar({
                  open: true,
                  message: 'No available devices for emergency deployment!',
                  severity: 'warning'
                });
              }
            }}
            sx={{ 
              borderRadius: 2,
              bgcolor: EMERGENCY_COLORS.danger.border,
              '&:hover': { bgcolor: alpha(EMERGENCY_COLORS.danger.border, 0.9) }
            }}
          >
            Quick Deploy
          </Button>
        </Box>

        {/* Filter Menu */}
        <Menu
          anchorEl={filterAnchorEl}
          open={Boolean(filterAnchorEl)}
          onClose={handleFilterClose}
        >
          <MenuItem>
            <Typography variant="subtitle2" sx={{ color: EMERGENCY_COLORS.gray.text }}>
              Filter by Category:
            </Typography>
          </MenuItem>
          <MenuItem onClick={() => handleCategoryChange('all')}>
            <ListItemIcon>
              <CategoryIcon />
            </ListItemIcon>
            All Categories
          </MenuItem>
          {Object.values(DEVICE_CATEGORIES).map((category) => (
            <MenuItem key={category} onClick={() => handleCategoryChange(category)}>
              <ListItemIcon>
                {getCategoryIcon(category)}
              </ListItemIcon>
              {category.replace('_', ' ').toUpperCase()}
            </MenuItem>
          ))}
          <Divider />
          <MenuItem>
            <Typography variant="subtitle2" sx={{ color: EMERGENCY_COLORS.gray.text }}>
              Filter by Status:
            </Typography>
          </MenuItem>
          <MenuItem onClick={() => handleStatusChange('all')}>
            <ListItemIcon>
              <TimelineIcon />
            </ListItemIcon>
            All Status
          </MenuItem>
          {Object.values(DEVICE_STATUS).map((status) => (
            <MenuItem key={status} onClick={() => handleStatusChange(status)}>
              <ListItemIcon>
                {getStatusIcon(status)}
              </ListItemIcon>
              {status.replace('_', ' ').toUpperCase()}
            </MenuItem>
          ))}
          <Divider />
          <MenuItem>
            <Typography variant="subtitle2" sx={{ color: EMERGENCY_COLORS.gray.text }}>
              Filter by Priority:
            </Typography>
          </MenuItem>
          <MenuItem onClick={() => handlePriorityChange('all')}>
            <ListItemIcon>
              <PriorityHighIcon />
            </ListItemIcon>
            All Priorities
          </MenuItem>
          {Object.values(PRIORITY_LEVELS).map((priority) => (
            <MenuItem key={priority} onClick={() => handlePriorityChange(priority)}>
              <ListItemIcon>
                {getPriorityIcon(priority)}
              </ListItemIcon>
              {priority.toUpperCase()}
            </MenuItem>
          ))}
        </Menu>

        {/* Active Filters Display */}
        {(selectedCategory !== 'all' || selectedStatus !== 'all' || selectedPriority !== 'all') && (
          <Box sx={{ mb: 3, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {selectedCategory !== 'all' && (
              <Chip
                label={`Category: ${selectedCategory}`}
                onDelete={() => setSelectedCategory('all')}
                deleteIcon={<CloseIcon />}
                sx={{ 
                  bgcolor: getCategoryColor(selectedCategory).bg,
                  color: getCategoryColor(selectedCategory).text
                }}
              />
            )}
            {selectedStatus !== 'all' && (
              <Chip
                label={`Status: ${selectedStatus}`}
                onDelete={() => setSelectedStatus('all')}
                deleteIcon={<CloseIcon />}
                sx={{ 
                  bgcolor: getStatusColor(selectedStatus).bg,
                  color: getStatusColor(selectedStatus).text
                }}
              />
            )}
            {selectedPriority !== 'all' && (
              <Chip
                label={`Priority: ${selectedPriority}`}
                onDelete={() => setSelectedPriority('all')}
                deleteIcon={<CloseIcon />}
                sx={{ 
                  bgcolor: getPriorityColor(selectedPriority).bg,
                  color: getPriorityColor(selectedPriority).text
                }}
              />
            )}
          </Box>
        )}

        {/* Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs 
            value={activeTab} 
            onChange={(e, newValue) => setActiveTab(newValue)}
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab 
              label="All Devices" 
              icon={<DevicesIcon />} 
              iconPosition="start" 
              sx={{ minHeight: 48 }}
            />
            <Tab 
              label="Active Deployments" 
              icon={<ShuttleIcon />} 
              iconPosition="start" 
              sx={{ minHeight: 48 }}
            />
            <Tab 
              label="Emergency Alerts" 
              icon={<AlertIcon />} 
              iconPosition="start" 
              sx={{ minHeight: 48 }}
            />
            <Tab 
              label="Rapid Response" 
              icon={<RunIcon />} 
              iconPosition="start" 
              sx={{ minHeight: 48 }}
            />
          </Tabs>
        </Box>

        {/* Tab Content */}
        <Fade in={true} timeout={300} key={activeTab}>
          <Box>
            {activeTab === 0 ? (
              <Box>
                <Card sx={{ 
                  borderRadius: 3, 
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                  backgroundColor: EMERGENCY_COLORS.gray.bg,
                  border: `2px solid ${EMERGENCY_COLORS.gray.border}`,
                  mb: 3
                }}>
                  <CardContent>
                    <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 'none' }}>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell padding="checkbox">
                              <Checkbox
                                indeterminate={selectedDevices.length > 0 && selectedDevices.length < filteredDevices.length}
                                checked={filteredDevices.length > 0 && selectedDevices.length === filteredDevices.length}
                                onChange={handleSelectAllClick}
                              />
                            </TableCell>
                            <TableCell>
                              <TableSortLabel
                                active={orderBy === 'id'}
                                direction={orderBy === 'id' ? order : 'asc'}
                                onClick={() => handleRequestSort('id')}
                              >
                                Device ID
                              </TableSortLabel>
                            </TableCell>
                            <TableCell>
                              <TableSortLabel
                                active={orderBy === 'name'}
                                direction={orderBy === 'name' ? order : 'asc'}
                                onClick={() => handleRequestSort('name')}
                              >
                                Device
                              </TableSortLabel>
                            </TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Priority</TableCell>
                            <TableCell>Location</TableCell>
                            <TableCell>Battery</TableCell>
                            <TableCell align="right">Actions</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {paginatedDevices.map((device) => {
                            const categoryColor = getCategoryColor(device.category);
                            const statusColor = getStatusColor(device.status);
                            const priorityColor = getPriorityColor(device.priority);
                            const isSelected = selectedDevices.indexOf(device.id) !== -1;

                            return (
                              <TableRow
                                key={device.id}
                                hover
                                selected={isSelected}
                                sx={{ 
                                  '&:hover': {
                                    backgroundColor: alpha(categoryColor.border, 0.05)
                                  }
                                }}
                              >
                                <TableCell padding="checkbox">
                                  <Checkbox
                                    checked={isSelected}
                                    onChange={() => handleDeviceSelect(device.id)}
                                  />
                                </TableCell>
                                <TableCell>
                                  <Typography variant="body2" fontWeight="bold" sx={{ color: EMERGENCY_COLORS.primary.text }}>
                                    {device.id}
                                  </Typography>
                                  {device.critical && (
                                    <Chip
                                      label="CRITICAL"
                                      size="small"
                                      sx={{ 
                                        mt: 0.5,
                                        bgcolor: EMERGENCY_COLORS.critical.bg,
                                        color: EMERGENCY_COLORS.critical.text,
                                        fontSize: '0.6rem'
                                      }}
                                    />
                                  )}
                                </TableCell>
                                <TableCell>
                                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Avatar sx={{ 
                                      width: 32, 
                                      height: 32, 
                                      bgcolor: alpha(categoryColor.border, 0.1),
                                      color: categoryColor.border
                                    }}>
                                      {getCategoryIcon(device.category)}
                                    </Avatar>
                                    <Box>
                                      <Typography variant="body2" fontWeight="medium">
                                        {device.name}
                                      </Typography>
                                      <Typography variant="caption" sx={{ color: EMERGENCY_COLORS.gray.text }}>
                                        {device.department}
                                      </Typography>
                                    </Box>
                                  </Box>
                                </TableCell>
                                <TableCell>
                                  <Chip
                                    icon={getCategoryIcon(device.category)}
                                    label={device.category.replace('_', ' ')}
                                    size="small"
                                    sx={{ 
                                      bgcolor: categoryColor.bg,
                                      color: categoryColor.text,
                                      border: `1px solid ${categoryColor.border}`
                                    }}
                                  />
                                </TableCell>
                                <TableCell>
                                  <Chip
                                    icon={getStatusIcon(device.status)}
                                    label={device.status.replace('_', ' ').toUpperCase()}
                                    size="small"
                                    sx={{ 
                                      bgcolor: statusColor.bg,
                                      color: statusColor.text,
                                      border: `1px solid ${statusColor.border}`
                                    }}
                                  />
                                </TableCell>
                                <TableCell>
                                  <Chip
                                    icon={getPriorityIcon(device.priority)}
                                    label={device.priority.toUpperCase()}
                                    size="small"
                                    sx={{ 
                                      bgcolor: priorityColor.bg,
                                      color: priorityColor.text,
                                      border: `1px solid ${priorityColor.border}`
                                    }}
                                  />
                                </TableCell>
                                <TableCell>
                                  <Box>
                                    <Typography variant="body2">
                                      {device.location}
                                    </Typography>
                                    <Typography variant="caption" sx={{ color: EMERGENCY_COLORS.gray.text }}>
                                      {device.assignedTo}
                                    </Typography>
                                  </Box>
                                </TableCell>
                                <TableCell>
                                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Box sx={{ width: 60 }}>
                                      <LinearProgress 
                                        variant="determinate" 
                                        value={device.batteryLevel}
                                        sx={{
                                          height: 8,
                                          borderRadius: 4,
                                          bgcolor: EMERGENCY_COLORS.gray.bg,
                                          '& .MuiLinearProgress-bar': {
                                            bgcolor: device.batteryLevel > 50 ? EMERGENCY_COLORS.success.border : 
                                                   device.batteryLevel > 20 ? EMERGENCY_COLORS.warning.border : 
                                                   EMERGENCY_COLORS.danger.border
                                          }
                                        }}
                                      />
                                    </Box>
                                    <Typography variant="caption" sx={{ color: EMERGENCY_COLORS.gray.text }}>
                                      {device.batteryLevel}%
                                    </Typography>
                                  </Box>
                                </TableCell>
                                <TableCell align="right">
                                  <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                                    {device.status === DEVICE_STATUS.AVAILABLE && (
                                      <Tooltip title="Deploy Device">
                                        <IconButton 
                                          size="small"
                                          onClick={() => handleDeployDevice(device)}
                                          sx={{ color: EMERGENCY_COLORS.success.border }}
                                        >
                                          <PlayIcon fontSize="small" />
                                        </IconButton>
                                      </Tooltip>
                                    )}
                                    {device.status === DEVICE_STATUS.IN_USE && (
                                      <Tooltip title="Return Device">
                                        <IconButton 
                                          size="small"
                                          onClick={() => handleReturnDevice(device)}
                                          sx={{ color: EMERGENCY_COLORS.info.border }}
                                        >
                                          <ReturnIcon fontSize="small" />
                                        </IconButton>
                                      </Tooltip>
                                    )}
                                    <Tooltip title="View Details">
                                      <IconButton 
                                        size="small"
                                        onClick={() => handleViewDevice(device)}
                                      >
                                        <VisibilityIcon fontSize="small" />
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
                      count={filteredDevices.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                  </CardContent>
                </Card>

                {selectedDevices.length > 0 && (
                  <Card sx={{ 
                    mb: 3, 
                    p: 2, 
                    borderRadius: 3,
                    backgroundColor: EMERGENCY_COLORS.warning.bg,
                    border: `2px solid ${EMERGENCY_COLORS.warning.border}`
                  }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Typography variant="body2" sx={{ color: EMERGENCY_COLORS.warning.text }}>
                        {selectedDevices.length} device(s) selected
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button
                          variant="outlined"
                          size="small"
                          startIcon={<DevicesIcon />}
                          sx={{ borderColor: EMERGENCY_COLORS.danger.border, color: EMERGENCY_COLORS.danger.text }}
                        >
                          Bulk Deploy
                        </Button>
                        <Button
                          variant="outlined"
                          size="small"
                          startIcon={<BuildIcon />}
                          sx={{ borderColor: EMERGENCY_COLORS.info.border, color: EMERGENCY_COLORS.info.text }}
                        >
                          Schedule Maintenance
                        </Button>
                        <Button
                          variant="contained"
                          size="small"
                          startIcon={<DeleteIcon />}
                          onClick={handleDeleteSelected}
                          sx={{ bgcolor: EMERGENCY_COLORS.danger.border }}
                        >
                          Remove from Pool
                        </Button>
                      </Box>
                    </Box>
                  </Card>
                )}
              </Box>
            ) : activeTab === 1 ? (
              <Card sx={{ 
                borderRadius: 3, 
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                backgroundColor: EMERGENCY_COLORS.info.bg,
                border: `2px solid ${EMERGENCY_COLORS.info.border}`,
                mb: 3
              }}>
                <CardHeader
                  title={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <ShuttleIcon sx={{ color: EMERGENCY_COLORS.info.border }} />
                      <Typography variant="h6" sx={{ color: EMERGENCY_COLORS.info.text }}>
                        Active Emergency Deployments
                      </Typography>
                    </Box>
                  }
                  subheader="Real-time tracking of deployed emergency devices"
                />
                <CardContent>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                    {emergencyData.emergencyDeployments
                      .filter(dep => dep.status === 'active')
                      .map((deployment, index) => {
                        const levelColor = getEmergencyLevelColor(deployment.emergencyLevel);
                        
                        return (
                          <Grow in={true} timeout={500 + index * 100} key={deployment.id}>
                            <Card sx={{ 
                              flex: '1 1 300px', 
                              borderRadius: 3,
                              backgroundColor: 'white',
                              border: `2px solid ${levelColor.border}`,
                              transition: 'transform 0.3s ease',
                              '&:hover': {
                                transform: 'translateY(-4px)'
                              }
                            }}>
                              <CardContent>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                  <Box>
                                    <Typography variant="subtitle1" fontWeight="bold" sx={{ color: levelColor.text }}>
                                      {deployment.deviceName}
                                    </Typography>
                                    <Typography variant="caption" sx={{ color: levelColor.text }}>
                                      {deployment.deviceId}
                                    </Typography>
                                  </Box>
                                  <Chip
                                    icon={getEmergencyLevelIcon(deployment.emergencyLevel)}
                                    label={deployment.emergencyLevel.replace('_', ' ').toUpperCase()}
                                    size="small"
                                    sx={{ 
                                      bgcolor: levelColor.bg,
                                      color: levelColor.text
                                    }}
                                  />
                                </Box>
                                
                                <Divider sx={{ my: 2 }} />
                                
                                <Box sx={{ mb: 2 }}>
                                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                                    <Box>
                                      <Typography variant="caption" sx={{ color: EMERGENCY_COLORS.gray.text, display: 'block' }}>
                                        Assigned To
                                      </Typography>
                                      <Typography variant="body2" sx={{ color: levelColor.text }}>
                                        {deployment.assignedTo}
                                      </Typography>
                                    </Box>
                                    <Box>
                                      <Typography variant="caption" sx={{ color: EMERGENCY_COLORS.gray.text, display: 'block' }}>
                                        Department
                                      </Typography>
                                      <Typography variant="body2" sx={{ color: levelColor.text }}>
                                        {deployment.department}
                                      </Typography>
                                    </Box>
                                  </Box>
                                  
                                  <Box sx={{ mb: 2 }}>
                                    <Typography variant="caption" sx={{ color: EMERGENCY_COLORS.gray.text, display: 'block', mb: 0.5 }}>
                                      Patient ID
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: levelColor.text }}>
                                      {deployment.patientId || 'N/A'}
                                    </Typography>
                                  </Box>
                                  
                                  <Box>
                                    <Typography variant="caption" sx={{ color: EMERGENCY_COLORS.gray.text, display: 'block', mb: 0.5 }}>
                                      Deployment Time
                                    </Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                      <ScheduleIcon fontSize="small" sx={{ color: levelColor.border }} />
                                      <Typography variant="body2" sx={{ color: levelColor.text }}>
                                        {formatDateTime(deployment.deploymentStart)} ({deployment.duration})
                                      </Typography>
                                    </Box>
                                  </Box>
                                </Box>
                                
                                {deployment.notes && (
                                  <>
                                    <Divider sx={{ my: 2 }} />
                                    <Box>
                                      <Typography variant="caption" sx={{ color: EMERGENCY_COLORS.gray.text, display: 'block', mb: 0.5 }}>
                                        Notes
                                      </Typography>
                                      <Typography variant="body2" sx={{ color: levelColor.text }}>
                                        {deployment.notes}
                                      </Typography>
                                    </Box>
                                  </>
                                )}
                                
                                <Divider sx={{ my: 2 }} />
                                
                                <Button
                                  variant="outlined"
                                  fullWidth
                                  size="small"
                                  startIcon={<ReturnIcon />}
                                  onClick={() => {
                                    const device = emergencyData.devices.find(d => d.id === deployment.deviceId);
                                    if (device) handleReturnDevice(device);
                                  }}
                                  sx={{ 
                                    borderColor: levelColor.border,
                                    color: levelColor.border
                                  }}
                                >
                                  Mark as Returned
                                </Button>
                              </CardContent>
                            </Card>
                          </Grow>
                        );
                      })}
                  </Box>
                </CardContent>
              </Card>
            ) : activeTab === 2 ? (
              <Card sx={{ 
                borderRadius: 3, 
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                backgroundColor: EMERGENCY_COLORS.warning.bg,
                border: `2px solid ${EMERGENCY_COLORS.warning.border}`,
                mb: 3
              }}>
                <CardHeader
                  title={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <AlertIcon sx={{ color: EMERGENCY_COLORS.warning.border }} />
                      <Typography variant="h6" sx={{ color: EMERGENCY_COLORS.warning.text }}>
                        Emergency Alerts & Notifications
                      </Typography>
                    </Box>
                  }
                  subheader="Critical alerts requiring immediate attention"
                />
                <CardContent>
                  <List sx={{ maxHeight: 400, overflow: 'auto' }}>
                    {emergencyData.alerts.map((alert, index) => (
                      <Slide direction="right" in={true} timeout={300 + index * 100} key={alert.id}>
                        <ListItem 
                          sx={{ 
                            mb: 2, 
                            borderRadius: 2,
                            backgroundColor: 'white',
                            border: `2px solid ${
                              alert.severity === 'high' ? EMERGENCY_COLORS.danger.border :
                              alert.severity === 'medium' ? EMERGENCY_COLORS.warning.border :
                              EMERGENCY_COLORS.info.border
                            }`,
                            '&:hover': {
                              backgroundColor: alpha(
                                alert.severity === 'high' ? EMERGENCY_COLORS.danger.border :
                                alert.severity === 'medium' ? EMERGENCY_COLORS.warning.border :
                                EMERGENCY_COLORS.info.border, 0.05
                              )
                            }
                          }}
                        >
                          <ListItemAvatar>
                            <Avatar sx={{ 
                              bgcolor: alpha(
                                alert.severity === 'high' ? EMERGENCY_COLORS.danger.border :
                                alert.severity === 'medium' ? EMERGENCY_COLORS.warning.border :
                                EMERGENCY_COLORS.info.border, 0.1
                              ), 
                              color: alert.severity === 'high' ? EMERGENCY_COLORS.danger.border :
                                     alert.severity === 'medium' ? EMERGENCY_COLORS.warning.border :
                                     EMERGENCY_COLORS.info.border
                            }}>
                              {alert.type === 'low_battery' ? <BatteryAlertIcon /> :
                               alert.type === 'maintenance' ? <BuildIcon /> :
                               <WarningIcon />}
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Typography variant="body2" fontWeight="medium">
                                  {alert.deviceName}
                                </Typography>
                                <Chip
                                  label={alert.severity.toUpperCase()}
                                  size="small"
                                  sx={{ 
                                    bgcolor: alert.severity === 'high' ? EMERGENCY_COLORS.danger.bg :
                                           alert.severity === 'medium' ? EMERGENCY_COLORS.warning.bg :
                                           EMERGENCY_COLORS.info.bg,
                                    color: alert.severity === 'high' ? EMERGENCY_COLORS.danger.text :
                                           alert.severity === 'medium' ? EMERGENCY_COLORS.warning.text :
                                           EMERGENCY_COLORS.info.text
                                  }}
                                />
                              </Box>
                            }
                            secondary={
                              <Box>
                                <Typography variant="caption" sx={{ color: EMERGENCY_COLORS.gray.text, display: 'block' }}>
                                  {alert.message} • {formatTimeAgo(alert.timestamp)}
                                </Typography>
                              </Box>
                            }
                          />
                          <ListItemSecondaryAction>
                            <Chip
                              label={alert.status.toUpperCase()}
                              size="small"
                              sx={{ 
                                bgcolor: alert.status === 'active' ? EMERGENCY_COLORS.danger.bg : EMERGENCY_COLORS.success.bg,
                                color: alert.status === 'active' ? EMERGENCY_COLORS.danger.text : EMERGENCY_COLORS.success.text
                              }}
                            />
                          </ListItemSecondaryAction>
                        </ListItem>
                      </Slide>
                    ))}
                  </List>
                </CardContent>
              </Card>
            ) : (
              <Card sx={{ 
                borderRadius: 3, 
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                backgroundColor: EMERGENCY_COLORS.danger.bg,
                border: `2px solid ${EMERGENCY_COLORS.danger.border}`,
                mb: 3
              }}>
                <CardHeader
                  title={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <RunIcon sx={{ color: EMERGENCY_COLORS.danger.border }} />
                      <Typography variant="h6" sx={{ color: EMERGENCY_COLORS.danger.text }}>
                        Rapid Response Dashboard
                      </Typography>
                    </Box>
                  }
                  subheader="Critical devices ready for immediate deployment"
                />
                <CardContent>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 4 }}>
                    {emergencyData.devices
                      .filter(device => device.priority === PRIORITY_LEVELS.CRITICAL && device.status === DEVICE_STATUS.AVAILABLE)
                      .map((device, index) => (
                        <Grow in={true} timeout={500 + index * 100} key={device.id}>
                          <Card sx={{ 
                            flex: '1 1 250px', 
                            borderRadius: 3,
                            backgroundColor: 'white',
                            border: `3px solid ${EMERGENCY_COLORS.danger.border}`,
                            boxShadow: `0 0 20px ${alpha(EMERGENCY_COLORS.danger.border, 0.2)}`,
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              transform: 'translateY(-8px) scale(1.02)',
                              boxShadow: `0 10px 40px ${alpha(EMERGENCY_COLORS.danger.border, 0.3)}`
                            }
                          }}>
                            <CardContent>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                <Avatar sx={{ 
                                  bgcolor: alpha(EMERGENCY_COLORS.danger.border, 0.1), 
                                  color: EMERGENCY_COLORS.danger.border,
                                  width: 48,
                                  height: 48
                                }}>
                                  {getCategoryIcon(device.category)}
                                </Avatar>
                                <Box sx={{ textAlign: 'right' }}>
                                  <Typography variant="h6" fontWeight="bold" sx={{ color: EMERGENCY_COLORS.danger.text }}>
                                    {device.responseTime}
                                  </Typography>
                                  <Typography variant="caption" sx={{ color: EMERGENCY_COLORS.danger.text }}>
                                    Response Time
                                  </Typography>
                                </Box>
                              </Box>
                              
                              <Typography variant="subtitle1" fontWeight="bold" sx={{ color: EMERGENCY_COLORS.danger.text, mb: 1 }}>
                                {device.name}
                              </Typography>
                              
                              <Typography variant="caption" sx={{ color: EMERGENCY_COLORS.gray.text, display: 'block', mb: 2 }}>
                                {device.location}
                              </Typography>
                              
                              <Divider sx={{ my: 2 }} />
                              
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                <Box>
                                  <Typography variant="caption" sx={{ color: EMERGENCY_COLORS.gray.text, display: 'block' }}>
                                    Battery
                                  </Typography>
                                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                    <BatteryFullIcon fontSize="small" sx={{ 
                                      color: device.batteryLevel > 50 ? EMERGENCY_COLORS.success.border : 
                                             device.batteryLevel > 20 ? EMERGENCY_COLORS.warning.border : 
                                             EMERGENCY_COLORS.danger.border 
                                    }} />
                                    <Typography variant="body2" sx={{ color: EMERGENCY_COLORS.danger.text }}>
                                      {device.batteryLevel}%
                                    </Typography>
                                  </Box>
                                </Box>
                                <Box>
                                  <Typography variant="caption" sx={{ color: EMERGENCY_COLORS.gray.text, display: 'block' }}>
                                    Signal
                                  </Typography>
                                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                    {getBluetoothIcon(device.bluetoothStatus)}
                                    <Typography variant="body2" sx={{ color: EMERGENCY_COLORS.danger.text }}>
                                      {device.signalStrength}%
                                    </Typography>
                                  </Box>
                                </Box>
                              </Box>
                              
                              <Button
                                variant="contained"
                                fullWidth
                                startIcon={<DevicesIcon />}
                                onClick={() => handleDeployDevice(device)}
                                sx={{ 
                                  bgcolor: EMERGENCY_COLORS.danger.border,
                                  '&:hover': {
                                    bgcolor: alpha(EMERGENCY_COLORS.danger.border, 0.9)
                                  }
                                }}
                              >
                                DEPLOY NOW
                              </Button>
                            </CardContent>
                          </Card>
                        </Grow>
                      ))}
                  </Box>
                  
                  <Typography variant="subtitle2" sx={{ color: EMERGENCY_COLORS.danger.text, mb: 2 }}>
                    Emergency Deployment Statistics
                  </Typography>
                  <Box sx={{ height: 250 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={emergencyData.statistics.statusDistribution}>
                        <CartesianGrid strokeDasharray="3 3" stroke={EMERGENCY_COLORS.gray.border} />
                        <XAxis dataKey="name" stroke={EMERGENCY_COLORS.gray.text} />
                        <YAxis stroke={EMERGENCY_COLORS.gray.text} />
                        <RechartsTooltip />
                        <Area 
                          type="monotone" 
                          dataKey="value" 
                          stroke={EMERGENCY_COLORS.danger.border} 
                          fill={alpha(EMERGENCY_COLORS.danger.border, 0.3)} 
                          name="Device Count"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </Box>
                </CardContent>
              </Card>
            )}
          </Box>
        </Fade>

        {/* Statistics Section */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mt: 4 }}>
          {/* Category Distribution */}
          <Card sx={{ 
            flex: '1 1 400px', 
            borderRadius: 3, 
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
            backgroundColor: EMERGENCY_COLORS.gray.bg,
            border: `2px solid ${EMERGENCY_COLORS.gray.border}`
          }}>
            <CardHeader
              title={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <CategoryIcon sx={{ color: EMERGENCY_COLORS.gray.border }} />
                  <Typography variant="h6" sx={{ color: EMERGENCY_COLORS.gray.text }}>
                    Emergency Device Categories
                  </Typography>
                </Box>
              }
            />
            <CardContent>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={emergencyData.statistics.categoryDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={(entry) => `${entry.name}: ${entry.value}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {emergencyData.statistics.categoryDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <RechartsTooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>

          {/* Recent Activities */}
          <Card sx={{ 
            flex: '1 1 400px', 
            borderRadius: 3, 
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
            backgroundColor: EMERGENCY_COLORS.info.bg,
            border: `2px solid ${EMERGENCY_COLORS.info.border}`
          }}>
            <CardHeader
              title={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <HistoryIcon sx={{ color: EMERGENCY_COLORS.info.border }} />
                  <Typography variant="h6" sx={{ color: EMERGENCY_COLORS.info.text }}>
                    Recent Emergency Activities
                  </Typography>
                </Box>
              }
            />
            <CardContent>
              <List sx={{ maxHeight: 300, overflow: 'auto' }}>
                {emergencyData.recentActivities.map((activity, index) => (
                  <ListItem key={activity.id} sx={{ py: 1 }}>
                    <ListItemAvatar>
                      <Avatar sx={{ 
                        width: 32, 
                        height: 32, 
                        bgcolor: alpha(EMERGENCY_COLORS.info.border, 0.1),
                        color: EMERGENCY_COLORS.info.border 
                      }}>
                        {activity.user.charAt(0)}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={activity.action}
                      secondary={`${activity.device} • ${activity.time}`}
                      primaryTypographyProps={{ variant: 'body2' }}
                      secondaryTypographyProps={{ variant: 'caption' }}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Box>

        {/* Deploy Device Dialog */}
        <Dialog 
          open={deployDialogOpen} 
          onClose={handleCloseDeployDialog}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar sx={{ 
                bgcolor: alpha(EMERGENCY_COLORS.danger.border, 0.1), 
                color: EMERGENCY_COLORS.danger.border 
              }}>
                <DevicesIcon />
              </Avatar>
              <Box>
                <Typography variant="h6">Deploy Emergency Device</Typography>
                <Typography variant="caption" sx={{ color: EMERGENCY_COLORS.gray.text }}>
                  {selectedDevice?.name} • {selectedDevice?.id}
                </Typography>
              </Box>
            </Box>
          </DialogTitle>
          <DialogContent dividers>
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle2" sx={{ color: EMERGENCY_COLORS.gray.text, mb: 2 }}>
                Deployment Details
              </Typography>
              
              <FormControl component="fieldset" sx={{ mb: 3 }}>
                <FormLabel component="legend" sx={{ color: EMERGENCY_COLORS.gray.text, mb: 1 }}>
                  Emergency Level
                </FormLabel>
                <RadioGroup
                  value={deploymentForm.emergencyLevel}
                  onChange={(e) => handleDeploymentFormChange('emergencyLevel', e.target.value)}
                >
                  {Object.values(EMERGENCY_LEVELS).map((level) => (
                    <FormControlLabel
                      key={level}
                      value={level}
                      control={<Radio size="small" />}
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {getEmergencyLevelIcon(level)}
                          <Typography variant="body2">
                            {level.replace('_', ' ').toUpperCase()}
                          </Typography>
                        </Box>
                      }
                    />
                  ))}
                </RadioGroup>
              </FormControl>
              
              <TextField
                fullWidth
                label="Assigned To *"
                value={deploymentForm.assignedTo}
                onChange={(e) => handleDeploymentFormChange('assignedTo', e.target.value)}
                variant="outlined"
                size="small"
                sx={{ mb: 2 }}
                placeholder="Doctor/Nurse Name"
              />
              
              <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <TextField
                  fullWidth
                  label="Department"
                  value={deploymentForm.department}
                  onChange={(e) => handleDeploymentFormChange('department', e.target.value)}
                  variant="outlined"
                  size="small"
                />
                <TextField
                  fullWidth
                  label="Patient ID"
                  value={deploymentForm.patientId}
                  onChange={(e) => handleDeploymentFormChange('patientId', e.target.value)}
                  variant="outlined"
                  size="small"
                  placeholder="Optional"
                />
              </Box>
              
              <TextField
                fullWidth
                label="Notes"
                value={deploymentForm.notes}
                onChange={(e) => handleDeploymentFormChange('notes', e.target.value)}
                variant="outlined"
                size="small"
                multiline
                rows={3}
                placeholder="Brief description of emergency situation..."
              />
              
              <Box sx={{ mt: 3, p: 2, borderRadius: 2, bgcolor: EMERGENCY_COLORS.info.bg }}>
                <Typography variant="caption" sx={{ color: EMERGENCY_COLORS.info.text, display: 'block', mb: 1 }}>
                  Device Status
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="caption" sx={{ color: EMERGENCY_COLORS.gray.text }}>
                    Battery:
                  </Typography>
                  <Typography variant="caption" sx={{ color: EMERGENCY_COLORS.info.text }}>
                    {selectedDevice?.batteryLevel}%
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="caption" sx={{ color: EMERGENCY_COLORS.gray.text }}>
                    Location:
                  </Typography>
                  <Typography variant="caption" sx={{ color: EMERGENCY_COLORS.info.text }}>
                    {selectedDevice?.location}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDeployDialog} startIcon={<CloseIcon />}>
              Cancel
            </Button>
            <Button 
              onClick={handleSubmitDeployment} 
              variant="contained" 
              startIcon={<DevicesIcon />}
              sx={{ bgcolor: EMERGENCY_COLORS.danger.border }}
            >
              Deploy Now
            </Button>
          </DialogActions>
        </Dialog>

        {/* Return Device Dialog */}
        <Dialog 
          open={returnDialogOpen} 
          onClose={handleCloseReturnDialog}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar sx={{ 
                bgcolor: alpha(EMERGENCY_COLORS.success.border, 0.1), 
                color: EMERGENCY_COLORS.success.border 
              }}>
                <ReturnIcon />
              </Avatar>
              <Box>
                <Typography variant="h6">Return Emergency Device</Typography>
                <Typography variant="caption" sx={{ color: EMERGENCY_COLORS.gray.text }}>
                  {selectedDevice?.name} • {selectedDevice?.id}
                </Typography>
              </Box>
            </Box>
          </DialogTitle>
          <DialogContent dividers>
            <Box sx={{ mt: 2 }}>
              <Alert severity="info" sx={{ mb: 3 }}>
                Are you sure you want to return this device to the emergency pool? 
                This will mark it as available for future deployments.
              </Alert>
              
              <Box sx={{ p: 2, borderRadius: 2, bgcolor: EMERGENCY_COLORS.info.bg }}>
                <Typography variant="subtitle2" sx={{ color: EMERGENCY_COLORS.info.text, mb: 1 }}>
                  Deployment Summary
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="caption" sx={{ color: EMERGENCY_COLORS.gray.text }}>
                    Assigned To:
                  </Typography>
                  <Typography variant="caption" sx={{ color: EMERGENCY_COLORS.info.text }}>
                    {selectedDevice?.assignedTo}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="caption" sx={{ color: EMERGENCY_COLORS.gray.text }}>
                    Current Battery:
                  </Typography>
                  <Typography variant="caption" sx={{ color: EMERGENCY_COLORS.info.text }}>
                    {selectedDevice?.batteryLevel}%
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="caption" sx={{ color: EMERGENCY_COLORS.gray.text }}>
                    Emergency Level:
                  </Typography>
                  <Typography variant="caption" sx={{ color: EMERGENCY_COLORS.info.text }}>
                    {selectedDevice?.emergencyLevel?.replace('_', ' ').toUpperCase()}
                  </Typography>
                </Box>
              </Box>
              
              <TextField
                fullWidth
                label="Return Notes (Optional)"
                variant="outlined"
                size="small"
                multiline
                rows={2}
                sx={{ mt: 3 }}
                placeholder="Any notes about device condition or maintenance needed..."
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseReturnDialog} startIcon={<CloseIcon />}>
              Cancel
            </Button>
            <Button 
              onClick={handleSubmitReturn} 
              variant="contained" 
              startIcon={<CheckCircleIcon />}
              sx={{ bgcolor: EMERGENCY_COLORS.success.border }}
            >
              Confirm Return
            </Button>
          </DialogActions>
        </Dialog>

        {/* Device Details Dialog */}
        <Dialog 
          open={deviceDialogOpen} 
          onClose={handleCloseDeviceDialog}
          maxWidth="md"
          fullWidth
        >
          {selectedDevice && (
            <>
              <DialogTitle>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar sx={{ 
                    bgcolor: alpha(getCategoryColor(selectedDevice.category).border, 0.1), 
                    color: getCategoryColor(selectedDevice.category).border 
                  }}>
                    {getCategoryIcon(selectedDevice.category)}
                  </Avatar>
                  <Box>
                    <Typography variant="h6">{selectedDevice.name}</Typography>
                    <Typography variant="caption" sx={{ color: EMERGENCY_COLORS.gray.text }}>
                      {selectedDevice.id} • {selectedDevice.department}
                    </Typography>
                  </Box>
                </Box>
              </DialogTitle>
              <DialogContent dividers>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                  {/* Device Information */}
                  <Box sx={{ flex: '1 1 300px' }}>
                    <Typography variant="subtitle2" sx={{ color: EMERGENCY_COLORS.gray.text, mb: 2 }}>
                      Device Information
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" sx={{ color: EMERGENCY_COLORS.gray.text }}>
                          Category:
                        </Typography>
                        <Chip
                          icon={getCategoryIcon(selectedDevice.category)}
                          label={selectedDevice.category.replace('_', ' ').toUpperCase()}
                          size="small"
                          sx={{ 
                            bgcolor: getCategoryColor(selectedDevice.category).bg,
                            color: getCategoryColor(selectedDevice.category).text
                          }}
                        />
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" sx={{ color: EMERGENCY_COLORS.gray.text }}>
                          Status:
                        </Typography>
                        <Chip
                          icon={getStatusIcon(selectedDevice.status)}
                          label={selectedDevice.status.replace('_', ' ').toUpperCase()}
                          size="small"
                          sx={{ 
                            bgcolor: getStatusColor(selectedDevice.status).bg,
                            color: getStatusColor(selectedDevice.status).text
                          }}
                        />
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" sx={{ color: EMERGENCY_COLORS.gray.text }}>
                          Priority:
                        </Typography>
                        <Chip
                          icon={getPriorityIcon(selectedDevice.priority)}
                          label={selectedDevice.priority.toUpperCase()}
                          size="small"
                          sx={{ 
                            bgcolor: getPriorityColor(selectedDevice.priority).bg,
                            color: getPriorityColor(selectedDevice.priority).text
                          }}
                        />
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" sx={{ color: EMERGENCY_COLORS.gray.text }}>
                          Emergency Level:
                        </Typography>
                        <Chip
                          icon={getEmergencyLevelIcon(selectedDevice.emergencyLevel)}
                          label={selectedDevice.emergencyLevel.replace('_', ' ').toUpperCase()}
                          size="small"
                          sx={{ 
                            bgcolor: getEmergencyLevelColor(selectedDevice.emergencyLevel).bg,
                            color: getEmergencyLevelColor(selectedDevice.emergencyLevel).text
                          }}
                        />
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" sx={{ color: EMERGENCY_COLORS.gray.text }}>
                          Response Time:
                        </Typography>
                        <Typography variant="body2" fontWeight="bold" sx={{ color: EMERGENCY_COLORS.danger.text }}>
                          {selectedDevice.responseTime}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>

                  {/* Device Status */}
                  <Box sx={{ flex: '1 1 300px' }}>
                    <Typography variant="subtitle2" sx={{ color: EMERGENCY_COLORS.gray.text, mb: 2 }}>
                      Device Status
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" sx={{ color: EMERGENCY_COLORS.gray.text }}>
                          Battery Level:
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <BatteryFullIcon fontSize="small" sx={{ 
                            color: selectedDevice.batteryLevel > 50 ? EMERGENCY_COLORS.success.border : 
                                   selectedDevice.batteryLevel > 20 ? EMERGENCY_COLORS.warning.border : 
                                   EMERGENCY_COLORS.danger.border 
                          }} />
                          <Typography variant="body2">
                            {selectedDevice.batteryLevel}%
                          </Typography>
                        </Box>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" sx={{ color: EMERGENCY_COLORS.gray.text }}>
                          Bluetooth:
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {getBluetoothIcon(selectedDevice.bluetoothStatus)}
                          <Typography variant="body2">
                            {selectedDevice.bluetoothStatus}
                          </Typography>
                        </Box>
                      </Box>
                      {selectedDevice.bluetoothStatus === 'connected' && (
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Typography variant="body2" sx={{ color: EMERGENCY_COLORS.gray.text }}>
                            Signal Strength:
                          </Typography>
                          <Typography variant="body2">
                            {selectedDevice.signalStrength}%
                          </Typography>
                        </Box>
                      )}
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" sx={{ color: EMERGENCY_COLORS.gray.text }}>
                          Last Used:
                        </Typography>
                        <Typography variant="body2">
                          {formatDateTime(selectedDevice.lastUsed)}
                        </Typography>
                      </Box>
                      {selectedDevice.deploymentStart && (
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Typography variant="body2" sx={{ color: EMERGENCY_COLORS.gray.text }}>
                            Deployment Started:
                          </Typography>
                          <Typography variant="body2">
                            {formatDateTime(selectedDevice.deploymentStart)}
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  </Box>

                  {/* Assignment & Location */}
                  <Box sx={{ flex: '1 1 300px' }}>
                    <Typography variant="subtitle2" sx={{ color: EMERGENCY_COLORS.gray.text, mb: 2 }}>
                      Assignment & Location
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" sx={{ color: EMERGENCY_COLORS.gray.text }}>
                          Assigned To:
                        </Typography>
                        <Typography variant="body2">
                          {selectedDevice.assignedTo}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" sx={{ color: EMERGENCY_COLORS.gray.text }}>
                          Department:
                        </Typography>
                        <Typography variant="body2">
                          {selectedDevice.department}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" sx={{ color: EMERGENCY_COLORS.gray.text }}>
                          Location:
                        </Typography>
                        <Typography variant="body2">
                          {selectedDevice.location}
                        </Typography>
                      </Box>
                      {selectedDevice.patientId && (
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Typography variant="body2" sx={{ color: EMERGENCY_COLORS.gray.text }}>
                            Patient ID:
                          </Typography>
                          <Typography variant="body2" fontWeight="medium">
                            {selectedDevice.patientId}
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  </Box>
                </Box>

                {/* Notes */}
                {selectedDevice.notes && (
                  <Box sx={{ mt: 3 }}>
                    <Typography variant="subtitle2" sx={{ color: EMERGENCY_COLORS.gray.text, mb: 1 }}>
                      Notes
                    </Typography>
                    <Card sx={{ p: 2, bgcolor: EMERGENCY_COLORS.gray.bg }}>
                      <Typography variant="body2">
                        {selectedDevice.notes}
                      </Typography>
                    </Card>
                  </Box>
                )}

                {/* Critical Indicator */}
                {selectedDevice.critical && (
                  <Box sx={{ mt: 2, p: 2, borderRadius: 2, bgcolor: EMERGENCY_COLORS.critical.bg }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <WarningIcon sx={{ color: EMERGENCY_COLORS.critical.border }} />
                      <Typography variant="subtitle2" sx={{ color: EMERGENCY_COLORS.critical.text }}>
                        CRITICAL DEVICE
                      </Typography>
                    </Box>
                    <Typography variant="caption" sx={{ color: EMERGENCY_COLORS.critical.text }}>
                      This device is marked as critical for emergency situations. Ensure it is always 
                      maintained and ready for immediate deployment.
                    </Typography>
                  </Box>
                )}
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDeviceDialog}>Close</Button>
                {selectedDevice.status === DEVICE_STATUS.AVAILABLE && (
                  <Button 
                    variant="contained" 
                    startIcon={<DevicesIcon />}
                    onClick={() => handleDeployDevice(selectedDevice)}
                    sx={{ bgcolor: EMERGENCY_COLORS.danger.border }}
                  >
                    Deploy Device
                  </Button>
                )}
                {selectedDevice.status === DEVICE_STATUS.IN_USE && (
                  <Button 
                    variant="contained" 
                    startIcon={<ReturnIcon />}
                    onClick={() => handleReturnDevice(selectedDevice)}
                    sx={{ bgcolor: EMERGENCY_COLORS.success.border }}
                  >
                    Return Device
                  </Button>
                )}
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
          ariaLabel="Emergency Actions"
          sx={{ position: 'fixed', bottom: 32, right: 32 }}
          icon={<SpeedDialIcon />}
        >
          <SpeedDialAction
            icon={<DevicesIcon />}
            tooltipTitle="Quick Deploy"
            onClick={() => {
              const availableDevice = emergencyData.devices.find(d => d.status === DEVICE_STATUS.AVAILABLE);
              if (availableDevice) {
                handleDeployDevice(availableDevice);
              }
            }}
          />
          <SpeedDialAction
            icon={<RefreshIcon />}
            tooltipTitle="Refresh Status"
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
          borderTop: `1px solid ${EMERGENCY_COLORS.gray.border}`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Typography variant="caption" sx={{ color: EMERGENCY_COLORS.gray.text }}>
            Emergency Devices • Rapid-access critical care management • Last updated: Today
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Tooltip title="Export Emergency Report">
              <IconButton size="small" sx={{ color: EMERGENCY_COLORS.gray.border }}>
                <DownloadIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Print Emergency Status">
              <IconButton size="small" sx={{ color: EMERGENCY_COLORS.gray.border }}>
                <PrintIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Box>
    </Fade>
  );
};

export default EmergencyDevices;