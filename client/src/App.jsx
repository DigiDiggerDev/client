import React from 'react'

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
// import { TabsApple } from '/src/mui-treasury/tabs-apple/TabsApple';

import './styles/App.css'

import Market from './pages/Market';
import Farm from './pages/Farm';
import Counter from './components/Counter';
import StartButton from './components/StartButton';

function App() {
  const [valueGlobal, setValueGlobal] = React.useState('1');
  const [value, setValue] = React.useState('1');

  const handleChangeGlobal = (event, newValue) => {
    setValueGlobal(newValue);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Counter />
      <TabContext value={valueGlobal}>
        <div className='global-tabs'>
          <TabList onChange={handleChangeGlobal} textColor='secondary' variant="fullWidth">
            <Tab label="Магазин" value="1" />
            <Tab label="Моя ферма" value="2" />
          </TabList>
        </div>

        <TabPanel value="1">
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange}>
                <Tab label="Видеокарты" value="1" />
                <Tab label="Блоки питания" value="2" />
              </TabList>
            </Box>

            <TabPanel value="1">
              <Market />
            </TabPanel>

            <TabPanel value="2">
              Блоки питания
            </TabPanel>
          </TabContext>
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