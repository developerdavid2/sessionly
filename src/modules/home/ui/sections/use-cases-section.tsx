import React from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Users,
  TrendingUp,
  Briefcase,
  Globe,
  MessageSquare,
  Calendar,
  FileText,
  BarChart3,
  Target,
  Zap,
  Shield,
  Clock,
} from "lucide-react";
import Image from "next/image";

// Product Teams Tab Content
const ProductTeamsContent = () => {
  return (
    <div className="space-y-8">
      {/* Hero Feature Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/10 border border-white/10 p-12">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnptMCAzNmMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIvPjwvZz48L3N2Zz4=')] opacity-40"></div>
        <div className="relative grid md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/20 text-cyan-400 text-sm font-medium mb-6">
              <Users className="w-4 h-4" />
              For Product Teams
            </div>
            <h3 className="text-4xl font-bold mb-4">
              Ship faster with real-time collaboration
            </h3>
            <p className="text-gray-400 text-lg mb-6">
              Coordinate across design, engineering, and stakeholders with live
              updates and instant feedback loops.
            </p>
            <div className="flex flex-wrap gap-3">
              <div className="px-4 py-2 rounded-lg bg-white/5 border border-white/10">
                <span className="text-2xl font-bold text-cyan-400">3x</span>
                <span className="text-sm text-gray-400 ml-2">
                  faster launches
                </span>
              </div>
              <div className="px-4 py-2 rounded-lg bg-white/5 border border-white/10">
                <span className="text-2xl font-bold text-cyan-400">89%</span>
                <span className="text-sm text-gray-400 ml-2">
                  less meetings
                </span>
              </div>
            </div>
          </div>
          <div className="relative h-80 rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 border border-white/10 p-6 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-transparent rounded-xl"></div>
            <div className="relative space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="h-3 bg-white/10 rounded w-3/4 mb-2"></div>
                  <div className="h-2 bg-white/5 rounded w-1/2"></div>
                </div>
              </div>
              <div className="space-y-2 pl-13">
                <div className="h-16 bg-white/5 rounded-lg border border-white/10 p-3">
                  <div className="h-2 bg-cyan-500/30 rounded w-full mb-2"></div>
                  <div className="h-2 bg-cyan-500/20 rounded w-2/3"></div>
                </div>
                <div className="h-16 bg-white/5 rounded-lg border border-white/10 p-3">
                  <div className="h-2 bg-blue-500/30 rounded w-full mb-2"></div>
                  <div className="h-2 bg-blue-500/20 rounded w-3/4"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {[
          {
            icon: Calendar,
            title: "Sprint Planning",
            desc: "Align your team on priorities with integrated roadmaps and timeline views.",
          },
          {
            icon: FileText,
            title: "Documentation Hub",
            desc: "Keep specs, PRDs, and technical docs synchronized across your entire team.",
          },
          {
            icon: Target,
            title: "Goal Tracking",
            desc: "Monitor OKRs and KPIs with real-time dashboards that update automatically.",
          },
        ].map((feature, idx) => {
          const Icon = feature.icon;
          return (
            <Card
              key={idx}
              className="bg-white/[0.02] backdrop-blur-xl border-white/10 hover:border-cyan-500/30 transition-all duration-500 p-6 group hover:shadow-[0_0_40px_rgba(0,212,255,0.15)]"
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-600/20 flex items-center justify-center mb-4 group-hover:shadow-[0_0_20px_rgba(0,212,255,0.3)] transition-all duration-300">
                <Icon className="w-6 h-6 text-cyan-400" />
              </div>
              <h4 className="text-lg font-semibold mb-2">{feature.title}</h4>
              <p className="text-gray-400 text-sm">{feature.desc}</p>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

// Sales Tab Content
const SalesContent = () => {
  return (
    <div className="space-y-8">
      {/* Split Layout */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Left: Stats Card */}
        <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-white/10 p-8">
          <div className="space-y-6">
            <div>
              <div className="text-sm text-gray-400 mb-2">DELIVERABILITY</div>
              <div className="text-6xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-4">
                98%
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-400"></div>
                    <span className="text-sm text-gray-300">Delivered</span>
                  </div>
                  <span className="text-sm font-medium">3,204</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-400"></div>
                    <span className="text-sm text-gray-300">Bounced</span>
                  </div>
                  <span className="text-sm font-medium">60</span>
                </div>
              </div>
            </div>

            <div className="h-px bg-white/10"></div>

            <div>
              <div className="text-sm text-gray-400 mb-2">ENGAGEMENT</div>
              <div className="text-6xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-4">
                41%
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                    <span className="text-sm text-gray-300">Opened</span>
                  </div>
                  <span className="text-sm font-medium">1,314</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                    <span className="text-sm text-gray-300">Clicked</span>
                  </div>
                  <span className="text-sm font-medium">542</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Right: Feature List */}
        <div className="space-y-4">
          <div>
            <h3 className="text-3xl font-bold mb-2">Close deals faster</h3>
            <p className="text-gray-400 mb-6">
              Everything you need to manage your pipeline and accelerate revenue
              growth.
            </p>
          </div>

          {[
            {
              icon: BarChart3,
              title: "Broadcast Analytics",
              desc: "Unlock powerful insights and understand exactly how your audience is interacting with your campaigns.",
            },
            {
              icon: TrendingUp,
              title: "Pipeline Visibility",
              desc: "Track every opportunity from first touch to closed won with automated stage progression.",
            },
            {
              icon: Zap,
              title: "Smart Automation",
              desc: "Automate follow-ups, reminders, and outreach sequences to never miss a deal.",
            },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <Card
                key={idx}
                className="bg-white/[0.02] border-white/10 hover:border-green-500/30 transition-all duration-300 p-5 group"
              >
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">{item.title}</h4>
                    <p className="text-sm text-gray-400">{item.desc}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// Consultants Tab Content
const ConsultantsContent = () => {
  return (
    <div className="space-y-8">
      {/* Bento Grid Layout */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Large Feature Card */}
        <Card className="md:col-span-2 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-white/10 p-8 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/5 to-transparent"></div>
          <div className="relative">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500/30 to-pink-500/30 flex items-center justify-center mb-6">
              <Briefcase className="w-7 h-7 text-purple-400" />
            </div>
            <h3 className="text-3xl font-bold mb-3">Multi-client management</h3>
            <p className="text-gray-400 mb-6 max-w-xl">
              Juggle multiple client projects with ease. Organize workspaces,
              track billable hours, and generate professional reports—all in one
              place.
            </p>

            {/* Mock Interface */}
            <div className="space-y-3">
              {[
                "Client A - Brand Strategy",
                "Client B - Web Redesign",
                "Client C - Market Research",
              ].map((client, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-4 rounded-lg bg-white/[0.03] border border-white/10 hover:border-purple-500/30 transition-all duration-300"
                >
                  <div className="w-8 h-8 rounded bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-xs font-bold">
                    {client[7]}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">{client}</div>
                    <div className="text-xs text-gray-500">Active project</div>
                  </div>
                  <div className="text-xs text-gray-400">
                    {24 + idx * 12} hrs
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Side Cards */}
        <div className="space-y-6">
          <Card className="bg-white/[0.02] border-white/10 p-6 hover:border-purple-500/30 transition-all duration-300">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center mb-4">
              <Shield className="w-5 h-5 text-purple-400" />
            </div>
            <h4 className="font-semibold mb-2">Client Portals</h4>
            <p className="text-sm text-gray-400">
              Branded workspaces for seamless collaboration with your clients.
            </p>
          </Card>

          <Card className="bg-white/[0.02] border-white/10 p-6 hover:border-purple-500/30 transition-all duration-300">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center mb-4">
              <Clock className="w-5 h-5 text-purple-400" />
            </div>
            <h4 className="font-semibold mb-2">Time Tracking</h4>
            <p className="text-sm text-gray-400">
              Automatic billable hour tracking with detailed activity logs.
            </p>
          </Card>
        </div>
      </div>

      {/* Bottom Feature Row */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-white/[0.02] border-white/10 p-6 hover:border-purple-500/30 transition-all duration-300">
          <h4 className="text-xl font-bold mb-3">Professional Reports</h4>
          <p className="text-gray-400 mb-4">
            Generate white-labeled reports and invoices that showcase your
            expertise and build trust.
          </p>
          <div className="flex items-center gap-2 text-purple-400 text-sm font-medium">
            <span>View templates</span>
            <span>→</span>
          </div>
        </Card>

        <Card className="bg-white/[0.02] border-white/10 p-6 hover:border-purple-500/30 transition-all duration-300">
          <h4 className="text-xl font-bold mb-3">Secure Client Access</h4>
          <p className="text-gray-400 mb-4">
            Give clients controlled access to their projects with granular
            permissions and audit logs.
          </p>
          <div className="flex items-center gap-2 text-purple-400 text-sm font-medium">
            <span>Learn more</span>
            <span>→</span>
          </div>
        </Card>
      </div>
    </div>
  );
};

// Remote Teams Tab Content
const RemoteTeamsContent = () => {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 text-blue-400 text-sm font-medium mb-6">
          <Globe className="w-4 h-4" />
          Work from anywhere
        </div>
        <h3 className="text-4xl md:text-5xl font-bold mb-4">
          Stay connected across time zones
        </h3>
        <p className="text-xl text-gray-400">
          Built for distributed teams who need to coordinate seamlessly without
          endless meetings.
        </p>
      </div>

      {/* Feature Cards Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            icon: MessageSquare,
            title: "Async-First",
            desc: "Reduce meeting fatigue with threaded discussions and video updates.",
            color: "from-blue-500/20 to-cyan-500/20",
            textColor: "text-blue-400",
          },
          {
            icon: Clock,
            title: "Time Zone Magic",
            desc: "Schedule across time zones with smart availability detection.",
            color: "from-purple-500/20 to-blue-500/20",
            textColor: "text-purple-400",
          },
          {
            icon: Users,
            title: "Team Presence",
            desc: "See who's online and available without constant check-ins.",
            color: "from-green-500/20 to-emerald-500/20",
            textColor: "text-green-400",
          },
          {
            icon: Zap,
            title: "Instant Sync",
            desc: "Real-time updates that keep everyone on the same page.",
            color: "from-orange-500/20 to-red-500/20",
            textColor: "text-orange-400",
          },
        ].map((feature, idx) => {
          const Icon = feature.icon;
          return (
            <Card
              key={idx}
              className="bg-white/[0.02] backdrop-blur-xl border-white/10 hover:border-blue-500/30 transition-all duration-500 p-6 group hover:shadow-[0_0_40px_rgba(59,130,246,0.15)]"
            >
              <div
                className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all duration-300`}
              >
                <Icon className={`w-6 h-6 ${feature.textColor}`} />
              </div>
              <h4 className="text-lg font-semibold mb-2">{feature.title}</h4>
              <p className="text-sm text-gray-400">{feature.desc}</p>
            </Card>
          );
        })}
      </div>

      {/* Bottom CTA Card */}
      <Card className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border-white/10 p-12 text-center">
        <h3 className="text-3xl font-bold mb-4">Trusted by remote teams at</h3>
        <div className="flex flex-wrap justify-center items-center gap-8 text-gray-400">
          {["Automattic", "GitLab", "Zapier", "Buffer", "InVision"].map(
            (company, idx) => (
              <div
                key={idx}
                className="text-lg font-semibold opacity-60 hover:opacity-100 transition-opacity"
              >
                {company}
              </div>
            ),
          )}
        </div>
      </Card>
    </div>
  );
};

// Main Component
export const UseCasesSection = () => {
  const tabs = [
    { id: "product", label: "Product Teams" },
    { id: "sales", label: "Sales" },
    { id: "consultants", label: "Consultants" },
    { id: "remote", label: "Remote Teams" },
  ] as const;

  return (
    <section className="py-32 px-4 relative">
      <div className="max-w-7xl mx-auto">
        {/* Background blur effects - adjusted for mobile */}
        <div className="blur-[8rem] sm:blur-[12rem] size-60 sm:size-80 bg-slate-50/40 absolute top-4 left-1/2 -translate-x-1/2 -z-1" />
        <div className="blur-[12rem] sm:blur-[20rem] size-40 sm:size-60 bg-slate-100/10 absolute top-4 left-1/2 -translate-x-1/2 -z-1" />
        <div className="size-10 lg:size-18 rounded-full bg-gradient-to-br from-white to-zinc-900/15 absolute top-52 right-[10%] will-change-transform" />

        <div className="pointer-events-none absolute -top-16 left-[calc(50%-480px)] -z-5 mx-auto w-[960px]">
          <Image
            src="/use-cases/bg-outlines.svg"
            width={960}
            height={380}
            alt="outline"
            className="relative z-2"
            loading="lazy"
          />
          <Image
            src="/use-cases/bg-outlines-fill.png"
            width={960}
            height={380}
            alt="outline"
            className="absolute inset-0 opacity-5 mix-blend-soft-light hue-rotate-60"
            loading="lazy"
          />
        </div>
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
            Built for how you work
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            No matter your role or team structure, we&#39;ve got you covered.
          </p>
        </div>

        <Tabs defaultValue="product" className="w-full">
          <TabsList className="flex flex-wrap justify-center gap-4 mb-16 bg-transparent h-auto mx-auto">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="px-6 py-3 rounded-xl font-medium transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-cyan-800 data-[state=active]:text-white data-[state=active]:shadow-[0_0_30px_rgba(0,212,255,0.3)] bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-cyan-900/10 data-[state=active]:border-none"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="product" className="mt-0">
            <ProductTeamsContent />
          </TabsContent>

          <TabsContent value="sales" className="mt-0">
            <SalesContent />
          </TabsContent>

          <TabsContent value="consultants" className="mt-0">
            <ConsultantsContent />
          </TabsContent>

          <TabsContent value="remote" className="mt-0">
            <RemoteTeamsContent />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};
