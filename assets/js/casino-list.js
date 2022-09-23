class CasinoList extends HTMLElement {
  constructor() {
    super();
    this.dataUrl = `${document.location.origin}/wp-json/wp/v2/pages/174`;
  }

  // Init the list once the component is mounted.
  connectedCallback() {
    this.fetchList(this.dataUrl);
  }

  // Fetch the data from a WordPress post via the WP REST API.
  fetchList(url) {
    const listArr = fetch(url, {
      method: 'GET',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(res => res.json())
    .then(data => {
      // Prepare the data so it's JSON ready.
      const content    = data.content.rendered;
      const jsonString = content.split('<pre>')[1];
      const json       = jsonString.replace(/&quot;/g,'"');
      const parsedJson = JSON.parse(json);

      // Get the array of objects from the JSON.
      const list = parsedJson.toplists[575];

      // Initialize the rendering of the casino list.
      this.renderList(list);
    })
    .catch((err) => {
        console.error(err);
    })
  }

  // Loop through the array and start building individual list items.
  renderList(list) {
    list.forEach(casino => {
      this.createListItem(casino);
    });
  }

  // Dynamically populate the html with a casino's data.
  createListItem(casino) {
    console.log(casino);
    const cl = document.getElementById('casino-list');
    const newDiv = document.createElement('div');
    newDiv.setAttribute('class', 'item-wrapper');
    const rawMarkup = this.itemMarkup();
    newDiv.innerHTML = rawMarkup;
    cl.appendChild(newDiv);

    // Populate markup with casino data.
    this.populateListItem(casino, newDiv);
  }

  populateListItem(casino, div) {
    // Create the item div
    const item = div;
    item.setAttribute('id', casino.brand_id);

    // Unique data-id
    item.setAttribute('data-casio-id', casino.brand_id);

    // Use flexbox styles
    item.className = ['flex items-center py-6'];

    // Image src
    item.getElementsByTagName('img')[0].src = casino.logo;

    // Review href
    item.getElementsByTagName('a')[0].href = `${casino.play_url}/${casino.brand_id}`;

    // Review rating
    const starPercent = this.starIcons(casino.info.rating);
    item.querySelector('.stars-inner').style.width = starPercent;

    // Set the bonus
    item.querySelector('.bonus p').innerHTML = casino.info.bonus;

    // Set the features
    const ul = item.querySelector('.features ul');
    this.setFeatures(casino.info.features, ul);
  }

  // Unpopulated markup with Tailwind attributes for styles.
  itemMarkup() {
    const markup = `
      <div class="text-center md:w-64 md:mr-4">
        <img class="pb-8 motion-reduce relative h-full w-full object-cover transition duration-500 hover:scale-110 justify-center items-center" src/>
        <a class="text-blue-600 underline" href>Review</a>
      </div>
      <div class="review w-48 text-center md:-mt-16">
        <div class="stars-outer">
          <div class="stars-inner"></div>
        </div>
        <div class="bonus"><p class="text-sm font-semibold"></p></div>
      </div>
      <div class="features">
        <ul></ul>
      </div>
      <div class="play-btn-wrapper"></div>`;
    
    return markup;
  }

  // Setup a loop for the features.
  setFeatures(features, ul) {
    features.forEach(feature => {
      let li = document.createElement('li');
      li.innerText = feature;
      ul.appendChild(li);
    });
  }

  // Get the casio rating and convert it for star review.
  starIcons(rate) {
    const starTotal = 5;
    const starPercentage = (rate / starTotal) * 100;
    const starPercentageRounded = `${(Math.round(starPercentage / 10) * 10)}%`;

    return starPercentageRounded;
  };
}
customElements.define('casino-list', CasinoList);
