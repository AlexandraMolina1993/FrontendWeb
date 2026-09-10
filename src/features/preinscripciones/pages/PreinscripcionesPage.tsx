import { ClipboardList } from "lucide-react";
import AdminLayout from "../../../components/layouts/applayout";
import PreinscripcionesTable from "../components/PreinscripcionesTable";

export default function PreinscripcionesPage() {
  return (
    <AdminLayout>
      <main>
        <section className="bg-[#171717] px-5 py-16 text-white sm:px-8 lg:px-12">
          <div className="mx-auto max-w-7xl">
            <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-[#FFD21A]">
              <ClipboardList size={17} /> Admisiones
            </p>
            <h1 className="mt-3 max-w-2xl text-4xl font-black sm:text-5xl">
              Preinscripciones recibidas
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-white/70">
              Consultá las solicitudes de ingreso registradas en la API.
            </p>
          </div>
        </section>
        <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-12">
          <PreinscripcionesTable />
        </section>
      </main>
    </AdminLayout>
  );
}
