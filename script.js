const idresource = document.querySelector("#id"); // fetch it through GO button function
const pageresource = document.querySelector("#page");
const goBtnresource = document.querySelector("button");
const responseresource = document.querySelector(".response-box");
const responseFormresource = document.querySelector(".response-form");

// variables to be used in endpoint
let resource = "users";
let id;
let page;
let sort = "";

// for rendering checking resource type in order to render form
const resourceresourceKeys = {
  users: [
    { key: "id", element: "input", type: "" },
    { key: "name", element: "input", type: "" },
    { key: "username", element: "input", type: "" },
    { key: "email", element: "input", type: "" },
    { key: "address", element: "input", type: "" },
    { key: "phone", element: "input", type: "" },
    { key: "website", element: "input", type: "" },
    { key: "company", element: "input", type: "" },
  ],
  posts: [
    { key: "userid", element: "input", type: "number" },
    { key: "id", element: "input", type: "number" },
    "id",
    "title",
    "body",
  ],
  posts: ["userId", "id", "title", "body"],
  albums: ["userId", "id", "title"],
  photos: ["albumid", "id", "title", "url", "thumbnailUrl"],
  todos: ["userId", "id", "title", "completed"],
  comments: ["postId", "id", "name", "email", "body"],
};
// const { users, posts, albumbs, photos, todos, comments } = resourceresourceKeys;

function resourceClick(evt) {
  resource = evt.target.value;
  renderForm(resourceresourceKeys[resource]);
}

function sortClick(evt) {
  const sortValue = evt.target.value;

  console.log(sortValue);
  sort = sortValue ? `&_order=${sortValue}` : "";
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
  // data is the array of specific resource's keys
  data.forEach((resource) => {
    console.log(resource);

    /**
     * {
     *  key: 'id',
     *  element: 'input',
     *  type: 'text',
     * }
     */
    // createElement(element, type)

    if (
      resource === "id" ||
      resource === "phone" ||
      resource === "userId" ||
      resource === "albumId" ||
      resource === "postId"
    ) {
      console.log("Runs this", responseFormresource.innerHTML);

      // append to form tag

      responseFormresource.innerHTML = ` <div class="input-group">
      <span class="input-group-text">${resource}</span>
      <input type="number" class="form-control">
    </div>`;
    } else if (resource === "email") {
      responseFormresource.innerHTML = ` <div class="input-group">
      <span class="input-group-text">${resource}</span>
      <input type="email" class="form-control">
    </div>`;
    } else if (resource === "body") {
      responseFormresource.innerHTML = `<div class="input-group h-25">
      <span class="input-group-text">${resource}</span>
      <textarea class="form-control " ></textarea>
    </div>`;
    } else {
      responseFormresource.innerHTML = ` <div class="input-group">
      <span class="input-group-text">${resource}</span>
      <input type="text" class="form-control">
    </div>`;
    }
  });
}
