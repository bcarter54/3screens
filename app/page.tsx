"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  Check,
  ChevronRight,
  Clock3,
  GraduationCap,
  LayoutDashboard,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Course = {
  id: string;
  code: string;
  title: string;
  instructor: string;
  meeting: string;
  color: string;
  tint: string;
};

type Assignment = {
  id: number;
  title: string;
  courseId: string;
  day: string;
  date: string;
  time: string;
  dueLabel: string;
  platform: "Canvas" | "Learning Suite";
  completed: boolean;
  urgent?: boolean;
  overdue?: boolean;
};

type ModelContext = {
  registerTool: (
    tool: {
      name: string;
      title: string;
      description: string;
      inputSchema: Record<string, unknown>;
      annotations: { readOnlyHint: boolean; untrustedContentHint: boolean };
      execute: (input: unknown) => unknown;
    },
    options?: { signal?: AbortSignal },
  ) => void | Promise<void>;
};

declare global {
  interface Document {
    readonly modelContext?: ModelContext;
  }
}

const courses: Course[] = [
  {
    id: "is455",
    code: "IS 455",
    title: "Cybersecurity",
    instructor: "Prof. Anderson",
    meeting: "MWF · 10:00 AM",
    color: "#4f5bd5",
    tint: "#eef0ff",
  },
  {
    id: "is403",
    code: "IS 403",
    title: "Data Analytics",
    instructor: "Prof. Simmons",
    meeting: "TTh · 11:00 AM",
    color: "#168a72",
    tint: "#e9f8f3",
  },
  {
    id: "mcom320",
    code: "M COM 320",
    title: "Business Communication",
    instructor: "Prof. Hart",
    meeting: "TTh · 1:30 PM",
    color: "#c15a39",
    tint: "#fff0e9",
  },
  {
    id: "org416",
    code: "ORG 416",
    title: "Organizational Effectiveness",
    instructor: "Prof. Lee",
    meeting: "MW · 3:00 PM",
    color: "#8a54bb",
    tint: "#f6edff",
  },
];

const initialAssignments: Assignment[] = [
  {
    id: 1,
    title: "Threat Modeling Lab",
    courseId: "is455",
    day: "Friday",
    date: "Sep 11",
    time: "11:59 PM",
    dueLabel: "Due today",
    platform: "Canvas",
    completed: false,
    urgent: true,
  },
  {
    id: 2,
    title: "Packet Analysis Worksheet",
    courseId: "is455",
    day: "Friday",
    date: "Sep 11",
    time: "9:00 AM",
    dueLabel: "Overdue by 5 hours",
    platform: "Learning Suite",
    completed: false,
    overdue: true,
  },
  {
    id: 3,
    title: "Orchestration Knowledge Check",
    courseId: "is403",
    day: "Saturday",
    date: "Sep 12",
    time: "11:59 PM",
    dueLabel: "Due tomorrow",
    platform: "Canvas",
    completed: false,
  },
  {
    id: 4,
    title: "LinkedIn Profile Reflection",
    courseId: "mcom320",
    day: "Sunday",
    date: "Sep 13",
    time: "8:00 PM",
    dueLabel: "Due Sunday",
    platform: "Learning Suite",
    completed: false,
  },
  {
    id: 5,
    title: "Partner Interview Notes",
    courseId: "org416",
    day: "Monday",
    date: "Sep 14",
    time: "11:59 PM",
    dueLabel: "Due Monday",
    platform: "Canvas",
    completed: false,
  },
  {
    id: 6,
    title: "Data Pipeline Exercise",
    courseId: "is403",
    day: "Tuesday",
    date: "Sep 15",
    time: "5:00 PM",
    dueLabel: "Due Tuesday",
    platform: "Canvas",
    completed: false,
  },
  {
    id: 7,
    title: "Executive Summary Draft",
    courseId: "mcom320",
    day: "Tuesday",
    date: "Sep 15",
    time: "11:59 PM",
    dueLabel: "Due Tuesday",
    platform: "Learning Suite",
    completed: true,
  },
  {
    id: 8,
    title: "Team Motivation Reading",
    courseId: "org416",
    day: "Friday",
    date: "Sep 11",
    time: "Before class",
    dueLabel: "Completed",
    platform: "Canvas",
    completed: true,
  },
];

