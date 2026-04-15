import { PageTable, ColumnDef, FieldDef } from "@/components/shared/PageTable";

const COLUMNS: ColumnDef[] = [
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone" },
  { key: "role", label: "Role" },
  { key: "department", label: "Department" },
  {
    key: "status",
    label: "Status",
    badgeVariants: { Active: "default", "On Leave": "secondary", Inactive: "outline" },
  },
  { key: "startDate", label: "Start Date" },
];

const FIELDS: FieldDef[] = [
  { key: "name", label: "Full Name", type: "text", placeholder: "e.g. Maria Santos" },
  { key: "email", label: "Email", type: "email", placeholder: "email@company.com" },
  { key: "phone", label: "Phone", type: "tel", placeholder: "555-0000" },
  { key: "role", label: "Role", type: "text", placeholder: "e.g. Piano Teacher" },
  { key: "department", label: "Department", type: "text", placeholder: "e.g. Music" },
  { key: "status", label: "Status", type: "select", options: ["Active", "On Leave", "Inactive"] },
  { key: "startDate", label: "Start Date", type: "date" },
];

const INITIAL_DATA = [
  { id: "1", name: "Maria Santos", email: "maria@bizdesk.com", phone: "555-0201", role: "Piano Teacher", department: "Music", status: "Active", startDate: "2021-09-01" },
  { id: "2", name: "John Park", email: "john@bizdesk.com", phone: "555-0202", role: "Administrator", department: "Management", status: "Active", startDate: "2020-01-15" },
  { id: "3", name: "Lisa Chen", email: "lisa@bizdesk.com", phone: "555-0203", role: "Dance Instructor", department: "Dance", status: "On Leave", startDate: "2022-03-01" },
];

export default function StaffPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Staff</h1>
        <p className="text-sm text-gray-500 mt-1">Manage your team members and their details.</p>
      </div>
      <PageTable
        entityName="Staff Member"
        searchKeys={["name", "email", "role", "department"]}
        columns={COLUMNS}
        fields={FIELDS}
        initialData={INITIAL_DATA}
      />
    </div>
  );
}
