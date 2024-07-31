import React, { useState } from "react";
import SortingVisualizer from "./SortingVisualizer";
import SearchingVisualizer from "./SearchingVisualizer";
import PerformanceMetricsTable from "./PerformanceMetricsTable";
import styles from "./AlgorithmVisualizer.module.css";

const AlgorithmVisualizer = () => {
  const [algorithm, setAlgorithm] = useState("");
  const [data, setData] = useState("");
  const [target, setTarget] = useState("");
  const [metrics, setMetrics] = useState([]);

  const handleVisualize = () => {
    const parsedData = data.split(",").map(Number);
    if (algorithm.includes("search")) {
      setMetrics([
        {
          algorithm: "Linear Search",
          timeComplexity: "O(n)",
          spaceComplexity: "O(1)",
        },
        {
          algorithm: "Binary Search",
          timeComplexity: "O(log n)",
          spaceComplexity: "O(1)",
        },
      ]);
    } else {
      setMetrics([
        {
          algorithm: "Quicksort",
          timeComplexity: "O(n log n)",
          spaceComplexity: "O(log n)",
        },
        {
          algorithm: "Mergesort",
          timeComplexity: "O(n log n)",
          spaceComplexity: "O(n)",
        },
        {
          algorithm: "Heapsort",
          timeComplexity: "O(n log n)",
          spaceComplexity: "O(1)",
        },
        {
          algorithm: "Selection Sort",
          timeComplexity: "O(n^2)",
          spaceComplexity: "O(1)",
        },
        {
          algorithm: "Insertion Sort",
          timeComplexity: "O(n^2)",
          spaceComplexity: "O(1)",
        },
        {
          algorithm: "Bubble Sort",
          timeComplexity: "O(n^2)",
          spaceComplexity: "O(1)",
        },
      ]);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Algorithm Visualizer</h1>
      <div className={styles.inputGroup}>
        <input
          className={styles.inputField}
          type="text"
          placeholder="Enter data (comma separated)"
          value={data}
          onChange={(e) => setData(e.target.value)}
        />
        <input
          className={styles.inputField}
          type="text"
          placeholder="Enter target (for searching)"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          disabled={!algorithm.includes("search")}
        />
        <select
          className={styles.selectField}
          onChange={(e) => setAlgorithm(e.target.value)}
          value={algorithm}
        >
          <option value="">Select Algorithm</option>
          <option value="quicksort">Quicksort</option>
          <option value="mergesort">Mergesort</option>
          <option value="heapsort">Heapsort</option>
          <option value="selectionsort">Selection Sort</option>
          <option value="insertionsort">Insertion Sort</option>
          <option value="bubblesort">Bubble Sort</option>
          <option value="linearsearch">Linear Search</option>
          <option value="binarysearch">Binary Search</option>
        </select>
        <button className={styles.button} onClick={handleVisualize}>
          Show Metrice Table
        </button>
      </div>
      {algorithm.includes("sort") && (
        <SortingVisualizer
          algorithm={algorithm}
          userData={data.split(",").map(Number)}
        />
      )}
      {algorithm.includes("search") && (
        <SearchingVisualizer
          algorithm={algorithm}
          userData={data.split(",").map(Number)}
          target={target}
        />
      )}
      <PerformanceMetricsTable metrics={metrics} />
    </div>
  );
};

export default AlgorithmVisualizer;
