const noteTitle = document.getElementById("note-title");
const noteContent = document.getElementById("note-content");
const addBtn = document.getElementById("add-note");
const notesContainer = document.getElementById("notes-container");



let notes = [];
let editNoteId = null;

// Add note function
function addNote() {
  const title = noteTitle.value.trim();
  const content = noteContent.value.trim();

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
        content:content
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
  };

  notes.push(note);
    
  }

  noteTitle.value = "";
  noteContent.value = "";
  displayNoteContent();
}


// notes display function
function displayNoteContent() {
  notesContainer.innerHTML = "";

  notes.forEach((note) => {
    const noteElement = document.createElement("div");
    noteElement.className = "note";
    noteElement.innerHTML = `
           <div class="note-header">
                <h3>${note.title}</h3>
                
                <div class="note-buttons">
                    <button class="edit-btn" data-id="${note.id}">Edit</button>
                    <button class="delete-btn" data-id="${note.id}">Delete</button>
                </div>
            </div>
            <p>${note.content}</p>
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

// Edit note function 
function editNote(id){
 const noteToEdit  = notes.find(note=> note.id === id);

 if(!noteToEdit) return;

 noteTitle.value = noteToEdit.title;
 noteContent.value = noteToEdit.content;

 editNoteId = id;
 addBtn.textContent = "Update Note";
 addBtn.style.backgroundColor = "#4192bb";

 // Go to addNote function and here apply edit not logic
}

// delete notes function
function deleteNote(id){
    notes = notes.filter(note=> note.id !== id);
    displayNoteContent();
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
});