// console.log(`jay shree ram`);
let genrateBtn = document.querySelector(".genrateBtn");
let input = document.querySelector("input");
let select = document.querySelector("select");
let error = document.querySelector(".error");

let img_container = document.querySelector(".img_container");
const genrateImage = async (userValue, imgQuantity) => {
  let apiLink = `https://pixabay.com/api/?key=22585776-458ea861ffd65b4334cb5cef7&q=${userValue}&image_type=photo`;

  const response = await fetch(apiLink);

  if (response.ok) {
    const data = await response.json();

    if (data.hits.length == 0) {
      console.log(`image not found`);
    }

    try {
      const imgSrc = data.hits
        .slice(0, imgQuantity)
        .map((element, index) => {
          return `<div class="card_img">
                    <img src="${element.largeImageURL}" alt="">
                    <button onclick="handleDownload('${element.largeImageURL}', '${element.tags}')" class="dwnBtn" title="download image"><i class="fa fa-arrow-circle-o-down" aria-hidden="true"></i></button>
                </div>`;
        })
        .join("");

      img_container.innerHTML = imgSrc;
    } catch (error) {
      console.log(error);
    }
  }
};

genrateBtn.addEventListener("click", () => {
  let inputValue = input.value;
  let selectValue = select.value;

  if (inputValue && selectValue) {
    genrateImage(inputValue, selectValue);
  }
});

const handleDownload = (imgsrc, imgName) => {
  let imgNamedata = imgName.split(",")[0];
  fetch(imgsrc)
    .then((res) => res.blob())
    .then((blob) => {
      let url = URL.createObjectURL(blob);

      let a = document.createElement("a");
      a.href = url;
      a.download = `${imgNamedata}.jpg`;

      a.click();
    });
};
