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
    button.innerHTML = `<button onclick="loadData(${cat.category_id})" class="bg-gray-200 text-gray-500 rounded py-1 px-4">${cat.category}</button>`;
    categoriesContainer.append(button);
  });
};

const cardContainer = document.getElementById("cards");
const notFound = document.getElementById("notFound");

// Load data using category ID
let loadData = async (id) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${id}`
  );
  const data = await res.json();
  //   console.log(data.data);

  //   Sort by Views
  document.getElementById("sortByView").addEventListener("click", () => {
    data.data.sort((a, b) => {
      const viewA = parseInt(a.others.views.replace("K", ""));
      const viewB = parseInt(b.others.views.replace("K", ""));
      return viewB - viewA;
    });
    displayCards(data.data);
  });

  // Not Found Page
  if (data.data.length == 0) {
    cardContainer.textContent = "";
    notFound.classList.remove("hidden");
  } else {
    notFound.classList.contains("hidden")
      ? true
      : notFound.classList.add("hidden");
    displayCards(data.data);
  }
};
loadData(1000);

// Convert Seconds to Hours and Minutes
const convertSeconds = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds / 3600) % 60);
  if (seconds == 0 || seconds == null) {
    return "";
  } else {
    const time = `${hours} hrs ${minutes} min ago`;
    return time;
  }
};

// Display Cards
// const cardContainer = document.getElementById("cards");
const displayCards = (data) => {
  cardContainer.textContent = "";
  data.forEach((data) => {
    // console.log(data);

    const card = document.createElement("div");
    card.innerHTML = `
    <!-- Card -->
    
      <div class="rounded-md mb-4 overflow-hidden h-[170px] bg-[url('${
        data.thumbnail
      }')] bg-cover bg-no-repeat bg-center relative">
      
      <span class="absolute bottom-4 right-4 text-white bg-gray-900 rounded p-1">${convertSeconds(
        data.others.posted_date
      )}</span>
      </div>
      <!-- Card info -->
      <div class="flex gap-2">
        <div class="self-start rounded-full overflow-hidden h-[40px] w-[40px]">
          <img class="h-[40px] w-[40px]" src="${
            data.authors[0].profile_picture
          }" alt="" />
        </div>
        <div class="flex flex-col gap-2">
          <a href="#" class="font-bold">${data.title}</a>
          <h3 class="text-sm text-gray-500">${
            data.authors[0].profile_name
          } <span>${
      data.authors[0].verified
        ? "<img class='inline-block' src='./assets/verified.svg'>"
        : ""
    }</span></h3>
          <span class="text-sm text-gray-500">${data.others.views}</span>
        </div>
      </div>
    
    `;

    cardContainer.append(card);
  });
};
