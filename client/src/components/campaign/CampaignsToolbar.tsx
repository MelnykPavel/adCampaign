import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { Campaign } from '../../types/campaign.types';
import useDebounce from '../../hooks/useDebounce';
import useApi from '../../hooks/useApi';

type CampaignsToolbarProps = {
  onFilterResults: (results: Campaign[]) => void;
  onCreateCampaign: () => void;
};

const filterOptions = [
  { value: 'all', label: 'All' },
  { value: 'running', label: 'Running' },
  { value: 'stopped', label: 'Stopped' },
];

const CampaignsToolbar: React.FC<CampaignsToolbarProps> = ({
  onFilterResults,
  onCreateCampaign,
}) => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const debouncedSearch = useDebounce(search, 500);
  const { data, fetchData } = useApi<Campaign[]>();

  const isFirstRender = React.useRef(true);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleFilterChange = (event: SelectChangeEvent<string>) => {
    setFilter(event.target.value);
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const fetchFilteredCampaigns = async () => {
      await fetchData(`/campaign?search=${debouncedSearch}&filter=${filter}`);
    };

    fetchFilteredCampaigns();
  }, [debouncedSearch, filter, fetchData]);

  useEffect(() => {
    if (data) {
      onFilterResults(data);
    }
  }, [data, onFilterResults]);

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h5" gutterBottom>
        Campaigns
      </Typography>
      <Toolbar
        sx={{
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 2,
          alignItems: { xs: 'stretch', sm: 'center' },
        }}
      >
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          value={search}
          onChange={handleSearchChange}
          sx={{ flex: 1, minWidth: '200px', maxWidth: '300px' }}
        />
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Filter</InputLabel>
          <Select value={filter} onChange={handleFilterChange} label="Filter">
            {filterOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          sx={{ marginLeft: 'auto' }}
          onClick={onCreateCampaign}
        >
          Create New Campaign
        </Button>
      </Toolbar>
    </Box>
  );
};

export default CampaignsToolbar;
