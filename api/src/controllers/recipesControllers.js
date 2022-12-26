const axios = require('axios');
const { Recipe, Diet } = require('../db');
const { API_KEY } = process.env;
const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`;



const getApiData = async () => {
    const apiGet = await axios.get(apiUrl, {
        headers: {
            "accept-encoding": "*",
        },
    });
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
                    steps: el.step,
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
const getByName = async (data, name) => {
    const recipe = data.filter(el => el.name.toLowerCase().includes(name.toLowerCase()));
    return recipe;
};
/*-----------------------------------------------------------------------*/
const getById = async (id) => {
    if (id.length <= 6) {
        const idNum = parseInt(id);
        const apiGet = await getApiData();
        const apiData = apiGet.find(el => el.id === idNum);
        if (apiData) {
            const apiInfo = {
                id: apiData.id,
                name: apiData.name,
                summary: apiData.summary,
                healthScore: apiData.healthScore,
                image: apiData.image,
                steps: apiData.steps,
            };
            return apiInfo;
        };
    } else {
        const dbData = await Recipe.findByPk(id, {
            include: {
                model: Diet,
                attributes: ['name'],
                through: { attributes: [] },
            },
        });
        return dbData;
    };
};
/*-----------------------------------------------------------------------*/
const postRecipe = async (name, summary, healthScore, steps, image, diet) => {
    const newRecipe = await Recipe.create({
        name,
        summary,
        healthScore,
        steps,
        image,
    });
    const dietDb = await Diet.findOrCreate({
        where: {
            name: diet,
        }
    });
    await newRecipe.addDiets(dietDb);
    return "Recipe's created successfully!!!";
};
// const tempDb = await Temperament.findAll({
//     where: { name: temperament },
// });
// if (tempDb.length !== 0) {
//     newDog.addTemperament(tempDb);
// } else {
//     const tempDbCreate = await Temperament.create({
//         name: temperament
//     });
//     newDog.addTemperament(tempDbCreate);
// };



module.exports = { getData, getByName, getById, postRecipe };