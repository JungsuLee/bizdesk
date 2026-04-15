import { ModulePage } from "@/components/shared/ModulePage";
import { ColumnDef, FieldDef } from "@/components/shared/PageTable";

const COLUMNS: ColumnDef[] = [
  { key: "name", label: "Class Name" },
  { key: "instructor", label: "Instructor" },
  { key: "day", label: "Day" },
  { key: "time", label: "Time" },
  { key: "duration", label: "Duration" },
  { key: "capacity", label: "Capacity" },
  { key: "enrolled", label: "Enrolled" },
  { key: "price", label: "Price" },
  {
    key: "status",
    label: "Status",
    badgeVariants: { Active: "default", Full: "secondary", Cancelled: "destructive" },
  },
];

const FIELDS: FieldDef[] = [
  { key: "name", label: "Class Name", type: "text", placeholder: "e.g. Beginner Piano" },
  { key: "instructor", label: "Instructor", type: "text", placeholder: "e.g. Maria Santos" },
  { key: "day", label: "Day", type: "select", options: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] },
  { key: "time", label: "Time", type: "text", placeholder: "e.g. 10:00 AM" },
  { key: "duration", label: "Duration", type: "text", placeholder: "e.g. 60 min" },
  { key: "capacity", label: "Capacity", type: "number", placeholder: "10" },
  { key: "enrolled", label: "Enrolled", type: "number", placeholder: "0" },
  { key: "price", label: "Price", type: "text", placeholder: "$0.00" },
  { key: "status", label: "Status", type: "select", options: ["Active", "Full", "Cancelled"] },
];

const INITIAL_DATA = [
  { id: "1", name: "Beginner Piano", instructor: "Maria Santos", day: "Monday", time: "10:00 AM", duration: "60 min", capacity: 10, enrolled: 7, price: "$50", status: "Active" },
  { id: "2", name: "Jazz Dance", instructor: "Lisa Chen", day: "Wednesday", time: "3:00 PM", duration: "90 min", capacity: 15, enrolled: 15, price: "$65", status: "Full" },
  { id: "3", name: "Music Theory 101", instructor: "John Park", day: "Friday", time: "2:00 PM", duration: "60 min", capacity: 20, enrolled: 5, price: "$40", status: "Active" },
];

export default function Page() {
  return (
    <ModulePage
      moduleKey="classes"
      title="Classes"
      description="Schedule and manage group classes."
      entityName="Class"
      searchKeys={["name", "instructor", "day"]}
      columns={COLUMNS}
      fields={FIELDS}
      initialData={INITIAL_DATA}
    />
  );
}
