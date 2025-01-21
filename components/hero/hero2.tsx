import React from "react"

export default function Hero2() {
  return (
    <section className="bg-secondary text-secondary-foreground py-20">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold mb-4">Bienvenue sur Hero 2</h1>
          <p className="text-xl">Ceci est un exemple de Hero 2</p>
        </div>
        <div className="w-1/3 h-64 bg-gray-300 rounded-lg"></div>
      </div>
    </section>
  )
}

