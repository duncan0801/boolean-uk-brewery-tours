
/*
1. ✔ get state from user, and reformat to: lowercase, underscore instead of space
2.✔Make a fetch request 
*/
let searchFromUser
const stateSearchForm = document.querySelector("#select-state-form")
console.log(stateSearchForm)
const stateToSearchInput = document.querySelector("#select-state")
console.log(stateToSearchInput)

stateSearchForm.addEventListener("submit", function (e) {
    e.preventDefault()
    let userInput = stateToSearchInput.value
    userInput = userInput.toLowerCase().replace(" ", "_")
    searchFromUser = userInput
    console.log(userInput)

    console.log(searchFromUser)
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
   let main = document.querySelector(`main`)
   
   let  asideSectionEl = createEl(`aside`)
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
   
   let optionEl
   
   
   main.append(`filterSectionEl`)
   asideSectionEl.append(`h2FilterSectionEl`, `filterFormEl`)
   labelFilterByTypeEl.append(`labelTitleEl`)
   filterFormEl.append(`labelFilterByTypeEl`, `selectEl`)
   console.log(asideSectionEl)

}
createFilterSection()