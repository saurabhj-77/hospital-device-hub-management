import { Box, Typography } from '@mui/material';

export const Timeline = ({ children }) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
    {children}
  </Box>
);

export const TimelineItem = ({ left, right, dotColor = 'primary.main', icon, last }) => (
  <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
    {/* Opposite Content */}
    <Box
      sx={{
        width: '35%',
        textAlign: 'right',
        pr: 2,
        color: 'text.secondary',
        fontSize: 13
      }}
    >
      {left}
    </Box>

    {/* Separator */}
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Box
        sx={{
          width: 32,
          height: 32,
          borderRadius: '50%',
          bgcolor: dotColor,
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {icon}
      </Box>
      {!last && (
        <Box sx={{ width: 2, flexGrow: 1, bgcolor: 'divider', mt: 0.5 }} />
      )}
    </Box>

    {/* Content */}
    <Box sx={{ width: '45%', pl: 2 }}>
      {right}
    </Box>
  </Box>
);
