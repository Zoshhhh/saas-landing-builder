import React, { useEffect, useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';

interface ComponentColors {
  backgroundColor?: string;
  textColor?: string;
  buttonColor?: string;
  buttonTextColor?: string;
}

type HeaderProps = {
  content?: string;
  colors?: ComponentColors;
};

export function Header({ content, colors }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  
  useEffect(() => {
    console.log("Header content:", content);
  }, [content, colors]);

  let title = "NexusTrade";
  let buttonText = "Get Started";

  if (content) {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(content, "text/html");
      const h1Element = doc.querySelector("h1");
      const buttonElement = doc.querySelector("button");

      if (h1Element) title = h1Element.textContent || title;
      if (buttonElement) buttonText = buttonElement.textContent || buttonText;
    } catch (error) {
      console.error("Error parsing content:", error);
    }
  }

  const navItems = [
    {
      label: "Trade",
      href: "#trade",
      dropdownItems: [
        { label: "Spot Trading", href: "#spot" },
        { label: "Margin Trading", href: "#margin" },
        { label: "Futures", href: "#futures" },
        { label: "Options", href: "#options" }
      ]
    },
    {
      label: "Earn",
      href: "#earn",
      dropdownItems: [
        { label: "Staking", href: "#staking" },
        { label: "Lending", href: "#lending" },
        { label: "Yield Farming", href: "#yield" },
        { label: "Liquidity Pools", href: "#pools" }
      ]
    },
    {
      label: "Markets",
      href: "#markets",
      dropdownItems: [
        { label: "Market Overview", href: "#overview" },
        { label: "Top Gainers", href: "#gainers" },
        { label: "New Listings", href: "#new" },
        { label: "Market Analysis", href: "#analysis" }
      ]
    },
    { label: "Learn", href: "#learn" }
  ];

  return (
    <header 
      className="fixed w-full z-50 backdrop-blur-md border-b border-white/10"
      style={{
        backgroundColor: `${colors?.backgroundColor || "#0A0B0F"}CC`
      }}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <span 
              className="text-2xl font-bold bg-gradient-to-r from-violet-500 to-purple-600 bg-clip-text text-transparent"
            >
              {title}
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative group"
                onMouseEnter={() => setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <a
                  href={item.href}
                  className="flex items-center hover:opacity-75 transition-opacity"
                  style={{
                    color: colors?.textColor || "#ffffff"
                  }}
                >
                  {item.label}
                  {item.dropdownItems && (
                    <ChevronDown className="w-4 h-4 ml-1" />
                  )}
                </a>
                {item.dropdownItems && activeDropdown === item.label && (
                  <div className="absolute top-full left-0 mt-2 w-48 rounded-lg shadow-lg overflow-hidden border border-white/10 backdrop-blur-md"
                       style={{
                         backgroundColor: `${colors?.backgroundColor || "#0A0B0F"}F0`
                       }}>
                    <div className="py-2">
                      {item.dropdownItems.map((dropdownItem) => (
                        <a
                          key={dropdownItem.label}
                          href={dropdownItem.href}
                          className="block px-4 py-2 hover:bg-white/5 transition-colors"
                          style={{
                            color: colors?.textColor || "#ffffff"
                          }}
                        >
                          {dropdownItem.label}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            <button 
              className="px-6 py-2 rounded-lg hover:opacity-90 transition-all duration-300"
              style={{
                backgroundColor: colors?.buttonColor || "#5B21B6",
                color: colors?.buttonTextColor || "#ffffff"
              }}
            >
              {buttonText}
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{
              color: colors?.textColor || "#ffffff"
            }}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <div key={item.label}>
                  <a
                    href={item.href}
                    className="flex items-center justify-between hover:opacity-75 transition-opacity py-2"
                    style={{
                      color: colors?.textColor || "#ffffff"
                    }}
                    onClick={() => {
                      if (item.dropdownItems) {
                        setActiveDropdown(activeDropdown === item.label ? null : item.label);
                      }
                    }}
                  >
                    {item.label}
                    {item.dropdownItems && (
                      <ChevronDown className={`w-4 h-4 transition-transform ${
                        activeDropdown === item.label ? 'rotate-180' : ''
                      }`} />
                    )}
                  </a>
                  {item.dropdownItems && activeDropdown === item.label && (
                    <div className="ml-4 mt-2 space-y-2">
                      {item.dropdownItems.map((dropdownItem) => (
                        <a
                          key={dropdownItem.label}
                          href={dropdownItem.href}
                          className="block py-2 hover:opacity-75 transition-opacity"
                          style={{
                            color: colors?.textColor || "#ffffff",
                            opacity: 0.8
                          }}
                        >
                          {dropdownItem.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <button 
                className="px-6 py-2 rounded-lg hover:opacity-90 transition-all duration-300 w-full"
                style={{
                  backgroundColor: colors?.buttonColor || "#5B21B6",
                  color: colors?.buttonTextColor || "#ffffff"
                }}
              >
                {buttonText}
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}