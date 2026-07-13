import Link from "next/link";

import { Container } from "@/components/Container";

export default function NotFound() {
  return (
    <main className="border-b border-white/10 bg-site-radial py-20">
      <Container>
        <p className="text-sm font-semibold text-poker">404</p>
        <h1 className="mt-4 font-display text-4xl font-bold text-white">
          Página no encontrada
        </h1>
        <p className="mt-4 max-w-xl text-base leading-7 text-muted">
          La guía que buscas no existe o cambió de dirección.
        </p>
        <Link
          className="focus-ring mt-8 inline-flex rounded bg-action px-5 py-3 text-sm font-semibold text-night"
          href="/"
        >
          Volver al inicio
        </Link>
      </Container>
    </main>
  );
}
