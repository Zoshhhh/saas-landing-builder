import React, { useEffect } from 'react';
import { ArrowRight, TrendingUp, Shield, Globe } from 'lucide-react';

interface ComponentColors {
  backgroundColor?: string;
  textColor?: string;
  buttonColor?: string;
  buttonTextColor?: string;
}

type HeroProps = {
  content?: string;
  colors?: ComponentColors;
};

export function Hero({ content, colors }: HeroProps) {
  useEffect(() => {
    console.log("Hero content:", content);
  }, [content, colors]);

  let title = "Elevate Your Trading Experience";
  let description = "Experience the future of digital asset trading with institutional-grade tools, deep liquidity, and cutting-edge security";
  let buttonText = "Start Trading";
  let secondaryButtonText = "Explore Markets";

  if (content) {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(content, "text/html");
      const h1Element = doc.querySelector("h1");
      const pElement = doc.querySelector("p");
      const buttons = doc.querySelectorAll("button");

      if (h1Element) title = h1Element.textContent || title;
      if (pElement) description = pElement.textContent || description;
      if (buttons[0]) buttonText = buttons[0].textContent || buttonText;
      if (buttons[1]) secondaryButtonText = buttons[1].textContent || secondaryButtonText;
    } catch (error) {
      console.error("Error parsing content:", error);
    }
  }

  const features = [
    {
      icon: TrendingUp,
      title: "Smart Order Routing",
      description: "Execute trades at the best prices across multiple liquidity pools"
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Multi-signature wallets and advanced encryption protocols"
    },
    {
      icon: Globe,
      title: "Global Liquidity",
      description: "Deep order books and seamless cross-border trading"
    }
  ];

  return (
    <section
      className="relative w-full min-h-screen pt-24 overflow-hidden"
      style={{
        backgroundColor: colors?.backgroundColor || "#0A0B0F",
        backgroundImage: "radial-gradient(circle at 50% 0%, rgba(91, 33, 182, 0.15), transparent 50%)"
      }}
    >
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-left pt-12">
            <div className="mb-6 inline-block">
              <span
                className="px-4 py-1 rounded-full text-sm font-medium"
                style={{
                  backgroundColor: "rgba(91, 33, 182, 0.1)",
                  color: colors?.buttonColor || "#5B21B6"
                }}
              >
                New: Margin Trading up to 100x
              </span>
            </div>
            <h1
              className="text-5xl lg:text-6xl font-bold mb-6 leading-tight"
              style={{
                color: colors?.textColor || "#ffffff",
                textShadow: "0 0 40px rgba(91, 33, 182, 0.3)"
              }}
            >
              {title}
            </h1>
            <p
              className="text-xl mb-8 opacity-90"
              style={{
                color: colors?.textColor || "#ffffff"
              }}
            >
              {description}
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                className="px-8 py-3 rounded-lg hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl"
                style={{
                  backgroundColor: colors?.buttonColor || "#5B21B6",
                  color: colors?.buttonTextColor || "#ffffff"
                }}
              >
                {buttonText} <ArrowRight className="w-5 h-5 inline-block ml-2" />
              </button>
              <button
                className="px-8 py-3 rounded-lg border-2 hover:bg-white/5 transition-all duration-300"
                style={{
                  borderColor: colors?.buttonColor || "#5B21B6",
                  color: colors?.textColor || "#ffffff"
                }}
              >
                {secondaryButtonText}
              </button>
            </div>
          </div>
          <div className="relative">
            <div className="relative z-10 bg-gradient-to-r from-violet-600/10 to-purple-600/10 rounded-2xl p-8 backdrop-blur-sm border border-white/10">
              <div className="grid gap-6">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div
                      className="p-3 rounded-lg"
                      style={{
                        backgroundColor: "rgba(91, 33, 182, 0.1)"
                      }}
                    >
                      <feature.icon
                        className="w-6 h-6"
                        style={{
                          color: colors?.buttonColor || "#5B21B6"
                        }}
                      />
                    </div>
                    <div>
                      <h3
                        className="font-semibold mb-1"
                        style={{
                          color: colors?.textColor || "#ffffff"
                        }}
                      >
                        {feature.title}
                      </h3>
                      <p
                        className="opacity-75"
                        style={{
                          color: colors?.textColor || "#ffffff"
                        }}
                      >
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div
              className="absolute inset-0 blur-3xl opacity-30"
              style={{
                background: "linear-gradient(45deg, #5B21B6, #9333EA)",
                transform: "translate(-5%, 5%)"
              }}
            />
          </div>
        </div>

        {/* Market Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: "Total Volume", value: "$28.9B+" },
            { label: "Active Users", value: "4.2M+" },
            { label: "Assets Listed", value: "250+" },
            { label: "Uptime", value: "99.99%" }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <h4
                className="text-3xl font-bold mb-2"
                style={{
                  color: colors?.buttonColor || "#5B21B6"
                }}
              >
                {stat.value}
              </h4>
              <p
                className="opacity-75"
                style={{
                  color: colors?.textColor || "#ffffff"
                }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}