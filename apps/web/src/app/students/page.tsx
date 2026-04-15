import { PageTable, ColumnDef, FieldDef } from "@/components/shared/PageTable";

const COLUMNS: ColumnDef[] = [
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone" },
  { key: "grade", label: "Grade" },
  { key: "parent", label: "Parent / Guardian" },
  {
    key: "status",
    label: "Status",
    badgeVariants: { Active: "default", Inactive: "secondary" },
  },
  { key: "enrolled", label: "Enrolled" },
];

const FIELDS: FieldDef[] = [
  { key: "name", label: "Full Name", type: "text", placeholder: "e.g. Emma Wilson" },
  { key: "email", label: "Email", type: "email", placeholder: "student@example.com" },
  { key: "phone", label: "Phone", type: "tel", placeholder: "555-0000" },
  { key: "grade", label: "Grade / Level", type: "text", placeholder: "e.g. Grade 5" },
  { key: "parent", label: "Parent / Guardian", type: "text", placeholder: "e.g. Sarah Wilson" },
  { key: "status", label: "Status", type: "select", options: ["Active", "Inactive"] },
  { key: "enrolled", label: "Enrollment Date", type: "date" },
];

const INITIAL_DATA = [
  { id: "1", name: "Emma Wilson", email: "emma@student.com", phone: "555-0301", grade: "Grade 5", parent: "Sarah Wilson", status: "Active", enrolled: "2024-09-01" },
  { id: "2", name: "James Brown", email: "james@student.com", phone: "555-0302", grade: "Grade 3", parent: "Mike Brown", status: "Active", enrolled: "2023-09-01" },
  { id: "3", name: "Sofia Martinez", email: "sofia@student.com", phone: "555-0303", grade: "Grade 7", parent: "Carlos Martinez", status: "Inactive", enrolled: "2022-09-01" },
];

export default function StudentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Students</h1>
        <p className="text-sm text-gray-500 mt-1">Manage student records and enrollment details.</p>
      </div>
      <PageTable
        entityName="Student"
        searchKeys={["name", "email", "grade", "parent"]}
        columns={COLUMNS}
        fields={FIELDS}
        initialData={INITIAL_DATA}
      />
    </div>
  );
}
