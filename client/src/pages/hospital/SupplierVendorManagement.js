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
  Rating,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction,
  Divider,
  Badge,
  Tooltip,
  LinearProgress,
  Autocomplete
} from '@mui/material';
import {
  Business,
  Inventory,
  LocalShipping,
  Star,
  StarBorder,
  Phone,
  Email,
  LocationOn,
  CalendarToday,
  AttachMoney,
  TrendingUp,
  TrendingDown,
  TrendingFlat,
  CheckCircle,
  Warning,
  Error,
  Person,
  Add,
  Edit,
  Delete,
  History,
  FileCopy,
  Assessment,
  ShoppingCart,
  FilterList,
  Search,
  Download,
  Print,
  Share,
  Favorite,
  FavoriteBorder
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';

const DeviceSupplierVendorManagement = () => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const [supplierDialogOpen, setSupplierDialogOpen] = useState(false);
  const [contractDialogOpen, setContractDialogOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [selectedContract, setSelectedContract] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [performanceView, setPerformanceView] = useState('all');

  // Dummy data for suppliers
  const initialSuppliers = [
    {
      id: 1,
      name: 'MediTech Solutions',
      category: 'manufacturer',
      contactPerson: 'John Smith',
      email: 'john@meditech.com',
      phone: '+1 (555) 123-4567',
      location: 'Boston, MA',
      rating: 4.7,
      totalOrders: 245,
      deliveryReliability: 98.5,
      qualityScore: 96.2,
      responseTime: 2.4,
      preferred: true,
      contractStatus: 'active',
      contractExpiry: '2024-12-31',
      specialties: ['Ventilators', 'Patient Monitors', 'Infusion Pumps'],
      certifications: ['ISO 13485', 'FDA Approved', 'CE Marked']
    },
    {
      id: 2,
      name: 'BioMed Components',
      category: 'component-supplier',
      contactPerson: 'Sarah Johnson',
      email: 'sarah@biomed.com',
      phone: '+1 (555) 987-6543',
      location: 'San Jose, CA',
      rating: 4.3,
      totalOrders: 189,
      deliveryReliability: 94.2,
      qualityScore: 92.8,
      responseTime: 3.1,
      preferred: false,
      contractStatus: 'pending',
      contractExpiry: '2024-06-30',
      specialties: ['Sensors', 'Circuit Boards', 'Displays'],
      certifications: ['ISO 9001', 'RoHS Compliant']
    },
    {
      id: 3,
      name: 'Global Medical Supplies',
      category: 'marketplace',
      contactPerson: 'Mike Chen',
      email: 'mike@globalmed.com',
      phone: '+1 (555) 456-7890',
      location: 'Chicago, IL',
      rating: 4.5,
      totalOrders: 312,
      deliveryReliability: 96.8,
      qualityScore: 94.5,
      responseTime: 1.9,
      preferred: true,
      contractStatus: 'active',
      contractExpiry: '2025-03-15',
      specialties: ['Consumables', 'Disposables', 'Accessories'],
      certifications: ['GMP Certified', 'FDA Registered']
    },
    {
      id: 4,
      name: 'Precision Devices Inc.',
      category: 'manufacturer',
      contactPerson: 'Robert Davis',
      email: 'robert@precision.com',
      phone: '+1 (555) 234-5678',
      location: 'Austin, TX',
      rating: 4.2,
      totalOrders: 156,
      deliveryReliability: 91.3,
      qualityScore: 89.7,
      responseTime: 4.2,
      preferred: false,
      contractStatus: 'expired',
      contractExpiry: '2023-12-01',
      specialties: ['Surgical Instruments', 'Diagnostic Devices'],
      certifications: ['ISO 13485', 'FDA Approved']
    },
    {
      id: 5,
      name: 'MediParts Direct',
      category: 'component-supplier',
      contactPerson: 'Lisa Wong',
      email: 'lisa@mediparts.com',
      phone: '+1 (555) 876-5432',
      location: 'Seattle, WA',
      rating: 4.0,
      totalOrders: 98,
      deliveryReliability: 88.9,
      qualityScore: 87.4,
      responseTime: 5.8,
      preferred: false,
      contractStatus: 'active',
      contractExpiry: '2024-09-30',
      specialties: ['Mechanical Parts', 'Enclosures', 'Connectors'],
      certifications: ['ISO 9001']
    },
    {
      id: 6,
      name: 'HealthTech Marketplace',
      category: 'marketplace',
      contactPerson: 'David Miller',
      email: 'david@healthtech.com',
      phone: '+1 (555) 345-6789',
      location: 'Miami, FL',
      rating: 4.6,
      totalOrders: 278,
      deliveryReliability: 97.2,
      qualityScore: 95.8,
      responseTime: 2.1,
      preferred: true,
      contractStatus: 'active',
      contractExpiry: '2024-11-20',
      specialties: ['Used Equipment', 'Refurbished Devices', 'Rentals'],
      certifications: ['AHA Certified', 'Joint Commission']
    }
  ];

  // Dummy data for contracts
  const initialContracts = [
    {
      id: 1,
      contractId: 'CT-2024-001',
      supplierId: 1,
      supplierName: 'MediTech Solutions',
      type: 'Master Agreement',
      startDate: '2023-01-01',
      endDate: '2024-12-31',
      status: 'active',
      value: 1250000,
      terms: 'Net 30, 2% discount on early payment',
      renewalDate: '2024-11-30',
      attachments: ['Contract.pdf', 'SLA.pdf', 'PriceList.xlsx']
    },
    {
      id: 2,
      contractId: 'CT-2024-002',
      supplierId: 2,
      supplierName: 'BioMed Components',
      type: 'Component Supply',
      startDate: '2024-01-15',
      endDate: '2024-06-30',
      status: 'pending',
      value: 450000,
      terms: 'Net 45, FOB Destination',
      renewalDate: '2024-06-15',
      attachments: ['Agreement.pdf']
    },
    {
      id: 3,
      contractId: 'CT-2024-003',
      supplierId: 3,
      supplierName: 'Global Medical Supplies',
      type: 'Procurement Agreement',
      startDate: '2023-03-15',
      endDate: '2025-03-15',
      status: 'active',
      value: 850000,
      terms: 'Net 60, Volume discounts apply',
      renewalDate: '2025-02-15',
      attachments: ['Contract.pdf', 'Catalog.pdf']
    },
    {
      id: 4,
      contractId: 'CT-2023-045',
      supplierId: 4,
      supplierName: 'Precision Devices Inc.',
      type: 'Manufacturing',
      startDate: '2022-06-01',
      endDate: '2023-12-01',
      status: 'expired',
      value: 950000,
      terms: 'Net 30, Warranty included',
      renewalDate: '2023-11-01',
      attachments: ['Contract.pdf']
    }
  ];

  // Dummy data for orders
  const initialOrders = [
    {
      id: 1,
      orderId: 'ORD-2024-001',
      supplierId: 1,
      supplierName: 'MediTech Solutions',
      date: '2024-01-15',
      items: ['Ventilator X200', 'Patient Monitor V5'],
      total: 125000,
      status: 'delivered',
      deliveryTime: 7,
      qualityIssues: 0
    },
    {
      id: 2,
      orderId: 'ORD-2024-002',
      supplierId: 2,
      supplierName: 'BioMed Components',
      date: '2024-01-10',
      items: ['Sensors', 'Circuit Boards'],
      total: 45000,
      status: 'in-transit',
      deliveryTime: 14,
      qualityIssues: 2
    },
    {
      id: 3,
      orderId: 'ORD-2024-003',
      supplierId: 3,
      supplierName: 'Global Medical Supplies',
      date: '2024-01-05',
      items: ['Consumables', 'Disposables'],
      total: 28000,
      status: 'delivered',
      deliveryTime: 5,
      qualityIssues: 1
    }
  ];

  // Dummy data for pricing history
  const initialPricing = [
    {
      id: 1,
      supplierId: 1,
      item: 'Ventilator X200',
      date: '2024-01-15',
      price: 42500,
      change: '+2.5%',
      trend: 'up'
    },
    {
      id: 2,
      supplierId: 1,
      item: 'Patient Monitor V5',
      date: '2024-01-10',
      price: 12500,
      change: '-1.2%',
      trend: 'down'
    },
    {
      id: 3,
      supplierId: 2,
      item: 'Sensor Module',
      date: '2024-01-12',
      price: 450,
      change: '0%',
      trend: 'flat'
    },
    {
      id: 4,
      supplierId: 3,
      item: 'Medical Consumables',
      date: '2024-01-08',
      price: 125,
      change: '+3.8%',
      trend: 'up'
    }
  ];

  const [suppliers, setSuppliers] = useState(initialSuppliers);
  const [contracts, setContracts] = useState(initialContracts);
  const [orders, setOrders] = useState(initialOrders);
  const [pricingHistory, setPricingHistory] = useState(initialPricing);
  const [newSupplier, setNewSupplier] = useState({
    name: '',
    category: '',
    contactPerson: '',
    email: '',
    phone: '',
    location: '',
    specialties: []
  });

  // Load from localStorage
  useEffect(() => {
    const savedSuppliers = localStorage.getItem('deviceSuppliers');
    const savedContracts = localStorage.getItem('supplierContracts');
    const savedOrders = localStorage.getItem('supplierOrders');
    const savedPricing = localStorage.getItem('pricingHistory');

    if (savedSuppliers) setSuppliers(JSON.parse(savedSuppliers));
    if (savedContracts) setContracts(JSON.parse(savedContracts));
    if (savedOrders) setOrders(JSON.parse(savedOrders));
    if (savedPricing) setPricingHistory(JSON.parse(savedPricing));
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('deviceSuppliers', JSON.stringify(suppliers));
    localStorage.setItem('supplierContracts', JSON.stringify(contracts));
    localStorage.setItem('supplierOrders', JSON.stringify(orders));
    localStorage.setItem('pricingHistory', JSON.stringify(pricingHistory));
  }, [suppliers, contracts, orders, pricingHistory]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'manufacturer':
        return 'primary';
      case 'component-supplier':
        return 'secondary';
      case 'marketplace':
        return 'success';
      default:
        return 'default';
    }
  };

  const getCategoryLabel = (category) => {
    switch (category) {
      case 'manufacturer':
        return 'Manufacturer';
      case 'component-supplier':
        return 'Component Supplier';
      case 'marketplace':
        return 'Marketplace';
      default:
        return category;
    }
  };

  const getContractStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'pending':
        return 'warning';
      case 'expired':
        return 'error';
      default:
        return 'default';
    }
  };

  const getPerformanceColor = (score) => {
    if (score >= 95) return 'success';
    if (score >= 85) return 'warning';
    return 'error';
  };

  const handleAddSupplier = () => {
    const newId = suppliers.length + 1;
    const supplierToAdd = {
      ...newSupplier,
      id: newId,
      rating: 0,
      totalOrders: 0,
      deliveryReliability: 0,
      qualityScore: 0,
      responseTime: 0,
      preferred: false,
      contractStatus: 'none',
      specialties: newSupplier.specialties || [],
      certifications: []
    };
    
    setSuppliers(prev => [...prev, supplierToAdd]);
    setSupplierDialogOpen(false);
    setNewSupplier({
      name: '',
      category: '',
      contactPerson: '',
      email: '',
      phone: '',
      location: '',
      specialties: []
    });
  };

  const handleTogglePreferred = (supplierId) => {
    setSuppliers(prev => prev.map(supplier =>
      supplier.id === supplierId
        ? { ...supplier, preferred: !supplier.preferred }
        : supplier
    ));
  };

  const handleAddContract = () => {
    const newId = contracts.length + 1;
    const contractToAdd = {
      ...selectedContract,
      id: newId,
      contractId: `CT-2024-00${newId}`
    };
    
    setContracts(prev => [...prev, contractToAdd]);
    setContractDialogOpen(false);
    setSelectedContract(null);
  };

  const filteredSuppliers = suppliers.filter(supplier => {
    const matchesSearch = supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         supplier.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         supplier.specialties.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = filterCategory === 'all' || supplier.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || supplier.contractStatus === filterStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Statistics
  const stats = {
    totalSuppliers: suppliers.length,
    preferredSuppliers: suppliers.filter(s => s.preferred).length,
    activeContracts: contracts.filter(c => c.status === 'active').length,
    expiringSoon: contracts.filter(c => {
      const expiryDate = new Date(c.endDate);
      const today = new Date();
      const daysUntilExpiry = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));
      return daysUntilExpiry <= 60 && c.status === 'active';
    }).length,
    totalContractValue: contracts.reduce((sum, c) => sum + c.value, 0),
    averageRating: suppliers.reduce((sum, s) => sum + s.rating, 0) / suppliers.length
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getSupplierOrders = (supplierId) => {
    return orders.filter(order => order.supplierId === supplierId);
  };

  const getSupplierContracts = (supplierId) => {
    return contracts.filter(contract => contract.supplierId === supplierId);
  };

  const getSupplierPricing = (supplierId) => {
    return pricingHistory.filter(pricing => pricing.supplierId === supplierId);
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: theme.palette.primary.main }}>
            <Business sx={{ verticalAlign: 'middle', mr: 2 }} />
            Supplier & Vendor Management
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Manage suppliers, track contracts, and monitor performance metrics
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => setSupplierDialogOpen(true)}
          >
            Add New Supplier
          </Button>
          <Button
            variant="outlined"
            startIcon={<FileCopy />}
            onClick={() => setContractDialogOpen(true)}
          >
            New Contract
          </Button>
        </Box>
      </Box>

      {/* Stats Cards */}
