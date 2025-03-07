import React from 'react';
import Box from '@mui/material/Box';
import TablePagination from '@mui/material/TablePagination';

import DataTable from '../../components/DataTable';
import ModalCampaign from '../../components/campaign/CampaignModal';
import CampaignsToolbar from '../../components/campaign/CampaignsToolbar';

import { createColumns } from './campaignTableSettings';
import { Campaign, FormMode } from '../../types/campaign.types';
import useApi from '../../hooks/useApi';

const Campaigns = () => {
  const [campaigns, setCampaigns] = React.useState<Campaign[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [mode, setMode] = React.useState<FormMode>('create');
  const [selectedCampaign, setSelectedCampaign] =
    React.useState<Campaign | null>(null);

  const { data: campaignsData, fetchData } = useApi<Campaign[]>();

  const refreshCampaigns = React.useCallback(async () => {
    await fetchData('/campaign', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
  }, [fetchData]);

  React.useEffect(() => {
    refreshCampaigns();
  }, [refreshCampaigns]);

  React.useEffect(() => {
    if (campaignsData) {
      setCampaigns(campaignsData);
    }
  }, [campaignsData]);

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterResults = (results: Campaign[]) => {
    setCampaigns(results);
    setPage(0);
  };

  const handleCreateCampaign = () => {
    setMode('create');
    setSelectedCampaign(null);
    setModalOpen(true);
  };

  const handleEditCampaign = (campaign: Campaign) => {
    setMode('edit');
    setSelectedCampaign(campaign);
    setModalOpen(true);
  };

  const handleReadCampaign = (campaign: Campaign) => {
    setMode('view');
    setSelectedCampaign(campaign);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSaveCampaign = async () => {
    setModalOpen(false);
    await refreshCampaigns();
  };

  return (
    <Box p={3} width="100%">
      <CampaignsToolbar
        onFilterResults={handleFilterResults}
        onCreateCampaign={handleCreateCampaign}
      />

      <DataTable
        data={campaigns}
        columns={createColumns()}
        page={page}
        rowsPerPage={rowsPerPage}
        onEdit={handleEditCampaign}
        onRead={handleReadCampaign}
      />

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={campaigns.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <ModalCampaign
        open={modalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveCampaign}
        campaign={selectedCampaign}
        mode={mode}
      />
    </Box>
  );
};

export default Campaigns;
