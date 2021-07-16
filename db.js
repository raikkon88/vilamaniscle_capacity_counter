import low from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'
import logger from './logger'

const maxCapacity = process.env.APP_MAX_CAPACITY || 10

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
    return db.get('people').value().reduce((acc, inscription) => {
        acc += inscription.count
        return acc
    }, 0)
}

export const addPeople = async (inscription) => {
    const count = await getPeopleCount()
    const capacity = await getMaxCapacity()
    if(count + inscription.count > capacity) {
        throw new Error('Max capacity overlaped')
    }
    const people = db.get('people').value()
    const exists = people.find(p => p.name === inscription.name || p.phone === inscription.phone)
    if(exists) 
        throw new Error('This inscription already exists')
    db.get('people').value().push(inscription)
    await db.get('people').write()
}
