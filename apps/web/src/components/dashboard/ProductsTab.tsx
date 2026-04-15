"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProductRow } from "./types";

const INITIAL_PRODUCTS: ProductRow[] = [
  {
    id: "1",
    name: "Business Starter Pack",
    category: "Service",
    price: "$299.00",
    stock: 50,
    status: "In Stock",
  },
  {
    id: "2",
    name: "Pro Analytics Suite",
    category: "Software",
    price: "$799.00",
    stock: 5,
    status: "Low Stock",
  },
  {
    id: "3",
    name: "Office Supply Bundle",
    category: "Physical",
    price: "$49.99",
    stock: 0,
    status: "Out of Stock",
  },
];

const EMPTY_FORM = {
  name: "",
  category: "",
  price: "",
  stock: 0,
  status: "In Stock" as ProductRow["status"],
};

const STATUS_COLORS: Record<ProductRow["status"], "default" | "secondary" | "destructive"> = {
  "In Stock": "default",
  "Low Stock": "secondary",
  "Out of Stock": "destructive",
};

export function ProductsTab() {
  const [products, setProducts] = useState<ProductRow[]>(INITIAL_PRODUCTS);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductRow | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  function openAdd() {
    setEditingProduct(null);
    setForm(EMPTY_FORM);
    setOpen(true);
  }

  function openEdit(product: ProductRow) {
    setEditingProduct(product);
    setForm({
      name: product.name,
      category: product.category,
      price: product.price,
      stock: product.stock,
      status: product.status,
    });
    setOpen(true);
  }

  function handleSave() {
    if (!form.name || !form.price) return;
    if (editingProduct) {
      setProducts((prev) =>
        prev.map((p) => (p.id === editingProduct.id ? { ...p, ...form } : p))
      );
    } else {
      const newProduct: ProductRow = {
        id: Date.now().toString(),
        ...form,
      };
      setProducts((prev) => [...prev, newProduct]);
    }
    setOpen(false);
  }

  function handleDelete(id: string) {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Input
          placeholder="Search by name or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-xs"
        />
        <Button onClick={openAdd}>+ Add Product</Button>
      </div>

      <div className="rounded-lg border bg-white overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-gray-400 py-8">
                  No products found.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell className="text-gray-600">{product.category}</TableCell>
                  <TableCell className="text-gray-600">{product.price}</TableCell>
                  <TableCell className="text-gray-600">{product.stock}</TableCell>
                  <TableCell>
                    <Badge variant={STATUS_COLORS[product.status]}>
                      {product.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => openEdit(product)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(product.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingProduct ? "Edit Product" : "Add New Product"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1">
              <Label>Product Name</Label>
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Product name"
              />
            </div>
            <div className="space-y-1">
              <Label>Category</Label>
              <Input
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                placeholder="e.g. Service, Software, Physical"
              />
            </div>
            <div className="space-y-1">
              <Label>Price</Label>
              <Input
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                placeholder="$0.00"
              />
            </div>
            <div className="space-y-1">
              <Label>Stock Quantity</Label>
              <Input
                type="number"
                value={form.stock}
                onChange={(e) =>
                  setForm({ ...form, stock: parseInt(e.target.value) || 0 })
                }
                placeholder="0"
              />
            </div>
            <div className="space-y-1">
              <Label>Status</Label>
              <Select
                value={form.status}
                onValueChange={(v) =>
                  setForm({ ...form, status: v as ProductRow["status"] })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="In Stock">In Stock</SelectItem>
                  <SelectItem value="Low Stock">Low Stock</SelectItem>
                  <SelectItem value="Out of Stock">Out of Stock</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              {editingProduct ? "Save Changes" : "Add Product"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