const agendaDays = [
  { name: "Friday", short: "FRI", number: "11", label: "Today" },
  { name: "Saturday", short: "SAT", number: "12", label: "Tomorrow" },
  { name: "Sunday", short: "SUN", number: "13", label: "" },
  { name: "Monday", short: "MON", number: "14", label: "" },
  { name: "Tuesday", short: "TUE", number: "15", label: "" },
];

const getCourse = (courseId: string) =>
  courses.find((course) => course.id === courseId) ?? courses[0];

function AssignmentRow({
  assignment,
  onToggle,
}: {
  assignment: Assignment;
  onToggle: (id: number, value: boolean) => void;
}) {
  const course = getCourse(assignment.courseId);

  return (
    <div
      className={`group flex items-center gap-4 rounded-2xl border bg-white p-4 transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(35,42,70,0.08)] ${
        assignment.overdue && !assignment.completed ? "border-[#f4c5b8]" : "border-[#e6e8f0]"
      }`}
    >
      <Checkbox
        checked={assignment.completed}
        onCheckedChange={(checked) => onToggle(assignment.id, checked === true)}
        aria-label={`Mark ${assignment.title} ${assignment.completed ? "incomplete" : "complete"}`}
        className="size-5 rounded-md border-[#b9bfce] data-[state=checked]:border-[#168a72] data-[state=checked]:bg-[#168a72]"
      />
      <div
        aria-hidden="true"
        className="h-10 w-1 shrink-0 rounded-full"
        style={{ backgroundColor: course.color }}
      />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <p
            className={`truncate font-semibold text-[#222842] ${
              assignment.completed ? "text-[#858a9b] line-through" : ""
            }`}
          >
            {assignment.title}
          </p>
          {assignment.overdue && !assignment.completed ? (
            <span className="rounded-full bg-[#fff0eb] px-2 py-0.5 text-[0.75rem] font-bold text-[#b74627]">
              Overdue
            </span>
          ) : null}
        </div>
        <p className="mt-1 text-sm text-[#73798c]">
          {course.code} · {assignment.platform}
        </p>
      </div>
      <div className="shrink-0 text-right">
        <p className="font-semibold text-[#30364e]">{assignment.time}</p>
        <p
          className={`mt-1 text-sm ${
            assignment.overdue && !assignment.completed ? "font-medium text-[#b74627]" : "text-[#7a8091]"
          }`}
        >
          {assignment.dueLabel}
        </p>
      </div>
    </div>
  );
}

