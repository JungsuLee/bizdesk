import { PageTable, ColumnDef, FieldDef } from "@/components/shared/PageTable";

const COLUMNS: ColumnDef[] = [
  { key: "campaign", label: "Campaign" },
  { key: "goal", label: "Goal" },
  { key: "raised", label: "Raised" },
  { key: "startDate", label: "Start Date" },
  { key: "endDate", label: "End Date" },
  {
    key: "status",
    label: "Status",
    badgeVariants: { Active: "default", Planned: "secondary", Completed: "outline", Cancelled: "destructive" },
  },
];

const FIELDS: FieldDef[] = [
  { key: "campaign", label: "Campaign Name", type: "text", placeholder: "e.g. New Piano Fund" },
  { key: "goal", label: "Goal Amount", type: "text", placeholder: "$0.00" },
  { key: "raised", label: "Amount Raised", type: "text", placeholder: "$0.00" },
  { key: "startDate", label: "Start Date", type: "date" },
  { key: "endDate", label: "End Date", type: "date" },
  { key: "status", label: "Status", type: "select", options: ["Active", "Planned", "Completed", "Cancelled"] },
];

const INITIAL_DATA = [
  { id: "1", campaign: "New Piano Fund", goal: "$10,000", raised: "$6,500", startDate: "2026-01-01", endDate: "2026-06-30", status: "Active" },
  { id: "2", campaign: "Scholarship Drive", goal: "$5,000", raised: "$5,000", startDate: "2025-09-01", endDate: "2025-12-31", status: "Completed" },
  { id: "3", campaign: "Studio Renovation", goal: "$20,000", raised: "$0", startDate: "2026-07-01", endDate: "2026-12-31", status: "Planned" },
];

export default function FundraisingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Fundraising</h1>
        <p className="text-sm text-gray-500 mt-1">Track donation campaigns and fundraising goals.</p>
      </div>
      <PageTable
        entityName="Campaign"
        searchKeys={["campaign"]}
        columns={COLUMNS}
        fields={FIELDS}
        initialData={INITIAL_DATA}
      />
    </div>
  );
}
