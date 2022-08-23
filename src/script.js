const dataDays = document.querySelectorAll('[data-day]');

function viewValue() {
    dataDays.forEach(day => {
        day.addEventListener('click', () => {
            day.querySelector('.value-spending').classList.toggle('active');
        })
    })
}

async function fetchAmount() {
    const responseAmount = await fetch('./data.json');
    const amountJSON = await responseAmount.json();
    addValueSpending(amountJSON);
}

function addValueSpending(object) {
    let highest = 0
    object.map((obj) => {
        if (obj.amount > highest) {
            highest = obj.amount
        }
        return highest;
    })
    dataDays.forEach(day => {
        object.filter((obj) => {
            if (obj.day === day.dataset.day) {
                day.querySelector('.value-spending').innerText = `$${obj.amount}`
                const graphicBar = day.querySelector('.background-spending')
                graphicBar.style.height = (1.2 * obj.amount) + '%';
                if (highest == obj.amount) {
                    graphicBar.style.backgroundColor = 'hsl(186, 34%, 60%)';
                }
            }
        });
    })
}

fetchAmount();
viewValue();

//não esquecer de adicionar o try/catch