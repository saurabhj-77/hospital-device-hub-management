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
  Stack,
  Grid,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Slider,
  InputAdornment
} from '@mui/material';
import {
  LocationOn,
  LocalHospital,
  DeviceHub,
  Schedule,
  AttachMoney,
  TrendingUp,
  TrendingDown,
  TrendingFlat,
  CheckCircle,
  Warning,
  Error,
  Assignment,
  AssignmentReturn,
  Search,
  FilterList,
  Download,
  Print,
  Add,
  Edit,
  Delete,
  History,
  Timeline,
  Dashboard,
  Group,
  Inventory,
  CalendarToday,
  AccessTime,
  HourglassEmpty,
  HourglassFull,
  Moving,
  Assessment,
  BarChart,
  PieChart,
  Map,
  WhereToVote,
  SwapHoriz,
  Update,
  Notifications,
  People,
  Business,
  School,
  Home,
  LocalPharmacy,
  Biotech
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';

const DepartmentDeviceAllocation = () => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const [allocationDialogOpen, setAllocationDialogOpen] = useState(false);
  const [transferDialogOpen, setTransferDialogOpen] = useState(false);
  const [selectedAllocation, setSelectedAllocation] = useState(null);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [viewMode, setViewMode] = useState('list'); // list, grid, map
  const [showOverdueOnly, setShowOverdueOnly] = useState(false);
  const [showUnderutilizedOnly, setShowUnderutilizedOnly] = useState(false);

  // Departments data
  const departments = [
    { id: 'dept-001', name: 'Intensive Care Unit (ICU)', type: 'critical-care', bedCount: 24, head: 'Dr. Sarah Miller' },
    { id: 'dept-002', name: 'Emergency Room (ER)', type: 'emergency', bedCount: 18, head: 'Dr. James Wilson' },
    { id: 'dept-003', name: 'Surgery Department', type: 'surgical', bedCount: 12, head: 'Dr. Robert Chen' },
    { id: 'dept-004', name: 'Cardiology', type: 'specialty', bedCount: 32, head: 'Dr. Lisa Thompson' },
    { id: 'dept-005', name: 'Pediatrics', type: 'specialty', bedCount: 28, head: 'Dr. Maria Garcia' },
    { id: 'dept-006', name: 'Radiology', type: 'diagnostic', bedCount: 8, head: 'Dr. David Brown' },
    { id: 'dept-007', name: 'Pharmacy', type: 'support', bedCount: 0, head: 'Pharmacist John Davis' },
    { id: 'dept-008', name: 'Biomedical Engineering', type: 'support', bedCount: 0, head: 'Engineer Mark Wilson' }
  ];

  // Device allocation data
  const initialAllocations = [
    {
      id: 1,
      deviceId: 'DEV-2023-045',
      deviceName: 'Ventilator X200',
      deviceType: 'ventilator',
      manufacturer: 'MediTech',
      departmentId: 'dept-001',
      departmentName: 'Intensive Care Unit (ICU)',
      allocationType: 'owned',
      assignedDate: '2023-06-15',
      expectedReturnDate: null,
      actualReturnDate: null,
      assignedBy: 'Admin Sarah',
      status: 'active',
      utilizationRate: 92.5,
      dailyUsageHours: 22.2,
      costPerDay: 450,
      totalCost: 148500,
      alerts: [],
      history: [
        { date: '2023-06-15', action: 'Assigned to ICU', by: 'Admin Sarah' },
        { date: '2023-03-10', action: 'Preventive maintenance', by: 'Biomed Tech' }
      ]
    },
    {
      id: 2,
      deviceId: 'DEV-2023-128',
      deviceName: 'Infusion Pump Pro',
      deviceType: 'infusion-pump',
      manufacturer: 'BioCare Systems',
      departmentId: 'dept-002',
      departmentName: 'Emergency Room (ER)',
      allocationType: 'borrowed',
      assignedDate: '2024-01-10',
      expectedReturnDate: '2024-02-10',
      actualReturnDate: null,
      assignedBy: 'Nurse Manager',
      status: 'active',
      utilizationRate: 78.3,
      dailyUsageHours: 18.8,
      costPerDay: 120,
      totalCost: 3720,
      alerts: ['return-overdue'],
      history: [
        { date: '2024-01-10', action: 'Borrowed by ER', by: 'Nurse Manager' },
        { date: '2023-12-20', action: 'Returned from Pediatrics', by: 'Inventory Clerk' }
      ]
    },
    {
      id: 3,
      deviceId: 'DEV-2023-089',
      deviceName: 'Patient Monitor V5',
      deviceType: 'patient-monitor',
      manufacturer: 'HealthView Inc',
      departmentId: 'dept-003',
      departmentName: 'Surgery Department',
      allocationType: 'owned',
      assignedDate: '2023-08-22',
      expectedReturnDate: null,
      actualReturnDate: null,
      assignedBy: 'Surgical Director',
      status: 'active',
      utilizationRate: 65.4,
      dailyUsageHours: 15.7,
      costPerDay: 280,
      totalCost: 51240,
      alerts: ['underutilized'],
      history: [
        { date: '2023-08-22', action: 'Assigned to Surgery', by: 'Surgical Director' },
        { date: '2023-05-15', action: 'Calibration performed', by: 'Biomed Tech' }
      ]
    },
    {
      id: 4,
      deviceId: 'DEV-2023-156',
      deviceName: 'Defibrillator A9',
      deviceType: 'defibrillator',
      manufacturer: 'CardioSave',
      departmentId: 'dept-004',
      departmentName: 'Cardiology',
      allocationType: 'shared',
      assignedDate: '2024-01-05',
      expectedReturnDate: '2024-01-20',
      actualReturnDate: null,
      assignedBy: 'Cardiology Head',
      status: 'overdue',
      utilizationRate: 45.2,
      dailyUsageHours: 10.8,
      costPerDay: 320,
      totalCost: 4800,
      alerts: ['return-overdue', 'underutilized'],
      history: [
        { date: '2024-01-05', action: 'Shared with Cardiology', by: 'Cardiology Head' },
        { date: '2023-12-28', action: 'Maintenance check', by: 'Biomed Tech' }
      ]
    },
    {
      id: 5,
      deviceId: 'DEV-2023-201',
      deviceName: 'Portable Oxygen Concentrator',
      deviceType: 'oxygen-concentrator',
      manufacturer: 'OxyCare',
      departmentId: 'dept-005',
      departmentName: 'Pediatrics',
      allocationType: 'owned',
      assignedDate: '2023-11-30',
      expectedReturnDate: null,
      actualReturnDate: null,
      assignedBy: 'Pediatrics Head',
      status: 'active',
      utilizationRate: 88.7,
      dailyUsageHours: 21.3,
      costPerDay: 180,
      totalCost: 9720,
      alerts: [],
      history: [
        { date: '2023-11-30', action: 'Assigned to Pediatrics', by: 'Pediatrics Head' },
        { date: '2023-09-15', action: 'Filter replacement', by: 'Biomed Tech' }
      ]
    },
    {
      id: 6,
      deviceId: 'DEV-2023-067',
      deviceName: 'Anesthesia Machine',
      deviceType: 'anesthesia',
      manufacturer: 'AeroMed',
      departmentId: 'dept-003',
      departmentName: 'Surgery Department',
      allocationType: 'owned',
      assignedDate: '2023-07-10',
      expectedReturnDate: null,
      actualReturnDate: null,
      assignedBy: 'Surgical Director',
      status: 'maintenance',
      utilizationRate: 76.8,
      dailyUsageHours: 18.4,
      costPerDay: 520,
      totalCost: 95160,
      alerts: ['maintenance-due'],
      history: [
        { date: '2023-07-10', action: 'Assigned to Surgery', by: 'Surgical Director' },
        { date: '2023-12-15', action: 'Scheduled maintenance', by: 'Biomed Tech' }
      ]
    },
    {
      id: 7,
      deviceId: 'DEV-2023-099',
      deviceName: 'ECG Monitor',
      deviceType: 'ecg-monitor',
      manufacturer: 'CardioSystems',
      departmentId: 'dept-006',
      departmentName: 'Radiology',
      allocationType: 'borrowed',
      assignedDate: '2024-01-12',
      expectedReturnDate: '2024-01-26',
      actualReturnDate: null,
      assignedBy: 'Radiology Head',
      status: 'active',
      utilizationRate: 34.5,
      dailyUsageHours: 8.3,
      costPerDay: 95,
      totalCost: 1330,
      alerts: ['underutilized'],
      history: [
        { date: '2024-01-12', action: 'Borrowed by Radiology', by: 'Radiology Head' },
        { date: '2023-12-01', action: 'Assigned to Cardiology', by: 'Cardiology Head' }
      ]
    },
    {
      id: 8,
      deviceId: 'DEV-2023-112',
      deviceName: 'Ultrasound Machine',
      deviceType: 'ultrasound',
      manufacturer: 'SonoTech',
      departmentId: 'dept-004',
      departmentName: 'Cardiology',
      allocationType: 'owned',
      assignedDate: '2023-09-05',
      expectedReturnDate: null,
      actualReturnDate: null,
      assignedBy: 'Cardiology Head',
      status: 'active',
      utilizationRate: 95.2,
      dailyUsageHours: 22.8,
      costPerDay: 420,
      totalCost: 60480,
      alerts: [],
      history: [
        { date: '2023-09-05', action: 'Assigned to Cardiology', by: 'Cardiology Head' },
        { date: '2023-06-20', action: 'Software update', by: 'IT Support' }
      ]
    }
  ];

  // Available devices for allocation
  const availableDevices = [
    { id: 'DEV-2023-205', name: 'Blood Gas Analyzer', type: 'analyzer', manufacturer: 'MediLab', status: 'available' },
    { id: 'DEV-2023-210', name: 'Vital Signs Monitor', type: 'patient-monitor', manufacturer: 'HealthView Inc', status: 'available' },
    { id: 'DEV-2023-215', name: 'Syringe Pump', type: 'infusion-pump', manufacturer: 'BioCare Systems', status: 'available' },
    { id: 'DEV-2023-220', name: 'Transport Ventilator', type: 'ventilator', manufacturer: 'MediTech', status: 'maintenance' }
  ];

  // Allocation history for details view
  const allocationHistory = [
    { id: 1, deviceId: 'DEV-2023-045', date: '2023-06-15', from: 'Inventory', to: 'ICU', type: 'assignment', duration: 'Ongoing' },
    { id: 2, deviceId: 'DEV-2023-128', date: '2024-01-10', from: 'Pediatrics', to: 'ER', type: 'transfer', duration: '31 days' },
    { id: 3, deviceId: 'DEV-2023-089', date: '2023-08-22', from: 'Inventory', to: 'Surgery', type: 'assignment', duration: 'Ongoing' },
    { id: 4, deviceId: 'DEV-2023-156', date: '2024-01-05', from: 'ER', to: 'Cardiology', type: 'transfer', duration: '15 days' },
    { id: 5, deviceId: 'DEV-2023-067', date: '2023-07-10', from: 'Inventory', to: 'Surgery', type: 'assignment', duration: 'Ongoing' }
  ];

  // Utilization metrics
  const utilizationMetrics = {
    totalDevices: 156,
    allocatedDevices: 132,
    availableDevices: 24,
    averageUtilization: 76.4,
    overdueReturns: 8,
    underutilizedDevices: 15,
    totalMonthlyCost: 285000
  };

  // Department utilization data for charts
  const departmentUtilization = [
    { name: 'ICU', devices: 28, utilization: 92.5, cost: 85000 },
    { name: 'ER', devices: 22, utilization: 88.3, cost: 65000 },
    { name: 'Surgery', devices: 35, utilization: 76.8, cost: 95000 },
    { name: 'Cardiology', devices: 24, utilization: 85.4, cost: 72000 },
    { name: 'Pediatrics', devices: 18, utilization: 79.2, cost: 48000 },
    { name: 'Radiology', devices: 12, utilization: 45.6, cost: 28000 },
    { name: 'Pharmacy', devices: 5, utilization: 22.1, cost: 12000 },
    { name: 'Biomedical', devices: 8, utilization: 65.3, cost: 18000 }
  ];

  const [allocations, setAllocations] = useState(initialAllocations);
  const [newAllocation, setNewAllocation] = useState({
    deviceId: '',
    departmentId: '',
    allocationType: 'owned',
    assignedDate: new Date().toISOString().split('T')[0],
    expectedReturnDate: '',
    notes: ''
  });

  // Load from localStorage
  useEffect(() => {
    const savedAllocations = localStorage.getItem('deviceAllocations');
    if (savedAllocations) setAllocations(JSON.parse(savedAllocations));
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('deviceAllocations', JSON.stringify(allocations));
  }, [allocations]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'overdue':
        return 'error';
      case 'maintenance':
        return 'warning';
      case 'inactive':
        return 'default';
      default:
        return 'info';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return <CheckCircle />;
      case 'overdue':
        return <Warning />;
      case 'maintenance':
        return <Schedule />;
      default:
        return <Error />;
    }
  };

  const getAllocationTypeColor = (type) => {
    switch (type) {
      case 'owned':
        return 'primary';
      case 'borrowed':
        return 'secondary';
      case 'shared':
        return 'success';
      default:
        return 'default';
    }
  };

  const getDeviceTypeIcon = (type) => {
    switch (type) {
      case 'ventilator':
        return <Biotech />;
      case 'infusion-pump':
        return <LocalPharmacy />;
      case 'patient-monitor':
        return <Dashboard />;
      case 'defibrillator':
        return <Warning />;
      case 'oxygen-concentrator':
        return <WhereToVote />;
      case 'anesthesia':
        return <Biotech />;
      case 'ecg-monitor':
        return <Timeline />;
      case 'ultrasound':
        return <Assessment />;
      default:
        return <DeviceHub />;
    }
  };

  const getDepartmentIcon = (type) => {
    switch (type) {
      case 'critical-care':
        return <LocalHospital />;
      case 'emergency':
        return <Warning />;
      case 'surgical':
        return <Group />;
      case 'specialty':
        return <Business />;
      case 'diagnostic':
        return <Assessment />;
      case 'support':
        return <People />;
      default:
        return <Home />;
    }
  };

  const getUtilizationColor = (rate) => {
    if (rate >= 80) return 'success';
    if (rate >= 60) return 'warning';
    return 'error';
  };

  const calculateDaysRemaining = (expectedReturnDate) => {
    if (!expectedReturnDate) return null;
    const today = new Date();
    const returnDate = new Date(expectedReturnDate);
    const diffTime = returnDate - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const calculateDaysOverdue = (expectedReturnDate) => {
    if (!expectedReturnDate) return 0;
    const today = new Date();
    const returnDate = new Date(expectedReturnDate);
    const diffTime = today - returnDate;
    return Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
  };

  const handleAddAllocation = () => {
    const device = availableDevices.find(d => d.id === newAllocation.deviceId);
    const department = departments.find(d => d.id === newAllocation.departmentId);
    
    if (!device || !department) {
      alert('Please select both device and department');
      return;
    }

    const newId = allocations.length + 1;
    const allocationToAdd = {
      id: newId,
      deviceId: newAllocation.deviceId,
      deviceName: device.name,
      deviceType: device.type,
      manufacturer: device.manufacturer,
      departmentId: newAllocation.departmentId,
      departmentName: department.name,
      allocationType: newAllocation.allocationType,
      assignedDate: newAllocation.assignedDate,
      expectedReturnDate: newAllocation.expectedReturnDate || null,
      actualReturnDate: null,
      assignedBy: 'System Admin',
      status: newAllocation.expectedReturnDate ? 'active' : 'owned',
      utilizationRate: 0,
      dailyUsageHours: 0,
      costPerDay: 0,
      totalCost: 0,
      alerts: [],
      history: [
        { date: newAllocation.assignedDate, action: `Assigned to ${department.name}`, by: 'System Admin' }
      ]
    };

    setAllocations(prev => [...prev, allocationToAdd]);
    setAllocationDialogOpen(false);
    setNewAllocation({
      deviceId: '',
      departmentId: '',
      allocationType: 'owned',
      assignedDate: new Date().toISOString().split('T')[0],
      expectedReturnDate: '',
      notes: ''
    });
  };

  const handleReturnDevice = (allocationId) => {
    setAllocations(prev => prev.map(allocation =>
      allocation.id === allocationId
        ? {
            ...allocation,
            status: 'returned',
            actualReturnDate: new Date().toISOString().split('T')[0],
            alerts: allocation.alerts.filter(a => a !== 'return-overdue')
          }
        : allocation
    ));
  };

  const handleTransferDevice = (allocationId, newDepartmentId) => {
    const department = departments.find(d => d.id === newDepartmentId);
    setAllocations(prev => prev.map(allocation =>
      allocation.id === allocationId
        ? {
            ...allocation,
            departmentId: newDepartmentId,
            departmentName: department.name,
            assignedDate: new Date().toISOString().split('T')[0],
            history: [
              ...allocation.history,
              { date: new Date().toISOString().split('T')[0], action: `Transferred to ${department.name}`, by: 'System Admin' }
            ]
          }
        : allocation
    ));
    setTransferDialogOpen(false);
  };

  const filteredAllocations = allocations.filter(allocation => {
    const matchesSearch = 
      allocation.deviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      allocation.departmentName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = filterDepartment === 'all' || allocation.departmentId === filterDepartment;
    const matchesStatus = filterStatus === 'all' || allocation.status === filterStatus;
    const matchesType = filterType === 'all' || allocation.deviceType === filterType;
    
    const matchesOverdue = !showOverdueOnly || allocation.alerts.includes('return-overdue');
    const matchesUnderutilized = !showUnderutilizedOnly || allocation.alerts.includes('underutilized');
    
    return matchesSearch && matchesDepartment && matchesStatus && matchesType && matchesOverdue && matchesUnderutilized;
  });

  // Statistics calculations
  const stats = {
    totalAllocated: allocations.length,
    ownedDevices: allocations.filter(a => a.allocationType === 'owned').length,
    borrowedDevices: allocations.filter(a => a.allocationType === 'borrowed').length,
    overdueReturns: allocations.filter(a => a.alerts.includes('return-overdue')).length,
    underutilizedDevices: allocations.filter(a => a.alerts.includes('underutilized')).length,
    totalMonthlyCost: allocations.reduce((sum, a) => sum + (a.costPerDay * 30), 0),
    averageUtilization: allocations.reduce((sum, a) => sum + a.utilizationRate, 0) / allocations.length
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: theme.palette.primary.main }}>
            <Assignment sx={{ verticalAlign: 'middle', mr: 2 }} />
            Department & Device Allocation
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Manage device distribution across departments and track utilization efficiency
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => setAllocationDialogOpen(true)}
          >
            New Allocation
          </Button>
          <Button
            variant="outlined"
            startIcon={<SwapHoriz />}
            onClick={() => setTransferDialogOpen(true)}
          >
            Transfer Device
          </Button>
        </Box>
      </Box>

      {/* Stats Cards */}
