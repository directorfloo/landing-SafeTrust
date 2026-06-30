"use client";

import { useEffect, useMemo, useState } from "react";
import { Link } from "next/link";
import { MapPin, Bed, PawPrint, Bath } from "lucide-react";
import { cn } from "@/lib/utils";

const APARTMENTS = [
  {
    id: "1",
    name: "La sabana house",
    address: "329 Calle santos, paseo colón, San José",
    bedrooms: 2,
    petFriendly: true,
    bathrooms: 1,
    price: 4058,
  },
  {
    id: "2",
    name: "Paseo Colón Loft",
    address: "Av. Central, San José",
    bedrooms: 3,
    petFriendly: false,
    bathrooms: 2,
    price: 5280,
  },
];

const STUB_OFFERS = Array.from({ length: 24 }, (_, i) => {
  const createdAt = new Date(2024, 8, 12 - (i % 14));
  const formattedDate = createdAt.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });

  return {
    id: i + 1,
    name: [
      "Diego Duarte Fernández",
      "María Sofía López",
      "Catalina Ruiz",
      "Juan Carlos Vega",
      "Paola Jiménez",
      "Alejandro Castro",
    ][i % 6],
    phone: `+506 6483${String(250 + i).padStart(3, "0")}`,
    wallet: `XR6...${(32 + i).toString(16).toUpperCase()}`,
    offerDate: formattedDate,
    timestamp: createdAt.getTime(),
    status: i % 5 === 1 ? "Accepted" : "Pending",
  };
});

const DATE_OPTIONS = [
  { value: "all", label: "All time" },
  { value: "last7", label: "Last 7 days" },
  { value: "last30", label: "Last 30 days" },
];

const STATUS_OPTIONS = [
  { value: "all", label: "All" },
  { value: "Pending", label: "Pending" },
  { value: "Accepted", label: "Accepted" },
];

const ITEMS_OPTIONS = [5, 10, 20];

