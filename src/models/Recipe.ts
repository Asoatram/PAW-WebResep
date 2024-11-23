import mongoose from 'mongoose';

const IngredientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    quantity: { type: String, required: true },
});

const RecipeSchema = new mongoose.Schema({
    recipe_id: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    prep_time: { type: Number, required: true }, // In minutes
    cook_time: { type: Number, required: true }, // In minutes
    servings: { type: Number, required: true },
    difficulty: { type: String, required: true },
    image_url: { type: String, required: true },
    ingredients: { type: [IngredientSchema], required: true },
    instructions: { type: [String], required: true },
    nutrition: {
        calories: { type: Number, required: true },
        protein: { type: String, required: true },
        carbohydrates: { type: String, required: true },
        fat: { type: String, required: true },
    },
    tags: { type: [String], required: true },
}, { collection: 'Recipes' });

// Avoid OverwriteModelError by checking if the model is already defined
const Recipe = mongoose.models.Recipes || mongoose.model('Recipes', RecipeSchema);

export default Recipe;
