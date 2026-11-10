import { Link, useRouterState } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import {
  Activity, AudioLines, BookOpenText, Boxes, ChartNoAxesCombined, ChevronLeft, ChevronRight,
  Clock3, Command, FileAudio2, Settings2, ShieldCheck, Sparkles, Waves,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { isDemoMode } from "@/lib/polyglot-api";

const links = [
  { to: "/", label: "Overview", icon: ChartNoAxesCombined, exact: true },
  { to: "/transcription", label: "Transcription Studio", icon: AudioLines },
  { to: "/language-analysis", label: "Language Analysis", icon: Waves },
  { to: "/context-adaptation", label: "Context Adaptation", icon: BookOpenText },
  { to: "/model-evaluation", label: "Model Evaluation", icon: Activity },
  { to: "/history", label: "Transcription History", icon: Clock3 },
  { to: "/settings", label: "Settings", icon: Settings2 },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = useRouterState({ select: (router) => router.location.pathname });
  const current = links.find((link) => link.to === pathname) ?? links[0];
  const PageIcon = current.icon;

  return (
    <div className="app-frame flex min-h-screen w-full bg-background text-foreground">
      <aside className={cn("app-sidebar flex min-h-screen shrink-0 flex-col border-r border-border", collapsed ? "w-[76px]" : "w-[264px]")}>
        <div className="flex h-[74px] items-center gap-3 border-b border-border px-5">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground"><AudioLines className="size-[18px]" /></div>
          {!collapsed && <div className="min-w-0"><div className="text-sm font-semibold tracking-[0]">POLYGLOT <span className="text-primary">ASR</span></div><div className="mt-0.5 text-[10px] font-medium tracking-[0] text-muted-foreground">RESEARCH CONSOLE · v1.4</div></div>}
        </div>
        <div className="px-3 pb-2 pt-7">{!collapsed && <p className="px-3 pb-3 text-[10px] font-semibold tracking-[0] text-muted-foreground">WORKSPACE</p>}
          <nav className="space-y-1" aria-label="Main navigation">
            {links.map(({ to, label, icon: Icon, ...options }) => {
              const active = pathname === to;
              return <Link key={to} to={to} activeOptions={"exact" in options ? { exact: true } : undefined} aria-label={label} title={collapsed ? label : undefined} className={cn("nav-item flex h-10 items-center gap-3 rounded-md px-3 text-[13px] font-medium transition-colors", active ? "nav-item-active bg-primary/10 text-primary" : "text-muted-foreground hover:bg-accent hover:text-foreground", collapsed && "justify-center px-0")}><Icon className="size-[17px] shrink-0" />{!collapsed && <span>{label}</span>}{active && !collapsed && <span className="ml-auto size-1.5 rounded-full bg-primary" />}</Link>;
            })}
          </nav>
        </div>
        {!collapsed && <div className="mx-4 mt-6 rounded-md border border-border bg-card px-3 py-3"><div className="flex items-center gap-2"><ShieldCheck className="size-4 text-success" /><span className="text-[11px] font-semibold">MODEL STATUS</span></div><div className="mt-2 flex items-center gap-2"><span className="size-1.5 rounded-full bg-warning"/><span className="text-xs text-muted-foreground">Backend not connected</span></div><div className="mt-2 text-[10px] text-muted-foreground">XLS-R 300M · MUCS 2021</div></div>}
        <div className="mt-auto p-3"><div className={cn("mb-3 flex items-center gap-2 rounded-md bg-muted/55 px-3 py-2", collapsed && "justify-center px-1")}><span className={cn("size-1.5 rounded-full", isDemoMode ? "bg-warning" : "bg-success")} />{!collapsed && <span className="text-[10px] font-semibold tracking-[0] text-muted-foreground">{isDemoMode ? "DEMO MODE" : "API CONNECTED"}</span>}</div><Button variant="ghost" size="icon" className="size-9 w-full" onClick={() => setCollapsed(!collapsed)} aria-label={collapsed ? "Expand navigation" : "Collapse navigation"}>{collapsed ? <ChevronRight /> : <><ChevronLeft className="size-4"/><span className="text-xs text-muted-foreground">Collapse navigation</span></>}</Button></div>
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-[74px] items-center justify-between border-b border-border px-5 md:px-8">
          <div className="flex items-center gap-3"><div className="flex size-8 items-center justify-center rounded-md border border-border bg-card md:hidden"><Command className="size-4 text-primary" /></div><div className="hidden items-center gap-2 text-xs text-muted-foreground md:flex"><span>Research</span><span className="text-border">/</span><PageIcon className="size-3.5"/><span className="text-foreground">{current.label}</span></div><div className="text-sm font-semibold md:hidden">{current.label}</div></div>
          <div className="flex items-center gap-3"><div className="hidden items-center gap-2 rounded-sm border border-border px-2.5 py-1.5 text-[10px] text-muted-foreground sm:flex"><FileAudio2 className="size-3.5"/><span>MUCS 2021 Subtask 2</span></div><div className="flex size-8 items-center justify-center rounded-full border border-border bg-card"><Sparkles className="size-4 text-primary"/></div></div>
        </header>
        {isDemoMode && <div className="demo-strip flex items-center justify-center gap-2 border-b border-warning/25 bg-warning/5 px-3 py-2 text-center text-[11px] text-muted-foreground"><Boxes className="size-3.5 text-warning"/><span><strong className="font-semibold text-foreground">Research demo</strong> · Evaluation examples are illustrative; speech service is not connected.</span></div>}
        <main className="mx-auto w-full max-w-[1600px] flex-1 px-5 pb-10 pt-8 md:px-8">{children}</main>
      </div>
    </div>
  );
}
