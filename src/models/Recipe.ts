import mongoose from 'mongoose';

const IngredientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    quantity: { type: String, required: true },
});

const nutritionSchema = new mongoose.Schema({
    calories: { type: Number, required: true, default: 10 },
    protein: { type: String, required: true, default: 0 },
    carbohydrates: { type: String, required: true, default: 0 },
    fat: { type: String, required: true, default: 0 },
});

const RecipeSchema = new mongoose.Schema({
    user_id: { type: Number, required: true},
    recipe_id: { type: Number , unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    prep_time: { type: Number, required: true },
    cook_time: { type: Number, required: true },
    servings: { type: Number, required: true, default: 1 },
    difficulty: { type: String, required: true },
    image_url: { type: String, required: true, default: "https://www.foodiesfeed.com/wp-content/uploads/2023/06/burger-with-melted-cheese.jpg" },
    ingredients: { type: [IngredientSchema], required: true },
    instructions: { type: [String], required: true },
    nutrition: { type: nutritionSchema, required: false },
    tags: { type: [String], required: true, default: ["Food"] },
}, { collection: 'Recipes' });

// Pre-save hook to handle recipe_id generation
RecipeSchema.pre('save', async function (next) {
    if (this.isNew) {
        try {
            const maxRecipe = await this.constructor.findOne().sort({ recipe_id: -1 });
            this.recipe_id = maxRecipe ? maxRecipe.recipe_id + 1 : 1; // Start from 1 if no recipe exists
        } catch (error) {
            return next(error); // Pass the error to the next middleware
        }
    }
    next();
});
// Avoid OverwriteModelError by checking if the model is already defined
const Recipe = mongoose.models.Recipes || mongoose.model('Recipes', RecipeSchema);

export default Recipe;
