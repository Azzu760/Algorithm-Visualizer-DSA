import React from "react";
import styles from "./BarChart.module.css";

const BarChart = ({ data, highlightedIndex }) => {
  const maxValue = Math.max(...data);

  return (
    <div className={styles.barChartContainer}>
      {data.map((value, index) => (
        <div
          key={index}
          className={styles.bar}
          style={{
            height: `${(value / maxValue) * 100}%`,
            background:
              highlightedIndex === index
                ? "linear-gradient(180deg, #ff3b3b, #f6475f)"
                : "linear-gradient(180deg, #ff6f61, #de1d7d)",
          }}
        >
          <div className={styles.barValue}>{value}</div>
        </div>
      ))}
    </div>
  );
};

export default BarChart;
