import React from 'react';
import { Smartphone, BarChart as ChartBar, Shield, Zap, Wallet, Bell } from 'lucide-react';

interface ComponentColors {
  backgroundColor?: string;
  textColor?: string;
  buttonColor?: string;
  buttonTextColor?: string;
}

type MobileShowcaseProps = {
  content?: string;
  colors?: ComponentColors;
};

export function MobileShowcase({ colors }: MobileShowcaseProps) {
  const features = [
    {
      icon: ChartBar,
      title: "Real-Time Trading",
      description: "Execute trades instantly with live market data and advanced charting"
    },
    {
      icon: Bell,
      title: "Smart Alerts",
      description: "Custom price alerts and portfolio notifications"
    },
    {
      icon: Shield,
      title: "Secure Access",
      description: "Biometric authentication and encrypted communications"
    },
    {
      icon: Wallet,
      title: "Portfolio Management",
      description: "Track and manage your assets across multiple chains"
    },
    {
      icon: Zap,
      title: "Instant Deposits",
      description: "Quick fiat on-ramp and crypto deposits"
    }
  ];

  return (
    <section
      className="py-24 relative overflow-hidden"
      style={{
        backgroundColor: colors?.backgroundColor || "#0A0B0F"
      }}
    >
      {/* Background Gradient */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at 70% 50%, ${colors?.buttonColor || "#5B21B6"}33, transparent 70%)`
        }}
      />

      <div className="container mx-auto px-6 relative">
        <div className="text-center mb-12">
          <h2 
            className="text-4xl font-bold mb-4"
            style={{
              color: colors?.textColor || "#ffffff"
            }}
          >
            Trade Anywhere, Anytime
          </h2>
          <p
            className="text-xl opacity-80 max-w-2xl mx-auto"
            style={{
              color: colors?.textColor || "#ffffff"
            }}
          >
            Experience professional-grade trading tools in your pocket with our mobile app
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Features List */}
          <div className="order-2 lg:order-1">
            <div className="space-y-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-4 p-4 rounded-xl transition-all duration-300 hover:bg-white/5"
                >
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
                      className="text-lg font-semibold mb-2"
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

          {/* Phone Mockup */}
          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative">
              {/* Phone Frame */}
              <div className="w-[300px] h-[600px] rounded-[3rem] border-[14px] border-gray-900 overflow-hidden shadow-2xl relative">
                {/* Screen Content */}
                <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black">
                  {/* Status Bar */}
                  <div className="h-6 flex justify-between items-center px-4 text-xs text-white/80">
                    <span>9:41</span>
                    <div className="flex items-center space-x-1">
                      <div className="w-4 h-4"><Signal className="w-full h-full" /></div>
                      <div className="w-4 h-4"><Wifi className="w-full h-full" /></div>
                      <div className="w-6 h-4"><Battery className="w-full h-full" /></div>
                    </div>
                  </div>

                  {/* App Content */}
                  <div className="p-4">
                    {/* Chart Area */}
                    <div className="h-48 bg-gradient-to-r from-violet-500/20 to-purple-500/20 rounded-lg mb-4 flex items-center justify-center">
                      <ChartBar className="w-12 h-12 text-violet-500" />
                    </div>

                    {/* Trading Pairs */}
                    <div className="space-y-3">
                      {[
                        { pair: "BTC/USD", price: "43,521.67", change: "+2.45%" },
                        { pair: "ETH/USD", price: "2,245.89", change: "+1.87%" },
                        { pair: "SOL/USD", price: "98.34", change: "+3.21%" }
                      ].map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 rounded-lg bg-white/5"
                        >
                          <span className="font-medium text-white">{item.pair}</span>
                          <div className="text-right">
                            <div className="text-white">{item.price}</div>
                            <div className="text-sm text-green-400">{item.change}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Glow Effect */}
              <div
                className="absolute inset-0 blur-3xl opacity-30 -z-10"
                style={{
                  background: `linear-gradient(45deg, ${colors?.buttonColor || "#5B21B6"}, #9333EA)`,
                  transform: "scale(0.8) translateY(10%)"
                }}
              />
            </div>
          </div>
        </div>

        {/* Download Buttons */}
        <div className="mt-12 flex justify-center gap-4">
          <button
            className="px-6 py-3 rounded-lg flex items-center space-x-2 hover:opacity-90 transition-all duration-300"
            style={{
              backgroundColor: colors?.buttonColor || "#5B21B6",
              color: colors?.buttonTextColor || "#ffffff"
            }}
          >
            <AppleIcon className="w-6 h-6" />
            <span>Download for iOS</span>
          </button>
          <button
            className="px-6 py-3 rounded-lg flex items-center space-x-2 border-2 hover:bg-white/5 transition-all duration-300"
            style={{
              borderColor: colors?.buttonColor || "#5B21B6",
              color: colors?.textColor || "#ffffff"
            }}
          >
            <AndroidIcon className="w-6 h-6" />
            <span>Download for Android</span>
          </button>
        </div>
      </div>
    </section>
  );
}

// Custom Icons
function Signal(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M4 18h2v-8H4v8zm3 0h2V8H7v10zm3 0h2V4h-2v14zm3 0h2V8h-2v10zm3 0h2v-8h-2v8z" />
    </svg>
  );
}

function Wifi(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 4C7.31 4 3.07 5.9 0 8.98L12 21l12-12.02C21.93 5.9 17.69 4 12 4z" />
    </svg>
  );
}

function Battery(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M17 4h-3V2h-4v2H7v18h10V4z" />
    </svg>
  );
}

function AppleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

function AndroidIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M16.61 15.15c-.46 0-.84-.37-.84-.83s.37-.84.84-.84c.46 0 .83.37.83.84s-.37.83-.83.83m-9.22 0c-.46 0-.84-.37-.84-.83s.37-.84.84-.84c.46 0 .83.37.83.84s-.37.83-.83.83m9.42-5.89l1.67-2.89c.09-.17.03-.38-.13-.47-.17-.09-.38-.03-.47.13l-1.69 2.93A9.973 9.973 0 0012 7.5c-1.87 0-3.59.52-5.19 1.37L5.13 5.94c-.09-.17-.3-.22-.47-.13-.17.09-.22.3-.13.47l1.67 2.89C3.4 10.96 1.52 14.05 1.5 17.5h21c-.02-3.45-1.9-6.54-4.69-8.24zM6 13.5h12v1H6v-1z" />
    </svg>
  );
}