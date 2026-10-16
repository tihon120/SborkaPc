// берёт выбранный вариант из списка
function get(id) {
  var select = document.getElementById(id);
  return select.options[select.selectedIndex];
}

function check() {
  var cpu = get("cpu");
  var mb = get("mb");
  var ram = get("ram");
  var gpu = get("gpu");
  var psu = get("psu");

  // общая цена
  var total = Number(cpu.dataset.price) + Number(mb.dataset.price) +
              Number(ram.dataset.price) + Number(gpu.dataset.price) +
              Number(psu.dataset.price);

  // нужная мощность: процессор + видеокарта + 100 Вт на остальное
  var need = Number(cpu.dataset.watt) + Number(gpu.dataset.watt) + 100;

  var result = document.getElementById("result");
  var ok = false;

  if (cpu.dataset.socket != mb.dataset.socket) {
    result.textContent = "❌ Разные сокеты у процессора и материнской платы";
  } else if (mb.dataset.ram != ram.dataset.ram) {
    result.textContent = "❌ Материнке нужна " + mb.dataset.ram + ", а выбрана " + ram.dataset.ram;
  } else if (Number(psu.dataset.watt) < need) {
    result.textContent = "❌ Блоку питания не хватит мощности. Нужно хотя бы " + need + " Вт";
  } else {
    result.textContent = "✅ Всё совместимо";
    ok = true;
  }

  result.className = ok ? "good" : "bad";
  document.getElementById("price").textContent = "Цена сборки: " + total + " ₽";
}