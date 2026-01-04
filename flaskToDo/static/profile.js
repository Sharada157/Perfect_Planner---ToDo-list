// Load saved profile
window.onload = () => {
  document.getElementById("email").value = localStorage.getItem("email") || "";
  document.getElementById("department").value = localStorage.getItem("department") || "";
  document.getElementById("semester").value = localStorage.getItem("semester") || "";
};

// Save profile
function saveProfile() {
  localStorage.setItem("email", document.getElementById("email").value);
  localStorage.setItem("department", document.getElementById("department").value);
  localStorage.setItem("semester", document.getElementById("semester").value);

  alert("Profile saved successfully");
}
