// import { ICan, Permission } from "@/types/auth";
import { IconKeys } from "../icons";

// import { IconKeys } from "../_v1/icons";

// const { ICan } = {} as any
type Permission = any | null | string | undefined;
type moduleNames =
  | "HRM"
  | "Bursary"
  | "Community"
  | "Settings"
  | "PTA"
  | "Academic";
const _module = (
  name: moduleNames,
  icon: IconKeys,
  // title?,
  subtitle?,
  sections = [],
) => ({
  name,
  icon,
  title: name,
  subtitle,
  sections,
  index: -1,
});
type sectionNames = "main" | "sales";
type Link = {
  name;
  title;
  href?;
  links?: {
    name;
    link: string;
    title;
  }[];
};
const _section = (
  name: any,
  title?: string,
  links?: Link[],
  access: Access[] = [],
) => ({
  name,
  title,
  links,
  access,
});
// type linkNames = "HRM" | "customer-services" | "Dashboard" | "Sales";
const _subLink = (name, href, access?: Access[]) =>
  _link(name, null, href, access);
const _link = (
  name, //: linkNames,
  // title?: string,
  icon?: IconKeys,
  href?,
  subLinks = [],
  access: Access[] = [],
) => {
  const res = {
    name,
    title: name?.split("-").join(" "),
    icon,
    href,
    subLinks,
    access,
  };
  const ctx = {
    data: res,
    access(...access: Access[]) {
      res.access = access;
      return ctx;
    },
  };
  return ctx;
};
type Access = {
  type: "role" | "permission";
  equator: "is" | "isNot" | "in" | "notIn" | "every" | "some";
  values: string[];
};
const __access = (
  type: Access["type"],
  equator: Access["equator"],
  ...values
) => ({ type, equator, values }) as Access;

type Role =
  | "Admin"
  | "Teacher"
  | "Student"
  | "Parent"
  | "Accountant"
  | "Registrar"
  | "HR"
  | "Staff"
  | "Support";
const _role = {
  is: (role: Role) => __access("role", "is", role),
  isNot: (role: Role) => __access("role", "isNot", role),
  in: (...roles: Role[]) => __access("role", "in", ...roles),
  notIn: (...roles: Role[]) => __access("role", "notIn", ...roles),
  every: (...roles: Role[]) => __access("role", "every", ...roles),
  some: (...roles: Role[]) => __access("role", "some", ...roles),
};
const _perm = {
  is: (role: Permission) => __access("permission", "is", role),
  isNot: (role: Permission) => __access("permission", "isNot", role),
  in: (...roles: Permission[]) => __access("permission", "in", ...roles),
  notIn: (...roles: Permission[]) => __access("permission", "notIn", ...roles),
  every: (...roles: Permission[]) => __access("permission", "every", ...roles),
  some: (...roles: Permission[]) => __access("permission", "some", ...roles),
};

export const linkModules = [
  _module("Community", "school", "School Management", [
    _section("main", "General", [
      _link("Dashboard", "dashboard", "/dashboard").access(
        _role.in("Admin", "Staff"),
      ).data,
      _link("Announcements", "speaker", "/announcements").access(
        _role.in("Admin", "Teacher"),
      ).data,
      _link("Calendar", "calendar", "/calendar").access(
        _role.in("Admin", "Staff"),
      ).data,
    ]),
  ]),

  _module("HRM", "users", "HR & Staff", [
    _section("main", "Staff Management", [
      _link("Teachers", "users", "/staff/teachers").access(_role.is("Admin"))
        .data,
      _link("Non-Teaching Staff", "users", "/staff/non-teaching").access(
        _role.is("Admin"),
      ).data,
      _link("Departments", "building", "/staff/departments").access(
        _role.is("Admin"),
      ).data,
      _link("Attendance", "calendar-check", "/staff/attendance").access(
        _role.in("Admin", "HR"),
      ).data,
      _link("Payroll", "wallet", "/staff/payroll").access(_role.is("Admin"))
        .data,
    ]),
  ]),

  _module("Bursary", "wallet", "Finance & Payments", [
    _section("dashboard", null, [
      _link("Dashboard", "dashboard", "/finance").access(_role.is("Admin"))
        .data,
    ]),
    _section("main", "Fees", [
      _link("Fee Management", "coins", "/finance/fees").access(
        _role.is("Admin"),
      ).data,
      _link("Billables", "coins", "/finance/billables").access(
        _role.is("Admin"),
      ).data,
      _link("Invoices", "file-text", "/finance/invoices").access(
        _role.in("Admin", "Accountant"),
      ).data,
      _link("Payments", "credit-card", "/finance/payments").access(
        _role.in("Admin", "Accountant"),
      ).data,
    ]),
  ]),

  _module("Academic", "graduation-cap", "Academic", [
    _section("main", "Students", [
      _link("Enrollment", "user-plus", "/students/enrollment").access(
        _role.in("Admin", "Registrar"),
      ).data,
      _link("Student List", "users", "/students/list").access(
        _role.in("Admin", "Teacher"),
      ).data,
      _link("Classes", "list", "/academic/classes").access(
        _role.in("Admin", "Teacher"),
      ).data,
      _link("Subjects", "book", "/academic/subjects").access(
        _role.in("Admin", "Teacher"),
      ).data,
    ]),
    _section("main", "Assessment", [
      _link("Tests & Exams", "clipboard-list", "/academic/assessments").access(
        _role.in("Admin", "Teacher"),
      ).data,
      _link("Grading", "award", "/academic/grading").access(
        _role.in("Admin", "Teacher"),
      ).data,
      _link("Report Cards", "file-text", "/academic/reports").access(
        _role.in("Admin", "Teacher"),
      ).data,
    ]),
  ]),

  _module("PTA", "user", "Parent Portal", [
    _section("main", "Engagement", [
      _link("Student Performance", "bar-chart", "/parents/performance").access(
        _role.is("Parent"),
      ).data,
      _link("Communication", "message-square", "/parents/messages").access(
        _role.is("Parent"),
      ).data,
      _link("Payments", "credit-card", "/parents/payments").access(
        _role.is("Parent"),
      ).data,
    ]),
  ]),

  _module("Settings", "settings", "Settings", [
    _section("main", "Configuration", [
      _link("School Profile", "settings", "/settings/school-profile").access(
        _role.is("Admin"),
      ).data,
      _link("Academic Session", "calendar", "/settings/sessions").access(
        _role.is("Admin"),
      ).data,
      _link("Roles & Permissions", "shield", "/settings/roles").access(
        _role.is("Admin"),
      ).data,
    ]),
  ]),
];
export function getLinkModules() {
  let i = {
    section: 0,
    links: 0,
    subLinks: 0,
  };
  const modules = linkModules.map((m, mi) => {
    m.index = mi;
    m.sections = m.sections.map((s, si) => {
      s.index = si;
      s.globalIndex = i.section++;
      // i.section += 1;
      s.links = s.links.map((l, li) => {
        l.index = li;
        l.globalIndex = i.links++;
        return l;
      });
      return s;
    });
    return m;
  });
  return modules;
}
