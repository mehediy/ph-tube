// Load Categories
const loadCategories = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  const categories = await res.json();
  data = categories.data;
  displayCategories(data);
  //   console.log(data);
};
loadCategories();

// Show categories
const categoriesContainer = document.getElementById("categories");
const displayCategories = (data) => {
  data.forEach((cat) => {
    // console.log(cat);
    const button = document.createElement("button");
    button.innerHTML = `<button onclick="loadData(${cat.category_id})" class="bg-gray-200 rounded py-1 px-4">${cat.category}</button>`;
    categoriesContainer.append(button);
  });
};

// Load data using category ID
const loadData = async (id) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${id}`
  );
  const data = await res.json();
  console.log(data);
};

// Display Cards
const cardContainer = document.getElementById("cards");
