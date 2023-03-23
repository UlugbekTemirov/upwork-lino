const profiles = document.querySelectorAll("#profile");
let addProfile = document.getElementById("addProfile");
const profilesDiv = document.querySelector(".profiles");
const editProfile = document.getElementById("editProfile");
const done = document.getElementById("done");
let edit = document.getElementById("edit");

let DUMMY_DATA = [
  {
    id: 0,
    username: "Lorem",
    image: "./assets/randomProfilePicture.jpg",
  },
];

function setLocalProfiles() {
  if (!localStorage.getItem("profiles")) {
    localStorage.setItem("profiles", JSON.stringify(DUMMY_DATA));
  } else {
    DUMMY_DATA = JSON.parse(localStorage.getItem("profiles"));
  }
}
setLocalProfiles();

function clickedProfile(id) {
  console.log("I am working");
  const profile = DUMMY_DATA.filter((profile) => profile.id === id)[0];
  localStorage.setItem("currentProfile", JSON.stringify(profile));

  const disabled = edit.getAttribute("disabled");
  if (disabled) window.location.href = `/?profileid=${profile.id}`;
}

function profileButtons({ id, username, image }) {
  return `<button onclick="clickedProfile(${id})" id="profile" class="profile">
  <img src=${image} alt=${username} />
  <h3>${username}</h3>
</button>`;
}

function makeProfileRow(data) {
  for (let i = 0; i < data.length; i++) {
    profilesDiv.innerHTML += profileButtons({ ...data[i] });
  }
  // console.log(addProfile);
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

editProfile.addEventListener("click", () => {
  editProfile.style.display = "none";
  done.style.display = "block";

  const profiles = document.querySelectorAll("#profile");

  for (let i = 0; i < profiles.length; i++) {
    editProfileBox(profiles[i], "append", i);
  }
  edit = document.getElementById("edit");
});

done.addEventListener("click", () => {
  editProfile.style.display = "block";
  done.style.display = "none";

  const profiles = document.querySelectorAll("#profile");

  for (let i = 0; i < profiles.length; i++) {
    editProfileBox(profiles[i], "remove");
  }
});

// Create Edit Button
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
    button.setAttribute("disabled", false);
    parent.appendChild(button);
  }
  if (option === "remove") {
    edit = document.getElementById("edit");
    parent.removeChild(edit);
    edit.setAttribute("disabled", true);
  }
}

function redirect(id) {
  window.location.href = `./edit-profile.html?profileid=${id}`;
}
