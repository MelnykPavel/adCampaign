import DarkModeIcon from '@mui/icons-material/DarkModeRounded';
import LightModeIcon from '@mui/icons-material/LightModeRounded';
import IconButton, { IconButtonOwnProps } from '@mui/material/IconButton';
import { useColorScheme } from '@mui/material/styles';

export default function ColorModeToggle(props: IconButtonOwnProps) {
  const { mode, setMode } = useColorScheme();

  if (!mode) return null;

  const toggleMode = () => {
    setMode(mode === 'light' ? 'dark' : 'light');
  };

  return (
    <IconButton onClick={toggleMode} disableRipple size="small" {...props}>
      {mode === 'light' ? <LightModeIcon /> : <DarkModeIcon />}
    </IconButton>
  );
}
