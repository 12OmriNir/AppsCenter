const getAppsByName = async(filter) => {
    const response = await fetch(`http://localhost:3000/api/appsCenter/${filter}`, {method: "GET",headers: { "content-type": "application/json" }})
    const data = await response.json()
    return data
}

const getAllApps = async() => { 
    try{
        const response = await fetch("http://localhost:3000/api/appsCenter", {method: "GET",headers: { "content-type": "application/json" }})
        const data = await response.json()
        return data
    }catch(e){
        console.log('error', e)
    }
}

const deleteApp = async(id) => {
    try{
        await fetch(`http://localhost:3000/api/appsCenter/${id}`, {method: "DELETE", redirect: 'follow'})
    }catch(e){
        console.log('error', e)
    }
}

const addApp = async(values) => {
    console.log(values)
    const myHeaders = new Headers();
    myHeaders.append("content-Type", "application/json");

    const raw = JSON.stringify({
        imgurl: values[0],
        name: values[1],
        price: values[2],
        description: values[3],
        companyname: values[4]
    })

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
    };


    try{
        await fetch('http://localhost:3000/api/appsCenter', requestOptions)
    }
    catch(e){
        console.log('error', e)
    }
}

export {getAppsByName, getAllApps, deleteApp, addApp}