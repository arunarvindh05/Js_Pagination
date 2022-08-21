const state = {
  selectedPageIndex: 0,
  comments: [],
  slicedComments: [],
  itemsPerPage: 10
}
var start = 0;
var end = state.itemsPerPage;

window.onload = async () => {
  const res = await fetch('https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json');
  const comments = await (res.ok ? res.json() : Promise.resolve([]));
  state.comments = comments;
  state.slicedComments = comments.slice(start, end);
  console.log(state);
  render();
}

function navigate(selectedPageIndex) {
  start = selectedPageIndex * state.itemsPerPage;
  end = start + state.itemsPerPage
  state.selectedPageIndex = selectedPageIndex;
  state.slicedComments = state.comments.slice(start, end);
  render();
}

function render() {
  const numberOfPages = Math.ceil(state.comments.length / state.itemsPerPage);
  const indexes = Array.from(Array(numberOfPages).keys());

  const buttons = indexes.map((num, i) => {
      return `<li class="page-item ${state.selectedPageIndex === i ? "active" : ""}">
      <span class="page-link" onclick="navigate(${num})">
         ${num + 1}
      </span>
      </li>
     `;
  });
  document.getElementById("comments_component").innerHTML = `<br>
  <nav>
  <ul class="pagination">
      <li class="page-item ${state.selectedPageIndex === 0 ? "active" : ""}">
      <span class="page-link" onclick="navigate(0)">First</span>
      <li class="page-item ${state.selectedPageIndex === state.selectedPageIndex-1 ? "active" : ""}">
      <span class="page-link" onclick="navigate(${state.selectedPageIndex-1>0 ? state.selectedPageIndex-1:0})">Previous</span>
      ${buttons.join('')}
      <li class="page-item ${state.selectedPageIndex === state.selectedPageIndex+1 ? "active" : ""}">
      <span class="page-link" onclick="navigate(${state.selectedPageIndex+1<numberOfPages-1 ? state.selectedPageIndex+1:numberOfPages-1})">Next</span>
      <li class="page-item ${state.selectedPageIndex === numberOfPages-1 ? "active" : ""}">
      <span class="page-link" onclick="navigate(${numberOfPages-1})">Last</span>
  </ul>
  </nav>
  <div class="page">
  Page : ${state.selectedPageIndex+1}
  </div>
  <br>
  <table id="table" class="table table-striped table-bordered">
  <thead class="thead-light">
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
        </tr>
      </thead>
  <tbody>
          ${state.slicedComments.reduce((a, cr) => {
              return a + `
                  
                  <tr>
                  <th scope="row">${cr.id}</th>
                  <td>${cr.name}</td>
                  <td>${cr.email}</td>
                </tr>
              `;
          }, "")}
          </tbody>
          </table>
  `;
}