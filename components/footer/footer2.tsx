import React from "react"

export default function Footer2() {
  return (
    <footer className="bg-gray-100 text-gray-600 py-8">
      <div className="container mx-auto flex justify-between">
        <div> 
          <h3 className="font-bold mb-2">Votre Entreprise</h3>
          <p>&copy; 2023 Tous droits réservés.</p>
        </div>
        <div>
          <h3 className="font-bold mb-2">Liens</h3>
          <ul>
            <li>Accueil</li>
            <li>À propos</li>
            <li>Contact</li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
 
