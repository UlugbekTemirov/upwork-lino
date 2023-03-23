const profiles = document.querySelectorAll("#profile");
const profilesDiv = document.querySelector(".profiles");
const editProfile = document.getElementById("editProfile");
const done = document.getElementById("done");
let addProfile = document.getElementById("addProfile");
let edit = document.getElementById("edit");

// Use DUMMY DATA to initialize first profile when user signs in
let DUMMY_DATA = [
  {
    id: 0,
    username: "Lorem",
    image: "./assets/randomProfilePicture.jpg",
  },
];

// Set DUMMY DATA profiles to Local Storage (To store all user data, Local storage is used as main storage)
function setLocalProfiles() {
  if (!localStorage.getItem("profiles")) {
    localStorage.setItem("profiles", JSON.stringify(DUMMY_DATA));
  } else {
    DUMMY_DATA = JSON.parse(localStorage.getItem("profiles"));
  }
}
setLocalProfiles();

// Redirect to clicked profile's account and Set as current profile to Local Storage
function clickedProfile(id) {
  const profile = DUMMY_DATA.filter((profile) => profile.id === id)[0];
  localStorage.setItem("currentProfile", JSON.stringify(profile));

  const cond = edit?.getAttribute("data-cond") ?? "remove";
  if (cond === "remove") window.location.href = `/?profileid=${profile.id}`;
}

// Create UI of profile account buttons in HTML
function profileButtons({ id, username, image }) {
  return `<button onclick="clickedProfile(${id})" id="profile" class="profile">
  <img src=${image} alt=${username} />
  <h3>${username}</h3>
</button>`;
}

// Make Row of Profiles UI
function makeProfileRow(data) {
  for (let i = 0; i < data.length; i++) {
    profilesDiv.innerHTML += profileButtons({ ...data[i] });
  }
}
makeProfileRow(DUMMY_DATA);

// To check if user profiles are more than 5 or not. If so disable AddProfile Button
function checkProfilesNumber() {
  const profiles = JSON.parse(localStorage.getItem("profiles"));
  addProfile = document.getElementById("addProfile");
  if (profiles.length >= 5) {
    if (addProfile) profilesDiv.removeChild(addProfile);
  } else {
    profilesDiv.innerHTML += `<a
    href="./add-profile.html"
    id="addProfile"
    class="profile add-profile"
  >
    <span class="icon icon-more"></span>
    <h3>Add Profile</h3>
  </a>`;
  }
}
checkProfilesNumber();

// Open Edit box when editProfile button pressed
done.style.display = "none";

// Add edit profile button inside of Profile buttons
editProfile.addEventListener("click", () => {
  editProfile.style.display = "none";
  done.style.display = "block";

  const profiles = document.querySelectorAll("#profile");

  for (let i = 0; i < profiles.length; i++) {
    editProfileBox(profiles[i], "append", i);
  }
  edit = document.getElementById("edit");
});

// Remove edit profile button from profile buttons
done.addEventListener("click", () => {
  editProfile.style.display = "block";
  done.style.display = "none";

  const profiles = document.querySelectorAll("#profile");

  for (let i = 0; i < profiles.length; i++) {
    editProfileBox(profiles[i], "remove");
  }
});

// Create Edit Button UI and "append", "remove" methods
function editProfileBox(parent, option, id) {
  const button = document.createElement("button");
  const span = document.createElement("span");
  span.classList.add("icon");
  span.classList.add("icon-pencil");
  button.classList.add("edit-profile");
  button.setAttribute("id", "edit");
  button.append(span);
  const profiles = JSON.parse(localStorage.getItem("profiles"));
  button.setAttribute("onclick", `redirect(${profiles[id]?.id})`);

  if (option === "append") {
    button.setAttribute("data-cond", "append");
    parent.appendChild(button);
  }
  if (option === "remove") {
    edit = document.getElementById("edit");
    parent.removeChild(edit);
    edit.setAttribute("data-cond", "remove");
  }
}

// Redirect clicked profile to edit-profile.html for editing
function redirect(id) {
  window.location.href = `./edit-profile.html?profileid=${id}`;
}
