import React, { useState, useEffect } from "react";
import { FaCircle } from "react-icons/fa6";
import "./BarChart.css";

export default function BarChart(props) {
  const [bars, setBars] = useState([]);

  useEffect(() => {
    let cumulativePercentage = 0;
    
    props.bars.sort((a, b) => b.percentage - a.percentage);

    props.bars.forEach((bar, index) => {
        cumulativePercentage += bar.percentage;
        bar.cumulativePercentage = cumulativePercentage;
        bar.zIndex = props.bars.length - index;
        bar.color = getRandomColor();
    });
    
    setBars(props.bars)
    
  }, [props.bars]);


  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  return (
    <div className='bar-chart-container'>
      <div className='bar-chart'>
          {(bars) && bars.map((bar) => (
              <div
                  className='progress-bar'
                  key={bar.zIndex}
                  style={{
                      zIndex: bar.zIndex,
                      width: `${bar.cumulativePercentage}%`,
                      backgroundColor: bar.color,
                  }}
              ></div>
          ))}
      </div>
      
      <div className='bar-chart-labels-list'>
        { props.bars.length === 0 && <span className="empty-message">No Assets to show</span> }
        <table style={{ margin: '0 auto' }}>
          <tbody>
            {(bars) && bars.map((bar) => (
                <tr key={bar.zIndex}>   
                  <td className='bar-chart-label'><FaCircle style={{color: bar.color}} size={15}></FaCircle></td>
                  <td className='bar-chart-label'>{bar.coinName}</td>
                  <td className='bar-chart-label'>
                    {Number(bar.percentage).toFixed(2)}%
                  </td>
                </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
