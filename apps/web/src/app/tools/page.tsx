import { ModulePage } from "@/components/shared/ModulePage";
import { ColumnDef, FieldDef } from "@/components/shared/PageTable";

const COLUMNS: ColumnDef[] = [
  { key: "name", label: "Tool / Equipment" },
  { key: "category", label: "Category" },
  {
    key: "condition",
    label: "Condition",
    badgeVariants: { Excellent: "default", Good: "secondary", Fair: "outline", Poor: "destructive" },
  },
  { key: "assignedTo", label: "Assigned To" },
  { key: "lastMaintained", label: "Last Maintained" },
  {
    key: "status",
    label: "Status",
    badgeVariants: { Available: "default", "In Use": "secondary", Maintenance: "outline", Retired: "destructive" },
  },
];

const FIELDS: FieldDef[] = [
  { key: "name", label: "Tool / Equipment Name", type: "text", placeholder: "e.g. Yamaha Upright Piano" },
  { key: "category", label: "Category", type: "text", placeholder: "e.g. Instrument, Audio, Furniture" },
  { key: "condition", label: "Condition", type: "select", options: ["Excellent", "Good", "Fair", "Poor"] },
  { key: "assignedTo", label: "Assigned To", type: "text", placeholder: "e.g. Studio A, Maria Santos" },
  { key: "lastMaintained", label: "Last Maintained", type: "date" },
  { key: "status", label: "Status", type: "select", options: ["Available", "In Use", "Maintenance", "Retired"] },
];

const INITIAL_DATA = [
  { id: "1", name: "Yamaha Upright Piano", category: "Instrument", condition: "Excellent", assignedTo: "Studio A", lastMaintained: "2026-01-15", status: "In Use" },
  { id: "2", name: "Portable Sound System", category: "Audio", condition: "Good", assignedTo: "Maria Santos", lastMaintained: "2025-12-01", status: "Available" },
  { id: "3", name: "Ballet Barre", category: "Dance Equipment", condition: "Fair", assignedTo: "Dance Studio", lastMaintained: "2025-09-15", status: "In Use" },
];

export default function Page() {
  return (
    <ModulePage
      moduleKey="tools"
      title="Tools"
      description="Track equipment, instruments, and facility tools."
      entityName="Tool"
      searchKeys={["name", "category", "assignedTo"]}
      columns={COLUMNS}
      fields={FIELDS}
      initialData={INITIAL_DATA}
    />
  );
}
