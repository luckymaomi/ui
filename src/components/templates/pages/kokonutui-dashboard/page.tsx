"use client";

export const dynamic = "force-static";

import { useState } from "react";
import { TemplateBackLink } from "@/components/templates/TemplateBackLink";
import {
  Home,
  BarChart2,
  Building2,
  Folder,
  Wallet,
  Receipt,
  CreditCard,
  Users2,
  Shield,
  MessagesSquare,
  Video,
  Settings,
  HelpCircle,
  Menu,
  Bell,
  ChevronRight,
  ArrowUpRight,
  ArrowDownLeft,
  SendHorizontal,
  QrCode,
  Plus,
  ArrowRight,
  ShoppingCart,
  PiggyBank,
  TrendingUp,
  Calendar,
  CheckCircle2,
  Timer,
  AlertCircle,
} from "@/components/IconShim";

/* ── Sidebar Data ── */
const sidebarSections = [
  {
    title: "Overview",
    items: [
      { icon: Home, label: "Dashboard" },
      { icon: BarChart2, label: "Analytics" },
      { icon: Building2, label: "Organization" },
      { icon: Folder, label: "Projects" },
    ],
  },
  {
    title: "Finance",
    items: [
      { icon: Wallet, label: "Transactions" },
      { icon: Receipt, label: "Invoices" },
      { icon: CreditCard, label: "Payments" },
    ],
  },
  {
    title: "Team",
    items: [
      { icon: Users2, label: "Members" },
      { icon: Shield, label: "Permissions" },
      { icon: MessagesSquare, label: "Chat" },
      { icon: Video, label: "Meetings" },
    ],
  },
];

type KokonutPage =
  | "Dashboard"
  | "Analytics"
  | "Organization"
  | "Projects"
  | "Transactions"
  | "Invoices"
  | "Payments"
  | "Members"
  | "Permissions"
  | "Chat"
  | "Meetings"
  | "Settings"
  | "Help";

const kokonutPageSummary: Record<KokonutPage, string> = {
  Dashboard:
    "Overview of account balances, recent activity, and upcoming financial milestones.",
  Analytics:
    "Track trends, category performance, and month-over-month financial movement.",
  Organization: "Manage teams, roles, and workspace-level finance permissions.",
  Projects: "Review budget usage and expense allocation by active projects.",
  Transactions: "Inspect transaction streams, statuses, and reconciliations.",
  Invoices: "Review outgoing invoices, payment status, and due schedules.",
  Payments: "Manage payment methods, payout flows, and transfer history.",
  Members: "View team members, access levels, and finance responsibilities.",
  Permissions: "Control security policy and role-based permission settings.",
  Chat: "Collaborate with team members on approvals and financial decisions.",
  Meetings: "Track upcoming finance reviews and planning sessions.",
  Settings:
    "Configure workspace preferences, billing settings, and notifications.",
  Help: "Get support resources, troubleshooting steps, and contact channels.",
};

/* ── Accounts (List01) ── */
const initialAccounts = [
  {
    id: "1",
    title: "Main Savings",
    description: "Personal savings",
    balance: 8459.45,
    type: "savings" as const,
  },
  {
    id: "2",
    title: "Checking Account",
    description: "Daily expenses",
    balance: 2850,
    type: "checking" as const,
  },
  {
    id: "3",
    title: "Investment Portfolio",
    description: "Stock & ETFs",
    balance: 15230.8,
    type: "investment" as const,
  },
  {
    id: "4",
    title: "Credit Card",
    description: "Pending charges",
    balance: 1200,
    type: "debt" as const,
  },
  {
    id: "5",
    title: "Savings Account",
    description: "Emergency fund",
    balance: 3000,
    type: "savings" as const,
  },
];

