const taskList = [];
const badList = [];
const hrPerWeek = 168;

let total;

const handleOnSubmit = (e) => {
  const frmData = new FormData(e);

  const task = frmData.get("task");
  const hr = +frmData.get("hr"); //+ will convert string data type into number

  if (hr < 1) return alert("Please enter Positive numbers");

  const ttlBadHrs = totalBadHours();
  const total = taskList.reduce((subttl, item) => subttl + item.hr, 0) + hr;

  if (ttlBadHrs + total > hrPerWeek) {
    return alert("You have exceeded the maximum hours");
  }

  const obj = {
    task,
    hr,
  };

  taskList.push(obj);
  display();
  totalTaskHours();
};
const display = () => {
  //   console.log(taskList);
  let str = "";
  taskList.map((item, i) => {
    str += `
    <tr>
    <td>
      <input type="checkbox" name="" id="" />
      ${item.task}
    </td>
    <td>${item.hr} hrs</td>
    <td class="text-end">
      <button class="btn btn-danger btn-sm" onclick="deleteItem(${i})">
        <i class="fa-solid fa-trash-can" title="Delete"></i>
      </button>
      <button class="btn btn-warning btn-sm" onclick="markAsNotToDo(${i})">
        <i
          class="fa-solid fa-arrow-right-from-bracket"
          title="Mark as bad list"></i>
      </button>
    </td>
  </tr>
    `;
  });
  document.getElementById("task-list").innerHTML = str;
};
const displayBadList = () => {
  //   console.log(taskList);
  let str = "";
  badList.map((item, i) => {
    str += `
    <tr>
    <td>
      <input type="checkbox" name="" id="" />
      ${item.task}
    </td>
    <td>${item.hr} hrs</td>
    <td class="text-end">

      <button class="btn btn-warning btn-sm" onclick="markAsToDo(${i})">
      <i class="fa-solid fa-arrow-left"
          title="Mark as bad list"></i>
         </button>
              <button class="btn btn-danger btn-sm" onclick="deleteBadItem(${i})">
        <i class="fa-solid fa-trash-can" title="Delete"></i>
     
      </button>
    </td>
  </tr>
    `;
  });
  document.getElementById("bad-list").innerHTML = str;
};

const deleteItem = (i) => {
  if (!confirm("Are you sure you want to delete this?")) {
    return;
  }

  taskList.splice(i, 1);
  display();
  totalTaskHours();
};
const deleteBadItem = (i) => {
  if (!confirm("Are you sure you want to delete this?")) {
    return;
  }

  badList.splice(i, 1);
  displayBadList();
  totalTaskHours();
  totalBadHours();
};

const totalTaskHours = () => {
  const total = taskList.reduce((subttl, item) => subttl + item.hr, 0);
  const ttlBadHrs = totalBadHours();
  const ttlHrs = total + ttlBadHrs;
  document.getElementById("totalHours").innerText = ttlHrs;
};
const totalBadHours = () => {
  //   const total = taskList.reduce((subttl, item) => {
  //     return subttl + item.hr;
  //   }, 0);
  const total = badList.reduce((subttl, item) => subttl + item.hr, 0);
  document.getElementById("totalBadHrs").innerText = total;
  return total;
};

const markAsNotToDo = (i) => {
  const itm = taskList.splice(i, 1);
  display();
  badList.push(itm[0]);
  console.log(badList);
  displayBadList();
  totalBadHours();
};
const markAsToDo = (i) => {
  const itm = badList.splice(i, 1);
  displayBadList();

  taskList.push(itm[0]);
  display();

  totalTaskHours();
};
