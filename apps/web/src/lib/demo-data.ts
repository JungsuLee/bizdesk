export type Permission = "none" | "read" | "write";
export type ModulePermissions = Record<string, Permission>;

export const ALL_MODULES = [
  { key: "staff", label: "Staff" },
  { key: "students", label: "Students" },
  { key: "classes", label: "Classes" },
  { key: "courses", label: "Courses" },
  { key: "private-lessons", label: "Private Lessons" },
  { key: "enrollments", label: "Enrollments" },
  { key: "events", label: "Events" },
  { key: "conferences", label: "Conferences" },
  { key: "fundraising", label: "Fundraising" },
  { key: "products", label: "Products" },
  { key: "reservations", label: "Reservations" },
  { key: "tools", label: "Tools" },
];

export type Business = {
  id: string;
  name: string;
  type: string;
  enabledModules: string[];
};

export type Role = {
  id: string;
  businessId: string;
  name: string;
  permissions: ModulePermissions;
};

export type User = {
  id: string;
  email: string;
  password: string;
  name: string;
  businessId: string | null;
  roleId: string | null;
  isSuperAdmin: boolean;
  isBusinessAdmin: boolean;
};

export const BUSINESSES: Business[] = [
  {
    id: "biz-001",
    name: "Music School NYC",
    type: "Music School",
    enabledModules: [
      "staff", "students", "classes", "courses",
      "private-lessons", "enrollments", "events", "products", "tools",
    ],
  },
  {
    id: "biz-002",
    name: "Yoga Studio LA",
    type: "Fitness Studio",
    enabledModules: [
      "staff", "students", "classes", "events", "products", "reservations",
    ],
  },
];

export const ROLES: Role[] = [
  {
    id: "role-001",
    businessId: "biz-001",
    name: "Senior Instructor",
    permissions: {
      staff: "none", students: "write", classes: "write", courses: "read",
      "private-lessons": "write", enrollments: "read", events: "read",
      conferences: "none", fundraising: "none", products: "none",
      reservations: "none", tools: "read",
    },
  },
  {
    id: "role-002",
    businessId: "biz-001",
    name: "Front Desk",
    permissions: {
      staff: "none", students: "read", classes: "read", courses: "none",
      "private-lessons": "none", enrollments: "read", events: "write",
      conferences: "none", fundraising: "none", products: "write",
      reservations: "write", tools: "none",
    },
  },
  {
    id: "role-003",
    businessId: "biz-002",
    name: "Yoga Instructor",
    permissions: {
      staff: "none", students: "read", classes: "write", courses: "none",
      "private-lessons": "none", enrollments: "none", events: "read",
      conferences: "none", fundraising: "none", products: "none",
      reservations: "none", tools: "none",
    },
  },
];

export const USERS: User[] = [
  {
    id: "u-001", email: "superadmin@bizdesk.com", password: "demo1234",
    name: "Super Admin", businessId: null, roleId: null,
    isSuperAdmin: true, isBusinessAdmin: false,
  },
  {
    id: "u-002", email: "admin@musicschool.com", password: "demo1234",
    name: "John Park", businessId: "biz-001", roleId: null,
    isSuperAdmin: false, isBusinessAdmin: true,
  },
  {
    id: "u-003", email: "instructor@musicschool.com", password: "demo1234",
    name: "Maria Santos", businessId: "biz-001", roleId: "role-001",
    isSuperAdmin: false, isBusinessAdmin: false,
  },
  {
    id: "u-004", email: "frontdesk@musicschool.com", password: "demo1234",
    name: "Lisa Chen", businessId: "biz-001", roleId: "role-002",
    isSuperAdmin: false, isBusinessAdmin: false,
  },
  {
    id: "u-005", email: "admin@yogastudio.com", password: "demo1234",
    name: "Sara Kim", businessId: "biz-002", roleId: null,
    isSuperAdmin: false, isBusinessAdmin: true,
  },
  {
    id: "u-006", email: "instructor@yogastudio.com", password: "demo1234",
    name: "Tom Wilson", businessId: "biz-002", roleId: "role-003",
    isSuperAdmin: false, isBusinessAdmin: false,
  },
];

export function findUserByEmail(email: string): User | undefined {
  return USERS.find((u) => u.email.toLowerCase() === email.toLowerCase());
}

export function getBusiness(id: string): Business | undefined {
  return BUSINESSES.find((b) => b.id === id);
}

export function getRoleById(id: string): Role | undefined {
  return ROLES.find((r) => r.id === id);
}

export function getRolesByBusiness(businessId: string): Role[] {
  return ROLES.filter((r) => r.businessId === businessId);
}

export function getUsersByBusiness(businessId: string): User[] {
  return USERS.filter((u) => u.businessId === businessId && !u.isSuperAdmin);
}
