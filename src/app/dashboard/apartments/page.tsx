import Link from "next/link";
import { Bed, Bath, MapPin, PawPrint, ArrowRight } from "lucide-react";

const APARTMENTS = [
  {
    id: "1",
    name: "La sabana house",
    address: "329 Calle santos, paseo colón, San José",
    bedrooms: 2,
    bathrooms: 1,
    petFriendly: true,
    price: 4058,
  },
  {
    id: "2",
    name: "Paseo Colón Loft",
    address: "Avenida central, San José",
    bedrooms: 3,
    bathrooms: 2,
    petFriendly: false,
    price: 5280,
  },
  {
    id: "3",
    name: "Barrio Escalante Flat",
    address: "Calle 24, Barrio Escalante",
    bedrooms: 1,
    bathrooms: 1,
    petFriendly: true,
    price: 3670,
  },
];

export default function ApartmentsPage() {
  return (
    <div className="space-y-8 rounded-3xl border border-slate-800 bg-slate-950/80 p-6 shadow-sm shadow-slate-950/30">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Interested people</p>
          <h1 className="text-3xl font-semibold text-white">Apartment listings</h1>
          <p className="max-w-2xl text-sm leading-6 text-slate-400">
            Select an apartment to view everyone who expressed interest and review their offers.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-900/90 px-4 py-3 text-sm text-slate-300">
          Navigate to the listing and inspect interested offers per apartment.
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {APARTMENTS.map((apartment) => (
          <Link
            key={apartment.id}
            href={`/dashboard/apartments/${apartment.id}/offers`}
            className="group rounded-3xl border border-slate-800 bg-slate-900/90 p-5 transition hover:border-orange-500 hover:bg-slate-800"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xl font-semibold text-white">{apartment.name}</p>
                <p className="mt-1 text-sm text-slate-400">{apartment.address}</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-orange-500 text-white">
                <ArrowRight className="h-5 w-5" />
              </div>
            </div>

            <div className="mt-5 grid gap-3 text-sm text-slate-400">
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4 text-orange-400" />
                {apartment.address}
              </span>
              <span className="inline-flex items-center gap-2">
                <Bed className="h-4 w-4 text-orange-400" />
                {apartment.bedrooms} bd.
              </span>
              <span className="inline-flex items-center gap-2">
                <Bath className="h-4 w-4 text-orange-400" />
                {apartment.bathrooms} ba.
              </span>
              {apartment.petFriendly && (
                <span className="inline-flex items-center gap-2 text-slate-200">
                  <PawPrint className="h-4 w-4 text-orange-400" />
                  Pet friendly
                </span>
              )}
            </div>

            <div className="mt-5 rounded-2xl bg-slate-950/80 px-4 py-3 text-sm text-slate-300">
              ${apartment.price.toLocaleString()} / month
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
