import { React, useState, useEffect } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Terminal from 'react-animated-term'
import 'react-animated-term/dist/react-animated-term.css'

import './styles/App.css'

import Market from './pages/Market';
import Farm from './pages/Farm';
import Counter from './components/Counter';
import StartButton from './components/StartButton';
import LoadLineChart from './components/LoadLineChart';

function App() {
  return (
    <div className='App'>
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
              Тест
            </TabPanel>
          </Tabs>
        </TabPanel>

        <TabPanel>
          <LoadLineChart />
        </TabPanel>
      </Tabs>


      <StartButton />
    </div>
  )
}

export default App