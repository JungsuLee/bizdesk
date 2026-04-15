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
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type BadgeVariant = "default" | "secondary" | "destructive" | "outline";

export type ColumnDef = {
  key: string;
  label: string;
  badgeVariants?: Record<string, BadgeVariant>;
};

export type FieldDef = {
  key: string;
  label: string;
  type: "text" | "email" | "tel" | "number" | "date" | "select";
  options?: string[];
  placeholder?: string;
};

type Row = Record<string, string | number | null>;

type Props = {
  entityName: string;
  searchKeys?: string[];
  columns: ColumnDef[];
  fields: FieldDef[];
  initialData: Row[];
};

function makeEmptyForm(fields: FieldDef[]): Row {
  const form: Row = {};
  for (const f of fields) {
    form[f.key] = f.type === "number" ? 0 : (f.options?.[0] ?? "");
  }
  return form;
}

export function PageTable({
  entityName,
  searchKeys = [],
  columns,
  fields,
  initialData,
}: Props) {
  const [rows, setRows] = useState<Row[]>(initialData);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [editingRow, setEditingRow] = useState<Row | null>(null);
  const [form, setForm] = useState<Row>(() => makeEmptyForm(fields));

  const filtered =
    search && searchKeys.length
      ? rows.filter((row) =>
          searchKeys.some((key) =>
            String(row[key] ?? "")
              .toLowerCase()
              .includes(search.toLowerCase())
          )
        )
      : rows;

  function openAdd() {
    setEditingRow(null);
    setForm(makeEmptyForm(fields));
    setOpen(true);
  }

  function openEdit(row: Row) {
    setEditingRow(row);
    setForm({ ...row });
    setOpen(true);
  }

  function handleSave() {
    if (editingRow) {
      setRows((prev) =>
        prev.map((r) => (r.id === editingRow.id ? { ...r, ...form } : r))
      );
    } else {
      setRows((prev) => [...prev, { ...form, id: Date.now().toString() }]);
    }
    setOpen(false);
  }

  function handleDelete(id: string | number | null) {
    setRows((prev) => prev.filter((r) => r.id !== id));
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Input
          placeholder={`Search ${entityName.toLowerCase()}s...`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-xs"
        />
        <Button onClick={openAdd}>+ Add {entityName}</Button>
      </div>

      <div className="rounded-lg border bg-white overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((col) => (
                <TableHead key={col.key}>{col.label}</TableHead>
              ))}
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length + 1}
                  className="text-center text-gray-400 py-10"
                >
                  No {entityName.toLowerCase()}s found.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((row) => (
                <TableRow key={row.id}>
                  {columns.map((col, i) => (
                    <TableCell
                      key={col.key}
                      className={i === 0 ? "font-medium" : "text-gray-600"}
                    >
                      {col.badgeVariants ? (
                        <Badge
                          variant={
                            col.badgeVariants[String(row[col.key])] ??
                            "default"
                          }
                        >
                          {String(row[col.key])}
                        </Badge>
                      ) : (
                        String(row[col.key] ?? "—")
                      )}
                    </TableCell>
                  ))}
                  <TableCell className="text-right space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => openEdit(row)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(row.id)}
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
        <DialogContent className="max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingRow ? `Edit ${entityName}` : `Add ${entityName}`}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            {fields.map((field) => (
              <div key={field.key} className="space-y-1">
                <Label>{field.label}</Label>
                {field.type === "select" ? (
                  <Select
                    value={String(form[field.key] ?? "")}
                    onValueChange={(v) =>
                      setForm({ ...form, [field.key]: v })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {field.options?.map((opt) => (
                        <SelectItem key={opt} value={opt}>
                          {opt}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <Input
                    type={field.type}
                    value={String(form[field.key] ?? "")}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        [field.key]:
                          field.type === "number"
                            ? parseInt(e.target.value) || 0
                            : e.target.value,
                      })
                    }
                    placeholder={field.placeholder ?? ""}
                  />
                )}
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              {editingRow ? "Save Changes" : `Add ${entityName}`}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
