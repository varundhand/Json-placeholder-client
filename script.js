const idElement = document.querySelector("#id"); // fetch it through GO button function
const pageElement = document.querySelector("#page");
const goBtnElement = document.querySelector("button");

// variables to be used in endpoint
let resource;
let id;
let page;
let sort = null;
// const sort = sort && `&_order=${sort}`;

function resourceClick(evt) {
  resource = evt.target.value;
}

function sortClick(evt) {
  sort = evt.target.value;
  // sort = sort && `&_order=${sort}`;
}

goBtnElement.addEventListener("click", goBtnFunction);

async function goBtnFunction() {
  const idData = idElement.value;
  const idDataCheck = idData && `?id=${idData}`;
  const pageData = pageElement.value;
  const pageDataCheck = pageData && `&_page=${pageData}`;
  function checkSort(sortValue) {
    if (sortValue) {
      return `&_order=${sortValue}`;
    } else {
      return "";
    }
  }

  //! also check whether the variables exist or not before injecting them to final api call
  const finalCall = await fetch(
    `https://jsonplaceholder.typicode.com/${resource}${idDataCheck}${pageDataCheck}${checkSort(
      sort
    )}`
  );
  const data = await finalCall.json();
  const dataObj = data[0];
  const { id, title, userId, body } = dataObj; // body gets back in some resource paths only
}
