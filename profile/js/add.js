const profileName = document.getElementById("profileName");
const profileNameInput = document.getElementById("name");
const profileAvatar = document.getElementById("profileAvatar");
const avatarInput = document.getElementById("avatar");
const saveBtn = document.getElementById("saveBtn");
const addProfileForm = document.getElementById("addProfileForm");

profileNameInput.addEventListener("input", (e) => {
  profileName.innerText = e.target.value;
  if (!e.target.value) profileName.innerText = "Your Name";
});

let temp;

function changeFile() {
  const file = this.files[0];
  const reader = new FileReader();

  const maxFileSize = 1024 ** 2 * 2; // 1 MB
  if (file && file.size > maxFileSize) {
    alert("File size exceeds maximum limit of 2 MB");
    profileAvatar.value = ""; // clear the input
  } else {
    reader.addEventListener("load", function () {
      profileAvatar.setAttribute("src", reader.result);
      temp = reader.result;
    });
  }

  reader.readAsDataURL(file);
}

avatarInput.addEventListener("change", changeFile);

addProfileForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());
  let profiles = JSON.parse(localStorage.getItem("profiles"));

  let newProfile = {
    id: profiles.length,
    username: data?.name,
    isKid: data?.iskid,
    image: temp,
  };

  profiles.push(newProfile);
  localStorage.setItem("profiles", JSON.stringify(profiles));
  window.location.href = "/profile";
});
