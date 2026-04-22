"use client";

import { useEffect, useMemo, useState } from "react";

type Expense = {
  paidBy: string;
  amount: number;
  splitBetween: string[];
};

type Group = {
  groupName: string;
  people: string[];
  expenses: Expense[];
};

const GROUPS_STORAGE_KEY = "expense-splitter-groups-v1";
const SELECTED_GROUP_STORAGE_KEY = "expense-splitter-selected-group-v1";
const DEFAULT_GROUP_NAME = "Default Group";

const defaultGroups: Group[] = [
  {
    groupName: DEFAULT_GROUP_NAME,
    people: [],
    expenses: [],
  },
];

const EMPTY_PEOPLE: string[] = [];
const EMPTY_EXPENSES: Expense[] = [];

function sanitizeExpense(value: unknown): Expense | null {
  if (!value || typeof value !== "object") return null;

  const candidate = value as {
    paidBy?: unknown;
    amount?: unknown;
    splitBetween?: unknown;
  };

  if (typeof candidate.paidBy !== "string") return null;
  if (typeof candidate.amount !== "number" || !Number.isFinite(candidate.amount)) {
    return null;
  }
  if (!Array.isArray(candidate.splitBetween)) return null;

  const splitBetween = candidate.splitBetween.filter(
    (item): item is string => typeof item === "string" && item.trim().length > 0
  );

  if (splitBetween.length === 0) return null;

  return {
    paidBy: candidate.paidBy,
    amount: candidate.amount,
    splitBetween,
  };
}

function sanitizeGroup(value: unknown): Group | null {
  if (!value || typeof value !== "object") return null;

  const candidate = value as {
    groupName?: unknown;
    people?: unknown;
    expenses?: unknown;
  };

  if (typeof candidate.groupName !== "string" || !candidate.groupName.trim()) {
    return null;
  }

  if (!Array.isArray(candidate.people) || !Array.isArray(candidate.expenses)) {
    return null;
  }

  const people = Array.from(
    new Set(
      candidate.people.filter(
        (item): item is string => typeof item === "string" && item.trim().length > 0
      )
    )
  );

  const expenses = candidate.expenses
    .map(sanitizeExpense)
    .filter((expense): expense is Expense => Boolean(expense))
    .filter(
      (expense) =>
        people.includes(expense.paidBy) &&
        expense.splitBetween.every((person) => people.includes(person))
    );

  return {
    groupName: candidate.groupName.trim(),
    people,
    expenses,
  };
}

function parseStoredGroups(raw: string | null): Group[] {
  if (!raw) return defaultGroups;

  try {
    const parsed = JSON.parse(raw) as unknown;

    if (!Array.isArray(parsed)) return defaultGroups;

    const groups = parsed
      .map(sanitizeGroup)
      .filter((group): group is Group => Boolean(group));

    if (groups.length === 0) return defaultGroups;

    return groups;
  } catch {
    return defaultGroups;
  }
}

