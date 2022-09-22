class CasinoList extends HTMLElement {
  constructor() {
    super();
    this.listWrapper = document.getElementById('casino-list');
    this.url = `${document.location.origin}/wp-json/wp/v2/pages/174`;
    this.json;
  }

  connectedCallback() {
    this.fetchList(this.url);
  }

  fetchList(url) {
    fetch(url, {
      method: 'GET',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(res => res.json())
    .then(data => {
      const content = data.content.rendered;
      const jsonString = content.split('<pre>')[1];
      const json = jsonString.replace(/&quot;/g,'"');
      this.json = JSON.parse(json);
      console.log(this.json.toplists);
    })
    .catch((err) => {
        console.error(err);
    })
  }
}
customElements.define('casino-list', CasinoList);
