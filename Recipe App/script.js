 import { recipes } from "./data/recipe_data.js";

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



document.addEventListener('DOMContentLoaded', function(){
    displayRecipes(recipes);
    
    
    addRecipeBtn.addEventListener('click', function(){
       addRecipeModal.style.display = 'block';
    });
    recipeForm.addEventListener('submit', addNewRecipe);

    closeAddModal.addEventListener('click',function(){
        addRecipeModal.style.display = 'none';
    })

     closeModal.addEventListener('click', function() {
                recipeModal.style.display = 'none';
            });
    
   searchInput.addEventListener('input', function(){
    searchRecipes(this.value);  
});

});



// display recipes function
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

    document.querySelectorAll('.view-recipe').forEach(button =>{
        button.addEventListener('click', function(){
            const recipeId = parseInt(this.getAttribute('data-id'));
            showdetails(recipeId);

        });
    });

}

// add new recipe function
function addNewRecipe(event){
  
  event.preventDefault();

  // take value from form
  const title =  document.getElementById('recipeTitle').value;
  const description = document.getElementById('recipeDescription').value;
  const ingredients = document.getElementById('recipeIngredients').value.split('\n').filter(line=> line.trim() != '');
  const instructions = document.getElementById('recipeInstructions').value.split('\n').filter(line=> line.trim() != '');

  if (!title || ! description || ingredients.length === 0 || instructions.length === 0){
    alert("Fill up all fields");
    return;
  } 

  const newRecipe ={
    id: recipes.length + 1,
    title: title,
    description: description,
    ingredients: ingredients,
    instructions: instructions,
  }

  recipes.push(newRecipe);

  displayRecipes(recipes);
  recipeForm.reset();

  addRecipeModal.style.display = 'none';
    

  alert('Recipe added successfully!');
      
}

//showdetails recipe

function showdetails(recipeId){
   const recipe = recipes.find(f=> f.id === recipeId);
   if(!recipe) return;

   recipeDetails.innerHTML = `
    <h2>${recipe.title}</h2>
                <p>${recipe.description}</p>
                
                <div class="ingredients-list">
                    <h3>Ingredients</h3>
                    <ul>
                        ${recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="instructions-list">
                    <h3>Instructions</h3>
                    <ol>
                        ${recipe.instructions.map(instruction => `<li>${instruction}</li>`).join('')}
                    </ol>
                </div>
   `;

   recipeModal.style.display = 'flex';
}

function searchRecipes(value) {
    const filterRecipes = recipes.filter(recipe => 
        recipe.title.toLowerCase().includes(value.toLowerCase()) ||
        recipe.description.toLowerCase().includes(value.toLowerCase()) ||
        recipe.ingredients.some(ingredient => 
            ingredient.toLowerCase().includes(value.toLowerCase())
        )
    );
    
    displayRecipes(filterRecipes);
}