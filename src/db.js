import low from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'
import logger from './logger'

const maxCapacity = parseInt(process.env.APP_MAX_CAPACITY) || 150
const baseModel = {
    people: [],
    maxCapacity 
}

let db

const DEFAULT_DB_NAME = process.env.DB_NAME || "db.json"
const DEFAULT_DB_FOLDER = process.env.DB_FOLDER || '/home/marc/Documents'

export const configureDb = (dbName, folderName) => {
    const name = dbName || DEFAULT_DB_NAME
    const folder = folderName || DEFAULT_DB_FOLDER
    db = low(new FileSync(folder + "/" + name))
    db.defaults(baseModel).write()
    logger.db("Connected " + folder + "/" + name)
}

export const getMaxCapacity = async () => {
    return db.get('maxCapacity').value()
}

export const getPeopleCount = async () => {
    const inscriptions = db.get('people').value()
    let count = 0
    for(const inscription of inscriptions) {
        count += inscription.count || 0
    }
    return count
}

export const addPeople = async (inscription) => {
    const count = await getPeopleCount()
    const capacity = await getMaxCapacity()
    if(count + inscription.count > capacity) {
        throw new Error('No ens queden prous places lliures.')
    }
    const people = db.get('people').value()
    const exists = people.find(p => p.phone === inscription.phone)
    if(exists) 
        throw new Error('Ja s\'ha realitzat una inscripció amb aquest telèfon.')
    db.get('people').value().push(inscription)
    await db.get('people').write()
}
