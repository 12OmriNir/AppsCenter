const getData = () => {
    if (localStorage.getItem('applications') == null) {
        localStorage.setItem('applications', JSON.stringify(applications));
        localStorage.setItem('id', id);
    }

    return JSON.parse(localStorage.getItem('applications'));
}
let apps;
document.addEventListener("DOMContentLoaded", () => {
    apps = getData()
});

window.onload = () => {

    showAllApps(apps)

    document.getElementById('searchBar').addEventListener('change', event => {

        const searched = event.target.value

        const filtered = apps.filter(app => app.name.includes(searched))

        showAllApps(filtered)
    })

    document.getElementById('addButton').addEventListener('click',() => {
        window.location.replace('addApplication.html')
    })
}

const showAllApps = (apps) => {
    const tag = apps.map(app => createAppRow(app)).join('')
        document.getElementById('appsContainer').innerHTML = tag
}

const createAppRow = (app) => {
    debugger
    let appId = app.id
    let appURL = app.imageUrl
    let appName = app.name
    let appPrice = app.price
    let appCompName = app.companyName
    let appDesc = app.desc

    let imagePositon;

    if(appURL === ''){
        imagePositon = '../images/Help.png'
    }
    else{
        imagePositon = `../images/${appId}/${appURL}`
    }

    if(appCompName === ''){
        appCompName = "This app does not have a company"
    }

    if(appDesc === ''){
        appDesc = "This app does not have description"
    }

    return `<div class="col-3 float-left row">
                <div class="col-12">
                    <img src="${imagePositon}" style="width: 100px">
                </div>
            </div>

            <div class="col-9 float-right row">

                <div class="col-12 text-left">
                    <h3>${appName}</h3>
                </div>

                <div class="col-12 text-left">
                    <h5>${appDesc}</h5>
                </div>

                <div class="col-12 text-left">
                    <label>${appPrice}</label>
                </div>

                <div class="col-12 text-left">
                    <label>${appCompName}</label>
                </div>
            </div>`
}