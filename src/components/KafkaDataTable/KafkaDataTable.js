import React from 'react';
import { DataTable, TableContainer, Table, TableHead, TableRow, TableHeader, TableBody, TableCell } from 'carbon-components-react';
import { useHistory } from 'react-router-dom';

function KafkaDataTable(props)
{

    const headerData = [
      {
        header: 'Id',
        key: 'id',
      },
      {
        header: 'Source',
        key: 'source',
      },
      {
        header: 'Operation',
        key: 'operation',
      },
      {
        header: 'Timestamp',
        key: 'time_stamp',
      },
      {
        header: 'Tenant',
        key: 'tenant_name',
      },
      {
        header: 'Created',
        key: 'create_time',
      }
    ];
    let history = useHistory();

    return (
      <>
        <DataTable isSortable
          rows={props.data || []}
          headers={headerData}
          render={({ rows, headers, getHeaderProps, getTableProps }) => (
            <TableContainer>
              <Table {...getTableProps()}>
                <TableHead>
                  <TableRow>
                    {headers.map(header => (
                      <TableHeader {...getHeaderProps({ header })}>
                        {header.header}
                      </TableHeader>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map(row => (
                    <TableRow key={Date.now + Math.random()} onClick={() => history.push('/messages/' + row.id)}>
                      {row.cells.map(cell => (
                        <TableCell key={cell.id}>{cell.value}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>)}
        />
      </>
    )
  }

export default KafkaDataTable;