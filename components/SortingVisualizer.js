import React, { useState, useEffect } from "react";
import BarChart from "./BarChart";

const SortingVisualizer = ({ algorithm, userData }) => {
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
      case "quicksort":
        quickSort([...data], 0, data.length - 1, steps);
        break;
      case "bubblesort":
        bubbleSort([...data], steps);
        break;
      case "selectionsort":
        selectionSort([...data], steps);
        break;
      case "insertionsort":
        insertionSort([...data], steps);
        break;
      case "mergesort":
        mergeSort([...data], 0, data.length - 1, steps);
        break;
      case "heapsort":
        heapSort([...data], steps);
        break;
      default:
        break;
    }
    return steps;
  };

  const quickSort = (arr, low, high, steps) => {
    if (low < high) {
      const pi = partition(arr, low, high, steps);
      quickSort(arr, low, pi - 1, steps);
      quickSort(arr, pi + 1, high, steps);
    }
  };

  const partition = (arr, low, high, steps) => {
    const pivot = arr[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
      if (arr[j] <= pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        steps.push({ array: [...arr], index: i });
      }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    steps.push({ array: [...arr], index: i + 1 });
    return i + 1;
  };

  const bubbleSort = (arr, steps) => {
    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          steps.push({ array: [...arr], index: j });
        }
      }
    }
  };

  const selectionSort = (arr, steps) => {
    for (let i = 0; i < arr.length - 1; i++) {
      let minIndex = i;
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[j] < arr[minIndex]) {
          minIndex = j;
        }
      }
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
      steps.push({ array: [...arr], index: i });
    }
  };

  const insertionSort = (arr, steps) => {
    for (let i = 1; i < arr.length; i++) {
      let key = arr[i];
      let j = i - 1;
      while (j >= 0 && arr[j] > key) {
        arr[j + 1] = arr[j];
        j--;
        steps.push({ array: [...arr], index: j + 1 });
      }
      arr[j + 1] = key;
      steps.push({ array: [...arr], index: j + 1 });
    }
  };

  const mergeSort = (arr, left, right, steps) => {
    if (left < right) {
      const mid = Math.floor((left + right) / 2);
      mergeSort(arr, left, mid, steps);
      mergeSort(arr, mid + 1, right, steps);
      merge(arr, left, mid, right, steps);
    }
  };

  const merge = (arr, left, mid, right, steps) => {
    const n1 = mid - left + 1;
    const n2 = right - mid;

    const L = arr.slice(left, mid + 1);
    const R = arr.slice(mid + 1, right + 1);

    let i = 0,
      j = 0,
      k = left;

    while (i < n1 && j < n2) {
      if (L[i] <= R[j]) {
        arr[k] = L[i];
        i++;
      } else {
        arr[k] = R[j];
        j++;
      }
      k++;
      steps.push({ array: [...arr], index: k - 1 });
    }

    while (i < n1) {
      arr[k] = L[i];
      i++;
      k++;
      steps.push({ array: [...arr], index: k - 1 });
    }

    while (j < n2) {
      arr[k] = R[j];
      j++;
      k++;
      steps.push({ array: [...arr], index: k - 1 });
    }
  };

  const heapSort = (arr, steps) => {
    const n = arr.length;
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      heapify(arr, n, i, steps);
    }
    for (let i = n - 1; i > 0; i--) {
      [arr[0], arr[i]] = [arr[i], arr[0]];
      steps.push({ array: [...arr], index: i });
      heapify(arr, i, 0, steps);
    }
  };

  const heapify = (arr, n, i, steps) => {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n && arr[left] > arr[largest]) {
      largest = left;
    }
    if (right < n && arr[right] > arr[largest]) {
      largest = right;
    }
    if (largest !== i) {
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      steps.push({ array: [...arr], index: i });
      heapify(arr, n, largest, steps);
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

export default SortingVisualizer;
