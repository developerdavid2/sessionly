import { Card } from "@/components/ui/card";
import { Sparkles, Mic, Check } from "lucide-react";

export function TimelineSection() {
  return (
    <section className="py-32 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
            Three steps to better meetings
          </h2>
        </div>

        <div className="relative">
          {/* Glowing connection line */}
          <div className="absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-[#5dd5ed]/20 via-[#4fc3f7]/40 to-[#5dd5ed]/20 hidden md:block" />
          <div className="absolute top-24 left-0 w-1/3 h-0.5 bg-gradient-to-r from-[#5dd5ed] to-[#4fc3f7] hidden md:block animate-pulse" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-8">
                <div className="w-48 h-48 rounded-full bg-gradient-to-br from-[#5dd5ed]/20 to-[#4fc3f7]/20 flex items-center justify-center border border-[#5dd5ed]/30 shadow-[0_0_60px_rgba(93,213,237,0.4)]">
                  <div className="w-40 h-40 rounded-full bg-gradient-to-br from-[#5dd5ed]/30 to-[#4fc3f7]/30 flex items-center justify-center">
                    <span className="text-6xl font-bold bg-gradient-to-br from-[#5dd5ed] to-[#4fc3f7] bg-clip-text text-transparent">
                      1
                    </span>
                  </div>
                </div>
                <div className="absolute inset-0 rounded-full bg-[#5dd5ed]/20 blur-2xl -z-10" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Start a session</h3>
              <p className="text-gray-400 mb-6">
                Create a meeting room in seconds. Share the link or invite AI to
                join.
              </p>
              <Card className="w-full glass-card p-6">
                <div className="space-y-3">
                  <div className="h-10 bg-gradient-to-r from-[#5dd5ed]/20 to-[#4fc3f7]/20 rounded-lg border border-[#5dd5ed]/30 flex items-center px-4">
                    <div className="w-2 h-2 rounded-full bg-[#5dd5ed] animate-pulse mr-3" />
                    <span className="text-sm text-gray-300">New Session</span>
                  </div>
                  <div className="h-8 bg-white/5 rounded w-3/4" />
                  <div className="h-8 bg-white/5 rounded w-1/2" />
                </div>
              </Card>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-8">
                <div className="w-48 h-48 rounded-full bg-gradient-to-br from-[#4fc3f7]/20 to-[#5dd5ed]/20 flex items-center justify-center border border-[#4fc3f7]/30 shadow-[0_0_60px_rgba(79,195,247,0.4)]">
                  <div className="w-40 h-40 rounded-full bg-gradient-to-br from-[#4fc3f7]/30 to-[#5dd5ed]/30 flex items-center justify-center">
                    <span className="text-6xl font-bold bg-gradient-to-br from-[#4fc3f7] to-[#5dd5ed] bg-clip-text text-transparent">
                      2
                    </span>
                  </div>
                </div>
                <div className="absolute inset-0 rounded-full bg-[#4fc3f7]/20 blur-2xl -z-10" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Talk & collaborate</h3>
              <p className="text-gray-400 mb-6">
                AI listens, transcribes, and captures key moments in real-time.
              </p>
              <Card className="w-full glass-card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#4fc3f7] to-[#5dd5ed] flex items-center justify-center">
                    <Mic className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 flex gap-1">
                    <div
                      className="w-1 h-8 bg-[#4fc3f7] rounded animate-pulse"
                      style={{ animationDelay: "0ms" }}
                    />
                    <div
                      className="w-1 h-6 bg-[#5dd5ed] rounded animate-pulse"
                      style={{ animationDelay: "100ms" }}
                    />
                    <div
                      className="w-1 h-10 bg-[#4fc3f7] rounded animate-pulse"
                      style={{ animationDelay: "200ms" }}
                    />
                    <div
                      className="w-1 h-7 bg-[#5dd5ed] rounded animate-pulse"
                      style={{ animationDelay: "300ms" }}
                    />
                    <div
                      className="w-1 h-9 bg-[#4fc3f7] rounded animate-pulse"
                      style={{ animationDelay: "400ms" }}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-2 bg-white/10 rounded w-full" />
                  <div className="h-2 bg-white/5 rounded w-4/5" />
                </div>
              </Card>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-8">
                <div className="w-48 h-48 rounded-full bg-gradient-to-br from-[#5dd5ed]/20 to-[#4fc3f7]/20 flex items-center justify-center border border-[#5dd5ed]/30 shadow-[0_0_60px_rgba(93,213,237,0.4)]">
                  <div className="w-40 h-40 rounded-full bg-gradient-to-br from-[#5dd5ed]/30 to-[#4fc3f7]/30 flex items-center justify-center">
                    <span className="text-6xl font-bold bg-gradient-to-br from-[#5dd5ed] to-[#4fc3f7] bg-clip-text text-transparent">
                      3
                    </span>
                  </div>
                </div>
                <div className="absolute inset-0 rounded-full bg-[#5dd5ed]/20 blur-2xl -z-10" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Get instant insights</h3>
              <p className="text-gray-400 mb-6">
                AI generates summaries, action items, and searchable
                transcripts.
              </p>
              <Card className="w-full glass-card p-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Sparkles className="w-4 h-4 text-[#5dd5ed]" />
                    <span className="text-[#5dd5ed] font-medium">
                      AI Summary
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 bg-[#5dd5ed]/20 rounded w-full" />
                    <div className="h-2 bg-[#5dd5ed]/10 rounded w-5/6" />
                    <div className="h-2 bg-[#5dd5ed]/10 rounded w-4/5" />
                  </div>
                  <div className="pt-2 border-t border-white/5">
                    <div className="flex items-center gap-2 text-xs text-[#5dd5ed]">
                      <Check className="w-3 h-3" />
                      <span>3 action items</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
