const addItemToTheList = (data) => {
    localStorage.setItem('applications', JSON.stringify(JSON.parse(localStorage.getItem('applications')).concat(data)));
}

const getNextId = () => {
    let id = localStorage.getItem('id');
    localStorage.setItem('id', ++id);
    
    return id;
}

document.addEventListener("DOMContentLoaded", () => {
		
});

const pattern = new RegExp(/^\d+$/)

window.onload = () => {

    document.getElementById("nameInput").addEventListener('change', event => {

        event.target.classList.remove('is-valid')
        event.target.classList.remove('is-invalid')

        let nameLength = event.target.value.length

        if(nameLength < 4 || nameLength > 30){
            event.target.classList.add('is-invalid')
        }
        else{
            event.target.classList.add('is-valid')
        }
    })

    document.getElementById("priceInput").addEventListener('change', event => {

        event.target.classList.remove('is-valid')
        event.target.classList.remove('is-invalid')

        let priceNum = event.target.value
        if(pattern.test(priceNum)){
            event.target.classList.add('is-valid')
        }
        else{
            event.target.classList.add('is-invalid')
        }
    })

    document.getElementById('descriptionInput').addEventListener('change', event => {

        event.target.classList.remove('is-invalid')

        let desc = event.target.value

        if(desc.length > 500){
            event.target.classList.add('is-invalid')
        }
    })

    document.getElementById('companyInput').addEventListener('change', event => {

        event.target.classList.remove('is-invalid')
        let comp = event.target.value

        if(comp.length > 30){
            event.target.classList.add('is-invalid')
        }
    })

    document.getElementById('imageInput').addEventListener('change', event => {

        event.target.classList.remove('is-invalid')
        let url = event.target.value

        if(url.length > 300){
            event.target.classList.add('is-invalid')
        }
    })

    document.forms["appForm"].addEventListener('submit', event => {
        event.preventDefault()
        
        let inputs = [...event.target.getElementsByTagName("input")].filter(input => input.type !== 'submit')

        if((inputs.filter(input => input.id === 'nameInput' || input.id == 'priceInput').some(input => input.value === "")) || 
        (inputs.some(input => input.classList.contains('is-invalid')) || document.getElementById('descriptionInput').classList.contains('is-invalid'))){

            document.getElementById("invalidMessage").innerHTML = "Oops, something went Wrong! Check your fields again"
        }
        else{
            const app = {
                id: getNextId(),
                imageUrl: inputs.find(input => input.id === 'imageInput').value,
                name: inputs.find(input => input.id === 'nameInput').value,
                price: inputs.find(input => input.id === 'priceInput').value,
                desc: document.getElementById("descriptionInput").value,
                companyName: inputs.find(input => input.id === 'companyInput').value
            }

            addItemToTheList(app)
            window.location.replace('mainPage.html')
        }
    })
}


