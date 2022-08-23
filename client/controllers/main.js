import {getAllApps, getAppsByName, deleteApp} from '../services/service.js'

document.addEventListener("DOMContentLoaded", () => {
  const apps = getAllApps();

  showAllApps(apps);

  document.getElementById("searchBar").addEventListener("input", (event) => {
    const searched = event.target.value;

    const filtered = getAppsByName(searched);

    showAllApps(filtered);
  });
});

const showAllApps = (apps) => {
  const tag = apps.map((app) => createAppRow(app)).join("");
  document.getElementById("appsContainer").innerHTML = tag;
};

const createAppRow = ({id, imageUrl, name, price, desc, companyName}) => {
  let imagePositon;

  if (imageUrl === "") {
    imagePositon = "../images/Help.png";
  } else {
    imagePositon = `../images/${id}/${imageUrl}`;
  }

  if (companyName === "") {
    comp = "This app does not have a company";
  }

  if (desc === "") {
    desc = "This app does not have description";
  }

  return `
    <div class="col-3 float-left row">
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
                <h5>${desc}</h5>
            </div>
            <div class="col-12 text-left">
                <label>${price}$</label>
            </div>
            <div class="col-12 text-left">
                <label>${companyName}</label>
            </div>
        </div>

        <div class="col-4 row">
            <div class="col-12 text-center">
                <button class="btn btn-danger" onClick ="deleteAppFromList(${id})">Delete</button>
            </div>
        </div>
    </div>`;
};

const deleteAppFromList = (id) => {
  deleteApp(id)
  showAllApps(apps)
}
