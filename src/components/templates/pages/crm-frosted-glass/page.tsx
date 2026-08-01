export const dynamic = "force-static";

import { useState } from "react";
import {
  Archivo,
  IBM_Plex_Mono,
  Instrument_Serif,
} from "@/components/templates/FontShim";
import { TemplateBackLink } from "@/components/templates/TemplateBackLink";

const serif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  style: ["normal", "italic"],
});
const mono = IBM_Plex_Mono({ weight: ["400", "500"], subsets: ["latin"] });
const sans = Archivo({ subsets: ["latin"] });

const INK = "#16150F";
const PAPER = "#F4F2EC";
const CARD = "#FBFAF6";
const LINE = "#DAD5C8";
const GREEN = "#1E5C42";
const AMBER = "#B7791F";

const NAV_GROUPS = [
  {
    label: "Overview",
    items: [
      { name: "Dashboard", href: "#dashboard", active: true },
      { name: "Pipeline", href: "#pipeline", active: false },
      { name: "Contacts", href: "#contacts", active: false },
    ],
  },
  {
    label: "Work",
    items: [
      { name: "Activity", href: "#activity", active: false },
      { name: "Tasks", href: "#tasks", active: false },
    ],
  },
];

const KPIS = [
  {
    label: "Pipeline value",
    value: "$1,842,400",
    delta: "+12.4%",
    up: true,
    note: "vs. last quarter",
  },
  {
    label: "Won this month",
    value: "$286,000",
    delta: "+8.1%",
    up: true,
    note: "9 deals closed",
  },
  {
    label: "Active deals",
    value: "47",
    delta: "+5",
    up: true,
    note: "across 4 stages",
  },
  {
    label: "Win rate",
    value: "31.2%",
    delta: "-2.1pt",
    up: false,
    note: "rolling 90 days",
  },
];

const REVENUE = [
  { month: "Aug", value: 42 },
  { month: "Sep", value: 58 },
  { month: "Oct", value: 51 },
  { month: "Nov", value: 66 },
  { month: "Dec", value: 74 },
  { month: "Jan", value: 62 },
  { month: "Feb", value: 71 },
  { month: "Mar", value: 83 },
  { month: "Apr", value: 78 },
  { month: "May", value: 91 },
  { month: "Jun", value: 86 },
  { month: "Jul", value: 100 },
];

const PIPELINE: Array<{
  stage: string;
  total: string;
  deals: Array<{
    company: string;
    value: string;
    owner: string;
    days: string;
    hot?: boolean;
  }>;
}> = [
  {
    stage: "Qualified",
    total: "$412K",
    deals: [
      { company: "Hafen Logistics", value: "$96,000", owner: "LR", days: "3d" },
      { company: "Norra Textiles", value: "$54,500", owner: "MK", days: "6d" },
      {
        company: "Juniper Health",
        value: "$128,000",
        owner: "AS",
        days: "1d",
        hot: true,
      },
    ],
  },
  {
    stage: "Proposal",
    total: "$518K",
    deals: [
      {
        company: "Atlas Foundry",
        value: "$210,000",
        owner: "LR",
        days: "9d",
        hot: true,
      },
      { company: "Bergman & Co.", value: "$88,400", owner: "TW", days: "4d" },
      {
        company: "Cobalt Analytics",
        value: "$76,000",
        owner: "MK",
        days: "12d",
      },
    ],
  },
  {
    stage: "Negotiation",
    total: "$629K",
    deals: [
      {
        company: "Meridian Systems",
        value: "$340,000",
        owner: "AS",
        days: "7d",
        hot: true,
      },
      {
        company: "Field & Furrow",
        value: "$112,000",
        owner: "TW",
        days: "15d",
      },
    ],
  },
  {
    stage: "Closing",
    total: "$283K",
    deals: [
      {
        company: "Lindqvist Marine",
        value: "$164,000",
        owner: "LR",
        days: "2d",
      },
      {
        company: "Oro Coffee Group",
        value: "$119,000",
        owner: "MK",
        days: "5d",
      },
    ],
  },
];

