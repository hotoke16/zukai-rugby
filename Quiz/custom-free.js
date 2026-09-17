$(document).ready(function() {
  
  // 無料版で使うデータをここに直接持つ（外部ファイルに依存しない）
  const freeQuestions = [
    // 初級からいくつか抜粋して定義（必要に応じて増やしてください）
    {
    id: "r01",
    q: "ラックの成立条件は？",
    choices: [
      "タックルが起きたら",
      "タックルが起きて、アタックの１人がオーバーに入ったら",
      "タックルが起きて、両チームのプレイヤーが組み合ったら",
    ],
    ans: [2],
    tags: ["ラック"],
    exp: "両チームのプレイヤーが組み合ったら成立します。アタック１人だけが入ったらワンサイドラックです。",
  },
  {
    id: "r02",
    q: "ラック成立後、手を使っていいか？",
    choices: [
      "使ってもよい",
      "使ってはならない",
    ],
    ans: [1],
    tags: ["ラック", "反則"],
    exp: "ラック成立後に手を使ってしまうと、ハンドの反則になります。",
  },
  {
    id: "r03",
    q: "倒されたボールキャリアーがボールを離すことができなかったときの反則名は？",
    choices: [
      "オフザゲート",
      "オフフィート",
      "ノットリリースザボール",
      "ノットロールアウェイ",
      "ホールディング",
    ],
    ans: [2],
    tags: ["ラック", "反則"],
    exp: "ボールキャリアーは倒されたあと、ボールを離す（リリース）必要があります。",
  },
  {
    id: "r04",
    q: "倒れながらオーバーやスチールをしたときの反則名は？？",
    choices: [
      "オフザゲート",
      "オフフィート",
      "ノットリリースザボール",
      "ノットロールアウェイ",
      "ホールディング",
    ],
    ans: [1],
    tags: ["ラック", "反則"],
    exp: "ボールにプレーするときは、自立して立った状態でなければなりません",
  },
  {
    id: "r05",
    q: "タックルが成立した後、横からボールにプレーする反則名は？",
    choices: [
      "オフザゲート",
      "オフフィート",
      "ノットリリースザボール",
      "ノットロールアウェイ",
      "ホールディング",
    ],
    ans: [0],
    tags: ["ラック", "反則"],
    exp: "タックル成立後にボールへプレーする場合、自陣側からでなければばなりません",
  },
  {
    id: "r06",
    q: "ラックの中でタックラーがボールにおおいかぶさり、ボールが出てくるのを邪魔してしまう反則名は？",
    choices: [
      "オフザゲート",
      "オフフィート",
      "ノットリリースザボール",
      "ノットロールアウェイ",
      "ホールディング",
    ],
    ans: [3],
    tags: ["ラック", "反則"],
    exp: "タックラーはすみやかにロールアウェイをして、ラックから退かなければなりません。",
  },
  {
    id: "r07",
    q: "タックラーがボールキャリアーを倒した後も、離さずに捕まえ続けてしまう反則名は？",
    choices: [
      "オフザゲート",
      "オフフィート",
      "ノットリリースザボール",
      "ノットロールアウェイ",
      "ホールディング",
    ],
    ans: [4],
    tags: ["ラック", "反則"],
    exp: "タックラーはタックル成立後、ボールキャリアーを一度離す必要があります。",
  },
  {
    id: "r08",
    q: "ボールキャリアーが倒れた後、ボールキャリアーが倒れた後、ボールを一度置いてから再び立ち上がってボールを拾い上げるプレーをしたらどうなる？",
    choices: [
      "プレー継続",
      "ハンドの反則",
      "ノットリリースザボールの反則",
    ],
    ans: [0],
    tags: ["ラック", "反則"],
    exp: "ボールを一度置いている（リリースしている）ので、問題ありません。",
  },
  {
    id: "r12",
    q: "ワンサイドラックのとき、手を使っていいか？",
    choices: [
      "使ってもよい",
      "使ってはならない",
    ],
    ans: [0],
    tags: ["ラック", "タックル"],
    exp: "ワンサイドラックであれば、ボールをまたいでいるプレイヤーは手を使ってもよいです",
  },
  ];

let currentQuestions = [];
  let currentIndex = 0;
  let score = 0;

  // 有料版への誘導メッセージ
  function showPremiumAlert() {
    $('#custom-settings').slideUp(200);
    $('#premium-alert').slideDown(200, function() {
      $('html, body').animate({ scrollTop: $('#premium-alert').offset().top - 100 }, 500);
    });
    setTimeout(() => $('#premium-alert').slideUp(300), 3500);
  }

  // メニューの「カスタムクイズ」アコーディオン開閉
  $('#toggle-custom-btn').on('click', function() {
    $('#custom-settings').slideToggle(200);
  });

  // ==========================================
  // お気に入りデータの取得・保存用関数
  // ==========================================
  function getFavorites() {
    return JSON.parse(localStorage.getItem('rugbyFavorites')) || [];
  }
  function saveFavorites(favs) {
    localStorage.setItem('rugbyFavorites', JSON.stringify(favs));
  }

  // ==========================================
  // ヘッダーの「☆（お気に入り）」アイコンを押した時の処理
  // ==========================================
  $('#fav-btn').css('cursor', 'pointer').on('click', function() {
    const qData = currentQuestions[currentIndex];
    if (!qData || !qData.id) return; // IDがない問題はスキップ

    let favs = getFavorites();
    const idx = favs.indexOf(qData.id);

    if (idx === -1) {
      // 登録する
      favs.push(qData.id);
      $(this).text('★').css('color', '#fbc02d'); // 黄色い★に
    } else {
      // 解除する
      favs.splice(idx, 1);
      $(this).text('☆').css('color', ''); // 元の☆に戻す
    }
    saveFavorites(favs);
  });


  // ==========================================
  // 各モード（初級・中級・お気に入り）ボタン処理
  // ==========================================
  $('.mode-btn').on('click', function() {
    const mode = $(this).data('mode');
    const tag = $(this).data('tag');

    let filteredData = [];
    let title = "";

    if (mode === 'beginner') {
      if (typeof beginnerData === 'undefined') {
        alert("beginner.jsが読み込まれていません。");
        return;
      }
      filteredData = beginnerData;
      title = "【初級コース】";
    }
    else if (mode === 'intermediate' && tag === 'ラック') {
      filteredData = freeQuestions;
      title = "【中級コース：ラック】";
    }
    // ★追加：お気に入りモード
    else if (mode === 'favorite') {
      const favs = getFavorites();
      let allQuestions = [];
      if (typeof beginnerData !== 'undefined') allQuestions = allQuestions.concat(beginnerData);
      if (typeof freeQuestions !== 'undefined') allQuestions = allQuestions.concat(freeQuestions);

      filteredData = allQuestions.filter(q => favs.includes(q.id));
      title = "【★お気に入りクイズ】";

      if (filteredData.length === 0) {
        alert("お気に入りに登録されている問題がありません。各問題の右上の☆マークをタップして登録してください。");
        return;
      }

      // お気に入りは反復学習用に「ランダムシャッフル」する
      filteredData.sort(() => Math.random() - 0.5);
    }
    else {
      showPremiumAlert();
      return; 
    }

    $('#premium-alert').hide();
    const displayData = filteredData.slice(0, 10);
    startQuiz(displayData, title);
  });

  // ==========================================
  // カスタムクイズの「出題開始」ボタン処理
  // ==========================================
  $('#start-custom-btn').on('click', function() {
    let selectedTags = [];
    $('.tag-checkboxes input:checked').each(function() {
      selectedTags.push($(this).val());
    });

    // 「お気に入り」がチェックされている場合
    if (selectedTags.includes("お気に入り")) {
      const favs = getFavorites();
      let allQuestions = [];
      if (typeof beginnerData !== 'undefined') allQuestions = allQuestions.concat(beginnerData);
      if (typeof freeQuestions !== 'undefined') allQuestions = allQuestions.concat(freeQuestions);

      let filteredData = allQuestions.filter(q => favs.includes(q.id));

      if (filteredData.length === 0) {
        alert("お気に入りに登録されている問題がありません。");
        return;
      }

      // 出題数を取得し、ランダムシャッフルして指定数カット
      const count = parseInt($('#custom-count').val(), 10);
      filteredData.sort(() => Math.random() - 0.5);
      const displayData = filteredData.slice(0, count);

      $('#premium-alert').hide();
      $('#custom-settings').slideUp(200);
      startQuiz(displayData, "【★お気に入りカスタム】");
    } 
    else {
      showPremiumAlert();
    }
  });


  /* ====================================
     以下、クイズ実行ロジック
  ==================================== */
  function startQuiz(dataArray, titleLabel) {
    if(!dataArray || dataArray.length === 0) {
      alert("クイズデータがありません。");
      return;
    }
    currentQuestions = [...dataArray];
    currentIndex = 0;
    score = 0;
    $('#nav-screen').hide();
    $('#q-category-label').text(titleLabel);
    $('#quiz-screen').fadeIn(300);
    loadQuestion();
  }

  function loadQuestion() {
    const qData = currentQuestions[currentIndex];
    $('#feedback-area').hide();
    $('#submit-btn').show().prop('disabled', true);
    $('#q-num').text(currentIndex + 1);
    $('#q-text').text(qData.q);
    
    // ★問題表示時に、お気に入り状態（☆か★か）を判定してアイコンを更新
    const favs = getFavorites();
    if (qData.id && favs.includes(qData.id)) {
      $('#fav-btn').text('★').css('color', '#fbc02d');
    } else {
      $('#fav-btn').text('☆').css('color', '');
    }
    
    const $choices = $('#choices-area');
    $choices.empty();

    qData.choices.forEach((text, index) => {
      $('<button>').addClass('choice-btn').text(text).attr('data-index', index)
        .on('click', function() {
          $(this).toggleClass('selected');
          $('#submit-btn').prop('disabled', $('.choice-btn.selected').length === 0);
        }).appendTo($choices);
    });
  }

  // ★重複していた回答ボタンの処理を1つに統合
  $('#submit-btn').on('click', function() {
    const qData = currentQuestions[currentIndex];
    let userAns = [];
    $('.choice-btn.selected').each(function() { userAns.push(parseInt($(this).attr('data-index'), 10)); });
    userAns.sort();
    
    const correctAns = qData.ans.slice().sort();
    const isCorrect = JSON.stringify(userAns) === JSON.stringify(correctAns);

    $('.choice-btn').prop('disabled', true);
    $('#submit-btn').hide();
    
    $('.choice-btn').each(function() {
      if (correctAns.includes(parseInt($(this).attr('data-index'), 10))) {
        $(this).css({'border-color': 'var(--primary-green)', 'background-color': '#f1f8e9'});
      }
    });

    if (isCorrect) {
      $('#judge-text').text('⭕️ 正解！').removeClass('incorrect').addClass('correct');
      score++;
    } else {
      $('#judge-text').text('❌ 不正解...').removeClass('correct').addClass('incorrect');
    }
    
    $('#exp-text').html(`<strong>解説：</strong><br>${qData.exp}`);

    // ★学習メモの読み込み
    const memos = getMemos();
    if (qData.id && memos[qData.id]) {
      $('#q-memo').val(memos[qData.id]);
    } else {
      $('#q-memo').val('');
    }

    $('#feedback-area').fadeIn(400);
  });

  $('#next-btn').on('click', function() {
    if (++currentIndex < currentQuestions.length) loadQuestion();
    else showResult();
  });

  function showResult() {
    $('#quiz-screen').hide();
    $('#result-score').text(`${currentQuestions.length}問中 ${score}問正解！`);
    $('#result-screen').fadeIn(400);
  }

  /* ====================================
     学習メモ機能のロジック
  ==================================== */
  function getMemos() {
    return JSON.parse(localStorage.getItem('rugbyMemos')) || {};
  }

  $('#save-memo-btn').on('click', function() {
    const currentQ = currentQuestions[currentIndex];
    if (!currentQ || !currentQ.id) return;

    const memoText = $('#q-memo').val();
    let memos = getMemos();
    
    memos[currentQ.id] = memoText;
    localStorage.setItem('rugbyMemos', JSON.stringify(memos));

    $('#memo-saved-msg').fadeIn(200).delay(1500).fadeOut(200);
  });

});