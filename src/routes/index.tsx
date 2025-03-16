import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import HomeBanner from "~/components/home/HomeBanner";
import WebPricing from "~/components/home/WebPricing";

export default component$(() => {
  return (
    <main>
      <HomeBanner />
      <WebPricing />
    </main>
  );
});

export const head: DocumentHead = {
  title: "Glitch Design Lab",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
