import { PageTable, ColumnDef, FieldDef } from "@/components/shared/PageTable";

const COLUMNS: ColumnDef[] = [
  { key: "student", label: "Student" },
  { key: "instructor", label: "Instructor" },
  { key: "date", label: "Date" },
  { key: "time", label: "Time" },
  { key: "duration", label: "Duration" },
  { key: "price", label: "Price" },
  {
    key: "payment",
    label: "Payment",
    badgeVariants: { Paid: "default", Pending: "secondary", Overdue: "destructive" },
  },
  {
    key: "status",
    label: "Status",
    badgeVariants: { Scheduled: "default", Completed: "secondary", Cancelled: "destructive" },
  },
];

const FIELDS: FieldDef[] = [
  { key: "student", label: "Student", type: "text", placeholder: "Student name" },
  { key: "instructor", label: "Instructor", type: "text", placeholder: "Instructor name" },
  { key: "date", label: "Date", type: "date" },
  { key: "time", label: "Time", type: "text", placeholder: "e.g. 11:00 AM" },
  { key: "duration", label: "Duration", type: "text", placeholder: "e.g. 30 min" },
  { key: "price", label: "Price", type: "text", placeholder: "$0.00" },
  { key: "payment", label: "Payment Status", type: "select", options: ["Paid", "Pending", "Overdue"] },
  { key: "status", label: "Lesson Status", type: "select", options: ["Scheduled", "Completed", "Cancelled"] },
];

const INITIAL_DATA = [
  { id: "1", student: "Emma Wilson", instructor: "Maria Santos", date: "2026-04-15", time: "11:00 AM", duration: "30 min", price: "$40", payment: "Paid", status: "Scheduled" },
  { id: "2", student: "James Brown", instructor: "Maria Santos", date: "2026-04-16", time: "2:00 PM", duration: "60 min", price: "$75", payment: "Pending", status: "Scheduled" },
  { id: "3", student: "Sofia Martinez", instructor: "Lisa Chen", date: "2026-04-10", time: "3:30 PM", duration: "45 min", price: "$55", payment: "Paid", status: "Completed" },
];

export default function PrivateLessonsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Private Lessons</h1>
        <p className="text-sm text-gray-500 mt-1">Schedule and track one-on-one lessons.</p>
      </div>
      <PageTable
        entityName="Lesson"
        searchKeys={["student", "instructor"]}
        columns={COLUMNS}
        fields={FIELDS}
        initialData={INITIAL_DATA}
      />
    </div>
  );
}
