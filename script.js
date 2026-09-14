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

const proteins = new Set(foodGroups["肉・魚"]);
const days = [["月","MON"], ["火","TUE"], ["水","WED"], ["木","THU"], ["金","FRI"], ["土","SAT"], ["日","SUN"]];
const methods = [
  { name:"焼き", action:"フライパンで両面を香ばしく焼き、たれを絡めます" },
  { name:"炒め", action:"火の通りにくいものから手早く炒め、味を調えます" },
  { name:"煮", action:"だしを加え、弱めの中火で味がしみるまで煮ます" },
  { name:"蒸し", action:"酒を少量振ってふたをし、ふっくら蒸し上げます" },
  { name:"揚げ焼き", action:"少なめの油で表面がカリッとするまで揚げ焼きにします" },
  { name:"スープ煮", action:"スープでやわらかく煮込み、仕上げに味を調えます" }
];
const flavors = [
  { name:"和風しょうゆ", seasoning:"しょうゆ・みりん", soup:"わかめとねぎのすまし汁" },
  { name:"洋風ハーブ", seasoning:"塩・こしょう・乾燥ハーブ", soup:"玉ねぎのコンソメスープ" },
  { name:"中華風", seasoning:"鶏がら・しょうゆ・ごま油", soup:"ふんわり卵の中華スープ" },
  { name:"韓国風", seasoning:"味噌・ごま油・少量の唐辛子", soup:"わかめの韓国風スープ" },
  { name:"カレー風", seasoning:"カレー粉・しょうゆ", soup:"野菜のカレースープ" },
  { name:"ガーリック塩", seasoning:"にんにく・塩・こしょう", soup:"きのこの洋風スープ" },
  { name:"こっくり味噌", seasoning:"味噌・みりん", soup:"豆腐とねぎの味噌汁" },
  { name:"トマト", seasoning:"トマト・塩・こしょう", soup:"ミネストローネ" },
  { name:"さっぱり塩", seasoning:"塩・酒・レモン", soup:"野菜の塩スープ" },
  { name:"甘辛しょうゆ", seasoning:"しょうゆ・砂糖・みりん", soup:"根菜の和風汁" }
];
const formats = ["定食", "丼", "ワンプレート", "麺", "定食", "小鉢膳"];
const savingSides = ["塩もみ野菜", "冷ややっこ", "もやしのナムル", "にんじんのきんぴら", "即席浅漬け", "残り野菜のおひたし"];
const richSides = ["彩り野菜のマリネ", "チーズ入りオムレツ", "えびと葉野菜のサラダ", "季節野菜のグリル", "生ハムの小さなサラダ", "きのこのアヒージョ"];
const richSecondSides = ["アボカドのレモン和え", "かぼちゃのチーズ焼き", "豆とツナのサラダ", "彩りピクルス", "温野菜のバーニャカウダ", "小さなカルパッチョ"];
const desserts = ["季節の果物", "ヨーグルトとはちみつ", "ひとくちアイス", "フルーツゼリー", "ミルクプリン", "焼きりんご"];
const richAdditions = [
  ["えび", "葉野菜", "オレンジ"], ["牛肉", "チーズ", "りんご"], ["白身魚", "生クリーム", "ぶどう"],
  ["豚ロース", "アボカド", "ヨーグルト"], ["鶏もも肉", "トマト", "アイス"], ["あさり", "バゲット", "季節の果物"]
];
const variationProfiles = Array.from({ length: 12 }, (_, index) => ({
  methodOffset: index % methods.length,
  flavorOffset: (index * 3 + Math.floor(index / 4)) % flavors.length,
  formatOffset: (index * 5) % formats.length,
  sideOffset: (index * 2) % savingSides.length,
  additionOffset: index % richAdditions.length
}));

const selectorSection = document.querySelector("#selector");
const planSection = document.querySelector("#plan");
const dialog = document.querySelector("#shopping-dialog");
const customInput = document.querySelector("#custom-food");
let budget = 5000;
let selectedFoods = [];
let lastVariation = -1;
let currentPlan = null;

