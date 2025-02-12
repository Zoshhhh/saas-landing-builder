import React, { useEffect } from 'react';
import { Shield, Zap, BarChart3, Wallet, Globe, Clock, Cpu, Lock, ArrowRight } from 'lucide-react';

interface ComponentColors {
  backgroundColor?: string;
  textColor?: string;
  buttonColor?: string;
  buttonTextColor?: string;
}

type FeaturesProps = {
  content?: string;
  colors?: ComponentColors;
};

export function Features({ content, colors }: FeaturesProps) {
  useEffect(() => {
    console.log("Features content:", content);
  }, [content, colors]);

  const defaultFeatures = [
    {
      icon: BarChart3,
      title: "Pro Trading Suite",
      description: "Advanced order types, real-time market data, and professional charting tools in one powerful platform",
      details: [
        "Customizable trading interface",
        "Advanced order types and algorithms",
        "Real-time market depth analysis",
        "Multi-chart layouts"
      ]
    },
    {
      icon: Zap,
      title: "Lightning-Fast Execution",
      description: "Industry-leading trade execution with sub-millisecond latency and 99.99% uptime",
      details: [
        "Sub-millisecond order execution",
        "High-frequency trading support",
        "Smart order routing",
        "Deep liquidity pools"
      ]
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Military-grade encryption and multi-layer security protocols to protect your assets",
      details: [
        "Multi-signature wallets",
        "Hardware security modules",
        "24/7 security monitoring",
        "Regular security audits"
      ]
    }
  ];

  let features = [...defaultFeatures];
  let title = "Professional Trading Tools";
  let subtitle = "Experience the most advanced crypto trading platform built for both professional traders and institutions";

  if (content) {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(content, "text/html");
      const titleElement = doc.querySelector("h2");
      const subtitleElement = doc.querySelector("p");
      const featureElements = doc.querySelectorAll(".feature");

      if (titleElement) title = titleElement.textContent || title;
      if (subtitleElement) subtitle = subtitleElement.textContent || subtitle;

      const parsedFeatures = Array.from(featureElements).map((el, index) => {
        const titleEl = el.querySelector("h3");
        const descEl = el.querySelector("p");
        return {
          icon: defaultFeatures[index % defaultFeatures.length].icon,
          title: titleEl?.textContent || defaultFeatures[index].title,
          description: descEl?.textContent || defaultFeatures[index].description,
          details: defaultFeatures[index].details
        };
      });

      if (parsedFeatures.length > 0) features = parsedFeatures;
    } catch (error) {
      console.error("Error parsing content:", error);
    }
  }

  return (
    <section 
      className="py-24 relative overflow-hidden"
      style={{
        backgroundColor: colors?.backgroundColor || "#0A0B0F"
      }}
    >
      {/* Background Gradient */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          background: `radial-gradient(circle at 70% 50%, ${colors?.buttonColor || "#5B21B6"}33, transparent 70%)`
        }}
      />

      <div className="container mx-auto px-6 relative">
        <div className="text-center mb-20">
          <div 
            className="inline-block px-4 py-2 rounded-full text-sm font-medium mb-6"
            style={{
              backgroundColor: "rgba(91, 33, 182, 0.1)",
              color: colors?.buttonColor || "#5B21B6"
            }}
          >
            Powerful Trading Tools
          </div>
          <h2 
            className="text-4xl md:text-5xl font-bold mb-6"
            style={{
              color: colors?.textColor || "#ffffff"
            }}
          >
            {title}
          </h2>
          <p
            className="text-xl opacity-80 max-w-3xl mx-auto"
            style={{
              color: colors?.textColor || "#ffffff"
            }}
          >
            {subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-8 rounded-2xl backdrop-blur-sm border transition-all duration-500 hover:scale-[1.02] hover:shadow-lg bg-white/5 relative overflow-hidden"
              style={{
                borderColor: "rgba(255, 255, 255, 0.1)"
              }}
            >
              {/* Feature Icon */}
              <div
                className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110"
                style={{
                  backgroundColor: "rgba(91, 33, 182, 0.1)"
                }}
              >
                <feature.icon
                  className="w-8 h-8"
                  style={{
                    color: colors?.buttonColor || "#5B21B6"
                  }}
                />
              </div>

              {/* Feature Content */}
              <h3 
                className="text-2xl font-bold mb-4"
                style={{
                  color: colors?.textColor || "#ffffff"
                }}
              >
                {feature.title}
              </h3>
              <p
                className="text-lg mb-6"
                style={{
                  color: colors?.textColor || "#ffffff",
                  opacity: 0.75
                }}
              >
                {feature.description}
              </p>

              {/* Feature Details */}
              <ul className="space-y-3">
                {feature.details.map((detail, detailIndex) => (
                  <li 
                    key={detailIndex}
                    className="flex items-center space-x-3"
                  >
                    <div
                      className="w-1.5 h-1.5 rounded-full"
                      style={{
                        backgroundColor: colors?.buttonColor || "#5B21B6"
                      }}
                    />
                    <span
                      style={{
                        color: colors?.textColor || "#ffffff",
                        opacity: 0.6
                      }}
                    >
                      {detail}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Learn More Link */}
              <div className="mt-8">
                <a
                  href="#"
                  className="inline-flex items-center space-x-2 transition-all duration-300 hover:opacity-80"
                  style={{
                    color: colors?.buttonColor || "#5B21B6"
                  }}
                >
                  <span>Learn more</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              {/* Background Gradient */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                style={{
                  background: `linear-gradient(45deg, ${colors?.buttonColor || "#5B21B6"}33, transparent)`
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}