import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Layers } from "lucide-react";

type ComponentColors = {
  backgroundColor?: string;
  textColor?: string;
  navTextColor?: string;
  navHoverColor?: string;
  signInTextColor?: string;
};

type Header1Props = {
  content?: string;
  colors?: ComponentColors;
};

export default function Header1({ content, colors }: Header1Props): JSX.Element {
  useEffect(() => {
    console.log("Header1 content:", content);
  }, [content, colors]);

  // Contenu par défaut
  let logo = "Logo";
  let navItems = [
    { label: "Accueil", href: "#" },
    { label: "Services", href: "#" },
    { label: "Contact", href: "#" },
  ];
  let signInText = "Connexion";

  // Si du contenu est fourni, essayez de l'utiliser
  if (content) {
    try {
      // Essayez d'abord de parser le contenu comme JSON
      const parsedContent = JSON.parse(content);
      if (parsedContent.navItems) navItems = parsedContent.navItems;
      if (parsedContent.logo) logo = parsedContent.logo;
      if (parsedContent.signInText) signInText = parsedContent.signInText;
    } catch (error) {
      // Si le parsing JSON échoue, traitez le contenu comme du HTML
      console.log("Parsing as HTML");
      const parser = new DOMParser();
      const doc = parser.parseFromString(content, "text/html");
      const h1Element = doc.querySelector("h1");
      const pElement = doc.querySelector("p");
      if (h1Element) logo = h1Element.textContent || logo;
      if (pElement) signInText = pElement.textContent || signInText;
    }
  }

  return (
      <header
          className="border-b"
          style={{
            backgroundColor: colors?.backgroundColor || "white",
          }}
      >
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <Layers className="h-6 w-6" style={{ color: colors?.textColor || "#3B82F6" }} />
              <span
                  className="text-xl font-semibold"
                  style={{
                    color: colors?.textColor || "#111827",
                  }}
              >
              {logo}
            </span>
            </div>

            {/* Navigation */}
            <nav>
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

            {/* Connexion */}
            <div
                className="text-sm"
                style={{
                  color: colors?.signInTextColor || "#4B5563",
                }}
            >
              {signInText}
            </div>
          </div>
        </div>
      </header>
  );
}