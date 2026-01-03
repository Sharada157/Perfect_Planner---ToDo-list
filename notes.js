/* ===============================
   NOTES DATA
================================ */

let subjects = {
  "AI / ML": [],
  "Operating Systems": [],
  "Cloud Computing": []
};

let currentSubject = "AI / ML";
let editingIndex = null;

/* ===============================
   INITIAL LOAD
================================ */

window.onload = function () {
  renderSubjects();
  selectSubjectByName(currentSubject);
};

/* ===============================
   SUBJECT FUNCTIONS
================================ */

function renderSubjects() {
  const list = document.getElementById("subjectList");
  list.innerHTML = "";

  Object.keys(subjects).forEach(subject => {
    const li = document.createElement("li");
    li.className = "list-group-item subject-item";
    li.innerText = subject;
    li.onclick = () => selectSubjectByName(subject);
    list.appendChild(li);
  });
}

function selectSubjectByName(subject) {
  currentSubject = subject;

  document.querySelectorAll(".subject-item")
    .forEach(item => {
      item.classList.toggle("active", item.innerText === subject);
    });

  document.getElementById("currentSubjectTitle").innerText =
    subject + " Notes";

  renderNotes();
}

function addSubject() {
  const name = prompt("Enter subject name:");
  if (!name) return;

  if (subjects[name]) {
    alert("Subject already exists");
    return;
  }

  subjects[name] = [];
  renderSubjects();
}

/* ===============================
   NOTES FUNCTIONS
================================ */

function showNoteForm() {
  document.getElementById("noteForm").classList.remove("d-none");
  document.getElementById("noteTitle").value = "";
  document.getElementById("noteContent").value = "";
  editingIndex = null;
}

function hideNoteForm() {
  document.getElementById("noteForm").classList.add("d-none");
}

function saveNote() {
  const title = document.getElementById("noteTitle").value.trim();
  const content = document.getElementById("noteContent").value.trim();

  if (!title || !content) return;

  if (editingIndex !== null) {
    subjects[currentSubject][editingIndex] = { title, content };
  } else {
    subjects[currentSubject].push({ title, content });
  }

  hideNoteForm();
  renderNotes();
}

function editNote(index) {
  const note = subjects[currentSubject][index];
  document.getElementById("noteTitle").value = note.title;
  document.getElementById("noteContent").value = note.content;
  editingIndex = index;
  showNoteForm();
}

function deleteNote(index) {
  subjects[currentSubject].splice(index, 1);
  renderNotes();
}

function renderNotes() {
  const container = document.getElementById("notesList");
  container.innerHTML = "";

  subjects[currentSubject].forEach((note, index) => {
    const card = document.createElement("div");
    card.className = "card mb-3";

    card.innerHTML = `
      <div class="card-body">
        <div class="d-flex justify-content-between">
          <h6>${note.title}</h6>
          <div>
            <button class="btn btn-sm btn-outline-secondary"
              onclick="editNote(${index})">Edit</button>
            <button class="btn btn-sm btn-outline-danger"
              onclick="deleteNote(${index})">Delete</button>
          </div>
        </div>
        <p class="mt-2">${note.content}</p>
      </div>
    `;

    container.appendChild(card);
  });
}
