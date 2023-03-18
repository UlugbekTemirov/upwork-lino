const profileName = document.getElementById("profileName");
const profileNameInput = document.getElementById("name");
const profileAvatar = document.getElementById("profileAvatar");
const avatarInput = document.getElementById("avatar");

profileNameInput.addEventListener("input", (e) => {
  profileName.innerText = e.target.value;
  if (!e.target.value) profileName.innerText = "Your Name";
});

function changeFile() {
  const file = this.files[0];
  const reader = new FileReader();

  reader.addEventListener("load", function () {
    profileAvatar.setAttribute("src", reader.result);
  });

  reader.readAsDataURL(file);
}

avatarInput.addEventListener("change", changeFile);
