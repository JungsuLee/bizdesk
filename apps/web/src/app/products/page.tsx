import { PageTable, ColumnDef, FieldDef } from "@/components/shared/PageTable";

const COLUMNS: ColumnDef[] = [
  { key: "name", label: "Product Name" },
  { key: "category", label: "Category" },
  { key: "price", label: "Price" },
  { key: "stock", label: "Stock" },
  {
    key: "status",
    label: "Status",
    badgeVariants: { "In Stock": "default", "Low Stock": "secondary", "Out of Stock": "destructive" },
  },
];

const FIELDS: FieldDef[] = [
  { key: "name", label: "Product Name", type: "text", placeholder: "e.g. Piano Workbook" },
  { key: "category", label: "Category", type: "text", placeholder: "e.g. Books, Equipment" },
  { key: "price", label: "Price", type: "text", placeholder: "$0.00" },
  { key: "stock", label: "Stock Quantity", type: "number" },
  { key: "status", label: "Status", type: "select", options: ["In Stock", "Low Stock", "Out of Stock"] },
];

const INITIAL_DATA = [
  { id: "1", name: "Piano Lesson Workbook", category: "Books", price: "$24.99", stock: 45, status: "In Stock" },
  { id: "2", name: "Dance Shoes (Size 7)", category: "Equipment", price: "$89.99", stock: 3, status: "Low Stock" },
  { id: "3", name: "Music Theory Flashcards", category: "Books", price: "$14.99", stock: 0, status: "Out of Stock" },
];

export default function ProductsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Products</h1>
        <p className="text-sm text-gray-500 mt-1">Manage inventory and product listings.</p>
      </div>
      <PageTable
        entityName="Product"
        searchKeys={["name", "category"]}
        columns={COLUMNS}
        fields={FIELDS}
        initialData={INITIAL_DATA}
      />
    </div>
  );
}
