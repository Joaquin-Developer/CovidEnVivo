// (async() => {
//     const response = await fetch("https://restcountries.eu/rest/v2/all");
//     const data = (await (await response).json()).map(elem => elem.name)
//     console.log(data)
// })()

Vue.component("selectcountry-component", {

    data() {
        return {
            countries: []
        }
    },

    created() {
        fetch("https://restcountries.eu/rest/v2/all")
        .then(resp => resp.json())
        .then(json => {
            this.countries = json.map(elem => elem.name)
        })
    },

    template: `
        <div class="form-group">
        <label for="country"></label>
        <label for="country" class="form-label mt-4">Seleccione un país para ver sus datos de covid-19:</label>
        <select class="form-select" id="country">
            <option v-for="(country, index) in countries" :key="index">
                {{ country }}
            </option>
        </select>
    </div>
    `

})
