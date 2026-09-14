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

// 調理法・味・形式の相性を確認した12種類。選択食材ごとに12通り以上の週献立を作れます。
const menuProfiles = [
  { method:"焼く", flavor:"和風", format:"定食", suffix:"香ばし照り焼き", seasoning:"しょうゆ・みりん", side:"さっぱりごま和え", soup:"豆腐とねぎのすまし汁" },
  { method:"煮る", flavor:"味噌", format:"定食", suffix:"ほっこり味噌煮", seasoning:"味噌・だし", side:"塩もみサラダ", soup:"根菜のすまし汁" },
  { method:"炒める", flavor:"中華風", format:"ワンプレート", suffix:"彩り中華炒め", seasoning:"鶏がら・しょうゆ", side:"きゅうりの中華和え", soup:"ふんわり卵スープ" },
  { method:"蒸す", flavor:"塩", format:"せいろ風定食", suffix:"ふっくら塩蒸し", seasoning:"塩・酒", side:"おかか和え", soup:"きのこの和風スープ" },
  { method:"揚げる", flavor:"カレー風", format:"ワンプレート", suffix:"カレー風味の揚げ焼き", seasoning:"カレー粉・塩", side:"千切り野菜", soup:"コンソメスープ" },
  { method:"スープにする", flavor:"トマト系", format:"スーププレート", suffix:"ごろごろトマト煮込み", seasoning:"トマト・コンソメ", side:"グリーンサラダ", soup:"主菜を兼ねる食べるスープ" },
  { method:"焼く", flavor:"洋風", format:"ワンプレート", suffix:"ハーブグリル", seasoning:"塩・ハーブ", side:"温野菜サラダ", soup:"玉ねぎのコンソメスープ" },
  { method:"炒める", flavor:"韓国風", format:"丼", suffix:"甘辛コチュジャン炒め丼", seasoning:"コチュジャン・しょうゆ", side:"即席ナムル", soup:"わかめスープ" },
  { method:"煮る", flavor:"カレー風", format:"カレーライス", suffix:"まろやかカレー", seasoning:"カレー粉・基本調味料", side:"さっぱりピクルス", soup:"野菜のミニスープ" },
  { method:"蒸す", flavor:"ガーリック", format:"パスタ", suffix:"ガーリック蒸しパスタ", seasoning:"にんにく・塩", side:"彩りマリネ", soup:"ミルクスープ" },
  { method:"揚げる", flavor:"しょうゆ", format:"丼", suffix:"さくさく竜田揚げ丼", seasoning:"しょうゆ・しょうが", side:"大根の甘酢漬け", soup:"味噌汁" },
  { method:"スープにする", flavor:"中華風", format:"麺", suffix:"とろみあんかけ麺", seasoning:"鶏がら・ごま油", side:"蒸し野菜", soup:"麺のあんを兼ねるスープ" }
];

const richAdditions = [
  { protein:"えび", side:"アボカドとトマトのサラダ", dessert:"季節のフルーツヨーグルト" },
  { protein:"牛肉", side:"チーズ入り彩りオムレツ", dessert:"ミルクプリン" },
  { protein:"白身魚", side:"生ハムのグリーンサラダ", dessert:"季節のフルーツ" },
  { protein:"鶏もも肉", side:"モッツァレラのカプレーゼ", dessert:"バニラアイスの果物添え" },
  { protein:"豚ロース", side:"かぼちゃのチーズ焼き", dessert:"ヨーグルトムース" }
];

const selectorSection = document.querySelector("#selector");
const planSection = document.querySelector("#plan");
const dialog = document.querySelector("#shopping-dialog");
const customInput = document.querySelector("#custom-food");
let budget = 5000;
let selectedFoods = [];
let lastPlanSignature = "";
let currentShoppingExtras = [];

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, character => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", "'":"&#39;", '"':"&quot;" })[character]);
}

