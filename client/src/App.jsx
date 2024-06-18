import React from 'react'
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