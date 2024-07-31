import React, { useState, useEffect } from "react";
import BarChart from "./BarChart";

const SearchingVisualizer = ({ algorithm, userData, target }) => {
  const [data, setData] = useState(userData || [5, 3, 8, 10, 2, 1, 7, 6, 9, 4]);
  const [step, setStep] = useState(0);
  const [steps, setSteps] = useState([]);

  useEffect(() => {
    const visualizeAlgorithm = () => {
      const steps = generateSteps(algorithm);
      setSteps(steps);
      setStep(0);
      steps.forEach((_, index) => {
        setTimeout(() => {
          setStep(index);
        }, index * 500);
      });
    };

    visualizeAlgorithm();
  }, [algorithm, data]);

  const generateSteps = (algorithm) => {
    let steps = [];
    switch (algorithm) {
      case "linearsearch":
        linearSearch([...data], Number(target), steps);
        break;
      case "binarysearch":
        binarySearch(
          [...data].sort((a, b) => a - b),
          Number(target),
          steps
        );
        break;
      default:
        break;
    }
    return steps;
  };

  const linearSearch = (arr, target, steps) => {
    for (let i = 0; i < arr.length; i++) {
      steps.push({ array: [...arr], index: i });
      if (arr[i] === target) break;
    }
  };

  const binarySearch = (arr, target, steps) => {
    let left = 0;
    let right = arr.length - 1;
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      steps.push({ array: [...arr], index: mid });
      if (arr[mid] === target) break;
      else if (arr[mid] < target) left = mid + 1;
      else right = mid - 1;
    }
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <BarChart
        data={steps[step]?.array || data}
        highlightedIndex={steps[step]?.index}
      />
    </div>
  );
};

export default SearchingVisualizer;
