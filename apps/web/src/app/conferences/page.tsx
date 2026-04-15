import { ModulePage } from "@/components/shared/ModulePage";
import { ColumnDef, FieldDef } from "@/components/shared/PageTable";

const COLUMNS: ColumnDef[] = [
  { key: "name", label: "Conference Name" },
  { key: "date", label: "Date" },
  { key: "location", label: "Location" },
  { key: "organizer", label: "Organizer" },
  { key: "capacity", label: "Capacity" },
  {
    key: "status",
    label: "Status",
    badgeVariants: { Upcoming: "default", Ongoing: "secondary", Completed: "outline", Cancelled: "destructive" },
  },
];

const FIELDS: FieldDef[] = [
  { key: "name", label: "Conference Name", type: "text", placeholder: "e.g. Annual Music Summit" },
  { key: "date", label: "Date", type: "date" },
  { key: "location", label: "Location", type: "text", placeholder: "e.g. City Hall" },
  { key: "organizer", label: "Organizer", type: "text", placeholder: "Organizer name" },
  { key: "capacity", label: "Capacity", type: "number" },
  { key: "status", label: "Status", type: "select", options: ["Upcoming", "Ongoing", "Completed", "Cancelled"] },
];

const INITIAL_DATA = [
  { id: "1", name: "Annual Music Summit", date: "2026-05-15", location: "City Hall", organizer: "John Park", capacity: 200, status: "Upcoming" },
  { id: "2", name: "Arts Education Forum", date: "2026-06-20", location: "Grand Hotel", organizer: "Maria Santos", capacity: 150, status: "Upcoming" },
  { id: "3", name: "Dance Showcase 2025", date: "2025-11-10", location: "Main Studio", organizer: "Lisa Chen", capacity: 100, status: "Completed" },
];

export default function Page() {
  return (
    <ModulePage
      moduleKey="conferences"
      title="Conferences"
      description="Plan and track professional conferences."
      entityName="Conference"
      searchKeys={["name", "location", "organizer"]}
      columns={COLUMNS}
      fields={FIELDS}
      initialData={INITIAL_DATA}
    />
  );
}
