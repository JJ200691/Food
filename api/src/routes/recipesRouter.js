const { Router } = require('express');
const { getData, getByName, getById } = require('../controllers/recipesControllers');
const router = Router();



router.get('/', async (req, res) => {
    const { name } = req.query;
    const recipes = await getData();
    try {
        if (!name) {
            res.status(200).send(recipes);
        } else {
            const recipe = await getByName(recipes, name);
            res.status(200).send(recipe);
        };
    } catch (error) {
        res.status(400).send(error.message);
    };
});
/*-----------------------------------------------------------------------*/
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const recipe = await getById(id);
        res.status(200).send(recipe);
    } catch (error) {
        res.status(400).send(error.message);
    };
});
/*-----------------------------------------------------------------------*/


module.exports = router;