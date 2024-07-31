import React from "react";
import styles from "./PerformanceMetricsTable.module.css";

const PerformanceMetricsTable = ({ metrics }) => {
  if (!metrics || metrics.length === 0) {
    return <p>No metrics available</p>;
  }

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Algorithm</th>
          <th>Time Complexity</th>
          <th>Space Complexity</th>
        </tr>
      </thead>
      <tbody>
        {metrics.map((metric, index) => (
          <tr key={index}>
            <td>{metric.algorithm}</td>
            <td>{metric.timeComplexity}</td>
            <td>{metric.spaceComplexity}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PerformanceMetricsTable;
