import { alpha } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppNavbar from './AppNavbar';
import Header from './Header';
import SideMenu from './SideMenu';
import AppTheme from '../theme/AppTheme';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

const Layout = (props: { disableCustomTheme?: boolean }) => {
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <ToastContainer />
      <Box sx={{ display: 'flex' }}>
        <SideMenu />
        <AppNavbar />
        <Box
          component="main"
          sx={(theme) => ({
            flexGrow: 1,
            backgroundColor: alpha(theme.palette.background.default, 1),
            overflow: 'auto',
          })}
        >
          <Stack
            spacing={2}
            sx={{
              alignItems: 'center',
              mx: 3,
              pb: 5,
              mt: { xs: 8, md: 0 },
            }}
          >
            <Header />
            <Outlet />
          </Stack>
        </Box>
      </Box>
    </AppTheme>
  );
};
export default Layout;
