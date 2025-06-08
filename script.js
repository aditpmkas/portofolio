const toggleBtn = document.getElementById("darkModeToggle");
const body = document.body;

// Check saved theme preference
if (localStorage.getItem("theme") === "light") {
  body.classList.remove("dark-mode");
  toggleBtn.textContent = "🌙";
} else {
  body.classList.add("dark-mode");
  toggleBtn.textContent = "☀️";
}

toggleBtn.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
  const isDark = body.classList.contains("dark-mode");
  toggleBtn.textContent = isDark ? "☀️" : "🌙";
  localStorage.setItem("theme", isDark ? "dark" : "light");
});
