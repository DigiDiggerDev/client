import React from 'react'

// import Box from '@mui/material/Box';
// import Tab from '@mui/material/Tab';
// import TabContext from '@mui/lab/TabContext';
// import TabList from '@mui/lab/TabList';
// import TabPanel from '@mui/lab/TabPanel';
// import { TabsApple } from '/src/mui-treasury/tabs-apple/TabsApple';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import './styles/App.css'

import Market from './pages/Market';
import Farm from './pages/Farm';
import Counter from './components/Counter';
import StartButton from './components/StartButton';

function App() {
  return (
    <div>
      <Counter />

      <Tabs>
        <TabList className='global-tabs'>
          <Tab>Магазин</Tab>
          <Tab>Моя ферма</Tab>
        </TabList>

        <TabPanel>
          <Tabs>
            <TabList>
              <Tab>Видеокарты</Tab>
              <Tab>Блоки питания</Tab>
            </TabList>

            <TabPanel>
              <Market />
            </TabPanel>

            <TabPanel>
              Блоки питания
            </TabPanel>
          </Tabs>
        </TabPanel>

        <TabPanel>
          <Farm />
        </TabPanel>
      </Tabs>


      <StartButton />
    </div>
  )
}

export default App