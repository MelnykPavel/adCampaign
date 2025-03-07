import React, { useState } from 'react';
import {
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Box,
} from '@mui/material';
import useApi from '../../hooks/useApi';
import { Campaign, FormMode, Payout } from '../../types/campaign.types';
import PayoutItem from './PayoutItem';

type CampaignFormProps = {
  campaign: Campaign | null;
  mode: FormMode;
  onClose: () => void;
  onSave: (campaign: Campaign) => void;
};

const CampaignForm: React.FC<CampaignFormProps> = ({
  mode,
  campaign,
  onClose,
  onSave,
}) => {
  const [title, setTitle] = useState<string>(campaign?.title || '');
  const [landingPageUrl, setLandingPageUrl] = useState<string>(
    campaign?.landingPageUrl || ''
  );
  const [isRunning, setIsRunning] = useState<boolean>(
    campaign?.isRunning || false
  );
  const [payouts, setPayouts] = useState<Payout[]>(campaign?.payouts || []);

  const { loading, fetchData } = useApi();

  const handleSave = async () => {
    const savedCampaign = {
      id: campaign?.id || 0,
      title,
      landingPageUrl,
      isRunning,
      payouts,
    };

    const apiConfig = {
      create: {
        url: '/campaign',
        method: 'POST',
      },
      edit: {
        url: `/campaign/${campaign?.id}`,
        method: 'PUT',
      },
    };

    const { url, method } = apiConfig[mode as Exclude<FormMode, 'view'>];

    await fetchData(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(savedCampaign),
    });

    onClose();
    onSave(savedCampaign);
  };

  const handlePayoutUpdate = (updatedPayout: Payout) => {
    setPayouts(
      payouts.map((p) => (p.id === updatedPayout.id ? updatedPayout : p))
    );
  };

  const handlePayoutRemove = (id: number) => {
    setPayouts(payouts.filter((p) => p.id !== id));
  };

  return (
    <Box>
      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        disabled={mode === 'view'}
        margin="normal"
      />
      <TextField
        label="Landing Page URL"
        value={landingPageUrl}
        onChange={(e) => setLandingPageUrl(e.target.value)}
        fullWidth
        disabled={mode === 'view'}
        margin="normal"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={isRunning}
            onChange={(e) => setIsRunning(e.target.checked)}
            disabled={mode === 'view'}
          />
        }
        label="Is Running"
      />

      <Box mt={2}>
        {mode !== 'view' && (
          <Button
            variant="contained"
            onClick={() =>
              setPayouts([
                ...payouts,
                {
                  id: Date.now(),
                  campaignId: campaign?.id || 0,
                  country: '',
                  amount: 0,
                },
              ])
            }
          >
            Add Payout
          </Button>
        )}

        {payouts.map((payout) => (
          <PayoutItem
            key={payout.id}
            payout={payout}
            mode={mode}
            onUpdate={handlePayoutUpdate}
            onRemove={handlePayoutRemove}
          />
        ))}
      </Box>

      <Box mt={2} display="flex" justifyContent="flex-end" paddingY={2}>
        {mode !== 'view' && (
          <Button variant="contained" onClick={handleSave} disabled={loading}>
            {loading ? 'Saving...' : 'Save'}
          </Button>
        )}
        <Button onClick={onClose}>Close</Button>
      </Box>
    </Box>
  );
};

export default CampaignForm;
