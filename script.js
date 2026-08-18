const plans = {
  5000: [
    { ingredients:[["鶏むね肉","🍗","2枚"],["豚こま肉","🥩","400g"],["キャベツ","🥬","1玉"],["じゃがいも","🥔","5個"],["卵","🥚","10個"]], extras:["玉ねぎ 3個","にんじん 2本","豆腐 1丁","牛乳 1本","基本の調味料"], menus:[["月","MON","鶏むね肉の照り焼き","鶏むね肉・キャベツ","鶏肉を焼き、しょうゆ・みりん・砂糖を絡めます。千切りキャベツを添えて。"],["火","TUE","豚こまとじゃがいもの甘辛炒め","豚こま肉・じゃがいも","細切りのじゃがいもと豚肉を炒め、甘辛だれで味付けします。"],["水","WED","ふんわり卵のキャベツお好み焼き","卵・キャベツ・豚こま肉","刻んだキャベツを卵と小麦粉に混ぜ、豚肉をのせて両面焼きます。"],["木","THU","鶏じゃがのやさしい煮物","鶏むね肉・じゃがいも","ひと口大の具材をだしと調味料で、味がしみるまで煮ます。"],["金","FRI","豚肉とキャベツの味噌炒め","豚こま肉・キャベツ","豚肉とキャベツをさっと炒め、味噌だれを絡めます。"],["土","SAT","具だくさんスペイン風オムレツ","卵・じゃがいも","薄切りのじゃがいもを炒め、溶き卵を流してじっくり焼きます。"],["日","SUN","鶏とキャベツのとろとろスープ煮","鶏むね肉・キャベツ・卵","鶏肉とキャベツをスープで煮て、最後に溶き卵を流します。"]]},
    { ingredients:[["鮭","🐟","4切れ"],["鶏ひき肉","🍗","400g"],["白菜","🥬","1/2玉"],["大根","◯","1本"],["厚揚げ","◇","2枚"]], extras:["長ねぎ 2本","しめじ 1パック","卵 6個","しょうが 1片","基本の調味料"], menus:[["月","MON","鮭と白菜の味噌蒸し","鮭・白菜","フライパンに重ねて蒸し、味噌だれを絡めます。"],["火","TUE","大根入り鶏そぼろ煮","鶏ひき肉・大根","大根を鶏そぼろとだしでやわらかく煮ます。"],["水","WED","厚揚げの甘辛そぼろあん","厚揚げ・鶏ひき肉","焼いた厚揚げに、とろみをつけたそぼろあんをかけます。"],["木","THU","鮭のみぞれ煮","鮭・大根","焼いた鮭を大根おろし入りのだしでさっと煮ます。"],["金","FRI","白菜と厚揚げの中華炒め","白菜・厚揚げ","強火で香ばしく炒め、しょうゆとごま油で調えます。"],["土","SAT","鶏つくねと大根の照り煮","鶏ひき肉・大根","丸めたつくねと大根を甘辛く煮含めます。"],["日","SUN","鮭と白菜のあったか鍋","鮭・白菜・厚揚げ","すべてを食べやすく切り、だしで煮るだけの簡単鍋です。"]]},
    { ingredients:[["豚ひき肉","🥩","400g"],["さば缶","🥫","3缶"],["もやし","🌱","4袋"],["かぼちゃ","🎃","1/2個"],["豆腐","□","3丁"]], extras:["にら 1束","玉ねぎ 2個","きのこ 1パック","卵 6個","基本の調味料"], menus:[["月","MON","麻婆豆腐","豚ひき肉・豆腐","ひき肉を炒め、豆腐と味噌ベースのたれを煮絡めます。"],["火","TUE","さばとかぼちゃの味噌煮","さば缶・かぼちゃ","かぼちゃとさば缶を汁ごと入れ、味噌で煮ます。"],["水","WED","もやしの肉味噌炒め","豚ひき肉・もやし","ひき肉ともやしを強火で炒め、甘味噌で調えます。"],["木","THU","豆腐とかぼちゃのそぼろあん","豆腐・かぼちゃ・豚ひき肉","やわらかく煮た具材に、とろみをつけます。"],["金","FRI","さば缶のもやしチャンプルー","さば缶・もやし・豆腐","水切り豆腐と材料を炒め、塩こしょうで調えます。"],["土","SAT","かぼちゃのそぼろコロッケ風","かぼちゃ・豚ひき肉","炒めた具にパン粉をかけ、トースターで焼きます。"],["日","SUN","さばと豆腐のふんわりつくね","さば缶・豆腐","混ぜて丸めたたねを焼き、ぽん酢でいただきます。"]]}
  ],
  10000: [
    { ingredients:[["牛薄切り肉","🥩","500g"],["生鮭","🐟","4切れ"],["ブロッコリー","🥦","2株"],["トマト","🍅","6個"],["きのこセット","🍄","3袋"]], extras:["玉ねぎ 3個","じゃがいも 4個","生クリーム 1パック","チーズ 1袋","ベビーリーフ 1袋","基本の調味料"], menus:[["月","MON","牛肉ときのこの和風ステーキ炒め","牛肉・きのこ","牛肉ときのこを香ばしく焼き、バターしょうゆで仕上げます。"],["火","TUE","鮭とブロッコリーのクリーム煮","鮭・ブロッコリー","焼いた鮭と野菜を、牛乳ベースのソースで軽く煮ます。"],["水","WED","牛肉とトマトのすき煮","牛肉・トマト","牛肉と玉ねぎを甘辛く煮て、最後にトマトを加えます。"],["木","THU","鮭ときのこの包み焼き","鮭・きのこ","ホイルにのせて調味し、フライパンでふっくら蒸し焼きに。"],["金","FRI","彩りビーフストロガノフ","牛肉・きのこ・トマト","具材を炒め、トマトとクリームでコク深く煮込みます。"],["土","SAT","鮭とブロッコリーのチーズ焼き","鮭・ブロッコリー","耐熱皿に並べてチーズをのせ、こんがり焼きます。"],["日","SUN","ごちそう牛肉トマト鍋","牛肉・トマト・きのこ","スープで具材を煮て、仕上げにチーズを加えます。"]]},
    { ingredients:[["豚ロース","🥩","7枚"],["えび","🦐","300g"],["アボカド","🥑","3個"],["パプリカ","🫑","3個"],["なす","🍆","5本"]], extras:["レタス 1玉","玉ねぎ 3個","卵 10個","チーズ 1袋","ヨーグルト 1個","基本の調味料"], menus:[["月","MON","豚ロースのハーブソテー","豚ロース・パプリカ","豚肉とパプリカを焼き、塩と乾燥ハーブで香りよく。"],["火","TUE","えびとアボカドの彩りサラダ","えび・アボカド","ゆでたえびとアボカドをヨーグルトソースで和えます。"],["水","WED","豚肉となすの重ね蒸し","豚ロース・なす","薄切りなすと豚肉を重ね、酒を振って蒸します。"],["木","THU","えびとパプリカのふんわり卵炒め","えび・パプリカ","具材を炒め、半熟の卵を戻してさっと合わせます。"],["金","FRI","なすとアボカドのチーズ焼き","なす・アボカド","焼いたなすとアボカドにチーズをのせて焼きます。"],["土","SAT","ごちそうポーク南蛮","豚ロース・パプリカ","焼いた豚肉を甘酢に絡め、彩り野菜を添えます。"],["日","SUN","えびとなすのトマトパスタ","えび・なす","えびとなすをトマトソースで煮て、パスタと和えます。"]]},
    { ingredients:[["鶏もも肉","🍗","4枚"],["ぶり","🐟","4切れ"],["れんこん","🪷","2節"],["ほうれん草","🥬","2束"],["ミニトマト","🍅","2パック"]], extras:["長ねぎ 2本","大根 1/2本","卵 10個","豆乳 1本","チーズ 1袋","基本の調味料"], menus:[["月","MON","鶏もも肉とれんこんの照り焼き","鶏もも肉・れんこん","こんがり焼いた具材に甘辛だれを絡めます。"],["火","TUE","ぶりと大根のさっぱり煮","ぶり・大根","ぶりと大根をしょうが入りの煮汁で煮ます。"],["水","WED","ほうれん草と鶏肉の豆乳グラタン","鶏もも肉・ほうれん草","炒めた具を豆乳ソースとチーズで焼きます。"],["木","THU","ぶりのれんこん甘酢あん","ぶり・れんこん","揚げ焼きにした具材へ甘酢あんを絡めます。"],["金","FRI","鶏肉とミニトマトの香草蒸し","鶏もも肉・ミニトマト","フライパンに並べ、酒とハーブで蒸し焼きにします。"],["土","SAT","れんこん入りごちそうつくね","鶏もも肉・れんこん","刻んだ具を丸めて焼き、照りだれで仕上げます。"],["日","SUN","ぶりとほうれん草の豆乳鍋","ぶり・ほうれん草・ミニトマト","だしと豆乳のスープで彩りよく煮ます。"]]}
  ]
};

