const SERVER_URL = "http://localhost:3000/rgby"; 
let currentColor = { r: 0, g: 0, b: 0 };

function generateRandomColor(){
    currentColor.r = Math.floor(Math.random() * 256);
    currentColor.g = Math.floor(Math.random() * 256);
    currentColor.b = Math.floor(Math.random() * 256);
    
    const box = document.getElementById('colorBox');
    box.style.backgroundColor = `rgb(${currentColor.r}, ${currentColor.g}, ${currentColor.b})`;
}

async function sendData(labelY){
    const dataToSend = {
        r: currentColor.r,
        g: currentColor.g,
        b: currentColor.b,
        y: labelY // 0 per caldo, 1 per freddo, 2 per non lo so
    };

    try{
        await fetch(SERVER_URL,{
            method: 'POST', 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dataToSend)
        });
        
        console.log("Dato salvato!");
        generateRandomColor(); 
    } catch (error) {
        alert("Errore! Assicurati che json-server sia attivo con il comando npx json-server --watch data.json");
    }
}


generateRandomColor();