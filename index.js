const form = document.getElementById('form');
const search = document.getElementById('search');
const cases = document.getElementById('cases');
const containerchart = document.getElementById('containerchart');
const url = (location) => `https://api.covid19api.com/total/dayone/country/${location}`;
const locurl = "https://api.covid19api.com/summary";


async function getLocation(){
    const resploc = await fetch(locurl);
    const locData = await resploc.json();
    l = locData.Countries.length;
    locData.Countries.forEach(element => {
        const op = document.createElement("option");
        op.text = element.Country;
        op.value = element.Country;
        search.options.add(op);
    });
}
getLocation();


async function getData(location) {
    const resp = await fetch(url(location));
    const respData = await resp.json();
    console.log(respData[(respData.length) - 1]);
    addCases(respData[(respData.length) - 1]);
}
function addCases(data) {
    const dataitem = document.createElement('items');
    dataitem.innerHTML = `<div class="card">Active <div class = "num">${data.Active}</div></div>
    <div class="card">Confirmed <div class = "num">${data.Confirmed}</div></div>
    <div class="card">Deaths <div class = "num">${data.Deaths}</div></div>
    <div class="card">Recovered <div class = "num">${data.Recovered}</div></div>`;

    cases.innerHTML = "";
    cases.appendChild(dataitem);

    const chartItem = document.createElement('canvas');
    chartItem.id="myChart";
    containerchart.innerHTML="";
    containerchart.appendChild(chartItem);
    const ctx = document.getElementById('myChart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Active', 'Confirmed', 'Death', 'Recovered'],
            datasets: [{
                label: data.Country,
                data: [data.Active, data.Confirmed, data.Deaths, data.Recovered],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
    
  
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;
    console.log(location);
    getData(location);
})