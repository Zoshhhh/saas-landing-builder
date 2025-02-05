"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Menu } from "lucide-react";

type ComponentColors = {
  backgroundColor?: string;
  textColor?: string;
  navTextColor?: string;
  navHoverColor?: string;
  searchTextColor?: string;
  searchBackgroundColor?: string;
  searchIconColor?: string;
  signInTextColor?: string;
  menuIconColor?: string;
};

type Header2Props = {
  content?: string;
  colors?: ComponentColors;
};

export default function Header2({ content, colors }: Header2Props) {
  useEffect(() => {
    console.log("Header2 content:", content);
  }, [content, colors]);

  let logo = "Logo";
  let navItems = [
    { label: "Home", href: "#" },
    { label: "Products", href: "#" },
    { label: "About", href: "#" },
    { label: "Contact", href: "#" },
  ];
  let searchPlaceholder = "Search...";
  let signInText = "Sign In";

  if (content) {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(content, "text/html");

      const logoElement = doc.querySelector(".logo");
      if (logoElement) logo = logoElement.textContent || logo;

      const navElements = doc.querySelectorAll("nav a");
      if (navElements.length > 0) {
        navItems = Array.from(navElements).map((el) => ({
          label: el.textContent || "",
          href: el.getAttribute("href") || "#",
        }));
      }

      const searchElement = doc.querySelector("input[type='search']");
      if (searchElement) searchPlaceholder = searchElement.getAttribute("placeholder") || searchPlaceholder;

      const signInElement = doc.querySelector(".sign-in");
      if (signInElement) signInText = signInElement.textContent || signInText;
    } catch (error) {
      console.error("Error parsing content:", error);
    }
  }

  return (
      <header
          className="shadow-sm"
          style={{
            backgroundColor: colors?.backgroundColor || "white",
          }}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Logo */}
              <span
                  className="text-2xl font-bold"
                  style={{
                    color: colors?.textColor || "#3B82F6",
                  }}
              >
              {logo}
            </span>

              {/* Navigation */}
              <nav className="hidden md:block">
                <ul className="flex space-x-6">
                  {navItems.map((item, index) => (
                      <li key={index}>
                        <a
                            href={item.href}
                            className="text-sm transition-colors"
                            style={{
                              color: colors?.navTextColor || "#4B5563",
                            }}
                            onMouseOver={(e) =>
                                (e.currentTarget.style.color = colors?.navHoverColor || "#3B82F6")
                            }
                            onMouseOut={(e) =>
                                (e.currentTarget.style.color = colors?.navTextColor || "#4B5563")
                            }
                        >
                          {item.label}
                        </a>
                      </li>
                  ))}
                </ul>
              </nav>
            </div>

            <div className="flex items-center space-x-4">
              {/* Search Input */}
              <div className="relative hidden sm:block">
                <Input
                    type="search"
                    placeholder={searchPlaceholder}
                    className="pl-10 pr-4 py-2 w-64 focus:ring-indigo-500 focus:border-indigo-500"
                    style={{
                      color: colors?.searchTextColor || "#374151",
                      backgroundColor: colors?.searchBackgroundColor || "#F3F4F6",
                    }}
                />
                <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4"
                    style={{ color: colors?.searchIconColor || "#9CA3AF" }}
                />
              </div>

              {/* Sign In Button */}
              <Button
                  variant="outline"
                  className="hidden sm:inline-flex"
                  style={{
                    color: colors?.signInTextColor || "#374151",
                  }}
              >
                {signInText}
              </Button>

              {/* Mobile Menu Icon */}
              <Button variant="ghost" className="md:hidden">
                <Menu
                    className="h-6 w-6"
                    style={{
                      color: colors?.menuIconColor || "#374151",
                    }}
                />
              </Button>
            </div>
          </div>
        </div>
      </header>
  );
}