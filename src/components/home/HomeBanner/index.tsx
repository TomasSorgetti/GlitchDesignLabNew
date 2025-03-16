import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import styles from "./index.module.css";
import MainButton from "../../ui/buttons/MainButton";
import Logo from "../../../assets/images/logo.png?w=411&h=405&jsx";
import { gsap } from "gsap";

export default component$(() => {
  const logoRef = useSignal<HTMLDivElement | undefined>(undefined);
  const contentRef = useSignal<HTMLDivElement | undefined>(undefined);

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    if (logoRef.value) {
      gsap.from(logoRef.value, {
        y: -150,
        duration: 1.2,
        ease: "bounce.out",
        opacity: 0,
        delay: 0.3,
      });
    }
    if (contentRef.value) {
      gsap.from(contentRef.value, {
        duration: 1.2,
        ease: "power2.out",
        opacity: 0,
        filter: "blur(10px)",
        delay: 0.3,
        onComplete: () => {
          gsap.set(contentRef.value!, { filter: "blur(0px)" });
        },
      });
    }
  });

  return (
    <section class={styles.banner}>
      <div class={styles.wrapper}>
        <div ref={contentRef} class={styles.content}>
          <h1>Your Solution in Web Design and Development</h1>
          <p>
            Create stunning, functional websites with our expert web design and
            development services. Let us bring your vision to life online.
          </p>
          <div class={styles.buttons}>
            <MainButton href="#projects" variant="secondary">
              Our Work
            </MainButton>
            <MainButton href="#contact" variant="primary">
              Get in touch
            </MainButton>
          </div>
        </div>
        <Logo ref={logoRef} draggable={false} />
      </div>
    </section>
  );
});
