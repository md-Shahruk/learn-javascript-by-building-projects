const noteTitle = document.getElementById("note-title");
const noteContent = document.getElementById("note-content");
const addBtn = document.getElementById("add-note");
const notesContainer = document.getElementById("notes-container");

const noteCategory = document.getElementById("note-category");
const newCategory =  document.getElementById("new-category");

const searchInput = document.getElementById("search-notes");
const clearSearch = document.getElementById("clear-search");







/*
** implement edit button
** implement localstorage
** note category
** Date Stamps
** Search note by title or content
*/


let notes = [];
let editNoteId = null;
let currentSearch = "";

// Search note by title or content
function searchNotes(search){
  if(!search.trim()){
    return notes;
  }

  const lowerSearchItem = search.toLowerCase();

  return notes.filter(note => 
    note.title.toLowerCase().includes(lowerSearchItem) || 
    note.content.toLowerCase().includes(lowerSearchItem)
  );
  

}


// Add note function
function addNote() {
  const title = noteTitle.value.trim();
  const content = noteContent.value.trim();
  let category = noteCategory.value;
  const now = new Date();

  if (newCategory.value.trim() !== ''){
    category = newCategory.value.trim().toLowerCase();
  }


  if (title === "" || content === "") {
    alert("Fill up title  and content.");
    return;
  }

// Edit note functionality add
  if(editNoteId){
    const editNoteIndex = notes.findIndex(note=> note.id === editNoteId);
    if(editNoteIndex !== -1){
      notes[editNoteIndex] = {
        id:editNoteId,
        title:title,
        content:content,
        category:category,
        createAt:notes[editNoteIndex].createAt,
        updateAt:now
      }
    }
    editNoteId = null;
    addBtn.textContent = "Add Note";
    addBtn.style.backgroundColor = "#c43109";
  }else{
    
    const note = {
    id: Date.now(),
    title: title,
    content: content,
    category:category,
    createAt:now,
    updateAt:now
  };

  notes.push(note);
    
  }

  noteTitle.value = "";
  noteContent.value = "";
  noteCategory.value = "work";
  category.value = '';
  displayNoteContent();
  saveToLocalStorage();
}


// notes display function
function displayNoteContent() {   
  notesContainer.innerHTML = "";
  let filterNotes = notes;

  if(currentSearch){
    filterNotes = searchNotes(currentSearch);
  }

  filterNotes.forEach((note) => {
    const noteElement = document.createElement("div"); 
    noteElement.className = "note";
    const createDate =  new Date(note.createAt).toLocaleString();
    const updateDate = new Date(note.updateAt).toLocaleDateString();

    const noteCharCount = note.content.length;
    noteElement.innerHTML = `
           <div class="note-header">
                <h3>${note.title} 
            <span class="category-badge">${note.category}</span>
        </h3>
                
                <div class="note-buttons">
                    <button class="edit-btn" data-id="${note.id}">Edit</button>
                    <button class="delete-btn" data-id="${note.id}">Delete</button>
                </div>
            </div>
            <p>${note.content}</p>
           <div class="note-char-counter">
                <small> ${noteCharCount}/100</small>
            </div>

            <div class="note-date">
                <small>📅 Created: ${createDate}</small>
                ${note.updateAt !== note.createAt ? 
                    `<small> | ✏️ Updated: ${updateDate}</small>` : ''}
            </div>
          `;
    notesContainer.appendChild(noteElement);
  });

  document.querySelectorAll('.delete-btn').forEach(button=>{
    // if I want to use arrow funciton
    button.addEventListener('click', (event)=>{
     const id = parseInt(event.currentTarget.getAttribute('data-id')); //event.target.dataset.id 
     deleteNote(id);
    });

//     button.addEventListener('click', function(){
//         const id = parseInt(this.getAttribute('data-id'));
//         deleteNote(id);
//     })

  });


  document.querySelectorAll('.edit-btn').forEach(button=>{
  button.addEventListener('click',function(){
    const id = parseInt(this.getAttribute('data-id'));
    editNote(id);
  })
 });
 
} 


// write a funciton save notes to local storage
function saveToLocalStorage(){
  localStorage.setItem('notesApp', JSON.stringify(notes));
 // console.log("Notes save to local storage.", notes.length);
  // now go to delete function and addNote function to call this function 
}

// load notes from localstorage
function loadNotesFromLocalStorage(){
  const savedNotes = localStorage.getItem('notesApp');
  if(savedNotes){
    notes = JSON.parse(savedNotes);
   // console.log("Notes loaded from localStorage.", notes.length);
    displayNoteContent();
    // now go to dom content loaded and call this function 
  }
}

// Edit note function 
function editNote(id){
 const noteToEdit  = notes.find(note=> note.id === id);

 if(!noteToEdit) return;

 noteTitle.value = noteToEdit.title;
 noteContent.value = noteToEdit.content;
 noteCategory.value = noteToEdit.category;

 editNoteId = id;
 addBtn.textContent = "Update Note";
 addBtn.style.backgroundColor = "#4192bb";

 // Go to addNote function and here apply edit not logic
}

// delete notes function
function deleteNote(id){
    notes = notes.filter(note=> note.id !== id);
    displayNoteContent();
    saveToLocalStorage();
}



// allow key to add notes 
document.addEventListener('DOMContentLoaded', function() {
    addBtn.addEventListener("click", addNote);
    
    // Enter key add
    noteContent.addEventListener('keydown', function(e){  // keypress → keydown
        if(e.key === 'Enter' && e.ctrlKey){
            addNote();
        }
    });

    // Search notes
    searchInput.addEventListener('input', function(e){
       currentSearch =  e.target.value;
       displayNoteContent();
    });

    clearSearch.addEventListener('click', function() {
        searchInput.value = "";
        currentSearch = "";
        displayNoteContent();
    });
    
    

    loadNotesFromLocalStorage();

    
});