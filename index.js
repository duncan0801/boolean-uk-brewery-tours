
/*
1. 
2.✔ Make a fetch request to get the state breweries and store in state
3.✔ Sort through the states to only get: 
    - max number of 10
    - Micro
    - Regional
    - Brewpub
4. ✔ Render the breweries to the list wih the following details
    - Name
    - Type of brewery
    - Address
    - Phone Number
    - visit website button
5. Allow the breweries to be filtered at a section for:
    - type 
        1. add an event listener on the form for ""Type of brewery"
        2. the event listener should include a function that changes the state accordingly when the value is selected 
        3. re render of whole page  with filter applied
    - city with a section to clear all filters
6. From the 'search for' section a user can search for brewery by city and by name
*/
function createEl(tag) {
    return document.createElement(tag)
}

let state = {
    breweries: [],
    filters: {
        type: "",
        cities: [],
        search: ""
    }
}
let mainEl = document.querySelector(`main`)


function fetchFunc(userState) {
    return fetch(`https://api.openbrewerydb.org/breweries?by_state=${userState}&per_page=50`)
    .then(function (response) {
        return response.json()
    })
}

function saveBreweriesToState() {
    
    const stateSearchForm = document.querySelector("#select-state-form")

    stateSearchForm.addEventListener("submit", function (e) {
        e.preventDefault()

        state = {
            breweries: [],
            filters: {
                type: "",
                cities: [],
                nameCity: ["Epidemic Ales"]
            }
        }

        let USState = stateSearchForm["select-state"].value
        console.log(USState)
        fetchFunc(USState)
        .then(function(breweries) {
            state.breweries = breweries
        })
        .then(function (){         
            renderAll(state.breweries)
        })
 
    })
    
}
saveBreweriesToState()

function filterBreweries() {
    //1. If state.filters.type = "" then we want to render all of the 10 breweries from all types
    //2.
    //  a. If state.filters.type = "*a type*", then we want to render only that type. Map through the breweries and add them to a filtered array only if the brewery_type = state.filters.type
    //  b. If state.filters.cities > 0
    //3. Then return a filtered array ready to be used in rendering 

    let filteredBreweries = state.breweries
    console.log(state)
    if (state.filters.type === "") {
        filteredBreweries = filteredBreweries.filter(function(brewery){
            return ["micro", "regional", "brewpub"].includes(brewery["brewery_type"])
        })
    }
    if (state.filters.type !== "") {
        filteredBreweries = filteredBreweries.filter(function (brewery) {
            return brewery.brewery_type === state.filters.type
        })
    }
    if(state.filters.cities.length > 0) {
        filteredBreweries = filteredBreweries.filter(function (brewery) {
            return state.filters.cities.includes(brewery.city)
        })
    }
    // if(state.filters.nameCity !== "") {
    //     filteredBreweries = filteredBreweries.filter(function(brewery) {
    //         return brewery.name.includes(state.filters.nameCity) || 
    //         brewery.city.includes(state.filters.nameCity)
    //     })
    //     console.log(filteredBreweries)
    // } 
    
    let finalTenBreweries = filteredBreweries.slice(0, 10)
    return finalTenBreweries
    
}

