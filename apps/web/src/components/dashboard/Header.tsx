export function Header() {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-sm">B</span>
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-900">BizDesk</h1>
          <p className="text-xs text-gray-500">Business Management Dashboard</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-sm font-medium text-gray-900">Admin</p>
          <p className="text-xs text-gray-500">Administrator</p>
        </div>
        <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center">
          <span className="text-blue-700 font-semibold text-sm">A</span>
        </div>
      </div>
    </header>
  );
}
