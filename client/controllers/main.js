import {getAllApps, getAppsByName, deleteApp} from '../services/service.js'

document.addEventListener("DOMContentLoaded", () => {
  getAllApps().then(res => showApps(res))

  document.getElementById("searchBar").addEventListener("input", (event) => {
    const searched = event.target.value;
    getAppsByName(searched).then(res => showApps(res))
  });
});

const showApps = (apps) => {
  const tag = apps.map((app) => createAppRow(app)).join("");
  document.getElementById("appsContainer").innerHTML = tag;
};

const deleteAppFromList = (id) => {
  deleteApp(id)
  getAllApps().then(res => showApps(res))
}

const createAppRow = ({id, imageurl, name, price, description, companyname}) => {
  let imagePositon;

  if (imageurl === undefined || imageurl === null) {
    imagePositon = "../images/Help.png";
  } else {
    imagePositon = `../images/${id}/${imageurl}`;
  }

  if (companyname === undefined || companyname === null){
    companyname = "This app does not have a company";
  }

  if (description === undefined || description === null) {
    desc = "This app does not have description";
  }


  return `
    <div class="col-3 float-left row" style="margin-right: 40px;>
        <div class="col-12">
            <img src="${imagePositon}" style="width: 120px">
        </div>
    </div>

    <div class="col-9 float-right row">
        <div class="col-8 row">
            <div class="col-12 text-left">
                <h3>${name}</h3>
            </div>
            <div class="col-12 text-left">
                <h5>${description}</h5>
            </div>
            <div class="col-12 text-left">
                <label>${price}$</label>
            </div>
            <div class="col-12 text-left">
                <label>${companyname}</label>
            </div>
        </div>

        <div class="col-4 row">
            <div class="col-12 text-center">
                <button class="btn btn-danger" onClick ="deleteAppFromList(${id})">Delete</button>
            </div>
        </div>
    </div>`;
};


