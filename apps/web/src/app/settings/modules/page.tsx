"use client";

import { useBusinessConfig } from "@/context/BusinessConfigContext";
import { ALL_MODULES } from "@/lib/demo-data";

export default function ModulesPage() {
  const { enabledModules, toggleModule } = useBusinessConfig();

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Modules</h1>
        <p className="text-sm text-gray-500 mt-1">
          Choose which tabs are visible for your business. Changes apply immediately.
        </p>
      </div>

      <div className="bg-white rounded-lg border divide-y">
        {ALL_MODULES.map((mod) => {
          const enabled = enabledModules.includes(mod.key);
          return (
            <div key={mod.key} className="flex items-center justify-between px-5 py-4">
              <div>
                <p className="text-sm font-medium text-gray-800">{mod.label}</p>
                <p className="text-xs text-gray-400 mt-0.5">/{mod.key}</p>
              </div>
              <button
                onClick={() => toggleModule(mod.key)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                  enabled ? "bg-blue-600" : "bg-gray-200"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                    enabled ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
