const { Router } = require('express');
const { getData, getByName, getById, postRecipe } = require('../controllers/recipesControllers');
const router = Router();



router.get('/', async (req, res) => {
    const { name } = req.query;
    const recipes = await getData();
    try {
        if (!name) {
            res.status(200).send(recipes);
        } else {
            const recipe = await getByName(recipes, name);
            recipe.length !== 0
                ? res.status(200).send(recipe)
                : res.status(404).send({ error: "Recipe not found" });
        };
    } catch (error) {
        res.status(404).send(error.message);
    };
});
/*-----------------------------------------------------------------------*/
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const recipe = await getById(id);
        recipe
            ? res.status(200).send(recipe)
            : res.status(404).send({ error: "Id not found" });
    } catch (error) {
        res.status(404).send(error.message);
    };
});
/*-----------------------------------------------------------------------*/
router.post('/', async (req, res) => {
    const { name, summary, healthScore, steps, image, diet } = req.body;
    try {
        const post = await postRecipe(name, summary, healthScore, steps, image, diet);
        res.status(200).send(post);
    } catch (error) {
        res.status(400).send(error.message);
    };
});



module.exports = router;