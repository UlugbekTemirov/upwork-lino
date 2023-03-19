const profileLock = document.getElementById("profileLock");
const lockIcon = document.getElementById("lockIcon");
const avatar = document.getElementById("avatar");
const username = document.getElementById("username");
const usernameInput = document.getElementById("usernameInput");
const editProfileForm = document.getElementById("editProfileForm");
const profileAvatar = document.getElementById("profileAvatar");

let profiles = JSON.parse(localStorage.getItem("profiles"));
const id = window.location.search.slice(11);
const targetProfile = profiles.filter((item) => item.id == id)[0];

let tempdata;

usernameInput?.addEventListener("input", (e) => {
  if (!e.target.value) username.innerText = "Profile Name";
  else {
    username.innerText = e.target.value;
    targetProfile.username = e.target.value;
  }
});

function setDatas(profile) {
  avatar.style.backgroundImage = `url(${profile.image})`;
  username.innerText = profile.username;
  usernameInput.setAttribute("value", profile.username);
}
setDatas(targetProfile);

function changeFile() {
  const file = this.files[0];
  const reader = new FileReader();

  reader.addEventListener("load", function () {
    const maxFileSize = 1024 * 1024; // 1 MB
    if (file && file.size > maxFileSize) {
      alert("File size exceeds maximum limit of 1 MB");
      profileAvatar.value = ""; // clear the input
    } else {
      targetProfile.image = reader.result;
      avatar.style.backgroundImage = `url(${reader.result})`;
    }
  });

  reader.readAsDataURL(file);
}
profileAvatar.addEventListener("change", changeFile);

editProfileForm.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(targetProfile);
  const newProfiles = profiles.filter(
    (profile) => profile.id != targetProfile.id
  );
  newProfiles.push(targetProfile);
  localStorage.setItem("profiles", JSON.stringify(newProfiles));
  window.location.href = "/profile";
});

profileAvatar.addEventListener("change", () => {
  if (file && file.size > maxFileSize) {
    alert("File size exceeds maximum limit of 1 MB");
    profileAvatar.value = ""; // clear the input
  }
});
