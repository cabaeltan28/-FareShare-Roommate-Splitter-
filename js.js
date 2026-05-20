let items = [];
let members = [];

function setMembers() {

  const input = document.getElementById("membersInput").value;

  members = input
    .split(",")
    .map(name => name.trim())
    .filter(name => name !== "");

  if (members.length === 0) {
    alert("Enter at least one member");
    return;
  }

  generateOptions();
  render();
}

function generateOptions() {

  const payerOptions =
    document.getElementById("payerOptions");

  payerOptions.innerHTML = "";

  members.forEach(member => {

    const label = document.createElement("label");

    label.className = "checkbox-label";

    label.innerHTML = `
      <input type="checkbox" value="${member}">
      ${member}
    `;

    payerOptions.appendChild(label);
  });
}

function addItem() {

  const name =
    document.getElementById("itemName").value;

  const price = parseFloat(
    document.getElementById("itemPrice").value
  );

  // Get checked members
  const checkedBoxes =
    document.querySelectorAll(
      "#payerOptions input:checked"
    );

  const selectedMembers =
    Array.from(checkedBoxes).map(
      box => box.value
    );

  if (!name || isNaN(price)) {
    alert("Enter valid item and price");
    return;
  }

  if (selectedMembers.length === 0) {
    alert("Select at least one payer");
    return;
  }

  items.push({
    name,
    price,
    payers: selectedMembers
  });

  document.getElementById("itemName").value = "";
  document.getElementById("itemPrice").value = "";

  // Uncheck all
  checkedBoxes.forEach(box => {
    box.checked = false;
  });

  render();
}

function render() {

  const itemsDiv =
    document.getElementById("items");

  const memberColumns =
    document.getElementById("memberColumns");

  const totalsDiv =
    document.getElementById("totals");

  itemsDiv.innerHTML = "";
  memberColumns.innerHTML = "";
  totalsDiv.innerHTML = "";

  let totals = {};

  // Initialize totals
  members.forEach(member => {
    totals[member] = 0;
  });

  // Create columns dynamically
  let lists = {};

  members.forEach(member => {

    const col = document.createElement("div");

    col.className = "col";

    col.innerHTML = `
      <h3>${member}</h3>
      <div id="${member}List"></div>
    `;

    memberColumns.appendChild(col);

    lists[member] =
      document.getElementById(`${member}List`);
  });

  // Render items
  items.forEach(item => {

    const row = document.createElement("div");

    row.className = "row";

    row.textContent =
      `${item.name} - $${item.price}`;

    itemsDiv.appendChild(row);

    // Split among selected payers
    const split =
      item.price / item.payers.length;

    item.payers.forEach(member => {

      totals[member] += split;

      lists[member].innerHTML += `
        <div>
          ${item.name}: $${split.toFixed(2)}
        </div>
      `;
    });
  });

  // Show totals
  members.forEach(member => {

    totalsDiv.innerHTML += `
      <div>
        ${member}: $${totals[member].toFixed(2)}
      </div>
    `;
  });
}