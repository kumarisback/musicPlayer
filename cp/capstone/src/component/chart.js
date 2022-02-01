
import React, { useEffect ,useContext,useState} from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { countClick } from '../DatabaseHandler/playlist';
import { isAuth } from "../Data/auth";


ChartJS.register(ArcElement, Tooltip, Legend);



export const data2 = {
  labels: [],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
};


const ChartLine = () => {
  const [data1, setData] = useState({
    labels: [],
    datasets: [
      {
        label: '# of Votes',
        data: [],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  });
    const user = useContext(isAuth);
    useEffect(async() => {
        const res=countClick(user.email.split('@')[0]);
        console.log(await res);
        // let temp=[];
        const randColor = () =>  {
          return "#" + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0').toUpperCase();
      }
        let  keys=Object.keys(await res) ;
        let  value=Object.values(await res) ;
        let color=value.map((x,index)=>{
          return randColor();
        })
        // let x=[];
        
        setData((prev)=>({...prev,labels:keys}));
        setData((prev)=>({labels:[...prev.labels],datasets:[{data:value,backgroundColor:color,...prev.datasets}]}))
        // setData((prev)=>({...prev,datasets:{...prev.datasets,data:value}}))
        console.log(data1);
        
      
    }, []);
  return <Doughnut className="donut" data={data1} />;
};




export default ChartLine;
