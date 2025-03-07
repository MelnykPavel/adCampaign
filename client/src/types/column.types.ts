import React from 'react';

export type Column<T, K extends keyof T = keyof T> = {
  id: K;
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: T[K]) => string;
  renderCell?: (value: T[K], row: T) => React.ReactNode;
};
