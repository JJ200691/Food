const { Diet } = require('../db');



const saveInDb = async () => {
    const diets = ["gluten free", "dairy free", "paleolithic", "lacto ovo vegetarian", "primal", "whole 30", "fodmap friendly", "ketogenic", "pescatarian", "vegan"]
    diets.forEach(async el => {
        await Diet.findOrCreate({
            where: { name: el }
        });
    });
    const getDiets = await Diet.findAll();
    return getDiets.sort();
};



module.exports = { saveInDb };
