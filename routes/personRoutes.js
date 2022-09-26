const router = require('express').Router();

const Person = require('../models/Person');



// Rotas da API
router.post('/', async (req, res) => {
    const { name, salary, approved } = req.body;

    if (!name) {
        res.status(422).json({ error: 'O nome é obrigatorio!' })
    }

    const person = {
        name,
        salary,
        approved
    }

    try {
        await Person.create(person)

        res.status(201).json({ message: 'Pessoa inserida no sistema com sucesso!' });
    } catch (error) {
        res.status(500).json({ erro: error });
    }
});

router.get('/', async (req, res) => {
    try {
        const person = await Person.find();

        res.status(200).json(person);
    } catch (error) {
        res.status(500).json({ erro: error });
    }
})

router.get('/:id', async (req, res) => {
    const id = req.params.id

    try {
        const person = await Person.findById(id)

        if (!person) {
            res.status(422).json({ erro: "Usuario não encontrado" });
            return;
        }

        res.status(200).json(person)
    } catch (error) {
        res.status(500).json({ erro: error });
    }
})

router.patch('/:id', async (req, res) => {
    const id = req.params.id

    const { name, salary, approved } = req.body;

    const person = {
        name,
        salary,
        approved,
    }

    try {
        const updatedPerson = await Person.updateOne({ _id: id }, person)

        if (updatedPerson.matchedCount === 0) {
            res.status(422).json({ erro: "Usuario não encontrado" });
            return;
        }

        res.status(200).json(person)
    } catch (error) {
        res.status(500).json({ erro: error });
    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id

    
    try {
        const person = await Person.deleteOne({ _id: id})
        
        if (person.deletedCount === 0) {
            res.status(422).json({ erro: "Usuario não encontrado" });
            return;
        }

        res.status(200).json({message: `Usuario deletado`})
    } catch (error) {
        res.status(500).json({ erro: error });

    }
})

module.exports = router;
