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

  const select = document.getElementById("itemType");

  select.innerHTML = "";

  // Shared option
  const sharedOption = document.createElement("option");
  sharedOption.value = "shared";
  sharedOption.textContent = "Shared";
  select.appendChild(sharedOption);

  // Dynamic member options
  members.forEach(member => {

    const option = document.createElement("option");

    option.value = member;
    option.textContent = `${member} only`;

    select.appendChild(option);
  });
}

function addItem() {

  const name = document.getElementById("itemName").value;

  const price = parseFloat(
    document.getElementById("itemPrice").value
  );

  const type = document.getElementById("itemType").value;

  if (!name || isNaN(price)) {
    alert("Enter valid item and price");
    return;
  }

  items.push({
    name,
    price,
    type
  });

  document.getElementById("itemName").value = "";
  document.getElementById("itemPrice").value = "";

  render();
}

function render() {

  const itemsDiv = document.getElementById("items");
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
      `${item.name} - $${item.price} (${item.type})`;

    itemsDiv.appendChild(row);

    // Shared
    if (item.type === "shared") {

      const split = item.price / members.length;

      members.forEach(member => {

        totals[member] += split;

        lists[member].innerHTML += `
          <div>
            ${item.name}: $${split.toFixed(2)}
          </div>
        `;
      });

    } else {

      totals[item.type] += item.price;

      lists[item.type].innerHTML += `
        <div>
          ${item.name}: $${item.price.toFixed(2)}
        </div>
      `;
    }
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