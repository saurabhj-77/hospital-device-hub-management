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
  Grid,
  Autocomplete
} from '@mui/material';
import {
  Devices as DevicesIcon,
  Store as StoreIcon,
  ShoppingCart as ShoppingCartIcon,
  LocalShipping as ShippingIcon,
  History as HistoryIcon,
  Assignment as AssignmentIcon,
  Bluetooth as BluetoothIcon,
  BluetoothDisabled as BluetoothDisabledIcon,
  Wifi as WifiIcon,
  SignalCellularAlt as SignalIcon,
  BatteryFull as BatteryIcon,
  Person as PersonIcon,
  LocalHospital as HospitalIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
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
  QrCode as QrCodeIcon,
  Print as PrintIcon,
  Share as ShareIcon,
  Sync as SyncIcon,
  CalendarToday as CalendarIcon,
  LocationOn as LocationIcon,
  Category as CategoryIcon,
  Security as SecurityIcon,
  Timeline as TimelineIcon,
  Build as BuildIcon,
  LocalOffer as LocalOfferIcon,
  AttachMoney as MoneyIcon,
  Close as CloseIcon,
  Save as SaveIcon,
  Clear as ClearIcon
} from '@mui/icons-material';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

// Color palette for Device Inventory
const INVENTORY_COLORS = {
  primary: { bg: '#F0F7FF', border: '#0066CC', text: '#003366' },
  success: { bg: '#F0FFF4', border: '#38A169', text: '#22543D' },
  warning: { bg: '#FFFBEB', border: '#D69E2E', text: '#744210' },
  danger: { bg: '#FFF5F5', border: '#E53E3E', text: '#742A2A' },
  info: { bg: '#EBF8FF', border: '#3182CE', text: '#234E52' },
  purple: { bg: '#FAF5FF', border: '#805AD5', text: '#44337A' },
  teal: { bg: '#E6FFFA', border: '#319795', text: '#234E52' },
  gray: { bg: '#F7FAFC', border: '#718096', text: '#2D3748' },
  owned: { bg: '#F0FFF4', border: '#38A169', text: '#22543D' },
  borrowed: { bg: '#FEF3C7', border: '#D97706', text: '#92400E' },
  leased: { bg: '#E0E7FF', border: '#4F46E5', text: '#3730A3' },
  marketplace: { bg: '#FCE7F3', border: '#DB2777', text: '#9D174D' }
};

// Device Categories
const DEVICE_CATEGORIES = {
  OWNED: 'owned',
  BORROWED: 'borrowed',
  LEASED: 'leased',
  MARKETPLACE: 'marketplace'
};

// Device Status Types
const DEVICE_STATUS = {
  AVAILABLE: 'available',
  IN_USE: 'in_use',
  MAINTENANCE: 'maintenance',
  CALIBRATION: 'calibration',
  RETIRED: 'retired',
  QUARANTINED: 'quarantined'
};

// Default data structure
const defaultInventoryData = {
  summary: {
    totalDevices: 342,
    ownedDevices: 189,
    borrowedDevices: 67,
    leasedDevices: 45,
    marketplaceDevices: 41,
    activeDevices: 289,
    maintenanceDevices: 28,
    retiredDevices: 25
  },
  
  devices: [
    {
      id: 'DEV-001',
      name: 'Cardiac Monitor Pro',
      model: 'CMP-2024',
      category: DEVICE_CATEGORIES.OWNED,
      status: DEVICE_STATUS.IN_USE,
      fdaStatus: '510(k) Cleared',
      fdaClearanceDate: '2024-01-15',
      bluetoothStatus: 'connected',
      signalStrength: 92,
      batteryLevel: 87,
      assignedTo: 'John D. (Room 304)',
      assignedClinic: 'Cardiology Wing',
      purchaseDate: '2024-01-20',
      warrantyUntil: '2025-01-20',
      lastMaintenance: '2024-03-15',
      nextMaintenance: '2024-06-15',
      usageHours: 1248,
      location: 'Room 304, Cardiology',
      value: '$12,500',
      serialNumber: 'SN-CMP-2024-001',
      manufacturer: 'MedTech Inc.',
      notes: 'Regular calibration required'
    },
    {
      id: 'DEV-002',
      name: 'Glucose Monitor CGM',
      model: 'GMC-2024',
      category: DEVICE_CATEGORIES.OWNED,
      status: DEVICE_STATUS.IN_USE,
      fdaStatus: 'PMA Approved',
      fdaClearanceDate: '2023-11-20',
      bluetoothStatus: 'connected',
      signalStrength: 88,
      batteryLevel: 42,
      assignedTo: 'Sarah M. (Room 215)',
      assignedClinic: 'Endocrinology',
      purchaseDate: '2023-12-05',
      warrantyUntil: '2024-12-05',
      lastMaintenance: '2024-04-10',
      nextMaintenance: '2024-07-10',
      usageHours: 892,
      location: 'Room 215, Endo Wing',
      value: '$8,750',
      serialNumber: 'SN-GMC-2024-002',
      manufacturer: 'DiabetesCare Corp',
      notes: 'Replace battery soon'
    },
    {
      id: 'DEV-003',
      name: 'BP Monitor Sync',
      model: 'BPS-2024',
      category: DEVICE_CATEGORIES.BORROWED,
      status: DEVICE_STATUS.AVAILABLE,
      fdaStatus: '510(k) Cleared',
      fdaClearanceDate: '2024-02-10',
      bluetoothStatus: 'disconnected',
      signalStrength: 0,
      batteryLevel: 91,
      assignedTo: 'Not Assigned',
      assignedClinic: 'General Ward',
      purchaseDate: '2024-02-20',
      warrantyUntil: '2025-02-20',
      lastMaintenance: '2024-05-05',
      nextMaintenance: '2024-08-05',
      usageHours: 456,
      location: 'Storage Room A',
      value: '$3,200',
      serialNumber: 'SN-BPS-2024-003',
      manufacturer: 'HealthMetrics Inc.',
      notes: 'Available for patient assignment'
    },
    {
      id: 'DEV-004',
      name: 'Respiratory Monitor',
      model: 'RM-2024',
      category: DEVICE_CATEGORIES.LEASED,
      status: DEVICE_STATUS.IN_USE,
      fdaStatus: '510(k) Cleared',
      fdaClearanceDate: '2024-01-30',
      bluetoothStatus: 'connected',
      signalStrength: 90,
      batteryLevel: 76,
      assignedTo: 'Maria L. (Room 418)',
      assignedClinic: 'ICU Main',
      purchaseDate: '2024-02-15',
      warrantyUntil: '2025-02-15',
      lastMaintenance: '2024-04-20',
      nextMaintenance: '2024-07-20',
      usageHours: 678,
      location: 'ICU Room 418',
      value: '$15,800',
      serialNumber: 'SN-RM-2024-004',
      manufacturer: 'RespiraTech',
      leaseEndDate: '2024-12-31',
      monthlyLease: '$1,200',
      notes: 'Leased from RespiraTech'
    },
    {
      id: 'DEV-005',
      name: 'Portable Ultrasound',
      model: 'PUS-2024',
      category: DEVICE_CATEGORIES.MARKETPLACE,
      status: DEVICE_STATUS.AVAILABLE,
      fdaStatus: '510(k) Cleared',
      fdaClearanceDate: '2024-03-15',
      bluetoothStatus: 'connected',
      signalStrength: 95,
      batteryLevel: 95,
      assignedTo: 'Not Assigned',
      assignedClinic: 'Marketplace',
      purchaseDate: '2024-03-20',
      warrantyUntil: '2025-03-20',
      lastMaintenance: '2024-06-01',
      nextMaintenance: '2024-09-01',
      usageHours: 120,
      location: 'Marketplace Hub',
      value: '$24,500',
      serialNumber: 'SN-PUS-2024-005',
      manufacturer: 'UltraScan Inc.',
      marketplacePrice: '$28,500',
      notes: 'Available for purchase on marketplace'
    },
    {
      id: 'DEV-006',
      name: 'Temperature Monitor',
      model: 'TM-2024',
      category: DEVICE_CATEGORIES.OWNED,
      status: DEVICE_STATUS.MAINTENANCE,
      fdaStatus: 'Exempt',
      fdaClearanceDate: '2023-12-15',
      bluetoothStatus: 'disconnected',
      signalStrength: 0,
      batteryLevel: 15,
      assignedTo: 'David W. (Room 305)',
      assignedClinic: 'General Ward',
      purchaseDate: '2023-12-20',
      warrantyUntil: '2024-12-20',
      lastMaintenance: '2024-06-10',
      nextMaintenance: '2024-09-10',
      usageHours: 945,
      location: 'Maintenance Room',
      value: '$1,850',
      serialNumber: 'SN-TM-2024-006',
      manufacturer: 'TempGuard Corp',
      notes: 'Under maintenance - battery replacement'
    },
    {
      id: 'DEV-007',
      name: 'ECG Monitor Pro',
      model: 'ECG-2024',
      category: DEVICE_CATEGORIES.BORROWED,
      status: DEVICE_STATUS.IN_USE,
      fdaStatus: '510(k) Cleared',
      fdaClearanceDate: '2024-01-10',
      bluetoothStatus: 'connected',
      signalStrength: 94,
      batteryLevel: 78,
      assignedTo: 'Robert K. (Room 112)',
      assignedClinic: 'Cardiology Wing',
      purchaseDate: '2024-01-25',
      warrantyUntil: '2025-01-25',
      lastMaintenance: '2024-04-15',
      nextMaintenance: '2024-07-15',
      usageHours: 567,
      location: 'Room 112, Cardiology',
      value: '$9,800',
      serialNumber: 'SN-ECG-2024-007',
      manufacturer: 'CardioTech',
      borrowedFrom: 'Central Hospital',
      returnDate: '2024-08-31',
      notes: 'Borrowed for cardiac study'
    },
    {
      id: 'DEV-008',
      name: 'Infusion Pump',
      model: 'IP-2024',
      category: DEVICE_CATEGORIES.LEASED,
      status: DEVICE_STATUS.CALIBRATION,
      fdaStatus: 'PMA Approved',
      fdaClearanceDate: '2023-10-30',
      bluetoothStatus: 'disconnected',
      signalStrength: 0,
      batteryLevel: 65,
      assignedTo: 'Not Assigned',
      assignedClinic: 'ICU Main',
      purchaseDate: '2023-11-15',
      warrantyUntil: '2024-11-15',
      lastMaintenance: '2024-05-20',
      nextMaintenance: '2024-08-20',
      usageHours: 1234,
      location: 'Calibration Lab',
      value: '$7,500',
      serialNumber: 'SN-IP-2024-008',
      manufacturer: 'InfuTech',
      leaseEndDate: '2024-10-31',
      monthlyLease: '$850',
      notes: 'Calibration in progress'
    }
  ],
  
  statistics: {
    categoryDistribution: [
      { name: 'Owned', value: 189, color: INVENTORY_COLORS.owned.border },
      { name: 'Borrowed', value: 67, color: INVENTORY_COLORS.borrowed.border },
      { name: 'Leased', value: 45, color: INVENTORY_COLORS.leased.border },
      { name: 'Marketplace', value: 41, color: INVENTORY_COLORS.marketplace.border }
    ],
    statusDistribution: [
      { name: 'In Use', value: 289, color: INVENTORY_COLORS.success.border },
      { name: 'Available', value: 25, color: INVENTORY_COLORS.info.border },
      { name: 'Maintenance', value: 28, color: INVENTORY_COLORS.warning.border },
      { name: 'Calibration', value: 12, color: INVENTORY_COLORS.purple.border },
      { name: 'Retired', value: 25, color: INVENTORY_COLORS.gray.border }
    ]
  },
  
  recentActivities: [
    { id: 1, action: 'Device checked out', device: 'Cardiac Monitor #DEV-001', user: 'Dr. Smith', time: '2 hours ago' },
    { id: 2, action: 'Maintenance completed', device: 'Temperature Monitor #DEV-006', user: 'Tech Mike', time: '1 day ago' },
    { id: 3, action: 'Device added to marketplace', device: 'Portable Ultrasound #DEV-005', user: 'Admin Sarah', time: '2 days ago' },
    { id: 4, action: 'Lease renewed', device: 'Respiratory Monitor #DEV-004', user: 'Finance Dept', time: '3 days ago' },
    { id: 5, action: 'Device calibration', device: 'Infusion Pump #DEV-008', user: 'Calibration Team', time: '4 days ago' }
  ]
};

