const { Router } = require('express');
const recipesRouter = require('../routes/recipesRouter');
const dietsRouter = require('../routes/dietsRouter');
const router = Router();



router.use('/recipes', recipesRouter);
router.use('/diets', dietsRouter);



module.exports = router;
