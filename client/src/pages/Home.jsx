import { React } from 'react';

import '/src/styles/Home.css';
import LoadLineChart from '../components/LoadLineChart';

const Home = () => {
   return (
      <div className='Home'>
         <LoadLineChart />
      </div>
   );
};

export default Home;