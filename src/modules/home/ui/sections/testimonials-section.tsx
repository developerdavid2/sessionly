import React from "react";
import { cn } from "@/lib/utils";
import { Marquee } from "@/components/ui/marquee";
import { Star } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Product Manager",
    company: "TechFlow",
    image:
      "https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=800&auto=format&fit=crop",
    content:
      "Sessionly AI has transformed how our team collaborates. The real-time insights are game-changing for our product development cycle.",
    rating: 5,
  },
  {
    id: 2,
    name: "Marcus Johnson",
    role: "Engineering Lead",
    company: "DataSync",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop",
    content:
      "The AI-powered analytics help us make data-driven decisions faster than ever. Highly recommend for any growing team.",
    rating: 5,
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Designer",
    company: "CreativeHub",
    image:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=800&auto=format&fit=crop",
    content:
      "Incredible tool for remote teams. The session management features have cut our meeting time in half while improving outcomes.",
    rating: 5,
  },
  {
    id: 4,
    name: "David Park",
    role: "CTO",
    company: "StartupLabs",
    image:
      "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?q=80&w=800&auto=format&fit=crop",
    content:
      "Finally, a platform that understands the needs of modern development teams. The integration possibilities are endless.",
    rating: 5,
  },
  {
    id: 5,
    name: "Lisa Wang",
    role: "Operations Director",
    company: "ScaleUp Inc",
    image:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=800&auto=format&fit=crop",
    content:
      "Sessionly AI streamlined our workflow and brought clarity to complex projects. It's become indispensable to our operations.",
    rating: 5,
  },
  {
    id: 6,
    name: "James Miller",
    role: "Head of Sales",
    company: "GrowthCo",
    image:
      "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=800&auto=format&fit=crop",
    content:
      "The ROI on this platform has been incredible. Our sales team is more aligned and productive than ever before.",
    rating: 5,
  },
  {
    id: 7,
    name: "Aisha Patel",
    role: "Consultant",
    company: "Advisory Partners",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop",
    content:
      "As a consultant managing multiple clients, Sessionly AI keeps everything organized and accessible. Absolute lifesaver.",
    rating: 5,
  },
  {
    id: 8,
    name: "Tom Anderson",
    role: "Founder",
    company: "BuildFast",
    image:
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=800&auto=format&fit=crop",
    content:
      "Built for founders who need to move fast. The AI insights have helped us pivot quickly and stay ahead of the market.",
    rating: 5,
  },
  {
    id: 9,
    name: "Nina Kowalski",
    role: "Team Lead",
    company: "RemoteFirst",
    image:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=800&auto=format&fit=crop",
    content:
      "Perfect for distributed teams. Everyone stays in sync without the constant back-and-forth. Game changer for remote work.",
    rating: 5,
  },
];

// Split testimonials into three rows
const firstRow = testimonials.slice(0, 4);
const secondRow = testimonials.slice(5, 9);

const TestimonialCard = ({
  name,
  role,
  company,
  image,
  content,
  rating,
}: {
  name: string;
  role: string;
  company: string;
  image: string;
  content: string;
  rating: number;
}) => {
  return (
    <figure
      className={cn(
        "relative w-96 cursor-pointer overflow-hidden rounded-2xl p-6 mx-3",
        "bg-[#1D1F1F] border border-gray-500/40",
        "hover:bg-white/[0.04] hover:border-slate-500/20 transition-all duration-300",
        "shadow-[0_8px_32px_rgba(0,0,0,0.3)]",
      )}
    >
      {/*Beam Glow*/}
      <div className="blur-[4rem] size-16 bg-slate-100 absolute -top-5 left-0 rounded-full" />
      {/* Content */}
      <div className="relative z-10">
        {/* Star Rating */}
        <div className="flex gap-1 mb-4">
          {Array.from({ length: rating }).map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-gray-500 text-gray-500" />
          ))}
        </div>

        {/* Testimonial Text */}
        <blockquote className="text-sm text-gray-300 leading-relaxed mb-6">
          &#34;{content}&#34;
        </blockquote>

        {/* User Info */}
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white/10 bg-gray-800">
            <Image
              src={image}
              alt={`${name}'s profile`}
              fill
              loading="lazy"
              className="object-cover"
            />
          </div>

          <div className="flex flex-col">
            <div className="text-sm font-semibold text-white">{name}</div>
            <div className="text-xs text-gray-400">
              {role} at {company}
            </div>
          </div>
        </div>
      </div>
    </figure>
  );
};

export const TestimonialSection = () => {
  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-32 px-3 sm:px-4 md:px-6 relative mask-x-from-70% mask-x-to-95%">
      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-6">
            Testimonials
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
              Don&#39;t take our word for it.
            </span>
          </h2>
          <p className="text-xl text-gray-400">Over 100+ people trust us.</p>
        </div>

        {/* Marquee Rows */}
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden space-y-6">
          {/* First Row */}
          <Marquee pauseOnHover className="[--duration:40s]">
            {firstRow.map((testimonial) => (
              <TestimonialCard key={testimonial.id} {...testimonial} />
            ))}
          </Marquee>

          {/* Second Row - Reverse */}
          <Marquee reverse pauseOnHover className="[--duration:35s]">
            {secondRow.map((testimonial) => (
              <TestimonialCard key={testimonial.id} {...testimonial} />
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
};
