import React, { useEffect } from 'react';
import { User } from 'lucide-react';

interface ComponentColors {
  backgroundColor?: string;
  textColor?: string;
  buttonColor?: string;
  buttonTextColor?: string;
}

type TestimonialsProps = {
  content?: string;
  colors?: ComponentColors;
};

export function Testimonials({ content, colors }: TestimonialsProps) {
  useEffect(() => {
    console.log("Testimonials content:", content);
  }, [content, colors]);

  const defaultTestimonials = [
    {
      name: "David Chen",
      role: "Institutional Trader",
      content: "The smart order routing and deep liquidity pools have transformed how we execute large trades. The platform's stability during high volatility is impressive."
    },
    {
      name: "Emma Rodriguez",
      role: "Crypto Fund Manager",
      content: "NexusTrade's advanced API and institutional-grade security features give us the confidence to manage substantial portfolios with peace of mind."
    },
    {
      name: "James Wilson",
      role: "Professional Trader",
      content: "The cross-chain trading capabilities and professional charting tools are game-changers. This is truly the next evolution in crypto trading."
    }
  ];

  let testimonials = [...defaultTestimonials];
  let title = "Trusted by Leading Traders";

  if (content) {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(content, "text/html");
      const titleElement = doc.querySelector("h2");
      const testimonialElements = doc.querySelectorAll(".testimonial");

      if (titleElement) title = titleElement.textContent || title;

      const parsedTestimonials = Array.from(testimonialElements).map((el, index) => {
        const nameEl = el.querySelector(".name");
        const roleEl = el.querySelector(".role");
        const contentEl = el.querySelector(".content");

        return {
          name: nameEl?.textContent || defaultTestimonials[index].name,
          role: roleEl?.textContent || defaultTestimonials[index].role,
          content: contentEl?.textContent || defaultTestimonials[index].content
        };
      });

      if (parsedTestimonials.length > 0) {
        testimonials = parsedTestimonials;
      }
    } catch (error) {
      console.error("Error parsing content:", error);
    }
  }

  return (
    <section 
      className="py-20 relative overflow-hidden"
      style={{
        backgroundColor: colors?.backgroundColor || "#0A0B0F",
      }}
    >
      {/* Background Gradient */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          background: `radial-gradient(circle at 30% 50%, ${colors?.buttonColor || "#5B21B6"}33, transparent 70%)`
        }}
      />

      <div className="container mx-auto px-6 relative">
        <h2 
          className="text-4xl font-bold text-center mb-6"
          style={{
            color: colors?.textColor || "#ffffff",
          }}
        >
          {title}
        </h2>
        <p
          className="text-xl text-center mb-16 max-w-3xl mx-auto opacity-80"
          style={{
            color: colors?.textColor || "#ffffff",
          }}
        >
          Join thousands of traders who have already transformed their trading experience
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="p-8 rounded-2xl transition-all duration-500 hover:scale-[1.02] border border-white/10 bg-white/5 backdrop-blur-sm"
            >
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center">
                  <User className="w-8 h-8 text-white/40" />
                </div>
                <div className="ml-4">
                  <h3 
                    className="font-bold text-lg"
                    style={{
                      color: colors?.textColor || "#ffffff",
                    }}
                  >
                    {testimonial.name}
                  </h3>
                  <p 
                    className="text-sm"
                    style={{
                      color: colors?.buttonColor || "#5B21B6",
                    }}
                  >
                    {testimonial.role}
                  </p>
                </div>
              </div>
              <div
                className="relative"
              >
                <p 
                  className="leading-relaxed"
                  style={{
                    color: colors?.textColor || "#ffffff",
                    opacity: 0.8
                  }}
                >
                  {testimonial.content}
                </p>
                <div 
                  className="absolute -top-4 -left-2 text-6xl opacity-10"
                  style={{
                    color: colors?.buttonColor || "#5B21B6",
                  }}
                >
                  "
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}