export default function Home() {
  const [groups, setGroups] = useState<Group[]>(defaultGroups);
  const [selectedGroupName, setSelectedGroupName] = useState(DEFAULT_GROUP_NAME);
  const [hasLoadedFromStorage, setHasLoadedFromStorage] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");

  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [paidBy, setPaidBy] = useState("");
  const [splitBetween, setSplitBetween] = useState<string[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  useEffect(() => {
    const storedGroups = parseStoredGroups(localStorage.getItem(GROUPS_STORAGE_KEY));
    const storedSelected = localStorage.getItem(SELECTED_GROUP_STORAGE_KEY);

    queueMicrotask(() => {
      setGroups(storedGroups);

      if (storedSelected && storedGroups.some((group) => group.groupName === storedSelected)) {
        setSelectedGroupName(storedSelected);
      } else {
        setSelectedGroupName(storedGroups[0]?.groupName ?? DEFAULT_GROUP_NAME);
      }

      setHasLoadedFromStorage(true);
    });
  }, []);

  useEffect(() => {
    if (!hasLoadedFromStorage) return;
    localStorage.setItem(GROUPS_STORAGE_KEY, JSON.stringify(groups));
    localStorage.setItem(SELECTED_GROUP_STORAGE_KEY, selectedGroupName);
  }, [groups, selectedGroupName, hasLoadedFromStorage]);

  const selectedGroup = useMemo(() => {
    return (
      groups.find((group) => group.groupName === selectedGroupName) ??
      groups[0] ?? {
        groupName: "",
        people: EMPTY_PEOPLE,
        expenses: EMPTY_EXPENSES,
      }
    );
  }, [groups, selectedGroupName]);

  const people = selectedGroup?.people ?? EMPTY_PEOPLE;
  const expenses = selectedGroup?.expenses ?? EMPTY_EXPENSES;

  const resetExpenseForm = () => {
    setAmount("");
    setPaidBy("");
    setSplitBetween([]);
    setEditingIndex(null);
  };

  const handleGroupChange = (groupName: string) => {
    setSelectedGroupName(groupName);
    resetExpenseForm();
  };

  const updateSelectedGroup = (updater: (group: Group) => Group) => {
    setGroups((prev) => {
      const idx = prev.findIndex((group) => group.groupName === selectedGroupName);
      if (idx === -1) return prev;

      const next = [...prev];
      next[idx] = updater(prev[idx]);
      return next;
    });
  };

  const setPeople = (updater: string[] | ((prev: string[]) => string[])) => {
    updateSelectedGroup((group) => ({
      ...group,
      people: typeof updater === "function" ? (updater as (prev: string[]) => string[])(group.people) : updater,
    }));
  };

  const setExpenses = (updater: Expense[] | ((prev: Expense[]) => Expense[])) => {
    updateSelectedGroup((group) => ({
      ...group,
      expenses:
        typeof updater === "function"
          ? (updater as (prev: Expense[]) => Expense[])(group.expenses)
          : updater,
    }));
  };

  const addPerson = (personName: string) => {
    const trimmed = personName.trim();
    if (!selectedGroup || !trimmed) return;

    if (people.includes(trimmed)) return;
    setPeople((prev) => [...prev, trimmed]);
  };

  const deletePerson = (personName: string) => {
    if (!selectedGroup) return;

    setPeople((prev) => prev.filter((p) => p !== personName));
    setExpenses((prev) =>
      prev
        .map((exp) => ({
          ...exp,
          splitBetween: exp.splitBetween.filter((p) => p !== personName),
        }))
        .filter((exp) => exp.paidBy !== personName && exp.splitBetween.length > 0)
    );

    if (paidBy === personName) {
      setPaidBy("");
    }

    setSplitBetween((prev) => prev.filter((p) => p !== personName));
    setEditingIndex(null);
  };

  const addExpense = (expense: Expense) => {
    if (!selectedGroup) return;
    setExpenses((prev) => [...prev, expense]);
  };

  const createGroup = () => {
    const trimmed = newGroupName.trim();
    if (!trimmed) return;

    const existing = groups.find(
      (group) => group.groupName.toLowerCase() === trimmed.toLowerCase()
    );

    if (existing) {
      handleGroupChange(existing.groupName);
      setNewGroupName("");
      return;
    }

    const group: Group = {
      groupName: trimmed,
      people: [],
      expenses: [],
    };

    setGroups((prev) => [...prev, group]);
    handleGroupChange(trimmed);
    setNewGroupName("");
  };

  const settleAll = () => {
    if (!selectedGroup) return;

    setExpenses([]);
    resetExpenseForm();
  };

  const calculateBalances = (currentPeople: string[], currentExpenses: Expense[]) => {
    const balances: Record<string, number> = {};
    currentPeople.forEach((p) => (balances[p] = 0));

    currentExpenses.forEach((exp) => {
      if (!exp.splitBetween.length) return;

      const share = exp.amount / exp.splitBetween.length;
      exp.splitBetween.forEach((person) => {
        if (balances[person] !== undefined) {
          balances[person] -= share;
        }
      });

      if (balances[exp.paidBy] !== undefined) {
        balances[exp.paidBy] += exp.amount;
      }
    });

    return balances;
  };

  const simplifyDebts = (balances: Record<string, number>) => {
    const creditors: { name: string; amount: number }[] = [];
    const debtors: { name: string; amount: number }[] = [];

    for (const person in balances) {
      const amt = balances[person];
      if (amt > 0.0001) creditors.push({ name: person, amount: amt });
      else if (amt < -0.0001) debtors.push({ name: person, amount: -amt });
    }

    const transactions: { from: string; to: string; amount: number }[] = [];

    let i = 0;
    let j = 0;

    while (i < debtors.length && j < creditors.length) {
      const min = Math.min(debtors[i].amount, creditors[j].amount);

      transactions.push({
        from: debtors[i].name,
        to: creditors[j].name,
        amount: min,
      });

      debtors[i].amount -= min;
      creditors[j].amount -= min;

      if (debtors[i].amount <= 0.0001) i++;
      if (creditors[j].amount <= 0.0001) j++;
    }

    return transactions;
  };

  const totalsPaid = useMemo(() => {
    const totals: Record<string, number> = {};

    people.forEach((person) => {
      totals[person] = 0;
    });

    expenses.forEach((expense) => {
      if (totals[expense.paidBy] === undefined) {
        totals[expense.paidBy] = 0;
      }
      totals[expense.paidBy] += expense.amount;
    });

    return totals;
  }, [people, expenses]);

  const balances = calculateBalances(people, expenses);
  const transactions = simplifyDebts(balances);
  const balanceEntries = Object.entries(balances);

  const getBalanceCardStyles = (value: number) => {
    if (value > 0) {
      return {
        card: "border-[#2E7D32] bg-[linear-gradient(180deg,#ECFDF3_0%,#DDF7E8_100%)]",
        text: "text-[#1B5E20]",
        amount: "text-[#2E7D32]",
        glow: "hover:shadow-[0_10px_28px_rgba(46,125,50,0.28)]",
      };
    }

    if (value < 0) {
      return {
        card: "border-[#D32F2F] bg-[linear-gradient(180deg,#FFF1F1_0%,#FFE3E3_100%)]",
        text: "text-[#8E1B1B]",
        amount: "text-[#D32F2F]",
        glow: "hover:shadow-[0_10px_28px_rgba(211,47,47,0.24)]",
      };
    }

    return {
      card: "border-[#8A8A8A] bg-[linear-gradient(180deg,#F6F6F6_0%,#ECECEC_100%)]",
      text: "text-[#3E3E3E]",
      amount: "text-[#5A5A5A]",
      glow: "hover:shadow-[0_10px_24px_rgba(80,80,80,0.2)]",
    };
  };

  return (
    <>
      <main className="min-h-screen bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.09),transparent_34%),radial-gradient(circle_at_80%_0%,rgba(251,192,45,0.15),transparent_30%),linear-gradient(180deg,#0D5A25_0%,#0F172A_100%)] px-4 py-6 md:px-8 md:py-10 text-[#0F172A]">
        <div className="mx-auto max-w-7xl rounded-[30px] border-4 border-[#101010] bg-[rgba(6,44,24,0.42)] p-4 md:p-6 shadow-[0_25px_55px_rgba(0,0,0,0.45)]">
          <header className="rounded-2xl border-4 border-[#111] bg-[#F7F1DE] p-5 shadow-[0_8px_0_rgba(0,0,0,0.2)] animate-[fadeUp_.45s_ease-out_both]">
            <div className="rounded-xl border-2 border-[#D4AF37] bg-[linear-gradient(180deg,#FFF9EA_0%,#F6EED6_100%)] p-4 text-center">
              <p className="text-xs font-black uppercase tracking-[0.35em] text-[#2E7D32]">SaaS Board Ledger</p>
              <h1 className="mt-1 text-3xl md:text-4xl font-black uppercase tracking-[0.2em] text-[#D32F2F] [text-shadow:2px_2px_0_rgba(0,0,0,0.15)]">
                Expense Splitter
              </h1>
              <p className="mt-1 text-sm font-bold uppercase tracking-[0.16em] text-[#1F3A24]">Monopoly Inspired Finance Workspace</p>
            </div>
          </header>

          <div className="mt-5 grid grid-cols-1 xl:grid-cols-[1.1fr_0.9fr] gap-5">
            <div className="space-y-5 animate-[fadeUp_.55s_ease-out_both]">
              <section className="rounded-2xl border-4 border-[#111] bg-[#F7F1DE] p-4 shadow-[0_8px_0_rgba(0,0,0,0.22)]">
                <h2 className="text-base md:text-lg font-black uppercase tracking-[0.14em] mb-3 text-[#1E3A1E]">Groups</h2>

                <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-2.5">
                  <select
                    value={selectedGroup.groupName}
                    onChange={(e) => handleGroupChange(e.target.value)}
                    className="h-11 rounded-xl border-2 border-[#111] bg-white/90 px-3 font-bold tracking-wide outline-none transition duration-200 focus:ring-2 focus:ring-[#1976D2]"
                  >
                    {groups.map((group) => (
                      <option key={group.groupName} value={group.groupName}>
                        {group.groupName}
                      </option>
                    ))}
                  </select>

                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      value={newGroupName}
                      onChange={(e) => setNewGroupName(e.target.value)}
                      placeholder="Create new group"
                      className="h-11 flex-1 rounded-xl border-2 border-[#111] bg-white/90 px-3 font-semibold tracking-wide outline-none transition duration-200 focus:ring-2 focus:ring-[#FBC02D]"
                    />

                    <button
                      onClick={createGroup}
                      className="h-11 rounded-xl border-2 border-[#111] bg-[#1976D2] px-5 text-sm font-black uppercase tracking-[0.11em] text-[#F7F1DE] transition-all duration-200 hover:scale-[1.03] hover:brightness-110 active:scale-95"
                    >
                      Create
                    </button>
                  </div>
                </div>
              </section>

              <section className="rounded-2xl border-4 border-[#111] bg-[#F7F1DE] p-4 shadow-[0_8px_0_rgba(0,0,0,0.22)]">
                <div className="flex items-center justify-between mb-3 gap-2">
                  <h2 className="text-base md:text-lg font-black uppercase tracking-[0.14em] text-[#1E3A1E]">Players</h2>
                  <button
                    onClick={settleAll}
                    disabled={!selectedGroup || expenses.length === 0}
                    className="h-10 rounded-xl border-2 border-[#111] bg-[#D32F2F] px-4 text-xs font-black uppercase tracking-[0.11em] text-[#F7F1DE] transition-all duration-200 hover:scale-[1.03] hover:brightness-110 active:scale-95 disabled:opacity-55 disabled:cursor-not-allowed"
                  >
                    Settle All
                  </button>
                </div>

                {!selectedGroup ? (
                  <p className="rounded-xl border-2 border-dashed border-[#111] bg-white/60 p-3 text-sm font-semibold text-[#444]">No group selected.</p>
                ) : (
                  <>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter player name"
                        className="h-11 flex-1 rounded-xl border-2 border-[#111] bg-white/90 px-3 font-semibold outline-none transition duration-200 focus:ring-2 focus:ring-[#2E7D32]"
                      />

                      <button
                        onClick={() => {
                          addPerson(name);
                          setName("");
                        }}
                        className="h-11 rounded-xl border-2 border-[#111] bg-[#2E7D32] px-5 text-sm font-black uppercase tracking-[0.12em] text-[#F7F1DE] transition-all duration-200 hover:scale-[1.03] hover:brightness-110 active:scale-95"
                      >
                        Add
                      </button>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {people.map((person) => (
                        <div
                          key={person}
                          className="rounded-full border-2 border-[#111] bg-[linear-gradient(180deg,#FFF7DA_0%,#F0E1B8_100%)] px-3 py-1.5 flex items-center gap-2 shadow-[0_3px_0_rgba(0,0,0,0.2)] transition-all duration-300 hover:scale-[1.04] hover:shadow-[0_8px_18px_rgba(0,0,0,0.22)]"
                        >
                          <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#1976D2]" />
                          <span className="font-bold tracking-wide">{person}</span>
                          <button
                            onClick={() => deletePerson(person)}
                            className="rounded-md border border-[#111] bg-[#D32F2F] px-1.5 text-[10px] font-black uppercase text-[#F7F1DE] transition-all duration-200 hover:scale-105 hover:brightness-110 active:scale-95"
                          >
                            Delete
                          </button>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </section>

              <section className="rounded-2xl border-4 border-[#111] bg-[#F7F1DE] p-4 shadow-[0_8px_0_rgba(0,0,0,0.22)]">
                <h2 className="text-base md:text-lg font-black uppercase tracking-[0.14em] mb-3 text-[#1E3A1E]">Add Expense</h2>

                {!selectedGroup ? (
                  <p className="rounded-xl border-2 border-dashed border-[#111] bg-white/60 p-3 text-sm font-semibold text-[#444]">No group selected.</p>
                ) : (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <input
                        type="number"
                        placeholder="Amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="h-11 rounded-xl border-2 border-[#111] bg-white/90 px-3 font-semibold outline-none transition duration-200 focus:ring-2 focus:ring-[#2E7D32]"
                      />

                      <select
                        value={paidBy}
                        onChange={(e) => setPaidBy(e.target.value)}
                        className="h-11 rounded-xl border-2 border-[#111] bg-white/90 px-3 font-semibold outline-none transition duration-200 focus:ring-2 focus:ring-[#1976D2]"
                      >
                        <option value="">Paid By</option>
                        {people.map((person) => (
                          <option key={person} value={person}>
                            {person}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="mt-3 rounded-xl border-2 border-[#111] bg-white/70 p-3">
                      <p className="text-xs font-black uppercase tracking-[0.12em] text-[#1E3A1E] mb-2">Split Between</p>
                      <div className="flex flex-wrap gap-2.5">
                        {people.map((person) => (
                          <label key={person} className="flex items-center gap-2 rounded-lg border border-[#111] bg-[#FFF7DA] px-2.5 py-1.5 shadow-sm transition-all duration-200 hover:scale-[1.03]">
                            <input
                              type="checkbox"
                              checked={splitBetween.includes(person)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSplitBetween([...splitBetween, person]);
                                } else {
                                  setSplitBetween(splitBetween.filter((x) => x !== person));
                                }
                              }}
                              className="accent-[#2E7D32]"
                            />
                            <span className="font-semibold">{person}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        if (!amount || !paidBy || splitBetween.length === 0) return;

                        const newExpense: Expense = {
                          paidBy,
                          amount: Number(amount),
                          splitBetween,
                        };

                        if (editingIndex !== null) {
                          setExpenses((prev) =>
                            prev.map((exp, i) => (i === editingIndex ? newExpense : exp))
                          );
                          setEditingIndex(null);
                        } else {
                          addExpense(newExpense);
                        }

                        setAmount("");
                        setPaidBy("");
                        setSplitBetween([]);
                      }}
                      className="mt-3 h-11 rounded-xl border-2 border-[#111] bg-[#2E7D32] px-6 text-sm font-black uppercase tracking-[0.12em] text-[#F7F1DE] transition-all duration-200 hover:scale-[1.03] hover:brightness-110 active:scale-95"
                    >
                      {editingIndex !== null ? "Update Expense" : "Add Expense"}
                    </button>
                  </>
                )}
              </section>

              <section className="rounded-2xl border-4 border-[#111] bg-[#F7F1DE] p-4 shadow-[0_8px_0_rgba(0,0,0,0.22)]">
                <h2 className="text-base md:text-lg font-black uppercase tracking-[0.14em] mb-3 text-[#1E3A1E]">Expense History</h2>

                {expenses.length === 0 ? (
                  <p className="rounded-xl border-2 border-dashed border-[#111] bg-white/60 p-3 text-sm font-semibold text-[#444]">No expenses yet</p>
                ) : (
                  <div className="space-y-3">
                    {expenses.map((exp, i) => (
                      <div
                        key={`${exp.paidBy}-${exp.amount}-${i}`}
                        className="rounded-xl border-2 border-[#111] bg-[linear-gradient(180deg,#FFF8E8_0%,#F5E8C9_100%)] p-3 shadow-[0_4px_0_rgba(0,0,0,0.16)] transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_12px_20px_rgba(0,0,0,0.18)]"
                      >
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                          <div>
                            <p className="font-black uppercase tracking-[0.08em] text-[#1E3A1E]">
                              {exp.paidBy} paid <span className="text-[#2E7D32]">₹{exp.amount}</span>
                            </p>
                            <div className="mt-2 h-px w-full bg-[#111]/20" />
                            <p className="mt-2 text-sm font-semibold text-[#444]">Split: {exp.splitBetween.join(", ")}</p>
                          </div>

                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                const item = expenses[i];
                                setAmount(String(item.amount));
                                setPaidBy(item.paidBy);
                                setSplitBetween(item.splitBetween);
                                setEditingIndex(i);
                              }}
                              className="h-9 rounded-lg border-2 border-[#111] bg-[#FBC02D] px-3 text-xs font-black uppercase tracking-[0.11em] text-[#111] transition-all duration-200 hover:scale-105 hover:brightness-110 active:scale-95"
                            >
                              Edit
                            </button>

                            <button
                              onClick={() =>
                                setExpenses((prev) => prev.filter((_, idx) => idx !== i))
                              }
                              className="h-9 rounded-lg border-2 border-[#111] bg-[#D32F2F] px-3 text-xs font-black uppercase tracking-[0.11em] text-[#F7F1DE] transition-all duration-200 hover:scale-105 hover:brightness-110 active:scale-95"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            </div>

            <div className="space-y-5 animate-[fadeUp_.7s_ease-out_both]">
              <section className="rounded-2xl border-4 border-[#111] bg-[#F7F1DE] p-4 shadow-[0_8px_0_rgba(0,0,0,0.22)]">
                <h2 className="text-base md:text-lg font-black uppercase tracking-[0.14em] mb-3 text-[#1E3A1E]">Total Spent</h2>

                {people.length === 0 ? (
                  <p className="rounded-xl border-2 border-dashed border-[#111] bg-white/60 p-3 text-sm font-semibold text-[#444]">No people in this group yet.</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {people.map((person) => (
                      <div
                        key={person}
                        className="rounded-xl border-2 border-[#111] bg-[linear-gradient(180deg,#FFF8E4_0%,#F3E7C2_100%)] p-3 shadow-[0_5px_0_rgba(0,0,0,0.15)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_12px_24px_rgba(0,0,0,0.2)]"
                      >
                        <p className="text-xs font-black uppercase tracking-[0.13em] text-[#444]">{person}</p>
                        <p className="mt-1 text-2xl font-black text-[#2E7D32]">
                          <span className="mr-1 text-[#111]">₹</span>
                          {Math.round((totalsPaid[person] ?? 0) * 100) / 100}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </section>

              <section className="rounded-2xl border-4 border-[#111] bg-[#F7F1DE] p-4 shadow-[0_8px_0_rgba(0,0,0,0.22)]">
                <h2 className="text-base md:text-lg font-black uppercase tracking-[0.14em] mb-3 text-[#1E3A1E]">Net Balances</h2>

                {balanceEntries.length === 0 ? (
                  <p className="rounded-xl border-2 border-dashed border-[#111] bg-white/60 p-3 text-sm font-semibold text-[#444]">Add players to see balances.</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {balanceEntries.map(([person, value]) => {
                      const styles = getBalanceCardStyles(value);
                      return (
                        <div
                          key={person}
                          className={`rounded-xl border-2 p-3 shadow-[0_4px_0_rgba(0,0,0,0.14)] transition-all duration-300 hover:scale-[1.05] ${styles.card} ${styles.glow}`}
                        >
                          <p className={`text-xs font-black uppercase tracking-[0.12em] ${styles.text}`}>{person}</p>
                          <p className={`mt-1 text-2xl font-black ${styles.amount}`}>
                            {value > 0 ? "+" : value < 0 ? "-" : ""}₹{Math.round(Math.abs(value) * 100) / 100}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </section>

              <section className="rounded-2xl border-4 border-[#111] bg-[#F7F1DE] p-4 shadow-[0_8px_0_rgba(0,0,0,0.22)]">
                <h2 className="text-base md:text-lg font-black uppercase tracking-[0.14em] mb-3 text-[#1E3A1E]">Settlements</h2>

                {transactions.length === 0 ? (
                  <p className="rounded-xl border-2 border-dashed border-[#111] bg-white/60 p-3 text-sm font-semibold text-[#444]">All settled</p>
                ) : (
                  <div className="space-y-2.5">
                    {transactions.map((transaction, i) => (
                      <div
                        key={i}
                        className="rounded-xl border-2 border-[#111] bg-[#FFF8E8] px-3 py-2.5 shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_10px_20px_rgba(0,0,0,0.15)]"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.06em]">
                            <span className="rounded-md border border-[#B71C1C] bg-[#FDECEC] px-2 py-0.5 text-[#B71C1C]">{transaction.from}</span>
                            <span className="text-[#555]">pays</span>
                            <span className="rounded-md border border-[#1B5E20] bg-[#EAF8EE] px-2 py-0.5 text-[#1B5E20]">{transaction.to}</span>
                          </div>
                          <span className="text-base font-black text-[#1976D2]">₹{Math.round(transaction.amount * 100) / 100}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            </div>
          </div>
        </div>
      </main>

      <style jsx global>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(14px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}
