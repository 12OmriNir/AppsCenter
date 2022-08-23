const { executeQuery } = require("./database")

const getAppsFromDB = async() => {
    const res = await executeQuery('SELECT * FROM applications')
    return res.rows;
}

const getAppsByNameFromDB = async(tag) => {
    const res = await executeQuery(`SELECT * FROM applications WHERE name LIKE '%${tag}%'`)
    return res.rows;
}

const addAppToTheDB = async(values) => {
    await executeQuery('INSERT INTO applications (id, imgUrl, name, price, description, companyname, createdat)VALUES($1,$2, $3, $4, $5, $6, $7)', values)
}

const deleteAppFromDB = async(id) => {
    await executeQuery(`DELETE FROM applications WHERE id = '${id}'`)
}

module.exports = {
    getAppsFromDB,
    getAppsByNameFromDB,
    addAppToTheDB,
    deleteAppFromDB
}