import React from 'react';
import {
  TextField,
  Box,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';
import { Payout } from '../../types/campaign.types';

const COUNTRIES = ['US', 'UK', 'CA', 'FR', 'DE'];

type PayoutItemProps = {
  payout: Payout;
  mode: 'create' | 'edit' | 'view';
  onUpdate: (updatedPayout: Payout) => void;
  onRemove: (id: number) => void;
};

const PayoutItem: React.FC<PayoutItemProps> = ({
  payout,
  mode,
  onUpdate,
  onRemove,
}) => {
  return (
    <Box mt={2} display="flex" gap={2} alignItems="center">
      <FormControl fullWidth>
        <InputLabel>Country</InputLabel>
        <Select
          value={payout.country}
          onChange={(e) => onUpdate({ ...payout, country: e.target.value })}
          disabled={mode === 'view'}
        >
          {COUNTRIES.map((country) => (
            <MenuItem key={country} value={country}>
              {country}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label="Amount"
        type="number"
        value={payout.amount}
        onChange={(e) => {
          const amount = Math.max(0, Number(e.target.value));
          onUpdate({ ...payout, amount });
        }}
        fullWidth
        disabled={mode === 'view'}
      />
      {mode !== 'view' && (
        <Button
          variant="outlined"
          color="error"
          onClick={() => onRemove(payout.id)}
        >
          Remove
        </Button>
      )}
    </Box>
  );
};

export default PayoutItem;
