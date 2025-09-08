const categoryContainer = document.getElementById("categoryContainer");

const newsContainer = document.getElementById("newsContainer");

const addCardContainer = document.getElementById("addCardContainer");

const totalPriceElement = document.getElementById("totalAmount");

let addToCards = [];

const loadCategory = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((data) => {
      const categories = data.categories;
      //   console.log(categories);
      showCategory(categories);
    })
    .catch((err) => {
      console.log(err);
    });
};

const showCategory = (categories) => {
  categoryContainer.innerHTML = `
    <li id="all" class="hover:bg-[#15803d] hover:text-white p-1 font-semibold cursor-pointer bg-[#15803d] text-white rounded-sm">All Trees</li>
  `;

  categories.forEach((catG) => {
    categoryContainer.innerHTML += ` 
        <li id="${catG.id}" class="hover:bg-[#15803d]
         hover:text-white p-1 font-semibold">${catG.category_name}</li>
        
        `;
  });

  categoryContainer.addEventListener("click", (e) => {
    if (e.target.localName !== "li") return;

    const allLi = document.querySelectorAll("#categoryContainer li");
    allLi.forEach((li) => {
      li.classList.remove("bg-[#15803d]", "text-white", "rounded-sm");
      li.addEventListener("click", () => {
        console.log(li);
      });
    });

    if (e.target.localName === "li") {
      showLoading();
      e.target.classList.add("bg-[#15803d]", "text-white", "rounded-sm");

      if (e.target.id === "all") {
        loadAllTrees();
      } else {
        loadNewsByCategory(e.target.id);
      }
    }
  });
};

const loadAllTrees = () => {
  fetch("https://openapi.programming-hero.com/api/plants")
    .then((res) => res.json())
    .then((data) => {
      newsContainer.innerHTML = "";
      showNewsByCategory(data.plants);
    })
    .catch((err) => console.log(err));
};

const loadNewsByCategory = (categoryId) => {
  console.log(categoryId);
  fetch(`https://openapi.programming-hero.com/api/category/${categoryId}`)
    .then((res) => res.json())
    .then((data) => {
      // console.log(data.plants);
      showNewsByCategory(data.plants);
    })
    .catch((err) => {
      console.log(err);
    });
};

const showNewsByCategory = (plants) => {
  newsContainer.innerHTML = "";
  // console.log(plants);
  plants.forEach((plant) => {
    newsContainer.innerHTML += `
    <div id="${plant.id}" class="bg-white p-2 rounded-lg my-3">
              <img class="w-full h-48 md:h-56  object-cover rounded-lg" src="${plant.image}" />
              <h1 class="plant-title text-lg font-semibold cursor-pointer"data-id="${plant.id}">${plant.name}</h1>
              <p class="line-clamp-2">
               ${plant.description}
              </p>
              <div class="flex justify-between items-center">
                <button class="bg-[#DCFCE7] text-[#15803D] my-3 rounded-4xl btn">
                  ${plant.category}
                </button>
                <h3 class="text-lg font-semibold"><span class="text-lg font-semibold">৳<span> ${plant.price}</h3>
              </div>
              <button
                class="primary-color text-white w-full my-3 rounded-4xl btn"
                 data-id="${plant.id}" 
                 data-title="${plant.name}" 
                data-price="${plant.price}"
              >
                Add to Cart
              </button>
            </div>
    `;
  });
};

newsContainer.addEventListener("click", (e) => {
  const titleEl = e.target.closest(".plant-title");
  if (!titleEl) return;
  const plantId = titleEl.dataset.id;
  fetch(`https://openapi.programming-hero.com/api/plant/${plantId}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const plant = data.plants;
      document.getElementById("modalContent").innerHTML = `
        <img src="${plant.image}" class="w-full h-56 object-cover rounded-lg" />
        <h2 class="text-2xl font-bold">${plant.name}</h2>
        <p class="text-sm text-gray-600">Category: <span class="font-semibold">${plant.category}</span></p>
        <p>description : ${plant.description}</p>
        <p class="text-lg font-semibold ">price ৳ : ${plant.price}</p>
      `;
      document.getElementById("plantModal").checked = true;
    })
    .catch((err) => console.log(err));
});

newsContainer.addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-id]");
  if (!btn) return;

  const id = Number(e.target.dataset.id);
  const title = e.target.dataset.title;
  const price = Number(e.target.dataset.price);
  if (Number.isNaN(id) || Number.isNaN(price)) return;

  alert(`${title} has been added to the Cart`);

  const existingItem = addToCards.find((item) => item.id === id);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    addToCards.push({ id, title, price, quantity: 1 });
  }
  showAddToCard();
});

const showAddToCard = () => {
  addCardContainer.innerHTML = "";
  let total = 0;
  addToCards.forEach((item) => {
    total += item.price * item.quantity;

    addCardContainer.innerHTML += `
    <div
        class="flex justify-between items-center bg-[#F0FDF4] rounded-lg p-3 mx-2 mb-1"
          >
        <div>
        <h1 class="text-lg font-semibold">${item.title}</h1 
          <p>৳${item.price} × ${item.quantity}</p>
         </div>
         <button onclick="deleteToCard(${item.id})" >❌</button>
         </div>
    `;
  });
  totalPriceElement.innerText = total;
};

window.deleteToCard = (cardId) => {
  addToCards = addToCards.filter((item) => item.id !== cardId);
  showAddToCard();
};

const showLoading = () => {
  newsContainer.innerHTML = `
  
  <div class="p-3 col-span-3 items-center text-center"><span class="loading loading-spinner loading-xl"></span></div>`;
};

showLoading();
loadCategory();
loadAllTrees("plants");
