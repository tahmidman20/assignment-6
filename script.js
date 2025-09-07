const categoryContainer = document.getElementById("categoryContainer");

const newsContainer = document.getElementById("newsContainer");

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
    <li id="all" class="hover:bg-[#15803d] hover:text-white p-1 font-semibold cursor-pointer">All Trees</li>
  `;

  categories.forEach((catG) => {
    categoryContainer.innerHTML += ` 
        <li id="${catG.id}" class="hover:bg-[#15803d]
         hover:text-white p-1 font-semibold">${catG.category_name}</li>
        
        `;
  });

  categoryContainer.addEventListener("click", (e) => {
    const allLi = document.querySelectorAll("#categoryContainer li");
    allLi.forEach((li) => {
      li.classList.remove("bg-[#15803d]", "text-white", "rounded-sm");
      li.addEventListener("click", () => {
        console.log(li);
      });
    });

    if (e.target.localName === "li") {
      console.log(e.target.id);
      // console.log(e.target.localName);
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
  console.log(plants);
  plants.forEach((plant) => {
    newsContainer.innerHTML += `
    <div class="bg-white p-2 rounded-lg my-3">
              <img class="w-full h-48 md:h-56  object-cover rounded-lg" src="${plant.image}" />
              <h1 class="text-lg font-semibold">${plant.name}</h1>
              <p>
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
              >
                Add to Cart
              </button>
            </div>
    `;
  });
};

loadCategory();
loadAllTrees("plants");