export default function Home() {
  const [assignments, setAssignments] = useState(initialAssignments);
  const [selectedCourse, setSelectedCourse] = useState(courses[0].id);
  const [activeView, setActiveView] = useState("dashboard");

  const incomplete = assignments.filter((assignment) => !assignment.completed);
  const completedCount = assignments.filter((assignment) => assignment.completed).length;
  const selected = getCourse(selectedCourse);
  const selectedAssignments = assignments.filter(
    (assignment) => assignment.courseId === selectedCourse,
  );

  const toggleAssignment = (id: number, value: boolean) => {
    setAssignments((current) =>
      current.map((assignment) =>
        assignment.id === id
          ? {
              ...assignment,
              completed: value,
              dueLabel: value
                ? "Completed"
                : initialAssignments.find((item) => item.id === id)?.dueLabel ?? assignment.dueLabel,
            }
          : assignment,
      ),
    );
  };

  useEffect(() => {
    const context = document.modelContext;
    if (!context?.registerTool) return;

    const lifecycle = new AbortController();
    const tool = {
      name: "set_assignment_completion",
      title: "Update assignment completion",
      description: "Mark a CourseFlow assignment complete or incomplete and update every visible view.",
      inputSchema: {
        type: "object",
        properties: {
          assignmentId: { type: "number", description: "The numeric CourseFlow assignment ID." },
          completed: { type: "boolean", description: "The assignment's new completion state." },
        },
        required: ["assignmentId", "completed"],
        additionalProperties: false,
      },
      annotations: { readOnlyHint: false, untrustedContentHint: false },
      execute(input: unknown) {
        const value = input as { assignmentId?: unknown; completed?: unknown };
        const assignment = initialAssignments.find((item) => item.id === value.assignmentId);
        if (!assignment || typeof value.completed !== "boolean") {
          throw new Error("Provide a valid assignmentId and completed boolean.");
        }
        toggleAssignment(assignment.id, value.completed);
        return { assignmentId: assignment.id, title: assignment.title, completed: value.completed };
      },
    };

    try {
      void Promise.resolve(context.registerTool(tool, { signal: lifecycle.signal })).catch(() => undefined);
    } catch {
      // WebMCP support is optional; the visible interface remains fully functional.
    }

    return () => lifecycle.abort();
  }, []);

  const progress = useMemo(
    () => Math.round((completedCount / assignments.length) * 100),
    [completedCount, assignments.length],
  );

  return (
    <main className="min-h-screen bg-[#f6f7fb] text-[#1f2438]">
      <Tabs value={activeView} onValueChange={setActiveView} className="min-h-screen gap-0">
        <header className="sticky top-0 z-30 border-b border-[#e2e5ee] bg-white/95 backdrop-blur-xl">
          <div className="mx-auto flex h-[76px] max-w-[1480px] items-center justify-between gap-6 px-6 lg:px-10">
            <div className="flex shrink-0 items-center gap-3">
              <div className="grid size-10 place-items-center rounded-[14px] bg-[#4f5bd5] text-white shadow-[0_8px_20px_rgba(79,91,213,0.28)]">
                <GraduationCap className="size-5" strokeWidth={2.3} />
              </div>
              <div>
                <p className="text-[1.05rem] font-bold tracking-[-0.02em] text-[#20263d]">CourseFlow</p>
                <p className="text-[0.75rem] font-medium text-[#858a9b]">Fall semester</p>
              </div>
            </div>

            <TabsList
              variant="line"
              aria-label="Primary navigation"
              className="h-12 gap-1 overflow-x-auto scrollbar-none rounded-none p-0 max-md:absolute max-md:left-0 max-md:right-0 max-md:top-[75px] max-md:h-[58px] max-md:justify-start max-md:border-b max-md:border-[#e2e5ee] max-md:bg-white max-md:px-5"
            >
              <TabsTrigger value="dashboard" className="h-full rounded-none px-4 text-[0.9rem] font-semibold data-[state=active]:text-[#4f5bd5] after:bg-[#4f5bd5]">
                <LayoutDashboard /> Dashboard
              </TabsTrigger>
              <TabsTrigger value="classes" className="h-full rounded-none px-4 text-[0.9rem] font-semibold data-[state=active]:text-[#4f5bd5] after:bg-[#4f5bd5]">
                <BookOpen /> Classes
              </TabsTrigger>
              <TabsTrigger value="agenda" className="h-full rounded-none px-4 text-[0.9rem] font-semibold data-[state=active]:text-[#4f5bd5] after:bg-[#4f5bd5]">
                <CalendarDays /> Weekly Agenda
              </TabsTrigger>
            </TabsList>

            <div className="flex shrink-0 items-center gap-3">
              <div className="hidden text-right sm:block">
                <p className="text-sm font-semibold text-[#30364e]">Bryce Carter</p>
                <p className="text-[0.75rem] text-[#8b90a0]">4 active classes</p>
              </div>
              <div className="grid size-10 place-items-center rounded-full bg-[#e9ebff] text-sm font-bold text-[#4f5bd5]">BC</div>
            </div>
          </div>
        </header>

        <div className="mx-auto w-full max-w-[1480px] px-6 py-9 max-md:pt-[90px] lg:px-10 lg:py-11">
          <TabsContent value="dashboard" className="m-0">
            <section aria-labelledby="dashboard-heading">
              <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
                <div>
<p className="mb-2 text-sm font-bold uppercase tracking-[0.12em] text-[#737a93]">
  Good afternoon, Bryce · Friday, September 11
</p>

<h1
  id="dashboard-heading"
  className="text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.05] tracking-[-0.045em] text-[#20263d]"
>
  Your coursework, in priority order.
</h1>

<p className="mt-3 text-[1.05rem] text-[#71778a]">
  Canvas and Learning Suite assignments, organized in one place. You have{" "}
  {incomplete.length} open assignments; two need attention today.
</p>
                </div>
                <div className="flex items-center gap-3 rounded-2xl border border-[#e3e5ed] bg-white px-4 py-3 shadow-[0_8px_24px_rgba(31,36,56,0.04)]">
                  <div className="grid size-10 place-items-center rounded-xl bg-[#eaf8f3] text-[#168a72]"><Check className="size-5" strokeWidth={2.5} /></div>
                  <div>
                    <p className="text-sm font-bold text-[#30364e]">{progress}% complete</p>
                    <p className="text-[0.8rem] text-[#858a9b]">This week’s coursework</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-[minmax(0,1.35fr)_minmax(340px,0.85fr)] gap-6 max-lg:grid-cols-1">
                <article className="relative min-h-[310px] overflow-hidden rounded-[28px] bg-[#2f376c] p-7 text-white shadow-[0_24px_60px_rgba(47,55,108,0.18)] sm:p-9">
                  <div aria-hidden="true" className="absolute -right-16 -top-24 size-72 rounded-full bg-[#6571ef] opacity-35 blur-2xl" />
                  <div aria-hidden="true" className="absolute -bottom-24 right-32 size-60 rounded-full bg-[#1ec39b] opacity-15 blur-2xl" />
                  <div className="relative flex h-full flex-col">
                    <div className="flex items-center justify-between gap-4">
                      <span className="inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-1.5 text-sm font-semibold"><Sparkles className="size-4 text-[#d8ddff]" /> Focus next</span>
                      <span className="rounded-full border border-white/15 bg-white/8 px-3 py-1.5 text-sm font-medium text-white/80">About 90 min</span>
                    </div>
                    <div className="my-auto py-8">
                      <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-[#d8ddff]"><span className="size-2 rounded-full bg-[#ffb37f]" /> IS 455 · Cybersecurity</div>
                      <h2 className="max-w-2xl text-[clamp(1.8rem,4vw,3.2rem)] font-bold leading-[1.08] tracking-[-0.04em]">Threat Modeling Lab</h2>
                      <p className="mt-4 flex items-center gap-2 text-base text-white/75"><Clock3 className="size-4" /> Due tonight at 11:59 PM</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                      <Button
                        onClick={() => toggleAssignment(1, true)}
                        className="h-11 rounded-xl bg-white px-5 font-bold text-[#30386f] hover:bg-[#f0f2ff]"
                        disabled={assignments.find((assignment) => assignment.id === 1)?.completed}
                      >
                        <Check /> {assignments.find((assignment) => assignment.id === 1)?.completed ? "Completed" : "Mark complete"}
                      </Button>
                      <Button variant="ghost" className="h-11 rounded-xl px-5 font-bold text-white hover:bg-white/10 hover:text-white" onClick={() => setActiveView("classes")}>
                        View in class <ArrowRight />
                      </Button>
                    </div>
                  </div>
                </article>

                <article className="rounded-[28px] border border-[#e3e5ed] bg-white p-6 shadow-[0_18px_45px_rgba(31,36,56,0.06)] sm:p-7">
                  <div className="mb-6 flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-bold uppercase tracking-[0.1em] text-[#7b8195]">Week at a glance</p>
                      <h2 className="mt-1 text-2xl font-bold tracking-[-0.025em] text-[#252b43]">Sep 11–15</h2>
                    </div>
                    <CalendarDays className="size-5 text-[#4f5bd5]" />
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    {agendaDays.map((day, index) => {
                      const count = assignments.filter((assignment) => assignment.day === day.name && !assignment.completed).length;
                      return (
                        <button
                          key={day.name}
                          type="button"
                          onClick={() => setActiveView("agenda")}
                          className={`rounded-2xl border px-2 py-3 text-center transition hover:-translate-y-0.5 ${index === 0 ? "border-[#4f5bd5] bg-[#eef0ff]" : "border-[#eceef4] bg-[#fafbfc]"}`}
                          aria-label={`View ${day.name}'s agenda, ${count} open assignments`}
                        >
                          <span className="block text-[0.7rem] font-bold tracking-[0.08em] text-[#858b9c]">{day.short}</span>
                          <span className="mt-1 block text-xl font-bold text-[#29304a]">{day.number}</span>
                          <span className={`mx-auto mt-3 block size-2 rounded-full ${count ? "bg-[#4f5bd5]" : "bg-[#dce0ea]"}`} />
                        </button>
                      );
                    })}
                  </div>
                  <div className="mt-6 rounded-2xl bg-[#f6f7fb] p-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-semibold text-[#646a7d]">Weekly progress</span>
                      <span className="font-bold text-[#30364e]">{completedCount} of {assignments.length}</span>
                    </div>
                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#e2e5ef]"><div className="h-full rounded-full bg-[#168a72] transition-all duration-500" style={{ width: `${progress}%` }} /></div>
                  </div>
                </article>
              </div>

              <div className="mt-7 grid grid-cols-[minmax(0,1.45fr)_minmax(300px,0.55fr)] gap-6 max-lg:grid-cols-1">
                <section aria-labelledby="next-up-heading" className="rounded-[26px] border border-[#e3e5ed] bg-white p-6 shadow-[0_16px_38px_rgba(31,36,56,0.045)] sm:p-7">
                  <div className="mb-5 flex items-center justify-between gap-4">
                    <div><h2 id="next-up-heading" className="text-xl font-bold tracking-[-0.02em] text-[#252b43]">Next up</h2><p className="mt-1 text-sm text-[#7a8091]">Ordered by urgency</p></div>
                    <Button variant="ghost" onClick={() => setActiveView("agenda")} className="text-[#4f5bd5] hover:bg-[#eef0ff] hover:text-[#3f49b6]">Full agenda <ChevronRight /></Button>
                  </div>
                  <div className="space-y-3">
                    {[2, 1, 3, 4].map((id) => {
                      const assignment = assignments.find((item) => item.id === id);
                      return assignment ? <AssignmentRow key={id} assignment={assignment} onToggle={toggleAssignment} /> : null;
                    })}
                  </div>
                </section>

                <aside className="rounded-[26px] border border-[#e3e5ed] bg-white p-6 shadow-[0_16px_38px_rgba(31,36,56,0.045)] sm:p-7">
                  <div className="mb-6"><h2 className="text-xl font-bold tracking-[-0.02em] text-[#252b43]">Course pulse</h2><p className="mt-1 text-sm text-[#7a8091]">Open work by class</p></div>
                  <div className="space-y-5">
                    {courses.map((course) => {
                      const open = assignments.filter((assignment) => assignment.courseId === course.id && !assignment.completed).length;
                      return (
                        <button
                          type="button"
                          key={course.id}
                          onClick={() => { setSelectedCourse(course.id); setActiveView("classes"); }}
                          className="flex w-full items-center gap-3 rounded-xl text-left outline-none transition hover:bg-[#f7f8fc] focus-visible:ring-2 focus-visible:ring-[#4f5bd5]"
                        >
                          <span className="size-3 shrink-0 rounded-full" style={{ backgroundColor: course.color }} />
                          <span className="min-w-0 flex-1"><span className="block truncate font-semibold text-[#30364e]">{course.code}</span><span className="block truncate text-sm text-[#858a9b]">{course.title}</span></span>
                          <span className="grid size-8 place-items-center rounded-lg bg-[#f2f3f7] text-sm font-bold text-[#555c72]">{open}</span>
                        </button>
                      );
                    })}
                  </div>
                </aside>
              </div>
            </section>
          </TabsContent>

          <TabsContent value="classes" className="m-0">
            <section aria-labelledby="classes-heading">
              <div className="mb-8">
                <p className="mb-2 text-sm font-bold uppercase tracking-[0.12em] text-[#737a93]">Coursework by class</p>
                <h1 id="classes-heading" className="text-[clamp(2rem,4vw,3.25rem)] font-bold leading-tight tracking-[-0.045em] text-[#20263d]">Your classes</h1>
                <p className="mt-3 text-[1.05rem] text-[#71778a]">See what is done, what is next, and where each task belongs.</p>
              </div>

              <div className="grid grid-cols-4 gap-4 max-xl:grid-cols-2 max-sm:grid-cols-1">
                {courses.map((course) => {
                  const courseAssignments = assignments.filter((item) => item.courseId === course.id);
                  const courseComplete = courseAssignments.filter((item) => item.completed).length;
                  const percent = Math.round((courseComplete / courseAssignments.length) * 100);
                  const isSelected = selectedCourse === course.id;
                  return (
                    <button
                      type="button"
                      key={course.id}
                      onClick={() => setSelectedCourse(course.id)}
                      className={`relative overflow-hidden rounded-[24px] border bg-white p-5 text-left transition-all hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(31,36,56,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4f5bd5] ${isSelected ? "border-[#4f5bd5] shadow-[0_16px_36px_rgba(79,91,213,0.11)]" : "border-[#e3e5ed]"}`}
                    >
                      <span className="absolute inset-x-0 top-0 h-1.5" style={{ backgroundColor: course.color }} />
                      <span className="mb-5 mt-1 flex items-start justify-between gap-3">
                        <span className="grid size-11 place-items-center rounded-2xl" style={{ backgroundColor: course.tint, color: course.color }}><BookOpen className="size-5" /></span>
                        {isSelected ? <span className="rounded-full bg-[#eef0ff] px-2.5 py-1 text-[0.75rem] font-bold text-[#4f5bd5]">Selected</span> : null}
                      </span>
                      <span className="block text-sm font-bold" style={{ color: course.color }}>{course.code}</span>
                      <span className="mt-1 block min-h-12 text-lg font-bold leading-snug text-[#2b3149]">{course.title}</span>
                      <span className="mt-5 flex items-center justify-between text-sm text-[#787e90]"><span>{courseAssignments.length - courseComplete} open</span><span>{percent}%</span></span>
                      <span className="mt-2 block h-1.5 overflow-hidden rounded-full bg-[#eceef4]"><span className="block h-full rounded-full transition-all" style={{ width: `${percent}%`, backgroundColor: course.color }} /></span>
                    </button>
                  );
                })}
              </div>

              <article className="mt-7 overflow-hidden rounded-[28px] border border-[#e3e5ed] bg-white shadow-[0_18px_45px_rgba(31,36,56,0.055)]">
                <div className="flex flex-wrap items-center justify-between gap-5 border-b border-[#e8eaf1] px-6 py-6 sm:px-8">
                  <div className="flex items-center gap-4">
                    <div className="grid size-12 place-items-center rounded-2xl" style={{ backgroundColor: selected.tint, color: selected.color }}><BookOpen className="size-6" /></div>
                    <div><p className="text-sm font-bold" style={{ color: selected.color }}>{selected.code}</p><h2 className="text-xl font-bold tracking-[-0.02em] text-[#252b43]">{selected.title}</h2></div>
                  </div>
                  <div className="flex flex-wrap gap-x-7 gap-y-2 text-sm text-[#72798b]"><span>{selected.instructor}</span><span>{selected.meeting}</span></div>
                </div>
                <div className="p-6 sm:p-8">
                  <div className="mb-5 flex items-center justify-between"><h3 className="font-bold text-[#30364e]">Assignments</h3><span className="text-sm text-[#7f8596]">{selectedAssignments.filter((item) => item.completed).length} of {selectedAssignments.length} complete</span></div>
                  <div className="space-y-3">{selectedAssignments.map((assignment) => <AssignmentRow key={assignment.id} assignment={assignment} onToggle={toggleAssignment} />)}</div>
                </div>
              </article>
            </section>
          </TabsContent>

          <TabsContent value="agenda" className="m-0">
            <section aria-labelledby="agenda-heading">
              <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
                <div>
                  <p className="mb-2 text-sm font-bold uppercase tracking-[0.12em] text-[#737a93]">September 11–15</p>
                  <h1 id="agenda-heading" className="text-[clamp(2rem,4vw,3.25rem)] font-bold leading-tight tracking-[-0.045em] text-[#20263d]">Weekly agenda</h1>
                  <p className="mt-3 text-[1.05rem] text-[#71778a]">{incomplete.length} open assignments across {courses.length} classes.</p>
                </div>
                <div className="flex gap-2 text-sm"><span className="rounded-full bg-[#fff0eb] px-3 py-1.5 font-semibold text-[#b74627]">1 overdue</span><span className="rounded-full bg-[#eef0ff] px-3 py-1.5 font-semibold text-[#4f5bd5]">2 due today</span></div>
              </div>

              <div className="grid grid-cols-5 gap-4 max-xl:grid-cols-3 max-md:grid-cols-1">
                {agendaDays.map((day, index) => {
                  const dayAssignments = assignments.filter((assignment) => assignment.day === day.name);
                  const openCount = dayAssignments.filter((assignment) => !assignment.completed).length;
                  return (
                    <article key={day.name} className={`min-h-[420px] rounded-[24px] border p-4 ${index === 0 ? "border-[#cdd2ff] bg-[#f2f3ff]" : "border-[#e3e5ed] bg-white"}`}>
                      <div className="mb-5 flex items-center justify-between px-1 pt-1">
                        <div><div className="flex items-center gap-2"><span className="text-sm font-bold uppercase tracking-[0.08em] text-[#737a8d]">{day.short}</span>{day.label ? <span className="rounded-full bg-[#4f5bd5] px-2 py-0.5 text-[0.7rem] font-bold text-white">{day.label}</span> : null}</div><p className="mt-1 text-3xl font-bold tracking-[-0.04em] text-[#252b43]">{day.number}</p></div>
                        <span className="grid size-9 place-items-center rounded-full bg-white text-sm font-bold text-[#596078] shadow-sm">{openCount}</span>
                      </div>
                      <div className="space-y-3">
                        {dayAssignments.length ? dayAssignments.map((assignment) => {
                          const course = getCourse(assignment.courseId);
                          return (
                            <div key={assignment.id} className={`rounded-2xl border bg-white p-4 shadow-[0_7px_20px_rgba(31,36,56,0.04)] ${assignment.overdue && !assignment.completed ? "border-[#f0baa9]" : "border-[#e6e8f0]"}`}>
                              <div className="mb-3 flex items-start justify-between gap-3">
                                <span className="rounded-full px-2 py-1 text-[0.72rem] font-bold" style={{ color: course.color, backgroundColor: course.tint }}>{course.code}</span>
                                <Checkbox checked={assignment.completed} onCheckedChange={(checked) => toggleAssignment(assignment.id, checked === true)} aria-label={`Mark ${assignment.title} ${assignment.completed ? "incomplete" : "complete"}`} className="size-5 rounded-md border-[#b9bfce] data-[state=checked]:border-[#168a72] data-[state=checked]:bg-[#168a72]" />
                              </div>
                              <h2 className={`font-bold leading-snug text-[#2d334b] ${assignment.completed ? "text-[#8b90a0] line-through" : ""}`}>{assignment.title}</h2>
                              <div className="mt-4 border-t border-[#eff0f4] pt-3"><p className={`text-sm font-semibold ${assignment.overdue && !assignment.completed ? "text-[#b74627]" : "text-[#60677b]"}`}>{assignment.time}</p><p className="mt-1 text-[0.78rem] text-[#898e9e]">{assignment.platform}</p></div>
                            </div>
                          );
                        }) : <div className="rounded-2xl border border-dashed border-[#dfe2eb] px-4 py-8 text-center text-sm text-[#9297a7]">Nothing due</div>}
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          </TabsContent>
        </div>
      </Tabs>
    </main>
  );
}
