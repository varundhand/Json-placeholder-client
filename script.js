const idElement = document.querySelector("#id"); // fetch it through GO button function
const pageElement = document.querySelector("#page");
const goBtnElement = document.querySelector("button");
const responseElement = document.querySelector(".response-box");
const responseFormElement = document.querySelector(".response-form");

// variables to be used in endpoint
let resource = "users";
let id;
let page;
let sort = "";

// for rendering checking resource type in order to render form
const resourceElementKeys = {
  users: [
    "id",
    "name",
    "username",
    "email",
    "address",
    "phone",
    "website",
    "company",
  ],
  posts: ["userId", "id", "title", "body"],
  albums: ["userId", "id", "title"],
  photos: ["albumid", "id", "title", "url", "thumbnailUrl"],
  todos: ["userId", "id", "title", "completed"],
  comments: ["postId", "id", "name", "email", "body"],
};
// const { users, posts, albumbs, photos, todos, comments } = resourceElementKeys;

function resourceClick(evt) {
  resource = evt.target.value;
  renderForm(resourceElementKeys[`${resource}`]);
}

function sortClick(evt) {
  const sortValue = evt.target.value;

  console.log(sortValue);
  sort = sortValue ? `&_order=${sortValue}` : "";
}

goBtnElement.addEventListener("click", goBtnFunction);

async function goBtnFunction() {
  let idData;
  let pageData;
  // console.log(pageElement.value);
  if (idElement.value > 10 || idElement.value < 0) {
    window.alert("Enter ID Value between 1-10");
    return;
    // } else if (pageElement.value < 1) { //TODO: page not working
    //   window.alert("Enter Page No. more than 0");
    //   return;
  }
  idData = idElement.value;
  pageData = pageElement.value;
  const idDataCheck = idData && `id=${idData}`; // this is shorter version of ternary condition
  const pageDataCheck = pageData && `&_page=${pageData}`;

  //! also check whether the variables exist or not before injecting them to final api call
  const finalCall = await fetch(
    `https://jsonplaceholder.typicode.com/${resource}?${idDataCheck}${pageDataCheck}${sort}`
  );
  const data = await finalCall.json();
  const stringifiedData = JSON.stringify(data, null, 2);
  // console.log({ stringifiedData });
  // console.log(data);
  showResponse(stringifiedData);
  // renderForm(data);
}

function showResponse(object) {
  // console.log(responseElement);
  responseElement.value = object;
}

// Validation for page number keyboard input
// TODO: Come back to this & find a better solution
function onPageChange(e) {
  let oldPage = document.querySelector("#page").value;
  const pageEntered = e.key;

  if (e.key === "Backspace") {
    oldPage = oldPage.substring(0, oldPage.length - 1);
  }

  const newPage = parseInt(oldPage + pageEntered);
  const validPages = Array.from(Array(100).keys());

  if (validPages.some((page) => page === newPage)) {
    console.log("valid page");
  } else {
    console.log("invlid page");
  }
}

// function renderForm(data) { // data is the resource recieved on clicking
//   data[0].forEach((singleObj) => {
//     for (const key in singleObj) {
//       if (singleObj.hasOwnProperty(key)) {
//         console.log(`${key} : ${typeof singleObj[key]}`);
//       }
//     }
//   });
// }

function renderForm(data) {
  console.log(data);
  // data is the array of specific resource's keys
  data.forEach((element) => {
    if (
      element === "id" ||
      element === "phone" ||
      element === "userId" ||
      element === "albumId" ||
      element === "postId"
    ) {
      responseFormElement.innerHTML = ` <div class="input-group">
      <span class="input-group-text">${element}</span>
      <input type="number" class="form-control">
    </div>`;
    } else if (element === "email") {
      responseFormElement.innerHTML = ` <div class="input-group">
      <span class="input-group-text">${element}</span>
      <input type="email" class="form-control">
    </div>`;
    } else if (element === "body") {
      responseFormElement.innerHTML = `<div class="input-group h-25">
      <span class="input-group-text">${element}</span>
      <textarea class="form-control " ></textarea>
    </div>`;
    } else {
      responseFormElement.innerHTML = ` <div class="input-group">
      <span class="input-group-text">${element}</span>
      <input type="text" class="form-control">
    </div>`;
    }
  });
}
