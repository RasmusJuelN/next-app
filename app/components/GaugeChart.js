'use client';
import { useEffect, useState, useRef} from 'react';
import GaugeChart from 'react-gauge-chart';
import { PieChart, Pie, Cell, Label, ResponsiveContainer } from 'recharts';
import { RadialBarChart, RadialBar, Legend } from 'recharts';

export default function RealTimeGauge() {
    const [data, setData] = useState([]); // Store the fetched data array
    const [error, setError] = useState(null);
    const [lastValue, setLastValue] = useState(0); // State for the last value
    const [medianValue, setMedianValue] = useState(0); // State for the median value
    const [meanValue, setMeanValue] = useState(0);
    
    
    

    useEffect(() => {
      const fetchData = async () => {
        console.log('Fetching data...');
        try {
          const response = await fetch('/api/influxdata');
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const result = await response.json();
    
          const values = result.map(item => item._value);
          if (values.length > 0) {
            const lastValue = values[values.length - 1];
            const medianValue = calculateMedian(values);
            const meanValue = calculateMean(values);
    
            // Update the state with the latest values
            setLastValue(lastValue);
            setMedianValue(medianValue);
            setMeanValue(meanValue);
    
            console.log('Last value:', lastValue);
            console.log('Median value:', medianValue);
            console.log('Mean value:', meanValue);
          }
        } catch (error) {
          console.error('Error fetching data:', error);
          setError(error.message);
        }
      };
    
      // Set up the interval to fetch data every 5 seconds
      const intervalId = setInterval(fetchData, 5000);
    
      // Fetch data immediately when the component mounts
      fetchData();
    
      // Clear the interval when the component unmounts
      return () => clearInterval(intervalId);
    }, [data]); 


  // Maximum and minimum values for normalization (adjust according to your data range)
  const minValue = 0;
  const maxValue = 10; 

  // Helper function to calculate the median
  const calculateMedian = (values) => {
    if (values.length === 0) return 0;
    const sortedValues = [...values].sort((a, b) => a - b);
    
    const middleIndex = Math.floor(sortedValues.length / 2);
    if (sortedValues.length % 2 === 0) {
      return (sortedValues[middleIndex - 1] + sortedValues[middleIndex]) / 2;
    }
    return sortedValues[middleIndex];
  };

  // Helper function to calculate the mean
  const calculateMean = (values) => {
    if (values.length === 0) return 0;
    const sum = values.reduce((acc, value) => acc + value, 0);
    return sum / values.length;
  };

  // useEffect(() => {
  //   if (data.length > 0) {
  //     const lastValue = data[data.length - 1];
  //     const medianValue = calculateMedian(data);
  //     const meanValue = calculateMean(data);

  //     setLastValue(lastValue);
  //     setMedianValue(medianValue);
  //     setMeanValue(meanValue);



  
  //     console.log('Last value:', lastValue);
  //     console.log('Median value:', medianValue);
  //     console.log('Mean value:', meanValue);
  //   }
  // }, [data]);

  const normalize = (value) => (value - minValue) / (maxValue - minValue);

  if (error) {
    return <div>Error: {error}</div>;
  }

  const Gauge1 = (title, value) => {
    const percentage = normalize(value);
    const data = [
        { name: 'Fill', value: percentage },
        { name: 'Empty', value: 1 - percentage },
    ];

    return (
    <div style={{ flex: '1 1 30%', maxWidth: '30%', minWidth: '250px', margin: '10px', textAlign: "center" }}>
      <h1>{title}</h1>
        <ResponsiveContainer width="100%" height={350}>
          
            <PieChart>
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00C1DE" />
                <stop offset="100%" stopColor="#9D44E2" />
              </linearGradient>
            </defs>
                <Pie
                    
                    data={data}
                    innerRadius="60%"
                    outerRadius="90%"
                    startAngle={180}
                    endAngle={0}
                    fill="#8884d8"
                    paddingAngle={1}
                    dataKey="value"
                    animationBegin={0}
                    
                    >                   
                    <Cell fill={gradientColor} />
                    <Cell fill="#e0e0e0" />
                    <Label value={`${value.toLocaleString()}`} position="center" style={{ fontSize: '24px', fontWeight: 'bold' }} />
                </Pie>
            </PieChart>
            
        </ResponsiveContainer>
        </div>
    );
};

const Gauge2 = (title, value, normalize) => {
  const percentage = normalize(value); // Normalize the value

  return (
    <div style={{ flex: '1 2 30%', maxWidth: '30%', height: '350px', margin: '10px', textAlign: "center" }}>
      <h1>{title}</h1>
      <div style={{ position: 'relative' }}>
        <GaugeChart
          height={250}
          id={`gauge-chart-${title}`}
          nrOfLevels={50}
          colors={['#00C1DE', '#4990E2', '#9D44E2']}
          percent={percentage} // Use normalized value directly
          textColor="#D8B4FE"
          arcPadding={0.005}
          needleColor="#9D44E2"
          needleBaseColor="#464A56"
          cornerRadius={12}
          animate={true}
          animDelay={100}
          animateDuration={3000}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', position: 'absolute', top: '78%', width: '85%', transform: "translateX(-50%)", left: "50%" }}>
          <span style={{ fontSize: '16px', color: '#ccc' }}>0</span>
          <span style={{ fontSize: '16px', color: '#ccc' }}>10</span>
        </div>
      </div>
      <div style={{ textAlign: 'center', marginTop: '10px', fontSize: '24px' }}>
        {value !== null ? value.toLocaleString() : 'No Data'}
      </div>
    </div>
  );
};

  const gradientColor = `url(#gradient)`;


  


return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
    
    
        {Gauge1("Last Value", lastValue)}
        {Gauge1("Median Value", medianValue)}
        {Gauge1("Mean Value", meanValue)}

        {Gauge2("Last Value", lastValue, normalize)}
        {Gauge2("Median Value", medianValue, normalize)}
        {Gauge2("Mean Value", meanValue, normalize)}

    </div>


);
}