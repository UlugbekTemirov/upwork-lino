const navbarMenu = document.getElementById("menu");
const burgerMenu = document.getElementById("burger");
const headerMenu = document.getElementById("header");

// Open Close Navbar Menu on Click Burger
if (burgerMenu && navbarMenu) {
  burgerMenu.addEventListener("click", () => {
    burgerMenu.classList.toggle("is-active");
    navbarMenu.classList.toggle("is-active");
  });
}

// Close Navbar Menu on Click Menu Links
document.querySelectorAll(".menu-link").forEach((link) => {
  link.addEventListener("click", () => {
    burgerMenu.classList.remove("is-active");
    navbarMenu.classList.remove("is-active");
  });
});

// Change Header Background on Scrolling
window.addEventListener("scroll", () => {
  closeProfileDropdown();
  if (this.scrollY >= 85) {
    headerMenu.classList.add("on-scroll");
  } else {
    headerMenu.classList.remove("on-scroll");
  }
});

// Getting elements from DOM
const login = document.getElementById("login");
const explore = document.getElementById("explore");
const userProfile = document.getElementById("user-profile");
const profileDropdown = document.querySelector(".profile-dropdown");

// Get is_authenticated value from Local Storage to check if user logged in or not
const is_authenticated = localStorage.getItem("is_authenticated");

// Check if user logged in or not, If Yes show profile button, if no hide it
function checkAuthHandler(is_auth) {
  if (is_auth === "true") {
    login.style.display = "none";
    explore.style.display = "none";
    userProfile.style.display = "flex";
  } else {
    login.style.display = "block";
    explore.style.display = "block";
    userProfile.style.display = "none";
  }
}
checkAuthHandler(is_authenticated);

// Toggle profile dropdown box when profile button clicked
userProfile.addEventListener("click", () => {
  profileDropdown.classList.toggle("hidden");
});

// Close profile dropdown box when clicked outside of it
function closeDropdownOnOutsideClick() {
  const dropdown = document.querySelector(".parentBox");

  document.addEventListener("click", function (e) {
    const isOutside = dropdown.contains(e.target);
    if (!isOutside) {
      profileDropdown.classList.add("hidden");
    }
  });
}
closeDropdownOnOutsideClick();

// To close profile dropdown
function closeProfileDropdown() {
  profileDropdown.classList.add("hidden");
}

// Logout function
const logout = document.getElementById("logout");
logout.addEventListener("click", () => {
  localStorage.removeItem("is_authenticated");
  window.location.reload();
});

const avatar = document.getElementById("avatar");
const username = document.getElementById("username");

function setUsernameAndAva() {
  const profile = JSON.parse(localStorage.getItem("profiles"));
  let id = window.location.search.slice(11);
  const data = profile.filter((item) => item.id == id)[0];
  avatar.setAttribute("src", data?.image);
  username.innerText = data?.username;
}

setUsernameAndAva();

const listProfiles = document.getElementById("listProfiles");

function profileButtons(profile) {
  console.log(profile);
  return `<button onclick=redirect(${profile.id}) class="dropdownProfile">
  <img
    id="avatar"
    src=${profile.image}
    alt="random"
  />
  <h4 id="username">${profile.username}</h4>
</button>`;
}

function redirect(id) {
  window.location.href = `/?profileid=${id}`;
}

function setDropdownProfiles() {
  const profiles = JSON.parse(localStorage.getItem("profiles"));
  profiles.forEach(
    (profile) => (listProfiles.innerHTML += profileButtons(profile))
  );
}

setDropdownProfiles();