function escapeHtml(value) {
  return value.replace(/[&<>'"]/g, character => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", "'":"&#39;", '"':"&quot;" })[character]);
}

function renderCandidates() {
  document.querySelector("#candidate-groups").innerHTML = Object.entries(foodGroups).map(([group, foods], index) => `
    <section class="candidate-group" aria-labelledby="food-group-${index}">
      <h3 id="food-group-${index}">【${group}】</h3>
      <div class="candidate-buttons">${foods.map(food => `<button class="food-button" type="button" data-food="${food}" aria-pressed="false">${food}</button>`).join("")}</div>
    </section>`).join("");
  document.querySelectorAll(".food-button").forEach(button => button.addEventListener("click", () => toggleFood(button.dataset.food)));
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
  document.querySelectorAll("[data-remove]").forEach(button => button.addEventListener("click", () => toggleFood(button.dataset.remove)));
}

function nextVariation() {
  const choices = variationProfiles.map((_, index) => index).filter(index => index !== lastVariation);
  lastVariation = choices[Math.floor(Math.random() * choices.length)];
  return variationProfiles[lastVariation];
}

function compatiblePair(index) {
  const selectedProteins = selectedFoods.filter(food => proteins.has(food));
  const selectedOthers = selectedFoods.filter(food => !proteins.has(food));
  if (selectedProteins.length && selectedOthers.length) {
    return [selectedProteins[index % selectedProteins.length], selectedOthers[(index * 2 + 1) % selectedOthers.length]];
  }
  const firstIndex = index % 5;
  let secondIndex = (index * 2 + 1) % 5;
  if (secondIndex === firstIndex) secondIndex = (secondIndex + 1) % 5;
  return [selectedFoods[firstIndex], selectedFoods[secondIndex]];
}

function buildPlan() {
  const profile = nextVariation();
  const additions = richAdditions[profile.additionOffset];
  const menus = days.map(([day, en], index) => {
    const [first, second] = compatiblePair(index);
    const method = methods[(index + profile.methodOffset) % methods.length];
    const flavor = flavors[(index * 2 + profile.flavorOffset) % flavors.length];
    const format = formats[(index + profile.formatOffset) % formats.length];
    const side = budget === 5000 ? savingSides[(index + profile.sideOffset) % savingSides.length] : richSides[(index + profile.sideOffset) % richSides.length];
    const main = format === "丼" || format === "麺"
      ? `${first}と${second}の${flavor.name}${format}`
      : `${first}と${second}の${flavor.name}${method.name}`;
    return {
      day, en, main, foods:[first, second], method:method.name, flavor:flavor.name,
      recipe:`${first}と${second}を食べやすく切り、${method.action}。${flavor.seasoning}で仕上げます。`,
      side, side2:richSecondSides[(index * 2 + profile.sideOffset) % richSecondSides.length],
      soup:flavor.soup, dessert:desserts[(index + profile.additionOffset) % desserts.length],
      format, additions:[additions[index % additions.length], ...additions.filter((_, additionIndex) => additionIndex !== index % additions.length).slice(0, 1)]
    };
  });
  return { menus, additions, variation:lastVariation };
}

function detailRow(label, value) {
  return `<div class="menu-detail"><dt>${label}</dt><dd>${escapeHtml(value)}</dd></div>`;
}

function renderMenuCard(menu) {
  const details = budget === 5000
    ? [
        ["主菜", menu.main], ["副菜", menu.side], ["汁物", menu.soup],
        ["節約ポイント", `${menu.format}にして、基本調味料と少ない追加食材でボリュームを出します。`],
        ["使い回し", `${menu.foods.join("と")}は翌日の下ごしらえもまとめて行うと時短になります。`]
      ]
    : [
        ["主菜", menu.main], ["副菜1", menu.side], ["副菜2", menu.side2], ["汁物", menu.soup],
        ["デザート", menu.dessert], ["追加食材", menu.additions.join("・")]
      ];
  return `<article class="menu-card ${budget === 10000 ? "menu-card--rich" : ""}">
    <div class="menu-card__day">${menu.en}<b>${menu.day}</b></div>
    <h3>${escapeHtml(menu.main)}</h3>
    <p><b>選んだ食材：</b>${escapeHtml(menu.foods.join("・"))}</p>
    <p><b>${escapeHtml(menu.method)}・${escapeHtml(menu.flavor)}：</b>${escapeHtml(menu.recipe)}</p>
    <dl class="menu-details">${details.map(([label, value]) => detailRow(label, value)).join("")}</dl>
  </article>`;
}

function renderPlan(shouldScroll = true) {
  currentPlan = buildPlan();
  document.querySelector("#plan-course-label").textContent = `${budget.toLocaleString()}円コース`;
  document.querySelector("#ingredients").innerHTML = selectedFoods.map(food => `<div class="ingredient"><span class="ingredient__icon" aria-hidden="true">${foodIcons[food] || "✦"}</span><strong>${escapeHtml(food)}</strong></div>`).join("");
  const summary = budget === 5000
    ? "節約コース：基本調味料を活用し、かさ増し・作り置き・食材の使い回しを大切にした3品献立です。"
    : "満足コース：追加食材を取り入れ、副菜2品・汁物・デザートまで揃えた6品献立です。";
  document.querySelector("#menu-list").innerHTML = `<p class="course-summary ${budget === 10000 ? "course-summary--rich" : ""}">${summary}</p>${currentPlan.menus.map(renderMenuCard).join("")}`;
  planSection.hidden = false;
  selectorSection.hidden = true;
  if (shouldScroll) planSection.scrollIntoView({ behavior:"smooth", block:"start" });
}

renderCandidates();
updateSelection();

document.querySelectorAll("[data-budget]").forEach(button => button.addEventListener("click", () => {
  budget = Number(button.dataset.budget);
  document.querySelector("#course-label").textContent = `${budget.toLocaleString()}円コース`;
  if (selectedFoods.length === 5) renderPlan();
  else {
    planSection.hidden = true;
    selectorSection.hidden = false;
    selectorSection.scrollIntoView({ behavior:"smooth", block:"start" });
  }
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
document.querySelector("#reroll-button").addEventListener("click", () => renderPlan(false));
document.querySelector("#reselect-button").addEventListener("click", () => {
  planSection.hidden = true;
  selectorSection.hidden = false;
  selectorSection.scrollIntoView({ behavior:"smooth", block:"start" });
});
document.querySelector("#shopping-button").addEventListener("click", () => {
  const additions = budget === 10000
    ? [...currentPlan.additions, "副菜用の季節野菜", "乳製品", "デザート用の果物"]
    : ["副菜用の手頃な野菜 1〜2品", "だし・基本の調味料"];
  const items = [...selectedFoods, ...additions];
  document.querySelector("#shopping-list").innerHTML = [...new Set(items)].map(item => `<label class="shopping-item"><input type="checkbox" /><span>${escapeHtml(item)}</span></label>`).join("");
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
