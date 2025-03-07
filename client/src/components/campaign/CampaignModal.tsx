import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  useMediaQuery,
} from '@mui/material';
import CampaignForm from './CampaignForm'; // Import the new form component
import { Campaign, FormMode } from '../../types/campaign.types';
import { useTheme, Theme } from '@mui/material/styles';

type Props = {
  open: boolean;
  onClose: () => void;
  campaign: Campaign | null;
  onSave: (campaign: Campaign) => void;
  mode: FormMode;
};

const modalHeadings = {
  create: 'Create New Campaign',
  edit: 'Edit Campaign',
  view: 'View Campaign',
};

const ModalCampaign: React.FC<Props> = ({
  open,
  onClose,
  onSave,
  campaign,
  mode,
}) => {
  const theme = useTheme<Theme>();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={onClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">
        {modalHeadings[mode] || ''}
      </DialogTitle>
      <DialogContent>
        <CampaignForm
          campaign={campaign}
          mode={mode}
          onClose={onClose}
          onSave={onSave}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ModalCampaign;