const planSection = document.querySelector("#plan");
const ingredients = document.querySelector("#ingredients");
const menuList = document.querySelector("#menu-list");
const dialog = document.querySelector("#shopping-dialog");
let budget = 5000;
let planIndex = { 5000: -1, 10000: -1 };

function renderPlan(nextBudget, shouldScroll = true) {
  budget = Number(nextBudget);
  planIndex[budget] = (planIndex[budget] + 1) % plans[budget].length;
  const plan = plans[budget][planIndex[budget]];
  document.querySelector("#course-label").textContent = `${budget.toLocaleString()}円コース`;
  ingredients.innerHTML = plan.ingredients.map(([name, icon, amount]) => `<div class="ingredient"><span class="ingredient__icon" aria-hidden="true">${icon}</span><strong>${name}</strong><small>${amount}</small></div>`).join("");
  menuList.innerHTML = plan.menus.map(([day, en, title, foods, recipe]) => `<article class="menu-card"><div class="menu-card__day">${en}<b>${day}</b></div><h3>${title}</h3><p><b>主な食材：</b>${foods}</p><p>${recipe}</p></article>`).join("");
  planSection.hidden = false;
  if (shouldScroll) planSection.scrollIntoView({ behavior: "smooth", block: "start" });
}

document.querySelectorAll("[data-budget]").forEach(button => button.addEventListener("click", () => renderPlan(button.dataset.budget)));
document.querySelector("#shuffle-button").addEventListener("click", () => renderPlan(budget, false));
document.querySelector("#shopping-button").addEventListener("click", () => {
  const plan = plans[budget][planIndex[budget]];
  const items = [...plan.ingredients.map(([name,,amount]) => `${name}　${amount}`), ...plan.extras];
  document.querySelector("#shopping-list").innerHTML = items.map((item, i) => `<label class="shopping-item"><input type="checkbox" /><span>${item}</span></label>`).join("");
  dialog.showModal();
});
document.querySelector("#close-dialog").addEventListener("click", () => dialog.close());
document.querySelector("#done-button").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", event => { if (event.target === dialog) dialog.close(); });

// A shareable URL for reviewers who want to see the completed plan immediately.
if (new URLSearchParams(window.location.search).get("preview") === "1") {
  renderPlan(5000, false);
}
