import {Request, Response} from 'express'
import Database from '../db'
import DateFormat from './DateFormatController'

const collection = Database.db.collection("records")

class Record {

    public static newRecord(req: Request, page: string) {
        const date = DateFormat.getDateTime()
        const message = `${req.params.record} has visited page: ${page}`
        Database.client.connect().then(result => {
            collection.insertOne({record: message, date: date})
        }).catch(err => console.log(err))
    }
    public static allRecords() {
        return Database.client.connect().then(() => {
           return collection.find().toArray()
        }).then (result => result)
        .catch(err => console.log("Error: ", err))
    }

}

export default Record;