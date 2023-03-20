function fakeLogin() {
  localStorage.setItem("is_authenticated", true);
  window.location.href = "/profile";
}
