import express from 'express'
import { getPeopleCount, addPeople } from '../db'
let router = express.Router()

router.get('/', async (_, res) => {
    const count = await getPeopleCount()
    res.status(200).send({count})
})

router.post('/', async (req, res) => {
    const inscription = req.body
    if(!(inscription.name && inscription.phone && inscription.count)) {
        res.status(400).send({error: 'Invalid parameters'})
    }
    try {
        await addPeople(inscription)
        res.status(200).send()
    }
    catch(err) {
        const code = err.message === 'This inscription already exists' 
            || err.message === 'Max capacity overlaped' ? 400 : 500
        res.status(code).send({error: err.message})
    }
    
})

export default router