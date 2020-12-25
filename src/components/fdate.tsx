import React from 'react';

export interface FDateProps {
  date: string | number | Date;
}

export function FDate({ date }: FDateProps) {
  return (
    <span style={{ whiteSpace: 'nowrap' }}>
      {(typeof date !== 'object' ? new Date(date) : date)
        .toLocaleDateString(undefined, {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit',
        })
        .replace(/\//g, '.')}
    </span>
  );
}