<Box sx={{ display: 'flex', gap: 3, mb: 4, flexWrap: 'wrap' }}>

  {/* Total Suppliers */}
  <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.25 }} style={{ flex: 1, minWidth: 220 }}>
    <Card
      sx={{
        borderRadius: 3,
        background: 'linear-gradient(180deg, #E3F2FD, #FFFFFF)',
        boxShadow: '0 10px 30px rgba(0,0,0,0.08)'
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography sx={{ color: '#000', fontWeight: 700 }} gutterBottom>
              Total Suppliers
            </Typography>
            <Typography variant="h4" sx={{ color: '#000', fontWeight: 700 }}>
              {stats.totalSuppliers}
            </Typography>
          </Box>

          <Avatar
            sx={{
              bgcolor: 'primary.light' ,
              width: 48,
              height: 48
            }}
          >
            <Business />
          </Avatar>
        </Box>

        <Typography variant="body2" sx={{ mt: 1, color: '#333' }}>
          {stats.preferredSuppliers} preferred vendors
        </Typography>
      </CardContent>
    </Card>
  </motion.div>

  {/* Active Contracts */}
  <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.25 }} style={{ flex: 1, minWidth: 220 }}>
    <Card
      sx={{
        borderRadius: 3,
        background: 'linear-gradient(180deg, #E6F4EA, #FFFFFF)',
        boxShadow: '0 10px 30px rgba(0,0,0,0.08)'
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography sx={{ color: '#000', fontWeight: 700 }} gutterBottom>
              Active Contracts
            </Typography>
            <Typography variant="h4" sx={{ color: '#000', fontWeight: 700 }}>
              {stats.activeContracts}
            </Typography>
          </Box>

          <Avatar
            sx={{
              bgcolor: 'primary.light' ,
              width: 48,
              height: 48
            }}
          >
            <FileCopy />
          </Avatar>
        </Box>

        <Typography variant="body2" sx={{ mt: 1, color: '#333' }}>
          {stats.expiringSoon} expiring soon
        </Typography>
      </CardContent>
    </Card>
  </motion.div>

  {/* Total Contract Value */}
  <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.25 }} style={{ flex: 1, minWidth: 220 }}>
    <Card
      sx={{
        borderRadius: 3,
        background: 'linear-gradient(180deg, #F3E8FF, #FFFFFF)',
        boxShadow: '0 10px 30px rgba(0,0,0,0.08)'
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography sx={{ color: '#000', fontWeight: 700 }} gutterBottom>
              Total Contract Value
            </Typography>
            <Typography variant="h4" sx={{ color: '#000', fontWeight: 700 }}>
              {formatCurrency(stats.totalContractValue)}
            </Typography>
          </Box>

          <Avatar
            sx={{
              bgcolor: 'primary.light' ,
              width: 48,
              height: 48
            }}
          >
            <AttachMoney />
          </Avatar>
        </Box>

        <Typography variant="body2" sx={{ mt: 1, color: '#333' }}>
          Average rating: {stats.averageRating.toFixed(1)}/5
        </Typography>
      </CardContent>
    </Card>
  </motion.div>

  {/* Performance Score */}
  <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.25 }} style={{ flex: 1, minWidth: 220 }}>
    <Card
      sx={{
        borderRadius: 3,
        background: 'linear-gradient(180deg, #FFF4E5, #FFFFFF)',
        boxShadow: '0 10px 30px rgba(0,0,0,0.08)'
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography sx={{ color: '#000', fontWeight: 700 }} gutterBottom>
              Performance Score
            </Typography>
            <Typography variant="h4" sx={{ color: '#000', fontWeight: 700 }}>
              94.2%
            </Typography>
          </Box>

          <Avatar
            sx={{
              bgcolor: 'primary.light',
              width: 48,
              height: 48
            }}
          >
            <TrendingUp />
          </Avatar>
        </Box>

        <LinearProgress
          variant="determinate"
          value={94.2}
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

</Box>


      {/* Main Content Tabs */}
      <Card sx={{ mb: 4 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="Supplier Directory" icon={<Business />} iconPosition="start" />
            <Tab label="Contract Management" icon={<FileCopy />} iconPosition="start" />
            <Tab label="Performance Metrics" icon={<Assessment />} iconPosition="start" />
            <Tab label="Pricing History" icon={<AttachMoney />} iconPosition="start" />
          </Tabs>
        </Box>

        <CardContent>
          <AnimatePresence mode="wait">
            {/* Supplier Directory Tab */}
            {tabValue === 0 && (
              <motion.div
                key="suppliers"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <TextField
                      placeholder="Search suppliers..."
                      size="small"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      sx={{ width: 300 }}
                      InputProps={{
                        startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />
                      }}
                    />
                    <FormControl size="small" sx={{ minWidth: 150 }}>
                      <InputLabel>Category</InputLabel>
                      <Select
                        value={filterCategory}
                        label="Category"
                        onChange={(e) => setFilterCategory(e.target.value)}
                      >
                        <MenuItem value="all">All Categories</MenuItem>
                        <MenuItem value="manufacturer">Manufacturers</MenuItem>
                        <MenuItem value="component-supplier">Component Suppliers</MenuItem>
                        <MenuItem value="marketplace">Marketplace</MenuItem>
                      </Select>
                    </FormControl>
                    <FormControl size="small" sx={{ minWidth: 150 }}>
                      <InputLabel>Contract Status</InputLabel>
                      <Select
                        value={filterStatus}
                        label="Contract Status"
                        onChange={(e) => setFilterStatus(e.target.value)}
                      >
                        <MenuItem value="all">All Status</MenuItem>
                        <MenuItem value="active">Active</MenuItem>
                        <MenuItem value="pending">Pending</MenuItem>
                        <MenuItem value="expired">Expired</MenuItem>
                        <MenuItem value="none">No Contract</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      startIcon={<Download />}
                      onClick={() => alert('Exporting supplier list...')}
                    >
                      Export
                    </Button>
                    <Button
                      startIcon={<Print />}
                      onClick={() => window.print()}
                    >
                      Print
                    </Button>
                  </Box>
                </Box>

                <TableContainer component={Paper} variant="outlined">
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Supplier</TableCell>
                        <TableCell>Category</TableCell>
                        <TableCell>Contact</TableCell>
                        <TableCell>Rating</TableCell>
                        <TableCell>Performance</TableCell>
                        <TableCell>Contract Status</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredSuppliers.map((supplier) => (
                        <TableRow 
                          key={supplier.id}
                          hover
                          sx={{ 
                            '&:hover': { 
                              backgroundColor: theme.palette.action.hover,
                              '& .supplier-actions': { opacity: 1 }
                            } 
                          }}
                        >
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                              <Avatar sx={{ bgcolor: theme.palette.primary.light }}>
                                {supplier.name.charAt(0)}
                              </Avatar>
                              <Box>
                                <Typography fontWeight={500}>
                                  {supplier.name}
                                  {supplier.preferred && (
                                    <Star sx={{ fontSize: 16, color: 'warning.main', ml: 1, verticalAlign: 'middle' }} />
                                  )}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  {supplier.location}
                                </Typography>
                              </Box>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Chip 
                              label={getCategoryLabel(supplier.category)}
                              color={getCategoryColor(supplier.category)}
                              size="small"
                            />
                          </TableCell>
                          <TableCell>
                            <Typography fontWeight={500}>
                              {supplier.contactPerson}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {supplier.email}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Rating
                                value={supplier.rating}
                                precision={0.1}
                                readOnly
                                size="small"
                              />
                              <Typography variant="body2">
                                {supplier.rating.toFixed(1)}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', gap: 1 }}>
                              <Tooltip title={`Delivery Reliability: ${supplier.deliveryReliability}%`}>
                                <Chip
                                  label={`${supplier.deliveryReliability}%`}
                                  color={getPerformanceColor(supplier.deliveryReliability)}
                                  size="small"
                                  variant="outlined"
                                />
                              </Tooltip>
                              <Tooltip title={`Quality Score: ${supplier.qualityScore}%`}>
                                <Chip
                                  label={`${supplier.qualityScore}%`}
                                  color={getPerformanceColor(supplier.qualityScore)}
                                  size="small"
                                  variant="outlined"
                                />
                              </Tooltip>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={supplier.contractStatus}
                              color={getContractStatusColor(supplier.contractStatus)}
                              size="small"
                            />
                            {supplier.contractExpiry && (
                              <Typography variant="caption" display="block" color="text.secondary">
                                Expires: {new Date(supplier.contractExpiry).toLocaleDateString()}
                              </Typography>
                            )}
                          </TableCell>
                          <TableCell>
                            <Box 
                              className="supplier-actions"
                              sx={{ display: 'flex', gap: 1, opacity: 0, transition: 'opacity 0.2s' }}
                            >
                              <IconButton
                                size="small"
                                onClick={() => handleTogglePreferred(supplier.id)}
                              >
                                {supplier.preferred ? (
                                  <Favorite color="warning" />
                                ) : (
                                  <FavoriteBorder />
                                )}
                              </IconButton>
                              <IconButton
                                size="small"
                                onClick={() => {
                                  setSelectedSupplier(supplier);
                                  setSupplierDialogOpen(true);
                                }}
                              >
                                <Edit />
                              </IconButton>
                              <IconButton
                                size="small"
                                onClick={() => {
                                  setSuppliers(prev => prev.filter(s => s.id !== supplier.id));
                                }}
                              >
                                <Delete />
                              </IconButton>
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </motion.div>
            )}

            {/* Contract Management Tab */}
            {tabValue === 1 && (
              <motion.div
                key="contracts"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                  <Typography variant="h6">
                    Contract Portfolio
                  </Typography>
                  <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={() => {
                      setSelectedContract({
                        supplierName: '',
                        type: '',
                        startDate: new Date().toISOString().split('T')[0],
                        endDate: '',
                        value: 0,
                        terms: ''
                      });
                      setContractDialogOpen(true);
                    }}
                  >
                    New Contract
                  </Button>
                </Box>

                <TableContainer component={Paper} variant="outlined">
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Contract ID</TableCell>
                        <TableCell>Supplier</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Duration</TableCell>
                        <TableCell>Value</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Renewal Date</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {contracts.map((contract) => {
                        const daysUntilRenewal = Math.ceil(
                          (new Date(contract.renewalDate) - new Date()) / (1000 * 60 * 60 * 24)
                        );
                        
                        return (
                          <TableRow key={contract.id} hover>
                            <TableCell>
                              <Typography fontWeight={500}>
                                {contract.contractId}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography fontWeight={500}>
                                {contract.supplierName}
                              </Typography>
                            </TableCell>
                            <TableCell>{contract.type}</TableCell>
                            <TableCell>
                              {new Date(contract.startDate).toLocaleDateString()} - 
                              {new Date(contract.endDate).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                              <Typography fontWeight={500}>
                                {formatCurrency(contract.value)}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Chip
                                label={contract.status}
                                color={getContractStatusColor(contract.status)}
                                size="small"
                              />
                            </TableCell>
                            <TableCell>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                {new Date(contract.renewalDate).toLocaleDateString()}
                                {daysUntilRenewal <= 30 && contract.status === 'active' && (
                                  <Chip
                                    label={`${daysUntilRenewal}d`}
                                    color="warning"
                                    size="small"
                                  />
                                )}
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Button
                                size="small"
                                startIcon={<FileCopy />}
                                onClick={() => {
                                  // View contract details
                                  setSelectedContract(contract);
                                  setContractDialogOpen(true);
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

            {/* Performance Metrics Tab */}
            {tabValue === 2 && (
              <motion.div
                key="performance"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                  <Typography variant="h6">
                    Supplier Performance Dashboard
                  </Typography>
                  <FormControl size="small" sx={{ minWidth: 150 }}>
                    <InputLabel>View</InputLabel>
                    <Select
                      value={performanceView}
                      label="View"
                      onChange={(e) => setPerformanceView(e.target.value)}
                    >
                      <MenuItem value="all">All Metrics</MenuItem>
                      <MenuItem value="delivery">Delivery Reliability</MenuItem>
                      <MenuItem value="quality">Quality Score</MenuItem>
                      <MenuItem value="response">Response Time</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 3 }}>
                  {suppliers.map((supplier) => (
                    <motion.div
                      key={supplier.id}
                      whileHover={{ scale: 1.02 }}
                    >
                      <Card>
                        <CardContent>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                            <Box>
                              <Typography variant="h6" gutterBottom>
                                {supplier.name}
                              </Typography>
                              <Chip 
                                label={getCategoryLabel(supplier.category)}
                                color={getCategoryColor(supplier.category)}
                                size="small"
                              />
                            </Box>
                            <IconButton onClick={() => handleTogglePreferred(supplier.id)}>
                              {supplier.preferred ? (
                                <Favorite color="warning" />
                              ) : (
                                <FavoriteBorder />
                              )}
                            </IconButton>
                          </Box>

                          <Box sx={{ mb: 3 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                              <Typography variant="body2">Delivery Reliability</Typography>
                              <Typography variant="body2" fontWeight={500}>
                                {supplier.deliveryReliability}%
                              </Typography>
                            </Box>
                            <LinearProgress 
                              variant="determinate" 
                              value={supplier.deliveryReliability}
                              color={getPerformanceColor(supplier.deliveryReliability)}
                            />
                          </Box>

                          <Box sx={{ mb: 3 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                              <Typography variant="body2">Quality Score</Typography>
                              <Typography variant="body2" fontWeight={500}>
                                {supplier.qualityScore}%
                              </Typography>
                            </Box>
                            <LinearProgress 
                              variant="determinate" 
                              value={supplier.qualityScore}
                              color={getPerformanceColor(supplier.qualityScore)}
                            />
                          </Box>

                          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Box>
                              <Typography variant="body2" color="text.secondary">
                                Response Time
                              </Typography>
                              <Typography variant="body1" fontWeight={500}>
                                {supplier.responseTime} days
                              </Typography>
                            </Box>
                            <Box>
                              <Typography variant="body2" color="text.secondary">
                                Total Orders
                              </Typography>
                              <Typography variant="body1" fontWeight={500}>
                                {supplier.totalOrders}
                              </Typography>
                            </Box>
                            <Box>
                              <Typography variant="body2" color="text.secondary">
                                Rating
                              </Typography>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <Star sx={{ fontSize: 16, color: 'warning.main' }} />
                                <Typography variant="body1" fontWeight={500}>
                                  {supplier.rating.toFixed(1)}
                                </Typography>
                              </Box>
                            </Box>
                          </Box>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </Box>
              </motion.div>
            )}

            {/* Pricing History Tab */}
            {tabValue === 3 && (
              <motion.div
                key="pricing"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
                  Pricing Trends & History
                </Typography>
                <TableContainer component={Paper} variant="outlined">
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Supplier</TableCell>
                        <TableCell>Item</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Change</TableCell>
                        <TableCell>Trend</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {pricingHistory.map((pricing) => {
                        const supplier = suppliers.find(s => s.id === pricing.supplierId);
                        return (
                          <TableRow key={pricing.id} hover>
                            <TableCell>
                              <Typography fontWeight={500}>
                                {supplier?.name || 'Unknown Supplier'}
                              </Typography>
                            </TableCell>
                            <TableCell>{pricing.item}</TableCell>
                            <TableCell>
                              {new Date(pricing.date).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                              <Typography fontWeight={500}>
                                {formatCurrency(pricing.price)}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Chip
                                label={pricing.change}
                                color={pricing.trend === 'up' ? 'error' : pricing.trend === 'down' ? 'success' : 'default'}
                                size="small"
                              />
                            </TableCell>
                            <TableCell>
                              {pricing.trend === 'up' && <TrendingUp color="error" />}
                              {pricing.trend === 'down' && <TrendingDown color="success" />}
                              {pricing.trend === 'flat' && <TrendingFlat color="action" />}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>

      {/* Integration with Order & Restock */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <ShoppingCart />
            Order & Restock Integration
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Recent orders from your suppliers
          </Typography>
          <TableContainer component={Paper} variant="outlined">
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Order ID</TableCell>
                  <TableCell>Supplier</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Items</TableCell>
                  <TableCell>Total</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id} hover>
                    <TableCell>{order.orderId}</TableCell>
                    <TableCell>
                      <Typography fontWeight={500}>
                        {order.supplierName}
                      </Typography>
                    </TableCell>
                    <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {order.items.join(', ')}
                      </Typography>
                    </TableCell>
                    <TableCell>{formatCurrency(order.total)}</TableCell>
                    <TableCell>
                      <Chip
                        label={order.status}
                        color={order.status === 'delivered' ? 'success' : 'warning'}
                        size="small"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Supplier Details Dialog */}
      <Dialog 
        open={supplierDialogOpen} 
        onClose={() => setSupplierDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {selectedSupplier ? 'Edit Supplier' : 'Add New Supplier'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Supplier Name"
              value={selectedSupplier ? selectedSupplier.name : newSupplier.name}
              onChange={(e) => selectedSupplier 
                ? setSelectedSupplier({...selectedSupplier, name: e.target.value})
                : setNewSupplier({...newSupplier, name: e.target.value})
              }
              sx={{ mb: 2 }}
            />
            
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Category</InputLabel>
              <Select
                value={selectedSupplier ? selectedSupplier.category : newSupplier.category}
                label="Category"
                onChange={(e) => selectedSupplier
                  ? setSelectedSupplier({...selectedSupplier, category: e.target.value})
                  : setNewSupplier({...newSupplier, category: e.target.value})
                }
              >
                <MenuItem value="manufacturer">Manufacturer</MenuItem>
                <MenuItem value="component-supplier">Component Supplier</MenuItem>
                <MenuItem value="marketplace">Marketplace</MenuItem>
              </Select>
            </FormControl>

            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <TextField
                fullWidth
                label="Contact Person"
                value={selectedSupplier ? selectedSupplier.contactPerson : newSupplier.contactPerson}
                onChange={(e) => selectedSupplier
                  ? setSelectedSupplier({...selectedSupplier, contactPerson: e.target.value})
                  : setNewSupplier({...newSupplier, contactPerson: e.target.value})
                }
              />
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={selectedSupplier ? selectedSupplier.email : newSupplier.email}
                onChange={(e) => selectedSupplier
                  ? setSelectedSupplier({...selectedSupplier, email: e.target.value})
                  : setNewSupplier({...newSupplier, email: e.target.value})
                }
              />
            </Box>

            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <TextField
                fullWidth
                label="Phone"
                value={selectedSupplier ? selectedSupplier.phone : newSupplier.phone}
                onChange={(e) => selectedSupplier
                  ? setSelectedSupplier({...selectedSupplier, phone: e.target.value})
                  : setNewSupplier({...newSupplier, phone: e.target.value})
                }
              />
              <TextField
                fullWidth
                label="Location"
                value={selectedSupplier ? selectedSupplier.location : newSupplier.location}
                onChange={(e) => selectedSupplier
                  ? setSelectedSupplier({...selectedSupplier, location: e.target.value})
                  : setNewSupplier({...newSupplier, location: e.target.value})
                }
              />
            </Box>

            <Autocomplete
              multiple
              freeSolo
              options={[]}
              value={selectedSupplier ? selectedSupplier.specialties : newSupplier.specialties}
              onChange={(event, newValue) => selectedSupplier
                ? setSelectedSupplier({...selectedSupplier, specialties: newValue})
                : setNewSupplier({...newSupplier, specialties: newValue})
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Specialties"
                  placeholder="Add specialties"
                />
              )}
              sx={{ mb: 2 }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSupplierDialogOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={() => {
              if (selectedSupplier) {
                setSuppliers(prev => prev.map(s => 
                  s.id === selectedSupplier.id ? selectedSupplier : s
                ));
                setSelectedSupplier(null);
              } else {
                handleAddSupplier();
              }
              setSupplierDialogOpen(false);
            }}
          >
            {selectedSupplier ? 'Update' : 'Add'} Supplier
          </Button>
        </DialogActions>
      </Dialog>

      {/* Contract Details Dialog */}
      <Dialog 
        open={contractDialogOpen} 
        onClose={() => setContractDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {selectedContract?.contractId ? 'Contract Details' : 'New Contract'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Supplier</InputLabel>
              <Select
                value={selectedContract?.supplierName || ''}
                label="Supplier"
                onChange={(e) => setSelectedContract({
                  ...selectedContract,
                  supplierName: e.target.value,
                  supplierId: suppliers.find(s => s.name === e.target.value)?.id
                })}
              >
                {suppliers.map(supplier => (
                  <MenuItem key={supplier.id} value={supplier.name}>
                    {supplier.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Contract Type</InputLabel>
              <Select
                value={selectedContract?.type || ''}
                label="Contract Type"
                onChange={(e) => setSelectedContract({...selectedContract, type: e.target.value})}
              >
                <MenuItem value="Master Agreement">Master Agreement</MenuItem>
                <MenuItem value="Component Supply">Component Supply</MenuItem>
                <MenuItem value="Procurement Agreement">Procurement Agreement</MenuItem>
                <MenuItem value="Manufacturing">Manufacturing</MenuItem>
                <MenuItem value="Service Agreement">Service Agreement</MenuItem>
              </Select>
            </FormControl>

            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <TextField
                fullWidth
                label="Start Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={selectedContract?.startDate || ''}
                onChange={(e) => setSelectedContract({...selectedContract, startDate: e.target.value})}
              />
              <TextField
                fullWidth
                label="End Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={selectedContract?.endDate || ''}
                onChange={(e) => setSelectedContract({...selectedContract, endDate: e.target.value})}
              />
            </Box>

            <TextField
              fullWidth
              label="Contract Value ($)"
              type="number"
              value={selectedContract?.value || 0}
              onChange={(e) => setSelectedContract({...selectedContract, value: parseInt(e.target.value)})}
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="Terms & Conditions"
              multiline
              rows={3}
              value={selectedContract?.terms || ''}
              onChange={(e) => setSelectedContract({...selectedContract, terms: e.target.value})}
              sx={{ mb: 2 }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setContractDialogOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleAddContract}
          >
            {selectedContract?.contractId ? 'Update' : 'Create'} Contract
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DeviceSupplierVendorManagement;