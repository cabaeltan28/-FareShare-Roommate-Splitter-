
  let items = [];

  function addItem() {
    const name = document.getElementById("itemName").value;
    const price = parseFloat(document.getElementById("itemPrice").value);
    const type = document.getElementById("itemType").value;

    if (!name || isNaN(price)) {
      alert("Enter valid item and price");
      return;
    }

    items.push({ name, price, type });

    document.getElementById("itemName").value = "";
    document.getElementById("itemPrice").value = "";

    render();
  }

  function render() {
    const itemsDiv = document.getElementById("items");
    const chrisList = document.getElementById("chrisList");
    const patList = document.getElementById("patList");

    itemsDiv.innerHTML = "";
    chrisList.innerHTML = "";
    patList.innerHTML = "";

    let chrisTotal = 0;
    let patTotal = 0;

    items.forEach(item => {
      const row = document.createElement("div");
      row.className = "row";
      row.textContent = `${item.name} - $${item.price} (${item.type})`;
      itemsDiv.appendChild(row);

      if (item.type === "shared") {
        const split = item.price / 2;

        chrisTotal += split;
        patTotal += split;

        chrisList.innerHTML += `<div>${item.name}: $${split.toFixed(2)}</div>`;
        patList.innerHTML += `<div>${item.name}: $${split.toFixed(2)}</div>`;
      } else if (item.type === "chris") {
        chrisTotal += item.price;
        chrisList.innerHTML += `<div>${item.name}: $${item.price.toFixed(2)}</div>`;
      } else {
        patTotal += item.price;
        patList.innerHTML += `<div>${item.name}: $${item.price.toFixed(2)}</div>`;
      }
    });

    document.getElementById("chrisTotal").textContent = chrisTotal.toFixed(2);
    document.getElementById("patTotal").textContent = patTotal.toFixed(2);
  }
