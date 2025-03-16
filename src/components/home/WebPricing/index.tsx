import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import styles from "./webPricing.module.css";
import WebPricingCard from "../../ui/cards/WebPricingCard";
import gsap from "gsap";

export default component$(() => {
  const contentRef = useSignal<HTMLDivElement | undefined>(undefined);

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(
    () => {
      if (contentRef.value) {
        gsap.from(contentRef.value, {
          duration: 1.2,
          ease: "power2.out",
          opacity: 0.4,
          filter: "blur(10px)",
          delay: 0.8,
          onComplete: () => {
            gsap.set(contentRef.value!, { filter: "blur(0px)" });
          },
        });
      }
    },
    { strategy: "intersection-observer" }
  );

  return (
    <section class={styles.container}>
      <div class={styles.background}>
        <div class={styles.sync_lines}>
          <div
            class={`${styles.sync_line} ${styles.lazy_background_image} ${styles.lazy_background_image_maskImage} ${styles.lazy_background_image_loaded}`}
          >
            <div></div>
          </div>

          <div
            class={`${styles.sync_line} ${styles.lazy_background_image} ${styles.lazy_background_image_maskImage} ${styles.lazy_background_image_loaded}`}
          >
            <div></div>
          </div>
        </div>
      </div>
      <div class={styles.bg_stars}>
        <div class={styles.stars_container}>
          <div class={styles.stars}>
            <div class={styles.stars_inner}>
              <div class={styles.star}></div>
            </div>
          </div>
        </div>
      </div>
      <div class={styles.content} ref={contentRef}>
        <h2>Affordable Custom Software</h2>
        <p>
          Pick a plan that fits, from landing pages to institutional sites and
          scalable ecommerce solutions. Our web design and development delivers
          tailored results at budget-friendly prices.
        </p>
      </div>
      <div class={styles.cardsContainer}>
        <WebPricingCard />
        <WebPricingCard />
        <WebPricingCard />
      </div>
    </section>
  );
});
