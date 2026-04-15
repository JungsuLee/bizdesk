"use client";

import { useBusinessConfig } from "@/context/BusinessConfigContext";
import { PageTable, ColumnDef, FieldDef } from "./PageTable";

type Row = Record<string, string | number | null>;

type Props = {
  moduleKey: string;
  title: string;
  description: string;
  entityName: string;
  searchKeys?: string[];
  columns: ColumnDef[];
  fields: FieldDef[];
  initialData: Row[];
};

export function ModulePage({
  moduleKey, title, description, entityName,
  searchKeys, columns, fields, initialData,
}: Props) {
  const { getPermission } = useBusinessConfig();
  const permission = getPermission(moduleKey);

  if (permission === "none") {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center space-y-2">
          <p className="text-lg font-semibold text-gray-700">Access Denied</p>
          <p className="text-sm text-gray-400">
            You don&apos;t have permission to view this page.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          <p className="text-sm text-gray-500 mt-1">{description}</p>
        </div>
        {permission === "read" && (
          <span className="text-xs bg-amber-50 text-amber-600 border border-amber-200 px-2.5 py-1 rounded-full font-medium">
            Read Only
          </span>
        )}
      </div>
      <PageTable
        entityName={entityName}
        searchKeys={searchKeys}
        columns={columns}
        fields={fields}
        initialData={initialData}
        permission={permission}
      />
    </div>
  );
}
