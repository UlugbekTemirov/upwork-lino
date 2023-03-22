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

usernameInput?.addEventListener("input", (e) => {
  if (!e.target.value) username.innerText = "Profile Name";
  else {
    username.innerText = e.target.value;
    targetProfile.username = e.target.value;
  }
});

function setDatas(profile) {
  avatar.setAttribute("src", profile.image);
  username.innerText = profile.username;
  usernameInput.setAttribute("value", profile.username);
}
setDatas(targetProfile);

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
profileAvatar.addEventListener("change", changeFile);

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
    alert("File size exceeds maximum limit of 1 MB");
    profileAvatar.value = ""; // clear the input
  }
});
// 52 - 290 - width
// 10 - 330 - height
// galery
const galery = document.getElementById("galery");
const generate = document.getElementById("generate");
const set = document.getElementById("set");
const slider = document.getElementById("slider");

let winit = -110;
let hinit = -30;

let wdim = winit;
let hdim = hinit;

let ih = 363;
let iw = 363;

const img = document.getElementById("avatars");
const canvas = document.getElementById("sliderCanvas");
const ctx = canvas.getContext("2d");

function imgchange(wdim, hdim) {
  ctx.drawImage(img, wdim, hdim, 20000, 12000);
}

img.onload = function () {
  ctx.drawImage(img, wdim, hdim, 20000, 12000);
};

function random(max) {
  return -Math.round(Math.random() * max);
}

function generateHandler() {
  wdim = iw * random(10) + winit;
  hdim = ih * random(10) + hinit;
  imgchange(wdim, hdim);
}

generate.addEventListener("click", generateHandler);

document.addEventListener("keydown", (e) => {
  if (e.keyCode === 37) {
    wdim -= 1;
  }
  if (e.keyCode === 39) {
    wdim += 1;
  }
  if (e.keyCode === 40) {
    hdim += 1;
  }
  if (e.keyCode === 38) {
    hdim -= 1;
  }
  imgchange(wdim, hdim);
});

const exit = document.getElementById("exit");
slider.style.display = "none";

exit.addEventListener("click", () => {
  slider.style.display = "none";
});

galery.addEventListener("click", () => {
  slider.style.display = "block";
});

set.addEventListener("click", () => {
  targetProfile.image = canvas.toDataURL();
  avatar.setAttribute("src", canvas.toDataURL());
  slider.style.display = "none";
});
