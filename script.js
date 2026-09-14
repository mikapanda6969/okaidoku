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

const menuProfiles = [
  {method:"焼く",flavor:"和風",format:"定食",suffix:"生姜焼き",seasoning:"しょうゆ・しょうが",side:"キャベツの塩昆布和え",soup:"豆腐のみそ汁"},
  {method:"焼く",flavor:"和風",format:"定食",suffix:"塩こうじ焼き",seasoning:"塩こうじ",side:"大根サラダ",soup:"きのこのすまし汁"},
  {method:"煮る",flavor:"和風",format:"定食",suffix:"みぞれ煮",seasoning:"だし・しょうゆ",side:"青菜のおひたし",soup:"なめこのみそ汁"},
  {method:"煮る",flavor:"味噌",format:"定食",suffix:"味噌煮",seasoning:"味噌・だし",side:"きゅうりの浅漬け",soup:"根菜汁"},
  {method:"揚げる",flavor:"甘酢",format:"定食",suffix:"南蛮漬け",seasoning:"酢・しょうゆ",side:"千切り野菜",soup:"わかめのみそ汁"},
  {method:"揚げる",flavor:"和風",format:"定食",suffix:"竜田揚げ",seasoning:"しょうゆ・しょうが",side:"大根おろし",soup:"玉ねぎのみそ汁"},
  {method:"蒸す",flavor:"和風",format:"定食",suffix:"酒蒸し",seasoning:"酒・塩",side:"ごま和え",soup:"すまし汁"},
  {method:"蒸す",flavor:"ポン酢",format:"せいろ風",suffix:"せいろ蒸し",seasoning:"ポン酢",side:"香味だれ野菜",soup:"卵スープ"},
  {method:"炊く",flavor:"だし",format:"ご飯もの",suffix:"炊き込みご飯",seasoning:"だし・しょうゆ",side:"冷ややっこ",soup:"みそ汁"},
  {method:"混ぜる",flavor:"和風",format:"ご飯もの",suffix:"混ぜご飯",seasoning:"しょうゆ・ごま",side:"酢の物",soup:"けんちん汁"},
  {method:"炒める",flavor:"和風",format:"丼",suffix:"そぼろ丼",seasoning:"甘辛しょうゆ",side:"青菜ナムル",soup:"わかめスープ"},
  {method:"煮る",flavor:"だし",format:"丼",suffix:"卵とじ丼",seasoning:"だし・しょうゆ",side:"浅漬け",soup:"みそ汁"},
  {method:"炒める",flavor:"味噌",format:"ワンプレート",suffix:"味噌炒め",seasoning:"味噌・みりん",side:"豆苗サラダ",soup:"中華スープ"},
  {method:"和える",flavor:"ごま味噌",format:"副菜主役",suffix:"ごま味噌和え",seasoning:"ごま・味噌",side:"だし巻き卵",soup:"根菜スープ"},
  {method:"炒める",flavor:"洋風",format:"ワンプレート",suffix:"ガーリックソテー",seasoning:"にんにく・塩",side:"グリーンサラダ",soup:"コンソメスープ"},
  {method:"煮る",flavor:"トマト",format:"洋食",suffix:"トマト煮",seasoning:"トマト・コンソメ",side:"コールスロー",soup:"ミルクスープ"},
  {method:"煮る",flavor:"クリーム",format:"洋食",suffix:"クリーム煮",seasoning:"牛乳・コンソメ",side:"温野菜",soup:"オニオンスープ"},
  {method:"煮る",flavor:"洋風",format:"スープ",suffix:"ポトフ",seasoning:"コンソメ",side:"パン風サラダ",soup:"主菜兼スープ"},
  {method:"焼く",flavor:"ハーブ",format:"洋食",suffix:"香草パン粉焼き",seasoning:"パン粉・ハーブ",side:"マリネ",soup:"トマトスープ"},
  {method:"焼く",flavor:"洋風",format:"洋食",suffix:"オムレツ",seasoning:"塩・バター",side:"ポテトサラダ",soup:"コンソメスープ"},
  {method:"オーブン焼き",flavor:"チーズ",format:"グラタン",suffix:"チーズグラタン",seasoning:"チーズ・ホワイトソース",side:"彩りサラダ",soup:"野菜スープ"},
  {method:"オーブン焼き",flavor:"チーズ",format:"ドリア",suffix:"焼きチーズドリア",seasoning:"チーズ・トマト",side:"ピクルス",soup:"コンソメスープ"},
  {method:"焼く",flavor:"洋風",format:"ワンプレート",suffix:"ローストプレート",seasoning:"塩・ハーブ",side:"温野菜",soup:"オニオンスープ"},
  {method:"和える",flavor:"レモン",format:"サラダメイン",suffix:"温野菜サラダプレート",seasoning:"レモン・オリーブ油",side:"ゆで卵",soup:"ミネストローネ"},
  {method:"煮る",flavor:"トマト",format:"スープ",suffix:"ミネストローネ",seasoning:"トマト・コンソメ",side:"チーズトースト風",soup:"主菜兼スープ"},
  {method:"煮る",flavor:"豆乳",format:"スープ",suffix:"豆乳スープ",seasoning:"豆乳・だし",side:"ごまサラダ",soup:"主菜兼スープ"},
  {method:"煮る",flavor:"クリーム",format:"スープ",suffix:"クラムチャウダー風",seasoning:"牛乳・コンソメ",side:"グリーンサラダ",soup:"主菜兼スープ"},
  {method:"炒める",flavor:"中華",format:"中華",suffix:"八宝菜",seasoning:"鶏がら・塩",side:"中華きゅうり",soup:"卵スープ"},
  {method:"炒める",flavor:"中華",format:"中華",suffix:"回鍋肉風",seasoning:"甜麺醤・味噌",side:"もやしナムル",soup:"わかめスープ"},
  {method:"煮る",flavor:"中華",format:"中華",suffix:"麻婆風",seasoning:"豆板醤・味噌",side:"春雨サラダ",soup:"中華スープ"},
  {method:"炒める",flavor:"甘酢",format:"中華",suffix:"甘酢炒め",seasoning:"酢・しょうゆ",side:"中華サラダ",soup:"卵スープ"},
  {method:"炒める",flavor:"オイスター",format:"丼",suffix:"中華丼",seasoning:"オイスターソース",side:"ザーサイ風和え",soup:"わかめスープ"},
  {method:"炒める",flavor:"中華",format:"麺",suffix:"あんかけ焼きそば",seasoning:"鶏がら・ごま油",side:"蒸し野菜",soup:"なし"},
  {method:"蒸す",flavor:"中華",format:"中華",suffix:"中華蒸し",seasoning:"ごま油・しょうゆ",side:"春雨サラダ",soup:"卵スープ"},
  {method:"炒める",flavor:"韓国",format:"韓国風",suffix:"チャプチェ",seasoning:"甘辛しょうゆ",side:"ナムル",soup:"わかめスープ"},
  {method:"混ぜる",flavor:"韓国",format:"丼",suffix:"ビビンバ",seasoning:"コチュジャン",side:"韓国のり風サラダ",soup:"卵スープ"},
  {method:"焼く",flavor:"韓国",format:"韓国風",suffix:"チヂミ",seasoning:"ごま油・たれ",side:"ナムル",soup:"わかめスープ"},
  {method:"煮る",flavor:"韓国",format:"鍋",suffix:"スンドゥブ風鍋",seasoning:"コチュジャン・だし",side:"韓国風サラダ",soup:"主菜兼スープ"},
  {method:"炒める",flavor:"韓国",format:"韓国風",suffix:"プルコギ風",seasoning:"甘辛だれ",side:"ナムル",soup:"わかめスープ"},
  {method:"蒸す",flavor:"韓国",format:"韓国風",suffix:"韓国風蒸し煮",seasoning:"コチュジャン・しょうゆ",side:"塩ナムル",soup:"卵スープ"},
  {method:"焼く",flavor:"スパイス",format:"エスニック",suffix:"タンドリー風焼き",seasoning:"カレー粉・ヨーグルト",side:"紫キャベツ風サラダ",soup:"野菜スープ"},
  {method:"炒める",flavor:"バジル",format:"丼",suffix:"ガパオ風ライス",seasoning:"バジル・ナンプラー",side:"目玉焼き風トッピング",soup:"春雨スープ"},
  {method:"蒸す",flavor:"ナンプラー",format:"エスニック",suffix:"ナンプラー蒸し",seasoning:"ナンプラー・レモン",side:"香味サラダ",soup:"スパイススープ"},
  {method:"煮る",flavor:"スパイス",format:"カレー",suffix:"ココナッツカレー",seasoning:"カレー粉・ココナッツ",side:"さっぱりサラダ",soup:"なし"},
  {method:"和える",flavor:"エスニック",format:"サラダメイン",suffix:"エスニックサラダ",seasoning:"ナンプラー・レモン",side:"ゆで卵",soup:"春雨スープ"},
  {method:"煮る",flavor:"スパイス",format:"スープ",suffix:"スパイススープ",seasoning:"カレー粉・コンソメ",side:"ヨーグルト風サラダ",soup:"主菜兼スープ"},
  {method:"炒める",flavor:"和風",format:"パスタ",suffix:"和風パスタ",seasoning:"しょうゆ・バター",side:"サラダ",soup:"コンソメスープ"},
  {method:"煮る",flavor:"トマト",format:"パスタ",suffix:"トマトパスタ",seasoning:"トマト・ハーブ",side:"マリネ",soup:"野菜スープ"},
  {method:"炒める",flavor:"ガーリック",format:"パスタ",suffix:"ペペロンチーノ風",seasoning:"にんにく・唐辛子",side:"サラダ",soup:"コンソメスープ"},
  {method:"煮る",flavor:"チーズ",format:"リゾット",suffix:"チーズリゾット",seasoning:"チーズ・コンソメ",side:"マリネ",soup:"なし"},
  {method:"蒸す",flavor:"イタリアン",format:"イタリアン",suffix:"イタリアン蒸し焼き",seasoning:"トマト・ハーブ",side:"カプレーゼ風サラダ",soup:"野菜スープ"},
  {method:"焼く",flavor:"チーズ",format:"イタリアン",suffix:"ピカタ",seasoning:"卵・チーズ",side:"トマトサラダ",soup:"コンソメスープ"},
  {method:"炒める",flavor:"和風",format:"麺",suffix:"焼きうどん",seasoning:"しょうゆ・だし",side:"冷ややっこ",soup:"みそ汁"},
  {method:"煮る",flavor:"豆乳",format:"麺",suffix:"豆乳うどん",seasoning:"豆乳・だし",side:"浅漬け",soup:"なし"},
  {method:"煮る",flavor:"スパイス",format:"カレー",suffix:"スープカレー",seasoning:"カレー粉・だし",side:"ピクルス",soup:"主菜兼スープ"},
  {method:"炒める",flavor:"スパイス",format:"カレー",suffix:"キーマカレー風",seasoning:"カレー粉・トマト",side:"ヨーグルトサラダ",soup:"なし"},
  {method:"煮る",flavor:"クリーム",format:"シチュー",suffix:"クリームシチュー",seasoning:"牛乳・コンソメ",side:"グリーンサラダ",soup:"主菜兼スープ"},
  {method:"煮る",flavor:"トマト",format:"鍋",suffix:"トマト鍋",seasoning:"トマト・コンソメ",side:"チーズ風トッピング",soup:"主菜兼スープ"},
  {method:"蒸す",flavor:"ポン酢",format:"蒸し料理",suffix:"せいろ風蒸し料理",seasoning:"ポン酢・ごま",side:"香味野菜",soup:"すまし汁"},
  {method:"揚げる",flavor:"ハーブ塩",format:"揚げ物",suffix:"フリット盛り",seasoning:"ハーブ塩",side:"レモンサラダ",soup:"コンソメスープ"},
  {method:"揚げる",flavor:"甘酢",format:"ワンプレート",suffix:"南蛮風ワンプレート",seasoning:"甘酢だれ",side:"タルタル風サラダ",soup:"野菜スープ"},
  {method:"オーブン焼き",flavor:"ガーリック",format:"オーブン料理",suffix:"ごちそうオーブン焼き",seasoning:"にんにく・ハーブ",side:"彩り野菜",soup:"ミネストローネ"}
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
let previousTitles = [];
let currentShoppingExtras = [];

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, character => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", "'":"&#39;", '"':"&quot;" })[character]);
}

