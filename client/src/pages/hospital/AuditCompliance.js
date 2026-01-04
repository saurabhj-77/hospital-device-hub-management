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
  CircularProgress,
  Checkbox,
  FormGroup,
  FormControlLabel
} from '@mui/material';
import {
  Security,
  Assignment,
  History,
  Warning,
  CheckCircle,
  Error,
  Search,
  FilterList,
  Download,
  Print,
  Share,
  CalendarToday,
  Person,
  DeviceHub,
  Lock,
  Visibility,
  VisibilityOff,
  Timeline,
  Assessment,
  GppGood,
  GppMaybe,
  GppBad,
  Archive,
  Refresh,
  Notifications,
  CloudUpload,
  CloudDownload,
  DataObject,
  Description
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const AuditCompliance = () => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const [reportDialogOpen, setReportDialogOpen] = useState(false);
  const [exportDialogOpen, setExportDialogOpen] = useState(false);
  const [selectedAudit, setSelectedAudit] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterUser, setFilterUser] = useState('all');
  const [filterDevice, setFilterDevice] = useState('all');
  const [filterAction, setFilterAction] = useState('all');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [roleFilter, setRoleFilter] = useState('all');
  const [exportFormat, setExportFormat] = useState('csv');
  const [exportSelection, setExportSelection] = useState([]);

  // Dummy data for audit logs
  const initialAuditLogs = [
    {
      id: 1,
      timestamp: '2024-01-15 14:32:15',
      userId: 'USR-001',
      userName: 'Dr. Sarah Johnson',
      role: 'Physician',
      deviceId: 'DEV-2023-045',
      deviceName: 'Ventilator X200',
      action: 'Configuration Change',
      details: 'Updated ventilation parameters',
      ipAddress: '192.168.1.45',
      location: 'ICU Room 304',
      severity: 'medium',
      compliance: 'FDA-21CFR-820',
      dataAccessed: true,
      patientData: true
    },
    {
      id: 2,
      timestamp: '2024-01-15 11:18:42',
      userId: 'USR-002',
      userName: 'Nurse Mark Davis',
      role: 'Nursing',
      deviceId: 'DEV-2023-128',
      deviceName: 'Infusion Pump Pro',
      action: 'Medication Administration',
      details: 'Administered Insulin via pump',
      ipAddress: '192.168.1.67',
      location: 'Ward B, Bed 12',
      severity: 'high',
      compliance: 'HIPAA-Secure',
      dataAccessed: true,
      patientData: true
    },
    {
      id: 3,
      timestamp: '2024-01-15 09:45:33',
      userId: 'USR-003',
      userName: 'Admin Michael Chen',
      role: 'Administrator',
      deviceId: 'SYSTEM',
      deviceName: 'Device Hub System',
      action: 'User Access Management',
      details: 'Added new physician user',
      ipAddress: '192.168.1.100',
      location: 'IT Department',
      severity: 'low',
      compliance: 'ISO-27001',
      dataAccessed: false,
      patientData: false
    },
    {
      id: 4,
      timestamp: '2024-01-14 16:22:18',
      userId: 'USR-004',
      userName: 'Biomed Tech Lisa Wong',
      role: 'Biomedical',
      deviceId: 'DEV-2023-089',
      deviceName: 'Patient Monitor V5',
      action: 'Maintenance Update',
      details: 'Performed scheduled calibration',
      ipAddress: '192.168.1.89',
      location: 'ER Room 102',
      severity: 'medium',
      compliance: 'FDA-21CFR-820',
      dataAccessed: false,
      patientData: false
    },
    {
      id: 5,
      timestamp: '2024-01-14 13:55:27',
      userId: 'USR-001',
      userName: 'Dr. Sarah Johnson',
      role: 'Physician',
      deviceId: 'DEV-2023-156',
      deviceName: 'Defibrillator A9',
      action: 'Emergency Device Usage',
      details: 'Emergency defibrillation administered',
      ipAddress: '192.168.1.22',
      location: 'Emergency Room',
      severity: 'critical',
      compliance: 'FDA-21CFR-870',
      dataAccessed: true,
      patientData: true
    },
    {
      id: 6,
      timestamp: '2024-01-14 10:12:44',
      userId: 'USR-005',
      userName: 'Compliance Officer Robert Miller',
      role: 'Compliance',
      deviceId: 'SYSTEM',
      deviceName: 'Device Hub System',
      action: 'Audit Review',
      details: 'Reviewed compliance logs for Q4 2023',
      ipAddress: '192.168.1.150',
      location: 'Compliance Office',
      severity: 'low',
      compliance: 'ISO-13485',
      dataAccessed: true,
      patientData: false
    },
    {
      id: 7,
      timestamp: '2024-01-13 17:30:19',
      userId: 'USR-006',
      userName: 'IT Admin David Wilson',
      role: 'IT',
      deviceId: 'SYSTEM',
      deviceName: 'Database Server',
      action: 'Data Export',
      details: 'Exported device usage logs for analysis',
      ipAddress: '192.168.1.200',
      location: 'Server Room',
      severity: 'high',
      compliance: 'HIPAA-Secure',
      dataAccessed: true,
      patientData: true
    },
    {
      id: 8,
      timestamp: '2024-01-13 15:48:52',
      userId: 'USR-002',
      userName: 'Nurse Mark Davis',
      role: 'Nursing',
      deviceId: 'DEV-2023-201',
      deviceName: 'Portable Oxygen Concentrator',
      action: 'Patient Monitoring',
      details: 'Monitored patient oxygen levels',
      ipAddress: '192.168.1.76',
      location: 'Ward A, Bed 8',
      severity: 'medium',
      compliance: 'FDA-21CFR-868',
      dataAccessed: true,
      patientData: true
    }
  ];

  // Dummy data for compliance certifications
  const initialCertifications = [
    {
      id: 1,
      deviceId: 'DEV-2023-045',
      deviceName: 'Ventilator X200',
      certification: 'FDA 510(k) Clearance',
      certNumber: 'K230045',
      issuedDate: '2023-03-15',
      expiryDate: '2026-03-15',
      status: 'valid',
      issuer: 'FDA',
      requirements: ['ISO 13485', '21 CFR 820', 'IEC 60601-1']
    },
    {
      id: 2,
      deviceId: 'DEV-2023-128',
      deviceName: 'Infusion Pump Pro',
      certification: 'CE Medical Device',
      certNumber: 'CE-MD-2023-128',
      issuedDate: '2023-05-20',
      expiryDate: '2025-05-20',
      status: 'valid',
      issuer: 'EU Commission',
      requirements: ['MDR 2017/745', 'ISO 14971']
    },
    {
      id: 3,
      deviceId: 'DEV-2023-156',
      deviceName: 'Defibrillator A9',
      certification: 'FDA PMA Approval',
      certNumber: 'P230156',
      issuedDate: '2023-02-10',
      expiryDate: '2028-02-10',
      status: 'valid',
      issuer: 'FDA',
      requirements: ['21 CFR 870', 'IEC 60601-2-4']
    },
    {
      id: 4,
      deviceId: 'DEV-2023-089',
      deviceName: 'Patient Monitor V5',
      certification: 'Health Canada License',
      certNumber: 'HC-MDL-2023-089',
      issuedDate: '2023-04-05',
      expiryDate: '2024-04-05',
      status: 'expiring-soon',
      issuer: 'Health Canada',
      requirements: ['SOR/98-282', 'ISO 80601-2-55']
    },
    {
      id: 5,
      deviceId: 'SYSTEM',
      deviceName: 'Device Hub System',
      certification: 'HIPAA Compliance',
      certNumber: 'HIPAA-2023-001',
      issuedDate: '2023-01-15',
      expiryDate: '2024-01-15',
      status: 'expired',
      issuer: 'Independent Auditor',
      requirements: ['45 CFR Part 160', '45 CFR Part 164']
    },
    {
      id: 6,
      deviceId: 'SYSTEM',
      deviceName: 'Device Hub Database',
      certification: 'ISO 27001',
      certNumber: 'ISO27K-2023-456',
      issuedDate: '2023-06-30',
      expiryDate: '2026-06-30',
      status: 'valid',
      issuer: 'ISO Certification Body',
      requirements: ['ISO/IEC 27001:2022', 'GDPR Compliance']
    }
  ];

  // Dummy data for compliance requirements
  const initialRequirements = [
    {
      id: 1,
      regulation: '21 CFR Part 820',
      title: 'Quality System Regulation',
      description: 'FDA requirements for medical device quality systems',
      status: 'compliant',
      lastAudit: '2023-12-15',
      nextAudit: '2024-06-15',
      responsible: 'Quality Manager'
    },
    {
      id: 2,
      regulation: 'HIPAA Privacy Rule',
      title: 'Protected Health Information',
      description: 'Requirements for handling patient health information',
      status: 'compliant',
      lastAudit: '2023-11-30',
      nextAudit: '2024-05-30',
      responsible: 'Privacy Officer'
    },
    {
      id: 3,
      regulation: '21 CFR Part 11',
      title: 'Electronic Records & Signatures',
      description: 'FDA requirements for electronic records and signatures',
      status: 'partial',
      lastAudit: '2023-10-20',
      nextAudit: '2024-04-20',
      responsible: 'IT Director'
    },
    {
      id: 4,
      regulation: 'ISO 13485:2016',
      title: 'Medical Devices Quality Management',
      description: 'International standard for medical device quality systems',
      status: 'compliant',
      lastAudit: '2023-09-15',
      nextAudit: '2024-09-15',
      responsible: 'Quality Manager'
    },
    {
      id: 5,
      regulation: 'MDR 2017/745',
      title: 'EU Medical Device Regulation',
      description: 'European Union medical device requirements',
      status: 'non-compliant',
      lastAudit: '2023-08-10',
      nextAudit: '2024-02-10',
      responsible: 'Regulatory Affairs'
    },
    {
      id: 6,
      regulation: 'IEC 60601-1',
      title: 'Medical Electrical Equipment Safety',
      description: 'International safety standard for medical equipment',
      status: 'compliant',
      lastAudit: '2023-07-25',
      nextAudit: '2024-01-25',
      responsible: 'Engineering Manager'
    }
  ];

  // Dummy data for access logs
  const initialAccessLogs = [
    {
      id: 1,
      userId: 'USR-001',
      userName: 'Dr. Sarah Johnson',
      accessTime: '2024-01-15 08:30:00',
      logoutTime: '2024-01-15 17:45:00',
      sessionDuration: '9h 15m',
      accessedModules: ['Device Inventory', 'Patient Monitoring', 'Reports'],
      ipAddress: '192.168.1.45',
      location: 'ICU Workstation',
      anomalies: 0
    },
    {
      id: 2,
      userId: 'USR-007',
      userName: 'Dr. James Wilson',
      accessTime: '2024-01-15 07:45:00',
      logoutTime: '2024-01-15 16:30:00',
      sessionDuration: '8h 45m',
      accessedModules: ['Device Care', 'Analytics'],
      ipAddress: '192.168.1.32',
      location: 'Surgery Department',
      anomalies: 2
    },
    {
      id: 3,
      userId: 'USR-003',
      userName: 'Admin Michael Chen',
      accessTime: '2024-01-15 06:00:00',
      logoutTime: '2024-01-15 18:00:00',
      sessionDuration: '12h 0m',
      accessedModules: ['All Modules'],
      ipAddress: '192.168.1.100',
      location: 'IT Department',
      anomalies: 0
    }
  ];

  // Dummy data for statistics
  const complianceStats = {
    overallScore: 92.5,
    totalAudits: 1567,
    criticalIssues: 3,
    pendingActions: 12,
    compliantRegulations: 18,
    nonCompliantRegulations: 2,
    certificationsValid: 45,
    certificationsExpiring: 3,
    certificationsExpired: 1
  };

  // Chart data
  const auditTrendData = [
    { month: 'Jul', audits: 120, compliance: 89 },
    { month: 'Aug', audits: 135, compliance: 91 },
    { month: 'Sep', audits: 142, compliance: 92 },
    { month: 'Oct', audits: 156, compliance: 93 },
    { month: 'Nov', audits: 168, compliance: 94 },
    { month: 'Dec', audits: 175, compliance: 95 },
    { month: 'Jan', audits: 182, compliance: 96 }
  ];

  const compliancePieData = [
    { name: 'Compliant', value: 18, color: theme.palette.success.main },
    { name: 'Partial', value: 4, color: theme.palette.warning.main },
    { name: 'Non-Compliant', value: 2, color: theme.palette.error.main }
  ];

  const [auditLogs, setAuditLogs] = useState(initialAuditLogs);
  const [certifications, setCertifications] = useState(initialCertifications);
  const [requirements, setRequirements] = useState(initialRequirements);
  const [accessLogs, setAccessLogs] = useState(initialAccessLogs);
  const [selectedLogs, setSelectedLogs] = useState([]);
  const [roleSettings, setRoleSettings] = useState({
    physician: { viewAudit: true, viewPatientData: true, export: false },
    nursing: { viewAudit: true, viewPatientData: true, export: false },
    admin: { viewAudit: true, viewPatientData: false, export: true },
    compliance: { viewAudit: true, viewPatientData: true, export: true },
    it: { viewAudit: true, viewPatientData: false, export: true }
  });

  // Load from localStorage
  useEffect(() => {
    const savedAuditLogs = localStorage.getItem('auditLogs');
    const savedCertifications = localStorage.getItem('complianceCertifications');
    const savedRequirements = localStorage.getItem('complianceRequirements');
    const savedAccessLogs = localStorage.getItem('accessLogs');

    if (savedAuditLogs) setAuditLogs(JSON.parse(savedAuditLogs));
    if (savedCertifications) setCertifications(JSON.parse(savedCertifications));
    if (savedRequirements) setRequirements(JSON.parse(savedRequirements));
    if (savedAccessLogs) setAccessLogs(JSON.parse(savedAccessLogs));
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('auditLogs', JSON.stringify(auditLogs));
    localStorage.setItem('complianceCertifications', JSON.stringify(certifications));
    localStorage.setItem('complianceRequirements', JSON.stringify(requirements));
    localStorage.setItem('accessLogs', JSON.stringify(accessLogs));
  }, [auditLogs, certifications, requirements, accessLogs]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
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

  const getComplianceColor = (status) => {
    switch (status) {
      case 'valid':
      case 'compliant':
        return 'success';
      case 'expiring-soon':
      case 'partial':
        return 'warning';
      case 'expired':
      case 'non-compliant':
        return 'error';
      default:
        return 'default';
    }
  };

  const getComplianceIcon = (status) => {
    switch (status) {
      case 'valid':
      case 'compliant':
        return <CheckCircle />;
      case 'expiring-soon':
      case 'partial':
        return <Warning />;
      case 'expired':
      case 'non-compliant':
        return <Error />;
      default:
        return <Assignment />;
    }
  };

  const filterAuditLogs = () => {
    return auditLogs.filter(log => {
      const matchesSearch = 
        log.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.deviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.details.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesUser = filterUser === 'all' || log.userId === filterUser;
      const matchesDevice = filterDevice === 'all' || log.deviceId === filterDevice;
      const matchesAction = filterAction === 'all' || log.action === filterAction;
      const matchesRole = roleFilter === 'all' || log.role === roleFilter;
      
      const logDate = new Date(log.timestamp.split(' ')[0]);
      const matchesDate = 
        (!dateRange.start || logDate >= new Date(dateRange.start)) &&
        (!dateRange.end || logDate <= new Date(dateRange.end));
      
      return matchesSearch && matchesUser && matchesDevice && matchesAction && matchesRole && matchesDate;
    });
  };

  const handleExport = () => {
    const dataToExport = exportSelection.length > 0 
      ? auditLogs.filter(log => exportSelection.includes(log.id))
      : filterAuditLogs();
    
    if (exportFormat === 'csv') {
      const csvContent = [
        ['Timestamp', 'User', 'Role', 'Device', 'Action', 'Details', 'IP Address', 'Location', 'Severity', 'Compliance'],
        ...dataToExport.map(log => [
          log.timestamp,
          log.userName,
          log.role,
          log.deviceName,
          log.action,
          log.details,
          log.ipAddress,
          log.location,
          log.severity,
          log.compliance
        ])
      ].map(row => row.join(',')).join('\n');
      
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `audit-report-${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
    } else {
      // PDF export simulation
      alert(`PDF report generated for ${dataToExport.length} records`);
    }
    
    setExportDialogOpen(false);
  };

  const handleSelectAllLogs = (checked) => {
    if (checked) {
      setSelectedLogs(filterAuditLogs().map(log => log.id));
    } else {
      setSelectedLogs([]);
    }
  };

  const handleSelectLog = (logId, checked) => {
    if (checked) {
      setSelectedLogs(prev => [...prev, logId]);
    } else {
      setSelectedLogs(prev => prev.filter(id => id !== logId));
    }
  };

  const getDaysUntilExpiry = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    return Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
  };

  const filteredAuditLogs = filterAuditLogs();

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: theme.palette.primary.main }}>
            <Security sx={{ verticalAlign: 'middle', mr: 2 }} />
            Audit & Compliance Center
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Regulatory adherence, audit trails, and governance management
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            startIcon={<Assessment />}
            onClick={() => setReportDialogOpen(true)}
          >
            Generate Report
          </Button>
          <Button
            variant="outlined"
            startIcon={<Download />}
            onClick={() => setExportDialogOpen(true)}
          >
            Export Data
          </Button>
        </Box>
      </Box>

      {/* Compliance Overview Cards */}
      <Box sx={{ display: 'flex', gap: 3, mb: 4, flexWrap: 'wrap' }}>
        <motion.div whileHover={{ scale: 1.02 }} style={{ flex: 1, minWidth: 200 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="text.secondary" gutterBottom>
                    Overall Compliance Score
                  </Typography>
                  <Typography variant="h4" color="success.main">
                    {complianceStats.overallScore}%
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'success.light' }}>
                  <GppGood />
                </Avatar>
              </Box>
              <LinearProgress 
                variant="determinate" 
                value={complianceStats.overallScore}
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
                    Critical Issues
                  </Typography>
                  <Typography variant="h4" color="error.main">
                    {complianceStats.criticalIssues}
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'error.light' }}>
                  <GppBad />
                </Avatar>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {complianceStats.pendingActions} actions pending
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
                    Certifications Status
                  </Typography>
                  <Typography variant="h4">
                    {complianceStats.certificationsValid}
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'info.light' }}>
                  <Assignment />
                </Avatar>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {complianceStats.certificationsExpiring} expiring soon
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
                    Total Audit Records
                  </Typography>
                  <Typography variant="h4">
                    {complianceStats.totalAudits.toLocaleString()}
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'primary.light' }}>
                  <History />
                </Avatar>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Last 30 days: {auditLogs.filter(log => 
                    new Date(log.timestamp) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
                    ).length}
              </Typography>
            </CardContent>
          </Card>
        </motion.div>
      </Box>

      {/* Charts Section */}
      <Box sx={{ display: 'flex', gap: 3, mb: 4 }}>
        <Card sx={{ flex: 2 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Audit Activity Trend
            </Typography>
            <Box sx={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={auditTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
                  <XAxis dataKey="month" stroke={theme.palette.text.secondary} />
                  <YAxis yAxisId="left" stroke={theme.palette.primary.main} />
                  <YAxis yAxisId="right" orientation="right" stroke={theme.palette.success.main} />
                  <RechartsTooltip />
                  <Line yAxisId="left" type="monotone" dataKey="audits" stroke={theme.palette.primary.main} strokeWidth={2} dot={{ r: 4 }} />
                  <Line yAxisId="right" type="monotone" dataKey="compliance" stroke={theme.palette.success.main} strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </CardContent>
        </Card>

        <Card sx={{ flex: 1 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Compliance Status
            </Typography>
            <Box sx={{ height: 300, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={compliancePieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {compliancePieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip />
                </PieChart>
              </ResponsiveContainer>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mt: 2 }}>
              {compliancePieData.map((item, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ width: 12, height: 12, backgroundColor: item.color, borderRadius: '50%' }} />
                  <Typography variant="body2">{item.name}: {item.value}</Typography>
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* Main Content Tabs */}
      <Card sx={{ mb: 4 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="Audit Trails" icon={<History />} iconPosition="start" />
            <Tab label="Certifications" icon={<Assignment />} iconPosition="start" />
            <Tab label="Compliance Requirements" icon={<Security />} iconPosition="start" />
            <Tab label="Access Logs" icon={<Visibility />} iconPosition="start" />
          </Tabs>
        </Box>

        <CardContent>
          <AnimatePresence mode="wait">
            {/* Audit Trails Tab */}
            {tabValue === 0 && (
              <motion.div
                key="audit"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
                    <TextField
                      placeholder="Search audit logs..."
                      size="small"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      sx={{ width: 250 }}
                      InputProps={{
                        startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />
                      }}
                    />
                    <FormControl size="small" sx={{ minWidth: 150 }}>
                      <InputLabel>User</InputLabel>
                      <Select
                        value={filterUser}
                        label="User"
                        onChange={(e) => setFilterUser(e.target.value)}
                      >
                        <MenuItem value="all">All Users</MenuItem>
                        {[...new Set(auditLogs.map(log => log.userId))].map(userId => (
                          <MenuItem key={userId} value={userId}>
                            {auditLogs.find(log => log.userId === userId)?.userName}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl size="small" sx={{ minWidth: 150 }}>
                      <InputLabel>Device</InputLabel>
                      <Select
                        value={filterDevice}
                        label="Device"
                        onChange={(e) => setFilterDevice(e.target.value)}
                      >
                        <MenuItem value="all">All Devices</MenuItem>
                        {[...new Set(auditLogs.map(log => log.deviceId))].map(deviceId => (
                          <MenuItem key={deviceId} value={deviceId}>
                            {auditLogs.find(log => log.deviceId === deviceId)?.deviceName}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl size="small" sx={{ minWidth: 150 }}>
                      <InputLabel>Action Type</InputLabel>
                      <Select
                        value={filterAction}
                        label="Action Type"
                        onChange={(e) => setFilterAction(e.target.value)}
                      >
                        <MenuItem value="all">All Actions</MenuItem>
                        {[...new Set(auditLogs.map(log => log.action))].map(action => (
                          <MenuItem key={action} value={action}>{action}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Tooltip title="Clear Filters">
                      <IconButton onClick={() => {
                        setSearchTerm('');
                        setFilterUser('all');
                        setFilterDevice('all');
                        setFilterAction('all');
                        setDateRange({ start: '', end: '' });
                      }}>
                        <Refresh />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>

                {/* Date Range Filter */}
                <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                  <TextField
                    label="Start Date"
                    type="date"
                    size="small"
                    InputLabelProps={{ shrink: true }}
                    value={dateRange.start}
                    onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                  />
                  <TextField
                    label="End Date"
                    type="date"
                    size="small"
                    InputLabelProps={{ shrink: true }}
                    value={dateRange.end}
                    onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                  />
                  <FormControl size="small" sx={{ minWidth: 150 }}>
                    <InputLabel>Role Filter</InputLabel>
                    <Select
                      value={roleFilter}
                      label="Role Filter"
                      onChange={(e) => setRoleFilter(e.target.value)}
                    >
                      <MenuItem value="all">All Roles</MenuItem>
                      <MenuItem value="Physician">Physician</MenuItem>
                      <MenuItem value="Nursing">Nursing</MenuItem>
                      <MenuItem value="Administrator">Administrator</MenuItem>
                      <MenuItem value="Biomedical">Biomedical</MenuItem>
                      <MenuItem value="Compliance">Compliance</MenuItem>
                      <MenuItem value="IT">IT</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                <TableContainer component={Paper} variant="outlined">
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={selectedLogs.length === filteredAuditLogs.length && filteredAuditLogs.length > 0}
                            indeterminate={selectedLogs.length > 0 && selectedLogs.length < filteredAuditLogs.length}
                            onChange={(e) => handleSelectAllLogs(e.target.checked)}
                          />
                        </TableCell>
                        <TableCell>Timestamp</TableCell>
                        <TableCell>User</TableCell>
                        <TableCell>Device</TableCell>
                        <TableCell>Action</TableCell>
                        <TableCell>Details</TableCell>
                        <TableCell>Severity</TableCell>
                        <TableCell>Compliance</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredAuditLogs.map((log) => (
                        <TableRow 
                          key={log.id}
                          hover
                          sx={{ 
                            '&:hover': { 
                              backgroundColor: theme.palette.action.hover 
                            },
                            backgroundColor: selectedLogs.includes(log.id) ? theme.palette.action.selected : 'inherit'
                          }}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={selectedLogs.includes(log.id)}
                              onChange={(e) => handleSelectLog(log.id, e.target.checked)}
                            />
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2">
                              {new Date(log.timestamp).toLocaleDateString()}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {new Date(log.timestamp).toLocaleTimeString()}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Avatar sx={{ width: 24, height: 24, fontSize: 12 }}>
                                {log.userName.split(' ').map(n => n[0]).join('')}
                              </Avatar>
                              <Box>
                                <Typography variant="body2" fontWeight={500}>
                                  {log.userName}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  {log.role}
                                </Typography>
                              </Box>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <DeviceHub fontSize="small" color="action" />
                              <Box>
                                <Typography variant="body2">{log.deviceName}</Typography>
                                <Typography variant="caption" color="text.secondary">
                                  {log.deviceId}
                                </Typography>
                              </Box>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2">
                              {log.action}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2">
                              {log.details}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {log.location}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={log.severity}
                              color={getSeverityColor(log.severity)}
                              size="small"
                            />
                          </TableCell>
                          <TableCell>
                            <Chip
                              icon={getComplianceIcon('compliant')}
                              label={log.compliance}
                              size="small"
                              variant="outlined"
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
                  Showing {filteredAuditLogs.length} of {auditLogs.length} audit records
                </Typography>
              </motion.div>
            )}

            {/* Certifications Tab */}
            {tabValue === 1 && (
              <motion.div
                key="certifications"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
                  Device Certifications & Approvals
                </Typography>
                <TableContainer component={Paper} variant="outlined">
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Device</TableCell>
                        <TableCell>Certification</TableCell>
                        <TableCell>Issuer</TableCell>
                        <TableCell>Issued Date</TableCell>
                        <TableCell>Expiry Date</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Requirements</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {certifications.map((cert) => {
                        const daysUntilExpiry = getDaysUntilExpiry(cert.expiryDate);
                        return (
                          <TableRow key={cert.id} hover>
                            <TableCell>
                              <Typography fontWeight={500}>
                                {cert.deviceName}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {cert.deviceId}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography fontWeight={500}>
                                {cert.certification}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {cert.certNumber}
                              </Typography>
                            </TableCell>
                            <TableCell>{cert.issuer}</TableCell>
                            <TableCell>
                              {new Date(cert.issuedDate).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                {new Date(cert.expiryDate).toLocaleDateString()}
                                {daysUntilExpiry <= 90 && cert.status !== 'expired' && (
                                  <Chip
                                    label={`${daysUntilExpiry}d`}
                                    color="warning"
                                    size="small"
                                  />
                                )}
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Chip
                                icon={getComplianceIcon(cert.status)}
                                label={cert.status}
                                color={getComplianceColor(cert.status)}
                                size="small"
                              />
                            </TableCell>
                            <TableCell>
                              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {cert.requirements.slice(0, 2).map((req, idx) => (
                                  <Chip
                                    key={idx}
                                    label={req}
                                    size="small"
                                    variant="outlined"
                                  />
                                ))}
                                {cert.requirements.length > 2 && (
                                  <Tooltip title={cert.requirements.slice(2).join(', ')}>
                                    <Chip
                                      label={`+${cert.requirements.length - 2}`}
                                      size="small"
                                    />
                                  </Tooltip>
                                )}
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Button
                                size="small"
                                startIcon={<Description />}
                                onClick={() => {
                                  // View certificate details
                                  alert(`Certificate Details:\n\nDevice: ${cert.deviceName}\nCertification: ${cert.certification}\nStatus: ${cert.status}`);
                                }}
                              >
                                View
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </motion.div>
            )}

            {/* Compliance Requirements Tab */}
            {tabValue === 2 && (
              <motion.div
                key="requirements"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
                  Regulatory Compliance Requirements
                </Typography>
                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: 3 }}>
                  {requirements.map((req) => (
                    <motion.div key={req.id} whileHover={{ scale: 1.02 }}>
                      <Card>
                        <CardContent>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                            <Box>
                              <Typography variant="subtitle1" fontWeight={500}>
                                {req.regulation}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {req.title}
                              </Typography>
                            </Box>
                            <Chip
                              icon={getComplianceIcon(req.status)}
                              label={req.status}
                              color={getComplianceColor(req.status)}
                              size="small"
                            />
                          </Box>
                          
                          <Typography variant="body2" paragraph>
                            {req.description}
                          </Typography>
                          
                          <Divider sx={{ my: 2 }} />
                          
                          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Box>
                              <Typography variant="caption" color="text.secondary">
                                Last Audit
                              </Typography>
                              <Typography variant="body2">
                                {new Date(req.lastAudit).toLocaleDateString()}
                              </Typography>
                            </Box>
                            <Box>
                              <Typography variant="caption" color="text.secondary">
                                Next Audit
                              </Typography>
                              <Typography variant="body2">
                                {new Date(req.nextAudit).toLocaleDateString()}
                              </Typography>
                            </Box>
                            <Box>
                              <Typography variant="caption" color="text.secondary">
                                Responsible
                              </Typography>
                              <Typography variant="body2">
                                {req.responsible}
                              </Typography>
                            </Box>
                          </Box>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </Box>
              </motion.div>
            )}

            {/* Access Logs Tab */}
            {tabValue === 3 && (
              <motion.div
                key="access"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
                  User Access & Session Logs
                </Typography>
                <TableContainer component={Paper} variant="outlined">
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>User</TableCell>
                        <TableCell>Access Time</TableCell>
                        <TableCell>Session Duration</TableCell>
                        <TableCell>Accessed Modules</TableCell>
                        <TableCell>IP Address</TableCell>
                        <TableCell>Location</TableCell>
                        <TableCell>Anomalies</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {accessLogs.map((log) => (
                        <TableRow key={log.id} hover>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Avatar sx={{ width: 32, height: 32, fontSize: 14 }}>
                                {log.userName.split(' ').map(n => n[0]).join('')}
                              </Avatar>
                              <Box>
                                <Typography fontWeight={500}>{log.userName}</Typography>
                                <Typography variant="caption" color="text.secondary">
                                  {log.userId}
                                </Typography>
                              </Box>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2">
                              {new Date(log.accessTime).toLocaleDateString()}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {new Date(log.accessTime).toLocaleTimeString()}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={log.sessionDuration}
                              color={log.anomalies > 0 ? 'warning' : 'success'}
                              size="small"
                            />
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                              {log.accessedModules.map((module, idx) => (
                                <Chip
                                  key={idx}
                                  label={module}
                                  size="small"
                                  variant="outlined"
                                />
                              ))}
                            </Box>
                          </TableCell>
                          <TableCell>{log.ipAddress}</TableCell>
                          <TableCell>{log.location}</TableCell>
                          <TableCell>
                            {log.anomalies > 0 ? (
                              <Chip
                                icon={<Warning />}
                                label={`${log.anomalies} detected`}
                                color="warning"
                                size="small"
                              />
                            ) : (
                              <Chip
                                icon={<CheckCircle />}
                                label="Normal"
                                color="success"
                                size="small"
                              />
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>

      {/* Role-based Visibility Settings */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Visibility />
            Role-based Visibility Settings
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Configure what different user roles can see in the audit and compliance modules
          </Typography>
          <TableContainer component={Paper} variant="outlined">
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>User Role</TableCell>
                  <TableCell align="center">View Audit Logs</TableCell>
                  <TableCell align="center">View Patient Data</TableCell>
                  <TableCell align="center">Export Reports</TableCell>
                  <TableCell align="center">Manage Certifications</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.entries(roleSettings).map(([role, settings]) => (
                  <TableRow key={role}>
                    <TableCell>
                      <Typography fontWeight={500}>
                        {role.charAt(0).toUpperCase() + role.slice(1)}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Switch
                        checked={settings.viewAudit}
                        onChange={(e) => setRoleSettings(prev => ({
                          ...prev,
                          [role]: { ...prev[role], viewAudit: e.target.checked }
                        }))}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Switch
                        checked={settings.viewPatientData}
                        onChange={(e) => setRoleSettings(prev => ({
                          ...prev,
                          [role]: { ...prev[role], viewPatientData: e.target.checked }
                        }))}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Switch
                        checked={settings.export}
                        onChange={(e) => setRoleSettings(prev => ({
                          ...prev,
                          [role]: { ...prev[role], export: e.target.checked }
                        }))}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Switch
                        checked={role === 'admin' || role === 'compliance'}
                        disabled
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Upcoming Expirations */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Notifications color="warning" />
            Upcoming Certification Expirations
          </Typography>
          <Alert severity="warning" sx={{ mb: 2 }}>
            {certifications.filter(cert => {
              const days = getDaysUntilExpiry(cert.expiryDate);
              return days <= 90 && cert.status !== 'expired';
            }).length} certifications will expire within the next 90 days
          </Alert>
          <List>
            {certifications
              .filter(cert => {
                const days = getDaysUntilExpiry(cert.expiryDate);
                return days <= 90 && cert.status !== 'expired';
              })
              .map((cert) => (
                <React.Fragment key={cert.id}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: 'warning.light' }}>
                        <CalendarToday />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={`${cert.deviceName} - ${cert.certification}`}
                      secondary={`Expires on ${new Date(cert.expiryDate).toLocaleDateString()} (${getDaysUntilExpiry(cert.expiryDate)} days remaining)`}
                    />
                    <ListItemSecondaryAction>
                      <Button size="small" color="warning">
                        Renew Now
                      </Button>
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
          </List>
        </CardContent>
      </Card>

      {/* Export Dialog */}
      <Dialog open={exportDialogOpen} onClose={() => setExportDialogOpen(false)}>
        <DialogTitle>Export Audit Data</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2, minWidth: 400 }}>
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>Export Format</InputLabel>
              <Select
                value={exportFormat}
                label="Export Format"
                onChange={(e) => setExportFormat(e.target.value)}
              >
                <MenuItem value="csv">CSV (Excel Compatible)</MenuItem>
                <MenuItem value="pdf">PDF Report</MenuItem>
                <MenuItem value="json">JSON Data</MenuItem>
              </Select>
            </FormControl>

            <Typography variant="subtitle2" gutterBottom>
              Export Selection
            </Typography>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={exportSelection.length === 0}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setExportSelection([]);
                      } else {
                        setExportSelection(selectedLogs);
                      }
                    }}
                  />
                }
                label="Export all filtered records"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={exportSelection.length > 0}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setExportSelection(selectedLogs.length > 0 ? selectedLogs : []);
                      } else {
                        setExportSelection([]);
                      }
                    }}
                  />
                }
                label={`Export selected records (${selectedLogs.length} selected)`}
                disabled={selectedLogs.length === 0}
              />
            </FormGroup>

            <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
              {exportSelection.length > 0 
                ? `Will export ${exportSelection.length} selected records`
                : `Will export ${filteredAuditLogs.length} filtered records`
              }
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setExportDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleExport}>
            Export Data
          </Button>
        </DialogActions>
      </Dialog>

      {/* Report Generation Dialog */}
      <Dialog 
        open={reportDialogOpen} 
        onClose={() => setReportDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Generate Compliance Report</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Report Title"
              defaultValue="Compliance Audit Report - Q1 2024"
              sx={{ mb: 3 }}
            />
            
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>Report Period</InputLabel>
              <Select defaultValue="last-month" label="Report Period">
                <MenuItem value="last-week">Last Week</MenuItem>
                <MenuItem value="last-month">Last Month</MenuItem>
                <MenuItem value="last-quarter">Last Quarter</MenuItem>
                <MenuItem value="last-year">Last Year</MenuItem>
                <MenuItem value="custom">Custom Range</MenuItem>
              </Select>
            </FormControl>

            <Typography variant="subtitle2" gutterBottom>
              Include Sections
            </Typography>
            <FormGroup>
              <FormControlLabel control={<Checkbox defaultChecked />} label="Audit Trail Summary" />
              <FormControlLabel control={<Checkbox defaultChecked />} label="Compliance Status" />
              <FormControlLabel control={<Checkbox defaultChecked />} label="Certification Status" />
              <FormControlLabel control={<Checkbox />} label="Access Log Analysis" />
              <FormControlLabel control={<Checkbox />} label="Recommendations" />
            </FormGroup>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setReportDialogOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            startIcon={<Description />}
            onClick={() => {
              alert('Compliance report is being generated...');
              setReportDialogOpen(false);
            }}
          >
            Generate Report
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AuditCompliance;