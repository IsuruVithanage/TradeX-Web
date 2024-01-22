import React from "react";
import { FaCircle } from "react-icons/fa6";
import "./BarChart.css";

export default function BarChart(props) {
    let bars = props.bars.sort((a, b) => b.presentage - a.presentage);

    const updateBarProperties = () => {
        let cumulativePercentage = 0;

        bars.forEach((bar) => {
            cumulativePercentage += bar.presentage;
        });

        if(cumulativePercentage === 100){
            let arrayIndex = 0;
            cumulativePercentage = 0;

            bars.forEach((bar) => {
                cumulativePercentage += bar.presentage;
                bar.cumulativePercentage = cumulativePercentage;
                bar.zIndex = bars.length - arrayIndex;
                bar.color = getRandomColor();
                arrayIndex += 1;
            });
        }
    }

    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    updateBarProperties();


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
      <table style={{ margin: '0 auto' }}>
          <tbody>
            {(bars) && bars.map((bar) => (
                <tr key={bar.zIndex}>   
                  <td className='bar-chart-label'><FaCircle style={{color: bar.color}} size={15}></FaCircle></td>
                  <td className='bar-chart-label'>{bar.symbol}</td>
                  <td className='bar-chart-label'>{bar.presentage}%</td>
                </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
