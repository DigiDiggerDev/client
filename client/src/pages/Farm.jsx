import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import '/src/styles/Farm.css';
import LoadLineChart from '../components/LoadLineChart';

const items = [
   { id: 1, title: 'Название видеокарты 1', description: 'Описание видеокарты 1', image: '/static/images/cards/contemplative-reptile.jpg' },
   { id: 2, title: 'Название видеокарты 2', description: 'Описание видеокарты 2', image: '/static/images/cards/contemplative-reptile.jpg' },
   { id: 3, title: 'Название видеокарты 3', description: 'Описание видеокарты 3', image: '/static/images/cards/contemplative-reptile.jpg' },
];

const Farm = () => {
   return (
      <div className='Farm'>
         <LoadLineChart />
      </div>
   );
};

export default Farm;