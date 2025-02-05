"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

type ComponentColors = {
  backgroundColor?: string;
  textColor?: string;
  newsletterTextColor?: string;
  inputTextColor?: string;
  inputBackgroundColor?: string;
  inputBorderColor?: string;
  buttonColor?: string;
  buttonTextColor?: string;
  navTextColor?: string;
  navHoverColor?: string;
  borderColor?: string;
  socialIconColor?: string;
  socialIconHoverColor?: string;
};

type Footer2Props = {
  content?: string;
  colors?: ComponentColors;
};

export default function Footer2({ content, colors }: Footer2Props) {
  useEffect(() => {
    console.log("Footer2 content:", content);
  }, [content, colors]);

  let newsletterTitle = "Get our beautiful newsletter straight to your inbox.";
  let emailPlaceholder = "Enter your email";
  let subscribeButtonText = "Subscribe";
  let copyrightText = `© ${new Date().getFullYear()} Your Company Name. All rights reserved.`;
  let footerNavs = [
    {
      label: "Resources",
      items: [
        { href: "#", name: "Contact" },
        { href: "#", name: "Support" },
        { href: "#", name: "Documentation" },
        { href: "#", name: "Pricing" },
      ],
    },
    {
      label: "About",
      items: [
        { href: "#", name: "Terms" },
        { href: "#", name: "License" },
        { href: "#", name: "Privacy" },
        { href: "#", name: "About Us" },
      ],
    },
  ];

  return (
      <footer
          className="pt-10"
          style={{
            backgroundColor: colors?.backgroundColor || "#F9FAFB",
          }}
      >
        <div className="max-w-screen-xl mx-auto px-4 md:px-8">
          {/* Newsletter */}
          <div className="justify-between items-center gap-12 md:flex">
            <div className="flex-1 max-w-lg">
              <h3
                  className="text-2xl font-bold"
                  style={{ color: colors?.newsletterTextColor || "#1E3A8A" }}
              >
                {newsletterTitle}
              </h3>
            </div>
            <div className="flex-1 mt-6 md:mt-0">
              <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-x-3 md:justify-end">
                <div className="relative flex-1">
                  <Input
                      type="email"
                      required
                      placeholder={emailPlaceholder}
                      className="w-full pl-12 pr-3 py-2 outline-none border focus:border-blue-600 shadow-sm rounded-lg"
                      style={{
                        color: colors?.inputTextColor || "#374151",
                        backgroundColor: colors?.inputBackgroundColor || "white",
                        borderColor: colors?.inputBorderColor || "#E5E7EB",
                      }}
                  />
                </div>
                <Button
                    type="submit"
                    className="block w-auto py-3 px-4 font-medium text-sm text-center rounded-lg shadow"
                    style={{
                      backgroundColor: colors?.buttonColor || "#3B82F6",
                      color: colors?.buttonTextColor || "white",
                    }}
                >
                  {subscribeButtonText}
                </Button>
              </form>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex-1 mt-16 space-y-6 justify-between sm:flex md:space-y-0">
            {footerNavs.map((item, idx) => (
                <ul className="space-y-4" key={idx}>
                  <h4
                      className="font-semibold sm:pb-2"
                      style={{ color: colors?.textColor || "#1E3A8A" }}
                  >
                    {item.label}
                  </h4>
                  {item.items.map((el, idx) => (
                      <li key={idx}>
                        <Link
                            href={el.href}
                            className="transition-colors"
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
                          {el.name}
                        </Link>
                      </li>
                  ))}
                </ul>
            ))}
          </div>

          {/* Copyright & Socials */}
          <div
              className="mt-10 py-10 border-t items-center justify-between sm:flex"
              style={{
                borderColor: colors?.borderColor || "#E5E7EB",
              }}
          >
            <p style={{ color: colors?.textColor || "#4B5563" }}>{copyrightText}</p>
            <div className="flex items-center gap-x-6 mt-6">
              {["#", "#", "#"].map((href, idx) => (
                  <a
                      key={idx}
                      href={href}
                      className="duration-150"
                      style={{
                        color: colors?.socialIconColor || "#9CA3AF",
                      }}
                      onMouseOver={(e) =>
                          (e.currentTarget.style.color = colors?.socialIconHoverColor || "#3B82F6")
                      }
                      onMouseOut={(e) =>
                          (e.currentTarget.style.color = colors?.socialIconColor || "#9CA3AF")
                      }
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                          fillRule="evenodd"
                          d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                          clipRule="evenodd"
                      />
                    </svg>
                  </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
  );
}