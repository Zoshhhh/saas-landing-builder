import React, { useEffect } from 'react';
import { Twitter, Github, Linkedin, Instagram } from 'lucide-react';

interface ComponentColors {
  backgroundColor?: string;
  textColor?: string;
  buttonColor?: string;
  buttonTextColor?: string;
}

type FooterProps = {
  content?: string;
  colors?: ComponentColors;
};

export function Footer({ content, colors }: FooterProps) {
  useEffect(() => {
    console.log("Footer content:", content);
  }, [content, colors]);

  let title = "KrakenX";
  let description = "The world's most advanced cryptocurrency exchange";

  if (content) {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(content, "text/html");
      const titleElement = doc.querySelector("h2");
      const descElement = doc.querySelector("p");

      if (titleElement) title = titleElement.textContent || title;
      if (descElement) description = descElement.textContent || description;
    } catch (error) {
      console.error("Error parsing content:", error);
    }
  }

  const footerSections = [
    {
      title: "Products",
      links: ["Exchange", "Margin Trading", "Futures", "NFT", "Staking"]
    },
    {
      title: "Services",
      links: ["Buy Crypto", "Trading", "Pro Trading", "API", "Corporate"]
    },
    {
      title: "Support",
      links: ["Help Center", "Contact Us", "API Documentation", "Fees", "Status"]
    },
    {
      title: "Company",
      links: ["About", "Careers", "Blog", "Security", "Terms of Service"]
    }
  ];

  return (
    <footer 
      className="pt-20 pb-10"
      style={{
        backgroundColor: colors?.backgroundColor || "#0A0B0F"
      }}
    >
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <h2 
              className="text-2xl font-bold mb-4"
              style={{
                color: colors?.buttonColor || "#3B82F6"
              }}
            >
              {title}
            </h2>
            <p 
              className="mb-6 opacity-75"
              style={{
                color: colors?.textColor || "#ffffff"
              }}
            >
              {description}
            </p>
            <div className="flex space-x-4">
              {[Twitter, Github, Linkedin, Instagram].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="hover:opacity-75 transition-opacity"
                  style={{
                    color: colors?.textColor || "#ffffff"
                  }}
                >
                  <Icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 
                className="font-semibold mb-4"
                style={{
                  color: colors?.textColor || "#ffffff"
                }}
              >
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href="#"
                      className="hover:opacity-75 transition-opacity"
                      style={{
                        color: colors?.textColor || "#ffffff",
                        opacity: 0.75
                      }}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p 
              className="text-sm opacity-75 mb-4 md:mb-0"
              style={{
                color: colors?.textColor || "#ffffff"
              }}
            >
              © 2025 KrakenX. All rights reserved.
            </p>
            <div className="flex space-x-6">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item, index) => (
                <a
                  key={index}
                  href="#"
                  className="text-sm hover:opacity-75 transition-opacity"
                  style={{
                    color: colors?.textColor || "#ffffff",
                    opacity: 0.75
                  }}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}