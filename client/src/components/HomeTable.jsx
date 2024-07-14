import { React, useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { useTranslation } from 'react-i18next';
import { padding } from '@mui/system';

const tableCellStyles = {
   padding: 1,
   fontFamily: 'Actay',
   backgroundColor: 'black',
   color: 'white',
   fontSize: 13
};

const tableContentCellStyles = {
   fontFamily: 'Actay',
   color: 'white'
};

const HomeTable = ({ data }) => {
   const [maxHeight, setMaxHeight] = useState(330);

   useEffect(() => {
      if (window.innerHeight < 650) {
         setMaxHeight(200);
      }
      console.log(window.innerHeight);
   }, []);

   const { t } = useTranslation(); 

   return (
      <div className='HomeTable'>
         <TableContainer sx={{ maxHeight: maxHeight }}>
            <Table stickyHeader sx={{ width: '100%' }}>
               <TableHead>
                  <TableRow>
                     <TableCell sx={tableCellStyles}>{t('table_name')}</TableCell>
                     <TableCell sx={tableCellStyles} align="right">{t('table_capacity')}</TableCell>
                     <TableCell sx={tableCellStyles} align="right">{t('table_amount')}</TableCell>
                     <TableCell sx={tableCellStyles} align="right">{t('table_total_capacity')}</TableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
                  {data.map((data) => (
                     <TableRow
                        key={data.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                     >
                        <TableCell sx={tableContentCellStyles} component="th" scope="row">{data.name}</TableCell>
                        <TableCell sx={tableContentCellStyles} align="right">{data.capacity}</TableCell>
                        <TableCell sx={tableContentCellStyles} align="right">{data.amount}</TableCell>
                        <TableCell sx={tableContentCellStyles} align="right">{data.capacity * data.amount}</TableCell>
                     </TableRow>
                  ))}
               </TableBody>
            </Table>
         </TableContainer>
      </div>
   );
};

export default HomeTable;