const CONTACTS = [
  {
    name: "Astrid Sundin",
    company: "Meridian Systems",
    stage: "Negotiation",
    activity: "Call, 2h ago",
    value: "$340,000",
    initials: "AS",
  },
  {
    name: "Piet Verhoeven",
    company: "Atlas Foundry",
    stage: "Proposal",
    activity: "Email, 5h ago",
    value: "$210,000",
    initials: "PV",
  },
  {
    name: "Greta Lindqvist",
    company: "Lindqvist Marine",
    stage: "Closing",
    activity: "Contract sent, 1d ago",
    value: "$164,000",
    initials: "GL",
  },
  {
    name: "Tomas Marek",
    company: "Juniper Health",
    stage: "Qualified",
    activity: "Demo booked, 1d ago",
    value: "$128,000",
    initials: "TM",
  },
  {
    name: "Ines Barros",
    company: "Oro Coffee Group",
    stage: "Closing",
    activity: "Pricing review, 2d ago",
    value: "$119,000",
    initials: "IB",
  },
  {
    name: "Henrik Dahl",
    company: "Field & Furrow",
    stage: "Negotiation",
    activity: "Note added, 3d ago",
    value: "$112,000",
    initials: "HD",
  },
  {
    name: "Clara Moreau",
    company: "Hafen Logistics",
    stage: "Qualified",
    activity: "Call, 4d ago",
    value: "$96,000",
    initials: "CM",
  },
];

const ACTIVITY = [
  {
    time: "09:42",
    text: "Astrid Sundin accepted the revised terms for Meridian Systems.",
    kind: "win",
  },
  {
    time: "09:10",
    text: "Proposal PDF sent to Atlas Foundry - awaiting signature block.",
    kind: "doc",
  },
  {
    time: "08:55",
    text: "Lena added 3 notes from the Juniper Health discovery call.",
    kind: "note",
  },
  {
    time: "08:30",
    text: "Invoice #2041 for Oro Coffee Group marked as paid.",
    kind: "win",
  },
  {
    time: "07:58",
    text: "Automation: 6 stale deals flagged for review in Negotiation.",
    kind: "flag",
  },
  {
    time: "07:40",
    text: "Weekly ledger digest exported to reports archive.",
    kind: "doc",
  },
];

const TASKS = [
  {
    text: "Send contract redlines to Lindqvist Marine",
    due: "Today",
    urgent: true,
  },
  {
    text: "Prep QBR deck for Meridian Systems",
    due: "Tomorrow",
    urgent: false,
  },
  {
    text: "Follow up: Norra Textiles trial feedback",
    due: "Wed",
    urgent: false,
  },
  {
    text: "Update win-rate forecast for board memo",
    due: "Fri",
    urgent: false,
  },
];

function StageChip({ stage }: { stage: string }) {
  const styles: Record<string, { bg: string; fg: string }> = {
    Qualified: { bg: "#E9E5D9", fg: INK },
    Proposal: { bg: "#DFE8E3", fg: GREEN },
    Negotiation: { bg: "#F0E6D2", fg: AMBER },
    Closing: { bg: GREEN, fg: PAPER },
  };
  const s = styles[stage] ?? styles.Qualified;
  return (
    <span
      className={`${mono.className} inline-block px-2 py-0.5 text-[10px] uppercase tracking-[0.08em]`}
      style={{ backgroundColor: s.bg, color: s.fg }}
    >
      {stage}
    </span>
  );
}

function OwnerDot({ initials }: { initials: string }) {
  return (
    <span
      className={`${mono.className} flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px]`}
      style={{ backgroundColor: INK, color: PAPER }}
    >
      {initials}
    </span>
  );
}

