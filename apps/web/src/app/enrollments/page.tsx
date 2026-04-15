import { PageTable, ColumnDef, FieldDef } from "@/components/shared/PageTable";

const COLUMNS: ColumnDef[] = [
  { key: "student", label: "Student" },
  { key: "course", label: "Course / Class" },
  { key: "enrolledDate", label: "Enrolled Date" },
  { key: "amount", label: "Amount" },
  {
    key: "payment",
    label: "Payment",
    badgeVariants: { Paid: "default", Pending: "secondary", Overdue: "destructive" },
  },
  {
    key: "status",
    label: "Status",
    badgeVariants: { Active: "default", Completed: "secondary", Dropped: "destructive" },
  },
];

const FIELDS: FieldDef[] = [
  { key: "student", label: "Student", type: "text", placeholder: "Student name" },
  { key: "course", label: "Course / Class", type: "text", placeholder: "Course or class name" },
  { key: "enrolledDate", label: "Enrollment Date", type: "date" },
  { key: "amount", label: "Amount", type: "text", placeholder: "$0.00" },
  { key: "payment", label: "Payment Status", type: "select", options: ["Paid", "Pending", "Overdue"] },
  { key: "status", label: "Enrollment Status", type: "select", options: ["Active", "Completed", "Dropped"] },
];

const INITIAL_DATA = [
  { id: "1", student: "Emma Wilson", course: "Piano Fundamentals", enrolledDate: "2024-09-01", amount: "$480", payment: "Paid", status: "Active" },
  { id: "2", student: "James Brown", course: "Music Theory 101", enrolledDate: "2024-09-05", amount: "$40", payment: "Pending", status: "Active" },
  { id: "3", student: "Sofia Martinez", course: "Contemporary Dance", enrolledDate: "2024-08-15", amount: "$320", payment: "Overdue", status: "Dropped" },
];

export default function EnrollmentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Enrollments</h1>
        <p className="text-sm text-gray-500 mt-1">Track student enrollments and payment status.</p>
      </div>
      <PageTable
        entityName="Enrollment"
        searchKeys={["student", "course"]}
        columns={COLUMNS}
        fields={FIELDS}
        initialData={INITIAL_DATA}
      />
    </div>
  );
}
