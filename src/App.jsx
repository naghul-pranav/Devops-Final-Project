import { useState } from "react";
import Login from "./Login";

const initialPets = [
  { id: 1, name: "Buddy", type: "Dog", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnYa0In6TaZgb-ThQhHECEoU6pVcl3zCUFwA&s", adopted: false },
  { id: 2, name: "Mittens", type: "Cat", image: "https://bestfriends.org/sites/default/files/styles/hero_mobile/public/hero-dash/Asana3808_Dashboard_Standard.jpg?h=ebad9ecf&itok=cWevo33k", adopted: false },
  { id: 3, name: "Charlie", type: "Rabbit", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2pRXZW019vGnfKnrZpMwd9Iw3_HXuwmaWdw&s", adopted: false },
];

export default function App() {
  const [pets, setPets] = useState(initialPets);
  const [search, setSearch] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const adoptPet = (id) => {
    setPets(pets.map((pet) => (pet.id === id ? { ...pet, adopted: true } : pet)));
  };

  const filteredPets = pets.filter((pet) => 
    pet.name.toLowerCase().includes(search.toLowerCase())
  );

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <div style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center",
        marginBottom: "20px"
      }}>
        <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>Pet Adoption Platform</h1>
        <button 
          onClick={() => setIsLoggedIn(false)}
          style={{
            padding: "8px 16px",
            backgroundColor: "#f44336",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Logout
        </button>
      </div>
      <input
        style={{ 
          width: "300px", 
          padding: "10px", 
          marginBottom: "20px", 
          border: "1px solid #ccc", 
          borderRadius: "5px",
          fontSize: "16px"
        }}
        placeholder="Search for a pet..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", 
        gap: "20px", 
        justifyContent: "center" 
      }}>
        {filteredPets.length > 0 ? (
          filteredPets.map((pet) => (
            <div 
              key={pet.id} 
              style={{ 
                border: "1px solid #ddd", 
                borderRadius: "10px", 
                padding: "20px", 
                textAlign: "center",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
              }}
            >
              <img 
                src={pet.image} 
                alt={pet.name} 
                style={{ 
                  width: "100px", 
                  height: "100px", 
                  borderRadius: "10px", 
                  marginBottom: "10px",
                  objectFit: "cover"
                }} 
              />
              <h2 style={{ fontSize: "18px", fontWeight: "bold" }}>{pet.name}</h2>
              <p style={{ color: "#555" }}>{pet.type}</p>
              <button
                style={{ 
                  marginTop: "10px", 
                  padding: "10px 15px", 
                  borderRadius: "5px", 
                  backgroundColor: pet.adopted ? "gray" : "#4CAF50", 
                  color: "white", 
                  border: "none", 
                  cursor: pet.adopted ? "default" : "pointer",
                  transition: "background-color 0.3s"
                }}
                onClick={() => adoptPet(pet.id)}
                disabled={pet.adopted}
              >
                {pet.adopted ? "Adopted" : "Adopt"}
              </button>
            </div>
          ))
        ) : (
          <p style={{ color: "#555", gridColumn: "1/-1" }}>No pets found</p>
        )}
      </div>
    </div>
  );
}