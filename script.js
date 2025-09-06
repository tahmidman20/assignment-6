const categoryContainer = document.getElementById("categoryContainer");

const loadCategory = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((data) => {
      console.log(data.categories);
      const categories = data.categories;
      categories.forEach((catG) => {
        categoryContainer.innerHTML += ` 
        <li class="hover:bg-[#15803d]">${catG.category_name}</li>
        
        `;
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
loadCategory();
