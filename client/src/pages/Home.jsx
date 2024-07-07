import { React } from 'react';

import '/src/styles/Home.css';

import LoadLineChart from '../components/LoadLineChart';
import HomeTable from '../components/HomeTable';

const Home = () => {
   return (
      <div className='Home'>
         <LoadLineChart />
         <HomeTable />
      </div>
   );
};

export default Home;