/* ── Transactions (List02) ── */
const initialTransactions = [
  {
    id: "1",
    title: "Apple Store Purchase",
    amount: 999,
    type: "outgoing" as const,
    icon: ShoppingCart,
    timestamp: "Today, 2:45 PM",
    status: "completed",
  },
  {
    id: "2",
    title: "Salary Deposit",
    amount: 4500,
    type: "incoming" as const,
    icon: Wallet,
    timestamp: "Today, 9:00 AM",
    status: "completed",
  },
  {
    id: "3",
    title: "Netflix Subscription",
    amount: 15.99,
    type: "outgoing" as const,
    icon: CreditCard,
    timestamp: "Yesterday",
    status: "pending",
  },
  {
    id: "4",
    title: "Apple Store Purchase",
    amount: 999,
    type: "outgoing" as const,
    icon: ShoppingCart,
    timestamp: "Today, 2:45 PM",
    status: "completed",
  },
  {
    id: "5",
    title: "Supabase Subscription",
    amount: 15.99,
    type: "outgoing" as const,
    icon: CreditCard,
    timestamp: "Yesterday",
    status: "pending",
  },
  {
    id: "6",
    title: "Vercel Subscription",
    amount: 15.99,
    type: "outgoing" as const,
    icon: CreditCard,
    timestamp: "Yesterday",
    status: "pending",
  },
];

/* ── Events (List03) ── */
const events = [
  {
    id: "1",
    title: "Emergency Fund",
    subtitle: "3 months of expenses saved",
    icon: PiggyBank,
    date: "Target: Dec 2024",
    amount: "$15,000",
    status: "in-progress" as const,
    progress: 65,
  },
  {
    id: "2",
    title: "Stock Portfolio",
    subtitle: "Tech sector investment plan",
    icon: TrendingUp,
    date: "Target: Jun 2024",
    amount: "$50,000",
    status: "pending" as const,
    progress: 30,
  },
  {
    id: "3",
    title: "Debt Repayment",
    subtitle: "Student loan payoff plan",
    icon: CreditCard,
    date: "Target: Mar 2025",
    amount: "$25,000",
    status: "in-progress" as const,
    progress: 45,
  },
];

/* ── Profile ── */
const statusConfig = {
  pending: {
    icon: Timer,
    class: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-100 dark:bg-amber-900/30",
  },
  "in-progress": {
    icon: AlertCircle,
    class: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-100 dark:bg-blue-900/30",
  },
  completed: {
    icon: CheckCircle2,
    class: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-100 dark:bg-emerald-900/30",
  },
};

function accountIconColor(type: string) {
  if (type === "savings") return "bg-emerald-100 dark:bg-emerald-900/30";
  if (type === "checking") return "bg-blue-100 dark:bg-blue-900/30";
  if (type === "investment") return "bg-purple-100 dark:bg-purple-900/30";
  return "bg-red-100 dark:bg-red-900/30";
}

function AccountIcon({ type }: { type: string }) {
  if (type === "savings")
    return (
      <Wallet className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
    );
  if (type === "checking")
    return <QrCode className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />;
  if (type === "investment")
    return (
      <ArrowUpRight className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
    );
  return <CreditCard className="w-3.5 h-3.5 text-red-600 dark:text-red-400" />;
}

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

type AccountAction = "add" | "send" | "top-up";

