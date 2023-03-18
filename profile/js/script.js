const profiles = document.querySelectorAll("#profile");
const addProfile = document.getElementById("addProfile");
const profilesDiv = document.querySelector(".profiles");
const editProfile = document.getElementById("editProfile");
const done = document.getElementById("done");
let edit = document.getElementById("edit");

function redirectProfiles() {
  profiles.forEach((profile) => {
    profile.addEventListener("click", () => {
      if (!edit) {
        window.location.href = "/";
      }
    });
  });
}

redirectProfiles();

// To check if user profiles are more than 5 or not. If so disable AddProfile Button
function checkProfilesNumber(profiles) {
  if (profiles.length >= 5) {
    addProfile.style.display = "none";
  } else {
    addProfile.style.display = "flex";
  }
}
checkProfilesNumber(profiles);

done.style.display = "none";
// Open Edit box when editProfile button pressed
editProfile.addEventListener("click", () => {
  editProfile.style.display = "none";
  done.style.display = "block";
  for (let i = 0; i < profiles.length; i++) {
    editProfileBox(profiles[i], "append", i);
  }
  edit = document.getElementById("edit");
});

done.addEventListener("click", () => {
  editProfile.style.display = "block";
  done.style.display = "none";
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
  console.log(id);
  button.setAttribute("onclick", `redirect(${id})`);

  if (option === "append") {
    parent.appendChild(button);
  }
  if (option === "remove") {
    const edit = document.getElementById("edit");
    parent.removeChild(edit);
  }
}

function redirect(id) {
  window.location.href = `./edit-profile.html?id=${id}`;
}
