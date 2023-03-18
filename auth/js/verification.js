$(document).ready(function () {
  $("#phone").on("input", function () {
    var value = $(this).val().replace(/\D/g, "");
    var formattedValue = formatPhoneNumber(value);
    $(this).val(formattedValue);
  });
});

function formatPhoneNumber(value) {
  var pattern =
    /^\+?([0-9]{0,2})([0-9]{0,3})([0-9]{0,2})([0-9]{0,2})([0-9]{0,3})$/;
  var groups = value.match(pattern);
  if (!groups) return "";
  var international = groups[1] ? "+" + groups[1] : "";
  var first = groups[2] ? " " + groups[2] : "";
  var second = groups[3] ? " " + groups[3] : "";
  var third = groups[4] ? " " + groups[4] : "";
  var extension = groups[5] ? " " + groups[5] : "";
  return international + first + second + third + extension;
}
