import React from 'react'
import { useState } from 'react'

import { motion, AnimatePresence } from "framer-motion"

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import './styles/App.css'

function App() {
  const [value, setValue] = React.useState('1');

  const [selectedId, setSelectedId] = useState(null)

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange}>
            <Tab label="Магазин" value="1" />
            <Tab label="Моя ферма" value="2" />
          </TabList>
        </Box>


        <TabPanel value="1">
          <motion.div layoutId={1} onClick={() => setSelectedId(1)}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                alt="Видеокарта"
                height="140"
                image="/static/images/cards/contemplative-reptile.jpg"
              />
              <CardContent>
                Название видеокарты
              </CardContent>
            </Card>
          </motion.div>

          <AnimatePresence>
            {selectedId && (
              <motion.div layoutId={selectedId}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardMedia
                    component="img"
                    alt="Видеокарта"
                    height="140"
                    image="/static/images/cards/contemplative-reptile.jpg"
                  />
                  <CardContent>
                    <p>Название видеокарты</p>
                    <p>Описание видеокарты</p>
                  </CardContent>
                </Card>
                <motion.button onClick={() => setSelectedId(null)} />
              </motion.div>
            )}
          </AnimatePresence>
        </TabPanel>


        <TabPanel value="2">Моя ферма</TabPanel>
      </TabContext>
    </Box>
  )
}

export default App