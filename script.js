const idElement = document.querySelector("#id"); // fetch it through GO button function
const pageElement = document.querySelector("#page");
const goBtnElement = document.querySelector("button");
const responseElement = document.querySelector(".response-box");

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
  console.log({ stringifiedData });

  // data.forEach((singleObj) => {
  //   for (const key2 in singleObj) {
  //     if (singleObj.hasOwnProperty(key2)) {
  //       console.log(`${key2} : ${singleObj[key2]}`);
  //     }
  //   }
  // });
  showResponse(stringifiedData);
}

function showResponse(object) {
  console.log(responseElement);
  responseElement.value = object;
}
