const profileLock = document.getElementById("profileLock");
const lockIcon = document.getElementById("lockIcon");

profileLock.addEventListener("click", () => {
  if (profileLock.innerText === "ON") {
    profileLock.innerText = "OFF";
    lockIcon.classList.remove("icon-lock");
    lockIcon.classList.add("icon-unlock");
  } else {
    profileLock.innerText = "on";
    lockIcon.classList.remove("icon-unlock");
    lockIcon.classList.add("icon-lock");
  }
});