<Box sx={{ display: 'flex', gap: 3, mb: 4, flexWrap: 'wrap' }}>

  {/* Allocated Devices */}
  <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.25 }} style={{ flex: 1, minWidth: 220 }}>
    <Card
      sx={{
        borderRadius: 3,
        background: 'linear-gradient(180deg, #F5F9FF, #FFFFFF)',
        boxShadow: '0 10px 30px rgba(0,0,0,0.08)'
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography sx={{ color: '#000', fontWeight: 600 }} gutterBottom>
              Allocated Devices
            </Typography>
            <Typography variant="h4" sx={{ color: '#000', fontWeight: 700 }}>
              {stats.totalAllocated}
            </Typography>
          </Box>

          {/* ICON COLOR UNCHANGED */}
          <Avatar sx={{ bgcolor: 'primary.light' }}>
            <DeviceHub />
          </Avatar>
        </Box>

        <Typography variant="body2" sx={{ mt: 1, color: '#333' }}>
          {stats.ownedDevices} owned, {stats.borrowedDevices} borrowed
        </Typography>
      </CardContent>
    </Card>
  </motion.div>

  {/* Average Utilization */}
  <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.25 }} style={{ flex: 1, minWidth: 220 }}>
    <Card
      sx={{
        borderRadius: 3,
        background: 'linear-gradient(180deg, #F1FBF5, #FFFFFF)',
        boxShadow: '0 10px 30px rgba(0,0,0,0.08)'
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography sx={{ color: '#000', fontWeight: 600 }} gutterBottom>
              Average Utilization
            </Typography>
            <Typography variant="h4" sx={{ color: '#000', fontWeight: 700 }}>
              {stats.averageUtilization.toFixed(1)}%
            </Typography>
          </Box>

          {/* ICON COLOR UNCHANGED */}
          <Avatar sx={{ bgcolor: 'success.light' }}>
            <TrendingUp />
          </Avatar>
        </Box>

        <LinearProgress
          variant="determinate"
          value={stats.averageUtilization}
          sx={{
            mt: 2,
            height: 6,
            borderRadius: 3,
            backgroundColor: '#E0F2E9',
            '& .MuiLinearProgress-bar': {
              backgroundColor: '#2E7D32'
            }
          }}
        />
      </CardContent>
    </Card>
  </motion.div>

  {/* Monthly Cost */}
  <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.25 }} style={{ flex: 1, minWidth: 220 }}>
    <Card
      sx={{
        borderRadius: 3,
        background: 'linear-gradient(180deg, #F2F8FF, #FFFFFF)',
        boxShadow: '0 10px 30px rgba(0,0,0,0.08)'
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography sx={{ color: '#000', fontWeight: 600 }} gutterBottom>
              Monthly Cost
            </Typography>
            <Typography variant="h4" sx={{ color: '#000', fontWeight: 700 }}>
              {formatCurrency(stats.totalMonthlyCost)}
            </Typography>
          </Box>

          {/* ICON COLOR UNCHANGED */}
          <Avatar sx={{ bgcolor: 'info.light' }}>
            <AttachMoney />
          </Avatar>
        </Box>

        <Typography variant="body2" sx={{ mt: 1, color: '#333' }}>
          {stats.underutilizedDevices} underutilized devices
        </Typography>
      </CardContent>
    </Card>
  </motion.div>

  {/* Alerts & Issues */}
  <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.25 }} style={{ flex: 1, minWidth: 220 }}>
    <Card
      sx={{
        borderRadius: 3,
        background: 'linear-gradient(180deg, #FFF7ED, #FFFFFF)',
        boxShadow: '0 10px 30px rgba(0,0,0,0.08)'
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography sx={{ color: '#000', fontWeight: 600 }} gutterBottom>
              Alerts & Issues
            </Typography>
            <Typography variant="h4" sx={{ color: '#000', fontWeight: 700 }}>
              {stats.overdueReturns + stats.underutilizedDevices}
            </Typography>
          </Box>

          {/* ICON COLOR UNCHANGED */}
          <Avatar sx={{ bgcolor: 'warning.light' }}>
            <Warning />
          </Avatar>
        </Box>

        <Typography variant="body2" sx={{ mt: 1, color: '#333' }}>
          {stats.overdueReturns} overdue, {stats.underutilizedDevices} underutilized
        </Typography>
      </CardContent>
    </Card>
  </motion.div>

</Box>


      {/* Quick Filters */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">
              Device Allocations
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Tooltip title="List View">
                <IconButton 
                  onClick={() => setViewMode('list')}
                  color={viewMode === 'list' ? 'primary' : 'default'}
                >
                  <Dashboard />
                </IconButton>
              </Tooltip>
              <Tooltip title="Grid View">
                <IconButton 
                  onClick={() => setViewMode('grid')}
                  color={viewMode === 'grid' ? 'primary' : 'default'}
                >
                  <Grid />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
            <TextField
              placeholder="Search devices or departments..."
              size="small"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ width: 300 }}
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
                <MenuItem value="all">All Departments</MenuItem>
                {departments.map(dept => (
                  <MenuItem key={dept.id} value={dept.id}>
                    {dept.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Status</InputLabel>
              <Select
                value={filterStatus}
                label="Status"
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <MenuItem value="all">All Status</MenuItem>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="overdue">Overdue</MenuItem>
                <MenuItem value="maintenance">Maintenance</MenuItem>
                <MenuItem value="returned">Returned</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Device Type</InputLabel>
              <Select
                value={filterType}
                label="Device Type"
                onChange={(e) => setFilterType(e.target.value)}
              >
                <MenuItem value="all">All Types</MenuItem>
                <MenuItem value="ventilator">Ventilators</MenuItem>
                <MenuItem value="infusion-pump">Infusion Pumps</MenuItem>
                <MenuItem value="patient-monitor">Patient Monitors</MenuItem>
                <MenuItem value="defibrillator">Defibrillators</MenuItem>
                <MenuItem value="oxygen-concentrator">Oxygen</MenuItem>
              </Select>
            </FormControl>

            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={showOverdueOnly}
                    onChange={(e) => setShowOverdueOnly(e.target.checked)}
                    size="small"
                  />
                }
                label="Overdue Only"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={showUnderutilizedOnly}
                    onChange={(e) => setShowUnderutilizedOnly(e.target.checked)}
                    size="small"
                  />
                }
                label="Underutilized Only"
              />
            </Box>
          </Box>

          {/* Main Content Tabs */}
          <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 3 }}>
            <Tab label="All Allocations" icon={<Assignment />} iconPosition="start" />
            <Tab label="Department Overview" icon={<LocalHospital />} iconPosition="start" />
            <Tab label="Utilization Analytics" icon={<TrendingUp />} iconPosition="start" />
            <Tab label="Alerts & Issues" icon={<Warning />} iconPosition="start" />
          </Tabs>

          <AnimatePresence mode="wait">
            {/* All Allocations Tab */}
            {tabValue === 0 && (
              <motion.div
                key="allocations"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {viewMode === 'list' ? (
                  <TableContainer component={Paper} variant="outlined">
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Device</TableCell>
                          <TableCell>Department</TableCell>
                          <TableCell>Allocation Type</TableCell>
                          <TableCell>Assigned Date</TableCell>
                          <TableCell>Utilization</TableCell>
                          <TableCell>Status</TableCell>
                          <TableCell>Daily Cost</TableCell>
                          <TableCell>Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {filteredAllocations.map((allocation) => {
                          const daysOverdue = allocation.expectedReturnDate 
                            ? calculateDaysOverdue(allocation.expectedReturnDate)
                            : 0;
                          
                          return (
                            <TableRow 
                              key={allocation.id}
                              hover
                              sx={{ 
                                '&:hover': { 
                                  backgroundColor: theme.palette.action.hover 
                                },
                                backgroundColor: allocation.alerts.includes('return-overdue') 
                                  ? theme.palette.error.lighter 
                                  : 'inherit'
                              }}
                            >
                              <TableCell>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                  {getDeviceTypeIcon(allocation.deviceType)}
                                  <Box>
                                    <Typography fontWeight={500}>
                                      {allocation.deviceName}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                      {allocation.deviceId}
                                    </Typography>
                                  </Box>
                                </Box>
                              </TableCell>
                              <TableCell>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                  {getDepartmentIcon(departments.find(d => d.id === allocation.departmentId)?.type)}
                                  <Box>
                                    <Typography fontWeight={500}>
                                      {allocation.departmentName}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                      Assigned by: {allocation.assignedBy}
                                    </Typography>
                                  </Box>
                                </Box>
                              </TableCell>
                              <TableCell>
                                <Chip
                                  label={allocation.allocationType}
                                  color={getAllocationTypeColor(allocation.allocationType)}
                                  size="small"
                                />
                              </TableCell>
                              <TableCell>
                                <Typography>
                                  {new Date(allocation.assignedDate).toLocaleDateString()}
                                </Typography>
                                {allocation.expectedReturnDate && (
                                  <Typography variant="caption" color="text.secondary">
                                    Return: {new Date(allocation.expectedReturnDate).toLocaleDateString()}
                                  </Typography>
                                )}
                              </TableCell>
                              <TableCell>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                  <LinearProgress 
                                    variant="determinate" 
                                    value={allocation.utilizationRate}
                                    sx={{ width: 60 }}
                                    color={getUtilizationColor(allocation.utilizationRate)}
                                  />
                                  <Typography variant="body2">
                                    {allocation.utilizationRate}%
                                  </Typography>
                                </Box>
                              </TableCell>
                              <TableCell>
                                <Chip
                                  icon={getStatusIcon(allocation.status)}
                                  label={allocation.status}
                                  color={getStatusColor(allocation.status)}
                                  size="small"
                                />
                                {daysOverdue > 0 && (
                                  <Typography variant="caption" color="error" display="block">
                                    {daysOverdue} days overdue
                                  </Typography>
                                )}
                              </TableCell>
                              <TableCell>
                                <Typography fontWeight={500}>
                                  {formatCurrency(allocation.costPerDay)}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  Total: {formatCurrency(allocation.totalCost)}
                                </Typography>
                              </TableCell>
                              <TableCell>
                                <Box sx={{ display: 'flex', gap: 0.5 }}>
                                  <Tooltip title="Return Device">
                                    <IconButton
                                      size="small"
                                      onClick={() => handleReturnDevice(allocation.id)}
                                      disabled={allocation.allocationType === 'owned'}
                                    >
                                      <AssignmentReturn />
                                    </IconButton>
                                  </Tooltip>
                                  <Tooltip title="View History">
                                    <IconButton
                                      size="small"
                                      onClick={() => {
                                        setSelectedAllocation(allocation);
                                        // Show history dialog
                                      }}
                                    >
                                      <History />
                                    </IconButton>
                                  </Tooltip>
                                  <Tooltip title="Edit Allocation">
                                    <IconButton
                                      size="small"
                                      onClick={() => {
                                        setSelectedAllocation(allocation);
                                        setAllocationDialogOpen(true);
                                      }}
                                    >
                                      <Edit />
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
                ) : (
                  // Grid View
                  <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: 3 }}>
                    {filteredAllocations.map((allocation) => (
                      <motion.div key={allocation.id} whileHover={{ scale: 1.02 }}>
                        <Card>
                          <CardContent>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                              <Box>
                                <Typography variant="h6" gutterBottom>
                                  {allocation.deviceName}
                                </Typography>
                                <Chip
                                  label={allocation.allocationType}
                                  color={getAllocationTypeColor(allocation.allocationType)}
                                  size="small"
                                />
                              </Box>
                              {getDeviceTypeIcon(allocation.deviceType)}
                            </Box>

                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                              <LocalHospital fontSize="small" color="action" />
                              <Typography variant="body2">
                                {allocation.departmentName}
                              </Typography>
                            </Box>

                            <Box sx={{ mb: 2 }}>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                <Typography variant="body2">Utilization Rate</Typography>
                                <Typography variant="body2" fontWeight={500}>
                                  {allocation.utilizationRate}%
                                </Typography>
                              </Box>
                              <LinearProgress 
                                variant="determinate" 
                                value={allocation.utilizationRate}
                                color={getUtilizationColor(allocation.utilizationRate)}
                              />
                            </Box>

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                              <Box>
                                <Typography variant="caption" color="text.secondary">
                                  Assigned
                                </Typography>
                                <Typography variant="body2">
                                  {new Date(allocation.assignedDate).toLocaleDateString()}
                                </Typography>
                              </Box>
                              {allocation.expectedReturnDate && (
                                <Box>
                                  <Typography variant="caption" color="text.secondary">
                                    Return Date
                                  </Typography>
                                  <Typography variant="body2">
                                    {new Date(allocation.expectedReturnDate).toLocaleDateString()}
                                  </Typography>
                                </Box>
                              )}
                            </Box>

                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                              <Chip
                                icon={getStatusIcon(allocation.status)}
                                label={allocation.status}
                                color={getStatusColor(allocation.status)}
                                size="small"
                              />
                              <Typography variant="body2" fontWeight={500}>
                                {formatCurrency(allocation.costPerDay)}/day
                              </Typography>
                            </Box>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </Box>
                )}

                <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
                  Showing {filteredAllocations.length} of {allocations.length} allocations
                </Typography>
              </motion.div>
            )}

            {/* Department Overview Tab */}
            {tabValue === 1 && (
              <motion.div
                key="departments"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
                  Department Device Distribution
                </Typography>
                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 3 }}>
                  {departments.map((dept) => {
                    const deptAllocations = allocations.filter(a => a.departmentId === dept.id);
                    const avgUtilization = deptAllocations.length > 0 
                      ? deptAllocations.reduce((sum, a) => sum + a.utilizationRate, 0) / deptAllocations.length
                      : 0;
                    const totalCost = deptAllocations.reduce((sum, a) => sum + (a.costPerDay * 30), 0);
                    
                    return (
                      <motion.div key={dept.id} whileHover={{ scale: 1.02 }}>
                        <Card>
                          <CardContent>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                              <Box>
                                <Typography variant="h6" gutterBottom>
                                  {dept.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  {dept.head}
                                </Typography>
                              </Box>
                              {getDepartmentIcon(dept.type)}
                            </Box>

                            <Box sx={{ mb: 3 }}>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                <Typography variant="body2">Device Count</Typography>
                                <Typography variant="body2" fontWeight={500}>
                                  {deptAllocations.length} devices
                                </Typography>
                              </Box>
                              <LinearProgress 
                                variant="determinate" 
                                value={(deptAllocations.length / Math.max(...departments.map(d => 
                                  allocations.filter(a => a.departmentId === d.id).length
                                ))) * 100}
                              />
                            </Box>

                            <Box sx={{ mb: 2 }}>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                <Typography variant="body2">Average Utilization</Typography>
                                <Typography variant="body2" fontWeight={500}>
                                  {avgUtilization.toFixed(1)}%
                                </Typography>
                              </Box>
                              <LinearProgress 
                                variant="determinate" 
                                value={avgUtilization}
                                color={getUtilizationColor(avgUtilization)}
                              />
                            </Box>

                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                              <Box>
                                <Typography variant="caption" color="text.secondary">
                                  Monthly Cost
                                </Typography>
                                <Typography variant="body1" fontWeight={500}>
                                  {formatCurrency(totalCost)}
                                </Typography>
                              </Box>
                              <Box>
                                <Typography variant="caption" color="text.secondary">
                                  Beds
                                </Typography>
                                <Typography variant="body1" fontWeight={500}>
                                  {dept.bedCount}
                                </Typography>
                              </Box>
                            </Box>
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })}
                </Box>
              </motion.div>
            )}

            {/* Utilization Analytics Tab */}
            {tabValue === 2 && (
              <motion.div
                key="analytics"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
                  Device Utilization Analytics
                </Typography>
                
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Card>
                      <CardContent>
                        <Typography variant="subtitle1" gutterBottom>
                          Top Performing Devices
                        </Typography>
                        <List>
                          {allocations
                            .sort((a, b) => b.utilizationRate - a.utilizationRate)
                            .slice(0, 5)
                            .map((allocation, index) => (
                              <React.Fragment key={allocation.id}>
                                <ListItem>
                                  <ListItemAvatar>
                                    <Avatar sx={{ bgcolor: 'success.light' }}>
                                      {index + 1}
                                    </Avatar>
                                  </ListItemAvatar>
                                  <ListItemText
                                    primary={allocation.deviceName}
                                    secondary={allocation.departmentName}
                                  />
                                  <ListItemSecondaryAction>
                                    <Typography variant="body2" fontWeight={500}>
                                      {allocation.utilizationRate}%
                                    </Typography>
                                  </ListItemSecondaryAction>
                                </ListItem>
                                <Divider />
                              </React.Fragment>
                            ))}
                        </List>
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Card>
                      <CardContent>
                        <Typography variant="subtitle1" gutterBottom>
                          Underutilized Devices
                        </Typography>
                        <List>
                          {allocations
                            .filter(a => a.utilizationRate < 60)
                            .sort((a, b) => a.utilizationRate - b.utilizationRate)
                            .slice(0, 5)
                            .map((allocation) => (
                              <React.Fragment key={allocation.id}>
                                <ListItem>
                                  <ListItemAvatar>
                                    <Avatar sx={{ bgcolor: 'warning.light' }}>
                                      <HourglassEmpty />
                                    </Avatar>
                                  </ListItemAvatar>
                                  <ListItemText
                                    primary={allocation.deviceName}
                                    secondary={allocation.departmentName}
                                  />
                                  <ListItemSecondaryAction>
                                    <Typography variant="body2" color="warning.main" fontWeight={500}>
                                      {allocation.utilizationRate}%
                                    </Typography>
                                  </ListItemSecondaryAction>
                                </ListItem>
                                <Divider />
                              </React.Fragment>
                            ))}
                        </List>
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid item xs={12}>
                    <Card>
                      <CardContent>
                        <Typography variant="subtitle1" gutterBottom>
                          Cost Analysis by Department
                        </Typography>
                        <TableContainer component={Paper} variant="outlined">
                          <Table size="small">
                            <TableHead>
                              <TableRow>
                                <TableCell>Department</TableCell>
                                <TableCell>Device Count</TableCell>
                                <TableCell>Avg Utilization</TableCell>
                                <TableCell>Daily Cost</TableCell>
                                <TableCell>Monthly Cost</TableCell>
                                <TableCell>Cost per Device</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {departments.map(dept => {
                                const deptAllocations = allocations.filter(a => a.departmentId === dept.id);
                                const dailyCost = deptAllocations.reduce((sum, a) => sum + a.costPerDay, 0);
                                const monthlyCost = dailyCost * 30;
                                const avgUtilization = deptAllocations.length > 0 
                                  ? deptAllocations.reduce((sum, a) => sum + a.utilizationRate, 0) / deptAllocations.length
                                  : 0;
                                const costPerDevice = deptAllocations.length > 0 ? monthlyCost / deptAllocations.length : 0;
                                
                                return (
                                  <TableRow key={dept.id} hover>
                                    <TableCell>
                                      <Typography fontWeight={500}>
                                        {dept.name}
                                      </Typography>
                                    </TableCell>
                                    <TableCell>{deptAllocations.length}</TableCell>
                                    <TableCell>
                                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <LinearProgress 
                                          variant="determinate" 
                                          value={avgUtilization}
                                          sx={{ width: 60 }}
                                          color={getUtilizationColor(avgUtilization)}
                                        />
                                        <Typography variant="body2">
                                          {avgUtilization.toFixed(1)}%
                                        </Typography>
                                      </Box>
                                    </TableCell>
                                    <TableCell>{formatCurrency(dailyCost)}</TableCell>
                                    <TableCell>{formatCurrency(monthlyCost)}</TableCell>
                                    <TableCell>{formatCurrency(costPerDevice)}</TableCell>
                                  </TableRow>
                                );
                              })}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </motion.div>
            )}

            {/* Alerts & Issues Tab */}
            {tabValue === 3 && (
              <motion.div
                key="alerts"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
                  Allocation Alerts & Issues
                </Typography>
                
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Card>
                      <CardContent>
                        <Typography variant="subtitle1" gutterBottom color="error">
                          <Warning sx={{ verticalAlign: 'middle', mr: 1 }} />
                          Overdue Returns
                        </Typography>
                        <List>
                          {allocations
                            .filter(a => a.alerts.includes('return-overdue'))
                            .map((allocation) => {
                              const daysOverdue = calculateDaysOverdue(allocation.expectedReturnDate);
                              return (
                                <React.Fragment key={allocation.id}>
                                  <ListItem>
                                    <ListItemAvatar>
                                      <Avatar sx={{ bgcolor: 'error.light' }}>
                                        <Schedule />
                                      </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                      primary={allocation.deviceName}
                                      secondary={
                                        <>
                                          {allocation.departmentName}
                                          <br />
                                          Due: {new Date(allocation.expectedReturnDate).toLocaleDateString()} ({daysOverdue} days overdue)
                                        </>
                                      }
                                    />
                                    <ListItemSecondaryAction>
                                      <Button
                                        size="small"
                                        variant="contained"
                                        color="error"
                                        onClick={() => handleReturnDevice(allocation.id)}
                                      >
                                        Mark Returned
                                      </Button>
                                    </ListItemSecondaryAction>
                                  </ListItem>
                                  <Divider />
                                </React.Fragment>
                              );
                            })}
                          {allocations.filter(a => a.alerts.includes('return-overdue')).length === 0 && (
                            <Alert severity="success">No overdue returns</Alert>
                          )}
                        </List>
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Card>
                      <CardContent>
                        <Typography variant="subtitle1" gutterBottom color="warning">
                          <HourglassEmpty sx={{ verticalAlign: 'middle', mr: 1 }} />
                          Underutilized Devices
                        </Typography>
                        <List>
                          {allocations
                            .filter(a => a.alerts.includes('underutilized'))
                            .map((allocation) => (
                              <React.Fragment key={allocation.id}>
                                <ListItem>
                                  <ListItemAvatar>
                                    <Avatar sx={{ bgcolor: 'warning.light' }}>
                                      <TrendingDown />
                                    </Avatar>
                                  </ListItemAvatar>
                                  <ListItemText
                                    primary={allocation.deviceName}
                                    secondary={
                                      <>
                                        {allocation.departmentName}
                                        <br />
                                        Utilization: {allocation.utilizationRate}% (Below 60% threshold)
                                      </>
                                    }
                                  />
                                  <ListItemSecondaryAction>
                                    <Button
                                      size="small"
                                      variant="outlined"
                                      onClick={() => setTransferDialogOpen(true)}
                                    >
                                      Reallocate
                                    </Button>
                                  </ListItemSecondaryAction>
                                </ListItem>
                                <Divider />
                              </React.Fragment>
                            ))}
                          {allocations.filter(a => a.alerts.includes('underutilized')).length === 0 && (
                            <Alert severity="success">No underutilized devices</Alert>
                          )}
                        </List>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>

      {/* Recent Allocation History */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <History />
            Recent Allocation History
          </Typography>
          <TableContainer component={Paper} variant="outlined">
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Device</TableCell>
                  <TableCell>From</TableCell>
                  <TableCell>To</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Duration</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allocationHistory.map((history) => (
                  <TableRow key={history.id} hover>
                    <TableCell>
                      <Typography fontWeight={500}>
                        {history.deviceId}
                      </Typography>
                    </TableCell>
                    <TableCell>{history.from}</TableCell>
                    <TableCell>{history.to}</TableCell>
                    <TableCell>{new Date(history.date).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Chip
                        label={history.type}
                        color={history.type === 'assignment' ? 'primary' : 'secondary'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{history.duration}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Allocation Dialog */}
      <Dialog 
        open={allocationDialogOpen} 
        onClose={() => setAllocationDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {selectedAllocation ? 'Edit Allocation' : 'New Device Allocation'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Device</InputLabel>
              <Select
                value={selectedAllocation?.deviceId || newAllocation.deviceId}
                label="Device"
                onChange={(e) => selectedAllocation
                  ? setSelectedAllocation({...selectedAllocation, deviceId: e.target.value})
                  : setNewAllocation({...newAllocation, deviceId: e.target.value})
                }
              >
                {availableDevices.map(device => (
                  <MenuItem key={device.id} value={device.id}>
                    {device.name} ({device.id}) - {device.status}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Department</InputLabel>
              <Select
                value={selectedAllocation?.departmentId || newAllocation.departmentId}
                label="Department"
                onChange={(e) => selectedAllocation
                  ? setSelectedAllocation({...selectedAllocation, departmentId: e.target.value})
                  : setNewAllocation({...newAllocation, departmentId: e.target.value})
                }
              >
                {departments.map(dept => (
                  <MenuItem key={dept.id} value={dept.id}>
                    {dept.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Allocation Type</InputLabel>
              <Select
                value={selectedAllocation?.allocationType || newAllocation.allocationType}
                label="Allocation Type"
                onChange={(e) => selectedAllocation
                  ? setSelectedAllocation({...selectedAllocation, allocationType: e.target.value})
                  : setNewAllocation({...newAllocation, allocationType: e.target.value})
                }
              >
                <MenuItem value="owned">Owned (Permanent)</MenuItem>
                <MenuItem value="borrowed">Borrowed (Temporary)</MenuItem>
                <MenuItem value="shared">Shared (Multi-department)</MenuItem>
              </Select>
            </FormControl>

            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <TextField
                fullWidth
                label="Assigned Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={selectedAllocation?.assignedDate || newAllocation.assignedDate}
                onChange={(e) => selectedAllocation
                  ? setSelectedAllocation({...selectedAllocation, assignedDate: e.target.value})
                  : setNewAllocation({...newAllocation, assignedDate: e.target.value})
                }
              />
              <TextField
                fullWidth
                label="Expected Return Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={selectedAllocation?.expectedReturnDate || newAllocation.expectedReturnDate}
                onChange={(e) => selectedAllocation
                  ? setSelectedAllocation({...selectedAllocation, expectedReturnDate: e.target.value})
                  : setNewAllocation({...newAllocation, expectedReturnDate: e.target.value})
                }
              />
            </Box>

            <TextField
              fullWidth
              label="Notes"
              multiline
              rows={2}
              value={newAllocation.notes}
              onChange={(e) => setNewAllocation({...newAllocation, notes: e.target.value})}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setAllocationDialogOpen(false);
            setSelectedAllocation(null);
          }}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleAddAllocation}
          >
            {selectedAllocation ? 'Update' : 'Create'} Allocation
          </Button>
        </DialogActions>
      </Dialog>

      {/* Transfer Dialog */}
      <Dialog 
        open={transferDialogOpen} 
        onClose={() => setTransferDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Transfer Device
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Select Device</InputLabel>
              <Select
                value={selectedDevice?.id || ''}
                label="Select Device"
                onChange={(e) => {
                  const device = allocations.find(a => a.id === e.target.value);
                  setSelectedDevice(device);
                }}
              >
                {allocations.map(allocation => (
                  <MenuItem key={allocation.id} value={allocation.id}>
                    {allocation.deviceName} - Currently in {allocation.departmentName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {selectedDevice && (
              <>
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Transfer To Department</InputLabel>
                  <Select
                    value=""
                    label="Transfer To Department"
                    onChange={(e) => handleTransferDevice(selectedDevice.id, e.target.value)}
                  >
                    {departments
                      .filter(dept => dept.id !== selectedDevice.departmentId)
                      .map(dept => (
                        <MenuItem key={dept.id} value={dept.id}>
                          {dept.name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>

                <Alert severity="info" sx={{ mb: 2 }}>
                  Transferring {selectedDevice.deviceName} from {selectedDevice.departmentName}
                </Alert>
              </>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setTransferDialogOpen(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DepartmentDeviceAllocation;