function renderFilterSection() {
    
    let asideSectionEl = createEl(`aside`)
    asideSectionEl.setAttribute(`class`, `filters-section`)
    
    let h2FilterSectionEl = createEl(`h2`)
    h2FilterSectionEl.innerText = "Filter by:"

    let filterFormEl = createEl(`form`)
    filterFormEl.setAttribute(`id`, `filter-by-type-form`)
    filterFormEl.setAttribute(`autocomplete`, `off`)

    let labelFilterByTypeEl = createEl(`label`)
    labelFilterByTypeEl.setAttribute(`for`, `filter-by-type`)
    let labelTitleEl = createEl(`h3`)
    labelTitleEl.innerText = "Type of Brewery"

    let selectEl = createEl(`select`)
    selectEl.setAttribute(`name`, `filter-by-type`)
    selectEl.setAttribute(`id`, `filter-by-type`)
    
    let selectATypeEl = createEl(`option`)
    selectATypeEl.setAttribute(`value`, ``)
    selectATypeEl.innerText = "Select a type..."
    
    let microEl = createEl(`option`)
    microEl.setAttribute(`value`, `micro`)
    microEl.innerText = "Micro"

    let regionalEl = createEl(`option`)
    regionalEl.setAttribute(`value`, `regional`)
    regionalEl.innerText = "Regional"

    let brewpubEl = createEl(`option`)
    brewpubEl.setAttribute(`value`, `brewpub`)
    brewpubEl.innerText = "Brewpub"

    let filterByCityHeadingEl = createEl("div")
    filterByCityHeadingEl.setAttribute("class", "filter-by-city-heading")
    let filterByCityHeadingTitleEl = createEl("h3")
    filterByCityHeadingTitleEl.innerText = "Cities:"
    let filterByCityHeadingButtonEl = createEl("button")
    filterByCityHeadingButtonEl.setAttribute("class", "clear-all-btn")
    filterByCityHeadingButtonEl.innerText = "clear all"

    let filterByCityFormEl = createEl("form")
    filterByCityFormEl.setAttribute("id", "filter-by-city-form")

    allCities = state.breweries.map(function(brewery) {
        return brewery.city
    })

    let sortedUniqueCities = [...new Set(allCities)].sort()
    
    for(city of sortedUniqueCities) {
        let filterByCityFormInputEl = createEl("input")
        filterByCityFormInputEl.setAttribute("type", "checkbox")
        filterByCityFormInputEl.setAttribute("name", "city")
        filterByCityFormInputEl.setAttribute("value", city)

        let cityLabelEl = createEl("label")
        cityLabelEl.innerText = city
        
        filterByCityFormEl.append(filterByCityFormInputEl, cityLabelEl)
        asideSectionEl.append(filterByCityFormEl)

        filterByCityFormInputEl.addEventListener("change", function() {
            if (filterByCityFormInputEl.checked && !(state.filters.cities.includes(filterByCityFormInputEl.value))) {
                state.filters.cities.push(filterByCityFormInputEl.value)
                console.log(state.filters.cities)
            }
            if (!(filterByCityFormInputEl.checked)) {
                indexToDelete = state.filters.cities.findIndex(function (city) {
                    city = filterByCityFormInputEl.value
                })
                state.filters.cities.splice(indexToDelete, 1)
                console.log(state.filters.cities)
            }
            let breweryListEl = document.querySelector("article")
            breweryListEl.remove()
            renderBreweryListSection()
        })
        filterByCityHeadingButtonEl.addEventListener("click", function() {
            for (city of filterByCityFormEl) {
                city.checked = false
            }
            state.filters.cities = []
            let breweryListEl = document.querySelector("article")
            breweryListEl.remove()
            renderBreweryListSection()
        })
        }

    // for (city of filterByCityFormEl.city)

    filterByCityHeadingEl.append(filterByCityHeadingTitleEl, filterByCityHeadingButtonEl)

    selectEl.append(selectATypeEl, microEl, regionalEl, brewpubEl)
    labelFilterByTypeEl.append(labelTitleEl) 
    filterFormEl.append(labelFilterByTypeEl, selectEl)
    asideSectionEl.append(h2FilterSectionEl, filterFormEl, filterByCityHeadingEl, filterByCityFormEl)
    mainEl.append(asideSectionEl)

    selectEl.addEventListener("change", function (e) {
        let selectEl = document.querySelector("#filter-by-type")
        console.log(selectEl)
        
        //1. change the state to the value from the form el when submited
        state.filters.type = selectEl.value
        state.filters.cities = []
        let breweryListEl = document.querySelector("article")
        breweryListEl.remove()
        renderBreweryListSection()
        // 2. Rerender with the applied filters
    })
}
function renderSearchSection() {
    let mainTitleEl = createEl(`h1`)
    mainTitleEl.innerText = "List of Brewries"

    let searchBarHeaderEl = createEl(`header`)
    searchBarHeaderEl.setAttribute("class", 
    "search-bar")

    let searchFormEL = createEl(`form`)
    searchFormEL.setAttribute("id", "search-breweries-form")
    searchFormEL.setAttribute("autocomplete", "off")

    let labelForSearchFormEl = createEl(`label`)
    labelForSearchFormEl.setAttribute("for", "search-breweries")
    let SearchFormTitleEl = createEl(`h2`)
    SearchFormTitleEl.innerText = "Search breweries:"
    let searchBarInputEl = createEl("input")
    searchBarInputEl.setAttribute("id", "search-breweries") 
    searchBarInputEl.setAttribute("name", "search-breweries") 
    searchBarInputEl.setAttribute("type", "text") 

    labelForSearchFormEl.append(SearchFormTitleEl)
    searchFormEL.append(labelForSearchFormEl, searchBarInputEl)
    searchBarHeaderEl.append(searchFormEL)
    mainEl.append(mainTitleEl, searchBarHeaderEl)

    searchFormEL.addEventListener("keyup", function(e) {
        e.preventDefault()

        let previousList = document.querySelector("article")
        previousList.remove()

        state.filters.search = e.target.value
        let breweries = filterBreweries()
        let filteredBreweries = breweries.filter(function (brewery) {
            return brewery.name.includes(state.filters.search) || brewery.city.includes(state.filters.search)
        })
        console.log(state.filters.search)
        console.log(filteredBreweries)
        state.breweries = filteredBreweries
        
        
        renderBreweryListSection()
    })

}

