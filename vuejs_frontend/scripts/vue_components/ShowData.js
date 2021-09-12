
Vue.component("show-data-component", {

    data: ()=> {
        return {
            countryName: "",
            date: null,
            recovereds: "",
            confirmeds: "",
            deaths: "",
            withTheDisease: ""
        }
    },

    template: `
    <div class="d-grid gap-2">
        <button class="btn btn-lg btn-dark" type="button">VER DATOS</button>
    </div>

    <!-- 
        <button id="btnShowData" type="button" class="btn btn-secondary btn-lg btn-block">VER DATOS</button>
    -->
    <!-- Table: -->
    <div class="table-responsive">
        <table class="table " id="dataTable" >
            <thead id="theadDatatable" class="thead-dark"></thead>
            <tbody id="tbodyDatatable"></tbody>
        </table>
    </div>
    <br><br>
    <div id="tableDiferences"></div>
    `

})
