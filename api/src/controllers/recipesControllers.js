const axios = require('axios');
const { Recipe, Diet } = require('../db');
const { API_KEY } = process.env;
const apiUrl = 'https://api.spoonacular.com/recipes/complexSearch&number=100&addRecipeInformation=true';



const getApiData = async () => {
    const apiGet = await axios.get(`${apiUrl}?api_key=${API_KEY}`);
    const apiData = apiGet.data.results.map(el => {
        return {
            id: el.id,
            name: el.title,
            summary: el.summary,
            healthScore: el.healthScore,
            image: el.image,
            steps: el.analyzedInstructions[0]?.steps.map(el => {
                return {
                    number: el.number,
                    steps: el.steps,
                };
            }),
        };
    });
    return apiData;
};
/*-----------------------------------------------------------------------*/
const getDbData = async () => {
    const dbData = await Recipe.findAll({
        include: {
            model: Diet,
            attributes: ['name'],
            through: {
                attributes: []
            },
        },
    });
    return dbData;
};
/*-----------------------------------------------------------------------*/
const getData = async () => {
    const apiData = await getApiData();
    const dbData = await getDbData();
    return [...apiData, ...dbData];
};
/*-----------------------------------------------------------------------*/
const getByName = async (name) => {
    const data = await getData();
    const recipe = await data.find(el => el.name.toLowerCase() === name.toLowerCase());
    return recipe;
};
/*-----------------------------------------------------------------------*/



module.exports = { getData, getByName };