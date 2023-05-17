const welcomePage = document.querySelector(".welcome-page-area");
const teamIntroduceListPage = document.querySelector(".page-one");
const teamIntroducePage = document.querySelector(`.page-two`);



if (!isIncludesHide(welcomePage)) {
  document.addEventListener("keydown", () => {
    welcomePage.classList.add("animate__animated", "animate__fadeOut", "animate__fast");

    setTimeout(() => {
      welcomePage.classList.add("hide");
      teamIntroduceListPage.classList.remove("hide");
      teamIntroduceListPage.classList.add("animate__animated", "animate__heartBeat", "animate__fast");
    }, 700);
  })
}

function isIncludesHide(document) {
  return document.className.includes("hide");
}

let isWheelEventActive = true;

document.addEventListener("wheel", (e) => {
  if (!isWheelEventActive) {
    return;
  }

  console.log("scroll")

  isWheelEventActive = false;
  setTimeout(() => {
    isWheelEventActive = true;
  }, 1000);
});

function isWheelUp(e) {
  return e.deltaY < 0;
}

function isWheelDown(e) {
  return e.deltaY > 0;
}