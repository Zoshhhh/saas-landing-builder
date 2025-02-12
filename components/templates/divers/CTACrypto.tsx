import React, { useEffect } from 'react';
import { ArrowRight, Check } from 'lucide-react';

interface ComponentColors {
  backgroundColor?: string;
  textColor?: string;
  buttonColor?: string;
  buttonTextColor?: string;
}

type CTAProps = {
  content?: string;
  colors?: ComponentColors;
};

export function CTA({ content, colors }: CTAProps) {
  useEffect(() => {
    console.log("CTA content:", content);
  }, [content, colors]);

  let title = "Start Trading Today";
  let description = "Join millions of traders and investors on the world's most advanced crypto trading platform";
  let buttonText = "Create Free Account";

  const benefits = [
    "Instant account verification",
    "24/7 live support",
    "Advanced security features",
    "Low trading fees"
  ];

  if (content) {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(content, "text/html");
      const h2Element = doc.querySelector("h2");
      const pElement = doc.querySelector("p");
      const buttonElement = doc.querySelector("button");

      if (h2Element) title = h2Element.textContent || title;
      if (pElement) description = pElement.textContent || description;
      if (buttonElement) buttonText = buttonElement.textContent || buttonText;
    } catch (error) {
      console.error("Error parsing content:", error);
    }
  }

  return (
    <section 
      className="py-20 relative overflow-hidden"
      style={{
        backgroundColor: colors?.backgroundColor || "#0A0B0F"
      }}
    >
      {/* Background Gradient */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${colors?.buttonColor || "#3B82F6"}33, transparent 70%)`
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 
              className="text-4xl font-bold mb-6"
              style={{
                color: colors?.textColor || "#ffffff"
              }}
            >
              {title}
            </h2>
            <p
              className="text-xl opacity-90"
              style={{
                color: colors?.textColor || "#ffffff"
              }}
            >
              {description}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center"
                    style={{
                      backgroundColor: "rgba(59, 130, 246, 0.1)"
                    }}
                  >
                    <Check
                      className="w-4 h-4"
                      style={{
                        color: colors?.buttonColor || "#3B82F6"
                      }}
                    />
                  </div>
                  <span
                    style={{
                      color: colors?.textColor || "#ffffff"
                    }}
                  >
                    {benefit}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex flex-col items-center space-y-6">
              <button 
                className="w-full px-8 py-4 rounded-lg text-lg font-semibold hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl"
                style={{
                  backgroundColor: colors?.buttonColor || "#3B82F6",
                  color: colors?.buttonTextColor || "#ffffff"
                }}
              >
                {buttonText} <ArrowRight className="w-5 h-5 inline-block ml-2" />
              </button>
              <p
                className="text-sm opacity-75"
                style={{
                  color: colors?.textColor || "#ffffff"
                }}
              >
                No credit card required • Instant access
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}