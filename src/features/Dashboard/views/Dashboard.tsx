import { Link, useLocation } from "react-router-dom";
import { GraduationCap, Newspaper, Image, Building2 } from "lucide-react";

import AdminLayout from "../../../components/layouts/applayout";
import Card from "../../../components/ui/card";
import PreinscripcionesTable from "../../preinscripciones/components/PreinscripcionesTable";
import ComponentLibrary from "./ComponentLibrary";

export default function Dashboard() {
  const { pathname } = useLocation();

  const esBiblioteca = pathname.endsWith("/componentes");
  const esSolicitudes = pathname.endsWith("/preinscripciones");

  return (
    <AdminLayout>
      <div className="space-y-6 pb-6">
        <header className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold text-[#8A6700]">
              Administración de contenidos
            </p>

            <h1 className="mt-1 text-3xl font-black tracking-tight text-zinc-950 sm:text-4xl">
              {esBiblioteca
                ? "Componentes UI"
                : esSolicitudes
                  ? "Resumen de preinscripciones"
                  : "Vista general"}
            </h1>

            <p className="mt-2 text-sm text-zinc-500 sm:text-base">
              {esBiblioteca
                ? "Biblioteca de componentes reutilizables."
                : "Consultá las preinscripciones y accedé a los módulos del instituto."}
            </p>
          </div>
        </header>

        {!esBiblioteca && (
          <nav aria-label="Accesos rápidos" className="space-y-3">
            <h2 className="text-sm font-bold text-zinc-700">Accesos rápidos</h2>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                {
                  titulo: "Carreras",
                  ruta: "/admin/carreras",
                  icono: GraduationCap,
                },
                {
                  titulo: "Sedes",
                  ruta: "/admin/sedes",
                  icono: Building2,
                },
                {
                  titulo: "Noticias",
                  ruta: "/admin/noticias",
                  icono: Newspaper,
                },
                {
                  titulo: "Galería",
                  ruta: "/admin/galeria",
                  icono: Image,
                },
              ].map(({ titulo, ruta, icono: Icono }) => (
                <Link
                  key={ruta}
                  to={ruta}
                  className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm font-bold text-zinc-800 shadow-sm transition hover:border-[#E4B600] hover:bg-amber-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
                >
                  <Icono
                    size={20}
                    className="shrink-0 text-[#8A6700]"
                    aria-hidden="true"
                  />
                  {titulo}
                </Link>
              ))}
            </div>
          </nav>
        )}

        {esBiblioteca ? (
          <ComponentLibrary />
        ) : (
          <section className="min-w-0" aria-label="Preinscripciones recibidas">
            <Card
              titulo="Preinscripciones recibidas"
              descripcion="Consultá las solicitudes de ingreso registradas."
            >
              <PreinscripcionesTable />
            </Card>
          </section>
        )}
      </div>


    </AdminLayout>
  );
}
