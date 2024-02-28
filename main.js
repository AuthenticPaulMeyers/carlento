// Add shadow to the header-section on scroll

let headerEl = document.querySelector('.header-section');
window.addEventListener('scroll', () => {
    if(window.scrollY > 0){
        headerEl.classList.add('shadow');
    }else{
        headerEl.classList.remove('shadow');
    }
});

// Fetch JSON data from the external file

    let parentContainer = document.querySelector('.left-container');
    let parentCarContainer = document.querySelector('.models-pricing-container')
    fetch('./cars.json')
    .then(response => response.json())
    .then(data => {
        let appendBtnHTML = '';
        data.forEach(car =>{
            const html = `
            <div class="model-name-container active js-model-name" data-car-name="${car.name}">
                <h3>${car.name}</h3>
            </div>
                `;
            appendBtnHTML += html;
        });

        parentContainer.innerHTML = appendBtnHTML;
        
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
