import { component$ } from "@builder.io/qwik";
import styles from "./index.module.css";

export default component$(() => {
  return (
    <button class={styles.hamburger}>
      <span></span>
      <span></span>
      <span></span>
    </button>
  );
});
