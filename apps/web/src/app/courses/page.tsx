import { PageTable, ColumnDef, FieldDef } from "@/components/shared/PageTable";

const COLUMNS: ColumnDef[] = [
  { key: "name", label: "Course Name" },
  { key: "category", label: "Category" },
  { key: "instructor", label: "Instructor" },
  { key: "duration", label: "Duration" },
  { key: "price", label: "Price" },
  { key: "capacity", label: "Capacity" },
  { key: "enrolled", label: "Enrolled" },
  {
    key: "status",
    label: "Status",
    badgeVariants: { Active: "default", Draft: "secondary", Archived: "outline" },
  },
];

const FIELDS: FieldDef[] = [
  { key: "name", label: "Course Name", type: "text", placeholder: "e.g. Piano Fundamentals" },
  { key: "category", label: "Category", type: "text", placeholder: "e.g. Music, Dance, Theory" },
  { key: "instructor", label: "Instructor", type: "text", placeholder: "Instructor name" },
  { key: "duration", label: "Duration", type: "text", placeholder: "e.g. 12 weeks" },
  { key: "price", label: "Price", type: "text", placeholder: "$0.00" },
  { key: "capacity", label: "Capacity", type: "number" },
  { key: "enrolled", label: "Enrolled", type: "number" },
  { key: "status", label: "Status", type: "select", options: ["Active", "Draft", "Archived"] },
];

const INITIAL_DATA = [
  { id: "1", name: "Piano Fundamentals", category: "Music", instructor: "Maria Santos", duration: "12 weeks", price: "$480", capacity: 10, enrolled: 7, status: "Active" },
  { id: "2", name: "Contemporary Dance", category: "Dance", instructor: "Lisa Chen", duration: "8 weeks", price: "$320", capacity: 12, enrolled: 10, status: "Active" },
  { id: "3", name: "Music History", category: "Theory", instructor: "John Park", duration: "6 weeks", price: "$240", capacity: 20, enrolled: 3, status: "Draft" },
];

export default function CoursesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Courses</h1>
        <p className="text-sm text-gray-500 mt-1">Manage multi-week structured course offerings.</p>
      </div>
      <PageTable
        entityName="Course"
        searchKeys={["name", "category", "instructor"]}
        columns={COLUMNS}
        fields={FIELDS}
        initialData={INITIAL_DATA}
      />
    </div>
  );
}
