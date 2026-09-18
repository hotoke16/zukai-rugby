$(document).ready(function() {
  
  // 無料版で使うデータをここに直接持つ（外部ファイルに依存しない）
  const freeQuestions = [
    // 初級からいくつか抜粋して定義（必要に応じて増やしてください）
  {
    id: "l01",
    q: "ラインアウトにおいて、ボールを投げ入れるスローワーの立ち位置で反則なのは次のうちどれか？",
    choices: [
      "両足ともにタッチラインの外側",
      "片足がタッチラインの上",
      "両足ともにタッチラインの内側",
    ],
    ans: [2],
    tags: ["ラインアウト", "タッチライン"],
    exp: "片足でもタッチライン上にあれば問題ありません。",
  },
  // {
  //   id: "l02",
  //   q: "ラインアウトに参加しないプレイヤーのオフサイドラインは？",
  //   choices: [
  //     "DFのみマークオブタッチ（中心線）から5ｍ後方",
  //     "AT・DFともにマークオブタッチ（中心線）から5ｍ後方",
  //     "DFのみマークオブタッチ（中心線）から10ｍ後方",
  //     "AT・DFともにマークオブタッチ（中心線）から10ｍ後方",
  //   ],
  //   ans: [3],
  //   tags: ["ラインアウト", "オフサイド"],
  //   exp: "ラインアウトに参加しないプレーヤーは、マークオブタッチから10メートル後方へ下がる必要があります。",
  // },
  {
    id: "l03",
    q: "ラインアウトの参加人数はどう決まるか？",
    choices: [
      "アタック側が毎回決める",
      "ディフェンス側が毎回決める",
      "5人と決まっている",
    ],
    ans: [0],
    tags: ["ラインアウト"],
    exp: "ラインアウトの参加人数はアタック側が決めます。",
  },
  // {
  //   id: "l04",
  //   q: "ラインアウトの参加人数がアタック側が多い場合、どうなるか？",
  //   choices: [
  //     "プレー継続",
  //     "アタック側の反則となり相手ボールのスクラムで再開される",
  //     "アタック側の反則となり相手ボールのラインアウトで再開される",
  //     "アタック側の反則となり相手ボールのフリーキックで再開される",
  //   ],
  //   ans: [0],
  //   tags: ["ラインアウト"],
  //   exp: "アタック側の人数が多い分は問題ありません。",
  // },
  {
    id: "l05",
    q: "ラインアウトの参加人数がディフェンス側が多い場合、どうなるか？",
    choices: [
      "プレー継続",
      "ディフェンス側の反則となり相手ボールのスクラムで再開される",
      "ディフェンス側の反則となり相手ボールのラインアウトで再開される",
      "ディフェンス側の反則となり相手ボールのフリーキックで再開される",
    ],
    ans: [3],
    tags: ["ラインアウト"],
    exp: "ディフェンス側はアタック側より人数を多くしてはいけません。",
  },
  {
    id: "l06",
    q: "ラインアウトで、相手との距離を1ｍあけず、近づいているとどうなる？",
    choices: [
      "プレー継続",
      "近づいた側の反則となり相手ボールのスクラムで再開される",
      "近づいた側の反則となり相手ボールのラインアウトで再開される",
      "近づいた側の反則となり相手ボールのフリーキックで再開される",
    ],
    ans: [3],
    tags: ["ラインアウト", "反則"],
    exp: "ラインアウト形成後は1mの距離を保たなければなりません（離れるのもダメ）。",
  },
  {
    id: "l07",
    q: "ラインアウトでのスローが5mラインを超えなかった場合、どうなる？",
    choices: [
      "プレー継続",
      "アタック側の反則となり相手ボールのスクラムで再開される",
      "アタック側の反則となり相手ボールのラインアウトで再開される",
      "アタック側の反則となり相手ボールのフリーキックで再開される",
    ],
    ans: [1,2],
    tags: ["ラインアウト", "反則"],
    exp: "ノット5m（スローは5mを超えるように投げなければならない）となり、ディフェンス側はスクラムかラインアウトの再開を選択できます。",
  },
  // {
  //   id: "l08",
  //   q: "ラインアウトが、解消される（終わる）タイミングは？",
  //   choices: [
  //     "5mラインからボールが出る",
  //     "15mラインからボールが出る",
  //     "マークオブタッチからボールが出る",
  //     "ラインアウト参加プレイヤーの足がマークオブタッチを超える",
  //   ],
  //   ans: [0, 1, 2, 3],
  //   tags: ["ラインアウト"],
  //   exp: "ボールが5mラインと15mラインの間から出たとき、マークオブタッチから出たとき、ラインアウト参加プレイヤーの足がマークオブタッチを超えたときにラインアウトは終了します。",
  // },
  {
    id: "l09",
    q: "ラインアウトで、ディフェンス側がジャンプせず、アタック側はスローをまっすぐ投げられなかったらどうなる？",
    choices: [
      "プレー継続",
      "アタック側の反則となり相手ボールのスクラムで再開される",
      "アタック側の反則となり相手ボールのラインアウトで再開される",
      "アタック側の反則となり相手ボールのフリーキックで再開される",
    ],
    ans: [0],
    tags: ["ラインアウト", "反則"],
    exp: "ディフェンス側の争奪がない場合、ノットストレートとはならず、ラインアウトは継続されます。",
  },
  {
    id: "l10",
    q: "ラインアウトで、ディフェンス側がジャンプをして争奪をし、アタック側はスローをまっすぐ投げられなかったらどうなる？",
    choices: [
      "プレー継続",
      "アタック側の反則となり相手ボールのスクラムで再開される",
      "アタック側の反則となり相手ボールのラインアウトで再開される",
      "アタック側の反則となり相手ボールのフリーキックで再開される",
    ],
    ans: [1, 2],
    tags: ["ラインアウト", "反則"],
    exp: "ノットストレートとなり、ディフェンス側はスクラムかラインアウトの再開を選択できます。",
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
    else if (mode === 'intermediate' && tag === 'ラインアウト') {
      filteredData = freeQuestions;
      title = "【中級コース：ラインアウト】";
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