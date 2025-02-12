import React, { useEffect } from 'react';
import { Image } from 'lucide-react';

interface ComponentColors {
  backgroundColor?: string;
  textColor?: string;
  buttonColor?: string;
  buttonTextColor?: string;
}

type GalleryProps = {
  content?: string;
  colors?: ComponentColors;
};

export function Gallery({ content, colors }: GalleryProps) {
  useEffect(() => {
    console.log("Gallery content:", content);
  }, [content, colors]);

  const defaultImages = [
    {
      title: "Advanced Trading Interface",
      description: "Professional-grade tools for serious traders"
    },
    {
      title: "Portfolio Analytics",
      description: "Deep insights into your trading performance"
    },
    {
      title: "Mobile Trading App",
      description: "Trade on the go with our powerful mobile platform"
    }
  ];

  let images = [...defaultImages];
  let title = "Trading Tools That Empower";

  if (content) {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(content, "text/html");
      const titleElement = doc.querySelector("h2");
      const imageElements = doc.querySelectorAll(".gallery-item");

      if (titleElement) title = titleElement.textContent || title;

      const parsedImages = Array.from(imageElements).map((el, index) => {
        const titleEl = el.querySelector("h3");
        const descEl = el.querySelector("p");
        return {
          title: titleEl?.textContent || defaultImages[index].title,
          description: descEl?.textContent || defaultImages[index].description
        };
      });

      if (parsedImages.length > 0) {
        images = parsedImages;
      }
    } catch (error) {
      console.error("Error parsing content:", error);
    }
  }

  return (
    <section 
      className="py-20"
      style={{
        backgroundColor: colors?.backgroundColor || "#0A0B0F",
      }}
    >
      <div className="container mx-auto px-6">
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
          Discover our suite of professional trading tools designed to give you the edge in any market
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {images.map((image, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl transition-all duration-500 hover:scale-[1.02] bg-white/5 border border-white/10"
            >
              {/* SVG Placeholder */}
              <div className="aspect-video bg-white/5 flex items-center justify-center p-12">
                <Image className="w-24 h-24 text-white/20" />
              </div>
              <div className="p-6">
                <h3 
                  className="text-xl font-bold mb-2"
                  style={{
                    color: colors?.textColor || "#ffffff",
                  }}
                >
                  {image.title}
                </h3>
                <p
                  className="opacity-75"
                  style={{
                    color: colors?.textColor || "#ffffff",
                  }}
                >
                  {image.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}