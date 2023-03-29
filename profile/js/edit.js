const profileLock = document.getElementById("profileLock");
const lockIcon = document.getElementById("lockIcon");
const avatar = document.getElementById("avatar");
const username = document.getElementById("username");
const usernameInput = document.getElementById("usernameInput");
const editProfileForm = document.getElementById("editProfileForm");
const profileAvatar = document.getElementById("profileAvatar");

// Get all profiles from local storage
let profiles = JSON.parse(localStorage.getItem("profiles"));

// Get Editable Profile id from URL search Params
const id = window.location.search.slice(11);

// Find current profile with ID
const targetProfile = profiles.filter((item) => item.id == id)[0];

// Handle input and append in HTML
usernameInput?.addEventListener("input", (e) => {
  if (!e.target.value) username.innerText = "Profile Name";
  else {
    username.innerText = e.target.value;
    targetProfile.username = e.target.value;
  }
});

// Append Current Profile datas in UI
function setDatas(profile) {
  avatar.setAttribute("src", profile.image);
  username.innerText = profile.username;
  usernameInput.setAttribute("value", profile.username);
}
setDatas(targetProfile);

// Check input file size and append in UI
function changeFile() {
  const file = this.files[0];
  const reader = new FileReader();

  reader.addEventListener("load", function () {
    const maxFileSize = 1024 ** 2 * 2; // 1 MB
    if (file && file.size > maxFileSize) {
      alert("File size exceeds maximum limit of 2 MB");
      profileAvatar.value = ""; // clear the input
    } else {
      targetProfile.image = reader.result;
      avatar.setAttribute("src", reader.result);
    }
  });

  reader.readAsDataURL(file);
}

// Handle changes of profile avatar
profileAvatar.addEventListener("change", changeFile);

// Submit all changes to global profile Object and set it in Local Storage
editProfileForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const newProfiles = profiles.filter(
    (profile) => profile.id != targetProfile.id
  );
  newProfiles.push(targetProfile);
  localStorage.setItem("profiles", JSON.stringify(newProfiles));
  window.location.href = "/profile";
});

profileAvatar.addEventListener("change", () => {
  if (file && file.size > maxFileSize) {
    alert("File size exceeds maximum limit of 2 MB");
    profileAvatar.value = ""; // clear the input
  }
});

// galery
const galery = document.getElementById("galery");

const exit = document.getElementById("exit");
slider.style.display = "none";

exit.addEventListener("click", () => {
  slider.style.display = "none";
});

galery.addEventListener("click", () => {
  slider.style.display = "block";
});

// mosaic slider

const c = document.querySelector("#container");

function sliderLayout(id) {
  return `
  <div class="thumb">
    <div onclick="setAvatar(${id})" class="content">
      <img src="./assets/profilePictures/${id}.png" alt="avatar" />
    </div>
  </div>
  `;
}

for (let i = 1; i <= 10; i++) {
  c.innerHTML += sliderLayout(i);
}

function setAvatar(id) {
  const image = new Image();
  image.src = `./assets/profilePictures/${id}.png`;

  image.addEventListener("load", () => {
    const canvas = document.createElement("canvas");
    canvas.width = image.width;
    canvas.height = image.height;
    const context = canvas.getContext("2d");
    context.drawImage(image, 0, 0, canvas.width, canvas.height);

    // Get the canvas data as a Blob object
    canvas.toBlob(function (blob) {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = function () {
        const base64data = reader.result;
        targetProfile.image = base64data;
        avatar.setAttribute("src", base64data);
        slider.style.display = "none";
      };
    }, "image/png");
  });
}