export default function InterestedPeoplePage({ params }: { params: { id: string } }) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [dateRange, setDateRange] = useState("all");
  const [status, setStatus] = useState("all");

  const apartment = useMemo(
    () => APARTMENTS.find((item) => item.id === params.id) ?? APARTMENTS[0],
    [params.id],
  );

  const filtered = useMemo(() => {
    const now = new Date("2024-09-12").getTime();
    const dateLimit = dateRange === "last7" ? now - 7 * 24 * 60 * 60 * 1000 : dateRange === "last30" ? now - 30 * 24 * 60 * 60 * 1000 : 0;

    return STUB_OFFERS.filter((offer) => {
      const searchTerm = search.toLowerCase();
      const matchesSearch =
        offer.name.toLowerCase().includes(searchTerm) ||
        offer.phone.includes(searchTerm) ||
        offer.wallet.toLowerCase().includes(searchTerm);

      const matchesStatus = status === "all" || offer.status === status;
      const matchesDate = dateRange === "all" || offer.timestamp >= dateLimit;

      return matchesSearch && matchesStatus && matchesDate;
    });
  }, [search, status, dateRange]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
  const paginated = filtered.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  return (
    <div className="space-y-6 rounded-3xl border border-slate-800 bg-slate-950/80 p-6 shadow-sm shadow-black/20">
      <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-400">
            <span className="rounded-full bg-slate-900 px-3 py-1 font-medium text-slate-200">
              🔥
            </span>
            <span className="text-sm uppercase tracking-[0.24em] text-slate-500">Interested people</span>
          </div>
          <div>
            <h1 className="text-3xl font-semibold text-white">
              {apartment.name}
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
              People who have expressed interest in this apartment listing. Filter by status, date range, or search across name, phone, and wallet.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-slate-400">
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4 text-orange-400" />
              {apartment.address}
            </span>
            <span className="inline-flex items-center gap-2">
              <Bed className="h-4 w-4 text-orange-400" />
              {apartment.bedrooms} bd.
            </span>
            {apartment.petFriendly && (
              <span className="inline-flex items-center gap-2">
                <PawPrint className="h-4 w-4 text-orange-400" />
                Pet friendly
              </span>
            )}
            <span className="inline-flex items-center gap-2">
              <Bath className="h-4 w-4 text-orange-400" />
              {apartment.bathrooms} ba.
            </span>
          </div>
        </div>

        <div className="rounded-3xl bg-slate-900/90 px-6 py-4 text-right">
          <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Price per month</p>
          <p className="mt-3 text-3xl font-semibold text-orange-400">
            ${apartment.price.toLocaleString()}.00
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex-1 min-w-0">
          <label className="relative block">
            <span className="sr-only">Search anything</span>
            <input
              type="text"
              placeholder="Search anything..."
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
              }}
              className="w-full rounded-2xl border border-slate-800 bg-slate-900/90 px-4 py-3 text-sm text-slate-200 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
            />
          </label>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <label className="inline-flex min-w-[12rem] items-center gap-3 rounded-2xl border border-slate-800 bg-slate-900/90 px-4 py-3 text-sm text-slate-200">
            <span className="text-slate-400">Date range</span>
            <select
              value={dateRange}
              onChange={(event) => {
                setDateRange(event.target.value);
                setPage(1);
              }}
              className="w-full bg-transparent text-sm text-slate-200 outline-none"
            >
              {DATE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value} className="bg-slate-950 text-slate-200">
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="inline-flex min-w-[12rem] items-center gap-3 rounded-2xl border border-slate-800 bg-slate-900/90 px-4 py-3 text-sm text-slate-200">
            <span className="text-slate-400">Status</span>
            <select
              value={status}
              onChange={(event) => {
                setStatus(event.target.value);
                setPage(1);
              }}
              className="w-full bg-transparent text-sm text-slate-200 outline-none"
            >
              {STATUS_OPTIONS.map((option) => (
                <option key={option.value} value={option.value} className="bg-slate-950 text-slate-200">
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-800 overflow-hidden bg-slate-950/90">
        <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3 text-sm text-slate-400">
          <span>Showing {paginated.length} of {filtered.length}</span>
          <span className="hidden sm:inline">Apartment ID: {apartment.id}</span>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="bg-slate-900 text-slate-400">
                {['ID No.', 'Name', 'Phone', 'Wallet', 'Offer date', 'Status', ''].map((column) => (
                  <th key={column} className="px-4 py-4 font-medium tracking-wide text-slate-400">
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {paginated.map((offer) => (
                <tr key={offer.id} className="bg-slate-950 transition duration-200 hover:bg-slate-900">
                  <td className="px-4 py-4 text-slate-300">{offer.id}</td>
                  <td className="px-4 py-4 font-semibold text-white">{offer.name}</td>
                  <td className="px-4 py-4 text-slate-300">{offer.phone}</td>
                  <td className="px-4 py-4 font-mono text-slate-300">{offer.wallet}</td>
                  <td className="px-4 py-4 text-slate-300">{offer.offerDate}</td>
                  <td className="px-4 py-4">
                    <span className={cn(
                      "inline-flex rounded-full px-3 py-1 text-xs font-semibold",
                      offer.status === "Accepted"
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
                        : "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300",
                    )}>
                      {offer.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-right text-slate-300">
                    <button className="rounded-full px-2 py-1 text-lg font-bold text-orange-400 transition hover:text-orange-300">
                      ⋯
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-400">Showing {paginated.length} of {filtered.length}</p>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setPage((current) => Math.max(1, current - 1))}
            disabled={page === 1}
            className="rounded-2xl border border-slate-800 bg-slate-900/90 px-3 py-2 text-sm text-slate-300 disabled:opacity-40"
          >
            ‹
          </button>

          {Array.from({ length: totalPages }, (_, index) => index + 1)
            .filter((pageNumber) => pageNumber === 1 || pageNumber === totalPages || Math.abs(pageNumber - page) <= 1)
            .reduce<(number | "...")[]>((acc, pageNumber, idx, arr) => {
              if (idx > 0 && pageNumber - (arr[idx - 1] as number) > 1) {
                acc.push("...");
              }
              acc.push(pageNumber);
              return acc;
            }, [])
            .map((pageNumber, idx) =>
              pageNumber === "..." ? (
                <span key={`ellipsis-${idx}`} className="px-2 text-slate-500">
                  …
                </span>
              ) : (
                <button
                  type="button"
                  key={pageNumber}
                  onClick={() => setPage(pageNumber)}
                  className={cn(
                    "min-w-[2rem] rounded-2xl border px-3 py-2 text-sm",
                    page === pageNumber
                      ? "bg-orange-500 text-white border-orange-500"
                      : "border-slate-800 bg-slate-900/90 text-slate-300 hover:border-slate-700 hover:bg-slate-900",
                  )}
                >
                  {pageNumber}
                </button>
              ),
            )}

          <button
            type="button"
            onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
            disabled={page === totalPages}
            className="rounded-2xl border border-slate-800 bg-slate-900/90 px-3 py-2 text-sm text-slate-300 disabled:opacity-40"
          >
            ›
          </button>
        </div>

        <div className="flex items-center gap-2 text-sm text-slate-400">
          <span>Items per page</span>
          <select
            value={itemsPerPage}
            onChange={(event) => {
              setItemsPerPage(Number(event.target.value));
              setPage(1);
            }}
            className="rounded-2xl border border-slate-800 bg-slate-900/90 px-3 py-2 text-sm text-slate-200 outline-none"
          >
            {ITEMS_OPTIONS.map((option) => (
              <option key={option} value={option} className="bg-slate-950 text-slate-200">
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
