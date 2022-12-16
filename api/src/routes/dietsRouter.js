const { Router } = require('express');
const router = Router();
const { saveInDb } = require('../controllers/dietsControllers');



router.get('/', async (req, res) => {
    try {
        const diets = await saveInDb();
        res.status(200).send(diets);
    } catch (error) {
        res.status(400).send(error.message);
    };
});



module.exports = router;