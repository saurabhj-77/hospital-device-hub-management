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
  Tooltip
} from '@mui/material';
import {
  Refresh as RefreshIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Devices as DevicesIcon,
  LocalHospital as HospitalIcon,
  People as PeopleIcon,
  Timeline as TimelineIcon,
  Notifications as NotificationsIcon,
  CloudOff as OfflineIcon,
  CloudQueue as OnlineIcon,
  Storage as StorageIcon,
  FlashOn as FlashIcon,
  AccessibilityNew as PatientIcon,
  Security as SecurityIcon,
  Download as DownloadIcon,
  MoreVert as MoreVertIcon,
  Info as InfoIcon
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
  Area
} from 'recharts';

// Color palette for cards
const CARD_COLORS = {
  primary: { bg: '#F0F7FF', border: '#0066CC', text: '#003366' },
  success: { bg: '#F0FFF4', border: '#38A169', text: '#22543D' },
  warning: { bg: '#FFFBEB', border: '#D69E2E', text: '#744210' },
  danger: { bg: '#FFF5F5', border: '#E53E3E', text: '#742A2A' },
  info: { bg: '#EBF8FF', border: '#3182CE', text: '#234E52' },
  purple: { bg: '#FAF5FF', border: '#805AD5', text: '#44337A' },
  teal: { bg: '#E6FFFA', border: '#319795', text: '#234E52' },
  gray: { bg: '#F7FAFC', border: '#718096', text: '#2D3748' }
};

// Default data structure
const defaultDashboardData = {
  summary: {
    totalDevices: 1248,
    activeDevices: 987,
    idleDevices: 261,
    onlineStreams: 923,
    offlineStreams: 64,
    connectedClinics: 42,
    monitoredPatients: 1896,
    criticalAlerts: 12,
    warningAlerts: 47,
    pendingUpdates: 28,
    dataAccuracy: 99.7
  },
  
  deviceStatus: [
    { name: 'In Use', value: 987, color: CARD_COLORS.success.border, icon: '📱' },
    { name: 'Idle', value: 261, color: CARD_COLORS.warning.border, icon: '⏸️' },
    { name: 'Maintenance', value: 85, color: CARD_COLORS.info.border, icon: '🔧' },
    { name: 'Offline', value: 64, color: CARD_COLORS.danger.border, icon: '🔴' },
    { name: 'Calibration', value: 31, color: CARD_COLORS.purple.border, icon: '⚖️' }
  ],
  
  deviceTypes: [
    { name: 'Cardiac Monitors', count: 189, trend: 8.2, color: CARD_COLORS.danger },
    { name: 'Ventilators', count: 67, trend: 2.1, color: CARD_COLORS.info },
    { name: 'Glucose Monitors', count: 312, trend: 12.5, color: CARD_COLORS.success },
    { name: 'BP Monitors', count: 245, trend: 5.7, color: CARD_COLORS.primary },
    { name: 'Pulse Oximeters', count: 178, trend: -1.2, color: CARD_COLORS.warning },
    { name: 'Infusion Pumps', count: 89, trend: 3.4, color: CARD_COLORS.purple }
  ],
  
  alerts: [
    { 
      id: 1, 
      type: 'critical', 
      title: 'FDA Recall - Cardiac Monitor X-200', 
      device: 'CardioMonitor X-200 (Batch #XR-2023-45)',
      time: '10 min ago',
      priority: 'Immediate',
      affected: 45
    },
    { 
      id: 2, 
      type: 'warning', 
      title: 'Abnormal Heart Rate Detected', 
      device: 'Patient Monitor #P-3045 (ICU)',
      time: '25 min ago',
      priority: 'High',
      patient: 'John D. (Room 304)'
    },
    { 
      id: 3, 
      type: 'warning', 
      title: 'Multiple Device Connectivity Issues', 
      device: 'Ward B - Floor 3',
      time: '1 hour ago',
      priority: 'Medium',
      affected: 8
    },
    { 
      id: 4, 
      type: 'info', 
      title: 'Firmware Update Available', 
      device: 'Glucose Monitor Batch #G-2024-Q1',
      time: '2 hours ago',
      priority: 'Low',
      devices: 120
    },
    { 
      id: 5, 
      type: 'critical', 
      title: 'Critical Battery Level', 
      device: 'Portable Ventilator #V-789',
      time: '3 hours ago',
      priority: 'Immediate',
      battery: '7%'
    }
  ],
  
  clinicConnections: [
    { name: 'Cardiology Wing', devices: 145, patients: 128, status: 'optimal', color: CARD_COLORS.success },
    { name: 'ICU Main', devices: 89, patients: 42, status: 'warning', color: CARD_COLORS.warning },
    { name: 'Emergency Dept', devices: 67, patients: 58, status: 'optimal', color: CARD_COLORS.success },
    { name: 'General Ward A', devices: 112, patients: 96, status: 'optimal', color: CARD_COLORS.success },
    { name: 'General Ward B', devices: 98, patients: 84, status: 'warning', color: CARD_COLORS.warning },
    { name: 'Pediatrics', devices: 56, patients: 48, status: 'optimal', color: CARD_COLORS.success },
    { name: 'Oncology', devices: 78, patients: 65, status: 'critical', color: CARD_COLORS.danger }
  ],
  
  streamPerformance: [
    { time: '00:00', online: 890, offline: 22, latency: 120 },
    { time: '04:00', online: 875, offline: 35, latency: 145 },
    { time: '08:00', online: 910, offline: 13, latency: 95 },
    { time: '12:00', online: 923, offline: 5, latency: 85 },
    { time: '16:00', online: 905, offline: 18, latency: 110 },
    { time: '20:00', online: 895, offline: 28, latency: 130 }
  ],
  
  patientMonitoring: {
    total: 1896,
    critical: 48,
    stable: 1728,
    improving: 120,
    byDepartment: [
      { department: 'ICU', count: 142, trend: '↑', color: CARD_COLORS.danger },
      { department: 'Cardiology', count: 286, trend: '→', color: CARD_COLORS.primary },
      { department: 'Emergency', count: 89, trend: '↓', color: CARD_COLORS.warning },
      { department: 'General', count: 945, trend: '↑', color: CARD_COLORS.success },
      { department: 'Pediatrics', count: 158, trend: '→', color: CARD_COLORS.info }
    ]
  },
  
  deviceHealth: {
    uptime: 99.8,
    responseTime: 1.8,
    dataIntegrity: 99.9,
    complianceScore: 98.5
  },
  
  recentActivities: [
    { id: 1, action: 'Device registered', device: 'Cardiac Monitor #CM-4567', time: '5 min ago', user: 'Dr. Smith' },
    { id: 2, action: 'Patient assigned', device: 'Glucose Monitor #GM-8912', time: '15 min ago', user: 'Nurse Jane' },
    { id: 3, action: 'Maintenance completed', device: 'Ventilator #V-345', time: '30 min ago', user: 'Tech Mike' },
    { id: 4, action: 'Alert resolved', device: 'BP Monitor #BP-678', time: '1 hour ago', user: 'System Admin' },
    { id: 5, action: 'Data export', device: 'All ICU devices', time: '2 hours ago', user: 'Researcher Tom' }
  ]
};

