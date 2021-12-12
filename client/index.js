document.addEventListener('DOMContentLoaded',function() { 
    fetch('http://localhost:5000/getAll')
    .then(response => response.json())
    .then((data)=> loadHtmlTable(data['data']));
    
});

const addBtn = document.querySelector('#name-submit-btn');

addBtn.onclick = function() { 
    const nameInput = document.querySelector('#name-input');
    fetch('http://localhost:5000/insert',
    {
        headers : {
            'content-type':'application/json',
        },
        method: 'POST',
        body: JSON.stringify({name: nameInput.value})
    }
    );
    nameInput.value = ""; // To empty the input box after submit name
}

function loadHtmlTable(data) { 
    const table = document.querySelector('table tbody');
    if(data.length === 0) { 
        table.innerHTML = "<tr><td class='no-data' colspan='5'>No Data</td></tr>";
    }
}