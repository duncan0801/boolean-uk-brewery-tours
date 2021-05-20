
/*
1. ✔ get state from user, and reformat to: lowercase, underscore instead of space
2.✔Make a fetch request 
*/
let searchFromUser
const stateSearchForm = document.querySelector("#select-state-form")
console.log(stateSearchForm)
const stateToSearchInput = document.querySelector("#select-state")

stateSearchForm.addEventListener("submit", function (e) {
    e.preventDefault()
    let userInput = stateToSearchInput.value
    userInput = userInput.toLowerCase().replace(" ", "_")
    searchFromUser = userInput
    console.log(userInput)
    fetchFunc(searchFromUser)
}
)
function fetchFunc (userState) {
    fetch(`https://api.openbrewerydb.org/breweries?by_state=${userState}`)
    .then(function (res) {
        console.log(res)
        return res.json()
    })
    .then( function(data) {
        console.log(data)
    })
}

function createEl(tag) {
    return document.createElement(tag)
}

function createFilterSection () {
   let mainEl = document.querySelector(`main`)
   
   let asideSectionEl = createEl(`aside`)
   asideSectionEl.setAttribute(`class`, `filters-section`)
   
   let h2FilterSectionEl = createEl(`h2`)
   h2FilterSectionEl.innerText = "Filter by:"

   console.log(h2FilterSectionEl)

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

   
   selectEl.append(`selectATypeEl`, `microEl`, `regionalEl`, `brewpubEl`)
   labelFilterByTypeEl.append(`labelTitleEl`) //the h3 inside the label
   filterFormEl.append(labelFilterByTypeEl, selectEl)
   asideSectionEl.append(h2FilterSectionEl, filterFormEl)
   mainEl.append(asideSectionEl)
   
   
   console.log(mainEl)

}
createFilterSection()