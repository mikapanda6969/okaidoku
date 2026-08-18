const foodGroups = {
  "肉・魚": ["鶏むね肉", "鶏もも肉", "豚こま肉", "ひき肉", "鮭", "さば"],
  "野菜": ["キャベツ", "白菜", "玉ねぎ", "にんじん", "じゃがいも", "大根", "もやし", "きのこ", "ブロッコリー"],
  "その他": ["卵", "豆腐", "厚揚げ", "納豆"]
};

const foodIcons = {
  "鶏むね肉":"🍗", "鶏もも肉":"🍗", "豚こま肉":"🥩", "ひき肉":"🥩", "鮭":"🐟", "さば":"🐟",
  "キャベツ":"🥬", "白菜":"🥬", "玉ねぎ":"🧅", "にんじん":"🥕", "じゃがいも":"🥔", "大根":"◯",
  "もやし":"🌱", "きのこ":"🍄", "ブロッコリー":"🥦", "卵":"🥚", "豆腐":"□", "厚揚げ":"◇", "納豆":"🫘"
};

const dayLabels = [["月","MON"], ["火","TUE"], ["水","WED"], ["木","THU"], ["金","FRI"], ["土","SAT"], ["日","SUN"]];
const menuStyles = [
  ["の香ばし照り焼き", "食べやすく切って焼き、しょうゆ・みりん・砂糖を絡めます。"],
  ["のほっこり煮", "だしと調味料を加え、味がしみるまでやさしく煮ます。"],
  ["の彩り味噌炒め", "火の通りにくい食材から炒め、味噌だれを絡めます。"],
  ["のふんわり蒸し", "酒を少量振り、ふたをして弱めの中火でふっくら蒸します。"],
  ["のさっぱり甘酢あん", "香ばしく焼いた具材に、甘酢だれをさっと絡めます。"],
  ["のごちそうチーズ焼き", "耐熱皿に並べ、チーズをのせてこんがり焼きます。"],
  ["のあったかスープ", "食べやすく切ってスープで煮込み、塩こしょうで調えます。"]
];

const selectorSection = document.querySelector("#selector");
const planSection = document.querySelector("#plan");
const dialog = document.querySelector("#shopping-dialog");
const customInput = document.querySelector("#custom-food");
let budget = 5000;
let selectedFoods = [];

