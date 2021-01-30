import React, { FC, HTMLAttributes } from 'react';
import MaterialTable from 'material-table';

import { LinkedDataIdentifier } from '../../../atoms/LinkedDataIdentifier';

import { ContentTableRow } from './ContentTableRow';

export interface Props extends HTMLAttributes<HTMLDivElement> {
  label?: string;
  rows?: any[];
}

// TODO: fix walletState so it does not get mutated params...
export const WalletContentTable: FC<Props> = ({ label, rows }: any) => {
  const columns: any = [
    {
      title: 'Type',
      field: 'type',
      render: (rowData: any) => {
        return Array.isArray(rowData.type) ? rowData.type[0] : rowData.type;
      },
    },
    {
      title: 'Identifier',
      field: 'id',
      render: (rowData: any) => {
        if (rowData.id) {
          return <LinkedDataIdentifier value={rowData.id} />;
        }
        return <LinkedDataIdentifier value={rowData.proof.challenge} />;
      },
    },
  ];

  return (
    <MaterialTable
      style={{ width: '100%' }}
      title={label || 'Contents'}
      columns={columns}
      data={rows}
      options={{ rowStyle: { fontFamily: 'Roboto' } }}
      detailPanel={(rowData: any) => {
        const withoutMutation: any = { ...rowData };
        delete withoutMutation.tableData;
        return <ContentTableRow document={withoutMutation} />;
      }}
    />
  );
};
