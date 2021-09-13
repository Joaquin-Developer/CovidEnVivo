
Vue.component("selectcountry-component", {

    data() {
        return {
            countries: [],
            selected: "Uruguay"
        }
    },

    // data: {
    //     countries: [],
    //     selected: ""
    // },

    created() {
        fetch("https://restcountries.eu/rest/v2/all")
        .then(resp => resp.json())
        .then(json => {
            this.countries = json.map(elem => elem.name)
            localStorage.setItem("all_countries", JSON.stringify(this.countries))

        })
    },

    template: `
        <div class="form-group">
        <label for="country" class="form-label mt-4">Seleccione un país para ver sus datos de covid-19:</label>
        <select class="form-select" v-model="selected">
            <option v-for="(country, index) in countries" :id="index" :key="index" :value="country">
            <!-- :selected="country === 'Uruguay'" -->
                {{ country }}
            </option>            
        </select>

        {{selected}}
    </div>
    `

})