function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function renderCandidates() {
  document.querySelector("#candidate-groups").innerHTML = Object.entries(foodGroups).map(([group, foods]) => `
    <section class="candidate-group" aria-labelledby="group-${group}">
      <h3 id="group-${group}">【${group}】</h3>
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

function selectProfiles() {
  const old = new Set(previousTitles);
  const freshFirst = shuffle(menuProfiles).filter(profile => !old.has(profile.suffix));
  const pool = freshFirst.length >= 7 ? freshFirst : shuffle(menuProfiles);
  const chosen = [];
  const methodCount = {};
  const flavorCount = {};
  for (const profile of pool) {
    if (chosen.length === 7) break;
    const sameMethodAsPrevious = chosen.length && chosen[chosen.length - 1].method === profile.method;
    const tooManyMethod = (methodCount[profile.method] || 0) >= 2;
    const tooManyFlavor = (flavorCount[profile.flavor] || 0) >= 2;
    if (sameMethodAsPrevious || tooManyMethod || tooManyFlavor) continue;
    chosen.push(profile);
    methodCount[profile.method] = (methodCount[profile.method] || 0) + 1;
    flavorCount[profile.flavor] = (flavorCount[profile.flavor] || 0) + 1;
  }
  if (chosen.length < 7) {
    for (const profile of shuffle(menuProfiles)) {
      if (chosen.length === 7) break;
      if (!chosen.some(item => item.suffix === profile.suffix)) chosen.push(profile);
    }
  }
  previousTitles = chosen.map(profile => profile.suffix);
  return chosen;
}

function makeMenus() {
  const profiles = selectProfiles();
  const rotatedFoods = shuffle(selectedFoods);
  const richStart = Math.floor(Math.random() * richAdditions.length);
  return dayLabels.map(([day, en], index) => {
    const profile = profiles[index];
    const first = rotatedFoods[index % rotatedFoods.length];
    const second = rotatedFoods[(index + 2) % rotatedFoods.length];
    const foods = first === second ? [first] : [first, second];
    const baseTitle = `${foods.join("と")}の${profile.suffix}`;
    if (budget === 5000) {
      return {
        day, en, profile, foods, title: baseTitle,
        items:[`主菜：${baseTitle}`, `副菜：${profile.side}`, `汁物：${profile.soup}`],
        note:`節約ポイント：${profile.seasoning}など家の基本調味料で手軽に。`,
        reuse:`使い回しポイント：${foods[0]}を多めに下ごしらえし、別の日にも自然に活用。`
      };
    }
    const extra = richAdditions[(richStart + index) % richAdditions.length];
    const richTitle = `${foods.join("と")}・${extra.protein}の${profile.suffix}`;
    return {
      day, en, profile, foods, title: richTitle,
      items:[`主菜：${richTitle}`, `副菜1：${profile.side}`, `副菜2：${extra.side}`, `汁物：${profile.soup}`, `デザート：${extra.dessert}`],
      note:`追加すると良い食材：${extra.protein}、乳製品、果物、彩り野菜`,
      reuse:`華やかポイント：追加食材を使って品数と見た目に変化をつけます。`,
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
    ? "10,000円コース｜毎日5品（主菜＋副菜2品＋汁物＋デザート）・追加食材で変化をつけます"
    : "5,000円コース｜毎日3品（主菜＋副菜＋汁物）・追加食材を抑えて上手に使い回します";
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