export default function CrmTemplate() {
  const [query, setQuery] = useState("");
  const [pipeline, setPipeline] = useState(PIPELINE);
  const [openDeals, setOpenDeals] = useState(47);
  const [newDealOpen, setNewDealOpen] = useState(false);
  const [draftDeal, setDraftDeal] = useState({
    company: "",
    value: "",
    stage: PIPELINE[0].stage,
  });
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);

  const normalizedQuery = query.trim().toLocaleLowerCase();
  const visiblePipeline = pipeline.map((column) => ({
    ...column,
    deals: column.deals.filter((deal) =>
      deal.company.toLocaleLowerCase().includes(normalizedQuery),
    ),
  }));
  const visibleContacts = CONTACTS.filter((contact) =>
    [contact.name, contact.company, contact.stage, contact.activity].some(
      (value) => value.toLocaleLowerCase().includes(normalizedQuery),
    ),
  );

  const addDeal = () => {
    const company = draftDeal.company.trim();
    const numericValue = Number(draftDeal.value);
    if (!company || !Number.isFinite(numericValue) || numericValue <= 0) return;

    setPipeline((current) =>
      current.map((column) =>
        column.stage === draftDeal.stage
          ? {
              ...column,
              deals: [
                {
                  company,
                  value: `$${numericValue.toLocaleString("en-US")}`,
                  owner: "LR",
                  days: "0d",
                },
                ...column.deals,
              ],
            }
          : column,
      ),
    );
    setOpenDeals((count) => count + 1);
    setDraftDeal({ company: "", value: "", stage: PIPELINE[0].stage });
    setNewDealOpen(false);
  };

  return (
    <div
      className={`${sans.className} min-h-screen`}
      style={{ backgroundColor: PAPER, color: INK }}
    >
      <TemplateBackLink />

      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside
          className="hidden w-56 shrink-0 flex-col justify-between border lg:flex"
          style={{ borderColor: LINE }}
        >
          <div>
            <div className="border px-5 py-5" style={{ borderColor: LINE }}>
              <p className={`${serif.className} text-2xl leading-none`}>
                KONTUR<span style={{ color: GREEN }}>.</span>
              </p>
              <p
                className={`${mono.className} mt-1.5 text-[10px] uppercase tracking-[0.22em] opacity-60`}
              >
                CRM Ledger
              </p>
            </div>
            <nav className="px-3 py-5">
              {NAV_GROUPS.map((group) => (
                <div key={group.label} className="mb-6">
                  <p
                    className={`${mono.className} mb-2 px-2 text-[10px] uppercase tracking-[0.2em] opacity-50`}
                  >
                    {group.label}
                  </p>
                  {group.items.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="mb-1 flex items-center justify-between border px-2 py-1.5 text-[13px] transition-colors hover:opacity-100"
                      style={
                        item.active
                          ? {
                              backgroundColor: CARD,
                              borderColor: GREEN,
                            }
                          : { borderColor: "transparent", opacity: 0.72 }
                      }
                    >
                      <span>{item.name}</span>
                    </a>
                  ))}
                </div>
              ))}
            </nav>
          </div>
          <div className="border px-5 py-4" style={{ borderColor: LINE }}>
            <div className="flex items-center gap-2.5">
              <OwnerDot initials="LR" />
              <div className="min-w-0">
                <p className="truncate text-[13px]">Lena Reuter</p>
                <p
                  className={`${mono.className} text-[10px] uppercase tracking-[0.1em] opacity-50`}
                >
                  Head of Sales
                </p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main */}
        <main id="dashboard" className="min-w-0 flex-1">
          {/* Topbar */}
          <header
            className="flex flex-wrap items-center justify-between gap-3 border px-4 py-3.5 md:px-7"
            style={{ borderColor: LINE }}
          >
            <div className="flex items-baseline gap-3">
              <p className={`${serif.className} text-xl lg:hidden`}>
                KONTUR<span style={{ color: GREEN }}>.</span>
              </p>
              <p
                className={`${mono.className} text-[11px] uppercase tracking-[0.14em] opacity-60`}
              >
                Overview / Q3 Ledger
              </p>
            </div>
            <div className="flex items-center gap-2.5">
              <label
                className="hidden items-center gap-2 border px-3 py-1.5 sm:flex"
                style={{ borderColor: LINE, backgroundColor: CARD }}
              >
                <span className={`${mono.className} text-[11px] opacity-50`}>
                  /
                </span>
                <input
                  type="search"
                  placeholder="Search deals, people, notes"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  className="w-44 bg-transparent text-[13px] outline-none placeholder:opacity-50"
                  aria-label="Search"
                />
              </label>
              <button
                type="button"
                aria-controls="new-deal-form"
                aria-expanded={newDealOpen}
                onClick={() => setNewDealOpen((open) => !open)}
                className={`${mono.className} px-3.5 py-1.5 text-[11px] uppercase tracking-[0.12em] transition-opacity hover:opacity-85`}
                style={{ backgroundColor: GREEN, color: PAPER }}
              >
                + New Deal
              </button>
              <OwnerDot initials="LR" />
            </div>
          </header>

          {newDealOpen && (
            <section
              id="new-deal-form"
              className="mx-4 mt-4 border p-4 md:mx-7"
              style={{ borderColor: GREEN, backgroundColor: CARD }}
              aria-labelledby="new-deal-title"
            >
              <div className="flex items-center justify-between gap-4">
                <h2 id="new-deal-title" className="text-[13px] font-medium">
                  New deal
                </h2>
                <button
                  type="button"
                  onClick={() => setNewDealOpen(false)}
                  className={`${mono.className} border px-3 py-1.5 text-[10px] uppercase tracking-[0.12em]`}
                  style={{ borderColor: LINE }}
                >
                  Close
                </button>
              </div>
              <form
                className="mt-4 grid gap-3 md:grid-cols-[1fr_180px_160px_auto]"
                onSubmit={(event) => {
                  event.preventDefault();
                  addDeal();
                }}
              >
                <label
                  className={`${mono.className} text-[10px] uppercase tracking-[0.12em]`}
                >
                  Company
                  <input
                    value={draftDeal.company}
                    onChange={(event) =>
                      setDraftDeal((current) => ({
                        ...current,
                        company: event.target.value,
                      }))
                    }
                    className="mt-1 min-h-10 w-full border bg-transparent px-3 font-sans text-[13px] normal-case tracking-normal outline-none focus:border-[#1E5C42]"
                    style={{ borderColor: LINE }}
                    required
                  />
                </label>
                <label
                  className={`${mono.className} text-[10px] uppercase tracking-[0.12em]`}
                >
                  Value
                  <input
                    type="number"
                    min="1"
                    step="1"
                    value={draftDeal.value}
                    onChange={(event) =>
                      setDraftDeal((current) => ({
                        ...current,
                        value: event.target.value,
                      }))
                    }
                    className="mt-1 min-h-10 w-full border bg-transparent px-3 font-sans text-[13px] normal-case tracking-normal outline-none focus:border-[#1E5C42]"
                    style={{ borderColor: LINE }}
                    required
                  />
                </label>
                <label
                  className={`${mono.className} text-[10px] uppercase tracking-[0.12em]`}
                >
                  Stage
                  <select
                    value={draftDeal.stage}
                    onChange={(event) =>
                      setDraftDeal((current) => ({
                        ...current,
                        stage: event.target.value,
                      }))
                    }
                    className="mt-1 min-h-10 w-full border bg-transparent px-3 font-sans text-[13px] normal-case tracking-normal outline-none focus:border-[#1E5C42]"
                    style={{ borderColor: LINE }}
                  >
                    {PIPELINE.map((column) => (
                      <option key={column.stage} value={column.stage}>
                        {column.stage}
                      </option>
                    ))}
                  </select>
                </label>
                <button
                  type="submit"
                  className={`${mono.className} min-h-10 self-end px-4 text-[10px] uppercase tracking-[0.12em]`}
                  style={{ backgroundColor: GREEN, color: PAPER }}
                >
                  Add deal
                </button>
              </form>
            </section>
          )}

          <div className="px-4 py-6 md:px-7 md:py-8">
            {/* KPI row */}
            <section
              aria-label="Key metrics"
              className="grid grid-cols-2 border xl:grid-cols-4"
              style={{ borderColor: LINE, backgroundColor: CARD }}
            >
              {KPIS.map((kpi, i) => (
                <div
                  key={kpi.label}
                  className={`px-4 py-4 md:px-5 md:py-5 ${i % 2 === 1 ? "border" : ""} ${i >= 2 ? "border xl:border-0 xl:border" : ""}`}
                  style={{ borderColor: LINE }}
                >
                  <p
                    className={`${mono.className} text-[10px] uppercase tracking-[0.18em] opacity-55`}
                  >
                    {kpi.label}
                  </p>
                  <p
                    className={`${mono.className} mt-2 text-xl tabular-nums md:text-2xl`}
                  >
                    {kpi.value}
                  </p>
                  <p className="mt-1.5 flex items-baseline gap-2 text-[11px]">
                    <span
                      className={mono.className}
                      style={{ color: kpi.up ? GREEN : AMBER }}
                    >
                      {kpi.delta}
                    </span>
                    <span className="opacity-50">{kpi.note}</span>
                  </p>
                </div>
              ))}
            </section>

            <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_290px]">
              <div className="min-w-0 space-y-6">
                {/* Revenue chart */}
                <section
                  aria-label="Revenue by month"
                  className="border"
                  style={{ borderColor: LINE, backgroundColor: CARD }}
                >
                  <div
                    className="flex items-baseline justify-between border px-5 py-3"
                    style={{ borderColor: LINE }}
                  >
                    <h2 className="text-[13px] font-medium">
                      Closed revenue, trailing 12 months
                    </h2>
                    <p
                      className={`${mono.className} text-[10px] uppercase tracking-[0.14em] opacity-50`}
                    >
                      USD, thousands
                    </p>
                  </div>
                  <div className="px-5 pb-4 pt-6">
                    <div className="flex h-36 items-end gap-1.5 md:gap-2.5">
                      {REVENUE.map((bar) => (
                        <div
                          key={bar.month}
                          className="group flex h-full flex-1 flex-col justify-end gap-1.5"
                        >
                          <div
                            className="w-full transition-opacity group-hover:opacity-75"
                            style={{
                              height: `${bar.value}%`,
                              backgroundColor:
                                bar.value === 100 ? GREEN : "#2F2C22",
                              opacity: bar.value === 100 ? 1 : 0.82,
                            }}
                          />
                          <p
                            className={`${mono.className} text-center text-[9px] uppercase opacity-45`}
                          >
                            {bar.month}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                {/* Pipeline board */}
                <section
                  id="pipeline"
                  aria-label="Sales pipeline"
                  className="scroll-mt-4"
                >
                  <div className="mb-3 flex items-baseline justify-between">
                    <h2 className="text-[13px] font-medium">Pipeline</h2>
                    <p
                      className={`${mono.className} text-[10px] uppercase tracking-[0.14em] opacity-50`}
                    >
                      {openDeals} open deals
                    </p>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                    {visiblePipeline.map((column) => (
                      <div
                        key={column.stage}
                        className="border"
                        style={{ borderColor: LINE, backgroundColor: CARD }}
                      >
                        <div
                          className="flex items-baseline justify-between border px-3 py-2.5"
                          style={{ borderColor: LINE }}
                        >
                          <p
                            className={`${mono.className} text-[10px] uppercase tracking-[0.14em]`}
                          >
                            {column.stage}
                          </p>
                          <p
                            className={`${mono.className} text-[10px] opacity-55`}
                          >
                            {column.total}
                          </p>
                        </div>
                        <div className="space-y-2 p-2.5">
                          {column.deals.map((deal) => (
                            <article
                              key={deal.company}
                              className="border px-3 py-2.5 transition-transform motion-safe:hover:-translate-y-0.5"
                              style={{
                                borderColor: LINE,
                                backgroundColor: PAPER,
                                boxShadow: deal.hot
                                  ? `2px 2px 0 ${GREEN}`
                                  : "none",
                              }}
                            >
                              <p className="text-[13px] leading-snug">
                                {deal.company}
                              </p>
                              <div className="mt-2 flex items-center justify-between">
                                <p
                                  className={`${mono.className} text-[12px] tabular-nums`}
                                >
                                  {deal.value}
                                </p>
                                <div className="flex items-center gap-1.5">
                                  <span
                                    className={`${mono.className} text-[9px] uppercase opacity-45`}
                                  >
                                    {deal.days}
                                  </span>
                                  <OwnerDot initials={deal.owner} />
                                </div>
                              </div>
                            </article>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Contacts table */}
                <section
                  id="contacts"
                  aria-label="Contacts"
                  className="scroll-mt-4 border"
                  style={{ borderColor: LINE, backgroundColor: CARD }}
                >
                  <div
                    className="border px-5 py-3"
                    style={{ borderColor: LINE }}
                  >
                    <h2 className="text-[13px] font-medium">Key contacts</h2>
                  </div>
                  <div
                    className="divide-y sm:hidden"
                    style={{ borderColor: LINE }}
                  >
                    {visibleContacts.map((contact) => (
                      <article key={contact.name} className="p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex min-w-0 items-center gap-2.5">
                            <OwnerDot initials={contact.initials} />
                            <div className="min-w-0">
                              <h3 className="truncate text-[13px]">
                                {contact.name}
                              </h3>
                              <p className="truncate text-[12px] opacity-65">
                                {contact.company}
                              </p>
                            </div>
                          </div>
                          <StageChip stage={contact.stage} />
                        </div>
                        <div className="mt-3 flex items-end justify-between gap-3">
                          <p className="text-[12px] opacity-60">
                            {contact.activity}
                          </p>
                          <p
                            className={`${mono.className} shrink-0 text-[12px] tabular-nums`}
                          >
                            {contact.value}
                          </p>
                        </div>
                      </article>
                    ))}
                  </div>
                  <div className="hidden sm:block">
                    <table className="w-full text-left">
                      <thead>
                        <tr
                          className={`${mono.className} text-[10px] uppercase tracking-[0.14em] opacity-50`}
                        >
                          <th className="px-5 py-2.5 font-normal">Contact</th>
                          <th className="px-3 py-2.5 font-normal">Company</th>
                          <th className="px-3 py-2.5 font-normal">Stage</th>
                          <th className="px-3 py-2.5 font-normal">
                            Last activity
                          </th>
                          <th className="px-5 py-2.5 text-right font-normal">
                            Value
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {CONTACTS.map((contact) => (
                          <tr
                            key={contact.name}
                            className="border transition-colors hover:bg-[#F4F2EC]"
                            style={{ borderColor: LINE }}
                          >
                            <td className="px-5 py-2.5">
                              <div className="flex items-center gap-2.5">
                                <OwnerDot initials={contact.initials} />
                                <span className="text-[13px]">
                                  {contact.name}
                                </span>
                              </div>
                            </td>
                            <td className="px-3 py-2.5 text-[13px] opacity-70">
                              {contact.company}
                            </td>
                            <td className="px-3 py-2.5">
                              <StageChip stage={contact.stage} />
                            </td>
                            <td className="px-3 py-2.5 text-[12px] opacity-60">
                              {contact.activity}
                            </td>
                            <td
                              className={`${mono.className} px-5 py-2.5 text-right text-[12px] tabular-nums`}
                            >
                              {contact.value}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              </div>

              {/* Right rail */}
              <aside className="space-y-6">
                <section
                  id="activity"
                  aria-label="Activity"
                  className="scroll-mt-4 border"
                  style={{ borderColor: LINE, backgroundColor: CARD }}
                >
                  <div
                    className="border px-4 py-3"
                    style={{ borderColor: LINE }}
                  >
                    <h2 className="text-[13px] font-medium">
                      Today&apos;s ledger
                    </h2>
                  </div>
                  <ol className="px-4 py-3">
                    {ACTIVITY.map((entry) => (
                      <li
                        key={entry.time}
                        className="flex gap-3 border py-2.5 last:border-0"
                        style={{ borderColor: "#EAE6DB" }}
                      >
                        <span
                          className={`${mono.className} pt-0.5 text-[10px] tabular-nums opacity-50`}
                        >
                          {entry.time}
                        </span>
                        <span
                          className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                          style={{
                            backgroundColor:
                              entry.kind === "win"
                                ? GREEN
                                : entry.kind === "flag"
                                  ? AMBER
                                  : LINE,
                          }}
                        />
                        <p className="text-[12px] leading-relaxed opacity-80">
                          {entry.text}
                        </p>
                      </li>
                    ))}
                  </ol>
                </section>

                <section
                  id="tasks"
                  aria-label="Tasks"
                  className="scroll-mt-4 border"
                  style={{ borderColor: LINE, backgroundColor: CARD }}
                >
                  <div
                    className="flex items-baseline justify-between border px-4 py-3"
                    style={{ borderColor: LINE }}
                  >
                    <h2 className="text-[13px] font-medium">Tasks due</h2>
                    <span
                      className={`${mono.className} text-[10px] opacity-50`}
                    >
                      {TASKS.length}
                    </span>
                  </div>
                  <ul className="px-4 py-2">
                    {TASKS.map((task) => (
                      <li key={task.text}>
                        <label
                          className="flex cursor-pointer items-start gap-2.5 border py-2.5 last:border-0"
                          style={{ borderColor: "#EAE6DB" }}
                        >
                          <input
                            type="checkbox"
                            aria-label={task.text}
                            checked={completedTasks.includes(task.text)}
                            onChange={(event) =>
                              setCompletedTasks((current) =>
                                event.target.checked
                                  ? [...current, task.text]
                                  : current.filter(
                                      (item) => item !== task.text,
                                    ),
                              )
                            }
                            className="mt-0.5 h-4 w-4 shrink-0 accent-[#1E5C42]"
                          />
                          <span className="min-w-0">
                            <span
                              className={`block text-[12px] leading-snug ${
                                completedTasks.includes(task.text)
                                  ? "line-through opacity-45"
                                  : ""
                              }`}
                            >
                              {task.text}
                            </span>
                            <span
                              className={`${mono.className} mt-0.5 block text-[10px] uppercase tracking-[0.1em]`}
                              style={{
                                color: task.urgent ? AMBER : undefined,
                                opacity: task.urgent ? 1 : 0.5,
                              }}
                            >
                              {task.due}
                            </span>
                          </span>
                        </label>
                      </li>
                    ))}
                  </ul>
                </section>
              </aside>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
