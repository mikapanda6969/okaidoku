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
const P = (title, genre, method, seasoning, categories, rich = false) => ({ title, genre, method, seasoning, categories, rich });
const menuCandidates = [
  P("生姜焼き","和食","焼く","しょうゆ",["meat"]), P("南蛮漬け","和食","揚げる","甘酢",["meat","fish","vegetable"]),
  P("味噌炒め","和食","炒める","味噌",["meat","vegetable","tofu"]), P("塩こうじ焼き","和食","焼く","塩こうじ",["meat","fish"]),
  P("照り煮","和食","煮る","しょうゆ",["meat","fish","vegetable","tofu"]), P("揚げ浸し","和食","揚げる","だし",["fish","vegetable","tofu"]),
  P("ホイル焼き","和食","蒸す","味噌",["fish","vegetable","mushroom"]), P("炊き込みご飯","和食","炊く","だし",["meat","fish","vegetable","mushroom"]),
  P("混ぜご飯","和食","和える","しょうゆ",["meat","fish","vegetable","egg"]), P("親子丼風","丼もの","煮る","だし",["meat","egg"]),
  P("そぼろ丼","丼もの","炒める","甘辛",["meat","egg","tofu"]), P("ごま味噌和え","和食","和える","ごま味噌",["vegetable","tofu"]),
  P("和風おろし煮","和食","煮る","だし",["meat","fish","tofu"]), P("豆腐チャンプルー","和食","炒める","しょうゆ",["tofu","egg","vegetable"]),
  P("ガーリックソテー","洋食","炒める","ガーリック",["meat","fish","vegetable","mushroom"]), P("トマト煮","洋食","煮る","トマト",["meat","fish","vegetable","tofu"]),
  P("クリーム煮","洋食","煮る","クリーム",["meat","fish","vegetable","mushroom"]), P("ポトフ","洋食","スープ","コンソメ",["meat","vegetable"]),
  P("香草パン粉焼き","洋食","オーブン焼き","ハーブ",["meat","fish","vegetable"]), P("オムレツ","洋食","焼く","バター",["egg","vegetable","meat"]),
  P("ミートローフ風","洋食","オーブン焼き","ハーブ",["meat","egg"],true), P("温野菜サラダプレート","サラダメイン","蒸す","レモン",["vegetable","meat","fish","egg"]),
  P("ミネストローネ","スープ系","スープ","トマト",["vegetable","meat","tofu"]), P("豆乳スープ","スープ系","スープ","豆乳",["vegetable","tofu","fish"]),
  P("クラムチャウダー風","スープ系","スープ","クリーム",["fish","vegetable"],true), P("チーズグラタン","グラタン","オーブン焼き","チーズ",["meat","fish","vegetable","mushroom"],true),
  P("焼きチーズドリア","ドリア","オーブン焼き","チーズ",["meat","fish","vegetable"],true), P("ローストプレート","ワンプレート","オーブン焼き","ハーブ",["meat","fish","vegetable"],true),
  P("八宝菜","中華","炒める","中華塩",["meat","fish","vegetable"]), P("回鍋肉風","中華","炒める","甜麺醤",["meat","vegetable"]),
  P("麻婆風","中華","煮る","豆板醤",["meat","tofu","vegetable"]), P("甘酢炒め","中華","炒める","甘酢",["meat","fish","vegetable"]),
  P("中華丼","丼もの","炒める","オイスター",["meat","fish","vegetable"]), P("あんかけ焼きそば","麺類","炒める","中華あん",["meat","fish","vegetable"]),
  P("中華蒸し","中華","蒸す","ごま油",["meat","fish","vegetable","tofu"]), P("卵とじスープ","中華","スープ","鶏がら",["egg","vegetable","tofu"]),
  P("チャプチェ","韓国風","炒める","甘辛",["meat","vegetable","mushroom"]), P("ビビンバ","韓国風","混ぜる","コチュジャン",["meat","vegetable","egg"]),
  P("チヂミ","韓国風","焼く","ごま油",["vegetable","fish","egg"]), P("スンドゥブ風鍋","鍋","煮る","韓国辛味",["tofu","meat","fish","egg"],true),
  P("プルコギ風","韓国風","炒める","甘辛",["meat","vegetable"]), P("韓国風蒸し煮","韓国風","蒸す","コチュジャン",["meat","fish","vegetable"]),
  P("タンドリー風焼き","エスニック","焼く","スパイス",["meat","fish","tofu"]), P("ガパオ風ライス","エスニック","炒める","バジル",["meat","tofu","egg"]),
  P("ナンプラー蒸し","エスニック","蒸す","ナンプラー",["fish","meat","vegetable"]), P("ココナッツカレー","カレー","煮る","スパイス",["meat","fish","vegetable","tofu"],true),
  P("エスニックサラダ","サラダメイン","和える","ナンプラー",["meat","fish","vegetable"]), P("スパイススープ","スープ系","スープ","スパイス",["meat","vegetable","tofu"]),
  P("和風パスタ","イタリアン","炒める","しょうゆ",["meat","fish","vegetable","mushroom"]), P("トマトパスタ","イタリアン","煮る","トマト",["meat","fish","vegetable"]),
  P("ペペロンチーノ風","イタリアン","炒める","ガーリック",["fish","vegetable","mushroom"]), P("チーズリゾット","イタリアン","煮る","チーズ",["meat","fish","vegetable","mushroom"],true),
  P("イタリアン蒸し焼き","イタリアン","蒸す","トマト",["meat","fish","vegetable"]), P("ピカタ","イタリアン","焼く","チーズ",["meat","fish","egg"]),
  P("焼きうどん","麺類","炒める","しょうゆ",["meat","fish","vegetable"]), P("豆乳うどん","麺類","煮る","豆乳",["meat","vegetable","tofu"]),
  P("スープカレー","カレー","煮る","スパイス",["meat","fish","vegetable","egg"]), P("キーマカレー風","カレー","炒める","スパイス",["meat","tofu","vegetable"]),
  P("クリームシチュー","シチュー","煮る","クリーム",["meat","fish","vegetable"]), P("トマト鍋","鍋","煮る","トマト",["meat","fish","vegetable","tofu"],true),
  P("せいろ風蒸し料理","蒸し料理","蒸す","ポン酢",["meat","fish","vegetable","tofu"]), P("フリット盛り","揚げ物","揚げる","ハーブ塩",["meat","fish","vegetable"],true),
  P("南蛮風ワンプレート","ワンプレート","揚げる","甘酢",["meat","fish","vegetable"]), P("ごちそうオーブン焼き","オーブン料理","オーブン焼き","ガーリック",["meat","fish","vegetable","mushroom"],true)
let previousMenuTitles = [];
function foodCategory(food) {
  if (foodGroups["肉・魚"].includes(food)) return ["鮭", "さば"].includes(food) ? "fish" : "meat";
  if (food === "卵") return "egg";
  if (["豆腐", "厚揚げ", "納豆"].includes(food)) return "tofu";
  if (food === "きのこ") return "mushroom";
  return foodGroups["野菜"].includes(food) ? "vegetable" : "other";
}

function shuffled(items) {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
  }
  return result;
}

  const foodsForWeek = shuffled(selectedFoods);
  const chosen = [];
  const methodCounts = {};
  const genreCounts = {};
  const seasoningCounts = {};

  dayLabels.forEach(([day, en], index) => {
    const first = foodsForWeek[index % foodsForWeek.length];
    const category = foodCategory(first);
    const second = foodsForWeek[(index + 1) % foodsForWeek.length];
    const baseCandidates = menuCandidates.filter(candidate =>
      (category === "other" || candidate.categories.includes(category)) &&
      (budget === 10000 || !candidate.rich) &&
      !chosen.some(menu => menu.title === candidate.title)
    );
    const preferred = baseCandidates.filter(candidate =>
      !previousMenuTitles.includes(candidate.title) &&
      (methodCounts[candidate.method] || 0) < 2 &&
      candidate.method !== chosen.at(-1)?.method &&
      (genreCounts[candidate.genre] || 0) < 2 &&
      (seasoningCounts[candidate.seasoning] || 0) < 2 &&
      candidate.seasoning !== chosen.at(-1)?.seasoning
    );
    const varied = preferred.length ? preferred : baseCandidates.filter(candidate =>
      !previousMenuTitles.includes(candidate.title) && candidate.method !== chosen.at(-1)?.method
    );
    const pool = varied.length ? varied : baseCandidates;
    const candidate = pool[Math.floor(Math.random() * pool.length)];
    methodCounts[candidate.method] = (methodCounts[candidate.method] || 0) + 1;
    genreCounts[candidate.genre] = (genreCounts[candidate.genre] || 0) + 1;
    seasoningCounts[candidate.seasoning] = (seasoningCounts[candidate.seasoning] || 0) + 1;
    chosen.push({ ...candidate, day, en, first, second });
  previousMenuTitles = chosen.map(menu => menu.title);
  return chosen.map((menu, index) => {
    const useSecond = index % 2 === 0;
    const foods = useSecond ? [menu.first, menu.second] : [menu.first];
    const main = `${foods.join("と")}の${menu.title}`;
    const details = budget === 5000
      ? `【${menu.genre}／${menu.method}／${menu.seasoning}】主菜：${escapeHtml(main)}<br>副菜：旬野菜の小鉢<br>汁物：使い回し野菜の汁物<br><b>節約・使い回し：</b>${escapeHtml(menu.first)}を多めに下ごしらえして別の日にも活用します。`
      : `【${menu.genre}／${menu.method}／${menu.seasoning}】主菜：${escapeHtml(main)}<br>副菜1：彩り温野菜<br>副菜2：チーズと旬野菜の小皿<br>汁物：具だくさんスープ<br>デザート：季節の果物と乳製品<br><b>追加食材：</b>肉・魚介・チーズ・果物から主菜に合うものを追加します。`;
    return [menu.day, menu.en, main, foods.join("・"), details];
  });
}
  if (!planSection.hidden && selectedFoods.length === 5) renderPlan();
  else {
    planSection.hidden = true;
    selectorSection.hidden = false;
    selectorSection.scrollIntoView({ behavior: "smooth", block: "start" });
  }
document.querySelector("#regenerate-button").addEventListener("click", () => renderPlan(false));
  P("中華蒸し","中華","蒸す","ごま油",["meat","fish","vegetable","tofu"]), P("卵とじスープ","中華","スープ","鶏がら",["egg","vegetable","tofu"]),
  P("チャプチェ","韓国風","炒める","甘辛",["meat","vegetable","mushroom"]), P("ビビンバ","韓国風","混ぜる","コチュジャン",["meat","vegetable","egg"]),
  P("チヂミ","韓国風","焼く","ごま油",["vegetable","fish","egg"]), P("スンドゥブ風鍋","鍋","煮る","韓国辛味",["tofu","meat","fish","egg"],true),
  P("プルコギ風","韓国風","炒める","甘辛",["meat","vegetable"]), P("韓国風蒸し煮","韓国風","蒸す","コチュジャン",["meat","fish","vegetable"]),
  P("タンドリー風焼き","エスニック","焼く","スパイス",["meat","fish","tofu"]), P("ガパオ風ライス","エスニック","炒める","バジル",["meat","tofu","egg"]),
  P("ナンプラー蒸し","エスニック","蒸す","ナンプラー",["fish","meat","vegetable"]), P("ココナッツカレー","カレー","煮る","スパイス",["meat","fish","vegetable","tofu"],true),
  P("エスニックサラダ","サラダメイン","和える","ナンプラー",["meat","fish","vegetable"]), P("スパイススープ","スープ系","スープ","スパイス",["meat","vegetable","tofu"]),
  P("和風パスタ","イタリアン","炒める","しょうゆ",["meat","fish","vegetable","mushroom"]), P("トマトパスタ","イタリアン","煮る","トマト",["meat","fish","vegetable"]),
  P("ペペロンチーノ風","イタリアン","炒める","ガーリック",["fish","vegetable","mushroom"]), P("チーズリゾット","イタリアン","煮る","チーズ",["meat","fish","vegetable","mushroom"],true),
  P("イタリアン蒸し焼き","イタリアン","蒸す","トマト",["meat","fish","vegetable"]), P("ピカタ","イタリアン","焼く","チーズ",["meat","fish","egg"]),
  P("焼きうどん","麺類","炒める","しょうゆ",["meat","fish","vegetable"]), P("豆乳うどん","麺類","煮る","豆乳",["meat","vegetable","tofu"]),
  P("スープカレー","カレー","煮る","スパイス",["meat","fish","vegetable","egg"]), P("キーマカレー風","カレー","炒める","スパイス",["meat","tofu","vegetable"]),
  P("クリームシチュー","シチュー","煮る","クリーム",["meat","fish","vegetable"]), P("トマト鍋","鍋","煮る","トマト",["meat","fish","vegetable","tofu"],true),
  P("せいろ風蒸し料理","蒸し料理","蒸す","ポン酢",["meat","fish","vegetable","tofu"]), P("フリット盛り","揚げ物","揚げる","ハーブ塩",["meat","fish","vegetable"],true),
  P("南蛮風ワンプレート","ワンプレート","揚げる","甘酢",["meat","fish","vegetable"]), P("ごちそうオーブン焼き","オーブン料理","オーブン焼き","ガーリック",["meat","fish","vegetable","mushroom"],true)
];
const selectorSection = document.querySelector("#selector");
const planSection = document.querySelector("#plan");
const dialog = document.querySelector("#shopping-dialog");
const customInput = document.querySelector("#custom-food");
let budget = 5000;
let selectedFoods = [];
let previousMenuTitles = [];

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

