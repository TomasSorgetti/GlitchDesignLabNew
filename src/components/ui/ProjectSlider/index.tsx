import { component$, useSignal, useVisibleTask$, $ } from "@builder.io/qwik";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import styles from "./slider.module.css";

export default component$(() => {
  const sliderRef = useSignal<HTMLElement>(); // Referencia al contenedor
  const currentIndex = useSignal(0); // Índice del slide actual
  const slideWidth = 300; // Ancho de cada slide
  const slides = ["Slide 1", "Slide 2", "Slide 3"]; // Contenido de los slides
  const totalSlides = slides.length;

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    gsap.registerPlugin(Draggable);
  });

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    if (!sliderRef.value) return;

    const totalWidth = slideWidth * totalSlides;

    // Posición inicial
    gsap.set(sliderRef.value, { x: 0 });

    // Configurar Draggable
    Draggable.create(sliderRef.value, {
      type: "x", // Solo movimiento horizontal
      bounds: {
        minX: -totalWidth, // Límite izquierdo
        maxX: 0, // Límite derecho
      },
      inertia: true, // Añade inercia al soltar (requiere InertiaPlugin, opcional)
      onDrag: () => {
        // Actualizar el índice según la posición actual
        const xPos = parseFloat(
          gsap.getProperty(sliderRef.value, "x") as string
        );
        currentIndex.value = Math.round(-xPos / slideWidth) % totalSlides;
      },
      onDragEnd: () => {
        // Alinear al slide más cercano al soltar
        const xPos = parseFloat(
          gsap.getProperty(sliderRef.value, "x") as string
        );
        const newIndex = Math.round(-xPos / slideWidth) % totalSlides;
        currentIndex.value = newIndex >= 0 ? newIndex : totalSlides + newIndex;

        gsap.to(sliderRef.value, {
          x: -currentIndex.value * slideWidth,
          duration: 0.3,
          ease: "power2.out",
        });
      },
      onUpdate: () => {
        // Mantener el loop fluido durante el arrastre
        const xPos = parseFloat(
          gsap.getProperty(sliderRef.value, "x") as string
        );
        if (xPos <= -totalWidth) {
          gsap.set(sliderRef.value, { x: xPos + totalWidth });
          currentIndex.value = 0;
        } else if (xPos > 0) {
          gsap.set(sliderRef.value, { x: xPos - totalWidth });
          currentIndex.value = totalSlides - 1;
        }
      },
    });
  });

  // Función para mover el slider con botones (opcional)
  const moveSlider = $((direction: "next" | "prev") => {
    if (!sliderRef.value) return;

    // Actualizar el índice
    if (direction === "next") {
      currentIndex.value = (currentIndex.value + 1) % totalSlides;
    } else if (direction === "prev") {
      currentIndex.value = (currentIndex.value - 1 + totalSlides) % totalSlides;
    }

    // Animar el contenedor hacia la izquierda
    gsap.to(sliderRef.value, {
      x: -currentIndex.value * slideWidth,
      duration: 0.5,
      ease: "power2.out",
    });
  });

  return (
    <div class={styles.sliderWrapper}>
      {/* Contenedor de los slides duplicados */}
      <div class={styles.sliderContainer} ref={sliderRef}>
        {slides.map((slide, index) => (
          <div key={`original-${index}`} class={styles.slide}>
            {slide}
          </div>
        ))}
        {slides.map((slide, index) => (
          <div key={`duplicate-${index}`} class={styles.slide}>
            {slide}
          </div>
        ))}
      </div>

      {/* Botones de navegación (opcional) */}
      <div class={styles.controls}>
        <button onClick$={() => moveSlider("prev")}>Anterior</button>
        <button onClick$={() => moveSlider("next")}>Siguiente</button>
      </div>
    </div>
  );
});
