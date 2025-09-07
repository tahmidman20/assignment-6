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
// 20=+
const showCategory = (categories) => {
  categories.forEach((catG) => {
    categoryContainer.innerHTML += ` 
        <li id="${catG.id}" class="hover:bg-[#15803d]
         hover:text-white p-1 font-semibold">${catG.category_name}</li>
        
        `;
  });
  categoryContainer.addEventListener("click", (e) => {
    const allLi = document.querySelectorAll("li");
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
      loadNewsByCategory(e.target.id);
    }
  });
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
  console.log(plants);
  plants.forEach((plant) => {
    newsContainer.innerHTML += `
    <div>
    <img src="${plant.image}" >
        <h1>
        ${plant.name}
         </h1>
    </div>
    `;
  });
};

loadCategory();