// Device Inventory Component
const DeviceInventory = () => {
  const theme = useTheme();
  const [inventoryData, setInventoryData] = useState(defaultInventoryData);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedDevices, setSelectedDevices] = useState([]);
  const [deviceDialogOpen, setDeviceDialogOpen] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [addDeviceDialogOpen, setAddDeviceDialogOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('id');
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  
  // Add Device Form State
  const [newDevice, setNewDevice] = useState({
    name: '',
    model: '',
    category: DEVICE_CATEGORIES.OWNED,
    status: DEVICE_STATUS.AVAILABLE,
    fdaStatus: '510(k) Cleared',
    fdaClearanceDate: new Date().toISOString().split('T')[0],
    bluetoothStatus: 'disconnected',
    signalStrength: 0,
    batteryLevel: 100,
    assignedTo: 'Not Assigned',
    assignedClinic: 'General Ward',
    purchaseDate: new Date().toISOString().split('T')[0],
    warrantyUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
    lastMaintenance: new Date().toISOString().split('T')[0],
    nextMaintenance: new Date(new Date().setMonth(new Date().getMonth() + 3)).toISOString().split('T')[0],
    usageHours: 0,
    location: 'Storage Room A',
    value: '$0',
    serialNumber: '',
    manufacturer: '',
    notes: ''
  });

  useEffect(() => {
    const loadInventoryData = () => {
      const savedData = localStorage.getItem('deviceHub_inventory');
      if (savedData) {
        try {
          const parsedData = JSON.parse(savedData);
          setInventoryData({
            ...defaultInventoryData,
            ...parsedData
          });
        } catch (error) {
          console.error('Error parsing inventory data:', error);
          setInventoryData(defaultInventoryData);
        }
      }
      setLoading(false);
    };

    loadInventoryData();
  }, []);

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      const updatedData = {
        ...inventoryData,
        summary: {
          ...inventoryData.summary,
          totalDevices: inventoryData.summary.totalDevices + Math.floor(Math.random() * 5)
        }
      };
      
      setInventoryData(updatedData);
      localStorage.setItem('deviceHub_inventory', JSON.stringify(updatedData));
      setLoading(false);
      
      setSnackbar({
        open: true,
        message: 'Inventory data refreshed successfully!',
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

  // Add Device Dialog Functions
  const handleOpenAddDeviceDialog = () => {
    // Generate a new device ID
    const nextIdNumber = inventoryData.devices.length + 1;
    const newDeviceId = `DEV-${String(nextIdNumber).padStart(3, '0')}`;
    
    setNewDevice({
      ...newDevice,
      id: newDeviceId,
      serialNumber: `SN-${newDeviceId}`
    });
    setAddDeviceDialogOpen(true);
  };

  const handleCloseAddDeviceDialog = () => {
    setAddDeviceDialogOpen(false);
    // Reset form
    setNewDevice({
      name: '',
      model: '',
      category: DEVICE_CATEGORIES.OWNED,
      status: DEVICE_STATUS.AVAILABLE,
      fdaStatus: '510(k) Cleared',
      fdaClearanceDate: new Date().toISOString().split('T')[0],
      bluetoothStatus: 'disconnected',
      signalStrength: 0,
      batteryLevel: 100,
      assignedTo: 'Not Assigned',
      assignedClinic: 'General Ward',
      purchaseDate: new Date().toISOString().split('T')[0],
      warrantyUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
      lastMaintenance: new Date().toISOString().split('T')[0],
      nextMaintenance: new Date(new Date().setMonth(new Date().getMonth() + 3)).toISOString().split('T')[0],
      usageHours: 0,
      location: 'Storage Room A',
      value: '$0',
      serialNumber: '',
      manufacturer: '',
      notes: ''
    });
  };

  const handleAddDeviceFormChange = (field, value) => {
    setNewDevice(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmitAddDevice = () => {
    // Validate required fields
    if (!newDevice.name.trim() || !newDevice.model.trim() || !newDevice.serialNumber.trim()) {
      setSnackbar({
        open: true,
        message: 'Please fill in all required fields (Name, Model, Serial Number)',
        severity: 'error'
      });
      return;
    }

    // Format the value field
    const formattedValue = newDevice.value.startsWith('$') ? newDevice.value : `$${newDevice.value}`;

    // Create the complete device object
    const deviceToAdd = {
      ...newDevice,
      id: `DEV-${String(inventoryData.devices.length + 1).padStart(3, '0')}`,
      value: formattedValue,
      // Add category-specific fields if needed
      ...(newDevice.category === DEVICE_CATEGORIES.LEASED && {
        leaseEndDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
        monthlyLease: '$500'
      }),
      ...(newDevice.category === DEVICE_CATEGORIES.BORROWED && {
        borrowedFrom: 'Central Hospital',
        returnDate: new Date(new Date().setMonth(new Date().getMonth() + 6)).toISOString().split('T')[0]
      }),
      ...(newDevice.category === DEVICE_CATEGORIES.MARKETPLACE && {
        marketplacePrice: `$${parseInt(formattedValue.replace('$', '')) * 1.2}`
      })
    };

    // Update inventory data
    const updatedData = {
      ...inventoryData,
      devices: [deviceToAdd, ...inventoryData.devices],
      summary: {
        ...inventoryData.summary,
        totalDevices: inventoryData.summary.totalDevices + 1,
        ownedDevices: newDevice.category === DEVICE_CATEGORIES.OWNED ? inventoryData.summary.ownedDevices + 1 : inventoryData.summary.ownedDevices,
        borrowedDevices: newDevice.category === DEVICE_CATEGORIES.BORROWED ? inventoryData.summary.borrowedDevices + 1 : inventoryData.summary.borrowedDevices,
        leasedDevices: newDevice.category === DEVICE_CATEGORIES.LEASED ? inventoryData.summary.leasedDevices + 1 : inventoryData.summary.leasedDevices,
        marketplaceDevices: newDevice.category === DEVICE_CATEGORIES.MARKETPLACE ? inventoryData.summary.marketplaceDevices + 1 : inventoryData.summary.marketplaceDevices,
        activeDevices: newDevice.status === DEVICE_STATUS.IN_USE ? inventoryData.summary.activeDevices + 1 : inventoryData.summary.activeDevices,
        maintenanceDevices: newDevice.status === DEVICE_STATUS.MAINTENANCE ? inventoryData.summary.maintenanceDevices + 1 : inventoryData.summary.maintenanceDevices
      },
      recentActivities: [
        {
          id: inventoryData.recentActivities.length + 1,
          action: 'New device added to inventory',
          device: `${deviceToAdd.name} #${deviceToAdd.id}`,
          user: 'System Admin',
          time: 'Just now'
        },
        ...inventoryData.recentActivities
      ]
    };

    // Update statistics
    updatedData.statistics.categoryDistribution = updatedData.statistics.categoryDistribution.map(item => {
      if (item.name.toLowerCase() === newDevice.category) {
        return { ...item, value: item.value + 1 };
      }
      return item;
    });

    updatedData.statistics.statusDistribution = updatedData.statistics.statusDistribution.map(item => {
      const statusMap = {
        'In Use': DEVICE_STATUS.IN_USE,
        'Available': DEVICE_STATUS.AVAILABLE,
        'Maintenance': DEVICE_STATUS.MAINTENANCE,
        'Calibration': DEVICE_STATUS.CALIBRATION,
        'Retired': DEVICE_STATUS.RETIRED
      };
      
      if (statusMap[item.name] === newDevice.status) {
        return { ...item, value: item.value + 1 };
      }
      return item;
    });

    setInventoryData(updatedData);
    localStorage.setItem('deviceHub_inventory', JSON.stringify(updatedData));
    
    // Close dialog and show success message
    handleCloseAddDeviceDialog();
    
    setSnackbar({
      open: true,
      message: `Device "${deviceToAdd.name}" added successfully!`,
      severity: 'success'
    });
    
    // Reset to All Devices tab to show the new device
    setActiveTab(0);
  };

  const handleDeleteSelected = () => {
    if (selectedDevices.length === 0) return;

    const updatedData = {
      ...inventoryData,
      devices: inventoryData.devices.filter(device => !selectedDevices.includes(device.id)),
      summary: {
        ...inventoryData.summary,
        totalDevices: inventoryData.summary.totalDevices - selectedDevices.length
      }
    };

    setInventoryData(updatedData);
    localStorage.setItem('deviceHub_inventory', JSON.stringify(updatedData));
    setSelectedDevices([]);
    
    setSnackbar({
      open: true,
      message: `${selectedDevices.length} device(s) deleted successfully!`,
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
      case DEVICE_CATEGORIES.OWNED:
        return INVENTORY_COLORS.owned;
      case DEVICE_CATEGORIES.BORROWED:
        return INVENTORY_COLORS.borrowed;
      case DEVICE_CATEGORIES.LEASED:
        return INVENTORY_COLORS.leased;
      case DEVICE_CATEGORIES.MARKETPLACE:
        return INVENTORY_COLORS.marketplace;
      default:
        return INVENTORY_COLORS.gray;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case DEVICE_STATUS.IN_USE:
        return INVENTORY_COLORS.success;
      case DEVICE_STATUS.AVAILABLE:
        return INVENTORY_COLORS.info;
      case DEVICE_STATUS.MAINTENANCE:
        return INVENTORY_COLORS.warning;
      case DEVICE_STATUS.CALIBRATION:
        return INVENTORY_COLORS.purple;
      case DEVICE_STATUS.RETIRED:
        return INVENTORY_COLORS.gray;
      case DEVICE_STATUS.QUARANTINED:
        return INVENTORY_COLORS.danger;
      default:
        return INVENTORY_COLORS.gray;
    }
  };

  const getBluetoothIcon = (status) => {
    switch (status) {
      case 'connected':
        return <BluetoothIcon sx={{ color: INVENTORY_COLORS.success.border }} />;
      case 'disconnected':
        return <BluetoothDisabledIcon sx={{ color: INVENTORY_COLORS.danger.border }} />;
      default:
        return <BluetoothIcon sx={{ color: INVENTORY_COLORS.gray.border }} />;
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

  // Filter and sort devices
  const filteredDevices = inventoryData.devices.filter(device => {
    const matchesSearch = searchQuery === '' || 
      device.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      device.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      device.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      device.serialNumber.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'all' || device.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || device.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const sortedDevices = filteredDevices.sort((a, b) => {
    if (orderBy === 'id' || orderBy === 'name' || orderBy === 'model') {
      return order === 'asc' 
        ? a[orderBy].localeCompare(b[orderBy])
        : b[orderBy].localeCompare(a[orderBy]);
    }
    if (orderBy === 'usageHours' || orderBy === 'batteryLevel') {
      return order === 'asc' 
        ? a[orderBy] - b[orderBy]
        : b[orderBy] - a[orderBy];
    }
    return 0;
  });

  const paginatedDevices = sortedDevices.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  // Tab content renderer
  const renderTabContent = () => {
    switch (activeTab) {
      case 0: // All Devices
        return (
          <Box>
            <Card sx={{ 
              borderRadius: 3, 
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
              backgroundColor: INVENTORY_COLORS.gray.bg,
              border: `2px solid ${INVENTORY_COLORS.gray.border}`,
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
                            Device Name
                          </TableSortLabel>
                        </TableCell>
                        <TableCell>Category</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>FDA Status</TableCell>
                        <TableCell>Bluetooth</TableCell>
                        <TableCell>Assigned To</TableCell>
                        <TableCell align="right">Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {paginatedDevices.map((device) => {
                        const categoryColor = getCategoryColor(device.category);
                        const statusColor = getStatusColor(device.status);
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
                              <Typography variant="body2" fontWeight="bold" sx={{ color: categoryColor.text }}>
                                {device.id}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Avatar sx={{ 
                                  width: 32, 
                                  height: 32, 
                                  bgcolor: alpha(categoryColor.border, 0.1),
                                  color: categoryColor.border
                                }}>
                                  <DevicesIcon fontSize="small" />
                                </Avatar>
                                <Box>
                                  <Typography variant="body2" fontWeight="medium">
                                    {device.name}
                                  </Typography>
                                  <Typography variant="caption" sx={{ color: INVENTORY_COLORS.gray.text }}>
                                    {device.model}
                                  </Typography>
                                </Box>
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Chip
                                label={device.category.charAt(0).toUpperCase() + device.category.slice(1)}
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
                                icon={<SecurityIcon />}
                                label={device.fdaStatus}
                                size="small"
                                variant="outlined"
                                sx={{ 
                                  borderColor: INVENTORY_COLORS.success.border,
                                  color: INVENTORY_COLORS.success.text
                                }}
                              />
                            </TableCell>
                            <TableCell>
                              <Tooltip title={`Bluetooth: ${device.bluetoothStatus}`}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                  {getBluetoothIcon(device.bluetoothStatus)}
                                  {device.bluetoothStatus === 'connected' && (
                                    <Typography variant="caption" sx={{ color: INVENTORY_COLORS.gray.text }}>
                                      {device.signalStrength}%
                                    </Typography>
                                  )}
                                </Box>
                              </Tooltip>
                            </TableCell>
                            <TableCell>
                              <Box>
                                <Typography variant="body2">
                                  {device.assignedTo}
                                </Typography>
                                <Typography variant="caption" sx={{ color: INVENTORY_COLORS.gray.text }}>
                                  {device.assignedClinic}
                                </Typography>
                              </Box>
                            </TableCell>
                            <TableCell align="right">
                              <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                                <Tooltip title="View Details">
                                  <IconButton 
                                    size="small"
                                    onClick={() => handleViewDevice(device)}
                                  >
                                    <VisibilityIcon fontSize="small" />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="Edit">
                                  <IconButton size="small">
                                    <EditIcon fontSize="small" />
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
                backgroundColor: INVENTORY_COLORS.warning.bg,
                border: `2px solid ${INVENTORY_COLORS.warning.border}`
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography variant="body2" sx={{ color: INVENTORY_COLORS.warning.text }}>
                    {selectedDevices.length} device(s) selected
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<AssignmentIcon />}
                      sx={{ borderColor: INVENTORY_COLORS.warning.border, color: INVENTORY_COLORS.warning.text }}
                    >
                      Assign
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<SyncIcon />}
                      sx={{ borderColor: INVENTORY_COLORS.info.border, color: INVENTORY_COLORS.info.text }}
                    >
                      Transfer
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      startIcon={<DeleteIcon />}
                      onClick={handleDeleteSelected}
                      sx={{ bgcolor: INVENTORY_COLORS.danger.border }}
                    >
                      Delete
                    </Button>
                  </Box>
                </Box>
              </Card>
            )}
          </Box>
        );

      case 1: // Owned Devices
        return renderCategoryView(DEVICE_CATEGORIES.OWNED);
      case 2: // Borrowed Devices
        return renderCategoryView(DEVICE_CATEGORIES.BORROWED);
      case 3: // Leased Devices
        return renderCategoryView(DEVICE_CATEGORIES.LEASED);
      case 4: // Marketplace Devices
        return renderCategoryView(DEVICE_CATEGORIES.MARKETPLACE);
      default:
        return null;
    }
  };

  const renderCategoryView = (category) => {
    const categoryDevices = inventoryData.devices.filter(device => device.category === category);
    const categoryColor = getCategoryColor(category);
    const categoryName = category.charAt(0).toUpperCase() + category.slice(1);

    return (
      <Box>
        <Card sx={{ 
          borderRadius: 3, 
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          backgroundColor: categoryColor.bg,
          border: `2px solid ${categoryColor.border}`,
          mb: 3
        }}>
          <CardHeader
            title={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                {getCategoryIcon(category)}
                <Typography variant="h6" sx={{ color: categoryColor.text }}>
                  {categoryName} Devices
                </Typography>
                <Chip label={`${categoryDevices.length} devices`} size="small" />
              </Box>
            }
            subheader={
              <Typography variant="body2" sx={{ color: categoryColor.text }}>
                {getCategoryDescription(category)}
              </Typography>
            }
          />
          <CardContent>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
              {categoryDevices.map((device, index) => {
                const statusColor = getStatusColor(device.status);
                
                return (
                  <Grow in={true} timeout={500 + index * 100} key={device.id}>
                    <Card sx={{ 
                      flex: '1 1 300px', 
                      borderRadius: 3,
                      backgroundColor: 'white',
                      border: `2px solid ${categoryColor.border}`
                    }}>
                      <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                          <Box>
                            <Typography variant="subtitle1" fontWeight="bold" sx={{ color: categoryColor.text }}>
                              {device.name}
                            </Typography>
                            <Typography variant="caption" sx={{ color: categoryColor.text }}>
                              {device.id} • {device.model}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', gap: 1 }}>
                            <Chip
                              label={device.status.replace('_', ' ').toUpperCase()}
                              size="small"
                              sx={{ 
                                bgcolor: statusColor.bg,
                                color: statusColor.text
                              }}
                            />
                          </Box>
                        </Box>
                        
                        <Divider sx={{ my: 2 }} />
                        
                        <Box sx={{ mb: 2 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                            <Box>
                              <Typography variant="caption" sx={{ color: INVENTORY_COLORS.gray.text, display: 'block' }}>
                                FDA Status
                              </Typography>
                              <Chip
                                label={device.fdaStatus}
                                size="small"
                                sx={{ 
                                  bgcolor: INVENTORY_COLORS.success.bg,
                                  color: INVENTORY_COLORS.success.text,
                                  mt: 0.5
                                }}
                              />
                            </Box>
                            <Box>
                              <Typography variant="caption" sx={{ color: INVENTORY_COLORS.gray.text, display: 'block' }}>
                                Bluetooth
                              </Typography>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
                                {getBluetoothIcon(device.bluetoothStatus)}
                                <Typography variant="caption" sx={{ color: INVENTORY_COLORS.gray.text }}>
                                  {device.bluetoothStatus}
                                </Typography>
                              </Box>
                            </Box>
                            <Box>
                              <Typography variant="caption" sx={{ color: INVENTORY_COLORS.gray.text, display: 'block' }}>
                                Battery
                              </Typography>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
                                <BatteryIcon fontSize="small" sx={{ 
                                  color: device.batteryLevel > 50 ? INVENTORY_COLORS.success.border : 
                                         device.batteryLevel > 20 ? INVENTORY_COLORS.warning.border : 
                                         INVENTORY_COLORS.danger.border 
                                }} />
                                <Typography variant="caption" sx={{ color: INVENTORY_COLORS.gray.text }}>
                                  {device.batteryLevel}%
                                </Typography>
                              </Box>
                            </Box>
                          </Box>
                          
                          <Box sx={{ mb: 2 }}>
                            <Typography variant="caption" sx={{ color: INVENTORY_COLORS.gray.text, display: 'block', mb: 0.5 }}>
                              Assigned To
                            </Typography>
                            <Typography variant="body2" sx={{ color: categoryColor.text }}>
                              {device.assignedTo}
                            </Typography>
                            <Typography variant="caption" sx={{ color: INVENTORY_COLORS.gray.text }}>
                              {device.assignedClinic}
                            </Typography>
                          </Box>
                          
                          <Box>
                            <Typography variant="caption" sx={{ color: INVENTORY_COLORS.gray.text, display: 'block', mb: 0.5 }}>
                              Location
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                              <LocationIcon fontSize="small" sx={{ color: categoryColor.border }} />
                              <Typography variant="body2" sx={{ color: categoryColor.text }}>
                                {device.location}
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                        
                        <Divider sx={{ my: 2 }} />
                        
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="caption" sx={{ color: INVENTORY_COLORS.gray.text }}>
                            Value: {device.value}
                          </Typography>
                          <Button
                            variant="outlined"
                            size="small"
                            startIcon={<VisibilityIcon />}
                            onClick={() => handleViewDevice(device)}
                            sx={{ 
                              borderColor: categoryColor.border,
                              color: categoryColor.border
                            }}
                          >
                            View Details
                          </Button>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grow>
                );
              })}
            </Box>
          </CardContent>
        </Card>
      </Box>
    );
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case DEVICE_CATEGORIES.OWNED:
        return <StoreIcon sx={{ color: INVENTORY_COLORS.owned.border }} />;
      case DEVICE_CATEGORIES.BORROWED:
        return <ShippingIcon sx={{ color: INVENTORY_COLORS.borrowed.border }} />;
      case DEVICE_CATEGORIES.LEASED:
        return <AssignmentIcon sx={{ color: INVENTORY_COLORS.leased.border }} />;
      case DEVICE_CATEGORIES.MARKETPLACE:
        return <ShoppingCartIcon sx={{ color: INVENTORY_COLORS.marketplace.border }} />;
      default:
        return <DevicesIcon />;
    }
  };

  const getCategoryDescription = (category) => {
    switch (category) {
      case DEVICE_CATEGORIES.OWNED:
        return 'Devices owned by the hospital, available for internal use';
      case DEVICE_CATEGORIES.BORROWED:
        return 'Devices borrowed from other institutions or partners';
      case DEVICE_CATEGORIES.LEASED:
        return 'Devices leased from manufacturers or third parties';
      case DEVICE_CATEGORIES.MARKETPLACE:
        return 'Devices listed on marketplace for purchase or sharing';
      default:
        return '';
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
          <Typography variant="h5" gutterBottom sx={{ color: INVENTORY_COLORS.primary.text }}>
            Loading Device Inventory
          </Typography>
          <LinearProgress sx={{ height: 8, borderRadius: 4, bgcolor: INVENTORY_COLORS.primary.bg }} />
          <Typography variant="body2" sx={{ mt: 2, color: INVENTORY_COLORS.gray.text }}>
            Loading medical device registry...
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
            backgroundColor: INVENTORY_COLORS.primary.bg,
            border: `2px solid ${INVENTORY_COLORS.primary.border}`,
            position: 'relative',
            overflow: 'hidden'
          }}>
            <Box sx={{ 
              position: 'absolute', 
              top: 0, 
              right: 0,
              width: 300,
              height: 300,
              background: `radial-gradient(circle, ${alpha(INVENTORY_COLORS.primary.border, 0.1)} 0%, transparent 70%)`,
              transform: 'translate(30%, -30%)'
            }} />
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                  <Avatar sx={{ 
                    bgcolor: alpha(INVENTORY_COLORS.primary.border, 0.1), 
                    color: INVENTORY_COLORS.primary.border,
                    width: 56,
                    height: 56
                  }}>
                    <DevicesIcon fontSize="large" />
                  </Avatar>
                  <Box>
                    <Typography variant="h3" fontWeight="bold" sx={{ color: INVENTORY_COLORS.primary.text }}>
                      Device Inventory
                    </Typography>
                    <Typography variant="body1" sx={{ color: INVENTORY_COLORS.primary.text }}>
                      Comprehensive registry of all medical devices in the hub
                    </Typography>
                  </Box>
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 1 }}>
                <Chip
                  icon={<CheckCircleIcon />}
                  label="INVENTORY ACTIVE"
                  sx={{
                    bgcolor: INVENTORY_COLORS.success.border,
                    color: 'white',
                    fontWeight: 'bold'
                  }}
                  size="small"
                />
                <Typography variant="caption" sx={{ color: INVENTORY_COLORS.primary.text }}>
                  {inventoryData.summary.totalDevices} total devices registered
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    variant="outlined"
                    startIcon={<QrCodeIcon />}
                    sx={{ 
                      borderRadius: 2,
                      borderColor: INVENTORY_COLORS.primary.border,
                      color: INVENTORY_COLORS.primary.border
                    }}
                  >
                    Scan QR
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<RefreshIcon />}
                    onClick={handleRefresh}
                    sx={{ 
                      borderRadius: 2,
                      bgcolor: INVENTORY_COLORS.primary.border,
                      '&:hover': {
                        bgcolor: alpha(INVENTORY_COLORS.primary.border, 0.9)
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

        {/* Summary Cards */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 4 }}>
          {[
            { 
              title: 'Total Devices', 
              value: inventoryData.summary.totalDevices, 
              icon: <DevicesIcon />, 
              color: INVENTORY_COLORS.primary,
              trend: '+3',
              description: 'All categories'
            },
            { 
              title: 'Owned Devices', 
              value: inventoryData.summary.ownedDevices, 
              icon: <StoreIcon />, 
              color: INVENTORY_COLORS.owned,
              trend: '+1',
              description: 'Hospital-owned'
            },
            { 
              title: 'Borrowed Devices', 
              value: inventoryData.summary.borrowedDevices, 
              icon: <ShippingIcon />, 
              color: INVENTORY_COLORS.borrowed,
              trend: '+2',
              description: 'On loan'
            },
            { 
              title: 'Leased Devices', 
              value: inventoryData.summary.leasedDevices, 
              icon: <AssignmentIcon />, 
              color: INVENTORY_COLORS.leased,
              trend: '0',
              description: 'Monthly lease'
            },
            { 
              title: 'Marketplace', 
              value: inventoryData.summary.marketplaceDevices, 
              icon: <ShoppingCartIcon />, 
              color: INVENTORY_COLORS.marketplace,
              trend: '+1',
              description: 'Available for purchase'
            },
            { 
              title: 'Active Devices', 
              value: inventoryData.summary.activeDevices, 
              icon: <CheckCircleIcon />, 
              color: INVENTORY_COLORS.success,
              trend: '+5',
              description: 'In use currently'
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
            placeholder="Search devices by ID, name, model, or serial..."
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
                  <SearchIcon sx={{ color: INVENTORY_COLORS.gray.border }} />
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
              borderColor: INVENTORY_COLORS.gray.border,
              color: INVENTORY_COLORS.gray.text
            }}
          >
            Filter
          </Button>
          <Button
            variant="outlined"
            startIcon={<PrintIcon />}
            sx={{ 
              borderRadius: 2,
              borderColor: INVENTORY_COLORS.gray.border,
              color: INVENTORY_COLORS.gray.text
            }}
          >
            Print
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleOpenAddDeviceDialog}
            sx={{ 
              borderRadius: 2,
              bgcolor: INVENTORY_COLORS.success.border,
              '&:hover': { bgcolor: alpha(INVENTORY_COLORS.success.border, 0.9) }
            }}
          >
            Add Device
          </Button>
        </Box>

        {/* Filter Menu */}
        <Menu
          anchorEl={filterAnchorEl}
          open={Boolean(filterAnchorEl)}
          onClose={handleFilterClose}
        >
          <MenuItem>
            <Typography variant="subtitle2" sx={{ color: INVENTORY_COLORS.gray.text }}>
              Filter by Category:
            </Typography>
          </MenuItem>
          <MenuItem onClick={() => handleCategoryChange('all')}>
            <ListItemIcon>
              <DevicesIcon />
            </ListItemIcon>
            All Categories
          </MenuItem>
          <MenuItem onClick={() => handleCategoryChange(DEVICE_CATEGORIES.OWNED)}>
            <ListItemIcon>
              <StoreIcon sx={{ color: INVENTORY_COLORS.owned.border }} />
            </ListItemIcon>
            Owned Devices
          </MenuItem>
          <MenuItem onClick={() => handleCategoryChange(DEVICE_CATEGORIES.BORROWED)}>
            <ListItemIcon>
              <ShippingIcon sx={{ color: INVENTORY_COLORS.borrowed.border }} />
            </ListItemIcon>
            Borrowed Devices
          </MenuItem>
          <MenuItem onClick={() => handleCategoryChange(DEVICE_CATEGORIES.LEASED)}>
            <ListItemIcon>
              <AssignmentIcon sx={{ color: INVENTORY_COLORS.leased.border }} />
            </ListItemIcon>
            Leased Devices
          </MenuItem>
          <MenuItem onClick={() => handleCategoryChange(DEVICE_CATEGORIES.MARKETPLACE)}>
            <ListItemIcon>
              <ShoppingCartIcon sx={{ color: INVENTORY_COLORS.marketplace.border }} />
            </ListItemIcon>
            Marketplace Devices
          </MenuItem>
          <Divider />
          <MenuItem>
            <Typography variant="subtitle2" sx={{ color: INVENTORY_COLORS.gray.text }}>
              Filter by Status:
            </Typography>
          </MenuItem>
          <MenuItem onClick={() => handleStatusChange('all')}>
            <ListItemIcon>
              <TimelineIcon />
            </ListItemIcon>
            All Status
          </MenuItem>
          <MenuItem onClick={() => handleStatusChange(DEVICE_STATUS.IN_USE)}>
            <ListItemIcon>
              <CheckCircleIcon sx={{ color: INVENTORY_COLORS.success.border }} />
            </ListItemIcon>
            In Use
          </MenuItem>
          <MenuItem onClick={() => handleStatusChange(DEVICE_STATUS.AVAILABLE)}>
            <ListItemIcon>
              <InfoIcon sx={{ color: INVENTORY_COLORS.info.border }} />
            </ListItemIcon>
            Available
          </MenuItem>
          <MenuItem onClick={() => handleStatusChange(DEVICE_STATUS.MAINTENANCE)}>
            <ListItemIcon>
              <BuildIcon sx={{ color: INVENTORY_COLORS.warning.border }} />
            </ListItemIcon>
            Maintenance
          </MenuItem>
          <MenuItem onClick={() => handleStatusChange(DEVICE_STATUS.CALIBRATION)}>
            <ListItemIcon>
              <SyncIcon sx={{ color: INVENTORY_COLORS.purple.border }} />
            </ListItemIcon>
            Calibration
          </MenuItem>
        </Menu>

        {/* Active Filters Display */}
        {(selectedCategory !== 'all' || selectedStatus !== 'all') && (
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
              label="Owned" 
              icon={<StoreIcon />} 
              iconPosition="start" 
              sx={{ minHeight: 48 }}
            />
            <Tab 
              label="Borrowed" 
              icon={<ShippingIcon />} 
              iconPosition="start" 
              sx={{ minHeight: 48 }}
            />
            <Tab 
              label="Leased" 
              icon={<AssignmentIcon />} 
              iconPosition="start" 
              sx={{ minHeight: 48 }}
            />
            <Tab 
              label="Marketplace" 
              icon={<ShoppingCartIcon />} 
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

        {/* Statistics Section */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mt: 4 }}>
          {/* Category Distribution */}
          <Card sx={{ 
            flex: '1 1 400px', 
            borderRadius: 3, 
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
            backgroundColor: INVENTORY_COLORS.gray.bg,
            border: `2px solid ${INVENTORY_COLORS.gray.border}`
          }}>
            <CardHeader
              title={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <CategoryIcon sx={{ color: INVENTORY_COLORS.gray.border }} />
                  <Typography variant="h6" sx={{ color: INVENTORY_COLORS.gray.text }}>
                    Device Category Distribution
                  </Typography>
                </Box>
              }
            />
            <CardContent>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={inventoryData.statistics.categoryDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={(entry) => `${entry.name}: ${entry.value}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {inventoryData.statistics.categoryDistribution.map((entry, index) => (
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
            backgroundColor: INVENTORY_COLORS.info.bg,
            border: `2px solid ${INVENTORY_COLORS.info.border}`
          }}>
            <CardHeader
              title={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <HistoryIcon sx={{ color: INVENTORY_COLORS.info.border }} />
                  <Typography variant="h6" sx={{ color: INVENTORY_COLORS.info.text }}>
                    Recent Inventory Activities
                  </Typography>
                </Box>
              }
            />
            <CardContent>
              <List sx={{ maxHeight: 300, overflow: 'auto' }}>
                {inventoryData.recentActivities.map((activity, index) => (
                  <ListItem key={activity.id} sx={{ py: 1 }}>
                    <ListItemAvatar>
                      <Avatar sx={{ 
                        width: 32, 
                        height: 32, 
                        bgcolor: alpha(INVENTORY_COLORS.info.border, 0.1),
                        color: INVENTORY_COLORS.info.border 
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

        {/* Add Device Dialog */}
        <Dialog 
          open={addDeviceDialogOpen} 
          onClose={handleCloseAddDeviceDialog}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar sx={{ 
                bgcolor: alpha(INVENTORY_COLORS.success.border, 0.1), 
                color: INVENTORY_COLORS.success.border 
              }}>
                <AddIcon />
              </Avatar>
              <Box>
                <Typography variant="h6">Add New Device</Typography>
                <Typography variant="caption" sx={{ color: INVENTORY_COLORS.gray.text }}>
                  Fill in the details to add a new device to the inventory
                </Typography>
              </Box>
            </Box>
          </DialogTitle>
          <DialogContent dividers>
            <Box sx={{ mt: 2 }}>
              <Grid container spacing={3}>
                {/* Basic Information */}
                <Grid item xs={12}>
                  <Typography variant="subtitle2" sx={{ color: INVENTORY_COLORS.gray.text, mb: 2, borderBottom: `1px solid ${INVENTORY_COLORS.gray.border}`, pb: 1 }}>
                    Basic Information
                  </Typography>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Device Name *"
                    value={newDevice.name}
                    onChange={(e) => handleAddDeviceFormChange('name', e.target.value)}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Model *"
                    value={newDevice.model}
                    onChange={(e) => handleAddDeviceFormChange('model', e.target.value)}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Serial Number *"
                    value={newDevice.serialNumber}
                    onChange={(e) => handleAddDeviceFormChange('serialNumber', e.target.value)}
                    variant="outlined"
                    size="small"
                    placeholder="SN-XXXX-XXXX"
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Manufacturer"
                    value={newDevice.manufacturer}
                    onChange={(e) => handleAddDeviceFormChange('manufacturer', e.target.value)}
                    variant="outlined"
                    size="small"
                    placeholder="Manufacturer Name"
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Category *</InputLabel>
                    <Select
                      value={newDevice.category}
                      label="Category *"
                      onChange={(e) => handleAddDeviceFormChange('category', e.target.value)}
                    >
                      <MenuItem value={DEVICE_CATEGORIES.OWNED}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <StoreIcon fontSize="small" sx={{ color: INVENTORY_COLORS.owned.border }} />
                          Owned
                        </Box>
                      </MenuItem>
                      <MenuItem value={DEVICE_CATEGORIES.BORROWED}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <ShippingIcon fontSize="small" sx={{ color: INVENTORY_COLORS.borrowed.border }} />
                          Borrowed
                        </Box>
                      </MenuItem>
                      <MenuItem value={DEVICE_CATEGORIES.LEASED}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <AssignmentIcon fontSize="small" sx={{ color: INVENTORY_COLORS.leased.border }} />
                          Leased
                        </Box>
                      </MenuItem>
                      <MenuItem value={DEVICE_CATEGORIES.MARKETPLACE}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <ShoppingCartIcon fontSize="small" sx={{ color: INVENTORY_COLORS.marketplace.border }} />
                          Marketplace
                        </Box>
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Status *</InputLabel>
                    <Select
                      value={newDevice.status}
                      label="Status *"
                      onChange={(e) => handleAddDeviceFormChange('status', e.target.value)}
                    >
                      <MenuItem value={DEVICE_STATUS.AVAILABLE}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <CheckCircleIcon fontSize="small" sx={{ color: INVENTORY_COLORS.success.border }} />
                          Available
                        </Box>
                      </MenuItem>
                      <MenuItem value={DEVICE_STATUS.IN_USE}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <InfoIcon fontSize="small" sx={{ color: INVENTORY_COLORS.info.border }} />
                          In Use
                        </Box>
                      </MenuItem>
                      <MenuItem value={DEVICE_STATUS.MAINTENANCE}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <BuildIcon fontSize="small" sx={{ color: INVENTORY_COLORS.warning.border }} />
                          Maintenance
                        </Box>
                      </MenuItem>
                      <MenuItem value={DEVICE_STATUS.CALIBRATION}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <SyncIcon fontSize="small" sx={{ color: INVENTORY_COLORS.purple.border }} />
                          Calibration
                        </Box>
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                
                {/* Financial Information */}
                <Grid item xs={12}>
                  <Typography variant="subtitle2" sx={{ color: INVENTORY_COLORS.gray.text, mb: 2, borderBottom: `1px solid ${INVENTORY_COLORS.gray.border}`, pb: 1, mt: 2 }}>
                    Financial Information
                  </Typography>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Value"
                    value={newDevice.value}
                    onChange={(e) => handleAddDeviceFormChange('value', e.target.value)}
                    variant="outlined"
                    size="small"
                    placeholder="$0"
                    InputProps={{
                      startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Purchase Date"
                    type="date"
                    value={newDevice.purchaseDate}
                    onChange={(e) => handleAddDeviceFormChange('purchaseDate', e.target.value)}
                    variant="outlined"
                    size="small"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                
                {/* Device Status */}
                <Grid item xs={12}>
                  <Typography variant="subtitle2" sx={{ color: INVENTORY_COLORS.gray.text, mb: 2, borderBottom: `1px solid ${INVENTORY_COLORS.gray.border}`, pb: 1, mt: 2 }}>
                    Device Status
                  </Typography>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Bluetooth Status</InputLabel>
                    <Select
                      value={newDevice.bluetoothStatus}
                      label="Bluetooth Status"
                      onChange={(e) => handleAddDeviceFormChange('bluetoothStatus', e.target.value)}
                    >
                      <MenuItem value="connected">Connected</MenuItem>
                      <MenuItem value="disconnected">Disconnected</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Battery Level (%)"
                    type="number"
                    value={newDevice.batteryLevel}
                    onChange={(e) => handleAddDeviceFormChange('batteryLevel', parseInt(e.target.value) || 0)}
                    variant="outlined"
                    size="small"
                    InputProps={{
                      inputProps: { min: 0, max: 100 },
                      endAdornment: <InputAdornment position="end">%</InputAdornment>,
                    }}
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Usage Hours"
                    type="number"
                    value={newDevice.usageHours}
                    onChange={(e) => handleAddDeviceFormChange('usageHours', parseInt(e.target.value) || 0)}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth size="small">
                    <InputLabel>FDA Status</InputLabel>
                    <Select
                      value={newDevice.fdaStatus}
                      label="FDA Status"
                      onChange={(e) => handleAddDeviceFormChange('fdaStatus', e.target.value)}
                    >
                      <MenuItem value="510(k) Cleared">510(k) Cleared</MenuItem>
                      <MenuItem value="PMA Approved">PMA Approved</MenuItem>
                      <MenuItem value="Exempt">Exempt</MenuItem>
                      <MenuItem value="Pending">Pending</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                
                {/* Assignment & Location */}
                <Grid item xs={12}>
                  <Typography variant="subtitle2" sx={{ color: INVENTORY_COLORS.gray.text, mb: 2, borderBottom: `1px solid ${INVENTORY_COLORS.gray.border}`, pb: 1, mt: 2 }}>
                    Assignment & Location
                  </Typography>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Assigned To"
                    value={newDevice.assignedTo}
                    onChange={(e) => handleAddDeviceFormChange('assignedTo', e.target.value)}
                    variant="outlined"
                    size="small"
                    placeholder="Not Assigned"
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Assigned Clinic"
                    value={newDevice.assignedClinic}
                    onChange={(e) => handleAddDeviceFormChange('assignedClinic', e.target.value)}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Location"
                    value={newDevice.location}
                    onChange={(e) => handleAddDeviceFormChange('location', e.target.value)}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="FDA Clearance Date"
                    type="date"
                    value={newDevice.fdaClearanceDate}
                    onChange={(e) => handleAddDeviceFormChange('fdaClearanceDate', e.target.value)}
                    variant="outlined"
                    size="small"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                
                {/* Maintenance Dates */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Last Maintenance"
                    type="date"
                    value={newDevice.lastMaintenance}
                    onChange={(e) => handleAddDeviceFormChange('lastMaintenance', e.target.value)}
                    variant="outlined"
                    size="small"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Next Maintenance"
                    type="date"
                    value={newDevice.nextMaintenance}
                    onChange={(e) => handleAddDeviceFormChange('nextMaintenance', e.target.value)}
                    variant="outlined"
                    size="small"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Warranty Until"
                    type="date"
                    value={newDevice.warrantyUntil}
                    onChange={(e) => handleAddDeviceFormChange('warrantyUntil', e.target.value)}
                    variant="outlined"
                    size="small"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                
                {/* Notes */}
                <Grid item xs={12}>
                  <Typography variant="subtitle2" sx={{ color: INVENTORY_COLORS.gray.text, mb: 2, borderBottom: `1px solid ${INVENTORY_COLORS.gray.border}`, pb: 1, mt: 2 }}>
                    Additional Information
                  </Typography>
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Notes"
                    value={newDevice.notes}
                    onChange={(e) => handleAddDeviceFormChange('notes', e.target.value)}
                    variant="outlined"
                    size="small"
                    multiline
                    rows={3}
                    placeholder="Additional notes about the device..."
                  />
                </Grid>
              </Grid>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAddDeviceDialog} startIcon={<CloseIcon />}>
              Cancel
            </Button>
            <Button 
              onClick={handleSubmitAddDevice} 
              variant="contained" 
              startIcon={<SaveIcon />}
              sx={{ bgcolor: INVENTORY_COLORS.success.border }}
            >
              Add Device
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
                    <DevicesIcon />
                  </Avatar>
                  <Box>
                    <Typography variant="h6">{selectedDevice.name}</Typography>
                    <Typography variant="caption" sx={{ color: INVENTORY_COLORS.gray.text }}>
                      {selectedDevice.id} • {selectedDevice.model}
                    </Typography>
                  </Box>
                </Box>
              </DialogTitle>
              <DialogContent dividers>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                  {/* Basic Information */}
                  <Box sx={{ flex: '1 1 300px' }}>
                    <Typography variant="subtitle2" sx={{ color: INVENTORY_COLORS.gray.text, mb: 2 }}>
                      Basic Information
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" sx={{ color: INVENTORY_COLORS.gray.text }}>
                          Category:
                        </Typography>
                        <Chip
                          label={selectedDevice.category.charAt(0).toUpperCase() + selectedDevice.category.slice(1)}
                          size="small"
                          sx={{ 
                            bgcolor: getCategoryColor(selectedDevice.category).bg,
                            color: getCategoryColor(selectedDevice.category).text
                          }}
                        />
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" sx={{ color: INVENTORY_COLORS.gray.text }}>
                          Status:
                        </Typography>
                        <Chip
                          label={selectedDevice.status.replace('_', ' ').toUpperCase()}
                          size="small"
                          sx={{ 
                            bgcolor: getStatusColor(selectedDevice.status).bg,
                            color: getStatusColor(selectedDevice.status).text
                          }}
                        />
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" sx={{ color: INVENTORY_COLORS.gray.text }}>
                          FDA Status:
                        </Typography>
                        <Typography variant="body2" fontWeight="medium">
                          {selectedDevice.fdaStatus}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" sx={{ color: INVENTORY_COLORS.gray.text }}>
                          FDA Clearance Date:
                        </Typography>
                        <Typography variant="body2">
                          {formatDate(selectedDevice.fdaClearanceDate)}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" sx={{ color: INVENTORY_COLORS.gray.text }}>
                          Serial Number:
                        </Typography>
                        <Typography variant="body2">
                          {selectedDevice.serialNumber}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" sx={{ color: INVENTORY_COLORS.gray.text }}>
                          Manufacturer:
                        </Typography>
                        <Typography variant="body2">
                          {selectedDevice.manufacturer}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>

                  {/* Device Status */}
                  <Box sx={{ flex: '1 1 300px' }}>
                    <Typography variant="subtitle2" sx={{ color: INVENTORY_COLORS.gray.text, mb: 2 }}>
                      Device Status
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" sx={{ color: INVENTORY_COLORS.gray.text }}>
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
                          <Typography variant="body2" sx={{ color: INVENTORY_COLORS.gray.text }}>
                            Signal Strength:
                          </Typography>
                          <Typography variant="body2">
                            {selectedDevice.signalStrength}%
                          </Typography>
                        </Box>
                      )}
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" sx={{ color: INVENTORY_COLORS.gray.text }}>
                          Battery Level:
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <BatteryIcon fontSize="small" sx={{ 
                            color: selectedDevice.batteryLevel > 50 ? INVENTORY_COLORS.success.border : 
                                   selectedDevice.batteryLevel > 20 ? INVENTORY_COLORS.warning.border : 
                                   INVENTORY_COLORS.danger.border 
                          }} />
                          <Typography variant="body2">
                            {selectedDevice.batteryLevel}%
                          </Typography>
                        </Box>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" sx={{ color: INVENTORY_COLORS.gray.text }}>
                          Usage Hours:
                        </Typography>
                        <Typography variant="body2">
                          {selectedDevice.usageHours} hours
                        </Typography>
                      </Box>
                    </Box>
                  </Box>

                  {/* Assignment & Location */}
                  <Box sx={{ flex: '1 1 300px' }}>
                    <Typography variant="subtitle2" sx={{ color: INVENTORY_COLORS.gray.text, mb: 2 }}>
                      Assignment & Location
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" sx={{ color: INVENTORY_COLORS.gray.text }}>
                          Assigned To:
                        </Typography>
                        <Typography variant="body2">
                          {selectedDevice.assignedTo}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" sx={{ color: INVENTORY_COLORS.gray.text }}>
                          Clinic:
                        </Typography>
                        <Typography variant="body2">
                          {selectedDevice.assignedClinic}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" sx={{ color: INVENTORY_COLORS.gray.text }}>
                          Location:
                        </Typography>
                        <Typography variant="body2">
                          {selectedDevice.location}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>

                  {/* Financial & Maintenance */}
                  <Box sx={{ flex: '1 1 300px' }}>
                    <Typography variant="subtitle2" sx={{ color: INVENTORY_COLORS.gray.text, mb: 2 }}>
                      Financial & Maintenance
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" sx={{ color: INVENTORY_COLORS.gray.text }}>
                          Value:
                        </Typography>
                        <Typography variant="body2" fontWeight="medium">
                          {selectedDevice.value}
                        </Typography>
                      </Box>
                      {selectedDevice.category === DEVICE_CATEGORIES.LEASED && (
                        <>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="body2" sx={{ color: INVENTORY_COLORS.gray.text }}>
                              Monthly Lease:
                            </Typography>
                            <Typography variant="body2">
                              {selectedDevice.monthlyLease}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="body2" sx={{ color: INVENTORY_COLORS.gray.text }}>
                              Lease End Date:
                            </Typography>
                            <Typography variant="body2">
                              {formatDate(selectedDevice.leaseEndDate)}
                            </Typography>
                          </Box>
                        </>
                      )}
                      {selectedDevice.category === DEVICE_CATEGORIES.BORROWED && (
                        <>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="body2" sx={{ color: INVENTORY_COLORS.gray.text }}>
                              Borrowed From:
                            </Typography>
                            <Typography variant="body2">
                              {selectedDevice.borrowedFrom}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="body2" sx={{ color: INVENTORY_COLORS.gray.text }}>
                              Return Date:
                            </Typography>
                            <Typography variant="body2">
                              {formatDate(selectedDevice.returnDate)}
                            </Typography>
                          </Box>
                        </>
                      )}
                      {selectedDevice.category === DEVICE_CATEGORIES.MARKETPLACE && (
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Typography variant="body2" sx={{ color: INVENTORY_COLORS.gray.text }}>
                            Marketplace Price:
                          </Typography>
                          <Typography variant="body2" fontWeight="medium">
                            {selectedDevice.marketplacePrice}
                          </Typography>
                        </Box>
                      )}
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" sx={{ color: INVENTORY_COLORS.gray.text }}>
                          Purchase Date:
                        </Typography>
                        <Typography variant="body2">
                          {formatDate(selectedDevice.purchaseDate)}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" sx={{ color: INVENTORY_COLORS.gray.text }}>
                          Warranty Until:
                        </Typography>
                        <Typography variant="body2">
                          {formatDate(selectedDevice.warrantyUntil)}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" sx={{ color: INVENTORY_COLORS.gray.text }}>
                          Last Maintenance:
                        </Typography>
                        <Typography variant="body2">
                          {formatDate(selectedDevice.lastMaintenance)}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" sx={{ color: INVENTORY_COLORS.gray.text }}>
                          Next Maintenance:
                        </Typography>
                        <Typography variant="body2">
                          {formatDate(selectedDevice.nextMaintenance)}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>

                {/* Notes */}
                {selectedDevice.notes && (
                  <Box sx={{ mt: 3 }}>
                    <Typography variant="subtitle2" sx={{ color: INVENTORY_COLORS.gray.text, mb: 1 }}>
                      Notes
                    </Typography>
                    <Card sx={{ p: 2, bgcolor: INVENTORY_COLORS.gray.bg }}>
                      <Typography variant="body2">
                        {selectedDevice.notes}
                      </Typography>
                    </Card>
                  </Box>
                )}
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDeviceDialog}>Close</Button>
                <Button variant="contained" startIcon={<EditIcon />}>
                  Edit Device
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

        {/* Footer */}
        <Box sx={{ 
          mt: 4, 
          pt: 2, 
          borderTop: `1px solid ${INVENTORY_COLORS.gray.border}`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Typography variant="caption" sx={{ color: INVENTORY_COLORS.gray.text }}>
            Device Inventory • Comprehensive medical device registry • Last updated: Today
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Tooltip title="Export Inventory">
              <IconButton size="small" sx={{ color: INVENTORY_COLORS.gray.border }}>
                <DownloadIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Print Report">
              <IconButton size="small" sx={{ color: INVENTORY_COLORS.gray.border }}>
                <PrintIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Box>
    </Fade>
  );
};

export default DeviceInventory;