import { React } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import 'react-animated-term/dist/react-animated-term.css'
import './styles/App.css'

import Market from './pages/Market';
import Home from './pages/Home';
import Counter from './components/Counter';
import StartButton from './components/StartButton';

const video_cards = [
  { id: 1, title: 'Название видеокарты 1', description: 'Описание видеокарты 1', image: '/static/images/cards/contemplative-reptile.jpg' },
  { id: 2, title: 'Название видеокарты 2', description: 'Описание видеокарты 2', image: '/static/images/cards/contemplative-reptile.jpg' },
  { id: 3, title: 'Название видеокарты 3', description: 'Описание видеокарты 3', image: '/static/images/cards/contemplative-reptile.jpg' },
  { id: 4, title: 'Название видеокарты 4', description: 'Описание видеокарты 4', image: '/static/images/cards/contemplative-reptile.jpg' },
  { id: 5, title: 'Название видеокарты 5', description: 'Описание видеокарты 5', image: '/static/images/cards/contemplative-reptile.jpg' },
  { id: 6, title: 'Название видеокарты 6', description: 'Описание видеокарты 6', image: '/static/images/cards/contemplative-reptile.jpg' },
];

const psu = [
  { id: 1, title: 'Название блока питания 1', description: 'Описание блока питания 1', image: '/static/images/cards/contemplative-reptile.jpg' },
  { id: 2, title: 'Название блока питания 2', description: 'Описание блока питания 2', image: '/static/images/cards/contemplative-reptile.jpg' },
  { id: 3, title: 'Название блока питания 3', description: 'Описание блока питания 3', image: '/static/images/cards/contemplative-reptile.jpg' },
  { id: 4, title: 'Название блока питания 4', description: 'Описание блока питания 4', image: '/static/images/cards/contemplative-reptile.jpg' },
  { id: 5, title: 'Название блока питания 5', description: 'Описание блока питания 5', image: '/static/images/cards/contemplative-reptile.jpg' },
  { id: 6, title: 'Название блока питания 6', description: 'Описание блока питания 6', image: '/static/images/cards/contemplative-reptile.jpg' },
];

function App() {
  return (
    <div className='App'>
      <Counter />

      <Tabs>
        <TabList className='global-tabs'>
          <Tab>Market</Tab>
          <Tab>Home</Tab>
          <Tab>Boost</Tab>
        </TabList>

        <TabPanel>
          <Tabs>
            <TabList className='market-tabs'>
              <Tab>Видеокарты</Tab>
              <Tab>Блоки питания</Tab>
            </TabList>

            <TabPanel>
              <Market items={video_cards} />
            </TabPanel>

            <TabPanel>
              <Market items={psu} />
            </TabPanel>

            <TabPanel>
              Boost
            </TabPanel>
          </Tabs>
        </TabPanel>

        <TabPanel>
          <Home />
        </TabPanel>
      </Tabs>

      <StartButton />
    </div>
  )
}

export default App