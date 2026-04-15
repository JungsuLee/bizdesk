export type UserRow = {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: "Active" | "Inactive";
  joinedAt: string;
};

export type StaffRow = {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  status: "Active" | "On Leave" | "Inactive";
  startDate: string;
};

export type ProductRow = {
  id: string;
  name: string;
  category: string;
  price: string;
  stock: number;
  status: "In Stock" | "Low Stock" | "Out of Stock";
};
