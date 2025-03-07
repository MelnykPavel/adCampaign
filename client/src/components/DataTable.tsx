// ** MUI Imports
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import Typography from '@mui/material/Typography';
import { Column } from '../types/column.types';
import { Button } from '@mui/material';

type TableProps<T> = {
  data: T[];
  columns: Column<T>[];
  page: number;
  rowsPerPage: number;
  onEdit: (campaign: T) => void;
  onRead: (campaign: T) => void;
};

const getCellValue = <T,>(column: Column<T>, value: T[keyof T], item: T) => {
  if (column.renderCell) return column.renderCell(value, item);
  if (column.format) return column.format(value);
  if (typeof value === 'string' || typeof value === 'number') return value;
  return JSON.stringify(value);
};

const DataTable = <T extends { id: number }>({
  data,
  columns,
  page,
  rowsPerPage,
  onEdit,
  onRead,
}: TableProps<T>) => {
  const handleRowClick = (item: T) => {
    onRead(item);
  };

  return (
    <TableContainer
      component={Paper}
      sx={{
        mt: 2,
        overflowY: 'auto',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Table stickyHeader sx={{ height: '100%', borderCollapse: 'collapse' }}>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={String(column.id)}
                align={column.align}
                sx={{ minWidth: column.minWidth }}
              >
                {column.label}
              </TableCell>
            ))}
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length > 0 ? (
            data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item) => (
                <TableRow
                  hover
                  role="checkbox"
                  key={item.id}
                  onClick={() => handleRowClick(item)}
                >
                  {columns.map((column) => {
                    const value = item[column.id];
                    return (
                      <TableCell key={String(column.id)} align={column.align}>
                        {getCellValue(column, value, item)}
                      </TableCell>
                    );
                  })}
                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      onClick={(e) => {
                        e.stopPropagation();
                        onEdit(item);
                      }}
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length + 1}
                align="center"
                sx={{
                  height: '390px',
                  textAlign: 'center',
                  verticalAlign: 'middle',
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: '16px',
                    fontWeight: 500,
                    color: '#888',
                  }}
                >
                  No data available. Adjust filters or add new records.
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
