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
  Stepper,
  Step,
  StepLabel,
  StepContent,
  InputAdornment,
  Rating,
} from '@mui/material';
import {
  Build,
  LocalHospital,
  DeviceHub,
  Schedule,
  CalendarToday,
  Warning,
  CheckCircle,
  Error,
  Group,
  SwapHoriz,
  History,
  Comment,
  AttachFile,
  Notifications,
  Search,
  FilterList,
  Download,
  Print,
  Refresh,
  Add,
  Edit,
  Delete,
  Visibility,
  Chat,
  Share,
  AccessTime,
  Timelapse,
  Speed,
  TrendingUp,
  TrendingDown,
  TrendingFlat,
  Inventory,
  DirectionsRun,
  Engineering,
  Science,
  Biotech,
  LocalShipping,
  Assignment,
  AssignmentTurnedIn,
  ChatBubble,
  Forum,
  NotificationsActive,
  PriorityHigh,
  LowPriority,
  ScheduleSend,
  TaskAlt,
  PendingActions,
  HourglassEmpty,
  HourglassFull,
  BuildCircle,
  PrecisionManufacturing,
  Sync,
  SwapVert,
  MoveUp,
  MoveDown,
  Devices,
  HealthAndSafety,
  Security
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';
import { Timeline, TimelineItem } from '../shared/CustomTimeline';

const MaintenanceClinicCollaboration = () => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const [maintenanceDialogOpen, setMaintenanceDialogOpen] = useState(false);
  const [serviceTicketDialogOpen, setServiceTicketDialogOpen] = useState(false);
  const [collaborationDialogOpen, setCollaborationDialogOpen] = useState(false);
  const [deviceBorrowDialogOpen, setDeviceBorrowDialogOpen] = useState(false);
  const [selectedMaintenance, setSelectedMaintenance] = useState(null);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [filterDeviceType, setFilterDeviceType] = useState('all');
  const [showOverdueOnly, setShowOverdueOnly] = useState(false);
  const [showCriticalOnly, setShowCriticalOnly] = useState(false);

  // Maintenance schedules data
  const initialMaintenanceSchedules = [
    {
      id: 1,
      deviceId: 'DEV-2023-045',
      deviceName: 'Ventilator X200',
      deviceType: 'ventilator',
      department: 'ICU',
      maintenanceType: 'preventive',
      scheduleType: 'monthly',
      lastMaintenance: '2024-01-10',
      nextDueDate: '2024-02-10',
      dueInDays: 25,
      status: 'scheduled',
      priority: 'critical',
      assignedTo: 'Biomed Team A',
      estimatedDuration: '4 hours',
      partsRequired: ['Filters', 'Sensors'],
      calibrationRequired: true,
      calibrationDue: '2024-02-05',
      uptime: '99.2%',
      history: [
        { date: '2024-01-10', action: 'Preventive maintenance completed', by: 'Tech John D.' },
        { date: '2023-12-10', action: 'Monthly calibration', by: 'Biomed Team A' }
      ]
    },
    {
      id: 2,
      deviceId: 'DEV-2023-128',
      deviceName: 'Infusion Pump Pro',
      deviceType: 'infusion-pump',
      department: 'ER',
      maintenanceType: 'calibration',
      scheduleType: 'quarterly',
      lastMaintenance: '2023-12-15',
      nextDueDate: '2024-03-15',
      dueInDays: 59,
      status: 'scheduled',
      priority: 'high',
      assignedTo: 'Biomed Team B',
      estimatedDuration: '2 hours',
      partsRequired: ['Calibration kit'],
      calibrationRequired: true,
      calibrationDue: '2024-03-10',
      uptime: '98.7%',
      history: [
        { date: '2023-12-15', action: 'Quarterly calibration', by: 'Tech Maria L.' },
        { date: '2023-09-15', action: 'Software update applied', by: 'IT Support' }
      ]
    },
    {
      id: 3,
      deviceId: 'DEV-2023-089',
      deviceName: 'Patient Monitor V5',
      deviceType: 'patient-monitor',
      department: 'Surgery',
      maintenanceType: 'corrective',
      scheduleType: 'as-needed',
      lastMaintenance: '2024-01-05',
      nextDueDate: '2024-04-05',
      dueInDays: 80,
      status: 'in-progress',
      priority: 'medium',
      assignedTo: 'Biomed Team C',
      estimatedDuration: '3 hours',
      partsRequired: ['Display module', 'Cables'],
      calibrationRequired: false,
      calibrationDue: null,
      uptime: '97.4%',
      history: [
        { date: '2024-01-05', action: 'Display replacement started', by: 'Tech Robert C.' },
        { date: '2023-11-20', action: 'Battery replacement', by: 'Biomed Team C' }
      ]
    },
    {
      id: 4,
      deviceId: 'DEV-2023-156',
      deviceName: 'Defibrillator A9',
      deviceType: 'defibrillator',
      department: 'Cardiology',
      maintenanceType: 'preventive',
      scheduleType: 'bi-monthly',
      lastMaintenance: '2023-11-30',
      nextDueDate: '2024-01-30',
      dueInDays: 15,
      status: 'overdue',
      priority: 'critical',
      assignedTo: 'Biomed Team A',
      estimatedDuration: '3.5 hours',
      partsRequired: ['Pads', 'Battery pack'],
      calibrationRequired: true,
      calibrationDue: '2024-01-25',
      uptime: '99.8%',
      history: [
        { date: '2023-11-30', action: 'Bi-monthly maintenance', by: 'Tech Sarah M.' },
        { date: '2023-09-30', action: 'Full system check', by: 'Biomed Team A' }
      ]
    },
    {
      id: 5,
      deviceId: 'DEV-2023-201',
      deviceName: 'Portable Oxygen Concentrator',
      deviceType: 'oxygen-concentrator',
      department: 'Pediatrics',
      maintenanceType: 'calibration',
      scheduleType: 'monthly',
      lastMaintenance: '2024-01-12',
      nextDueDate: '2024-02-12',
      dueInDays: 27,
      status: 'scheduled',
      priority: 'high',
      assignedTo: 'Biomed Team B',
      estimatedDuration: '1.5 hours',
      partsRequired: ['Oxygen sensor'],
      calibrationRequired: true,
      calibrationDue: '2024-02-10',
      uptime: '96.8%',
      history: [
        { date: '2024-01-12', action: 'Monthly calibration', by: 'Tech David W.' },
        { date: '2023-12-12', action: 'Filter replacement', by: 'Biomed Team B' }
      ]
    },
    {
      id: 6,
      deviceId: 'DEV-2023-067',
      deviceName: 'Anesthesia Machine',
      deviceType: 'anesthesia',
      department: 'Surgery',
      maintenanceType: 'preventive',
      scheduleType: 'quarterly',
      lastMaintenance: '2023-12-20',
      nextDueDate: '2024-03-20',
      dueInDays: 64,
      status: 'completed',
      priority: 'medium',
      assignedTo: 'Biomed Team A',
      estimatedDuration: '6 hours',
      partsRequired: ['Vaporizer seals', 'Filters'],
      calibrationRequired: true,
      calibrationDue: '2024-03-15',
      uptime: '99.5%',
      history: [
        { date: '2023-12-20', action: 'Quarterly preventive maintenance', by: 'Tech Michael B.' },
        { date: '2023-09-20', action: 'Full system overhaul', by: 'Vendor Specialist' }
      ]
    }
  ];

  // Service tickets data
  const initialServiceTickets = [
    {
      id: 1,
      ticketId: 'TICK-2024-001',
      deviceId: 'DEV-2023-089',
      deviceName: 'Patient Monitor V5',
      department: 'Surgery',
      reportedBy: 'Nurse Mark Davis',
      reportDate: '2024-01-14',
      issue: 'Intermittent display flickering',
      priority: 'high',
      status: 'in-progress',
      assignedTo: 'Biomed Team C',
      estimatedCompletion: '2024-01-16',
      actualCompletion: null,
      downtime: '2 hours',
      resolution: 'Display module replacement in progress',
      collaborationNotes: [
        { user: 'Dr. Sarah Johnson', note: 'Critical for surgery monitoring', timestamp: '2024-01-14 10:30' },
        { user: 'Biomed Tech', note: 'Parts ordered, ETA 2 days', timestamp: '2024-01-14 14:15' }
      ]
    },
    {
      id: 2,
      ticketId: 'TICK-2024-002',
      deviceId: 'DEV-2023-156',
      deviceName: 'Defibrillator A9',
      department: 'Cardiology',
      reportedBy: 'Dr. Lisa Thompson',
      reportDate: '2024-01-15',
      issue: 'Battery not holding charge',
      priority: 'critical',
      status: 'open',
      assignedTo: 'Biomed Team A',
      estimatedCompletion: '2024-01-16',
      actualCompletion: null,
      downtime: '4 hours',
      resolution: 'Urgent battery replacement needed',
      collaborationNotes: [
        { user: 'Dr. Lisa Thompson', note: 'Emergency backup required', timestamp: '2024-01-15 09:45' }
      ]
    },
    {
      id: 3,
      ticketId: 'TICK-2024-003',
      deviceId: 'DEV-2023-128',
      deviceName: 'Infusion Pump Pro',
      department: 'ER',
      reportedBy: 'Nurse Emma Wilson',
      reportDate: '2024-01-13',
      issue: 'Inaccurate flow rate',
      priority: 'medium',
      status: 'resolved',
      assignedTo: 'Biomed Team B',
      estimatedCompletion: '2024-01-14',
      actualCompletion: '2024-01-14',
      downtime: '1.5 hours',
      resolution: 'Calibration completed successfully',
      collaborationNotes: [
        { user: 'Nurse Emma Wilson', note: 'Affecting multiple patients', timestamp: '2024-01-13 16:20' },
        { user: 'Biomed Tech', note: 'Calibration performed', timestamp: '2024-01-14 11:30' }
      ]
    },
    {
      id: 4,
      ticketId: 'TICK-2024-004',
      deviceId: 'DEV-2023-045',
      deviceName: 'Ventilator X200',
      department: 'ICU',
      reportedBy: 'Dr. James Wilson',
      reportDate: '2024-01-12',
      issue: 'Alarm system malfunction',
      priority: 'high',
      status: 'pending-review',
      assignedTo: 'Vendor Support',
      estimatedCompletion: '2024-01-18',
      actualCompletion: null,
      downtime: '6 hours',
      resolution: 'Waiting for vendor technician',
      collaborationNotes: [
        { user: 'Dr. James Wilson', note: 'Critical safety issue', timestamp: '2024-01-12 14:45' },
        { user: 'Vendor Support', note: 'Technician scheduled for Jan 18', timestamp: '2024-01-12 16:30' }
      ]
    }
  ];

  // Clinic collaboration data
  const initialClinicCollaborations = [
    {
      id: 1,
      deviceId: 'DEV-2023-205',
      deviceName: 'Portable Ultrasound',
      deviceType: 'ultrasound',
      currentLocation: 'Radiology',
      sharedPool: true,
      availableForBorrow: true,
      nextAvailable: '2024-01-16',
      borrowingHistory: [
        { department: 'ER', borrowed: '2024-01-10', returned: '2024-01-12', purpose: 'Emergency cases' },
        { department: 'Surgery', borrowed: '2024-01-05', returned: '2024-01-07', purpose: 'Surgical planning' }
      ],
      collaborationNotes: [
        { department: 'ER', note: 'Highly useful for trauma cases', priority: 'high' },
        { department: 'Surgery', note: 'Need scheduled access twice weekly', priority: 'medium' }
      ]
    },
    {
      id: 2,
      deviceId: 'DEV-2023-210',
      deviceName: 'Vital Signs Monitor',
      deviceType: 'patient-monitor',
      currentLocation: 'ICU',
      sharedPool: false,
      availableForBorrow: false,
      nextAvailable: null,
      borrowingHistory: [],
      collaborationNotes: [
        { department: 'ICU', note: 'Critical care equipment - not for sharing', priority: 'critical' }
      ]
    },
    {
      id: 3,
      deviceId: 'DEV-2023-215',
      deviceName: 'Transport Ventilator',
      deviceType: 'ventilator',
      currentLocation: 'ER',
      sharedPool: true,
      availableForBorrow: true,
      nextAvailable: '2024-01-15',
      borrowingHistory: [
        { department: 'ICU', borrowed: '2024-01-14', returned: null, purpose: 'Patient transfer' },
        { department: 'Surgery', borrowed: '2024-01-10', returned: '2024-01-11', purpose: 'Post-op recovery' }
      ],
      collaborationNotes: [
        { department: 'ER', note: 'Keep at least one unit available', priority: 'critical' },
        { department: 'ICU', note: 'Essential for patient transport', priority: 'high' }
      ]
    },
    {
      id: 4,
      deviceId: 'DEV-2023-220',
      deviceName: 'ECG Machine',
      deviceType: 'ecg-machine',
      currentLocation: 'Cardiology',
      sharedPool: true,
      availableForBorrow: true,
      nextAvailable: '2024-01-16',
      borrowingHistory: [
        { department: 'Pediatrics', borrowed: '2024-01-13', returned: null, purpose: 'Pediatric cardiology' },
        { department: 'ER', borrowed: '2024-01-08', returned: '2024-01-10', purpose: 'Emergency cases' }
      ],
      collaborationNotes: [
        { department: 'Cardiology', note: 'Primary unit - maintain availability', priority: 'high' },
        { department: 'Pediatrics', note: 'Pediatric adapters needed', priority: 'medium' }
      ]
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
    { id: 'Radiology', name: 'Radiology' },
    { id: 'Biomed', name: 'Biomedical Engineering' }
  ];

  // Device types for filtering
  const deviceTypes = [
    { id: 'all', name: 'All Types' },
    { id: 'ventilator', name: 'Ventilators' },
    { id: 'infusion-pump', name: 'Infusion Pumps' },
    { id: 'patient-monitor', name: 'Patient Monitors' },
    { id: 'defibrillator', name: 'Defibrillators' },
    { id: 'oxygen-concentrator', name: 'Oxygen Concentrators' },
    { id: 'anesthesia', name: 'Anesthesia Machines' },
    { id: 'ultrasound', name: 'Ultrasound Machines' },
    { id: 'ecg-machine', name: 'ECG Machines' }
  ];

  // Statistics
  const stats = {
    totalDevices: 156,
    devicesDueMaintenance: 24,
    devicesOverdue: 8,
    activeServiceTickets: 12,
    resolvedThisMonth: 45,
    averageUptime: 98.7,
    sharedPoolDevices: 28,
    activeBorrowings: 15
  };

  // Uptime data for charts
  const uptimeData = [
    { month: 'Jul', uptime: 97.8, downtime: 2.2 },
    { month: 'Aug', uptime: 98.2, downtime: 1.8 },
    { month: 'Sep', uptime: 98.5, downtime: 1.5 },
    { month: 'Oct', uptime: 98.8, downtime: 1.2 },
    { month: 'Nov', uptime: 99.0, downtime: 1.0 },
    { month: 'Dec', uptime: 99.2, downtime: 0.8 },
    { month: 'Jan', uptime: 99.3, downtime: 0.7 }
  ];

  // Alert data
  const initialAlerts = [
    {
      id: 1,
      deviceId: 'DEV-2023-156',
      deviceName: 'Defibrillator A9',
      alertType: 'maintenance-overdue',
      severity: 'critical',
      message: 'Maintenance overdue by 15 days',
      date: '2024-01-15',
      acknowledged: false
    },
    {
      id: 2,
      deviceId: 'DEV-2023-045',
      deviceName: 'Ventilator X200',
      alertType: 'calibration-due',
      severity: 'high',
      message: 'Calibration due in 5 days',
      date: '2024-01-15',
      acknowledged: true
    },
    {
      id: 3,
      deviceId: 'DEV-2023-128',
      deviceName: 'Infusion Pump Pro',
      alertType: 'low-uptime',
      severity: 'medium',
      message: 'Uptime below 95% threshold',
      date: '2024-01-14',
      acknowledged: false
    },
    {
      id: 4,
      deviceId: 'DEV-2023-215',
      deviceName: 'Transport Ventilator',
      alertType: 'borrowing-overdue',
      severity: 'high',
      message: 'Device borrowing overdue return',
      date: '2024-01-15',
      acknowledged: true
    }
  ];

  const [maintenanceSchedules, setMaintenanceSchedules] = useState(initialMaintenanceSchedules);
  const [serviceTickets, setServiceTickets] = useState(initialServiceTickets);
  const [clinicCollaborations, setClinicCollaborations] = useState(initialClinicCollaborations);
  const [alerts, setAlerts] = useState(initialAlerts);
  const [newMaintenance, setNewMaintenance] = useState({
    deviceId: '',
    maintenanceType: 'preventive',
    scheduleType: 'monthly',
    dueDate: '',
    priority: 'medium',
    assignedTo: '',
    notes: ''
  });
  const [newTicket, setNewTicket] = useState({
    deviceId: '',
    issue: '',
    priority: 'medium',
    reportedBy: '',
    department: ''
  });

  // Load from localStorage
  useEffect(() => {
    const savedSchedules = localStorage.getItem('maintenanceSchedules');
    const savedTickets = localStorage.getItem('serviceTickets');
    const savedCollaborations = localStorage.getItem('clinicCollaborations');
    const savedAlerts = localStorage.getItem('maintenanceAlerts');

    if (savedSchedules) setMaintenanceSchedules(JSON.parse(savedSchedules));
    if (savedTickets) setServiceTickets(JSON.parse(savedTickets));
    if (savedCollaborations) setClinicCollaborations(JSON.parse(savedCollaborations));
    if (savedAlerts) setAlerts(JSON.parse(savedAlerts));
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('maintenanceSchedules', JSON.stringify(maintenanceSchedules));
    localStorage.setItem('serviceTickets', JSON.stringify(serviceTickets));
    localStorage.setItem('clinicCollaborations', JSON.stringify(clinicCollaborations));
    localStorage.setItem('maintenanceAlerts', JSON.stringify(alerts));
  }, [maintenanceSchedules, serviceTickets, clinicCollaborations, alerts]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled':
        return 'info';
      case 'in-progress':
        return 'warning';
      case 'completed':
        return 'success';
      case 'overdue':
        return 'error';
      case 'pending-review':
        return 'secondary';
      case 'open':
        return 'warning';
      case 'resolved':
        return 'success';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'scheduled':
        return <Schedule />;
      case 'in-progress':
        return <HourglassEmpty />;
      case 'completed':
        return <CheckCircle />;
      case 'overdue':
        return <Warning />;
      case 'pending-review':
        return <PendingActions />;
      case 'open':
        return <Error />;
      case 'resolved':
        return <TaskAlt />;
      default:
        return <Build />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
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

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'critical':
        return <PriorityHigh />;
      case 'high':
        return <Warning />;
      case 'medium':
        return <LowPriority />;
      case 'low':
        return <CheckCircle />;
      default:
        return <LowPriority />;
    }
  };

  const getUptimeColor = (uptime) => {
    const uptimeValue = parseFloat(uptime);
    if (uptimeValue >= 99) return 'success';
    if (uptimeValue >= 97) return 'warning';
    return 'error';
  };

  const calculateDaysRemaining = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const handleAddMaintenance = () => {
    const device = maintenanceSchedules.find(m => m.deviceId === newMaintenance.deviceId) || 
                   { deviceName: 'New Device', deviceType: 'general', department: 'General' };
    
    const newId = maintenanceSchedules.length + 1;
    const maintenanceToAdd = {
      id: newId,
      deviceId: newMaintenance.deviceId,
      deviceName: device.deviceName,
      deviceType: device.deviceType,
      department: device.department,
      maintenanceType: newMaintenance.maintenanceType,
      scheduleType: newMaintenance.scheduleType,
      lastMaintenance: new Date().toISOString().split('T')[0],
      nextDueDate: newMaintenance.dueDate,
      dueInDays: calculateDaysRemaining(newMaintenance.dueDate),
      status: 'scheduled',
      priority: newMaintenance.priority,
      assignedTo: newMaintenance.assignedTo,
      estimatedDuration: '2 hours',
      partsRequired: [],
      calibrationRequired: false,
      calibrationDue: null,
      uptime: '99.0%',
      history: [
        { date: new Date().toISOString().split('T')[0], action: 'Maintenance scheduled', by: 'System' }
      ]
    };

    setMaintenanceSchedules(prev => [...prev, maintenanceToAdd]);
    
    // Add alert for new maintenance
    const newAlert = {
      id: alerts.length + 1,
      deviceId: newMaintenance.deviceId,
      deviceName: device.deviceName,
      alertType: 'maintenance-scheduled',
      severity: newMaintenance.priority,
      message: `New ${newMaintenance.maintenanceType} maintenance scheduled`,
      date: new Date().toISOString().split('T')[0],
      acknowledged: false
    };
    setAlerts(prev => [newAlert, ...prev]);
    
    setMaintenanceDialogOpen(false);
    setNewMaintenance({
      deviceId: '',
      maintenanceType: 'preventive',
      scheduleType: 'monthly',
      dueDate: '',
      priority: 'medium',
      assignedTo: '',
      notes: ''
    });
  };

  const handleAddServiceTicket = () => {
    const device = maintenanceSchedules.find(m => m.deviceId === newTicket.deviceId) || 
                   { deviceName: 'Unknown Device', department: 'General' };
    
    const newId = serviceTickets.length + 1;
    const ticketToAdd = {
      id: newId,
      ticketId: `TICK-2024-${(100 + newId).toString().slice(1)}`,
      deviceId: newTicket.deviceId,
      deviceName: device.deviceName,
      department: newTicket.department || device.department,
      reportedBy: newTicket.reportedBy,
      reportDate: new Date().toISOString().split('T')[0],
      issue: newTicket.issue,
      priority: newTicket.priority,
      status: 'open',
      assignedTo: 'Unassigned',
      estimatedCompletion: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      actualCompletion: null,
      downtime: '0 hours',
      resolution: 'Pending',
      collaborationNotes: [
        { user: newTicket.reportedBy, note: 'Ticket created', timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19) }
      ]
    };

    setServiceTickets(prev => [...prev, ticketToAdd]);
    
    // Add alert for new ticket
    const newAlert = {
      id: alerts.length + 1,
      deviceId: newTicket.deviceId,
      deviceName: device.deviceName,
      alertType: 'service-ticket-created',
      severity: newTicket.priority,
      message: `New service ticket: ${newTicket.issue}`,
      date: new Date().toISOString().split('T')[0],
      acknowledged: false
    };
    setAlerts(prev => [newAlert, ...prev]);
    
    setServiceTicketDialogOpen(false);
    setNewTicket({
      deviceId: '',
      issue: '',
      priority: 'medium',
      reportedBy: '',
      department: ''
    });
  };

  const handleUpdateTicketStatus = (ticketId, newStatus) => {
    setServiceTickets(prev => prev.map(ticket =>
      ticket.id === ticketId
        ? { ...ticket, status: newStatus }
        : ticket
    ));
  };

  const handleBorrowDevice = (deviceId, borrowingDepartment) => {
    setClinicCollaborations(prev => prev.map(device =>
      device.deviceId === deviceId
        ? {
            ...device,
            availableForBorrow: false,
            borrowingHistory: [
              ...device.borrowingHistory,
              {
                department: borrowingDepartment,
                borrowed: new Date().toISOString().split('T')[0],
                returned: null,
                purpose: 'Clinical use'
              }
            ]
          }
        : device
    ));
    
    setDeviceBorrowDialogOpen(false);
  };

  const handleReturnDevice = (deviceId, historyIndex) => {
    setClinicCollaborations(prev => prev.map(device =>
      device.deviceId === deviceId
        ? {
            ...device,
            availableForBorrow: true,
            borrowingHistory: device.borrowingHistory.map((record, index) =>
              index === historyIndex
                ? { ...record, returned: new Date().toISOString().split('T')[0] }
                : record
            )
          }
        : device
    ));
  };

  const handleAcknowledgeAlert = (alertId) => {
    setAlerts(prev => prev.map(alert =>
      alert.id === alertId
        ? { ...alert, acknowledged: true }
        : alert
    ));
  };

  const filteredMaintenance = maintenanceSchedules.filter(schedule => {
    const matchesSearch = 
      schedule.deviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      schedule.deviceId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || schedule.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || schedule.priority === filterPriority;
    const matchesDepartment = filterDepartment === 'all' || schedule.department === filterDepartment;
    const matchesDeviceType = filterDeviceType === 'all' || schedule.deviceType === filterDeviceType;
    const matchesOverdue = !showOverdueOnly || schedule.status === 'overdue';
    const matchesCritical = !showCriticalOnly || schedule.priority === 'critical';
    
    return matchesSearch && matchesStatus && matchesPriority && matchesDepartment && 
           matchesDeviceType && matchesOverdue && matchesCritical;
  });

  const filteredTickets = serviceTickets.filter(ticket => {
    const matchesSearch = 
      ticket.deviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.ticketId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || ticket.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || ticket.priority === filterPriority;
    const matchesDepartment = filterDepartment === 'all' || ticket.department === filterDepartment;
    
    return matchesSearch && matchesStatus && matchesPriority && matchesDepartment;
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getDeviceTypeIcon = (type) => {
    switch (type) {
      case 'ventilator':
        return <Biotech />;
      case 'infusion-pump':
        return <Science />;
      case 'patient-monitor':
        return <DeviceHub />;
      case 'defibrillator':
        return <HealthAndSafety />;
      case 'oxygen-concentrator':
        return <LocalHospital />;
      case 'anesthesia':
        return <PrecisionManufacturing />;
      case 'ultrasound':
        return <Visibility />;
      case 'ecg-machine':
        return <Timelapse />;
      default:
        return <Devices />;
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: theme.palette.primary.main }}>
            <Build sx={{ verticalAlign: 'middle', mr: 2 }} />
            Maintenance & Clinic Collaboration
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Manage device maintenance schedules, service tickets, and inter-clinic collaboration
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => setMaintenanceDialogOpen(true)}
          >
            Schedule Maintenance
          </Button>
          <Button
            variant="outlined"
            startIcon={<Assignment />}
            onClick={() => setServiceTicketDialogOpen(true)}
          >
            Create Service Ticket
          </Button>
        </Box>
      </Box>

      {/* Alerts Banner */}
      {alerts.filter(a => !a.acknowledged).length > 0 && (
        <Alert 
          severity="warning" 
          sx={{ mb: 4 }}
          action={
            <Button color="inherit" size="small" onClick={() => {
              // Acknowledge all alerts
              setAlerts(prev => prev.map(alert => ({ ...alert, acknowledged: true })));
            }}>
              Dismiss All
            </Button>
          }
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <NotificationsActive />
            <Typography>
              {alerts.filter(a => !a.acknowledged).length} unacknowledged alerts
            </Typography>
          </Box>
        </Alert>
      )}

      {/* Stats Cards */}
      <Box sx={{ display: 'flex', gap: 3, mb: 4, flexWrap: 'wrap' }}>
        <motion.div whileHover={{ scale: 1.02 }} style={{ flex: 1, minWidth: 200 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="text.secondary" gutterBottom>
                    Maintenance Due
                  </Typography>
                  <Typography variant="h4" color="warning.main">
                    {stats.devicesDueMaintenance}
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'warning.light' }}>
                  <Schedule />
                </Avatar>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {stats.devicesOverdue} overdue • {stats.totalDevices} total devices
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
                    Service Tickets
                  </Typography>
                  <Typography variant="h4">
                    {stats.activeServiceTickets}
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'primary.light' }}>
                  <Assignment />
                </Avatar>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {stats.resolvedThisMonth} resolved this month
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
                    System Uptime
                  </Typography>
                  <Typography variant="h4" color="success.main">
                    {stats.averageUptime}%
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'success.light' }}>
                  <TrendingUp />
                </Avatar>
              </Box>
              <LinearProgress 
                variant="determinate" 
                value={stats.averageUptime}
                sx={{ mt: 2 }}
                color="success"
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
                    Clinic Collaboration
                  </Typography>
                  <Typography variant="h4" color="info.main">
                    {stats.sharedPoolDevices}
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'info.light' }}>
                  <Group />
                </Avatar>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {stats.activeBorrowings} active borrowings
              </Typography>
            </CardContent>
          </Card>
        </motion.div>
      </Box>

      {/* Main Content Tabs */}
      <Card sx={{ mb: 4 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="Maintenance Schedules" icon={<Schedule />} iconPosition="start" />
            <Tab label="Service Tickets" icon={<Assignment />} iconPosition="start" />
            <Tab label="Clinic Collaboration" icon={<Group />} iconPosition="start" />
            <Tab label="Uptime Analytics" icon={<TrendingUp />} iconPosition="start" />
          </Tabs>
        </Box>

        <CardContent>
          <AnimatePresence mode="wait">
            {/* Maintenance Schedules Tab */}
            {tabValue === 0 && (
              <motion.div
                key="maintenance"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
                    <TextField
                      placeholder="Search devices..."
                      size="small"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      sx={{ width: 250 }}
                      InputProps={{
                        startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />
                      }}
                    />
                    
                    <FormControl size="small" sx={{ minWidth: 150 }}>
                      <InputLabel>Status</InputLabel>
                      <Select
                        value={filterStatus}
                        label="Status"
                        onChange={(e) => setFilterStatus(e.target.value)}
                      >
                        <MenuItem value="all">All Status</MenuItem>
                        <MenuItem value="scheduled">Scheduled</MenuItem>
                        <MenuItem value="in-progress">In Progress</MenuItem>
                        <MenuItem value="completed">Completed</MenuItem>
                        <MenuItem value="overdue">Overdue</MenuItem>
                      </Select>
                    </FormControl>

                    <FormControl size="small" sx={{ minWidth: 150 }}>
                      <InputLabel>Priority</InputLabel>
                      <Select
                        value={filterPriority}
                        label="Priority"
                        onChange={(e) => setFilterPriority(e.target.value)}
                      >
                        <MenuItem value="all">All Priorities</MenuItem>
                        <MenuItem value="critical">Critical</MenuItem>
                        <MenuItem value="high">High</MenuItem>
                        <MenuItem value="medium">Medium</MenuItem>
                        <MenuItem value="low">Low</MenuItem>
                      </Select>
                    </FormControl>

                    <FormControl size="small" sx={{ minWidth: 150 }}>
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

                    <FormGroup row>
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
                            checked={showCriticalOnly}
                            onChange={(e) => setShowCriticalOnly(e.target.checked)}
                            size="small"
                          />
                        }
                        label="Critical Only"
                      />
                    </FormGroup>
                  </Box>
                </Box>

                <TableContainer component={Paper} variant="outlined">
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Device</TableCell>
                        <TableCell>Department</TableCell>
                        <TableCell>Maintenance Type</TableCell>
                        <TableCell>Next Due Date</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Priority</TableCell>
                        <TableCell>Uptime</TableCell>
                        <TableCell>Calibration</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredMaintenance.map((schedule) => (
                        <TableRow 
                          key={schedule.id}
                          hover
                          sx={{ 
                            '&:hover': { 
                              backgroundColor: theme.palette.action.hover 
                            },
                            borderLeft: schedule.status === 'overdue' 
                              ? `4px solid ${theme.palette.error.main}`
                              : schedule.priority === 'critical'
                              ? `4px solid ${theme.palette.warning.main}`
                              : 'none'
                          }}
                        >
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              {getDeviceTypeIcon(schedule.deviceType)}
                              <Box>
                                <Typography fontWeight={500}>
                                  {schedule.deviceName}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  {schedule.deviceId}
                                </Typography>
                              </Box>
                            </Box>
                          </TableCell>
                          <TableCell>{schedule.department}</TableCell>
                          <TableCell>
                            <Chip
                              label={schedule.maintenanceType}
                              color={schedule.maintenanceType === 'preventive' ? 'primary' : 'secondary'}
                              size="small"
                            />
                            <Typography variant="caption" display="block" color="text.secondary">
                              {schedule.scheduleType}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography fontWeight={500}>
                              {formatDate(schedule.nextDueDate)}
                            </Typography>
                            <Typography 
                              variant="caption" 
                              color={schedule.dueInDays <= 7 ? 'error' : 'text.secondary'}
                            >
                              {schedule.dueInDays > 0 
                                ? `Due in ${schedule.dueInDays} days`
                                : `Overdue by ${Math.abs(schedule.dueInDays)} days`}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Chip
                              icon={getStatusIcon(schedule.status)}
                              label={schedule.status}
                              color={getStatusColor(schedule.status)}
                              size="small"
                            />
                          </TableCell>
                          <TableCell>
                            <Chip
                              icon={getPriorityIcon(schedule.priority)}
                              label={schedule.priority}
                              color={getPriorityColor(schedule.priority)}
                              size="small"
                            />
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <LinearProgress 
                                variant="determinate" 
                                value={parseFloat(schedule.uptime)}
                                sx={{ width: 60 }}
                                color={getUptimeColor(schedule.uptime)}
                              />
                              <Typography variant="body2">
                                {schedule.uptime}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            {schedule.calibrationRequired ? (
                              <Box>
                                <Chip
                                  label="Required"
                                  color="warning"
                                  size="small"
                                />
                                {schedule.calibrationDue && (
                                  <Typography variant="caption" display="block" color="text.secondary">
                                    Due: {formatDate(schedule.calibrationDue)}
                                  </Typography>
                                )}
                              </Box>
                            ) : (
                              <Chip
                                label="Not Required"
                                color="default"
                                size="small"
                              />
                            )}
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', gap: 0.5 }}>
                              <Tooltip title="View Details">
                                <IconButton
                                  size="small"
                                  onClick={() => {
                                    setSelectedMaintenance(schedule);
                                    // Show details dialog
                                  }}
                                >
                                  <Visibility />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Edit Schedule">
                                <IconButton
                                  size="small"
                                  onClick={() => {
                                    setSelectedMaintenance(schedule);
                                    setMaintenanceDialogOpen(true);
                                  }}
                                >
                                  <Edit />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Mark Complete">
                                <IconButton
                                  size="small"
                                  onClick={() => {
                                    setMaintenanceSchedules(prev => prev.map(s =>
                                      s.id === schedule.id
                                        ? { ...s, status: 'completed' }
                                        : s
                                    ));
                                  }}
                                >
                                  <CheckCircle />
                                </IconButton>
                              </Tooltip>
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </motion.div>
            )}

            {/* Service Tickets Tab */}
            {tabValue === 1 && (
              <motion.div
                key="tickets"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
                    <TextField
                      placeholder="Search tickets..."
                      size="small"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      sx={{ width: 250 }}
                      InputProps={{
                        startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />
                      }}
                    />
                    
                    <FormControl size="small" sx={{ minWidth: 150 }}>
                      <InputLabel>Status</InputLabel>
                      <Select
                        value={filterStatus}
                        label="Status"
                        onChange={(e) => setFilterStatus(e.target.value)}
                      >
                        <MenuItem value="all">All Status</MenuItem>
                        <MenuItem value="open">Open</MenuItem>
                        <MenuItem value="in-progress">In Progress</MenuItem>
                        <MenuItem value="pending-review">Pending Review</MenuItem>
                        <MenuItem value="resolved">Resolved</MenuItem>
                      </Select>
                    </FormControl>

                    <FormControl size="small" sx={{ minWidth: 150 }}>
                      <InputLabel>Priority</InputLabel>
                      <Select
                        value={filterPriority}
                        label="Priority"
                        onChange={(e) => setFilterPriority(e.target.value)}
                      >
                        <MenuItem value="all">All Priorities</MenuItem>
                        <MenuItem value="critical">Critical</MenuItem>
                        <MenuItem value="high">High</MenuItem>
                        <MenuItem value="medium">Medium</MenuItem>
                        <MenuItem value="low">Low</MenuItem>
                      </Select>
                    </FormControl>

                    <FormControl size="small" sx={{ minWidth: 150 }}>
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
                  </Box>
                </Box>

                <Grid container spacing={3}>
                  {filteredTickets.map((ticket) => (
                    <Grid item xs={12} md={6} key={ticket.id}>
                      <motion.div whileHover={{ scale: 1.02 }}>
                        <Card>
                          <CardContent>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                              <Box>
                                <Typography variant="h6" gutterBottom>
                                  {ticket.deviceName}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  {ticket.ticketId} • {ticket.department}
                                </Typography>
                              </Box>
                              <Chip
                                icon={getPriorityIcon(ticket.priority)}
                                label={ticket.priority}
                                color={getPriorityColor(ticket.priority)}
                                size="small"
                              />
                            </Box>

                            <Typography variant="body2" paragraph>
                              <strong>Issue:</strong> {ticket.issue}
                            </Typography>

                            <Box sx={{ mb: 2 }}>
                              <Typography variant="caption" color="text.secondary">
                                Reported by {ticket.reportedBy} on {formatDate(ticket.reportDate)}
                              </Typography>
                              <Typography variant="caption" display="block" color="text.secondary">
                                Assigned to: {ticket.assignedTo}
                              </Typography>
                            </Box>

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                              <Chip
                                icon={getStatusIcon(ticket.status)}
                                label={ticket.status}
                                color={getStatusColor(ticket.status)}
                                size="small"
                              />
                              <Typography variant="body2" color="text.secondary">
                                Downtime: {ticket.downtime}
                              </Typography>
                            </Box>

                            <Box sx={{ display: 'flex', gap: 1 }}>
                              <Button
                                size="small"
                                startIcon={<ChatBubble />}
                                onClick={() => {
                                  setSelectedTicket(ticket);
                                  setCollaborationDialogOpen(true);
                                }}
                              >
                                {ticket.collaborationNotes.length} Notes
                              </Button>
                              <Button
                                size="small"
                                variant="outlined"
                                onClick={() => {
                                  handleUpdateTicketStatus(ticket.id, 'in-progress');
                                }}
                                disabled={ticket.status !== 'open'}
                              >
                                Start Work
                              </Button>
                              <Button
                                size="small"
                                variant="contained"
                                onClick={() => {
                                  handleUpdateTicketStatus(ticket.id, 'resolved');
                                }}
                                disabled={ticket.status === 'resolved'}
                              >
                                Resolve
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

            {/* Clinic Collaboration Tab */}
            {tabValue === 2 && (
              <motion.div
                key="collaboration"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                  <Typography variant="h6">
                    Shared Device Pool & Clinic Collaboration
                  </Typography>
                  <Button
                    variant="outlined"
                    startIcon={<SwapHoriz />}
                    onClick={() => setDeviceBorrowDialogOpen(true)}
                  >
                    Borrow Device
                  </Button>
                </Box>

                <Grid container spacing={3}>
                  {clinicCollaborations.map((device) => (
                    <Grid item xs={12} md={6} key={device.id}>
                      <motion.div whileHover={{ scale: 1.02 }}>
                        <Card>
                          <CardContent>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                              <Box>
                                <Typography variant="h6" gutterBottom>
                                  {device.deviceName}
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                  <Chip
                                    label={device.currentLocation}
                                    size="small"
                                    variant="outlined"
                                  />
                                  {device.sharedPool && (
                                    <Chip
                                      icon={<Share />}
                                      label="Shared Pool"
                                      color="primary"
                                      size="small"
                                    />
                                  )}
                                </Box>
                              </Box>
                              {getDeviceTypeIcon(device.deviceType)}
                            </Box>

                            <Box sx={{ mb: 3 }}>
                              <Typography variant="subtitle2" gutterBottom>
                                Availability Status
                              </Typography>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Chip
                                  icon={device.availableForBorrow ? <CheckCircle /> : <Warning />}
                                  label={device.availableForBorrow ? 'Available' : 'Unavailable'}
                                  color={device.availableForBorrow ? 'success' : 'error'}
                                  size="small"
                                />
                                {device.nextAvailable && (
                                  <Typography variant="body2" color="text.secondary">
                                    Next available: {formatDate(device.nextAvailable)}
                                  </Typography>
                                )}
                              </Box>
                            </Box>

                            <Box sx={{ mb: 3 }}>
                              <Typography variant="subtitle2" gutterBottom>
                                Recent Borrowing History
                              </Typography>
                              <List dense>
                                {device.borrowingHistory.slice(0, 2).map((record, index) => (
                                  <ListItem key={index}>
                                    <ListItemText
                                      primary={`${record.department} - ${record.purpose}`}
                                      secondary={`${formatDate(record.borrowed)} - ${
                                        record.returned ? formatDate(record.returned) : 'Not returned'
                                      }`}
                                    />
                                    {!record.returned && (
                                      <ListItemSecondaryAction>
                                        <Button
                                          size="small"
                                          onClick={() => handleReturnDevice(device.deviceId, index)}
                                        >
                                          Mark Returned
                                        </Button>
                                      </ListItemSecondaryAction>
                                    )}
                                  </ListItem>
                                ))}
                                {device.borrowingHistory.length > 2 && (
                                  <Typography variant="caption" color="text.secondary">
                                    +{device.borrowingHistory.length - 2} more records
                                  </Typography>
                                )}
                              </List>
                            </Box>

                            <Box>
                              <Typography variant="subtitle2" gutterBottom>
                                Collaboration Notes
                              </Typography>
                              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
                                {device.collaborationNotes.map((note, index) => (
                                  <Chip
                                    key={index}
                                    label={`${note.department}: ${note.note}`}
                                    size="small"
                                    variant="outlined"
                                  />
                                ))}
                              </Box>
                              <Button
                                size="small"
                                startIcon={<Comment />}
                                onClick={() => {
                                  setSelectedDevice(device);
                                  setCollaborationDialogOpen(true);
                                }}
                              >
                                Add Note
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

            {/* Uptime Analytics Tab */}
            {tabValue === 3 && (
              <motion.div
                key="analytics"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
                  Device Uptime & Reliability Analytics
                </Typography>
                
                <Grid container spacing={3}>
                  <Grid item xs={12} md={8}>
                    <Card>
                      <CardContent>
                        <Typography variant="subtitle1" gutterBottom>
                          Uptime Trend (Last 6 Months)
                        </Typography>
                        <Box sx={{ height: 300 }}>
                          {/* Uptime chart would go here */}
                          <Box sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            height: '100%',
                            border: `1px dashed ${theme.palette.divider}`,
                            borderRadius: 1
                          }}>
                            <Typography color="text.secondary">
                              Uptime Trend Chart Visualization
                            </Typography>
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <Card>
                      <CardContent>
                        <Typography variant="subtitle1" gutterBottom>
                          Top Performing Devices
                        </Typography>
                        <List>
                          {maintenanceSchedules
                            .sort((a, b) => parseFloat(b.uptime) - parseFloat(a.uptime))
                            .slice(0, 5)
                            .map((device, index) => (
                              <React.Fragment key={device.id}>
                                <ListItem>
                                  <ListItemAvatar>
                                    <Avatar sx={{ bgcolor: 'success.light' }}>
                                      {index + 1}
                                    </Avatar>
                                  </ListItemAvatar>
                                  <ListItemText
                                    primary={device.deviceName}
                                    secondary={device.department}
                                  />
                                  <ListItemSecondaryAction>
                                    <Typography variant="body2" fontWeight={500}>
                                      {device.uptime}
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
                          Maintenance Timeline
                        </Typography>
<Timeline>
  {maintenanceSchedules
    .filter(s => s.status === 'completed')
    .slice(0, 5)
    .map((maintenance, index, arr) => (
      <TimelineItem
        key={maintenance.id}
        left={formatDate(maintenance.lastMaintenance)}
        dotColor="success.main"
        icon={<Build fontSize="small" />}
        last={index === arr.length - 1}
        right={
          <>
            <Typography variant="body2" fontWeight={500}>
              {maintenance.deviceName}
            </Typography>
            <Typography variant="caption">
              {maintenance.maintenanceType} completed
            </Typography>
          </>
        }
      />
    ))}
</Timeline>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>

      {/* Alerts Panel */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Notifications />
            Maintenance Alerts
          </Typography>
          <Grid container spacing={2}>
            {alerts.slice(0, 4).map((alert) => (
              <Grid item xs={12} md={6} key={alert.id}>
                <Card variant="outlined" sx={{ 
                  borderLeft: `4px solid ${
                    alert.severity === 'critical' ? theme.palette.error.main :
                    alert.severity === 'high' ? theme.palette.warning.main :
                    theme.palette.info.main
                  }`
                }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                      <Box>
                        <Typography variant="subtitle2" gutterBottom>
                          {alert.deviceName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {alert.message}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {formatDate(alert.date)}
                        </Typography>
                      </Box>
                      <Box>
                        <Chip
                          label={alert.severity}
                          color={getPriorityColor(alert.severity)}
                          size="small"
                          sx={{ mb: 1 }}
                        />
                        {!alert.acknowledged && (
                          <Button
                            size="small"
                            onClick={() => handleAcknowledgeAlert(alert.id)}
                          >
                            Acknowledge
                          </Button>
                        )}
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      {/* Dialogs */}
      {/* Maintenance Schedule Dialog */}
      <Dialog 
        open={maintenanceDialogOpen} 
        onClose={() => {
          setMaintenanceDialogOpen(false);
          setSelectedMaintenance(null);
        }}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {selectedMaintenance ? 'Edit Maintenance Schedule' : 'Schedule New Maintenance'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Device</InputLabel>
              <Select
                value={selectedMaintenance?.deviceId || newMaintenance.deviceId}
                label="Device"
                onChange={(e) => selectedMaintenance
                  ? setSelectedMaintenance({...selectedMaintenance, deviceId: e.target.value})
                  : setNewMaintenance({...newMaintenance, deviceId: e.target.value})
                }
              >
                {maintenanceSchedules.map(device => (
                  <MenuItem key={device.deviceId} value={device.deviceId}>
                    {device.deviceName} ({device.deviceId})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Maintenance Type</InputLabel>
              <Select
                value={selectedMaintenance?.maintenanceType || newMaintenance.maintenanceType}
                label="Maintenance Type"
                onChange={(e) => selectedMaintenance
                  ? setSelectedMaintenance({...selectedMaintenance, maintenanceType: e.target.value})
                  : setNewMaintenance({...newMaintenance, maintenanceType: e.target.value})
                }
              >
                <MenuItem value="preventive">Preventive Maintenance</MenuItem>
                <MenuItem value="corrective">Corrective Maintenance</MenuItem>
                <MenuItem value="calibration">Calibration</MenuItem>
                <MenuItem value="inspection">Inspection</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Schedule Type</InputLabel>
              <Select
                value={selectedMaintenance?.scheduleType || newMaintenance.scheduleType}
                label="Schedule Type"
                onChange={(e) => selectedMaintenance
                  ? setSelectedMaintenance({...selectedMaintenance, scheduleType: e.target.value})
                  : setNewMaintenance({...newMaintenance, scheduleType: e.target.value})
                }
              >
                <MenuItem value="daily">Daily</MenuItem>
                <MenuItem value="weekly">Weekly</MenuItem>
                <MenuItem value="monthly">Monthly</MenuItem>
                <MenuItem value="quarterly">Quarterly</MenuItem>
                <MenuItem value="bi-annual">Bi-annual</MenuItem>
                <MenuItem value="annual">Annual</MenuItem>
                <MenuItem value="as-needed">As Needed</MenuItem>
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label="Due Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={selectedMaintenance?.nextDueDate || newMaintenance.dueDate}
              onChange={(e) => selectedMaintenance
                ? setSelectedMaintenance({...selectedMaintenance, nextDueDate: e.target.value})
                : setNewMaintenance({...newMaintenance, dueDate: e.target.value})
              }
              sx={{ mb: 2 }}
            />

            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Priority</InputLabel>
              <Select
                value={selectedMaintenance?.priority || newMaintenance.priority}
                label="Priority"
                onChange={(e) => selectedMaintenance
                  ? setSelectedMaintenance({...selectedMaintenance, priority: e.target.value})
                  : setNewMaintenance({...newMaintenance, priority: e.target.value})
                }
              >
                <MenuItem value="critical">Critical</MenuItem>
                <MenuItem value="high">High</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="low">Low</MenuItem>
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label="Assigned To"
              value={selectedMaintenance?.assignedTo || newMaintenance.assignedTo}
              onChange={(e) => selectedMaintenance
                ? setSelectedMaintenance({...selectedMaintenance, assignedTo: e.target.value})
                : setNewMaintenance({...newMaintenance, assignedTo: e.target.value})
              }
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="Notes"
              multiline
              rows={3}
              value={newMaintenance.notes}
              onChange={(e) => setNewMaintenance({...newMaintenance, notes: e.target.value})}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setMaintenanceDialogOpen(false);
            setSelectedMaintenance(null);
          }}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleAddMaintenance}
          >
            {selectedMaintenance ? 'Update' : 'Schedule'} Maintenance
          </Button>
        </DialogActions>
      </Dialog>

      {/* Service Ticket Dialog */}
      <Dialog 
        open={serviceTicketDialogOpen} 
        onClose={() => {
          setServiceTicketDialogOpen(false);
          setSelectedTicket(null);
        }}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {selectedTicket ? 'Edit Service Ticket' : 'Create New Service Ticket'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Device</InputLabel>
              <Select
                value={selectedTicket?.deviceId || newTicket.deviceId}
                label="Device"
                onChange={(e) => selectedTicket
                  ? setSelectedTicket({...selectedTicket, deviceId: e.target.value})
                  : setNewTicket({...newTicket, deviceId: e.target.value})
                }
              >
                {maintenanceSchedules.map(device => (
                  <MenuItem key={device.deviceId} value={device.deviceId}>
                    {device.deviceName} ({device.deviceId})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label="Issue Description"
              multiline
              rows={3}
              value={selectedTicket?.issue || newTicket.issue}
              onChange={(e) => selectedTicket
                ? setSelectedTicket({...selectedTicket, issue: e.target.value})
                : setNewTicket({...newTicket, issue: e.target.value})
              }
              sx={{ mb: 2 }}
            />

            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Priority</InputLabel>
              <Select
                value={selectedTicket?.priority || newTicket.priority}
                label="Priority"
                onChange={(e) => selectedTicket
                  ? setSelectedTicket({...selectedTicket, priority: e.target.value})
                  : setNewTicket({...newTicket, priority: e.target.value})
                }
              >
                <MenuItem value="critical">Critical</MenuItem>
                <MenuItem value="high">High</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="low">Low</MenuItem>
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label="Reported By"
              value={selectedTicket?.reportedBy || newTicket.reportedBy}
              onChange={(e) => selectedTicket
                ? setSelectedTicket({...selectedTicket, reportedBy: e.target.value})
                : setNewTicket({...newTicket, reportedBy: e.target.value})
              }
              sx={{ mb: 2 }}
            />

            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Department</InputLabel>
              <Select
                value={selectedTicket?.department || newTicket.department}
                label="Department"
                onChange={(e) => selectedTicket
                  ? setSelectedTicket({...selectedTicket, department: e.target.value})
                  : setNewTicket({...newTicket, department: e.target.value})
                }
              >
                {departments.filter(d => d.id !== 'all').map(dept => (
                  <MenuItem key={dept.id} value={dept.id}>
                    {dept.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setServiceTicketDialogOpen(false);
            setSelectedTicket(null);
          }}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleAddServiceTicket}
          >
            {selectedTicket ? 'Update' : 'Create'} Ticket
          </Button>
        </DialogActions>
      </Dialog>

      {/* Collaboration Dialog */}
      <Dialog 
        open={collaborationDialogOpen} 
        onClose={() => setCollaborationDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {selectedTicket ? `Collaboration for ${selectedTicket.ticketId}` : 
           selectedDevice ? `Collaboration for ${selectedDevice.deviceName}` : 'Collaboration'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            {selectedTicket && (
              <>
                <Typography variant="subtitle1" gutterBottom>
                  Service Ticket: {selectedTicket.issue}
                </Typography>
                <List>
                  {selectedTicket.collaborationNotes.map((note, index) => (
                    <React.Fragment key={index}>
                      <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: theme.palette.primary.light }}>
                            {note.user.charAt(0)}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={note.user}
                          secondary={
                            <>
                              <Typography component="span" variant="body2" color="text.primary">
                                {note.note}
                              </Typography>
                              <br />
                              <Typography component="span" variant="caption" color="text.secondary">
                                {note.timestamp}
                              </Typography>
                            </>
                          }
                        />
                      </ListItem>
                      <Divider />
                    </React.Fragment>
                  ))}
                </List>
                <TextField
                  fullWidth
                  label="Add Collaboration Note"
                  multiline
                  rows={2}
                  sx={{ mt: 2 }}
                />
              </>
            )}

            {selectedDevice && (
              <>
                <Typography variant="subtitle1" gutterBottom>
                  Device: {selectedDevice.deviceName} ({selectedDevice.currentLocation})
                </Typography>
                <TextField
                  fullWidth
                  label="Add Collaboration Note"
                  multiline
                  rows={2}
                  sx={{ mb: 2 }}
                />
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Department</InputLabel>
                  <Select label="Department">
                    {departments.filter(d => d.id !== 'all').map(dept => (
                      <MenuItem key={dept.id} value={dept.id}>
                        {dept.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Priority</InputLabel>
                  <Select label="Priority">
                    <MenuItem value="critical">Critical</MenuItem>
                    <MenuItem value="high">High</MenuItem>
                    <MenuItem value="medium">Medium</MenuItem>
                    <MenuItem value="low">Low</MenuItem>
                  </Select>
                </FormControl>
              </>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCollaborationDialogOpen(false)}>Cancel</Button>
          <Button variant="contained">Add Note</Button>
        </DialogActions>
      </Dialog>

      {/* Device Borrow Dialog */}
      <Dialog 
        open={deviceBorrowDialogOpen} 
        onClose={() => setDeviceBorrowDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Borrow Device from Shared Pool
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Select Device</InputLabel>
              <Select
                value={selectedDevice?.deviceId || ''}
                label="Select Device"
                onChange={(e) => {
                  const device = clinicCollaborations.find(d => d.deviceId === e.target.value);
                  setSelectedDevice(device);
                }}
              >
                {clinicCollaborations
                  .filter(d => d.sharedPool && d.availableForBorrow)
                  .map(device => (
                    <MenuItem key={device.deviceId} value={device.deviceId}>
                      {device.deviceName} - Currently in {device.currentLocation}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>

            {selectedDevice && (
              <>
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Borrowing Department</InputLabel>
                  <Select
                    label="Borrowing Department"
                    onChange={(e) => handleBorrowDevice(selectedDevice.deviceId, e.target.value)}
                  >
                    {departments
                      .filter(d => d.id !== 'all' && d.id !== selectedDevice.currentLocation)
                      .map(dept => (
                        <MenuItem key={dept.id} value={dept.id}>
                          {dept.name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>

                <TextField
                  fullWidth
                  label="Purpose"
                  multiline
                  rows={2}
                  sx={{ mb: 2 }}
                />

                <TextField
                  fullWidth
                  label="Expected Return Date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  sx={{ mb: 2 }}
                />

                <Alert severity="info">
                  Requesting {selectedDevice.deviceName} from {selectedDevice.currentLocation}
                </Alert>
              </>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeviceBorrowDialogOpen(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MaintenanceClinicCollaboration;