import { PageTable, ColumnDef, FieldDef } from "@/components/shared/PageTable";

const COLUMNS: ColumnDef[] = [
  { key: "name", label: "Name" },
  { key: "date", label: "Date" },
  { key: "time", label: "Time" },
  { key: "partySize", label: "Party Size" },
  { key: "contact", label: "Contact" },
  { key: "notes", label: "Notes" },
  {
    key: "status",
    label: "Status",
    badgeVariants: { Confirmed: "default", Pending: "secondary", Cancelled: "destructive" },
  },
];

const FIELDS: FieldDef[] = [
  { key: "name", label: "Name / Group", type: "text", placeholder: "e.g. Wilson Family" },
  { key: "date", label: "Date", type: "date" },
  { key: "time", label: "Time", type: "text", placeholder: "e.g. 10:00 AM" },
  { key: "partySize", label: "Party Size", type: "number" },
  { key: "contact", label: "Contact", type: "tel", placeholder: "555-0000" },
  { key: "notes", label: "Notes", type: "text", placeholder: "e.g. Studio A, wheelchair access" },
  { key: "status", label: "Status", type: "select", options: ["Confirmed", "Pending", "Cancelled"] },
];

const INITIAL_DATA = [
  { id: "1", name: "Wilson Family", date: "2026-04-20", time: "10:00 AM", partySize: 4, contact: "555-0401", notes: "Studio A", status: "Confirmed" },
  { id: "2", name: "Brown Study Group", date: "2026-04-22", time: "2:00 PM", partySize: 6, contact: "555-0402", notes: "Conference room", status: "Pending" },
  { id: "3", name: "Martinez Private Event", date: "2026-04-25", time: "6:00 PM", partySize: 20, contact: "555-0403", notes: "Main hall", status: "Confirmed" },
];

export default function ReservationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Reservations</h1>
        <p className="text-sm text-gray-500 mt-1">Manage space and facility reservations.</p>
      </div>
      <PageTable
        entityName="Reservation"
        searchKeys={["name", "contact", "notes"]}
        columns={COLUMNS}
        fields={FIELDS}
        initialData={INITIAL_DATA}
      />
    </div>
  );
}
