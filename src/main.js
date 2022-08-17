const getData = () => {
  if (localStorage.getItem("applications") == null) {
    localStorage.setItem("applications", JSON.stringify(applications));
    localStorage.setItem("id", id);
  }
  return JSON.parse(localStorage.getItem("applications"));
};

const editFile = (data) => {
    localStorage.setItem('applications', JSON.stringify(data))
}

let apps;
document.addEventListener("DOMContentLoaded", () => {
  apps = getData();

  showAllApps(apps);

    document.getElementById("searchBar").addEventListener("input", (event) => {
    const searched = event.target.value;

    const filtered = apps.filter((app) => app.name.toLowerCase().includes(searched.toLowerCase()));

    showAllApps(filtered);
  });
});

const showAllApps = (apps) => {
  const tag = apps.map((app) => createAppRow(app)).join("");
  document.getElementById("appsContainer").innerHTML = tag;
};

const createAppRow = ({id, imageUrl, name, price, desc, companyName}) => {
  debugger
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
            <img src="${imagePositon}" style="width: 100px">
        </div>
    </div>

    <div class="col-9 float-right row">
        <div class="col-6 row">
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

        <div class="col-6 row">
            <div class="col-12 text-center">
                <button class="btn btn-danger" onClick ="deleteApp(${id})">Delete</button>
            </div>
        </div>
    </div>`;
};

const deleteApp = (id) => {
    const index = apps.findIndex(app => parseInt(app.id) === id)
    apps.splice(index,1)
    editFile(apps)
    showAllApps(apps)
}
