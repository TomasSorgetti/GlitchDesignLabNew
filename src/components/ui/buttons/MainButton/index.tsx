import { Slot, component$ } from "@builder.io/qwik";
import styles from "./mainButton.module.css";

type MainButtonProps = {
  href: string;
  variant: "primary" | "secondary";
};
export default component$(({ href, variant = "primary" }: MainButtonProps) => {
  return (
    <a href={href} class={`${styles.button} ${styles[variant]}`}>
      <Slot />
    </a>
  );
});
