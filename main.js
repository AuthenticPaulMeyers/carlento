// Add shadow to the header-section on scroll

let headerEl = document.querySelector('.header-section');
let navArrowEL = document.querySelector('.nav-arrow');
window.addEventListener('scroll', () => {
    if(window.scrollY > 10){
        headerEl.classList.add('shadow');
        navArrowEL.classList.remove('hidden');
    }else{
        headerEl.classList.remove('shadow');
        navArrowEL.classList.add('hidden');

    }
});

// scroll to the top when the arrow-top is clicked

navArrowEL.addEventListener('click', () => {
    document.documentElement.scrollTop = 0;
});
// Fetch JSON data from the external file

    let parentContainer = document.querySelector('.left-container');
    let parentCarContainer = document.querySelector('.models-pricing-container');
    let btns = document.querySelectorAll('.js-model-name');

    // toggle active bars on the fleet section
    for(let i = 0; i < btns.length; i++){
        btns[i].addEventListener("click", function() {
            let current = document.getElementsByClassName('active');
            current[0].className = current[0].className.replace(' active', '');
            this.className += " active";
        });
    }

    // toggle between active nav bars
    let navLinks = document.querySelectorAll('.nav-link');

    for(let i = 0; i < navLinks.length; i++){
        navLinks[i].addEventListener("click", function() {
            let current = document.getElementsByClassName('active-link');
            current[0].className = current[0].className.replace(' active-link', '');
            this.className += " active-link";
        });
    }


    fetch('./cars.json')
    .then(response => response.json())
    .then(data => {
        
        addHTML(data); //default data
        //--------------------------------------
        let allCarsEl = document.querySelectorAll('.js-model-name');
        let viewList = [];
        let viewListHTML = '';
        allCarsEl.forEach(carItem => {
            carItem.addEventListener('click', () => {

            const carName = carItem.dataset.carName;

            if(viewList){
                viewList = [];
                viewList.unshift({
                    carName: carName,
                });
            }

            viewList.forEach((viewCar) => {
                const carItemName = viewCar.carName;
            
                let matchingCar;
            
                data.forEach((car) => {
                    if(car.name === carItemName){
                        matchingCar = car;
                    }
                });

                viewListHTML = `
                <div class="center-container">
                    <img src="${matchingCar.image}" alt="">
                </div>
    
                <div class="right-container">
                    <div class="car-details">
                        <h2>Model & Pricing</h2>
                        <div class="details">
                            <h3>Name</h3><span>${matchingCar.name}</span>
                        </div>
                        <div class="details">
                            <h3>Model</h3><span>${matchingCar.model}</span>
                        </div>
                        <div class="details">
                            <h3>Price/Day</h3><span>MK${matchingCar.price}</span>
                        </div>
                        <div class="details">
                            <h3>Transimition</h3><span>${matchingCar.transimition}</span>
                        </div>
                        <div class="details">
                            <h3>Fuel Type</h3><span>${matchingCar.fuelType}</span>
                        </div>
                        
                    </div>
                </div>
                `;
            });
            parentCarContainer.innerHTML = viewListHTML;
        });
    });
});

function addHTML (carDetails){
    let appendHTML = '';

        carDetails.forEach((car) =>{
            const html = `
            <div class="center-container">
                <img src="${car.image}" alt="">
            </div>

            <div class="right-container">
                <div class="car-details">
                    <h2>Model & Pricing</h2>
                    <div class="details">
                        <h3>Name</h3><span>${car.name}</span>
                    </div>
                    <div class="details">
                        <h3>Model</h3><span>${car.model}</span>
                    </div>
                    <div class="details">
                        <h3>Price/Day</h3><span>MK${car.price}</span>
                    </div>
                    <div class="details">
                        <h3>Transimition</h3><span>${car.transimition}</span>
                    </div>
                    <div class="details">
                        <h3>Fuel Type</h3><span>${car.fuelType}</span>
                    </div>
                    
                </div>
            </div>
                `;
            appendHTML = html;
        });
        // Add to HTML
        parentCarContainer.innerHTML = appendHTML;

}

// fetch the booklist car
let viewParentContainer =   document.querySelector(".view-container");

fetch('./book.json')
.then(res => res.json())
.then(data => {
    bookHTML(data);

        let bookCarEl = document.querySelectorAll('.js-book-button');
        let viewList = [];
        let viewListHTML = '';
        bookCarEl.forEach(carItem => {
            carItem.addEventListener('click', () => {
            
            viewParentContainer.classList.add('show-container');

            const name = carItem.dataset.name;

            if(viewList){
                viewList = [];
                viewList.unshift({
                    name: name,
                });
            }

            viewList.forEach((viewCar) => {
                const carItemName = viewCar.name;
            
                let matchingCar;
            
                data.forEach((car) => {
                    if(car.name === carItemName){
                        matchingCar = car;
                    }
                });

                viewListHTML = `
                    <div class="container">
                        <div class="image">
                            <img src="${matchingCar.image}" height="110" alt="">
                        </div>
                        <div class="details">
                            <h1 class="car-name">${matchingCar.name}</h1>
                            <p><span class="star-rate"><i class="fa-solid fa-star"></i></span>${matchingCar.rating} Reviews</p>
                            <h3><span class="star-rate"><i class="fa-solid fa-car"></i></span>${matchingCar.transimition}</h3>
                            <h3><span class="star-rate"><i class="fa-solid fa-gas-pump"></i></span> ${matchingCar.fuelType}</h3>
                            <h3><span class="star-rate"><i class="fa-solid fa-gauge"></i></span> ${matchingCar.speed}</h3>
                            <h3 class="price">Starting At MK<span>${matchingCar.price}</span> Per Hour</h3>
                            <button class="btn book-button">Proceed <i class="fa-solid fa-arrow-right"></i></button>
                        </div>

                        <div class="close js-close">
                            <i class="fa-solid fa-close"></i>
                        </div>
                    </div>
                `;
            });
            viewParentContainer.innerHTML = viewListHTML;


            let closeBtn =  document.querySelector('.js-close');
            closeBtn.addEventListener('click', ()=>{
                viewParentContainer.classList.remove('show-container');
            });
        });
    });

});

const parentBookContainer = document.querySelector('.booking-container');

function bookHTML (book){
    let appendHTML = '';

        book.forEach((car) =>{
            const html = `
                <div class="car-book">
                    <div class="img-container">
                        <img src="${car.image}" width="180" id="book-car">
                        <p class="car-name">${car.name}</p>

                    </div>
                    <div class="car-detail">
                        <div class="details">
                            <p class="price"><span class="star-rate"><i class="fa-solid fa-car"></i></span>${car.transimition}</p>
                        </div>
                        <div class="rating">
                            <p><span class="star-rate"><i class="fa-solid fa-star"></i></span>${car.rating}</p>
                        </div>
                    </div>
                    <button class="book-button btn js-book-button" data-name="${car.name}">Book Now</button>
                </div>
                `;
            appendHTML += html;
        });
        // Add to HTML
        parentBookContainer.innerHTML = appendHTML;

}
