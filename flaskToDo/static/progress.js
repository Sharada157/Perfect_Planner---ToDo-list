// -------------------------
// DATA (Later replace with backend / DB)
// -------------------------
const subjects = [
  {
    name: "Operating Systems",
    totalTopics: 10,
    completedTopics: 6,
    topics: [
      { name: "Process Management", done: true },
      { name: "CPU Scheduling", done: true },
      { name: "Deadlocks", done: false },
      { name: "Memory Management", done: false }
    ]
  },
  {
    name: "AI / ML",
    totalTopics: 8,
    completedTopics: 7,
    topics: [
      { name: "Regression", done: true },
      { name: "Classification", done: true }
    ]
  },
  {
    name: "Cloud Computing",
    totalTopics: 6,
    completedTopics: 3,
    topics: [
      { name: "Virtualization", done: false },
      { name: "Service Models", done: true }
    ]
  }
];

// -------------------------
// OVERALL CALCULATION
// -------------------------
let totalSubjects = subjects.length;
let totalCompleted = 0;
let totalTopics = 0;

subjects.forEach(sub => {
  totalCompleted += sub.completedTopics;
  totalTopics += sub.totalTopics;
});

let overallPercent = Math.round((totalCompleted / totalTopics) * 100);

// -------------------------
// UPDATE OVERALL SUMMARY
// -------------------------
document.getElementById("totalSubjects").innerText = totalSubjects;
document.getElementById("completedTopics").innerText =
  `${totalCompleted} / ${totalTopics}`;
document.getElementById("overallPercent").innerText =
  `${overallPercent}%`;

const statusEl = document.getElementById("overallStatus");

if (overallPercent >= 75) {
  statusEl.innerText = "On Track";
  statusEl.className = "status-on";
} else if (overallPercent >= 50) {
  statusEl.innerText = "Moderate";
  statusEl.className = "status-mid";
} else {
  statusEl.innerText = "Behind";
  statusEl.className = "status-behind";
}

// -------------------------
// SUBJECT-WISE PROGRESS
// -------------------------
const subjectContainer = document.getElementById("subjectProgress");

subjects.forEach(sub => {
  const percent = Math.round(
    (sub.completedTopics / sub.totalTopics) * 100
  );

  let statusClass =
    percent >= 75 ? "bg-success" :
    percent >= 50 ? "bg-warning" :
    "bg-danger";

  subjectContainer.innerHTML += `
    <div class="card progress-card p-3 mb-3">
      <h6>${sub.name}</h6>
      <div class="progress mb-2">
        <div class="progress-bar ${statusClass}"
             style="width: ${percent}%">
          ${percent}%
        </div>
      </div>
      <small>${sub.completedTopics} / ${sub.totalTopics} topics completed</small>
    </div>
  `;
});

// -------------------------
// TOPIC LIST
// -------------------------
const topicList = document.getElementById("topicList");

subjects.forEach(sub => {
  sub.topics.forEach(topic => {
    topicList.innerHTML += `
      <li class="list-group-item d-flex justify-content-between">
        <span class="${topic.done ? 'topic-completed' : ''}">
          ${sub.name} – ${topic.name}
        </span>
        <input type="checkbox" ${topic.done ? "checked" : ""} disabled />
      </li>
    `;
  });
});

// -------------------------
// BACKLOGS
// -------------------------
const backlogList = document.getElementById("backlogList");
let hasBacklog = false;

subjects.forEach(sub => {
  if (sub.completedTopics < sub.totalTopics / 2) {
    hasBacklog = true;
    backlogList.innerHTML += `<li>${sub.name} is falling behind</li>`;
  }
});

if (!hasBacklog) {
  backlogList.innerHTML = "<li>No critical backlogs 🎯</li>";
}
