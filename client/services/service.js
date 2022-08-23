import { getApps, editApps, getNextId } from "../server/server.js"

const getAppsByName = (filter) => {
    const filtered = getApps().filter(app => app.name.toUpperCase().includes(filter.toUpperCase()))
    return filtered
}

const getAllApps = () => {
    return getApps();
}

const deleteApp = (id) => {
    const apps = getApps()

    const index = apps.findIndex(app => parseInt(app.id) === id)
    apps.splice(index,1)
    editApps(apps)
}

const addApp = (values) => {
    const apps = getApps()

    const app = {
        id: getNextId(),
        imageUrl: values[0],
        name: values[1],
        price: values[2],
        desc: values[3],
        companyName: values[4]
    }
    apps.push(app);
    editApps(apps)
}

export {getAppsByName, getAllApps, deleteApp, addApp}