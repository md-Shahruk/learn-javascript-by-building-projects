let recipes = [
            {
                id: 1,
                title: "Classic Pancakes",
                description: "Fluffy and delicious pancakes perfect for breakfast.",
                ingredients: [
                    "1 cup all-purpose flour",
                    "2 tablespoons sugar",
                    "2 teaspoons baking powder",
                    "1/2 teaspoon salt",
                    "1 cup milk",
                    "1 large egg",
                    "2 tablespoons melted butter"
                ],
                instructions: [
                    "Mix dry ingredients in a bowl",
                    "In another bowl, mix wet ingredients",
                    "Combine wet and dry ingredients, stir until just combined",
                    "Heat a lightly oiled griddle over medium-high heat",
                    "Pour batter onto the griddle, cook until bubbles form and edges are dry",
                    "Flip and cook until browned on the other side"
                ]
            },
            {
                id: 2,
                title: "Vegetable Stir Fry",
                description: "Quick and healthy vegetable stir fry with a savory sauce.",
                ingredients: [
                    "2 cups mixed vegetables (bell peppers, broccoli, carrots)",
                    "2 tablespoons vegetable oil",
                    "2 cloves garlic, minced",
                    "1 tablespoon soy sauce",
                    "1 teaspoon sesame oil",
                    "Salt and pepper to taste"
                ],
                instructions: [
                    "Heat oil in a large pan or wok over high heat",
                    "Add garlic and stir for 30 seconds",
                    "Add vegetables and stir fry for 4-5 minutes until crisp-tender",
                    "Add soy sauce and sesame oil, stir to combine",
                    "Season with salt and pepper",
                    "Serve hot with rice or noodles"
                ]
            }
        ];

/*
1: Add Recipe Categories
2: Implement Recipe Editing
3: Add Recipe Images
4: Add Favorites Feature
5: Add Recipe Ratings
6: Implement Recipe Sharing
7: Add Meal Planning

*/
const recipeList = document.getElementById('recipeList');
const recipeModal = document.getElementById('recipeModal');
const recipeDetails = document.getElementById('recipeDetails');
const closeModal = document.getElementById('closeModal');
const addRecipeBtn = document.getElementById('addRecipeBtn');
const viewAllBtn = document.getElementById('viewAllBtn');
const addRecipeModal = document.getElementById('addRecipeModal');
const closeAddModal = document.getElementById('closeAddModal');
const recipeForm = document.getElementById('recipeForm');
const searchInput = document.getElementById('searchInput');


function displayRecipes(recipesTodisplay){
    recipeList.innerHTML = '';

    if(recipesTodisplay.length === 0){
        recipeList.innerHTML = '<p>Add some recipe first.</p>';
        return;
    }

    recipesTodisplay.forEach(recipe =>{
        const recipeCard = document.createElement('div');
        recipeCard.className = 'recipe-card';
        recipeCard.innerHTML = `
         <div class="recipe-image">Recipe Image</div>
            <div class="recipe-content">
                <h3 class="recipe-title">${recipe.title}</h3>
                <p class="recipe-description">${recipe.description}</p>
                <button class="view-recipe" data-id="${recipe.id}">View Recipe</button>
            </div>
        `;
        recipeList.appendChild(recipeCard);
    });

}

document.addEventListener('DOMContentLoaded', function(){
    displayRecipes(recipes);

});