export default function KokonutuiDashboardPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notificationsRead, setNotificationsRead] = useState(false);
  const [activePage, setActivePage] = useState<KokonutPage>("Dashboard");
  const [accountList, setAccountList] = useState(initialAccounts);
  const [transactionList, setTransactionList] = useState(initialTransactions);
  const [accountAction, setAccountAction] = useState<AccountAction | null>(
    null,
  );
  const [actionTitle, setActionTitle] = useState("");
  const [actionAmount, setActionAmount] = useState("");
  const [actionResult, setActionResult] = useState("");
  const [selectedEvent, setSelectedEvent] = useState<
    (typeof events)[number] | null
  >(null);

  const totalBalance = accountList.reduce(
    (total, account) =>
      total + (account.type === "debt" ? -account.balance : account.balance),
    0,
  );

  const openAccountAction = (action: AccountAction) => {
    setAccountAction(action);
    setActionTitle("");
    setActionAmount("");
    setActionResult("");
  };

  const submitAccountAction = () => {
    const amount = Number(actionAmount);
    if (
      !accountAction ||
      !actionTitle.trim() ||
      !Number.isFinite(amount) ||
      amount <= 0
    ) {
      setActionResult("Enter a name and an amount greater than zero.");
      return;
    }

    if (accountAction === "add") {
      setAccountList((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          title: actionTitle.trim(),
          description: "New account",
          balance: amount,
          type: "checking" as const,
        },
      ]);
      setActionResult(
        `${actionTitle.trim()} was added with ${currency.format(amount)}.`,
      );
      return;
    }

    if (accountAction === "send" && amount > accountList[0].balance) {
      setActionResult("The transfer is larger than the Main Savings balance.");
      return;
    }

    const isTopUp = accountAction === "top-up";
    setAccountList((current) =>
      current.map((account, index) =>
        index === 0
          ? {
              ...account,
              balance: account.balance + (isTopUp ? amount : -amount),
            }
          : account,
      ),
    );
    setTransactionList((current) => [
      {
        id: crypto.randomUUID(),
        title: actionTitle.trim(),
        amount,
        type: isTopUp ? ("incoming" as const) : ("outgoing" as const),
        icon: isTopUp ? Wallet : SendHorizontal,
        timestamp: "Just now",
        status: "completed",
      },
      ...current,
    ]);
    setActionResult(
      `${isTopUp ? "Top-up" : "Transfer"} of ${currency.format(amount)} was applied.`,
    );
  };

  const renderModuleContent = () => {
    switch (activePage) {
      case "Analytics":
        return (
          <div className="space-y-6">
            <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { label: "Net Cash Flow", value: "+$12,430", trend: "+8.4%" },
                { label: "Expense Ratio", value: "34.2%", trend: "-2.1%" },
                { label: "Forecast Accuracy", value: "92.6%", trend: "+1.7%" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-gray-200 dark:border-[#1F1F23] bg-white dark:bg-zinc-900/70 p-4"
                >
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    {item.label}
                  </p>
                  <p className="mt-1 text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
                    {item.value}
                  </p>
                  <p className="mt-1 text-sm text-emerald-600 dark:text-emerald-400">
                    {item.trend}
                  </p>
                </div>
              ))}
            </section>
            <section className="rounded-xl border border-gray-200 dark:border-[#1F1F23] bg-white dark:bg-zinc-900/70 p-6">
              <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                Cash Flow Trend
              </h3>
              <div className="mt-4 flex items-end gap-2 h-44">
                {[38, 55, 62, 49, 71, 66, 82, 76, 88, 73, 92, 85].map(
                  (h, index) => (
                    <div
                      key={index}
                      className="flex-1 rounded-t-md bg-zinc-900/70 dark:bg-zinc-100/80"
                      style={{ height: `${h}%` }}
                    />
                  ),
                )}
              </div>
            </section>
          </div>
        );
      case "Organization":
        return (
          <div className="space-y-6">
            <section className="rounded-xl border border-gray-200 dark:border-[#1F1F23] bg-white dark:bg-zinc-900/70 p-6">
              <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                Department Ownership
              </h3>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    team: "Finance Ops",
                    owner: "Eugene An",
                    members: 8,
                    budget: "$320K",
                  },
                  {
                    team: "Revenue Team",
                    owner: "Maria Garcia",
                    members: 12,
                    budget: "$540K",
                  },
                  {
                    team: "Compliance",
                    owner: "Alex Smith",
                    members: 5,
                    budget: "$180K",
                  },
                  {
                    team: "Procurement",
                    owner: "Luna Park",
                    members: 7,
                    budget: "$210K",
                  },
                ].map((team) => (
                  <div
                    key={team.team}
                    className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-4"
                  >
                    <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                      {team.team}
                    </p>
                    <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                      Owner: {team.owner}
                    </p>
                    <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                      Members: {team.members}
                    </p>
                    <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
                      Budget: {team.budget}
                    </p>
                  </div>
                ))}
              </div>
            </section>
            <section className="rounded-xl border border-gray-200 dark:border-[#1F1F23] bg-white dark:bg-zinc-900/70 p-6">
              <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                Organization Notes
              </h3>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                Centralized ownership is enabled for all finance workflows. Role
                inheritance applies from department leads.
              </p>
            </section>
          </div>
        );
      case "Projects":
        return (
          <div className="space-y-6">
            <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { name: "ERP Migration", budget: "$420K", spent: 74 },
                { name: "AP Automation", budget: "$180K", spent: 48 },
                { name: "Risk Dashboard", budget: "$95K", spent: 63 },
                { name: "Vendor Portal", budget: "$150K", spent: 29 },
              ].map((project) => (
                <div
                  key={project.name}
                  className="rounded-xl border border-gray-200 dark:border-[#1F1F23] bg-white dark:bg-zinc-900/70 p-5"
                >
                  <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    {project.name}
                  </p>
                  <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                    Budget {project.budget}
                  </p>
                  <div className="mt-4 h-2 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-zinc-900 dark:bg-zinc-100 rounded-full"
                      style={{ width: `${project.spent}%` }}
                    />
                  </div>
                  <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400">
                    {project.spent}% utilized
                  </p>
                </div>
              ))}
            </section>
          </div>
        );
      case "Transactions":
      case "Invoices":
      case "Payments":
        return (
          <div className="space-y-6">
            <section className="rounded-xl border border-gray-200 dark:border-[#1F1F23] bg-white dark:bg-zinc-900/70 p-6">
              <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                {activePage} Center
              </h3>
              <div className="mt-4 space-y-3">
                {transactionList.map((tx) => (
                  <div
                    key={tx.id}
                    className="flex items-center justify-between rounded-lg border border-zinc-200 dark:border-zinc-800 p-3"
                  >
                    <div>
                      <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                        {tx.title}
                      </p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">
                        {tx.timestamp}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-zinc-700 dark:text-zinc-300">
                        {tx.amount}
                      </p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">
                        {tx.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        );
      case "Members":
      case "Permissions":
      case "Chat":
      case "Meetings":
        return (
          <div className="space-y-6">
            <section className="rounded-xl border border-gray-200 dark:border-[#1F1F23] bg-white dark:bg-zinc-900/70 p-6">
              <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                {activePage} Workspace
              </h3>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: "Alex Smith", role: "Finance Lead" },
                  { name: "Maria Garcia", role: "Ops Manager" },
                  { name: "John Doe", role: "Analyst" },
                  { name: "Luna Park", role: "Coordinator" },
                ].map((member) => (
                  <div
                    key={member.name}
                    className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-4"
                  >
                    <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                      {member.name}
                    </p>
                    <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                      {member.role}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        );
      case "Settings":
        return (
          <div className="space-y-6">
            <section className="rounded-xl border border-gray-200 dark:border-[#1F1F23] bg-white dark:bg-zinc-900/70 p-6">
              <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                Preference Controls
              </h3>
              <div className="mt-4 space-y-4">
                {[
                  "Enable payout notifications",
                  "Require double approval for transfers",
                  "Weekly analytics digest by email",
                ].map((item) => (
                  <label
                    key={item}
                    className="flex items-center justify-between rounded-lg border border-zinc-200 dark:border-zinc-800 p-3"
                  >
                    <span className="text-sm text-zinc-700 dark:text-zinc-300">
                      {item}
                    </span>
                    <input type="checkbox" className="h-4 w-4" defaultChecked />
                  </label>
                ))}
              </div>
            </section>
          </div>
        );
      case "Help":
        return (
          <div className="space-y-6">
            <section className="rounded-xl border border-gray-200 dark:border-[#1F1F23] bg-white dark:bg-zinc-900/70 p-6">
              <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                Support Center
              </h3>
              <div className="mt-4 space-y-3">
                {[
                  "How to reconcile multi-account transactions?",
                  "How to set role-based approval flows?",
                  "How to export monthly finance audits?",
                ].map((question) => (
                  <div
                    key={question}
                    className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-4"
                  >
                    <p className="text-sm text-zinc-700 dark:text-zinc-300">
                      {question}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        );
      default:
        return (
          <section className="rounded-xl border border-gray-200 dark:border-[#1F1F23] bg-white dark:bg-zinc-900/70 p-6">
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              {kokonutPageSummary[activePage]}
            </p>
          </section>
        );
    }
  };

  return (
    <>
      <TemplateBackLink />
      <div className="min-h-screen bg-white dark:bg-[#0F0F12]">
        {/* Mobile menu button */}
        <button
          type="button"
          aria-controls="kokonut-navigation"
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? "Close navigation" : "Open navigation"}
          className="lg:hidden fixed top-4 left-4 z-[70] p-2 rounded-lg bg-white dark:bg-[#0F0F12] shadow-md"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <Menu className="h-5 w-5 text-gray-600 dark:text-gray-300" />
        </button>

        {/* Sidebar */}
        <nav
          id="kokonut-navigation"
          aria-label="Primary navigation"
          className={`fixed inset-y-0 left-0 z-[70] w-64 bg-white dark:bg-[#0F0F12] border border-gray-200 dark:border-[#1F1F23] ${mobileMenuOpen ? "flex" : "hidden"} lg:flex`}
        >
          <div className="h-full flex flex-col">
            <div className="h-16 px-6 flex items-center border border-gray-200 dark:border-[#1F1F23]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-zinc-900 dark:bg-zinc-100 flex items-center justify-center text-white dark:text-zinc-900 text-sm font-bold">
                  K
                </div>
                <span className="text-lg font-semibold text-gray-900 dark:text-white">
                  KokonutUI
                </span>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto py-4 px-4">
              <div className="space-y-6">
                {sidebarSections.map((section) => (
                  <div key={section.title}>
                    <div className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      {section.title}
                    </div>
                    <div className="space-y-1">
                      {section.items.map((item) => (
                        <button
                          key={item.label}
                          type="button"
                          onClick={() => {
                            setActivePage(item.label as KokonutPage);
                            setMobileMenuOpen(false);
                          }}
                          className={`w-full flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                            activePage === item.label
                              ? "bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900"
                              : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-[#1F1F23]"
                          }`}
                        >
                          <item.icon className="h-4 w-4 mr-3 flex-shrink-0" />
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="px-4 py-4 border border-gray-200 dark:border-[#1F1F23]">
              <div className="space-y-1">
                <button
                  type="button"
                  onClick={() => {
                    setActivePage("Settings");
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                    activePage === "Settings"
                      ? "bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900"
                      : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-[#1F1F23]"
                  }`}
                >
                  <Settings className="h-4 w-4 mr-3" />
                  Settings
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActivePage("Help");
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                    activePage === "Help"
                      ? "bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900"
                      : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-[#1F1F23]"
                  }`}
                >
                  <HelpCircle className="h-4 w-4 mr-3" />
                  Help
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Mobile overlay */}
        {mobileMenuOpen && (
          <button
            type="button"
            aria-label="Close navigation"
            className="fixed inset-0 bg-black/50 z-[65] lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
        {/* Main content area */}
        <div className="flex min-h-screen min-w-0 flex-col lg:ml-64">
          {/* Top Nav */}
          <header className="h-16 border border-gray-200 dark:border-[#1F1F23]">
            <nav className="px-3 sm:px-6 flex items-center justify-between bg-white dark:bg-[#0F0F12] h-full">
              <div className="font-medium text-sm hidden sm:flex items-center space-x-1">
                <span className="text-gray-700 dark:text-gray-300">
                  kokonutUI
                </span>
                <ChevronRight className="h-4 w-4 text-gray-500 dark:text-gray-400 mx-1" />
                <span className="text-gray-900 dark:text-gray-100">
                  {activePage}
                </span>
              </div>
              <div className="flex items-center gap-2 sm:gap-4 ml-auto sm:ml-0">
                <div className="relative">
                  <button
                    type="button"
                    aria-label="Notifications"
                    aria-expanded={notificationsOpen}
                    onClick={() => {
                      setNotificationsOpen((open) => !open);
                      setProfileOpen(false);
                    }}
                    className="relative p-1.5 sm:p-2 hover:bg-gray-100 dark:hover:bg-[#1F1F23] rounded-full transition-colors"
                  >
                    <Bell className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600 dark:text-gray-300" />
                    {!notificationsRead && (
                      <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
                    )}
                  </button>
                  {notificationsOpen && (
                    <div className="absolute right-0 top-11 z-50 w-[min(20rem,calc(100vw-2rem))] rounded-2xl border border-zinc-200 bg-white p-4 shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
                      <div className="flex items-center justify-between gap-4">
                        <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                          Notifications
                        </h2>
                        <button
                          type="button"
                          onClick={() => setNotificationsRead(true)}
                          className="rounded-lg px-2 py-1 text-xs font-medium text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
                        >
                          Mark all read
                        </button>
                      </div>
                      <div className="mt-3 space-y-2">
                        {[
                          "Invoice AC-204 was paid.",
                          "Monthly finance review starts tomorrow.",
                          "The ERP Migration budget reached 74%.",
                        ].map((notification) => (
                          <p
                            key={notification}
                            className={`rounded-lg p-3 text-xs ${notificationsRead ? "bg-zinc-50 text-zinc-500 dark:bg-zinc-800/50 dark:text-zinc-400" : "bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200"}`}
                          >
                            {notification}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                {/* Profile dropdown */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => {
                      setProfileOpen(!profileOpen);
                      setNotificationsOpen(false);
                    }}
                    className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center text-sm font-medium text-zinc-700 dark:text-zinc-200 ring-2 ring-gray-200 dark:ring-[#2B2B30]"
                  >
                    EA
                  </button>
                  {profileOpen && (
                    <>
                      <button
                        type="button"
                        aria-label="Close profile"
                        className="fixed inset-0 z-40"
                        onClick={() => setProfileOpen(false)}
                      />
                      <div className="absolute right-0 top-10 z-50 w-72 sm:w-80 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-lg overflow-hidden">
                        <div className="px-6 pt-8 pb-6">
                          <div className="flex items-center gap-4 mb-6">
                            <div className="relative shrink-0">
                              <div className="w-16 h-16 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center text-xl font-semibold text-zinc-700 dark:text-zinc-200 ring-4 ring-white dark:ring-zinc-900">
                                EA
                              </div>
                              <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-zinc-900" />
                            </div>
                            <div className="flex-1">
                              <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                                Eugene An
                              </h2>
                              <p className="text-zinc-600 dark:text-zinc-400">
                                Prompt Engineer
                              </p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              setActivePage("Settings");
                              setProfileOpen(false);
                            }}
                            className="mt-2 flex w-full items-center gap-2 rounded-lg p-3 text-sm font-medium text-zinc-900 hover:bg-zinc-100 dark:text-zinc-100 dark:hover:bg-zinc-800"
                          >
                            <Settings className="h-4 w-4" />
                            Settings
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </nav>
          </header>
          {/* Dashboard Content */}
          <main className="flex-1 overflow-auto bg-white p-4 dark:bg-[#0F0F12] sm:p-6">
            {activePage === "Dashboard" ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Accounts (List01) */}
                  <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 flex flex-col border border-gray-200 dark:border-[#1F1F23]">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <Wallet className="w-3.5 h-3.5 text-zinc-900 dark:text-zinc-50" />
                      Accounts
                    </h2>
                    <div className="flex-1 bg-white dark:bg-zinc-900/70 border border-zinc-100 dark:border-zinc-800 rounded-xl shadow-sm backdrop-blur-xl">
                      <div className="p-4 border border-zinc-100 dark:border-zinc-800">
                        <p className="text-xs text-zinc-600 dark:text-zinc-400">
                          Total Balance
                        </p>
                        <h3 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
                          {currency.format(totalBalance)}
                        </h3>
                      </div>
                      <div className="p-3">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-xs font-medium text-zinc-900 dark:text-zinc-100">
                            Your Accounts
                          </h4>
                        </div>
                        <div className="space-y-1">
                          {accountList.map((account) => (
                            <div
                              key={account.id}
                              className="group flex items-center justify-between p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800/50 transition-all duration-200"
                            >
                              <div className="flex min-w-0 items-center gap-2">
                                <div
                                  className={`p-1.5 rounded-lg ${accountIconColor(account.type)}`}
                                >
                                  <AccountIcon type={account.type} />
                                </div>
                                <div className="min-w-0">
                                  <h5 className="truncate text-xs font-medium text-zinc-900 dark:text-zinc-100">
                                    {account.title}
                                  </h5>
                                  <p className="truncate text-[11px] text-zinc-600 dark:text-zinc-400">
                                    {account.description}
                                  </p>
                                </div>
                              </div>
                              <span className="shrink-0 pl-2 text-xs font-medium text-zinc-900 dark:text-zinc-100">
                                {currency.format(account.balance)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="p-2 border border-zinc-100 dark:border-zinc-800">
                        <div className="grid grid-cols-3 gap-2">
                          {[
                            {
                              icon: Plus,
                              label: "Add",
                              action: "add" as const,
                            },
                            {
                              icon: SendHorizontal,
                              label: "Send",
                              action: "send" as const,
                            },
                            {
                              icon: ArrowDownLeft,
                              label: "Top-up",
                              action: "top-up" as const,
                            },
                          ].map((btn) => (
                            <button
                              key={btn.label}
                              type="button"
                              aria-pressed={accountAction === btn.action}
                              onClick={() => openAccountAction(btn.action)}
                              className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-medium bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 shadow-sm transition-all duration-200"
                            >
                              <btn.icon className="w-3.5 h-3.5" />
                              <span>{btn.label}</span>
                            </button>
                          ))}
                        </div>
                        {accountAction && (
                          <form
                            className="mt-3 rounded-xl bg-zinc-100 p-3 dark:bg-zinc-800"
                            onSubmit={(event) => {
                              event.preventDefault();
                              submitAccountAction();
                            }}
                          >
                            <div className="grid gap-3 sm:grid-cols-2">
                              <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                                {accountAction === "add"
                                  ? "Account name"
                                  : "Recipient or note"}
                                <input
                                  value={actionTitle}
                                  onChange={(event) =>
                                    setActionTitle(event.target.value)
                                  }
                                  className="mt-1 min-h-10 w-full rounded-lg border border-zinc-300 bg-white px-3 text-sm text-zinc-900 outline-none focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-zinc-100"
                                  required
                                />
                              </label>
                              <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                                Amount
                                <input
                                  type="number"
                                  min="0.01"
                                  step="0.01"
                                  value={actionAmount}
                                  onChange={(event) =>
                                    setActionAmount(event.target.value)
                                  }
                                  className="mt-1 min-h-10 w-full rounded-lg border border-zinc-300 bg-white px-3 text-sm text-zinc-900 outline-none focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-zinc-100"
                                  required
                                />
                              </label>
                            </div>
                            <div className="mt-3 flex flex-wrap items-center gap-2">
                              <button
                                type="submit"
                                className="min-h-10 rounded-lg bg-zinc-900 px-4 text-xs font-semibold text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
                              >
                                {accountAction === "add"
                                  ? "Add account"
                                  : accountAction === "send"
                                    ? "Send transfer"
                                    : "Apply top-up"}
                              </button>
                              <button
                                type="button"
                                onClick={() => setAccountAction(null)}
                                className="min-h-10 rounded-lg px-3 text-xs font-medium text-zinc-600 hover:bg-zinc-200 dark:text-zinc-400 dark:hover:bg-zinc-700"
                              >
                                Cancel
                              </button>
                            </div>
                            {actionResult && (
                              <p
                                role="status"
                                className="mt-3 text-xs text-zinc-700 dark:text-zinc-300"
                              >
                                {actionResult}
                              </p>
                            )}
                          </form>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Transactions (List02) */}
                  <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 flex flex-col border border-gray-200 dark:border-[#1F1F23]">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <CreditCard className="w-3.5 h-3.5 text-zinc-900 dark:text-zinc-50" />
                      Recent Transactions
                    </h2>
                    <div className="flex-1 bg-white dark:bg-zinc-900/70 border border-zinc-100 dark:border-zinc-800 rounded-xl shadow-sm backdrop-blur-xl">
                      <div className="p-4">
                        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                          <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                            Recent Activity
                            <span className="text-xs font-normal text-zinc-600 dark:text-zinc-400 ml-1">
                              ({transactionList.length} transactions)
                            </span>
                          </h4>
                          <span className="text-xs text-zinc-600 dark:text-zinc-400">
                            This Month
                          </span>
                        </div>
                        <div className="space-y-1">
                          {transactionList.map((tx) => (
                            <div
                              key={tx.id}
                              className="group flex items-center gap-3 p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800/50 transition-all duration-200"
                            >
                              <div className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
                                <tx.icon className="w-4 h-4 text-zinc-900 dark:text-zinc-100" />
                              </div>
                              <div className="flex min-w-0 flex-1 items-center justify-between gap-2">
                                <div className="min-w-0 space-y-0.5">
                                  <h5 className="truncate text-xs font-medium text-zinc-900 dark:text-zinc-100">
                                    {tx.title}
                                  </h5>
                                  <p className="text-[11px] text-zinc-600 dark:text-zinc-400">
                                    {tx.timestamp}
                                  </p>
                                </div>
                                <div className="flex shrink-0 items-center gap-1.5">
                                  <span
                                    className={`text-xs font-medium ${tx.type === "incoming" ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"}`}
                                  >
                                    {tx.type === "incoming" ? "+" : "-"}
                                    {currency.format(tx.amount)}
                                  </span>
                                  {tx.type === "incoming" ? (
                                    <ArrowDownLeft className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                                  ) : (
                                    <ArrowUpRight className="w-3.5 h-3.5 text-red-600 dark:text-red-400" />
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="p-2 border border-zinc-100 dark:border-zinc-800">
                        <button
                          type="button"
                          onClick={() => setActivePage("Transactions")}
                          className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-medium bg-gradient-to-r from-zinc-900 to-zinc-800 dark:from-zinc-50 dark:to-zinc-200 text-zinc-50 dark:text-zinc-900 hover:from-zinc-800 hover:to-zinc-700 dark:hover:from-zinc-200 dark:hover:to-zinc-300 shadow-sm transition-all duration-200"
                        >
                          <span>View All Transactions</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Events (List03) */}
                <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 flex flex-col items-start justify-start border border-gray-200 dark:border-[#1F1F23]">
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-zinc-900 dark:text-zinc-50" />
                    Upcoming Events
                  </h2>
                  <div className="grid w-full grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
                    {events.map((item) => {
                      const sc = statusConfig[item.status];
                      const StatusIcon = sc.icon;
                      return (
                        <div
                          key={item.id}
                          className="flex min-w-0 flex-col bg-white dark:bg-zinc-900/70 rounded-xl border border-zinc-100 dark:border-zinc-800 hover:border-zinc-200 dark:hover:border-zinc-700 transition-all duration-200 shadow-sm backdrop-blur-xl"
                        >
                          <div className="p-4 space-y-3">
                            <div className="flex items-start justify-between">
                              <div className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800">
                                <item.icon className="w-4 h-4 text-zinc-900 dark:text-zinc-100" />
                              </div>
                              <div
                                className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 ${sc.bg} ${sc.class}`}
                              >
                                <StatusIcon className="w-3.5 h-3.5" />
                                {item.status.charAt(0).toUpperCase() +
                                  item.status.slice(1)}
                              </div>
                            </div>
                            <div>
                              <h5 className="text-sm font-medium text-zinc-900 dark:text-zinc-100 mb-1">
                                {item.title}
                              </h5>
                              <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2">
                                {item.subtitle}
                              </p>
                            </div>
                            <div className="space-y-1.5">
                              <div className="flex items-center justify-between text-xs">
                                <span className="text-zinc-600 dark:text-zinc-400">
                                  Progress
                                </span>
                                <span className="text-zinc-900 dark:text-zinc-100">
                                  {item.progress}%
                                </span>
                              </div>
                              <div className="h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-zinc-900 dark:bg-zinc-100 rounded-full"
                                  style={{ width: `${item.progress}%` }}
                                />
                              </div>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                                {item.amount}
                              </span>
                              <span className="text-xs text-zinc-600 dark:text-zinc-400">
                                target
                              </span>
                            </div>
                            <div className="flex items-center text-xs text-zinc-600 dark:text-zinc-400">
                              <Calendar className="w-3.5 h-3.5 mr-1.5" />
                              <span>{item.date}</span>
                            </div>
                          </div>
                          <div className="mt-auto border border-zinc-100 dark:border-zinc-800">
                            <button
                              type="button"
                              onClick={() => setSelectedEvent(item)}
                              className="w-full flex items-center justify-center gap-2 py-2.5 px-3 text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 transition-colors duration-200"
                            >
                              View Details
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <section className="rounded-xl border border-gray-200 dark:border-[#1F1F23] bg-white dark:bg-zinc-900/70 p-6">
                  <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
                    {activePage}
                  </h2>
                  <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                    {kokonutPageSummary[activePage]}
                  </p>
                </section>
                {renderModuleContent()}
              </div>
            )}
          </main>
        </div>
      </div>
      {selectedEvent && (
        <div
          className="fixed inset-0 z-[80] grid place-items-center bg-black/55 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="event-detail-title"
        >
          <section className="w-full max-w-md rounded-2xl bg-white p-6 text-zinc-900 shadow-xl dark:bg-zinc-900 dark:text-zinc-100">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  {selectedEvent.status}
                </p>
                <h2
                  id="event-detail-title"
                  className="mt-1 text-xl font-semibold"
                >
                  {selectedEvent.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setSelectedEvent(null)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
              >
                Close
              </button>
            </div>
            <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-300">
              {selectedEvent.subtitle}
            </p>
            <dl className="mt-5 grid grid-cols-2 gap-4 rounded-xl bg-zinc-100 p-4 text-sm dark:bg-zinc-800">
              <div>
                <dt className="text-zinc-500 dark:text-zinc-400">Target</dt>
                <dd className="mt-1 font-semibold">{selectedEvent.amount}</dd>
              </div>
              <div>
                <dt className="text-zinc-500 dark:text-zinc-400">Progress</dt>
                <dd className="mt-1 font-semibold">
                  {selectedEvent.progress}%
                </dd>
              </div>
              <div className="col-span-2">
                <dt className="text-zinc-500 dark:text-zinc-400">Schedule</dt>
                <dd className="mt-1 font-semibold">{selectedEvent.date}</dd>
              </div>
            </dl>
          </section>
        </div>
      )}
    </>
  );
}
