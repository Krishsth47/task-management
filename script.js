const taskList = [];
const badList = [];
const hrPerWeek = 168;

const handleOnSubmit = (e) => {
  const frmData = new FormData(e);

  const task = frmData.get("task");
  const hr = +frmData.get("hr"); //+ will convert string data type into number

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
      <div class="btn btn-danger btn-sm" onclick="deleteItem(${i})">
        <i class="fa-solid fa-trash-can" title="Delete"></i>
      </div>
      <div class="btn btn-warning btn-sm">
        <i
          class="fa-solid fa-arrow-right-from-bracket"
          title="Mark as bad list"
        ></i>
      </div>
    </td>
  </tr>
    `;
  });
  document.getElementById("task-list").innerHTML = str;
};

const deleteItem = (i) => {
  taskList.splice(i, 1);
  display();
  totalTaskHours();
};

const totalTaskHours = () => {
  //   const total = taskList.reduce((subttl, item) => {
  //     return subttl + item.hr;
  //   }, 0);
  const total = taskList.reduce((subttl, item) => subttl + item.hr, 0);
  document.getElementById("totalHours").innerText = total;

  console.log(total);
};
