const welcomePage = document.querySelector(".welcome-page-area");
const teamIntroducePage = document.querySelector(".team-introduce-area");


if (!isIncludesHide(welcomePage)) {
  document.addEventListener("keydown", () => {
    welcomePage.classList.add("animate__animated", "animate__fadeOut", "animate__fast");

    setTimeout(() => {
      welcomePage.classList.add("hide");
      teamIntroducePage.classList.remove("hide");
      teamIntroducePage.classList.add("animate__animated", "animate__heartBeat", "animate__slow")
    }, 700);
  })
}

function isIncludesHide(document) {
  return document.className.includes("hide");
}