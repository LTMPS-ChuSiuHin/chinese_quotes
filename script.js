let currentUtterance = null;

let speechVoices = [];

function loadVoices() {
  speechVoices = window.speechSynthesis.getVoices();
}

if ('speechSynthesis' in window) {
  window.speechSynthesis.onvoiceschanged = () => {
    window.speechSynthesis.getVoices();
  };
}

const quotes = [
 {img:'18801C7A-1217-413B-A6BB-E080640F6FCF.jpeg', quote:'克己復禮為仁。', source:'《論語・顏淵》', location:'前梯 6/F 往 天台', value:'有禮', meaning:'能約束自己，按禮儀和規矩做事，就是仁德的表現。', story:'孔子回答學生顏淵時，提出人要先管理好自己，尊重禮儀，才可成為有仁德的人。'},
 {img:'C17A5B6D-73D8-45B1-A151-755E5A91ABF0.jpeg', quote:'風聲雨聲讀書聲，聲聲入耳；家事國事天下事，事事關心。', source:'顧憲成《題東林書院》', location:'前梯 5/F 往 6/F', value:'國民身份認同', meaning:'我們要用心讀書，也要關心家庭、國家和世界的事情。', story:'東林書院重視讀書人的責任，提醒學生學習不只在課本，也要關心社會和國家。'},
 {img:'66473C9D-BC33-4FC1-BF69-3855A6544322.jpeg', quote:'業精於勤，荒於嬉。', source:'韓愈《進學解》', location:'前梯 4/F 往 5/F', value:'勤勞', meaning:'學業和本領會因勤奮而進步，也會因貪玩而荒廢。', story:'韓愈在文章中鼓勵學生勤力學習，不要只顧玩樂。'},
 {img:'00E507B1-3A41-4815-8A5E-BFDAEC4BC62E.jpeg', quote:'身體髮膚，受之父母，不敢毀傷，孝之始也。', source:'《孝經・開宗明義章》', location:'前梯 3/F 往 4/F', value:'孝親', meaning:'身體是父母給予的，我們要愛惜自己，這是孝順的開始。', story:'《孝經》提醒人要珍惜生命，懂得感恩父母。'},
 {img:'F46DFC07-6AB2-4697-8037-1E5BE913EDFC.jpeg', quote:'仁者愛人。', source:'《孟子・離婁下》', location:'前梯 2/F 往 3/F', value:'仁愛', meaning:'有仁愛之心的人，會關心和愛護別人。', story:'孟子重視仁愛，認為做人要懂得關懷身邊的人。'},
 {img:'A3B7B4FA-83A1-4C9F-8189-C06AD14E8FAE.jpeg', quote:'世上無難事，只怕有心人。', source:'《西遊記》', location:'前梯 1/F 往 2/F', value:'堅毅', meaning:'只要有決心和努力，再困難的事也有機會成功。', story:'《西遊記》中師徒取經路上困難重重，但仍然堅持到底。'},
 {img:'1F6BBD7A-1371-41D8-8456-D150D753447E.jpeg', quote:'己所不欲，勿施於人。', source:'《論語・衛靈公》', location:'前梯 G/F 往 1/F', value:'尊重他人', meaning:'自己不喜歡的事，不要強加在別人身上。', story:'孔子教導學生做人要有同理心，先想想別人的感受。'},
 {img:'DBA1E3EA-A4CA-44F9-AB66-C7B25137061C.jpeg', quote:'勿以惡小而為之，勿以善小而不為。', source:'《三國志・蜀書》', location:'後梯 6/F 往 天台', value:'樂於助人', meaning:'不要因壞事很小就去做，也不要因好事很小就不做。', story:'這句話常用來提醒人從小事培養好品格，多做善事。'},
 {img:'BD74FAC2-5392-487E-9F25-0D87BE0E7C0F.jpeg', quote:'士不可以不弘毅，任重而道遠。', source:'《論語・泰伯》', location:'後梯 5/F 往 6/F', value:'責任感', meaning:'有志向的人要堅強有毅力，因為責任重大，路也很長。', story:'曾子鼓勵學生要有遠大志向，願意承擔重要責任。'},
 {img:'E2DE7262-D21B-4FC1-9DF7-F935E7FDF0CF.jpeg', quote:'見義不為，無勇也。', source:'《論語・為政》', location:'後梯 4/F 往 5/F', value:'承擔精神', meaning:'見到應該做的正義事情卻不去做，就是不夠勇敢。', story:'孔子提醒人要有勇氣做正確的事。'},
 {img:'5EDE2BB7-94D1-41ED-BE12-9CB03557F7DC.jpeg', quote:'二人同心，其利斷金。', source:'《周易・繫辭上》', location:'後梯 3/F 往 4/F', value:'團結', meaning:'大家齊心合作，力量可以非常強大。', story:'《周易》用「斷金」比喻同心合作的力量很大。'},
 {img:'5F1E79DC-A8FF-4FF1-B2CF-0E9A4B05E830.jpeg', quote:'推己及人。', source:'朱熹《四書章句集注》', location:'後梯 2/F 往 3/F', value:'同理心', meaning:'用自己的感受去想想別人的感受。', story:'朱熹解釋儒家思想時，提醒人要由自己想到別人。'},
 {img:'42FBEBAB-A553-4263-8049-2C64EB9550CB.jpeg', quote:'奉法者強則國強，奉法者弱則國弱。', source:'《韓非子・有度》', location:'後梯 1/F 往 2/F', value:'守法', meaning:'大家重視和遵守法律，國家便會強盛；不守法，國家便會變弱。', story:'韓非子重視法治，認為守法能令社會有秩序。'},
 {img:'949430A5-76C4-4D21-B19E-451C3520F67C.jpeg', quote:'與朋友交，言而有信。', source:'《論語・學而》', location:'後梯 G/F 往 1/F', value:'誠信', meaning:'和朋友相處，說話要守信用。', story:'孔子認為誠信是交朋友的重要基礎。'}
];

