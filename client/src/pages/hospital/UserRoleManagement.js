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
  Collapse,
  InputAdornment,
  Menu,
  Popover
} from '@mui/material';
import {
  Person,
  Security,
  Group,
  AdminPanelSettings,
  LocalHospital,
  MedicalServices,
  Science,
  Inventory,
  Assignment,
  Visibility,
  Edit,
  Delete,
  Add,
  Search,
  FilterList,
  Download,
  Print,
  Refresh,
  History,
  Lock,
  LockOpen,
  VerifiedUser,
  PersonAdd,
  PersonRemove,
  GroupAdd,
  GroupRemove,
  Key,
  KeyOff,
  Settings,
  Checklist,
  PendingActions,
  CheckCircle,
  Cancel,
  MoreVert,
  Email,
  Phone,
  CalendarToday,
  Business,
  School,
  Badge as BadgeIcon,
  Dashboard,
  Analytics,
  DeviceHub,
  Warning,
  Error,
  Info
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';

const UserRoleManagement = () => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const [userDialogOpen, setUserDialogOpen] = useState(false);
  const [roleDialogOpen, setRoleDialogOpen] = useState(false);
  const [accessRequestDialogOpen, setAccessRequestDialogOpen] = useState(false);
  const [permissionDialogOpen, setPermissionDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [showInactive, setShowInactive] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [accessRequestStep, setAccessRequestStep] = useState(0);
  const [permissionMatrix, setPermissionMatrix] = useState({});

  // User data
  const initialUsers = [
    {
      id: 1,
      userId: 'USR-001',
      username: 'sarah.johnson',
      email: 'sarah.johnson@hospital.org',
      fullName: 'Dr. Sarah Johnson',
      role: 'doctor',
      department: 'ICU',
      status: 'active',
      lastLogin: '2024-01-15 14:30',
      joinDate: '2022-06-15',
      phone: '+1 (555) 123-4567',
      permissions: ['view-devices', 'edit-patient-data', 'view-analytics'],
      mfaEnabled: true,
      accessLevel: 'clinical'
    },
    {
      id: 2,
      userId: 'USR-002',
      username: 'mark.davis',
      email: 'mark.davis@hospital.org',
      fullName: 'Nurse Mark Davis',
      role: 'nurse',
      department: 'ER',
      status: 'active',
      lastLogin: '2024-01-15 11:20',
      joinDate: '2021-09-10',
      phone: '+1 (555) 987-6543',
      permissions: ['view-devices', 'basic-edits', 'view-reports'],
      mfaEnabled: false,
      accessLevel: 'clinical'
    },
    {
      id: 3,
      userId: 'USR-003',
      username: 'admin.michael',
      email: 'michael.chen@hospital.org',
      fullName: 'Michael Chen',
      role: 'admin',
      department: 'IT',
      status: 'active',
      lastLogin: '2024-01-15 06:45',
      joinDate: '2020-03-22',
      phone: '+1 (555) 456-7890',
      permissions: ['full-access', 'user-management', 'system-config'],
      mfaEnabled: true,
      accessLevel: 'administrative'
    },
    {
      id: 4,
      userId: 'USR-004',
      username: 'lisa.wong',
      email: 'lisa.wong@hospital.org',
      fullName: 'Lisa Wong',
      role: 'clinic-manager',
      department: 'Surgery',
      status: 'active',
      lastLogin: '2024-01-14 16:15',
      joinDate: '2021-11-05',
      phone: '+1 (555) 234-5678',
      permissions: ['device-management', 'reports', 'budget-view'],
      mfaEnabled: true,
      accessLevel: 'managerial'
    },
    {
      id: 5,
      userId: 'USR-005',
      username: 'robert.miller',
      email: 'robert.miller@meditech.com',
      fullName: 'Robert Miller',
      role: 'vendor',
      department: 'External',
      status: 'active',
      lastLogin: '2024-01-14 10:30',
      joinDate: '2023-01-15',
      phone: '+1 (555) 876-5432',
      permissions: ['view-devices', 'submit-reports', 'limited-access'],
      mfaEnabled: false,
      accessLevel: 'external'
    },
    {
      id: 6,
      userId: 'USR-006',
      username: 'maria.garcia',
      email: 'maria.garcia@hospital.org',
      fullName: 'Dr. Maria Garcia',
      role: 'researcher',
      department: 'Research',
      status: 'active',
      lastLogin: '2024-01-13 09:15',
      joinDate: '2022-08-20',
      phone: '+1 (555) 345-6789',
      permissions: ['view-data', 'analytics', 'export-data'],
      mfaEnabled: true,
      accessLevel: 'research'
    },
    {
      id: 7,
      userId: 'USR-007',
      username: 'david.wilson',
      email: 'david.wilson@hospital.org',
      fullName: 'David Wilson',
      role: 'doctor',
      department: 'Cardiology',
      status: 'inactive',
      lastLogin: '2023-12-20 08:45',
      joinDate: '2021-05-30',
      phone: '+1 (555) 567-8901',
      permissions: ['view-devices', 'edit-patient-data'],
      mfaEnabled: false,
      accessLevel: 'clinical'
    },
    {
      id: 8,
      userId: 'USR-008',
      username: 'susan.chen',
      email: 'susan.chen@biomed.com',
      fullName: 'Susan Chen',
      role: 'vendor',
      department: 'External',
      status: 'pending',
      lastLogin: null,
      joinDate: '2024-01-10',
      phone: '+1 (555) 678-9012',
      permissions: ['pending-access'],
      mfaEnabled: false,
      accessLevel: 'external'
    }
  ];

  // Role definitions with permissions
  const initialRoles = [
    {
      id: 1,
      roleId: 'ROLE-001',
      name: 'Admin',
      description: 'Full system access including user management and configuration',
      userCount: 3,
      permissions: {
        dashboard: ['view', 'edit', 'configure'],
        devices: ['view', 'edit', 'delete', 'allocate'],
        inventory: ['view', 'edit', 'restock', 'audit'],
        analytics: ['view', 'export', 'configure'],
        patients: ['view', 'edit', 'delete'],
        users: ['view', 'edit', 'delete', 'create'],
        settings: ['view', 'edit'],
        reports: ['view', 'generate', 'export']
      },
      accessLevel: 'administrative',
      default: false,
      canDelete: false
    },
    {
      id: 2,
      roleId: 'ROLE-002',
      name: 'Doctor',
      description: 'Clinical staff with patient care and device usage permissions',
      userCount: 24,
      permissions: {
        dashboard: ['view'],
        devices: ['view', 'request', 'use'],
        inventory: ['view'],
        analytics: ['view'],
        patients: ['view', 'edit'],
        users: ['view'],
        settings: [],
        reports: ['view', 'generate']
      },
      accessLevel: 'clinical',
      default: true,
      canDelete: false
    },
    {
      id: 3,
      roleId: 'ROLE-003',
      name: 'Nurse',
      description: 'Nursing staff with device operation and basic data entry permissions',
      userCount: 56,
      permissions: {
        dashboard: ['view'],
        devices: ['view', 'use'],
        inventory: ['view'],
        analytics: [],
        patients: ['view', 'basic-edit'],
        users: [],
        settings: [],
        reports: ['view']
      },
      accessLevel: 'clinical',
      default: true,
      canDelete: false
    },
    {
      id: 4,
      roleId: 'ROLE-004',
      name: 'Clinic Manager',
      description: 'Department managers with resource allocation and reporting permissions',
      userCount: 8,
      permissions: {
        dashboard: ['view', 'edit'],
        devices: ['view', 'allocate', 'manage'],
        inventory: ['view', 'restock'],
        analytics: ['view', 'export'],
        patients: ['view'],
        users: ['view'],
        settings: ['view'],
        reports: ['view', 'generate', 'export']
      },
      accessLevel: 'managerial',
      default: false,
      canDelete: false
    },
    {
      id: 5,
      roleId: 'ROLE-005',
      name: 'Vendor',
      description: 'External vendors with limited device monitoring and reporting access',
      userCount: 12,
      permissions: {
        dashboard: ['view'],
        devices: ['view'],
        inventory: ['view'],
        analytics: [],
        patients: [],
        users: [],
        settings: [],
        reports: ['view', 'submit']
      },
      accessLevel: 'external',
      default: false,
      canDelete: true
    },
    {
      id: 6,
      roleId: 'ROLE-006',
      name: 'Researcher',
      description: 'Research staff with data analytics and export permissions',
      userCount: 6,
      permissions: {
        dashboard: ['view'],
        devices: ['view'],
        inventory: ['view'],
        analytics: ['view', 'export'],
        patients: ['view-anonymized'],
        users: [],
        settings: [],
        reports: ['view', 'export']
      },
      accessLevel: 'research',
      default: false,
      canDelete: true
    }
  ];

  // Access requests
  const initialAccessRequests = [
    {
      id: 1,
      requestId: 'REQ-2024-001',
      userId: 'USR-008',
      userName: 'Susan Chen',
      role: 'vendor',
      department: 'External',
      requestedBy: 'susan.chen@biomed.com',
      requestDate: '2024-01-10',
      status: 'pending',
      reason: 'New vendor access for device maintenance',
      reviewer: null,
      reviewDate: null,
      permissionsRequested: ['view-devices', 'submit-reports']
    },
    {
      id: 2,
      requestId: 'REQ-2024-002',
      userId: 'USR-009',
      userName: 'John Smith',
      role: 'doctor',
      department: 'Pediatrics',
      requestedBy: 'john.smith@hospital.org',
      requestDate: '2024-01-12',
      status: 'approved',
      reason: 'New department transfer',
      reviewer: 'Michael Chen',
      reviewDate: '2024-01-13',
      permissionsRequested: ['view-devices', 'edit-patient-data', 'view-analytics']
    },
    {
      id: 3,
      requestId: 'REQ-2024-003',
      userId: 'USR-010',
      userName: 'Emma Wilson',
      role: 'nurse',
      department: 'ICU',
      requestedBy: 'emma.wilson@hospital.org',
      requestDate: '2024-01-14',
      status: 'rejected',
      reason: 'Temporary access for training',
      reviewer: 'Lisa Wong',
      reviewDate: '2024-01-15',
      permissionsRequested: ['view-devices', 'basic-edits']
    },
    {
      id: 4,
      requestId: 'REQ-2024-004',
      userId: 'USR-011',
      userName: 'Alex Rodriguez',
      role: 'researcher',
      department: 'Research',
      requestedBy: 'alex.rodriguez@university.edu',
      requestDate: '2024-01-15',
      status: 'pending',
      reason: 'Research collaboration data access',
      reviewer: null,
      reviewDate: null,
      permissionsRequested: ['view-data', 'analytics', 'export-data']
    }
  ];

  // Audit logs
  const initialAuditLogs = [
    {
      id: 1,
      timestamp: '2024-01-15 10:30:15',
      action: 'User Created',
      target: 'USR-008 (Susan Chen)',
      performedBy: 'Michael Chen',
      details: 'New vendor account created',
      ipAddress: '192.168.1.100'
    },
    {
      id: 2,
      timestamp: '2024-01-15 09:15:42',
      action: 'Role Updated',
      target: 'Doctor Role',
      performedBy: 'Admin System',
      details: 'Added new analytics permission',
      ipAddress: '192.168.1.100'
    },
    {
      id: 3,
      timestamp: '2024-01-14 16:45:33',
      action: 'Access Request Approved',
      target: 'REQ-2024-002',
      performedBy: 'Michael Chen',
      details: 'Doctor role assigned to John Smith',
      ipAddress: '192.168.1.150'
    },
    {
      id: 4,
      timestamp: '2024-01-14 14:20:18',
      action: 'User Deactivated',
      target: 'USR-007 (David Wilson)',
      performedBy: 'Lisa Wong',
      details: 'Account deactivated due to departure',
      ipAddress: '192.168.1.89'
    }
  ];

  // Departments
  const departments = [
    { id: 'all', name: 'All Departments' },
    { id: 'ICU', name: 'Intensive Care Unit' },
    { id: 'ER', name: 'Emergency Room' },
    { id: 'Surgery', name: 'Surgery Department' },
    { id: 'Cardiology', name: 'Cardiology' },
    { id: 'Pediatrics', name: 'Pediatrics' },
    { id: 'Radiology', name: 'Radiology' },
    { id: 'Research', name: 'Research' },
    { id: 'IT', name: 'IT Department' },
    { id: 'External', name: 'External/Vendor' }
  ];

  // Permission categories
  const permissionCategories = [
    {
      id: 'dashboard',
      name: 'Dashboard',
      description: 'Access to dashboard and overview screens',
      permissions: ['view', 'edit', 'configure']
    },
    {
      id: 'devices',
      name: 'Device Management',
      description: 'Access to device operations and management',
      permissions: ['view', 'edit', 'delete', 'allocate', 'request', 'use', 'manage']
    },
    {
      id: 'inventory',
      name: 'Inventory',
      description: 'Access to inventory and supply management',
      permissions: ['view', 'edit', 'restock', 'audit']
    },
    {
      id: 'analytics',
      name: 'Analytics',
      description: 'Access to data analytics and insights',
      permissions: ['view', 'export', 'configure']
    },
    {
      id: 'patients',
      name: 'Patient Data',
      description: 'Access to patient information and records',
      permissions: ['view', 'edit', 'delete', 'basic-edit', 'view-anonymized']
    },
    {
      id: 'users',
      name: 'User Management',
      description: 'Access to user accounts and roles',
      permissions: ['view', 'edit', 'delete', 'create']
    },
    {
      id: 'settings',
      name: 'System Settings',
      description: 'Access to system configuration',
      permissions: ['view', 'edit']
    },
    {
      id: 'reports',
      name: 'Reports',
      description: 'Access to reporting features',
      permissions: ['view', 'generate', 'export', 'submit']
    }
  ];

  const [users, setUsers] = useState(initialUsers);
  const [roles, setRoles] = useState(initialRoles);
  const [accessRequests, setAccessRequests] = useState(initialAccessRequests);
  const [auditLogs, setAuditLogs] = useState(initialAuditLogs);
  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    fullName: '',
    role: '',
    department: '',
    phone: '',
    sendWelcomeEmail: true,
    generatePassword: true
  });
  const [newRole, setNewRole] = useState({
    name: '',
    description: '',
    permissions: {}
  });

  // Load from localStorage
  useEffect(() => {
    const savedUsers = localStorage.getItem('systemUsers');
    const savedRoles = localStorage.getItem('systemRoles');
    const savedRequests = localStorage.getItem('accessRequests');
    const savedLogs = localStorage.getItem('userAuditLogs');

    if (savedUsers) setUsers(JSON.parse(savedUsers));
    if (savedRoles) setRoles(JSON.parse(savedRoles));
    if (savedRequests) setAccessRequests(JSON.parse(savedRequests));
    if (savedLogs) setAuditLogs(JSON.parse(savedLogs));
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('systemUsers', JSON.stringify(users));
    localStorage.setItem('systemRoles', JSON.stringify(roles));
    localStorage.setItem('accessRequests', JSON.stringify(accessRequests));
    localStorage.setItem('userAuditLogs', JSON.stringify(auditLogs));
  }, [users, roles, accessRequests, auditLogs]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin':
        return 'error';
      case 'doctor':
        return 'primary';
      case 'nurse':
        return 'secondary';
      case 'clinic-manager':
        return 'warning';
      case 'vendor':
        return 'info';
      case 'researcher':
        return 'success';
      default:
        return 'default';
    }
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'admin':
        return <AdminPanelSettings />;
      case 'doctor':
        return <MedicalServices />;
      case 'nurse':
        return <LocalHospital />;
      case 'clinic-manager':
        return <Business />;
      case 'vendor':
        return <Inventory />;
      case 'researcher':
        return <Science />;
      default:
        return <Person />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'inactive':
        return 'error';
      case 'pending':
        return 'warning';
      default:
        return 'default';
    }
  };

  const getAccessLevelColor = (level) => {
    switch (level) {
      case 'administrative':
        return 'error';
      case 'clinical':
        return 'primary';
      case 'managerial':
        return 'warning';
      case 'research':
        return 'success';
      case 'external':
        return 'info';
      default:
        return 'default';
    }
  };

  const handleAddUser = () => {
    const newId = users.length + 1;
    const userToAdd = {
      id: newId,
      userId: `USR-${(1000 + newId).toString().slice(1)}`,
      username: newUser.username,
      email: newUser.email,
      fullName: newUser.fullName,
      role: newUser.role,
      department: newUser.department,
      status: 'active',
      lastLogin: null,
      joinDate: new Date().toISOString().split('T')[0],
      phone: newUser.phone,
      permissions: roles.find(r => r.name.toLowerCase() === newUser.role)?.permissions || [],
      mfaEnabled: false,
      accessLevel: getAccessLevelFromRole(newUser.role)
    };

    setUsers(prev => [...prev, userToAdd]);
    
    // Add audit log
    const newLog = {
      id: auditLogs.length + 1,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      action: 'User Created',
      target: `${userToAdd.userId} (${userToAdd.fullName})`,
      performedBy: 'System Admin',
      details: 'New user account created',
      ipAddress: '192.168.1.100'
    };
    setAuditLogs(prev => [newLog, ...prev]);
    
    setUserDialogOpen(false);
    setNewUser({
      username: '',
      email: '',
      fullName: '',
      role: '',
      department: '',
      phone: '',
      sendWelcomeEmail: true,
      generatePassword: true
    });
  };

  const getAccessLevelFromRole = (role) => {
    switch (role) {
      case 'admin':
        return 'administrative';
      case 'doctor':
      case 'nurse':
        return 'clinical';
      case 'clinic-manager':
        return 'managerial';
      case 'researcher':
        return 'research';
      case 'vendor':
        return 'external';
      default:
        return 'basic';
    }
  };

  const handleToggleUserStatus = (userId, newStatus) => {
    setUsers(prev => prev.map(user =>
      user.id === userId
        ? { ...user, status: newStatus }
        : user
    ));

    const user = users.find(u => u.id === userId);
    const newLog = {
      id: auditLogs.length + 1,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      action: newStatus === 'active' ? 'User Activated' : 'User Deactivated',
      target: `${user.userId} (${user.fullName})`,
      performedBy: 'System Admin',
      details: `User status changed to ${newStatus}`,
      ipAddress: '192.168.1.100'
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  const handleToggleMFA = (userId) => {
    setUsers(prev => prev.map(user =>
      user.id === userId
        ? { ...user, mfaEnabled: !user.mfaEnabled }
        : user
    ));
  };

  const handleAddRole = () => {
    const newId = roles.length + 1;
    const roleToAdd = {
      id: newId,
      roleId: `ROLE-${(1000 + newId).toString().slice(1)}`,
      name: newRole.name,
      description: newRole.description,
      userCount: 0,
      permissions: newRole.permissions,
      accessLevel: 'custom',
      default: false,
      canDelete: true
    };

    setRoles(prev => [...prev, roleToAdd]);
    
    // Add audit log
    const newLog = {
      id: auditLogs.length + 1,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      action: 'Role Created',
      target: newRole.name,
      performedBy: 'System Admin',
      details: 'New custom role created',
      ipAddress: '192.168.1.100'
    };
    setAuditLogs(prev => [newLog, ...prev]);
    
    setRoleDialogOpen(false);
    setNewRole({
      name: '',
      description: '',
      permissions: {}
    });
  };

  const handleUpdatePermissions = (roleId, category, permission, checked) => {
    setRoles(prev => prev.map(role => {
      if (role.id === roleId) {
        const currentPermissions = role.permissions[category] || [];
        let newPermissions;
        
        if (checked) {
          newPermissions = [...currentPermissions, permission];
        } else {
          newPermissions = currentPermissions.filter(p => p !== permission);
        }
        
        return {
          ...role,
          permissions: {
            ...role.permissions,
            [category]: newPermissions
          }
        };
      }
      return role;
    }));

    const role = roles.find(r => r.id === roleId);
    const newLog = {
      id: auditLogs.length + 1,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      action: 'Permissions Updated',
      target: role.name,
      performedBy: 'System Admin',
      details: `${permission} permission ${checked ? 'added to' : 'removed from'} ${category}`,
      ipAddress: '192.168.1.100'
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  const handleReviewAccessRequest = (requestId, status) => {
    setAccessRequests(prev => prev.map(request =>
      request.id === requestId
        ? {
            ...request,
            status,
            reviewer: 'Michael Chen',
            reviewDate: new Date().toISOString().split('T')[0]
          }
        : request
    ));

    const request = accessRequests.find(r => r.id === requestId);
    if (status === 'approved') {
      // Add user if approved
      const newId = users.length + 1;
      const userToAdd = {
        id: newId,
        userId: request.userId,
        username: request.requestedBy.split('@')[0],
        email: request.requestedBy,
        fullName: request.userName,
        role: request.role,
        department: request.department,
        status: 'active',
        lastLogin: null,
        joinDate: new Date().toISOString().split('T')[0],
        phone: '',
        permissions: request.permissionsRequested,
        mfaEnabled: false,
        accessLevel: getAccessLevelFromRole(request.role)
      };
      setUsers(prev => [...prev, userToAdd]);
    }

    const newLog = {
      id: auditLogs.length + 1,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      action: `Access Request ${status === 'approved' ? 'Approved' : 'Rejected'}`,
      target: request.requestId,
      performedBy: 'Michael Chen',
      details: `Access request for ${request.userName} was ${status}`,
      ipAddress: '192.168.1.150'
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    const matchesDepartment = filterDepartment === 'all' || user.department === filterDepartment;
    const matchesInactive = showInactive || user.status !== 'inactive';
    
    return matchesSearch && matchesRole && matchesStatus && matchesDepartment && matchesInactive;
  });

  // Statistics
  const stats = {
    totalUsers: users.length,
    activeUsers: users.filter(u => u.status === 'active').length,
    pendingUsers: users.filter(u => u.status === 'pending').length,
    totalRoles: roles.length,
    pendingRequests: accessRequests.filter(r => r.status === 'pending').length,
    mfaEnabled: users.filter(u => u.mfaEnabled).length
  };

  const handleMenuOpen = (event, user) => {
    setAnchorEl(event.currentTarget);
    setSelectedUser(user);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedUser(null);
  };

  const getRoleDashboard = (role) => {
    const dashboards = {
      admin: ['System Overview', 'User Management', 'Audit Logs', 'Configuration'],
      doctor: ['Patient Dashboard', 'Device Status', 'Clinical Reports', 'Schedule'],
      nurse: ['Patient Monitoring', 'Device Usage', 'Shift Reports', 'Alerts'],
      'clinic-manager': ['Department Overview', 'Resource Allocation', 'Performance Reports', 'Budget'],
      vendor: ['Device Status', 'Service Requests', 'Reports', 'Inventory'],
      researcher: ['Data Analytics', 'Research Projects', 'Export Tools', 'Publications']
    };
    return dashboards[role] || ['Dashboard', 'Reports'];
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: theme.palette.primary.main }}>
            <Security sx={{ verticalAlign: 'middle', mr: 2 }} />
            User & Role Management
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Manage user access, roles, and permissions across the Device Hub platform
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            startIcon={<PersonAdd />}
            onClick={() => setUserDialogOpen(true)}
          >
            Add User
          </Button>
          <Button
            variant="outlined"
            startIcon={<GroupAdd />}
            onClick={() => setRoleDialogOpen(true)}
          >
            Create Role
          </Button>
        </Box>
      </Box>

      {/* Stats Cards */}
      <Box sx={{ display: 'flex', gap: 3, mb: 4, flexWrap: 'wrap' }}>
        <motion.div whileHover={{ scale: 1.02 }} style={{ flex: 1, minWidth: 200 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="text.secondary" gutterBottom>
                    Total Users
                  </Typography>
                  <Typography variant="h4">
                    {stats.totalUsers}
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'primary.light' }}>
                  <Group />
                </Avatar>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {stats.activeUsers} active • {stats.pendingUsers} pending
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
                    Security Status
                  </Typography>
                  <Typography variant="h4" color="success.main">
                    {stats.mfaEnabled}
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'success.light' }}>
                  <VerifiedUser />
                </Avatar>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                MFA enabled users
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
                    Access Requests
                  </Typography>
                  <Typography variant="h4" color="warning.main">
                    {stats.pendingRequests}
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'warning.light' }}>
                  <PendingActions />
                </Avatar>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Pending review
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
                    System Roles
                  </Typography>
                  <Typography variant="h4">
                    {stats.totalRoles}
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'info.light' }}>
                  <Assignment />
                </Avatar>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Custom roles: {roles.filter(r => !r.default).length}
              </Typography>
            </CardContent>
          </Card>
        </motion.div>
      </Box>

      {/* Main Content Tabs */}
      <Card sx={{ mb: 4 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="User Management" icon={<Person />} iconPosition="start" />
            <Tab label="Role Management" icon={<Security />} iconPosition="start" />
            <Tab label="Access Requests" icon={<PendingActions />} iconPosition="start" />
            <Tab label="Audit Logs" icon={<History />} iconPosition="start" />
          </Tabs>
        </Box>

        <CardContent>
          <AnimatePresence mode="wait">
            {/* User Management Tab */}
            {tabValue === 0 && (
              <motion.div
                key="users"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
                    <TextField
                      placeholder="Search users..."
                      size="small"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      sx={{ width: 250 }}
                      InputProps={{
                        startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />
                      }}
                    />
                    
                    <FormControl size="small" sx={{ minWidth: 150 }}>
                      <InputLabel>Role</InputLabel>
                      <Select
                        value={filterRole}
                        label="Role"
                        onChange={(e) => setFilterRole(e.target.value)}
                      >
                        <MenuItem value="all">All Roles</MenuItem>
                        <MenuItem value="admin">Admin</MenuItem>
                        <MenuItem value="doctor">Doctor</MenuItem>
                        <MenuItem value="nurse">Nurse</MenuItem>
                        <MenuItem value="clinic-manager">Clinic Manager</MenuItem>
                        <MenuItem value="vendor">Vendor</MenuItem>
                        <MenuItem value="researcher">Researcher</MenuItem>
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
                        <MenuItem value="inactive">Inactive</MenuItem>
                        <MenuItem value="pending">Pending</MenuItem>
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

                    <FormControlLabel
                      control={
                        <Switch
                          checked={showInactive}
                          onChange={(e) => setShowInactive(e.target.checked)}
                          size="small"
                        />
                      }
                      label="Show Inactive"
                    />
                  </Box>

                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Tooltip title="Refresh">
                      <IconButton>
                        <Refresh />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Export">
                      <IconButton>
                        <Download />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>

                <TableContainer component={Paper} variant="outlined">
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>User</TableCell>
                        <TableCell>Role</TableCell>
                        <TableCell>Department</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Last Login</TableCell>
                        <TableCell>Security</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredUsers.map((user) => (
                        <TableRow 
                          key={user.id}
                          hover
                          sx={{ 
                            '&:hover': { 
                              backgroundColor: theme.palette.action.hover 
                            },
                            opacity: user.status === 'inactive' ? 0.7 : 1
                          }}
                        >
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                              <Avatar sx={{ bgcolor: theme.palette.primary.light }}>
                                {user.fullName.split(' ').map(n => n[0]).join('')}
                              </Avatar>
                              <Box>
                                <Typography fontWeight={500}>
                                  {user.fullName}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  {user.email}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  ID: {user.userId}
                                </Typography>
                              </Box>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              {getRoleIcon(user.role)}
                              <Chip
                                label={user.role}
                                color={getRoleColor(user.role)}
                                size="small"
                              />
                            </Box>
                          </TableCell>
                          <TableCell>{user.department}</TableCell>
                          <TableCell>
                            <Chip
                              label={user.status}
                              color={getStatusColor(user.status)}
                              size="small"
                            />
                          </TableCell>
                          <TableCell>
                            {user.lastLogin ? (
                              <>
                                <Typography variant="body2">
                                  {new Date(user.lastLogin).toLocaleDateString()}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  {new Date(user.lastLogin).toLocaleTimeString()}
                                </Typography>
                              </>
                            ) : (
                              <Typography variant="body2" color="text.secondary">
                                Never logged in
                              </Typography>
                            )}
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', gap: 1 }}>
                              <Tooltip title={user.mfaEnabled ? "MFA Enabled" : "MFA Disabled"}>
                                <IconButton
                                  size="small"
                                  onClick={() => handleToggleMFA(user.id)}
                                  color={user.mfaEnabled ? "success" : "default"}
                                >
                                  {user.mfaEnabled ? <Lock /> : <LockOpen />}
                                </IconButton>
                              </Tooltip>
                              <Chip
                                label={user.accessLevel}
                                size="small"
                                variant="outlined"
                                color={getAccessLevelColor(user.accessLevel)}
                              />
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', gap: 0.5 }}>
                              <Tooltip title="Edit User">
                                <IconButton
                                  size="small"
                                  onClick={() => {
                                    setSelectedUser(user);
                                    setUserDialogOpen(true);
                                  }}
                                >
                                  <Edit />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="View Permissions">
                                <IconButton
                                  size="small"
                                  onClick={() => {
                                    setSelectedUser(user);
                                    setPermissionDialogOpen(true);
                                  }}
                                >
                                  <Visibility />
                                </IconButton>
                              </Tooltip>
                              <IconButton
                                size="small"
                                onClick={(e) => handleMenuOpen(e, user)}
                              >
                                <MoreVert />
                              </IconButton>
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
                  Showing {filteredUsers.length} of {users.length} users
                </Typography>
              </motion.div>
            )}

            {/* Role Management Tab */}
            {tabValue === 1 && (
              <motion.div
                key="roles"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                  <Typography variant="h6">
                    System Roles & Permissions
                  </Typography>
                  <Button
                    variant="contained"
                    startIcon={<GroupAdd />}
                    onClick={() => setRoleDialogOpen(true)}
                  >
                    Create New Role
                  </Button>
                </Box>

                <Grid container spacing={3}>
                  {roles.map((role) => (
                    <Grid item xs={12} md={6} key={role.id}>
                      <motion.div whileHover={{ scale: 1.02 }}>
                        <Card>
                          <CardContent>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                              <Box>
                                <Typography variant="h6" gutterBottom>
                                  {role.name}
                                  {role.default && (
                                    <Chip
                                      label="Default"
                                      size="small"
                                      sx={{ ml: 1 }}
                                    />
                                  )}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" paragraph>
                                  {role.description}
                                </Typography>
                              </Box>
                              <Chip
                                label={`${role.userCount} users`}
                                color="primary"
                                size="small"
                              />
                            </Box>

                            <Typography variant="subtitle2" gutterBottom>
                              Key Permissions
                            </Typography>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
                              {Object.entries(role.permissions).map(([category, perms]) => (
                                perms.length > 0 && (
                                  <Chip
                                    key={category}
                                    label={`${category}: ${perms.length}`}
                                    size="small"
                                    variant="outlined"
                                  />
                                )
                              ))}
                            </Box>

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <Chip
                                label={role.accessLevel}
                                color={getAccessLevelColor(role.accessLevel)}
                                size="small"
                              />
                              <Box sx={{ display: 'flex', gap: 1 }}>
                                <Button
                                  size="small"
                                  startIcon={<Edit />}
                                  onClick={() => {
                                    setSelectedRole(role);
                                    setPermissionDialogOpen(true);
                                  }}
                                >
                                  Edit Permissions
                                </Button>
                                {role.canDelete && (
                                  <Button
                                    size="small"
                                    color="error"
                                    startIcon={<Delete />}
                                    onClick={() => {
                                      if (window.confirm(`Delete role "${role.name}"?`)) {
                                        setRoles(prev => prev.filter(r => r.id !== role.id));
                                      }
                                    }}
                                  >
                                    Delete
                                  </Button>
                                )}
                              </Box>
                            </Box>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </Grid>
                  ))}
                </Grid>

                {/* Permission Matrix */}
                <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
                  Permission Matrix
                </Typography>
                <Card variant="outlined">
                  <CardContent>
                    <TableContainer>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell>Permission Category</TableCell>
                            {roles.map(role => (
                              <TableCell key={role.id} align="center">
                                {role.name}
                              </TableCell>
                            ))}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {permissionCategories.map((category) => (
                            <TableRow key={category.id}>
                              <TableCell>
                                <Box>
                                  <Typography variant="body2" fontWeight={500}>
                                    {category.name}
                                  </Typography>
                                  <Typography variant="caption" color="text.secondary">
                                    {category.description}
                                  </Typography>
                                </Box>
                              </TableCell>
                              {roles.map(role => (
                                <TableCell key={role.id} align="center">
                                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                                    {(role.permissions[category.id] || []).map(perm => (
                                      <Chip
                                        key={perm}
                                        label={perm}
                                        size="small"
                                        variant="outlined"
                                        sx={{ fontSize: '0.7rem' }}
                                      />
                                    ))}
                                    {(!role.permissions[category.id] || role.permissions[category.id].length === 0) && (
                                      <Typography variant="caption" color="text.secondary">
                                        No access
                                      </Typography>
                                    )}
                                  </Box>
                                </TableCell>
                              ))}
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Access Requests Tab */}
            {tabValue === 2 && (
              <motion.div
                key="requests"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                  <Typography variant="h6">
                    Access Requests
                  </Typography>
                  <Button
                    variant="outlined"
                    startIcon={<PersonAdd />}
                    onClick={() => setAccessRequestDialogOpen(true)}
                  >
                    New Access Request
                  </Button>
                </Box>

                <Stepper activeStep={accessRequestStep} orientation="vertical" sx={{ mb: 3 }}>
                  <Step>
                    <StepLabel>Submit Request</StepLabel>
                    <StepContent>
                      <Typography>
                        User submits access request with required permissions
                      </Typography>
                    </StepContent>
                  </Step>
                  <Step>
                    <StepLabel>Review & Approval</StepLabel>
                    <StepContent>
                      <Typography>
                        Admin reviews request and approves/rejects based on policies
                      </Typography>
                    </StepContent>
                  </Step>
                  <Step>
                    <StepLabel>Account Provisioning</StepLabel>
                    <StepContent>
                      <Typography>
                        System provisions account and notifies user
                      </Typography>
                    </StepContent>
                  </Step>
                </Stepper>

                <TableContainer component={Paper} variant="outlined">
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Request ID</TableCell>
                        <TableCell>Applicant</TableCell>
                        <TableCell>Role Requested</TableCell>
                        <TableCell>Department</TableCell>
                        <TableCell>Request Date</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {accessRequests.map((request) => (
                        <TableRow key={request.id} hover>
                          <TableCell>
                            <Typography fontWeight={500}>
                              {request.requestId}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography fontWeight={500}>
                              {request.userName}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {request.requestedBy}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={request.role}
                              color={getRoleColor(request.role)}
                              size="small"
                            />
                          </TableCell>
                          <TableCell>{request.department}</TableCell>
                          <TableCell>
                            {new Date(request.requestDate).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={request.status}
                              color={
                                request.status === 'approved' ? 'success' :
                                request.status === 'rejected' ? 'error' : 'warning'
                              }
                              size="small"
                            />
                            {request.reviewer && (
                              <Typography variant="caption" display="block" color="text.secondary">
                                By {request.reviewer}
                              </Typography>
                            )}
                          </TableCell>
                          <TableCell>
                            {request.status === 'pending' ? (
                              <Box sx={{ display: 'flex', gap: 1 }}>
                                <Button
                                  size="small"
                                  variant="contained"
                                  color="success"
                                  startIcon={<CheckCircle />}
                                  onClick={() => handleReviewAccessRequest(request.id, 'approved')}
                                >
                                  Approve
                                </Button>
                                <Button
                                  size="small"
                                  variant="outlined"
                                  color="error"
                                  startIcon={<Cancel />}
                                  onClick={() => handleReviewAccessRequest(request.id, 'rejected')}
                                >
                                  Reject
                                </Button>
                              </Box>
                            ) : (
                              <Button
                                size="small"
                                onClick={() => {
                                  setSelectedRequest(request);
                                  // Show details
                                }}
                              >
                                View Details
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

            {/* Audit Logs Tab */}
            {tabValue === 3 && (
              <motion.div
                key="audit"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
                  User & Role Audit Logs
                </Typography>
                <List>
                  {auditLogs.map((log) => (
                    <React.Fragment key={log.id}>
                      <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: theme.palette.primary.light }}>
                            <History />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Typography fontWeight={500}>
                              {log.action} - {log.target}
                            </Typography>
                          }
                          secondary={
                            <>
                              <Typography component="span" variant="body2" color="text.primary">
                                {log.details}
                              </Typography>
                              <br />
                              <Typography component="span" variant="body2" color="text.secondary">
                                {log.timestamp} • By {log.performedBy} • IP: {log.ipAddress}
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
          </AnimatePresence>
        </CardContent>
      </Card>

      {/* Role-Specific Dashboards */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Dashboard />
            Role-Specific Dashboard Visibility
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Each role has access to different dashboard components based on their permissions
          </Typography>
          
          <Grid container spacing={3}>
            {roles.map((role) => (
              <Grid item xs={12} md={4} key={role.id}>
                <Card variant="outlined">
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                      {getRoleIcon(role.name.toLowerCase())}
                      <Typography variant="h6">
                        {role.name}
                      </Typography>
                    </Box>
                    <List dense>
                      {getRoleDashboard(role.name.toLowerCase()).map((item, index) => (
                        <ListItem key={index}>
                          <ListItemText primary={item} />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      {/* Dialogs */}
      {/* User Dialog */}
      <Dialog 
        open={userDialogOpen} 
        onClose={() => {
          setUserDialogOpen(false);
          setSelectedUser(null);
        }}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {selectedUser ? 'Edit User' : 'Add New User'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Full Name"
              value={selectedUser?.fullName || newUser.fullName}
              onChange={(e) => selectedUser
                ? setSelectedUser({...selectedUser, fullName: e.target.value})
                : setNewUser({...newUser, fullName: e.target.value})
              }
              sx={{ mb: 2 }}
            />
            
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={selectedUser?.email || newUser.email}
              onChange={(e) => selectedUser
                ? setSelectedUser({...selectedUser, email: e.target.value})
                : setNewUser({...newUser, email: e.target.value})
              }
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="Username"
              value={selectedUser?.username || newUser.username}
              onChange={(e) => selectedUser
                ? setSelectedUser({...selectedUser, username: e.target.value})
                : setNewUser({...newUser, username: e.target.value})
              }
              sx={{ mb: 2 }}
            />

            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Role</InputLabel>
              <Select
                value={selectedUser?.role || newUser.role}
                label="Role"
                onChange={(e) => selectedUser
                  ? setSelectedUser({...selectedUser, role: e.target.value})
                  : setNewUser({...newUser, role: e.target.value})
                }
              >
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="doctor">Doctor</MenuItem>
                <MenuItem value="nurse">Nurse</MenuItem>
                <MenuItem value="clinic-manager">Clinic Manager</MenuItem>
                <MenuItem value="vendor">Vendor</MenuItem>
                <MenuItem value="researcher">Researcher</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Department</InputLabel>
              <Select
                value={selectedUser?.department || newUser.department}
                label="Department"
                onChange={(e) => selectedUser
                  ? setSelectedUser({...selectedUser, department: e.target.value})
                  : setNewUser({...newUser, department: e.target.value})
                }
              >
                {departments.filter(d => d.id !== 'all').map(dept => (
                  <MenuItem key={dept.id} value={dept.id}>
                    {dept.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label="Phone"
              value={selectedUser?.phone || newUser.phone}
              onChange={(e) => selectedUser
                ? setSelectedUser({...selectedUser, phone: e.target.value})
                : setNewUser({...newUser, phone: e.target.value})
              }
              sx={{ mb: 2 }}
            />

            {!selectedUser && (
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={newUser.sendWelcomeEmail}
                      onChange={(e) => setNewUser({...newUser, sendWelcomeEmail: e.target.checked})}
                    />
                  }
                  label="Send welcome email"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={newUser.generatePassword}
                      onChange={(e) => setNewUser({...newUser, generatePassword: e.target.checked})}
                    />
                  }
                  label="Generate random password"
                />
              </FormGroup>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setUserDialogOpen(false);
            setSelectedUser(null);
          }}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleAddUser}
          >
            {selectedUser ? 'Update' : 'Create'} User
          </Button>
        </DialogActions>
      </Dialog>

      {/* Role Dialog */}
      <Dialog 
        open={roleDialogOpen} 
        onClose={() => setRoleDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {selectedRole ? 'Edit Role' : 'Create New Role'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Role Name"
              value={selectedRole?.name || newRole.name}
              onChange={(e) => selectedRole
                ? setSelectedRole({...selectedRole, name: e.target.value})
                : setNewRole({...newRole, name: e.target.value})
              }
              sx={{ mb: 2 }}
            />
            
            <TextField
              fullWidth
              label="Description"
              multiline
              rows={2}
              value={selectedRole?.description || newRole.description}
              onChange={(e) => selectedRole
                ? setSelectedRole({...selectedRole, description: e.target.value})
                : setNewRole({...newRole, description: e.target.value})
              }
              sx={{ mb: 2 }}
            />

            <Typography variant="subtitle2" gutterBottom>
              Permissions
            </Typography>
            {permissionCategories.map((category) => (
              <Box key={category.id} sx={{ mb: 2 }}>
                <Typography variant="body2" fontWeight={500}>
                  {category.name}
                </Typography>
                <FormGroup row>
                  {category.permissions.map((permission) => (
                    <FormControlLabel
                      key={permission}
                      control={
                        <Checkbox
                          checked={selectedRole
                            ? (selectedRole.permissions[category.id] || []).includes(permission)
                            : false
                          }
                          onChange={(e) => {
                            if (selectedRole) {
                              // Handle existing role permission update
                              handleUpdatePermissions(selectedRole.id, category.id, permission, e.target.checked);
                            } else {
                              // Handle new role permission
                              const currentPerms = newRole.permissions[category.id] || [];
                              let newPerms;
                              if (e.target.checked) {
                                newPerms = [...currentPerms, permission];
                              } else {
                                newPerms = currentPerms.filter(p => p !== permission);
                              }
                              setNewRole({
                                ...newRole,
                                permissions: {
                                  ...newRole.permissions,
                                  [category.id]: newPerms
                                }
                              });
                            }
                          }}
                        />
                      }
                      label={permission}
                    />
                  ))}
                </FormGroup>
              </Box>
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setRoleDialogOpen(false);
            setSelectedRole(null);
          }}>Cancel</Button>
          <Button
            variant="contained"
            onClick={selectedRole ? () => {
              // Handle role update
              setRoleDialogOpen(false);
              setSelectedRole(null);
            } : handleAddRole}
          >
            {selectedRole ? 'Update' : 'Create'} Role
          </Button>
        </DialogActions>
      </Dialog>

      {/* Permission Dialog */}
      <Dialog 
        open={permissionDialogOpen} 
        onClose={() => setPermissionDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {selectedUser ? `Permissions for ${selectedUser.fullName}` : 
           selectedRole ? `Permissions for ${selectedRole.name}` : 'Permissions'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            {selectedUser && (
              <>
                <Alert severity="info" sx={{ mb: 3 }}>
                  User inherits permissions from the <strong>{selectedUser.role}</strong> role
                </Alert>
                <Typography variant="subtitle2" gutterBottom>
                  Assigned Permissions
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                  {selectedUser.permissions.map((perm, index) => (
                    <Chip key={index} label={perm} size="small" />
                  ))}
                </Box>
              </>
            )}
            
            {selectedRole && (
              <>
                <Typography variant="subtitle2" gutterBottom>
                  Role Permissions Configuration
                </Typography>
                <TableContainer component={Paper} variant="outlined">
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Category</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Permissions</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {permissionCategories.map((category) => (
                        <TableRow key={category.id}>
                          <TableCell>
                            <Typography variant="body2" fontWeight={500}>
                              {category.name}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2">
                              {category.description}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                              {category.permissions.map((permission) => (
                                <FormControlLabel
                                  key={permission}
                                  control={
                                    <Checkbox
                                      size="small"
                                      checked={(selectedRole.permissions[category.id] || []).includes(permission)}
                                      onChange={(e) => handleUpdatePermissions(
                                        selectedRole.id,
                                        category.id,
                                        permission,
                                        e.target.checked
                                      )}
                                    />
                                  }
                                  label={
                                    <Typography variant="caption">
                                      {permission}
                                    </Typography>
                                  }
                                />
                              ))}
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Button
                              size="small"
                              onClick={() => {
                                // Select all permissions for this category
                                category.permissions.forEach(perm => {
                                  if (!(selectedRole.permissions[category.id] || []).includes(perm)) {
                                    handleUpdatePermissions(selectedRole.id, category.id, perm, true);
                                  }
                                });
                              }}
                            >
                              Select All
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPermissionDialogOpen(false)}>Close</Button>
          {selectedRole && (
            <Button
              variant="contained"
              onClick={() => {
                // Save permissions
                setPermissionDialogOpen(false);
              }}
            >
              Save Permissions
            </Button>
          )}
        </DialogActions>
      </Dialog>

      {/* Access Request Dialog */}
      <Dialog 
        open={accessRequestDialogOpen} 
        onClose={() => setAccessRequestDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          New Access Request
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Full Name"
              sx={{ mb: 2 }}
            />
            
            <TextField
              fullWidth
              label="Email"
              type="email"
              sx={{ mb: 2 }}
            />

            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Requested Role</InputLabel>
              <Select label="Requested Role">
                <MenuItem value="doctor">Doctor</MenuItem>
                <MenuItem value="nurse">Nurse</MenuItem>
                <MenuItem value="clinic-manager">Clinic Manager</MenuItem>
                <MenuItem value="researcher">Researcher</MenuItem>
                <MenuItem value="vendor">Vendor</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Department</InputLabel>
              <Select label="Department">
                {departments.filter(d => d.id !== 'all' && d.id !== 'External').map(dept => (
                  <MenuItem key={dept.id} value={dept.id}>
                    {dept.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label="Reason for Access"
              multiline
              rows={3}
              sx={{ mb: 2 }}
            />

            <Typography variant="subtitle2" gutterBottom>
              Requested Permissions
            </Typography>
            <FormGroup>
              <FormControlLabel control={<Checkbox />} label="View devices and equipment" />
              <FormControlLabel control={<Checkbox />} label="Access patient data (anonymized)" />
              <FormControlLabel control={<Checkbox />} label="Generate reports" />
              <FormControlLabel control={<Checkbox />} label="Submit maintenance requests" />
            </FormGroup>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAccessRequestDialogOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={() => {
              alert('Access request submitted for review');
              setAccessRequestDialogOpen(false);
            }}
          >
            Submit Request
          </Button>
        </DialogActions>
      </Dialog>

      {/* User Actions Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        {selectedUser && (
          <>
            <MenuItem onClick={() => {
              handleToggleUserStatus(selectedUser.id, 
                selectedUser.status === 'active' ? 'inactive' : 'active'
              );
              handleMenuClose();
            }}>
              {selectedUser.status === 'active' ? 'Deactivate User' : 'Activate User'}
            </MenuItem>
            <MenuItem onClick={() => {
              handleToggleMFA(selectedUser.id);
              handleMenuClose();
            }}>
              {selectedUser.mfaEnabled ? 'Disable MFA' : 'Enable MFA'}
            </MenuItem>
            <MenuItem onClick={() => {
              // Reset password
              alert(`Password reset email sent to ${selectedUser.email}`);
              handleMenuClose();
            }}>
              Reset Password
            </MenuItem>
            <MenuItem onClick={() => {
              // View activity
              setSelectedUser(selectedUser);
              // Open activity dialog
              handleMenuClose();
            }}>
              View Activity Log
            </MenuItem>
            <Divider />
            <MenuItem onClick={() => {
              if (window.confirm(`Delete user ${selectedUser.fullName}?`)) {
                setUsers(prev => prev.filter(u => u.id !== selectedUser.id));
                handleMenuClose();
              }
            }} sx={{ color: 'error.main' }}>
              Delete User
            </MenuItem>
          </>
        )}
      </Menu>
    </Box>
  );
};

export default UserRoleManagement;