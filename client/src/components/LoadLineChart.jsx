import { React, useState, useEffect } from 'react';
import { LineChart, Line, YAxis, Legend, ResponsiveContainer } from 'recharts';

const load = 150;
const maxLoad = 200;

const LoadLineChart = () => {
   const initialData = [
      { currentLoad: load, maxLoad: maxLoad },
      { currentLoad: load, maxLoad: maxLoad },
      { currentLoad: load, maxLoad: maxLoad },
      { currentLoad: load, maxLoad: maxLoad },
      { currentLoad: load, maxLoad: maxLoad },
      { currentLoad: load, maxLoad: maxLoad },
      { currentLoad: load, maxLoad: maxLoad },
      { currentLoad: load, maxLoad: maxLoad }
   ];

   const [data, setData] = useState(initialData);

   useEffect(() => {
      const generateRandomLoad = () => Math.floor(Math.random() * (maxLoad - load)) + load;

      const interval = setInterval(() => {
         const newData = data.map((point, index) => {
            if (index === data.length - 1) {
               return {
                  ...point,
                  currentLoad: generateRandomLoad(),
               };
            } else {
               return {
                  ...data[index + 1],
               };
            }
         });

         setData(newData);
      }, 2000);

      return () => clearInterval(interval);
   }, [data]);

   return (
      <ResponsiveContainer width="100%" height={150}>
         <LineChart data={data}>
            <Legend />
            <YAxis tickCount={3}/>
            <Line dot={false} type="monotone" name={`Текущая нагрузка - ${load}W`} dataKey="currentLoad" stroke="#8884d8" strokeWidth={3} />
            <Line dot={false} type="monotone" name='Допустимая нагрузка' dataKey="maxLoad" stroke="#82ca9d" strokeWidth={3} />
         </LineChart>
      </ResponsiveContainer>
   );
};

export default LoadLineChart;