function renderBreweryListSection () {

    let breweries = filterBreweries()
    let articleEl = createEl("article")

    let breweriesListEl = createEl("ul")
    breweriesListEl.setAttribute("class", "breweries-list")

    const slicedBreweries = breweries.slice(0, 10)

    for (brewery of slicedBreweries) {
        let breweryLiEl = createEl("li")
        let titleEl = createEl(`h2`)
        titleEl.innerText = brewery.name

        let typeDivEl = createEl("div")
        typeDivEl.setAttribute("class", "type")
        typeDivEl.innerText = brewery["brewery_type"][0].toUpperCase() + brewery["brewery_type"].slice(1)

        let addressSectionEl = createEl("section")
        addressSectionEl.setAttribute("class", "address")
        let addressSectionTitleEl = createEl("h3")
        addressSectionTitleEl.innerText = "Address:\n"
        let addressSectionStreetEl = createEl("p")
        addressSectionStreetEl.innerText = brewery.street + ", "
        let addressSectionStreetStrongEl = createEl("strong")
        addressSectionStreetStrongEl.innerText = brewery.city + "\n" + brewery["postal_code"]

        let phoneSectionEl = createEl("section")
        phoneSectionEl.setAttribute("class", "phone")
        let phoneSectionTitleEl = createEl("h3")
        phoneSectionTitleEl.innerText = "Phone:"
        let phoneSectionNumberEl = createEl("p")
        phoneSectionNumberEl.innerText = brewery.phone

        let linkSectionEl = createEl("section")
        linkSectionEl.setAttribute("class", "link")
        let linkEl = createEl("a")
        linkEl.setAttribute("href", brewery["website_url"])
        linkEl.setAttribute("target", "blank_")
        linkEl.innerText = "Visit Website"

        linkSectionEl.append(linkEl)
        phoneSectionEl.append(phoneSectionTitleEl, phoneSectionNumberEl)
        addressSectionStreetEl.append(addressSectionStreetStrongEl)
        addressSectionEl.append(addressSectionTitleEl, addressSectionStreetEl)
        breweryLiEl.append(titleEl, typeDivEl, addressSectionEl, phoneSectionEl, linkSectionEl)
        breweriesListEl.append(breweryLiEl)
    }
    
    
    

    articleEl.append(breweriesListEl)

    mainEl.append(articleEl)

    
}

function renderAll() {
    mainEl.innerHTML = ""
    
    renderFilterSection()
    renderSearchSection()
    renderBreweryListSection()
}