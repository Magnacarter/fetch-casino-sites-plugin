async function loadTopLists() {
    fetch('./wp-content/plugins/fetch-casino-sites-plugin/api/data.json')
        .then(res => res.json())
        .then(data => console.log(data))
        .catch((err)=> {
            console.error(err);
        })
}
loadTopLists();