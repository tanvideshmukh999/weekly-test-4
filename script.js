let input = document.querySelector("input");
let search_btn = document.querySelector(".search-section");
let show_all_cards = document.querySelector(".show_all_cards")
let phone_container = document.querySelector(".phone-container");
search_btn.addEventListener("click", () => {
    logPhones()

})

default_mobiles()

async function default_mobiles() {
   

    let response = await fetch("https://openapi.programming-hero.com/api/phones?search=Iphone");
    const phones = await response.json();
    console.log(phones);
    phones.data.forEach((element, index) => {
        let card = document.createElement("div");
        card.setAttribute("class", "card");
        card.innerHTML = `<img src="${element.image}" alt="">
    <h2>${element.phone_name}</h2>
    <p>There are many variations of passages of available, but the majority have suffered</p>
    <button class="show_detail_btn" onClick=showDetails("${element.slug}")>SHOW DETAILS</button>`

        if (index >= 9) {
            show_all_cards.appendChild(card);
        } else {
            phone_container.appendChild(card);
        }

    });

}
async function showDetails(slug) {
    let details = await fetch("https://openapi.programming-hero.com/api/phone/" + slug);
    let detailsInfo = await details.json();
    console.log(detailsInfo)
}

let show_container=document.createElement("div")
async function logPhones() {
    let response = await fetch("https://openapi.programming-hero.com/api/phones?search=" + input.value);
    const phones = await response.json();
   
    let new_container = document.createElement("div");
    phones.data.forEach((element,index) => {
        let card = document.createElement("div");
        card.setAttribute("class", "card");
        card.innerHTML = `<img src="${element.image}" alt="">
    <h2>${element.phone_name}</h2>
    <p>There are many variations of passages of available, but the majority have suffered</p>
    <button class="show_detail_btn" onClick=showDetails("${element.slug}")>show details</button>`
        if (index >= 9) {
            show_all_cards.appendChild(card);
        } else {
           show_container.appendChild(card);
        }
       





    });
     new_container.innerHTML=show_container.innerHTML;
    phone_container.innerHTML = new_container.innerHTML



}

async function showDetails(slug) {
    let details = await fetch("https://openapi.programming-hero.com/api/phone/" + slug);
    let detailsInfo = await details.json();
    addDetailsToContainer(detailsInfo.data);
}

function addDetailsToContainer(data) {
    console.log(data);
    let dialog = document.querySelector("dialog");
    let dialog_container = document.querySelector(".dialog_container")
    dialog.innerHTML = `<img src="${data.image}" alt="">
   <h2>${data.name}</h2>
   <p>Brand :${data.brand}<p>
   
   <p class="phone_name">Stoarage :${data.mainFeatures.storage} </p>
   <p>Display : ${data.mainFeatures.displaySize}</p>
   <p>Chipset : ${data.mainFeatures.chipSet}</p>
   <span>Memory : ${data.mainFeatures.memory}</span>
   <span>release date</span>
   <br>
     <button id="close">close</button>`

    dialog_container.style.display = "block";
    let close_btn = document.querySelector("#close")
    close_btn.addEventListener("click", () => {
        console.log("closed")
        dialog_container.style.display = "none";
    })

}


let show_All_btn = document.querySelector("#show_btn");
show_All_btn.addEventListener("click", () => {
    if (show_All_btn.innerText == "SHOW ALL") {
        show_All_btn.innerText = "SHOW LESS"
        show_all_cards.style.display="flex";
    }
    else {
        show_All_btn.innerText = "SHOW ALL"
        show_all_cards.style.display="none";
    }
})