function randomIndex(length) {
  return Math.floor(Math.random() * length);
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

function choosePlanStart() {
  let start = randomIndex(menuProfiles.length);
  const richStart = randomIndex(richAdditions.length);
  const rotation = randomIndex(selectedFoods.length);
  let signature = `${budget}-${start}-${budget === 10000 ? richStart : "saving"}-${rotation}`;
  if (signature === lastPlanSignature) {
    start = (start + 1 + randomIndex(menuProfiles.length - 1)) % menuProfiles.length;
    signature = `${budget}-${start}-${budget === 10000 ? richStart : "saving"}-${rotation}`;
  }
  lastPlanSignature = signature;
  return { start, richStart, rotation };
}

function makeMenus() {
  const { start, richStart, rotation } = choosePlanStart();
  return dayLabels.map(([day, en], index) => {
    const profile = menuProfiles[(start + index) % menuProfiles.length];
    const first = selectedFoods[(index + rotation) % selectedFoods.length];
    const second = selectedFoods[(index * 2 + rotation + 1) % selectedFoods.length];
    const foods = first === second ? [first] : [first, second];
    const common = { day, en, profile, foods, title:`${foods.join("と")}の${profile.suffix}` };

    if (budget === 5000) {
      return {
        ...common,
        items:[`主菜：${common.title}`, `副菜：${profile.side}`, `汁物：${profile.soup}`],
        note:`節約ポイント：${profile.seasoning}など家の基本調味料で手軽に。`,
        reuse:`使い回しポイント：${foods[0]}は多めに下ごしらえし、翌日の副菜にも活用。`
      };
    }

    const extra = richAdditions[(richStart + index) % richAdditions.length];
    return {
      ...common,
      title:`${foods.join("と")}・${extra.protein}の${profile.suffix}`,
      items:[`主菜：${foods.join("と")}・${extra.protein}の${profile.suffix}`, `副菜1：${profile.side}`, `副菜2：${extra.side}`, `汁物：${profile.soup}`, `デザート：${extra.dessert}`],
      note:`追加すると良い食材：${extra.protein}、${extra.side.split("の")[0]}、乳製品・果物`,
      reuse:`華やかポイント：器に高さを出して盛り、ハーブやごまで彩りよく仕上げます。`,
      extra
    };
  });
}

function renderPlan(shouldScroll = true) {
  const menus = makeMenus();
  const isRich = budget === 10000;
  currentShoppingExtras = isRich
    ? [...new Set(menus.flatMap(menu => [menu.extra.protein, "季節の果物", "乳製品", "彩り野菜"]))]
    : ["だし・基本の調味料", "ごはんまたは麺"];

  document.querySelector("#ingredients").innerHTML = selectedFoods.map(food => `<div class="ingredient"><span class="ingredient__icon" aria-hidden="true">${foodIcons[food] || "✦"}</span><strong>${escapeHtml(food)}</strong></div>`).join("");
  document.querySelector("#plan-course-description").textContent = isRich ? "追加食材も楽しむ、品数豊かなごちそうプランです" : "5食材をむだなく使い切る、作りやすい節約プランです";
  const summary = document.querySelector("#course-summary");
  summary.classList.toggle("course-summary--rich", isRich);
  summary.textContent = isRich
    ? "10,000円コース｜毎日5品（主菜＋副菜2品＋汁物＋デザート）・肉や魚、乳製品、果物を追加"
    : "5,000円コース｜毎日3品（主菜＋副菜＋汁物）・追加食材を抑えて下ごしらえを使い回し";

  document.querySelector("#menu-list").innerHTML = menus.map(menu => `
    <article class="menu-card${isRich ? " menu-card--rich" : ""}">
      <div class="menu-card__day">${menu.en}<b>${menu.day}</b></div>
      <span class="menu-card__format">${escapeHtml(menu.profile.format)}・${escapeHtml(menu.profile.method)}・${escapeHtml(menu.profile.flavor)}</span>
      <h3>${escapeHtml(menu.title)}</h3>
      <p>選んだ食材：<span class="used-foods">${menu.foods.map(escapeHtml).join("・")}</span></p>
      <p class="menu-card__items">${menu.items.map(item => escapeHtml(item)).join("<br>")}</p>
      <p><b>${escapeHtml(menu.note)}</b></p><p>${escapeHtml(menu.reuse)}</p>
    </article>`).join("");
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
  const items = [...selectedFoods, ...currentShoppingExtras];
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
