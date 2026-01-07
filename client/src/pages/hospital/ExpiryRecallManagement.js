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
  FormControlLabel,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tabs,
  Tab,
  Alert,
  LinearProgress,
  Tooltip,
  Badge,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider
} from '@mui/material';
import {
  Update,
  Warning,
  NotificationsActive,
  CheckCircle,
  Pending,
  Error,
  History,
  Send,
  Download,
  Refresh,
  Info,
  LocalHospital,
  Person,
  Business,
  CalendarToday,
  Security,
  Assignment
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';

const DeviceUpdateRecall = () => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [recallDialogOpen, setRecallDialogOpen] = useState(false);
  const [selectedUpdate, setSelectedUpdate] = useState(null);
  const [selectedRecall, setSelectedRecall] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterSeverity, setFilterSeverity] = useState('all');

  // Dummy data for firmware updates
  const initialUpdates = [
    {
      id: 1,
      deviceName: 'Ventilator X200',
      currentVersion: 'v2.1.3',
      newVersion: 'v2.2.0',
      type: 'Firmware',
      status: 'available',
      priority: 'high',
      releaseDate: '2024-01-15',
      estimatedTime: '45 min',
      devicesAffected: 12,
      description: 'Security patches and performance improvements'
    },
    {
      id: 2,
      deviceName: 'Infusion Pump Pro',
      currentVersion: 'v1.5.2',
      newVersion: 'v1.6.0',
      type: 'Software',
      status: 'in-progress',
      priority: 'medium',
      releaseDate: '2024-01-10',
      estimatedTime: '30 min',
      devicesAffected: 8,
      description: 'New medication library and safety features'
    },
    {
      id: 3,
      deviceName: 'Patient Monitor V5',
      currentVersion: 'v3.0.1',
      newVersion: 'v3.1.0',
      type: 'Firmware',
      status: 'completed',
      priority: 'low',
      releaseDate: '2024-01-05',
      estimatedTime: '20 min',
      devicesAffected: 15,
      description: 'Bug fixes and UI improvements'
    },
    {
      id: 4,
      deviceName: 'Defibrillator A9',
      currentVersion: 'v4.0.0',
      newVersion: 'v4.0.1',
      type: 'Emergency',
      status: 'pending',
      priority: 'critical',
      releaseDate: '2024-01-18',
      estimatedTime: '15 min',
      devicesAffected: 5,
      description: 'Critical safety update'
    },
    {
      id: 5,
      deviceName: 'Anesthesia Machine',
      currentVersion: 'v2.8.0',
      newVersion: 'v2.9.0',
      type: 'Firmware',
      status: 'available',
      priority: 'high',
      releaseDate: '2024-01-12',
      estimatedTime: '60 min',
      devicesAffected: 7,
      description: 'Compliance updates and new protocols'
    }
  ];

  // Dummy data for FDA recalls
  const initialRecalls = [
    {
      id: 1,
      recallId: 'FDA-2024-001',
      deviceName: 'Blood Pressure Monitor BPM-100',
      manufacturer: 'MediTech Inc.',
      severity: 'Class I',
      status: 'active',
      issueDate: '2024-01-10',
      affectedUnits: 150,
      description: 'Potential inaccurate readings under certain conditions',
      actionRequired: 'Immediate discontinuation and return',
      alertsSent: {
        clinics: true,
        patients: false,
        vendors: true
      }
    },
    {
      id: 2,
      recallId: 'FDA-2024-002',
      deviceName: 'Portable Oxygen Concentrator',
      manufacturer: 'OxyCare Systems',
      severity: 'Class II',
      status: 'investigating',
      issueDate: '2024-01-08',
      affectedUnits: 89,
      description: 'Potential overheating issue',
      actionRequired: 'Inspect and monitor temperature',
      alertsSent: {
        clinics: true,
        patients: true,
        vendors: true
      }
    },
    {
      id: 3,
      recallId: 'FDA-2023-045',
      deviceName: 'ECG Monitor E-500',
      manufacturer: 'CardioSystems',
      severity: 'Class III',
      status: 'resolved',
      issueDate: '2023-12-15',
      affectedUnits: 45,
      description: 'Software calibration issue',
      actionRequired: 'Software update applied',
      alertsSent: {
        clinics: true,
        patients: true,
        vendors: true
      }
    },
    {
      id: 4,
      recallId: 'FDA-2024-003',
      deviceName: 'Insulin Pump SmartDose',
      manufacturer: 'Diabetech',
      severity: 'Class I',
      status: 'active',
      issueDate: '2024-01-14',
      affectedUnits: 200,
      description: 'Potential overdosing risk',
      actionRequired: 'Immediate recall and replacement',
      alertsSent: {
        clinics: true,
        patients: false,
        vendors: true
      }
    }
  ];

  // Dummy data for compliance logs
  const initialLogs = [
    {
      id: 1,
      timestamp: '2024-01-15 14:30:00',
      action: 'Update Deployed',
      device: 'Ventilator X200',
      user: 'Admin User',
      details: 'Firmware v2.2.0 successfully deployed to 12 devices'
    },
    {
      id: 2,
      timestamp: '2024-01-15 10:15:00',
      action: 'Recall Alert Sent',
      device: 'Blood Pressure Monitor BPM-100',
      user: 'System',
      details: 'Class I recall alert sent to all clinics and vendors'
    },
    {
      id: 3,
      timestamp: '2024-01-14 16:45:00',
      action: 'Compliance Check',
      device: 'All Devices',
      user: 'Auditor',
      details: 'Monthly compliance audit completed'
    },
    {
      id: 4,
      timestamp: '2024-01-14 09:20:00',
      action: 'Patient Notification',
      device: 'Portable Oxygen Concentrator',
      user: 'System',
      details: 'Recall notification sent to 89 patients'
    }
  ];

  const [updates, setUpdates] = useState(initialUpdates);
  const [recalls, setRecalls] = useState(initialRecalls);
  const [logs, setLogs] = useState(initialLogs);
  const [alertSettings, setAlertSettings] = useState({
    autoSendAlerts: true,
    notifyClinics: true,
    notifyPatients: true,
    notifyVendors: true,
    criticalThreshold: 'Class I'
  });

  // Load from localStorage on component mount
  useEffect(() => {
    const savedUpdates = localStorage.getItem('deviceUpdates');
    const savedRecalls = localStorage.getItem('deviceRecalls');
    const savedLogs = localStorage.getItem('complianceLogs');
    const savedSettings = localStorage.getItem('alertSettings');

    if (savedUpdates) setUpdates(JSON.parse(savedUpdates));
    if (savedRecalls) setRecalls(JSON.parse(savedRecalls));
    if (savedLogs) setLogs(JSON.parse(savedLogs));
    if (savedSettings) setAlertSettings(JSON.parse(savedSettings));
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('deviceUpdates', JSON.stringify(updates));
    localStorage.setItem('deviceRecalls', JSON.stringify(recalls));
    localStorage.setItem('complianceLogs', JSON.stringify(logs));
    localStorage.setItem('alertSettings', JSON.stringify(alertSettings));
  }, [updates, recalls, logs, alertSettings]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'available':
        return 'success';
      case 'in-progress':
        return 'warning';
      case 'completed':
        return 'primary';
      case 'pending':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'available':
        return <Download />;
      case 'in-progress':
        return <Refresh />;
      case 'completed':
        return <CheckCircle />;
      case 'pending':
        return <Pending />;
      default:
        return <Info />;
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Class I':
      case 'critical':
        return 'error';
      case 'Class II':
      case 'high':
        return 'warning';
      case 'Class III':
      case 'medium':
        return 'info';
      case 'low':
        return 'success';
      default:
        return 'default';
    }
  };

  const handleDeployUpdate = (updateId) => {
    setUpdates(prev => prev.map(update =>
      update.id === updateId
        ? { ...update, status: 'in-progress' }
        : update
    ));
    
    // Add to logs
    const update = updates.find(u => u.id === updateId);
    const newLog = {
      id: logs.length + 1,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      action: 'Update Deployment Started',
      device: update.deviceName,
      user: 'System',
      details: `Started deploying ${update.type} update to version ${update.newVersion}`
    };
    setLogs(prev => [newLog, ...prev]);
  };

  const handleSendRecallAlerts = (recallId, recipients) => {
    setRecalls(prev => prev.map(recall =>
      recall.id === recallId
        ? {
            ...recall,
            alertsSent: {
              ...recall.alertsSent,
              ...recipients
            }
          }
        : recall
    ));

    // Add to logs
    const recall = recalls.find(r => r.id === recallId);
    const recipientList = Object.entries(recipients)
      .filter(([_, sent]) => sent)
      .map(([key]) => key)
      .join(', ');
    
    const newLog = {
      id: logs.length + 1,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      action: 'Recall Alerts Sent',
      device: recall.deviceName,
      user: 'System',
      details: `Alerts sent to: ${recipientList}`
    };
    setLogs(prev => [newLog, ...prev]);
  };

  const handleAlertSettingChange = (setting, value) => {
    setAlertSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const filteredUpdates = updates.filter(update => {
    const matchesSearch = update.deviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         update.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || update.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const filteredRecalls = recalls.filter(recall => {
    const matchesSearch = recall.deviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         recall.manufacturer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeverity = filterSeverity === 'all' || recall.severity === filterSeverity;
    return matchesSearch && matchesSeverity;
  });

  // Statistics
  const updateStats = {
    total: updates.length,
    available: updates.filter(u => u.status === 'available').length,
    inProgress: updates.filter(u => u.status === 'in-progress').length,
    pending: updates.filter(u => u.status === 'pending').length
  };

  const recallStats = {
    total: recalls.length,
    classI: recalls.filter(r => r.severity === 'Class I').length,
    classII: recalls.filter(r => r.severity === 'Class II').length,
    active: recalls.filter(r => r.status === 'active').length
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: theme.palette.primary.main }}>
            <Update sx={{ verticalAlign: 'middle', mr: 2 }} />
            Device Update & Recall Management
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Manage firmware updates, track FDA recalls, and ensure regulatory compliance
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            startIcon={<Warning />}
            color="error"
            onClick={() => setRecallDialogOpen(true)}
          >
            New Recall Alert
          </Button>
          <Button
            variant="contained"
            startIcon={<Update />}
            onClick={() => setUpdateDialogOpen(true)}
          >
            Check for Updates
          </Button>
        </Box>
      </Box>

      {/* Stats Cards */}
{/* Stats Cards */}
<Box sx={{ display: 'flex', gap: 3, mb: 4 }}>
  {/* Pending Updates */}
  <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.25 }} style={{ flex: 1 }}>
    <Card
      sx={{
        borderRadius: 3,
        background: 'linear-gradient(180deg, #FFF8E1, #FFFFFF)',
        boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
        transition: 'all 0.3s ease'
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography sx={{ color: '#000', fontWeight: 500 }} gutterBottom>
              Pending Updates
            </Typography>
            <Typography variant="h4" sx={{ color: '#000', fontWeight: 700 }}>
              {updateStats.available + updateStats.pending}
            </Typography>
          </Box>

          <Avatar
            sx={{
              bgcolor: 'primary.light' ,
              width: 48,
              height: 48
            }}
          >
            <Pending />
          </Avatar>
        </Box>

        <LinearProgress
          variant="determinate"
          value={((updateStats.available + updateStats.pending) / updateStats.total) * 100}
          sx={{
            mt: 2,
            height: 6,
            borderRadius: 3,
            backgroundColor: '#FFE8A1',
            '& .MuiLinearProgress-bar': {
              backgroundColor: '#000'
            }
          }}
        />
      </CardContent>
    </Card>
  </motion.div>

  {/* Active Recalls */}
  <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.25 }} style={{ flex: 1 }}>
    <Card
      sx={{
        borderRadius: 3,
        background: 'linear-gradient(180deg, #FDECEA, #FFFFFF)',
        boxShadow: '0 10px 30px rgba(0,0,0,0.08)'
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography sx={{ color: '#000', fontWeight: 500 }} gutterBottom>
              Active Recalls
            </Typography>
            <Typography variant="h4" sx={{ color: '#000', fontWeight: 700 }}>
              {recallStats.active}
            </Typography>
          </Box>

          <Avatar
            sx={{
              bgcolor: 'primary.light' ,
              width: 48,
              height: 48
            }}
          >
            <Warning />
          </Avatar>
        </Box>

        <Typography variant="body2" sx={{ mt: 1, color: '#333' }}>
          {recallStats.classI} Class I, {recallStats.classII} Class II
        </Typography>
      </CardContent>
    </Card>
  </motion.div>

  {/* Compliance Score */}
  <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.25 }} style={{ flex: 1 }}>
    <Card
      sx={{
        borderRadius: 3,
        background: 'linear-gradient(180deg, #E9F7EF, #FFFFFF)',
        boxShadow: '0 10px 30px rgba(0,0,0,0.08)'
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography sx={{ color: '#000', fontWeight: 500 }} gutterBottom>
              Compliance Score
            </Typography>
            <Typography variant="h4" sx={{ color: '#000', fontWeight: 700 }}>
              98.5%
            </Typography>
          </Box>

          <Avatar
            sx={{
              bgcolor: 'primary.light',
              width: 48,
              height: 48
            }}
          >
            <Security />
          </Avatar>
        </Box>

        <Typography variant="body2" sx={{ mt: 1, color: '#333' }}>
          Last audit: Today
        </Typography>
      </CardContent>
    </Card>
  </motion.div>
</Box>


      {/* Main Content Tabs */}
      <Card sx={{ mb: 4 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="Firmware Updates" icon={<Update />} iconPosition="start" />
            <Tab label="FDA Recalls" icon={<Warning />} iconPosition="start" />
            <Tab label="Compliance Logs" icon={<Assignment />} iconPosition="start" />
            <Tab label="Alert Settings" icon={<NotificationsActive />} iconPosition="start" />
          </Tabs>
        </Box>

        <CardContent>
          <AnimatePresence mode="wait">
            {/* Firmware Updates Tab */}
            {tabValue === 0 && (
              <motion.div
                key="updates"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <TextField
                      placeholder="Search updates..."
                      size="small"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      sx={{ width: 300 }}
                    />
                    <FormControl size="small" sx={{ minWidth: 150 }}>
                      <InputLabel>Status</InputLabel>
                      <Select
                        value={filterStatus}
                        label="Status"
                        onChange={(e) => setFilterStatus(e.target.value)}
                      >
                        <MenuItem value="all">All Status</MenuItem>
                        <MenuItem value="available">Available</MenuItem>
                        <MenuItem value="in-progress">In Progress</MenuItem>
                        <MenuItem value="completed">Completed</MenuItem>
                        <MenuItem value="pending">Pending</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                  <Button
                    startIcon={<Refresh />}
                    onClick={() => {
                      // Simulate checking for new updates
                      const newUpdate = {
                        id: updates.length + 1,
                        deviceName: 'New Device',
                        currentVersion: 'v1.0.0',
                        newVersion: 'v1.1.0',
                        type: 'Software',
                        status: 'available',
                        priority: 'medium',
                        releaseDate: new Date().toISOString().split('T')[0],
                        estimatedTime: '25 min',
                        devicesAffected: 3,
                        description: 'New update available'
                      };
                      setUpdates(prev => [newUpdate, ...prev]);
                    }}
                  >
                    Check New Updates
                  </Button>
                </Box>

                <TableContainer component={Paper} variant="outlined">
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Device</TableCell>
                        <TableCell>Current Version</TableCell>
                        <TableCell>New Version</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Priority</TableCell>
                        <TableCell>Affected Devices</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredUpdates.map((update) => (
                        <TableRow 
                          key={update.id}
                          hover
                          sx={{ 
                            '&:hover': { 
                              backgroundColor: theme.palette.action.hover 
                            } 
                          }}
                        >
                          <TableCell>
                            <Typography fontWeight={500}>
                              {update.deviceName}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {update.description}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Chip 
                              label={update.currentVersion} 
                              size="small" 
                              variant="outlined"
                            />
                          </TableCell>
                          <TableCell>
                            <Chip 
                              label={update.newVersion} 
                              color="primary"
                              size="small"
                            />
                          </TableCell>
                          <TableCell>{update.type}</TableCell>
                          <TableCell>
                            <Chip
                              icon={getStatusIcon(update.status)}
                              label={update.status}
                              color={getStatusColor(update.status)}
                              size="small"
                            />
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={update.priority}
                              color={getSeverityColor(update.priority)}
                              size="small"
                            />
                          </TableCell>
                          <TableCell>
                            <Typography fontWeight={500}>
                              {update.devicesAffected}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            {update.status === 'available' && (
                              <Button
                                variant="contained"
                                size="small"
                                startIcon={<Download />}
                                onClick={() => handleDeployUpdate(update.id)}
                              >
                                Deploy
                              </Button>
                            )}
                            {update.status === 'in-progress' && (
                              <Button
                                variant="outlined"
                                size="small"
                                startIcon={<Refresh />}
                                disabled
                              >
                                Deploying...
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </motion.div>
            )}

            {/* FDA Recalls Tab */}
            {tabValue === 1 && (
              <motion.div
                key="recalls"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <TextField
                      placeholder="Search recalls..."
                      size="small"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      sx={{ width: 300 }}
                    />
                    <FormControl size="small" sx={{ minWidth: 150 }}>
                      <InputLabel>Severity</InputLabel>
                      <Select
                        value={filterSeverity}
                        label="Severity"
                        onChange={(e) => setFilterSeverity(e.target.value)}
                      >
                        <MenuItem value="all">All Severity</MenuItem>
                        <MenuItem value="Class I">Class I</MenuItem>
                        <MenuItem value="Class II">Class II</MenuItem>
                        <MenuItem value="Class III">Class III</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                  <Button
                    variant="outlined"
                    startIcon={<History />}
                    onClick={() => {
                      // Filter to show only resolved recalls
                      setFilterSeverity('all');
                      setSearchTerm('');
                    }}
                  >
                    View History
                  </Button>
                </Box>

                <TableContainer component={Paper} variant="outlined">
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Recall ID</TableCell>
                        <TableCell>Device & Manufacturer</TableCell>
                        <TableCell>Severity</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Affected Units</TableCell>
                        <TableCell>Alerts Sent</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredRecalls.map((recall) => (
                        <TableRow 
                          key={recall.id}
                          hover
                          sx={{ 
                            '&:hover': { 
                              backgroundColor: theme.palette.action.hover 
                            } 
                          }}
                        >
                          <TableCell>
                            <Typography fontWeight={500}>
                              {recall.recallId}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {new Date(recall.issueDate).toLocaleDateString()}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography fontWeight={500}>
                              {recall.deviceName}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {recall.manufacturer}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Chip
                              icon={<Warning />}
                              label={recall.severity}
                              color={getSeverityColor(recall.severity)}
                              size="small"
                            />
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={recall.status}
                              color={recall.status === 'active' ? 'error' : 'default'}
                              size="small"
                            />
                          </TableCell>
                          <TableCell>
                            <Typography fontWeight={500}>
                              {recall.affectedUnits}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', gap: 1 }}>
                              <Tooltip title={recall.alertsSent.clinics ? "Clinics notified" : "Notify clinics"}>
                                <Badge
                                  color={recall.alertsSent.clinics ? "success" : "default"}
                                  variant="dot"
                                >
                                  <LocalHospital color={recall.alertsSent.clinics ? "success" : "action"} />
                                </Badge>
                              </Tooltip>
                              <Tooltip title={recall.alertsSent.patients ? "Patients notified" : "Notify patients"}>
                                <Badge
                                  color={recall.alertsSent.patients ? "success" : "default"}
                                  variant="dot"
                                >
                                  <Person color={recall.alertsSent.patients ? "success" : "action"} />
                                </Badge>
                              </Tooltip>
                              <Tooltip title={recall.alertsSent.vendors ? "Vendors notified" : "Notify vendors"}>
                                <Badge
                                  color={recall.alertsSent.vendors ? "success" : "default"}
                                  variant="dot"
                                >
                                  <Business color={recall.alertsSent.vendors ? "success" : "action"} />
                                </Badge>
                              </Tooltip>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', gap: 1 }}>
                              <Button
                                size="small"
                                startIcon={<Send />}
                                onClick={() => handleSendRecallAlerts(recall.id, {
                                  clinics: true,
                                  patients: !recall.alertsSent.patients,
                                  vendors: true
                                })}
                                disabled={recall.alertsSent.clinics && recall.alertsSent.patients && recall.alertsSent.vendors}
                              >
                                Send Alerts
                              </Button>
                              <Button
                                size="small"
                                variant="outlined"
                                onClick={() => {
                                  setSelectedRecall(recall);
                                  setRecallDialogOpen(true);
                                }}
                              >
                                Details
                              </Button>
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </motion.div>
            )}

            {/* Compliance Logs Tab */}
            {tabValue === 2 && (
              <motion.div
                key="logs"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
                  Audit Trail & Compliance Logs
                </Typography>
                <List>
                  {logs.map((log) => (
                    <React.Fragment key={log.id}>
                      <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: theme.palette.primary.light }}>
                            <Assignment />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Typography fontWeight={500}>
                              {log.action} - {log.device}
                            </Typography>
                          }
                          secondary={
                            <>
                              <Typography component="span" variant="body2" color="text.primary">
                                {log.details}
                              </Typography>
                              <br />
                              <Typography component="span" variant="body2" color="text.secondary">
                                {log.timestamp} • By {log.user}
                              </Typography>
                            </>
                          }
                        />
                      </ListItem>
                      <Divider variant="inset" component="li" />
                    </React.Fragment>
                  ))}
                </List>
              </motion.div>
            )}

            {/* Alert Settings Tab */}
            {tabValue === 3 && (
              <motion.div
                key="settings"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
                  Alert Configuration & Settings
                </Typography>
                <Box sx={{ maxWidth: 600 }}>
                  <Card variant="outlined" sx={{ mb: 3 }}>
                    <CardContent>
                      <Typography variant="subtitle1" gutterBottom fontWeight={500}>
                        Automated Alert Settings
                      </Typography>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={alertSettings.autoSendAlerts}
                            onChange={(e) => handleAlertSettingChange('autoSendAlerts', e.target.checked)}
                          />
                        }
                        label="Automatically send alerts for critical updates and recalls"
                      />
                      <Divider sx={{ my: 2 }} />
                      <Typography variant="subtitle2" gutterBottom>
                        Notification Recipients
                      </Typography>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={alertSettings.notifyClinics}
                            onChange={(e) => handleAlertSettingChange('notifyClinics', e.target.checked)}
                          />
                        }
                        label="Notify Clinics & Departments"
                      />
                      <FormControlLabel
                        control={
                          <Switch
                            checked={alertSettings.notifyPatients}
                            onChange={(e) => handleAlertSettingChange('notifyPatients', e.target.checked)}
                          />
                        }
                        label="Notify Affected Patients"
                      />
                      <FormControlLabel
                        control={
                          <Switch
                            checked={alertSettings.notifyVendors}
                            onChange={(e) => handleAlertSettingChange('notifyVendors', e.target.checked)}
                          />
                        }
                        label="Notify Device Vendors"
                      />
                    </CardContent>
                  </Card>

                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="subtitle1" gutterBottom fontWeight={500}>
                        Threshold Settings
                      </Typography>
                      <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel>Critical Recall Threshold</InputLabel>
                        <Select
                          value={alertSettings.criticalThreshold}
                          label="Critical Recall Threshold"
                          onChange={(e) => handleAlertSettingChange('criticalThreshold', e.target.value)}
                        >
                          <MenuItem value="Class I">Class I Only</MenuItem>
                          <MenuItem value="Class II">Class II and Above</MenuItem>
                          <MenuItem value="Class III">All Recalls</MenuItem>
                        </Select>
                      </FormControl>
                      <Typography variant="body2" color="text.secondary">
                        Alerts will be automatically sent for recalls meeting or exceeding this severity level
                      </Typography>
                    </CardContent>
                  </Card>
                </Box>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Typography variant="h6" gutterBottom>
        Quick Actions
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <Button
          variant="outlined"
          startIcon={<CalendarToday />}
          onClick={() => {
            // Generate compliance report
            const newLog = {
              id: logs.length + 1,
              timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
              action: 'Compliance Report Generated',
              device: 'All Devices',
              user: 'System',
              details: 'Monthly compliance report generated for regulatory review'
            };
            setLogs(prev => [newLog, ...prev]);
          }}
        >
          Generate Compliance Report
        </Button>
        <Button
          variant="outlined"
          startIcon={<NotificationsActive />}
          onClick={() => {
            // Test alert system
            alert('Test alerts sent to all configured channels');
          }}
        >
          Test Alert System
        </Button>
        <Button
          variant="outlined"
          startIcon={<History />}
          onClick={() => {
            // Clear old logs (simulated)
            setLogs(logs.slice(0, 10));
          }}
        >
          Clear Old Logs
        </Button>
      </Box>

      {/* Dialogs */}
      {/* Update Details Dialog */}
      <Dialog 
        open={updateDialogOpen} 
        onClose={() => setUpdateDialogOpen(false)}
        maxWidth="md"
      >
        <DialogTitle>
          <Update sx={{ verticalAlign: 'middle', mr: 1 }} />
          Available Updates
        </DialogTitle>
        <DialogContent>
          <List>
            {updates
              .filter(u => u.status === 'available')
              .map((update) => (
                <React.Fragment key={update.id}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: 'primary.light' }}>
                        <Update />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={`${update.deviceName} - ${update.newVersion}`}
                      secondary={
                        <>
                          <Typography component="span" variant="body2">
                            {update.description}
                          </Typography>
                          <br />
                          <Typography component="span" variant="body2" color="text.secondary">
                            Priority: {update.priority} • Affects: {update.devicesAffected} devices • Time: {update.estimatedTime}
                          </Typography>
                        </>
                      }
                    />
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => {
                        handleDeployUpdate(update.id);
                        setUpdateDialogOpen(false);
                      }}
                    >
                      Deploy Now
                    </Button>
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
          </List>
          {updates.filter(u => u.status === 'available').length === 0 && (
            <Alert severity="info" sx={{ mt: 2 }}>
              No pending updates available at this time.
            </Alert>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setUpdateDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Recall Details Dialog */}
      <Dialog 
        open={recallDialogOpen} 
        onClose={() => setRecallDialogOpen(false)}
        maxWidth="md"
      >
        <DialogTitle>
          <Warning sx={{ verticalAlign: 'middle', mr: 1 }} />
          Recall Management
        </DialogTitle>
        <DialogContent>
          {selectedRecall ? (
            <Box sx={{ pt: 2 }}>
              <Typography variant="h6" gutterBottom color="error">
                {selectedRecall.recallId} - {selectedRecall.deviceName}
              </Typography>
              <Typography color="text.secondary" gutterBottom>
                Manufacturer: {selectedRecall.manufacturer}
              </Typography>
              <Alert severity="error" sx={{ my: 2 }}>
                <Typography fontWeight={500}>
                  Severity: {selectedRecall.severity} • Status: {selectedRecall.status}
                </Typography>
                <Typography variant="body2">
                  {selectedRecall.description}
                </Typography>
              </Alert>
              <Typography variant="subtitle2" gutterBottom>
                Required Action:
              </Typography>
              <Typography paragraph>
                {selectedRecall.actionRequired}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Affected Units: {selectedRecall.affectedUnits} • Issue Date: {selectedRecall.issueDate}
              </Typography>
            </Box>
          ) : (
            <Box sx={{ pt: 2 }}>
              <Typography paragraph>
                Create a new recall alert or select an existing recall to view details.
              </Typography>
              <Button
                variant="contained"
                color="error"
                fullWidth
                sx={{ mt: 2 }}
                onClick={() => {
                  // Add new recall
                  const newRecall = {
                    id: recalls.length + 1,
                    recallId: `FDA-2024-00${recalls.length + 1}`,
                    deviceName: 'New Device Recall',
                    manufacturer: 'Manufacturer Name',
                    severity: 'Class II',
                    status: 'investigating',
                    issueDate: new Date().toISOString().split('T')[0],
                    affectedUnits: 0,
                    description: 'New recall under investigation',
                    actionRequired: 'Monitor and report issues',
                    alertsSent: {
                      clinics: false,
                      patients: false,
                      vendors: false
                    }
                  };
                  setRecalls(prev => [newRecall, ...prev]);
                  setRecallDialogOpen(false);
                }}
              >
                Create New Recall Alert
              </Button>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRecallDialogOpen(false)}>Close</Button>
          {selectedRecall && (
            <Button
              variant="contained"
              color="error"
              startIcon={<Send />}
              onClick={() => {
                handleSendRecallAlerts(selectedRecall.id, {
                  clinics: true,
                  patients: true,
                  vendors: true
                });
                setRecallDialogOpen(false);
              }}
            >
              Send All Alerts
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DeviceUpdateRecall;