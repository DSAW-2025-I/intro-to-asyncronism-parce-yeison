const pokemonTypes = [
    { name: "bug", color: "var(--type-bug)" },
    { name: "dark", color: "var(--type-dark)" },
    { name: "dragon", color: "var(--type-dragon)" },
    { name: "electric", color: "var(--type-electric)" },
    { name: "fairy", color: "var(--type-fairy)" },
    { name: "fighting", color: "var(--type-fighting)" },
    { name: "fire", color: "var(--type-fire)" },
    { name: "flying", color: "var(--type-flying)" },
    { name: "ghost", color: "var(--type-ghost)" },
    { name: "grass", color: "var(--type-grass)" },
    { name: "ground", color: "var(--type-ground)" },
    { name: "ice", color: "var(--type-ice)" },
    { name: "normal", color: "var(--type-normal)" },
    { name: "poison", color: "var(--type-poison)" },
    { name: "psychic", color: "var(--type-psychic)" },
    { name: "rock", color: "var(--type-rock)" },
    { name: "steel", color: "var(--type-steel)" },
    { name: "water", color: "var(--type-water)" }
  ];
  
  function createFilterUI() {
    const container = document.getElementById("filterbox");
    if (!container) {
      console.error("No se encontró el contenedor para los filtros.");
      return;
    }
    
    container.innerHTML = "";
    
    if (window.innerWidth < 768) {
      const select = document.createElement("select");
      select.className = "p-2 border border-gray-300 rounded-md";
      
      const defaultOption = document.createElement("option");
      defaultOption.value = "";
      defaultOption.textContent = "Filtrar por tipo";
      select.appendChild(defaultOption);
      
      pokemonTypes.forEach(type => {
        const option = document.createElement("option");
        option.value = type.name;
        option.textContent = type.name.charAt(0).toUpperCase() + type.name.slice(1);
        option.style.backgroundColor = type.color;
        select.appendChild(option);
      });
      
      select.addEventListener("change", (e) => {
        console.log("Filtrar por tipo:", e.target.value);
      });
      
      container.appendChild(select);
      
      const clearBtn = document.createElement("button");
      clearBtn.textContent = "Limpiar Filtro";
      clearBtn.className = "p-2 m-1 rounded-md bg-gray-500 text-white hover:scale-105 active:scale-95 transition-transform duration-200";
      clearBtn.addEventListener("click", () => {
        select.value = "";
        console.log("Filtro limpiado");
      });
      container.appendChild(clearBtn);
    } else {
      pokemonTypes.forEach(type => {
        const btn = document.createElement("button");
        btn.textContent = type.name.charAt(0).toUpperCase() + type.name.slice(1);
        btn.style.backgroundColor = type.color;
        btn.className = "p-2 m-1 rounded-md text-white hover:scale-105 active:scale-95 transition-transform duration-200";
        btn.addEventListener("click", () => {
          console.log("Filtrar por tipo:", type.name);
        });
        container.appendChild(btn);
      });
      const clearBtn = document.createElement("button");
      clearBtn.textContent = "Limpiar Filtro";
      clearBtn.className = "p-2 m-1 rounded-md bg-gray-500 text-white hover:scale-105 active:scale-95 transition-transform duration-200";
      clearBtn.addEventListener("click", () => {
        console.log("Filtro limpiado");

      });
      container.appendChild(clearBtn);
    }
  }
  
  document.addEventListener("DOMContentLoaded", createFilterUI);
  window.addEventListener("resize", () => {
    createFilterUI();
  });
  
  
  