const idElement = document.querySelector("#id"); // fetch it through GO button function
const pageElement = document.querySelector("#page");
const goBtnElement = document.querySelector("button");

// variables to be used in endpoint
let resource = "users";
let id;
let page;
let sort = "";
// const sort = sort && `&_order=${sort}`;

function resourceClick(evt) {
  resource = evt.target.value;
}

function sortClick(evt) {
  const sortValue = evt.target.value;
  console.log(sortValue);
  sort = sortValue ? `&_order=${sortValue}` : "";
}

goBtnElement.addEventListener("click", goBtnFunction);

async function goBtnFunction() {
  console.log(idElement.value);
  let idData;
  if (idElement.value > 10 || idElement.value < 0) {
    window.alert("Enter ID Value between 1-10");
    return;
  }
  idData = idElement.value;

  const idDataCheck = idData && `id=${idData}`; // this is shorter version of ternary condition
  const pageData = pageElement.value;
  const pageDataCheck = pageData && `&_page=${pageData}`;
  // function checkSort(sortValue) {
  //   if (sortValue) {
  //     return `&_order=${sortValue}`;
  //   } else {
  //     return "";
  //   }
  // }

  //! also check whether the variables exist or not before injecting them to final api call
  const finalCall = await fetch(
    `https://jsonplaceholder.typicode.com/${resource}?${idDataCheck}${pageDataCheck}${sort}`
  );
  const data = await finalCall.json();
  const dataObj = data[0];
  console.log(finalCall);
  console.log(data);
  // const { id, title, userId, body } = dataObj; //! body gets back in some resource paths only

  // showResponse(finalData);
}

// function showResponse(response){

// }
