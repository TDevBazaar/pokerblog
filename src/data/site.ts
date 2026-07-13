export const siteConfig = {
  name: "Proker Simulator",
  shortName: "Proker Simulator",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://pokeradvisorblog.com",
  description:
    "Blog educativo para aprender Texas Hold'em, manos, probabilidades y estrategia básica sin promover apuestas.",
  googlePlayUrl:
    process.env.NEXT_PUBLIC_GOOGLE_PLAY_URL ??
    "https://play.google.com/store/apps/details?id=com.pokeradvisor.app",
  navLinks: [
    { label: "Inicio", href: "/" },
    { label: "Aprende Póker", href: "/aprende-poker" },
    { label: "Manos de Póker", href: "/manos-de-poker" },
    { label: "Probabilidades", href: "/probabilidades" },
    { label: "Estrategia", href: "/estrategia" },
    { label: "Glosario", href: "/glosario" },
    { label: "Herramientas", href: "/herramientas" },
  ],
  legalLinks: [
    { label: "Politica de privacidad", href: "#" },
    { label: "Terminos", href: "#" },
    { label: "Contacto", href: "#" },
  ],
  legalNotice:
    "Este sitio es educativo. No ofrecemos apuestas, casinos ni servicios de juego con dinero real.",
};
