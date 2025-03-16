import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { gsap } from "gsap";
import styles from "./webPricingCard.module.css";
import MainButton from "../../buttons/MainButton";

export default component$(() => {
  const cardRef = useSignal<HTMLDivElement | undefined>(undefined);
  const contentRef = useSignal<HTMLDivElement | undefined>(undefined);
  const overlayRef = useSignal<HTMLDivElement | undefined>(undefined);

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(
    () => {
      if (contentRef.value && overlayRef.value) {
        gsap.set(contentRef.value, { clipPath: "inset(0 100% 0 0)" });
        gsap.set(overlayRef.value, { opacity: 1 });

        const tl = gsap.timeline({ delay: 1 });

        tl.to(contentRef.value, {
          clipPath: "inset(0 0% 0 0)",
          duration: 2.6,
          ease: "power2.out",
        }).to(
          overlayRef.value,
          {
            opacity: 0,
            duration: 1,
            ease: "power2.out",
          },
          "<"
        );
      }
    },
    { strategy: "intersection-observer" }
  );

  return (
    <div class={styles.card} ref={cardRef}>
      <div class={styles.background}></div>
      <div class={styles.bg_stars}>
        <div class={styles.stars_container}>
          <div class={styles.stars}>
            <div class={styles.stars_inner}>
              <div class={styles.star}></div>
            </div>
          </div>
        </div>
      </div>
      {/* Contenido real de la tarjeta */}
      <div class={styles.content} ref={contentRef}>
        <span>LANDING PAGE</span>
        <h2>US$ 299</h2>
        <ul>
          <li>Diseño Personalizado</li>
          <li>Diseño Personalizado</li>
          <li>Diseño Personalizado</li>
          <li>Diseño Personalizado</li>
          <li>Diseño Personalizado</li>
        </ul>
        <MainButton href="#" variant="primary">
          Order Now
        </MainButton>
      </div>
      {/* Overlay del skeleton */}
      <div class={styles.overlay} ref={overlayRef}></div>
    </div>
  );
});
