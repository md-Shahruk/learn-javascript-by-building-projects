const noteTitle = document.getElementById("note-title");
const noteContent = document.getElementById("note-content");
const addBtn = document.getElementById("add-note");
const notesContainer = document.getElementById("notes-container");



let notes = [];
function addNote() {
  const title = noteTitle.value.trim();
  const content = noteContent.value.trim();

  if (title === "" || content === "") {
    alert("Fill up title  and content.");
    return;
  }

  const note = {
    id: Date.now(),
    title: title,
    content: content,
  };

  notes.push(note);
  noteTitle.value = "";
  noteContent.value = "";
  displayNoteContent();
}

function displayNoteContent() {
  notesContainer.innerHTML = "";

  notes.forEach((note) => {
    const noteElement = document.createElement("div");
    noteElement.className = "note";
    noteElement.innerHTML = `
          <h3>${note.title}</h3>
          <p>${note.content}</p>
          <button class="delete-btn" data-id="${note.id}">Delete</button>
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
}


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