// Enhanced Dashboard Component
const EnhancedDashboard = () => {
  const theme = useTheme();
  const [dashboardData, setDashboardData] = useState(defaultDashboardData);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [refreshAnimation, setRefreshAnimation] = useState(false);

  useEffect(() => {
    const loadDashboardData = () => {
      const savedData = localStorage.getItem('deviceHub_enhanced_dashboard');
      if (savedData) {
        try {
          const parsedData = JSON.parse(savedData);
          // Merge saved data with default structure to ensure all properties exist
          const mergedData = {
            ...defaultDashboardData,
            ...parsedData,
            summary: { ...defaultDashboardData.summary, ...parsedData.summary },
            deviceTypes: parsedData.deviceTypes || defaultDashboardData.deviceTypes.map(type => ({
              ...type,
              color: type.color || CARD_COLORS.primary
            })),
            clinicConnections: parsedData.clinicConnections || defaultDashboardData.clinicConnections.map(clinic => ({
              ...clinic,
              color: clinic.color || CARD_COLORS.success
            })),
            patientMonitoring: {
              ...defaultDashboardData.patientMonitoring,
              ...parsedData.patientMonitoring,
              byDepartment: (parsedData.patientMonitoring?.byDepartment || defaultDashboardData.patientMonitoring.byDepartment).map(dept => ({
                ...dept,
                color: dept.color || CARD_COLORS.primary
              }))
            }
          };
          setDashboardData(mergedData);
        } catch (error) {
          console.error('Error parsing saved data:', error);
          setDashboardData(defaultDashboardData);
        }
      } else {
        setDashboardData(defaultDashboardData);
        localStorage.setItem('deviceHub_enhanced_dashboard', JSON.stringify(defaultDashboardData));
      }
      setLoading(false);
    };

    loadDashboardData();
    
    const interval = setInterval(() => {
      handleAutoRefresh();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    setRefreshAnimation(true);
    setLoading(true);
    
    setTimeout(() => {
      const updatedData = {
        ...dashboardData,
        summary: {
          ...dashboardData.summary,
          onlineStreams: Math.floor(Math.random() * 40) + 900,
          monitoredPatients: Math.floor(Math.random() * 50) + 1850,
          criticalAlerts: Math.floor(Math.random() * 5) + 10
        },
        lastUpdated: new Date().toISOString()
      };
      
      setDashboardData(updatedData);
      localStorage.setItem('deviceHub_enhanced_dashboard', JSON.stringify(updatedData));
      setLastUpdated(new Date());
      setLoading(false);
      setRefreshAnimation(false);
    }, 800);
  };

  const handleAutoRefresh = () => {
    if (dashboardData) {
      const updatedData = {
        ...dashboardData,
        summary: {
          ...dashboardData.summary,
          onlineStreams: Math.floor(Math.random() * 30) + 910,
          activeDevices: Math.floor(Math.random() * 20) + 980
        }
      };
      setDashboardData(updatedData);
      setLastUpdated(new Date());
    }
  };

  const getAlertColor = (type) => {
    switch (type) {
      case 'critical': return CARD_COLORS.danger.border;
      case 'warning': return CARD_COLORS.warning.border;
      case 'info': return CARD_COLORS.info.border;
      default: return CARD_COLORS.gray.border;
    }
  };

  const getAlertBgColor = (type) => {
    switch (type) {
      case 'critical': return CARD_COLORS.danger.bg;
      case 'warning': return CARD_COLORS.warning.bg;
      case 'info': return CARD_COLORS.info.bg;
      default: return CARD_COLORS.gray.bg;
    }
  };

  const StatusIndicator = ({ status, size = 8 }) => {
    const color = status === 'optimal' ? CARD_COLORS.success.border : 
                  status === 'warning' ? CARD_COLORS.warning.border : 
                  status === 'critical' ? CARD_COLORS.danger.border : 
                  CARD_COLORS.gray.border;
    
    return (
      <Box
        sx={{
          width: size,
          height: size,
          borderRadius: '50%',
          bgcolor: color,
          display: 'inline-block',
          mr: 1
        }}
      />
    );
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
          <Typography variant="h5" gutterBottom sx={{ color: CARD_COLORS.primary.text }}>
            Loading Device Hub Dashboard
          </Typography>
          <LinearProgress sx={{ height: 8, borderRadius: 4, bgcolor: CARD_COLORS.primary.bg }} />
          <Typography variant="body2" sx={{ mt: 2, color: CARD_COLORS.gray.text }}>
            Initializing medical device monitoring systems...
          </Typography>
        </Box>
      </Box>
    );
  }

  // Ensure we have data before rendering
  if (!dashboardData) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh'
      }}>
        <Typography variant="h6" color="error">
          Failed to load dashboard data. Please refresh the page.
        </Typography>
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
        {/* Header with Stats */}
        <Grow in={true} timeout={700}>
          <Box sx={{ 
            mb: 4,
            p: 3,
            borderRadius: 3,
            backgroundColor: CARD_COLORS.primary.bg,
            border: `2px solid ${CARD_COLORS.primary.border}`,
            position: 'relative',
            overflow: 'hidden'
          }}>
            <Box sx={{ 
              position: 'absolute', 
              top: 0, 
              right: 0,
              width: 300,
              height: 300,
              background: `radial-gradient(circle, ${alpha(CARD_COLORS.primary.border, 0.1)} 0%, transparent 70%)`,
              transform: 'translate(30%, -30%)'
            }} />
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Box>
                <Typography variant="h3" fontWeight="bold" gutterBottom sx={{ color: CARD_COLORS.primary.text }}>
                  Device Hub Dashboard
                </Typography>
                <Typography variant="body1" sx={{ maxWidth: 600, color: CARD_COLORS.primary.text }}>
                  Real-time monitoring of {dashboardData.summary.totalDevices.toLocaleString()} medical devices across {dashboardData.summary.connectedClinics} clinics, tracking {dashboardData.summary.monitoredPatients.toLocaleString()} patients
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 1 }}>
                <Chip
                  icon={<FlashIcon />}
                  label="LIVE"
                  sx={{
                    bgcolor: CARD_COLORS.success.border,
                    color: 'white',
                    fontWeight: 'bold'
                  }}
                  size="small"
                />
                <Typography variant="caption" sx={{ color: CARD_COLORS.primary.text }}>
                  Last updated: {lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<RefreshIcon sx={{ 
                    animation: refreshAnimation ? 'spin 0.8s ease-in-out' : 'none',
                    '@keyframes spin': {
                      '0%': { transform: 'rotate(0deg)' },
                      '100%': { transform: 'rotate(360deg)' }
                    }
                  }} />}
                  onClick={handleRefresh}
                  sx={{ 
                    borderRadius: 2,
                    px: 3,
                    py: 1,
                    bgcolor: CARD_COLORS.primary.border,
                    '&:hover': {
                      bgcolor: alpha(CARD_COLORS.primary.border, 0.9)
                    }
                  }}
                >
                  Refresh
                </Button>
              </Box>
            </Box>
          </Box>
        </Grow>

        {/* Main Metrics Grid */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 4 }}>
          {/* Active Devices Card */}
          <Grow in={true} timeout={800}>
            <Card sx={{ 
              flex: '1 1 300px', 
              borderRadius: 3, 
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
              backgroundColor: CARD_COLORS.primary.bg,
              border: `2px solid ${CARD_COLORS.primary.border}`,
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)'
              }
            }}>
              <CardHeader
                title={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ 
                      bgcolor: alpha(CARD_COLORS.primary.border, 0.1), 
                      color: CARD_COLORS.primary.border 
                    }}>
                      <DevicesIcon />
                    </Avatar>
                    <Typography variant="h6" sx={{ color: CARD_COLORS.primary.text }}>
                      Active Devices
                    </Typography>
                  </Box>
                }
              />
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mb: 2 }}>
                  <Typography variant="h2" fontWeight="bold" sx={{ color: CARD_COLORS.primary.text }}>
                    {dashboardData.summary.activeDevices.toLocaleString()}
                  </Typography>
                  <Typography variant="body2" sx={{ color: CARD_COLORS.primary.text }}>
                    / {dashboardData.summary.totalDevices.toLocaleString()} total
                  </Typography>
                </Box>
                
                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" sx={{ color: CARD_COLORS.primary.text }}>In Use</Typography>
                    <Typography variant="body2" fontWeight="bold" sx={{ color: CARD_COLORS.primary.text }}>
                      {dashboardData.summary.activeDevices} ({((dashboardData.summary.activeDevices / dashboardData.summary.totalDevices) * 100).toFixed(1)}%)
                    </Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={(dashboardData.summary.activeDevices / dashboardData.summary.totalDevices) * 100}
                    sx={{ 
                      height: 10, 
                      borderRadius: 5,
                      bgcolor: alpha(CARD_COLORS.primary.border, 0.1),
                      '& .MuiLinearProgress-bar': {
                        bgcolor: CARD_COLORS.primary.border
                      }
                    }}
                  />
                </Box>
                
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" sx={{ color: CARD_COLORS.primary.text }}>Idle</Typography>
                    <Typography variant="body2" fontWeight="bold" sx={{ color: CARD_COLORS.primary.text }}>
                      {dashboardData.summary.idleDevices} ({((dashboardData.summary.idleDevices / dashboardData.summary.totalDevices) * 100).toFixed(1)}%)
                    </Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={(dashboardData.summary.idleDevices / dashboardData.summary.totalDevices) * 100}
                    sx={{ 
                      height: 10, 
                      borderRadius: 5,
                      bgcolor: alpha(CARD_COLORS.warning.border, 0.1),
                      '& .MuiLinearProgress-bar': {
                        bgcolor: CARD_COLORS.warning.border
                      }
                    }}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grow>

          {/* Data Streams Status */}
          <Grow in={true} timeout={900}>
            <Card sx={{ 
              flex: '1 1 300px', 
              borderRadius: 3, 
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
              backgroundColor: CARD_COLORS.info.bg,
              border: `2px solid ${CARD_COLORS.info.border}`,
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)'
              }
            }}>
              <CardHeader
                title={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ 
                      bgcolor: alpha(CARD_COLORS.info.border, 0.1), 
                      color: CARD_COLORS.info.border 
                    }}>
                      <StorageIcon />
                    </Avatar>
                    <Typography variant="h6" sx={{ color: CARD_COLORS.info.text }}>
                      Data Streams
                    </Typography>
                  </Box>
                }
              />
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mb: 3 }}>
                  <Typography variant="h2" fontWeight="bold" sx={{ color: CARD_COLORS.info.text }}>
                    {dashboardData.summary.onlineStreams}
                  </Typography>
                  <Typography variant="h6" sx={{ color: CARD_COLORS.info.text }}>
                    / {dashboardData.summary.onlineStreams + dashboardData.summary.offlineStreams} online
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                  <Box sx={{ flex: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <OnlineIcon sx={{ color: CARD_COLORS.success.border }} fontSize="small" />
                      <Typography variant="body2" sx={{ color: CARD_COLORS.info.text }}>Online</Typography>
                      <Typography variant="body2" fontWeight="bold" sx={{ ml: 'auto', color: CARD_COLORS.info.text }}>
                        {((dashboardData.summary.onlineStreams / (dashboardData.summary.onlineStreams + dashboardData.summary.offlineStreams)) * 100).toFixed(1)}%
                      </Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={(dashboardData.summary.onlineStreams / (dashboardData.summary.onlineStreams + dashboardData.summary.offlineStreams)) * 100}
                      sx={{ 
                        height: 8, 
                        borderRadius: 4,
                        bgcolor: alpha(CARD_COLORS.success.border, 0.1),
                        '& .MuiLinearProgress-bar': {
                          bgcolor: CARD_COLORS.success.border
                        }
                      }}
                    />
                  </Box>
                  
                  <Box sx={{ flex: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <OfflineIcon sx={{ color: CARD_COLORS.danger.border }} fontSize="small" />
                      <Typography variant="body2" sx={{ color: CARD_COLORS.info.text }}>Offline</Typography>
                      <Typography variant="body2" fontWeight="bold" sx={{ ml: 'auto', color: CARD_COLORS.info.text }}>
                        {((dashboardData.summary.offlineStreams / (dashboardData.summary.onlineStreams + dashboardData.summary.offlineStreams)) * 100).toFixed(1)}%
                      </Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={(dashboardData.summary.offlineStreams / (dashboardData.summary.onlineStreams + dashboardData.summary.offlineStreams)) * 100}
                      sx={{ 
                        height: 8, 
                        borderRadius: 4,
                        bgcolor: alpha(CARD_COLORS.danger.border, 0.1),
                        '& .MuiLinearProgress-bar': {
                          bgcolor: CARD_COLORS.danger.border
                        }
                      }}
                    />
                  </Box>
                </Box>
                
                <Divider sx={{ my: 2, borderColor: alpha(CARD_COLORS.info.border, 0.3) }} />
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography variant="caption" sx={{ color: CARD_COLORS.info.text }}>Avg Latency</Typography>
                    <Typography variant="body2" fontWeight="bold" sx={{ color: CARD_COLORS.info.text }}>125ms</Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" sx={{ color: CARD_COLORS.info.text }}>Data Integrity</Typography>
                    <Typography variant="body2" fontWeight="bold" sx={{ color: CARD_COLORS.info.text }}>99.9%</Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" sx={{ color: CARD_COLORS.info.text }}>Uptime</Typography>
                    <Typography variant="body2" fontWeight="bold" sx={{ color: CARD_COLORS.info.text }}>99.8%</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grow>

          {/* Patients Monitored */}
          <Grow in={true} timeout={1000}>
            <Card sx={{ 
              flex: '1 1 300px', 
              borderRadius: 3, 
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
              backgroundColor: CARD_COLORS.success.bg,
              border: `2px solid ${CARD_COLORS.success.border}`,
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)'
              }
            }}>
              <CardHeader
                title={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ 
                      bgcolor: alpha(CARD_COLORS.success.border, 0.1), 
                      color: CARD_COLORS.success.border 
                    }}>
                      <PatientIcon />
                    </Avatar>
                    <Typography variant="h6" sx={{ color: CARD_COLORS.success.text }}>
                      Patients Monitored
                    </Typography>
                  </Box>
                }
              />
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mb: 3 }}>
                  <Typography variant="h2" fontWeight="bold" sx={{ color: CARD_COLORS.success.text }}>
                    {dashboardData.summary.monitoredPatients.toLocaleString()}
                  </Typography>
                  <Typography variant="body2" sx={{ color: CARD_COLORS.success.text }}>
                    active patients
                  </Typography>
                </Box>
                
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" gutterBottom sx={{ color: CARD_COLORS.success.text }}>
                    Status Distribution
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                    <Box sx={{ 
                      flex: dashboardData.patientMonitoring?.critical || 0, 
                      bgcolor: CARD_COLORS.danger.border, 
                      height: 8, 
                      borderRadius: 4 
                    }} />
                    <Box sx={{ 
                      flex: dashboardData.patientMonitoring?.stable || 0, 
                      bgcolor: CARD_COLORS.success.border, 
                      height: 8, 
                      borderRadius: 4 
                    }} />
                    <Box sx={{ 
                      flex: dashboardData.patientMonitoring?.improving || 0, 
                      bgcolor: CARD_COLORS.info.border, 
                      height: 8, 
                      borderRadius: 4 
                    }} />
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Chip 
                      label={`${dashboardData.patientMonitoring?.critical || 0} critical`} 
                      size="small" 
                      sx={{ 
                        bgcolor: CARD_COLORS.danger.bg,
                        color: CARD_COLORS.danger.text,
                        border: `1px solid ${CARD_COLORS.danger.border}`
                      }}
                    />
                    <Chip 
                      label={`${dashboardData.patientMonitoring?.stable || 0} stable`} 
                      size="small" 
                      sx={{ 
                        bgcolor: CARD_COLORS.success.bg,
                        color: CARD_COLORS.success.text,
                        border: `1px solid ${CARD_COLORS.success.border}`
                      }}
                    />
                    <Chip 
                      label={`${dashboardData.patientMonitoring?.improving || 0} improving`} 
                      size="small" 
                      sx={{ 
                        bgcolor: CARD_COLORS.info.bg,
                        color: CARD_COLORS.info.text,
                        border: `1px solid ${CARD_COLORS.info.border}`
                      }}
                    />
                  </Box>
                </Box>
                
                <Divider sx={{ my: 2, borderColor: alpha(CARD_COLORS.success.border, 0.3) }} />
                
                <Box>
                  <Typography variant="body2" gutterBottom sx={{ color: CARD_COLORS.success.text }}>
                    By Department
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    {(dashboardData.patientMonitoring?.byDepartment || []).map((dept, index) => (
                      <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="body2" sx={{ color: CARD_COLORS.success.text }}>
                          {dept.department}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="body2" fontWeight="bold" sx={{ color: CARD_COLORS.success.text }}>
                            {dept.count}
                          </Typography>
                          {dept.trend === '↑' && <TrendingUpIcon fontSize="small" sx={{ color: CARD_COLORS.success.border }} />}
                          {dept.trend === '↓' && <TrendingDownIcon fontSize="small" sx={{ color: CARD_COLORS.danger.border }} />}
                          {dept.trend === '→' && <span style={{ color: CARD_COLORS.gray.border }}>→</span>}
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grow>
        </Box>

        {/* Alerts and Clinics Section */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 4 }}>
          {/* Alerts Panel */}
          <Zoom in={true} timeout={1100}>
            <Card sx={{ 
              flex: '1 1 500px', 
              borderRadius: 3, 
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
              backgroundColor: CARD_COLORS.warning.bg,
              border: `2px solid ${CARD_COLORS.warning.border}`,
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)'
              }
            }}>
              <CardHeader
                title={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Badge badgeContent={dashboardData.alerts?.length || 0} sx={{
                      '& .MuiBadge-badge': {
                        bgcolor: CARD_COLORS.danger.border,
                        color: 'white'
                      }
                    }}>
                      <Avatar sx={{ 
                        bgcolor: alpha(CARD_COLORS.warning.border, 0.1), 
                        color: CARD_COLORS.warning.border 
                      }}>
                        <WarningIcon />
                      </Avatar>
                    </Badge>
                    <Box>
                      <Typography variant="h6" sx={{ color: CARD_COLORS.warning.text }}>
                        Alerts & Notifications
                      </Typography>
                      <Typography variant="caption" sx={{ color: CARD_COLORS.warning.text }}>
                        FDA updates, recalls, abnormal signals
                      </Typography>
                    </Box>
                  </Box>
                }
                action={
                  <IconButton sx={{ color: CARD_COLORS.warning.border }}>
                    <MoreVertIcon />
                  </IconButton>
                }
              />
              <CardContent sx={{ maxHeight: 400, overflow: 'auto' }}>
                {(dashboardData.alerts || []).map((alert, index) => (
                  <Grow in={true} timeout={500 + index * 100} key={alert.id}>
                    <Box sx={{ 
                      mb: 2, 
                      p: 2, 
                      borderRadius: 2,
                      backgroundColor: getAlertBgColor(alert.type),
                      borderLeft: `4px solid ${getAlertColor(alert.type)}`,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateX(4px)',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                      }
                    }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                        <Typography variant="subtitle1" fontWeight="bold" sx={{ color: '#1A202C' }}>
                          {alert.title}
                        </Typography>
                        <Chip
                          label={alert.priority}
                          size="small"
                          sx={{
                            bgcolor: alpha(getAlertColor(alert.type), 0.2),
                            color: getAlertColor(alert.type),
                            fontWeight: 'bold',
                            border: `1px solid ${getAlertColor(alert.type)}`
                          }}
                        />
                      </Box>
                      <Typography variant="body2" sx={{ mb: 1, color: '#4A5568' }}>
                        {alert.device}
                      </Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="caption" sx={{ color: '#718096' }}>
                          {alert.time}
                        </Typography>
                        {alert.patient && (
                          <Chip 
                            label={`Patient: ${alert.patient}`} 
                            size="small" 
                            variant="outlined"
                            sx={{ borderColor: getAlertColor(alert.type), color: getAlertColor(alert.type) }}
                          />
                        )}
                        {alert.affected && (
                          <Chip 
                            label={`${alert.affected} devices affected`} 
                            size="small" 
                            variant="outlined"
                            sx={{ borderColor: getAlertColor(alert.type), color: getAlertColor(alert.type) }}
                          />
                        )}
                      </Box>
                    </Box>
                  </Grow>
                ))}
              </CardContent>
            </Card>
          </Zoom>

          {/* Clinics Connected */}
          <Zoom in={true} timeout={1200}>
            <Card sx={{ 
              flex: '1 1 500px', 
              borderRadius: 3, 
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
              backgroundColor: CARD_COLORS.purple.bg,
              border: `2px solid ${CARD_COLORS.purple.border}`,
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)'
              }
            }}>
              <CardHeader
                title={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ 
                      bgcolor: alpha(CARD_COLORS.purple.border, 0.1), 
                      color: CARD_COLORS.purple.border 
                    }}>
                      <HospitalIcon />
                    </Avatar>
                    <Box>
                      <Typography variant="h6" sx={{ color: CARD_COLORS.purple.text }}>
                        Clinics Connected
                      </Typography>
                      <Typography variant="caption" sx={{ color: CARD_COLORS.purple.text }}>
                        {dashboardData.summary.connectedClinics} active facilities
                      </Typography>
                    </Box>
                  </Box>
                }
              />
              <CardContent>
                <Box sx={{ height: 300 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={dashboardData.clinicConnections || []}>
                      <CartesianGrid strokeDasharray="3 3" stroke={alpha(CARD_COLORS.purple.border, 0.2)} />
                      <XAxis 
                        dataKey="name" 
                        stroke={CARD_COLORS.purple.text}
                        angle={-45}
                        textAnchor="end"
                        height={60}
                      />
                      <YAxis stroke={CARD_COLORS.purple.text} />
                      <RechartsTooltip 
                        contentStyle={{ 
                          backgroundColor: CARD_COLORS.purple.bg,
                          border: `1px solid ${CARD_COLORS.purple.border}`,
                          borderRadius: 8,
                          padding: 12,
                          color: CARD_COLORS.purple.text
                        }}
                      />
                      <Legend />
                      <Bar 
                        dataKey="devices" 
                        fill={CARD_COLORS.primary.border} 
                        name="Devices" 
                        radius={[4, 4, 0, 0]}
                        maxBarSize={40}
                      />
                      <Bar 
                        dataKey="patients" 
                        fill={CARD_COLORS.purple.border} 
                        name="Patients" 
                        radius={[4, 4, 0, 0]}
                        maxBarSize={40}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </Box>
                
                <Divider sx={{ my: 2, borderColor: alpha(CARD_COLORS.purple.border, 0.3) }} />
                
                <Box>
                  <Typography variant="body2" gutterBottom sx={{ color: CARD_COLORS.purple.text }}>
                    Clinic Status
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {(dashboardData.clinicConnections || []).map((clinic, index) => (
                      <Chip
                        key={index}
                        label={clinic.name}
                        size="small"
                        variant="outlined"
                        icon={<StatusIndicator status={clinic.status} />}
                        sx={{
                          borderColor: clinic.color?.border || CARD_COLORS.success.border,
                          color: clinic.color?.text || CARD_COLORS.success.text,
                          bgcolor: clinic.color?.bg || CARD_COLORS.success.bg,
                          '&:hover': {
                            bgcolor: alpha(clinic.color?.border || CARD_COLORS.success.border, 0.1)
                          }
                        }}
                      />
                    ))}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Zoom>
        </Box>

        {/* Bottom Section: Performance and Recent Activity */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
          {/* Device Performance */}
          <Grow in={true} timeout={1300}>
            <Card sx={{ 
              flex: '1 1 400px', 
              borderRadius: 3, 
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
              backgroundColor: CARD_COLORS.teal.bg,
              border: `2px solid ${CARD_COLORS.teal.border}`,
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)'
              }
            }}>
              <CardHeader
                title={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ 
                      bgcolor: alpha(CARD_COLORS.teal.border, 0.1), 
                      color: CARD_COLORS.teal.border 
                    }}>
                      <TimelineIcon />
                    </Avatar>
                    <Typography variant="h6" sx={{ color: CARD_COLORS.teal.text }}>
                      Device Performance
                    </Typography>
                  </Box>
                }
              />
              <CardContent>
                <Box sx={{ height: 250 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={dashboardData.streamPerformance || []}>
                      <CartesianGrid strokeDasharray="3 3" stroke={alpha(CARD_COLORS.teal.border, 0.2)} />
                      <XAxis dataKey="time" stroke={CARD_COLORS.teal.text} />
                      <YAxis stroke={CARD_COLORS.teal.text} />
                      <RechartsTooltip 
                        contentStyle={{ 
                          backgroundColor: CARD_COLORS.teal.bg,
                          border: `1px solid ${CARD_COLORS.teal.border}`,
                          borderRadius: 8,
                          color: CARD_COLORS.teal.text
                        }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="online" 
                        stroke={CARD_COLORS.success.border} 
                        fill={alpha(CARD_COLORS.success.border, 0.2)}
                        strokeWidth={2}
                        name="Online Streams"
                      />
                      <Area 
                        type="monotone" 
                        dataKey="latency" 
                        stroke={CARD_COLORS.warning.border} 
                        fill={alpha(CARD_COLORS.warning.border, 0.2)}
                        strokeWidth={2}
                        yAxisId={1}
                        name="Latency (ms)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </Box>
                
                <Divider sx={{ my: 2, borderColor: alpha(CARD_COLORS.teal.border, 0.3) }} />
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', textAlign: 'center' }}>
                  {Object.entries(dashboardData.deviceHealth || {}).map(([key, value], index) => (
                    <Box key={key}>
                      <Typography variant="caption" sx={{ color: CARD_COLORS.teal.text }} display="block">
                        {key.replace(/([A-Z])/g, ' $1').toUpperCase()}
                      </Typography>
                      <Typography variant="h5" fontWeight="bold" sx={{ color: CARD_COLORS.teal.text }}>
                        {typeof value === 'number' ? `${value}%` : `${value}s`}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grow>

          {/* Recent Activity */}
          <Grow in={true} timeout={1400}>
            <Card sx={{ 
              flex: '1 1 400px', 
              borderRadius: 3, 
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
              backgroundColor: CARD_COLORS.gray.bg,
              border: `2px solid ${CARD_COLORS.gray.border}`,
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)'
              }
            }}>
              <CardHeader
                title={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ 
                      bgcolor: alpha(CARD_COLORS.gray.border, 0.1), 
                      color: CARD_COLORS.gray.border 
                    }}>
                      <NotificationsIcon />
                    </Avatar>
                    <Typography variant="h6" sx={{ color: CARD_COLORS.gray.text }}>
                      Recent Activity
                    </Typography>
                  </Box>
                }
              />
              <CardContent sx={{ maxHeight: 300, overflow: 'auto' }}>
                {(dashboardData.recentActivities || []).map((activity, index) => (
                  <Box key={activity.id} sx={{ mb: 2 }}>
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 2, 
                      p: 1.5,
                      borderRadius: 2,
                      backgroundColor: index === 0 ? alpha(CARD_COLORS.primary.border, 0.1) : 'transparent',
                      transition: 'background-color 0.2s ease',
                      '&:hover': {
                        backgroundColor: alpha(CARD_COLORS.gray.border, 0.1)
                      }
                    }}>
                      <Avatar sx={{ 
                        width: 32, 
                        height: 32, 
                        bgcolor: alpha(CARD_COLORS.primary.border, 0.1),
                        color: CARD_COLORS.primary.border 
                      }}>
                        {activity.user.charAt(0)}
                      </Avatar>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="body2" fontWeight="medium" sx={{ color: CARD_COLORS.gray.text }}>
                          {activity.action}
                        </Typography>
                        <Typography variant="caption" sx={{ color: CARD_COLORS.gray.text }}>
                          {activity.device}
                        </Typography>
                      </Box>
                      <Typography variant="caption" sx={{ color: CARD_COLORS.gray.text }}>
                        {activity.time}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grow>

          {/* Quick Stats */}
          <Grow in={true} timeout={1500}>
            <Card sx={{ 
              flex: '1 1 400px', 
              borderRadius: 3, 
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
              backgroundColor: CARD_COLORS.primary.bg,
              border: `2px solid ${CARD_COLORS.primary.border}`,
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)'
              }
            }}>
              <CardHeader
                title={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ 
                      bgcolor: alpha(CARD_COLORS.primary.border, 0.1), 
                      color: CARD_COLORS.primary.border 
                    }}>
                      <SecurityIcon />
                    </Avatar>
                    <Typography variant="h6" sx={{ color: CARD_COLORS.primary.text }}>
                      Device Distribution
                    </Typography>
                  </Box>
                }
              />
              <CardContent>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2" gutterBottom sx={{ color: CARD_COLORS.primary.text }}>
                    Device Types Distribution
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                    {(dashboardData.deviceTypes || []).map((type, index) => (
                      <Box key={index}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                          <Typography variant="body2" sx={{ color: CARD_COLORS.primary.text }}>
                            {type.name}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant="body2" fontWeight="bold" sx={{ color: CARD_COLORS.primary.text }}>
                              {type.count}
                            </Typography>
                            <Chip
                              label={`${type.trend > 0 ? '+' : ''}${type.trend}%`}
                              size="small"
                              sx={{ 
                                height: 20,
                                bgcolor: type.trend > 0 ? CARD_COLORS.success.bg : CARD_COLORS.danger.bg,
                                color: type.trend > 0 ? CARD_COLORS.success.text : CARD_COLORS.danger.text,
                                border: `1px solid ${type.trend > 0 ? CARD_COLORS.success.border : CARD_COLORS.danger.border}`
                              }}
                            />
                          </Box>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={(type.count / 500) * 100}
                          sx={{ 
                            height: 6, 
                            borderRadius: 3,
                            bgcolor: alpha(type.color?.border || CARD_COLORS.primary.border, 0.1),
                            '& .MuiLinearProgress-bar': {
                              bgcolor: type.color?.border || CARD_COLORS.primary.border
                            }
                          }}
                        />
                      </Box>
                    ))}
                  </Box>
                </Box>
                
                <Divider sx={{ my: 2, borderColor: alpha(CARD_COLORS.primary.border, 0.3) }} />
                
                <Box>
                  <Typography variant="body2" gutterBottom sx={{ color: CARD_COLORS.primary.text }}>
                    Compliance Status
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ flex: 1 }}>
                      <LinearProgress
                        variant="determinate"
                        value={dashboardData.deviceHealth?.complianceScore || 0}
                        sx={{ 
                          height: 10, 
                          borderRadius: 5,
                          bgcolor: alpha(CARD_COLORS.success.border, 0.1),
                          '& .MuiLinearProgress-bar': {
                            bgcolor: CARD_COLORS.success.border
                          }
                        }}
                      />
                    </Box>
                    <Typography variant="h6" fontWeight="bold" sx={{ color: CARD_COLORS.success.text }}>
                      {dashboardData.deviceHealth?.complianceScore || 0}%
                    </Typography>
                  </Box>
                  <Typography variant="caption" sx={{ mt: 1, display: 'block', color: CARD_COLORS.primary.text }}>
                    FDA & HIPAA compliance score
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grow>
        </Box>

        {/* Footer */}
        <Fade in={true} timeout={1600}>
          <Box sx={{ 
            mt: 4, 
            pt: 2, 
            borderTop: `1px solid ${CARD_COLORS.gray.border}`,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <Typography variant="caption" sx={{ color: CARD_COLORS.gray.text }}>
              Device Hub Management System v2.1 • Data updates every 30 seconds
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Tooltip title="Export Dashboard Data">
                <IconButton size="small" sx={{ color: CARD_COLORS.gray.border }}>
                  <DownloadIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="System Information">
                <IconButton size="small" sx={{ color: CARD_COLORS.gray.border }}>
                  <InfoIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </Fade>
      </Box>
    </Fade>
  );
};

export default EnhancedDashboard;