function foodCategory(food) {
  if (foodGroups["肉・魚"].includes(food)) return ["鮭", "さば"].includes(food) ? "fish" : "meat";
  if (food === "卵") return "egg";
  if (["豆腐", "厚揚げ", "納豆"].includes(food)) return "tofu";
  if (food === "きのこ") return "mushroom";
  return foodGroups["野菜"].includes(food) ? "vegetable" : "other";
}

function shuffled(items) {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
  }
  return result;
}

function makeMenus() {
  const foodsForWeek = shuffled(selectedFoods);
  const chosen = [];
  const methodCounts = {};
  const genreCounts = {};
  const seasoningCounts = {};

  dayLabels.forEach(([day, en], index) => {
    const first = foodsForWeek[index % foodsForWeek.length];
    const category = foodCategory(first);
    const second = foodsForWeek[(index + 1) % foodsForWeek.length];
    const baseCandidates = menuCandidates.filter(candidate =>
      (category === "other" || candidate.categories.includes(category)) &&
      (budget === 10000 || !candidate.rich) &&
      !chosen.some(menu => menu.title === candidate.title)
    );
    const preferred = baseCandidates.filter(candidate =>
      !previousMenuTitles.includes(candidate.title) &&
      (methodCounts[candidate.method] || 0) < 2 &&
      candidate.method !== chosen.at(-1)?.method &&
      (genreCounts[candidate.genre] || 0) < 2 &&
      (seasoningCounts[candidate.seasoning] || 0) < 2 &&
      candidate.seasoning !== chosen.at(-1)?.seasoning
    );
    const varied = preferred.length ? preferred : baseCandidates.filter(candidate =>
      !previousMenuTitles.includes(candidate.title) && candidate.method !== chosen.at(-1)?.method
    );
    const pool = varied.length ? varied : baseCandidates;
    const candidate = pool[Math.floor(Math.random() * pool.length)];
    methodCounts[candidate.method] = (methodCounts[candidate.method] || 0) + 1;
    genreCounts[candidate.genre] = (genreCounts[candidate.genre] || 0) + 1;
    seasoningCounts[candidate.seasoning] = (seasoningCounts[candidate.seasoning] || 0) + 1;
    chosen.push({ ...candidate, day, en, first, second });
  });

  previousMenuTitles = chosen.map(menu => menu.title);
  return chosen.map((menu, index) => {
    const useSecond = index % 2 === 0;
    const foods = useSecond ? [menu.first, menu.second] : [menu.first];
    const main = `${foods.join("と")}の${menu.title}`;
    const details = budget === 5000
      ? `【${menu.genre}／${menu.method}／${menu.seasoning}】主菜：${escapeHtml(main)}<br>副菜：旬野菜の小鉢<br>汁物：使い回し野菜の汁物<br><b>節約・使い回し：</b>${escapeHtml(menu.first)}を多めに下ごしらえして別の日にも活用します。`
      : `【${menu.genre}／${menu.method}／${menu.seasoning}】主菜：${escapeHtml(main)}<br>副菜1：彩り温野菜<br>副菜2：チーズと旬野菜の小皿<br>汁物：具だくさんスープ<br>デザート：季節の果物と乳製品<br><b>追加食材：</b>肉・魚介・チーズ・果物から主菜に合うものを追加します。`;
    return [menu.day, menu.en, main, foods.join("・"), details];
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
  if (!planSection.hidden && selectedFoods.length === 5) renderPlan();
  else {
    planSection.hidden = true;
    selectorSection.hidden = false;
    selectorSection.scrollIntoView({ behavior: "smooth", block: "start" });
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
document.querySelector("#regenerate-button").addEventListener("click", () => renderPlan(false));
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
