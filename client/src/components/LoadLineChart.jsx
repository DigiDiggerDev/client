import { React, useState, useEffect } from 'react';
import { LineChart, Line, YAxis, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';

const LoadLineChart = () => {
   const initialData = [
      { name: 'Точка 1', currentLoad: 150, maxLoad: 200 },
      { name: 'Точка 2', currentLoad: 180, maxLoad: 200 },
      { name: 'Точка 3', currentLoad: 170, maxLoad: 200 },
      { name: 'Точка 4', currentLoad: 190, maxLoad: 200 },
      { name: 'Точка 5', currentLoad: 160, maxLoad: 200 },
   ];

   const [data, setData] = useState(initialData);

   useEffect(() => {
      const generateRandomLoad = () => Math.floor(Math.random() * (200 - 140 + 1)) + 140;

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
            <CartesianGrid strokeDasharray="3 3" />
            <Legend />
            <YAxis tickCount={3}/>
            <Line dot={false} type="monotone" name='Текущая нагрузка' dataKey="currentLoad" stroke="#8884d8" strokeWidth={3} />
            <Line dot={false} type="monotone" name='Допустимая нагрузка' dataKey="maxLoad" stroke="#82ca9d" strokeWidth={3} />
         </LineChart>
      </ResponsiveContainer>
   );
};

export default LoadLineChart;