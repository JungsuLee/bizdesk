import { ModulePage } from "@/components/shared/ModulePage";
import { ColumnDef, FieldDef } from "@/components/shared/PageTable";

const COLUMNS: ColumnDef[] = [
  { key: "name", label: "Event Name" },
  { key: "date", label: "Date" },
  { key: "time", label: "Time" },
  { key: "location", label: "Location" },
  { key: "capacity", label: "Capacity" },
  { key: "price", label: "Price" },
  {
    key: "status",
    label: "Status",
    badgeVariants: { Upcoming: "default", Ongoing: "secondary", Completed: "outline", Cancelled: "destructive" },
  },
];

const FIELDS: FieldDef[] = [
  { key: "name", label: "Event Name", type: "text", placeholder: "e.g. Spring Recital" },
  { key: "date", label: "Date", type: "date" },
  { key: "time", label: "Time", type: "text", placeholder: "e.g. 6:00 PM" },
  { key: "location", label: "Location", type: "text", placeholder: "e.g. Main Hall" },
  { key: "capacity", label: "Capacity", type: "number" },
  { key: "price", label: "Ticket Price", type: "text", placeholder: "$0.00 or Free" },
  { key: "status", label: "Status", type: "select", options: ["Upcoming", "Ongoing", "Completed", "Cancelled"] },
];

const INITIAL_DATA = [
  { id: "1", name: "Spring Recital", date: "2026-05-30", time: "6:00 PM", location: "Main Hall", capacity: 300, price: "$15", status: "Upcoming" },
  { id: "2", name: "Open House", date: "2026-04-20", time: "10:00 AM", location: "All Studios", capacity: 100, price: "Free", status: "Upcoming" },
  { id: "3", name: "Winter Concert", date: "2025-12-15", time: "7:00 PM", location: "City Theater", capacity: 500, price: "$20", status: "Completed" },
];

export default function Page() {
  return (
    <ModulePage
      moduleKey="events"
      title="Events"
      description="Manage performances, recitals, and public events."
      entityName="Event"
      searchKeys={["name", "location"]}
      columns={COLUMNS}
      fields={FIELDS}
      initialData={INITIAL_DATA}
    />
  );
}
