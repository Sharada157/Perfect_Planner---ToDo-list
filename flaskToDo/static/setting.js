// Load settings
window.onload = () => {
  document.getElementById("theme").value = localStorage.getItem("theme") || "light";
  document.getElementById("notifications").checked =
    localStorage.getItem("notifications") === "true";
  document.getElementById("reminderTime").value =
    localStorage.getItem("reminderTime") || "";
};

// Save settings
function saveSettings() {
  localStorage.setItem("theme", document.getElementById("theme").value);
  localStorage.setItem("notifications", document.getElementById("notifications").checked);
  localStorage.setItem("reminderTime", document.getElementById("reminderTime").value);

  alert("Settings saved");
}

// Reset everything
function resetData() {
  if (confirm("This will clear all saved data. Continue?")) {
    localStorage.clear();
    location.reload();
  }
}
