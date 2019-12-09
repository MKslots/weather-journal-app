/* Global Variables */

let baseURL = `http://api.openweathermap.org/data/2.5/weather?zip=`
let apiKey = '&appid=042a913828cc425b7f1a832f563f22d1';

// Event Listener

document.getElementById('generate').addEventListener('click', performAction);

// Create a new date instance dynamically with JS

let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Get Data from API 

function performAction(e){
    const zipCode =  document.getElementById('zip').value;
    const userResponse = document.getElementById('feelings').value;

    getData(baseURL, zipCode, apiKey)
    .then(function(data){
        console.log(data);
        //add data
        postData('/add', {temperature: data.main.temp, date: newDate, userResponse: userResponse});
        updateHTML('/all');
    })
}

const getData = async (baseURL, zipCode, apiKey)=>{
    
    const res = await fetch(baseURL+zipCode+apiKey)
    try {
    
    const data = await res.json();
    return data;
    }  catch(error) {
    console.log("error", error);
    // appropriately handle the error
    }       
}

// Post Data

const postData = async (url = '', data = {}) => {
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type':'application/json',
        },
        body: JSON.stringify(data),
    });

    try {
        const newData = await res.json();
        return newData;
    } catch(error) {
        console.log('error', error);
    };
};

// Update Data
    
const updateHTML = async(url='') => {
    const request = await fetch(url);
    try {
        const allData = await request.json();
        document.getElementById('date').innerHTML = allData[0].date;
        document.getElementById('temp').innerHTML = allData[0].temperature;
        document.getElementById('content').innerHTML = allData[0].userResponse;
    } catch(error) {
        console.log('error', error);
    };
};
