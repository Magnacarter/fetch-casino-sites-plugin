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
    const cl = document.getElementById('casino-list');
    const newDiv = document.createElement('div');
    const rawMarkup = this.itemMarkup();
    newDiv.innerHTML = rawMarkup;
    cl.appendChild(newDiv);

    //TODO : Populate markup with casino data
  }

  // Unpopulated markup with Tailwind attributes for styles.
  itemMarkup() {
    //TODO : Use tailwind to style the list
    const markup = `<div data-casino-id="">
      <img src>
      <div class="">
          <p></p>
      </div>
      <div class="star-review">

      </div>
      <div class="play-btn-wrapper">

      </div>
    </div>`;
    
    return markup;
  }
}
customElements.define('casino-list', CasinoList);
