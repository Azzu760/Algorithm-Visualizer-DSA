import { useRouter } from "next/router";
import styles from "../components/AlgorithmDetail.module.css";

const AlgorithmDetail = ({ algorithmData }) => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Algorithm: {id}</h1>
      <p className={styles.description}>{algorithmData.description}</p>
      <button className={styles.backButton} onClick={() => router.back()}>
        Back
      </button>
    </div>
  );
};

export async function getStaticPaths() {
  const paths = [
    { params: { id: "quicksort" } },
    { params: { id: "mergesort" } },
    { params: { id: "heapsort" } },
    { params: { id: "selectionsort" } },
    { params: { id: "insertionsort" } },
    { params: { id: "bubblesort" } },
    { params: { id: "linearsearch" } },
    { params: { id: "binarysearch" } },
  ];

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const algorithmData = {
    description: `${params.id} is an algorithm used for various purposes.`,
  };

  return {
    props: {
      algorithmData,
    },
  };
}

export default AlgorithmDetail;
