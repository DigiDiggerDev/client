import React from 'react'

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import './styles/App.css'

import Market from './pages/Market';
import Farm from './pages/Farm';
import Counter from './components/Counter';
import StartButton from './components/StartButton';

function App() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Counter />
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange}>
            <Tab label="Магазин" value="1" />
            <Tab label="Моя ферма" value="2" />
          </TabList>
        </Box>

        <TabPanel value="1">
          <Market />
        </TabPanel>

        <TabPanel value="2">
          <Farm />
        </TabPanel>
      </TabContext>

      <StartButton />
    </div>
  )
}

export default App