import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Breadcrumbs, { breadcrumbsClasses } from '@mui/material/Breadcrumbs';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import { useLocation, Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';

const StyledBreadcrumbs = styled(Breadcrumbs)(({ theme }) => ({
  margin: theme.spacing(1, 0),
  [`& .${breadcrumbsClasses.separator}`]: {
    color: theme.palette.action.disabled,
    margin: 1,
  },
  [`& .${breadcrumbsClasses.ol}`]: {
    alignItems: 'center',
  },
}));

type BreadcrumbItemProps = {
  value: string;
  to: string;
  isLast: boolean;
};

const BreadcrumbItem = ({ value, to, isLast }: BreadcrumbItemProps) => {
  return isLast ? (
    <Typography key={to} variant="body1" sx={{ fontWeight: 600 }}>
      {value.charAt(0).toUpperCase() + value.slice(1)}
    </Typography>
  ) : (
    <Link
      key={to}
      component={RouterLink}
      to={to}
      underline="hover"
      color="inherit"
    >
      {value.charAt(0).toUpperCase() + value.slice(1)}
    </Link>
  );
};
const NavbarBreadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <StyledBreadcrumbs
      aria-label="breadcrumb"
      separator={<NavigateNextRoundedIcon fontSize="small" />}
    >
      <Link component={RouterLink} to="/" underline="hover" color="inherit">
        Dashboard
      </Link>
      {pathnames.map((value, index) => (
        <BreadcrumbItem
          key={index}
          value={value}
          to={`/${pathnames.slice(0, index + 1).join('/')}`}
          isLast={index === pathnames.length - 1}
        />
      ))}
    </StyledBreadcrumbs>
  );
};
export default NavbarBreadcrumbs;