function escapeHtml(value) {
  return value.replace(/[&<>'"]/g, character => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", "'":"&#39;", '"':"&quot;" })[character]);
}

function renderCandidates() {
  document.querySelector("#candidate-groups").innerHTML = Object.entries(foodGroups).map(([group, foods]) => `
    <section class="candidate-group" aria-labelledby="group-${group}">
      <h3 id="group-${group}">【${group}】</h3>
      <div class="candidate-buttons">${foods.map(food => `<button class="food-button" type="button" data-food="${food}" aria-pressed="false">${food}</button>`).join("")}</div>
    </section>`).join("");

  document.querySelectorAll(".food-button").forEach(button => {
    button.addEventListener("click", () => toggleFood(button.dataset.food));
  });
}

function toggleFood(food) {
  const index = selectedFoods.indexOf(food);
  if (index >= 0) selectedFoods.splice(index, 1);
  else if (selectedFoods.length < 5) selectedFoods.push(food);
  updateSelection();
}

function updateSelection() {
  const atLimit = selectedFoods.length === 5;
  document.querySelector("#selection-count").textContent = `${selectedFoods.length} / 5`;
  document.querySelector("#create-plan-button").disabled = !atLimit;
  document.querySelectorAll(".food-button").forEach(button => {
    const isSelected = selectedFoods.includes(button.dataset.food);
    button.setAttribute("aria-pressed", String(isSelected));
    button.disabled = atLimit && !isSelected;
  });

  document.querySelector("#selected-foods").innerHTML = selectedFoods.length
    ? selectedFoods.map(food => `<span class="selected-chip">${escapeHtml(food)}<button type="button" data-remove="${escapeHtml(food)}" aria-label="${escapeHtml(food)}を削除">×</button></span>`).join("")
    : '<p class="empty-selection">食材を選ぶと、ここに表示されます</p>';

  document.querySelectorAll("[data-remove]").forEach(button => {
    button.addEventListener("click", () => toggleFood(button.dataset.remove));
  });
}

function makeMenus() {
  return dayLabels.map(([day, en], index) => {
    const first = selectedFoods[index % 5];
    const second = selectedFoods[(index + 1 + (index > 4 ? 1 : 0)) % 5];
    const [title, recipe] = menuStyles[index];
    const courseTouch = budget === 10000 && index === 5 ? "仕上げにお好みのハーブを添えてください。" : "";
    return [day, en, `${first}と${second}${title}`, `${first}・${second}`, `${recipe}${courseTouch}`];
  });
}

function renderPlan(shouldScroll = true) {
  const menus = makeMenus();
  document.querySelector("#ingredients").innerHTML = selectedFoods.map(food => `<div class="ingredient"><span class="ingredient__icon" aria-hidden="true">${foodIcons[food] || "✦"}</span><strong>${escapeHtml(food)}</strong></div>`).join("");
  document.querySelector("#menu-list").innerHTML = menus.map(([day, en, title, foods, recipe]) => `<article class="menu-card"><div class="menu-card__day">${en}<b>${day}</b></div><h3>${escapeHtml(title)}</h3><p><b>主な食材：</b>${escapeHtml(foods)}</p><p>${recipe}</p></article>`).join("");
  planSection.hidden = false;
  selectorSection.hidden = true;
  if (shouldScroll) planSection.scrollIntoView({ behavior: "smooth", block: "start" });
}

renderCandidates();
updateSelection();

document.querySelectorAll("[data-budget]").forEach(button => button.addEventListener("click", () => {
  budget = Number(button.dataset.budget);
  document.querySelector("#course-label").textContent = `${budget.toLocaleString()}円コース`;
  planSection.hidden = true;
  selectorSection.hidden = false;
  selectorSection.scrollIntoView({ behavior: "smooth", block: "start" });
}));

document.querySelector("#custom-food-form").addEventListener("submit", event => {
  event.preventDefault();
  const food = customInput.value.trim();
  const message = document.querySelector("#input-message");
  if (!food) message.textContent = "食材名を入力してください。";
  else if (selectedFoods.includes(food)) message.textContent = "その食材はすでに選ばれています。";
  else if (selectedFoods.length >= 5) message.textContent = "選べる食材は5つまでです。";
  else {
    selectedFoods.push(food);
    customInput.value = "";
    message.textContent = "";
    updateSelection();
  }
});

document.querySelector("#create-plan-button").addEventListener("click", () => renderPlan());
document.querySelector("#reselect-button").addEventListener("click", () => {
  planSection.hidden = true;
  selectorSection.hidden = false;
  selectorSection.scrollIntoView({ behavior: "smooth", block: "start" });
});
document.querySelector("#shopping-button").addEventListener("click", () => {
  const extras = budget === 10000 ? ["季節の副菜用野菜", "チーズまたは乳製品", "だし・基本の調味料"] : ["お好みの副菜用野菜", "だし・基本の調味料"];
  const items = [...selectedFoods, ...extras];
  document.querySelector("#shopping-list").innerHTML = items.map(item => `<label class="shopping-item"><input type="checkbox" /><span>${escapeHtml(item)}</span></label>`).join("");
  dialog.showModal();
});
document.querySelector("#close-dialog").addEventListener("click", () => dialog.close());
document.querySelector("#done-button").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", event => { if (event.target === dialog) dialog.close(); });

if (new URLSearchParams(window.location.search).get("preview") === "1") {
  selectedFoods = ["鶏むね肉", "鮭", "キャベツ", "じゃがいも", "卵"];
  updateSelection();
  renderPlan(false);
}
