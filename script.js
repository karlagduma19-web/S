const scene1 = document.getElementById("scene1");
const scene2 = document.getElementById("scene2");
const flowerScene = document.getElementById("flowerScene");
const slideshow = document.getElementById("slideshow");
const videoScene = document.getElementById("videoScene");
const finalScene = document.getElementById("finalScene");

const hiBtn = document.getElementById("hiBtn");
const noBtn = document.getElementById("noBtn");
const maybeBtn = document.getElementById("maybeBtn");
const yesBtn = document.getElementById("yesBtn");

const music = document.getElementById("music");
const video = document.getElementById("finalVideo");

let yesScale = 1;

/* Floating hearts */
setInterval(() => {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.innerText = "❤️";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = 3 + Math.random() * 3 + "s";
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 6000);
}, 500);

/* Scene 1 → Scene 2 */
hiBtn.onclick = () => {
  scene1.classList.remove("active");
  scene2.classList.add("active");
};

/* Grow YES button */
function growYes() {
  yesScale += 0.25;
  yesBtn.style.transform = `scale(${yesScale})`;
}

maybeBtn.onclick = growYes;

/* NO button runs away */
noBtn.onmouseover = () => {
  noBtn.style.position = "absolute";
  noBtn.style.left = Math.random() * (window.innerWidth - 100) + "px";
  noBtn.style.top = Math.random() * (window.innerHeight - 100) + "px";
  growYes();
};

/* YES clicked */
yesBtn.onclick = () => {
  scene2.classList.remove("active");
  flowerScene.classList.add("active");
  music.play();
  setTimeout(startSlideshow, 3000);
};

/* Slideshow */
function startSlideshow() {
  flowerScene.classList.remove("active");
  slideshow.classList.add("active");

  let index = 1;
  const totalImages = 30;
  const totalTime = 40000;
  const interval = totalTime / totalImages;

  const slideTimer = setInterval(() => {
    if (index > totalImages) {
      clearInterval(slideTimer);
      endSlideshow();
      return;
    }

    const img = document.createElement("img");
    img.src = `images/img${index}.jpg`;
    img.className = "slide-img";
    slideshow.appendChild(img);

    setTimeout(() => img.remove(), interval - 200);
    index++;
  }, interval);

  setTimeout(() => {
    music.pause();
    music.currentTime = 0;
  }, totalTime);
}

/* Video → Final */
function endSlideshow() {
  slideshow.classList.remove("active");
  videoScene.classList.add("active");
  video.play();

  video.onended = () => {
    videoScene.classList.remove("active");
    finalScene.classList.add("active");
  };
}
