const idresource = document.querySelector("#id"); // fetch it through GO button function
const pageresource = document.querySelector("#page");
const goBtnresource = document.querySelector("button");
const responseresource = document.querySelector(".response-box");
const responseFormresource = document.querySelector(".response-form");

const wrapperElementParent = document.createElement("div");
responseFormresource.append(wrapperElementParent);

// variables to be used in endpoint
let resource = "users";
let id;
let page;
let sort = "";
let method;

// for rendering checking resource type in order to render form
const resourceresourceKeys = {
  users: [
    { key: "id", element: "input", type: "number" },
    { key: "name", element: "input", type: "text" },
    { key: "username", element: "input", type: "text" },
    { key: "email", element: "input", type: "email" },
    { key: "address", element: "input", type: "text" },
    { key: "phone", element: "input", type: "number" },
    { key: "website", element: "input", type: "email" },
    { key: "company", element: "input", type: "text" },
  ],
  posts: [
    { key: "userId", element: "input", type: "number" },
    { key: "id", element: "input", type: "number" },
    { key: "title", element: "input", type: "text" },
    { key: "body", element: "input", type: "text" },
  ],
  albums: [
    { key: "userId", element: "input", type: "number" },
    { key: "id", element: "input", type: "number" },
    { key: "title", element: "input", type: "text" },
  ],
  photos: [
    { key: "albumId", element: "input", type: "number" },
    { key: "id", element: "input", type: "number" },
    { key: "title", element: "input", type: "text" },
    { key: "url", element: "input", type: "text" },
    { key: "thumbnailUrl", element: "input", type: "text" },
  ],
  todos: [
    { key: "userId", element: "input", type: "number" },
    { key: "id", element: "input", type: "number" },
    { key: "title", element: "input", type: "text" },
    { key: "completed", element: "input", type: "checkbox" },
  ],
  comments: [
    { key: "postId", element: "input", type: "number" },
    { key: "id", element: "input", type: "number" },
    { key: "name", element: "input", type: "text" },
    { key: "email", element: "input", type: "text" },
    { key: "body", element: "input", type: "text" },
  ],
};
const { users, posts, albumbs, photos, todos, comments } = resourceresourceKeys;

function resourceClick(evt) {
  resource = evt.target.value;
  CleanUp();
  renderForm(resourceresourceKeys[resource]);
}

function sortClick(evt) {
  const sortValue = evt.target.value;
  console.log(sortValue);
  sort = sortValue ? `&_order=${sortValue}` : "";
}

function handleMethodChange(event) {
  method = event.target.value;
  console.log(method);
}

goBtnresource.addEventListener("click", goBtnFunction);

async function goBtnFunction() {
  let idData;
  let pageData;
  // console.log(pageresource.value);
  if (idresource.value > 10 || idresource.value < 0) {
    window.alert("Enter ID Value between 1-10");
    return;
    // } else if (pageresource.value < 1) { //TODO: page not working
    //   window.alert("Enter Page No. more than 0");
    //   return;
  }
  idData = idresource.value;
  pageData = pageresource.value;
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
  // console.log(responseresource);
  responseresource.value = object;
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
  // data is the object of specific resource's keys, element and type
  data.forEach((element) => {
    const wrapperElement = document.createElement("div");
    wrapperElement.className = "input-group p-2";

    const spanElement = document.createElement("span");
    spanElement.classList.add("input-group-text");
    spanElement.innerHTML = element["key"];

    const inputElement = document.createElement("input");
    inputElement.classList.add("form-control");
    inputElement.type = element["type"];

    wrapperElement.append(spanElement, inputElement);
    wrapperElementParent.append(wrapperElement); // made a global variable in order to execute cleanup function
  });

  /**
   * {
   *  key: 'id',
   *  element: 'input',
   *  type: 'text',
   * }
   */
  // createElement(element, type)
}

function CleanUp() {
  console.log(wrapperElementParent);
  wrapperElementParent.innerHTML = "";
  console.log("CleanUp is running");
  // responseFormresource.innerHTML = "";
}
