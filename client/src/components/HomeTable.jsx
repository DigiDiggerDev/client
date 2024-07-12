import { React, useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { useTranslation } from 'react-i18next';

const tableCellStyles = {
   fontFamily: 'Actay',
   backgroundColor: 'black',
   color: 'white',
   fontSize: 13
};

const tableContentCellStyles = {
   fontFamily: 'Actay',
   color: 'white'
};

const data = [
   { name: 'GTX 1070 TI', capacity: 0.1, amount: 10 },
   { name: 'GTX 1071 TI', capacity: 0.1, amount: 20 },
   { name: 'GTX 1072 TI', capacity: 0.1, amount: 30 },
   { name: 'GTX 1073 TI', capacity: 0.1, amount: 100 },
   { name: 'GTX 1074 TI', capacity: 0.1, amount: 100 },
   { name: 'GTX 1075 TI', capacity: 0.1, amount: 100 },
   { name: 'GTX 1076 TI', capacity: 0.1, amount: 100 },
   { name: 'GTX 1077 TI', capacity: 0.1, amount: 100 },
   { name: 'GTX 1078 TI', capacity: 0.1, amount: 100 },
];

const HomeTable = () => {
   const [maxHeight, setMaxHeight] = useState(330);

   useEffect(() => {
      if (window.innerHeight < 700) {
         setMaxHeight(200);
      }
      console.log(window.innerHeight);
   }, []);

   const { t } = useTranslation(); 

   return (
      <div className='HomeTable'>
         <TableContainer sx={{ maxHeight: maxHeight, borderRadius: '8px' }}>
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