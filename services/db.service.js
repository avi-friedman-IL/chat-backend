import { MongoClient } from "mongodb"
import { config } from '../config/index.js'

export const dbService = {
    getCollection,
}

var dbConn = null

async function getCollection(name) {
    try {
        const db = await _connect()
        const collection = await db.collection(name)
        return collection
    } catch (err) {
        console.error('Cannot connect to DB', err)
        throw err
    }
}

async function _connect() {
    if (dbConn) return dbConn
    try {
        const client = await MongoClient.connect(config.dbURL)
        const db = client.db(config.dbName)
        dbConn = db
        return db
    } catch (err) {
        console.error('Cannot connect to DB', err)
        throw err
    }
}

