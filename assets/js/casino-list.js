class CasinoList extends HTMLElement {
    constructor() {
      super();
    }
  
    connectedCallback() {

    }
  
    fetchList(casinoData) {
      fetch(`./wp-content/plugins/fetch-casino-sites-plugin/api/data.json`, {
        method: 'GET',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.text())
        .then((parsedState) => {
          const json = JSON.parse(parsedState);
          this.section.innerHTML = json.casino_list;
        })
        .finally(() => {
          if (this.section.querySelector('casino-list')) {
            this.innerHTML = this.section.querySelector('casino-list').innerHTML;
            this.reInit();
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  }
customElements.define('casino-list', CasinoList);
