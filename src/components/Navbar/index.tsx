import { component$ } from "@builder.io/qwik";
import styles from "./index.module.css";
import Hamburger from "../ui/buttons/Hamburger";

export default component$(() => {
  return (
    <header class={styles.header}>
      <nav>
        <a href="#">Tomás Sorgetti</a>
        <Hamburger />
        <ul class={styles.menu}>
          <li>
            <a href="#projects">projects</a>
          </li>
          <li>
            <a href="#projects">about</a>
          </li>
          <li>
            <a href="#contact">contact</a>
          </li>
        </ul>
      </nav>
    </header>
  );
});
