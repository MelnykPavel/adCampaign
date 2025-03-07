import { Column } from '../../types/column.types';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { Campaign, Payout } from '../../types/campaign.types';

export const createColumns = (): Column<Campaign>[] => [
  { id: 'title', label: 'Title', minWidth: 170 },
  { id: 'landingPageUrl', label: 'Landing Page URL', minWidth: 200 },
  {
    id: 'isRunning',
    label: 'Is Running',
    minWidth: 100,
    align: 'right',
    renderCell: (value) =>
      value ? (
        <CheckCircleIcon color="success" />
      ) : (
        <CancelIcon color="error" />
      ),
  },
  {
    id: 'payouts',
    label: 'Payouts',
    minWidth: 170,
    align: 'right',
    format: (
      value: string | number | boolean | Payout[] | undefined
    ): string => {
      if (value === undefined) return '$0';

      let total = 0;
      if (Array.isArray(value)) {
        total = value.reduce(
          (acc: number, payout: Payout) => acc + payout.amount,
          0
        );
      } else if (value && typeof value === 'object') {
        total = Object.values(value).reduce(
          (acc: number, amount) => acc + Number(amount),
          0
        );
      } else {
        total = Number(value);
      }
      return `$${total}`;
    },
  },
];
