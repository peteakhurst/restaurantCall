class ZOMATO {
  constructor() {
    this.api = "774d2dce8844e610cf3e101058c28a19";
    this.header = {
      method: "GET",
      headers: {
        'user-key': this.api,
        'Content-Type': 'application/json'
      },
      credentials: "same-origin"
    };
  }
  async searchAPI() {

    // category URL
    const categoryURL = 'https://developers.zomato.com/api/v2.1/categories';

    // category data
    const categoryInfo = await fetch(categoryURL, this.header);
    const categoryJSON = await categoryInfo.json();
    const categories = await categoryJSON.categories;

    return {
      categories
    };
  }
}

class UI {
  constructor() {
    this.loader = document.querySelector('.loader');
    this.restaurantList = document.getElementById("restaurant-list");
  };

  addSelectOptions(categories) {
    const search = document.getElementById('searchCategory');
    let output = `<option value='0' selected>select category</option>`;
    categories.forEach(category => {
      output += `<option value="${category.categories.id}">${category.categories.name}</option>`
    });
    search.innerHTML = output;
  }

}

(function() {

  //  submit
  const searchForm = document.getElementById('searchForm');

  // input
  const searchCity = document.getElementById('searchCity');

  // Search Category
  const searchCategory = document.getElementById('searchCategory');


  const zomato = new ZOMATO();

  const ui = new UI();

  // Add select options
  document.addEventListener('DOMContentLoaded', () => {
    // logic functionality
    zomato.searchAPI().then(data => ui.addSelectOptions(data.categories));
  });

  // submit form
  searchForm.addEventListener('submit', event => {
    event.preventDefault();
  });



})();