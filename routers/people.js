import express from 'express'
import { getPeopleCount, addPeople, getMaxCapacity } from '../db'
let router = express.Router()

router.get('/', async (_, res) => {
    const count = await getPeopleCount()
    res.status(200).send({count})
})

router.get('/capacity', async (_, res) => {
    const capacity = await getMaxCapacity()
    res.status(200).send({capacity})
});

router.post('/', async (req, res) => {
    try {
        const inscription = req.body
        if(!(inscription.name && inscription.phone && inscription.count)) {
            res.status(400).send({error: 'Cal omplir tots els camps per formular la inscripció.'})
        }
        else {
            await addPeople(inscription)
            res.status(200).send()
        }
    }
    catch(err) {
        const code = err.message === 'Ja s\'ha realitzat una inscripció amb aquest telèfon.' 
            || err.message === 'S\'ha assolit la capacitat màxima.' ? 400 : 500
        res.status(code).send({error: err.message})
    }
    
})

export default router