const qTemplates = [
 ['這句名句主要教我們甚麼？',['按自己的喜好做事','要學會「{{value}}」','只顧比賽勝負'],1],
 ['以下哪一個行為最符合這句名句？',['做事前想清楚，並尊重別人','遇到困難就立即放棄','只顧自己開心'],0],
 ['這句名句適合在哪一種情境提醒自己？',['與人相處、學習或做選擇時','只顧玩遊戲時','取笑同學時'],0],
 ['以下哪一句最接近這句名句的意思？',['小事不用理會','做人要有好品格','不用關心別人'],1],
 ['讀完這句名句，我們可以怎樣實踐？',['每天做一件正確或有益的事','遇到責任就逃避','朋友有需要也不理會'],0],
 ['這句名句與哪一種校園行為最有關？',['尊重別人、努力學習、守規有禮','在課室追逐','故意打擾同學'],0],
 ['這句名句提醒我們不要怎樣？',['不思考就亂做事','關心別人','認真學習'],0]
];

let current = null;
let currentQuiz = [];
let answered = 0;
let score = 0;

function renderGrid(){
  const grid=document.getElementById('quoteGrid');
  grid.innerHTML=quotes.map((q,i)=>`
    <button class="quote-card" onclick="selectQuote(${i})" aria-label="${q.quote}">
      <div class="plaque-frame"><img src="images/${q.img}" alt="${q.quote}"></div>
      <h3>${q.quote}</h3>
      <div class="home-meta">
        <span class="home-pill location-pill">📍 ${q.location}</span>
        <span class="home-pill value-pill">⭐ ${q.value}</span>
      </div>
    </button>`).join('');
}

function selectQuote(i){
  current=i;
  document.querySelectorAll('.quote-card').forEach((card,idx)=>card.classList.toggle('active',idx===i));
  document.getElementById('emptyState').style.display='none';
  renderMeaning();
  const detail=document.getElementById('meaningContent');
  if(window.matchMedia('(max-width:1080px)').matches){ detail.scrollIntoView({behavior:'smooth',block:'start'}); }
}

function renderMeaning(){
  const q=quotes[current];
  document.getElementById('meaningContent').innerHTML=`
    <article class="meaning-card">
      <div class="plaque-frame"><img src="images/${q.img}" alt="${q.quote}"></div>
      <div>
        <h2 class="quote-text">${q.quote}</h2>
        <div class="source">出處：${q.source}</div>
        <div class="meta-row">
          <span class="pill location-pill">📍 地點：${q.location}</span>
          <span class="pill value-pill">⭐ 價值觀：${q.value}</span>
        </div>
        <p class="explain"><b>意思：</b>${q.meaning}</p>
        <p class="explain"><b>小典故：</b>${q.story}</p>
        <div class="audio-row">
          <button onclick="speakIntro('zh-HK')">🔊 粵語讀出</button>
          <button onclick="speakIntro('zh-CN')">🔊 普通話讀出</button>
        </div>
      </div>
    </article>`;
  renderQuiz('inlineQuiz');
}

