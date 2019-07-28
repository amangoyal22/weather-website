console.log('ssss')

const search = document.querySelector('input')
const weatherForm = document.querySelector('form');
const msg1 = document.getElementById('msg1');
const msg2 = document.querySelector('#msg2');



weatherForm.addEventListener('submit',(event)=>{
    event.preventDefault();
    const location = search.value;
    msg1.textContent = 'Loading....'
    fetch('/weather?search='+ location).then((response)=> {
    response.json().then((data)=>{
        if(data.error) {
            msg1.textContent = data.error
            console.log(data.error)
        } else {
            msg2.textContent = data.forcast
            msg1.textContent = data.location
            console.log(data)
        }
        
    })
})
    console.log(location)
})