
/*
1. 
2.✔ Make a fetch request to get the state breweries and store in state
3.✔ Sort through the states to only get: 
    - max number of 10
    - Micro
    - Regional
    - Brewpub
4. Render the breweries to the list wih the following details
    - Name
    - Type of brewery
    - Address
    - Phone Number
    - visit website button
5. Allow the breweries to be filtered at a section for:
    - type 
    - city with a section to clear all filters
6. From the 'search for' section a user can search for brewery by city and by name
*/
function createEl(tag) {
    return document.createElement(tag)
}

let state = {
    breweries: []
}


function fetchFunc(userState) {
    return fetch(`https://api.openbrewerydb.org/breweries?by_state=${userState}`)
    .then(function (response) {
        return response.json()
    })
}

function saveBreweriesToState() {
    const stateSearchForm = document.querySelector("#select-state-form")

    stateSearchForm.addEventListener("submit", function (e) {
        e.preventDefault()

        let USState = stateSearchForm["select-state"].value
        console.log(USState)
        fetchFunc(USState)
        .then(function(breweries) {
            state.breweries = breweries
            console.log(state)
        })
        .then(function() {
            let filteredBreweryList = filterBreweries()
            state.breweries = filteredBreweryList
            console.log(state.breweries)
            
        })
        .then(function (){
            renderFilterSection(state.breweries)
            renderBreweryListSection(state.breweries)
            
        }) 
    })
}
saveBreweriesToState()

function filterBreweries() {
    let filteredBreweries = state.breweries.filter(function(brewery){
        return ["micro", "regional", "brewpub"].includes(brewery["brewery_type"])
    })
    let finalTenBreweries = filteredBreweries.slice(0, 10)
    return finalTenBreweries
    
}

let mainEl = document.querySelector(`main`)

function renderFilterSection (breweries) {
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
    selectATypeEl.setAttribute(`value`, `""`)
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
    filterByCityFormEl.setAttribute("class", "filter-by-city-heading")

    for(brewery of breweries) {
        let filterByCityFormInputEl = createEl("input")
        filterByCityFormInputEl.setAttribute("type", "checkbox")
        filterByCityFormInputEl.setAttribute("name", brewery.city)
        filterByCityFormInputEl.setAttribute("value", brewery.city)

        let cityLabelEl = createEl("label")
        cityLabelEl.innerText = brewery.city
        
        filterByCityFormEl.append(filterByCityFormInputEl, cityLabelEl)
        asideSectionEl.append(filterByCityFormEl)
        }
    


    filterByCityHeadingEl.append(filterByCityHeadingTitleEl, filterByCityHeadingButtonEl)

    selectEl.append(selectATypeEl, microEl, regionalEl, brewpubEl)
    labelFilterByTypeEl.append(labelTitleEl) 
    filterFormEl.append(labelFilterByTypeEl, selectEl)
    asideSectionEl.append(h2FilterSectionEl, filterFormEl, filterByCityHeadingEl, filterByCityFormEl)
    mainEl.append(asideSectionEl)
    console.log(asideSectionEl)


}

function renderBreweryListSection (breweries) {
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

    let articleEl = createEl("article")

    let breweriesListEl = createEl("ul")
    breweriesListEl.setAttribute("class", "breweries-list")

    for (brewery of breweries) {
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
        breweriesListEl.append(titleEl, typeDivEl, addressSectionEl, phoneSectionEl, linkSectionEl)
    }
    
    
    labelForSearchFormEl.append(SearchFormTitleEl)
    searchFormEL.append(labelForSearchFormEl, searchBarInputEl)
    searchBarHeaderEl.append(searchFormEL)

    articleEl.append(breweriesListEl)

    mainEl.append(mainTitleEl, searchBarHeaderEl, articleEl)
}