if ('speechSynthesis' in window) {
  loadVoices();
  // 當系統語音準備好時，更新清單
  window.speechSynthesis.onvoiceschanged = loadVoices;
}

function speakIntro(lang) {
  const q = quotes[current];
  const text = `${q.quote}。出處：${q.source}。地點：${q.location}。價值觀：${q.value}。意思：${q.meaning} 小典故：${q.story}`;
  
  // 停止先前的語音
  window.speechSynthesis.cancel();
  
  currentUtterance = new SpeechSynthesisUtterance(text);
  
  // 取得裝置當前真正擁有的語音清單
  const voices = window.speechSynthesis.getVoices();
  let targetVoice = null;

  if (lang === 'zh-CN') {
    // 【終極解法】
    // 1. 先找有沒有正統普通話 (zh-CN, zh-Hans-CN)
    // 2. 如果沒有，退而求其次找台灣國語 (zh-TW, zh-Hant-TW) -> 大多數港版手機有這個！
    targetVoice = voices.find(v => v.lang === 'zh-CN' || v.lang === 'zh-Hans-CN') ||
                  voices.find(v => v.lang === 'zh-TW' || v.lang === 'zh-Hant-TW') ||
                  voices.find(v => v.name.toLowerCase().includes('mandarin'));
    
    // 【最重要的一行】
    // 必須把任務的 lang 設定為裝置真正擁有的那個語言標籤。
    // 如果連 targetVoice 都找不到，我們硬塞 'zh-TW' 給它，這在 iOS 上的成功率遠高於 'zh-CN'
    currentUtterance.lang = targetVoice ? targetVoice.lang : 'zh-TW';

  } else if (lang === 'zh-HK') {
    // 粵語邏輯
    targetVoice = voices.find(v => v.lang.includes('zh-HK') || v.name.toLowerCase().includes('cantonese'));
    currentUtterance.lang = targetVoice ? targetVoice.lang : 'zh-HK';
  }

  // 如果有找到明確的語音設定檔，就掛載上去
  if (targetVoice) {
    currentUtterance.voice = targetVoice;
  }
  
  // 確保語速和音調為預設值，否則 iOS 會罷工
  currentUtterance.rate = 1.0;
  currentUtterance.pitch = 1.0;

  // 播放
  window.speechSynthesis.speak(currentUtterance);
}



function buildQuiz(){
  const q=quotes[current];
  const pool=qTemplates.map(t=>({
    question:t[0],
    options:t[1].map(x=>x.replace('{{value}}',q.value)),
    answer:t[2]
  }));
  return pool.sort(()=>Math.random()-0.5).slice(0,3);
}

function renderQuiz(targetId){
  currentQuiz=buildQuiz(); answered=0; score=0;
  const q=quotes[current];
  document.getElementById(targetId).innerHTML=`<div class="quiz-box"><h3>「${q.quote}」三題挑戰</h3><p class="quiz-note">每次完成3題後，系統會顯示小總結。</p><div id="${targetId}_list">${currentQuiz.map((item,i)=>renderQ(item,i,targetId)).join('')}</div><div id="${targetId}_summary"></div></div>`;
}
function renderQ(item,i,targetId){
  return `<div class="question-card" data-q="${i}"><div class="q-title">第 ${i+1} 題：${item.question}</div><div class="options">${item.options.map((op,j)=>`<button class="option" onclick="answerQ('${targetId}',${i},${j})">${String.fromCharCode(65+j)}. ${op}</button>`).join('')}</div><div class="feedback"></div></div>`;
}
function answerQ(targetId,i,j){
  const card=document.querySelector(`#${targetId}_list .question-card[data-q="${i}"]`);
  if(card.dataset.done) return;
  card.dataset.done='1'; answered++;
  const item=currentQuiz[i];
  const buttons=card.querySelectorAll('.option');
  buttons[item.answer].classList.add('correct');
  if(j===item.answer){score++; card.querySelector('.feedback').textContent='✅ 正確！你明白這句名句的意思。';}
  else{buttons[j].classList.add('wrong'); card.querySelector('.feedback').textContent=`❌ 未答對。正確答案是：${String.fromCharCode(65+item.answer)}. ${item.options[item.answer]}`;}
  if(answered===3){
    document.getElementById(`${targetId}_summary`).innerHTML=`<div class="summary">完成挑戰！你答對 ${score} / 3 題。${score===3?'太好了，繼續保持！':'再看一次名句意思，下一次會更好！'}<br><button class="next-btn" onclick="renderQuiz('${targetId}')">再做下一個挑戰</button></div>`;
  }
}

renderGrid();
