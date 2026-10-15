$(document).ready(function() {
  
  // 無料版で使うデータをここに直接持つ（外部ファイルに依存しない）
  const freeQuestions = [
    // 初級からいくつか抜粋して定義（必要に応じて増やしてください）
  {
    id: "m01",
    q: "モールの成立条件は？",
    choices: [
      "ボールキャリア―が立った状態でディフェンスにつかまったら",
      "ボールキャリア―が立った状態で味方プレイヤーと組み合ったら",
      "ボールキャリア―が立った状態で各チーム1人以上が組み合ったら",
    ],
    ans: [2],
    tags: ["モールはボールキャリア―が立った状態で各チーム1人以上が組み合ったら成立します"],
    exp: "モール",
  },
  {
    id: "m02",
    q: "モールが成立するとディフェンスのオフサイドラインはどこになる？",
    choices: [
      "アタック側のモール参加プレイヤー最後尾の足",
      "ボールの位置",
      "ディフェンス側のモール参加プレイヤー最後尾の足",
    ],
    ans: [2],
    tags: ["モール", "オフサイド"],
    exp: "ディフェンス側のモール参加プレイヤー最後尾のラインがオフサイドラインになります",
  },
  {
    id: "m03",
    q: "モールが成立する前に、アタック側はボールを後ろに回した。どうなる？",
    choices: [
      "プレー継続",
      "アタック側の反則",
      "ディフェンス側の反則",
    ],
    ans: [1],
    tags: ["モール"],
    exp: "モールが成立する（ディフェンスが組んでくる）前にボールを後ろに回してしまうとオブストラクションの反則になります。",
  },
  // {
  //   id: "m04",
  //   q: "モールが成立してから、アタック側はボールを後ろに回した。どうなる？",
  //   choices: [
  //     "プレー継続",
  //     "アタック側の反則",
  //     "ディフェンス側の反則",
  //   ],
  //   ans: [0],
  //   tags: ["モール"],
  //   exp: "モールが成立したらアタック側はモールにバインドをしている状態ならボールを後ろに回して問題ありません。",
  // },
  {
    id: "m05",
    q: "モールが成立する前に、ディフェンス側は密集のかたまりを引き倒した。どうなる？",
    choices: [
      "プレー継続",
      "アタック側の反則",
      "ディフェンス側の反則",
    ],
    ans: [0],
    tags: ["モール"],
    exp: "モールが成立する前であれば、タックルと同様の扱いとなり、相手を引き倒しても問題ありません。",
  },
  {
    id: "m06",
    q: "モールが成立した後に、アタック側の最後尾のプレイヤーがモールから肩をちょっとだけ外したが、すぐに付け直した。どうなる？",
    choices: [
      "プレー継続",
      "アタック側の反則",
      "ディフェンス側の反則",
    ],
    ans: [1],
    tags: ["モール"],
    exp: "一度肩を離してしまうとモールが終了するため、再び肩をつけてしまうとオブストラクションの反則になります。",
  },
  {
    id: "m07",
    q: "モールが成立した後に、アタック側が自立できず、モールが崩れてしまった。どうなる？",
    choices: [
      "プレー継続",
      "アタック側の反則",
      "ディフェンス側の反則",
    ],
    ans: [0],
    tags: ["モール"],
    exp: "アタック側が自ら倒れてしまった場合はモールコラプシングにはなりません。ボールが出せなくなった場合、モールアンプレアブルとなり、ディフェンス側のスクラムになります。",
  },
  // {
  //   id: "m08",
  //   q: "モールが成立した後に、ディフェンス側が自立できず、モールが崩れてしまった。どうなる？",
  //   choices: [
  //     "プレー継続",
  //     "アタック側の反則",
  //     "ディフェンス側の反則",
  //   ],
  //   ans: [2],
  //   tags: ["モール"],
  //   exp: "ディフェンス側がモールを崩した場合、モールコラプシングとなり、アタック側にペナルティキックが与えられます。",
  // },
  // {
  //   id: "m09",
  //   q: "フィールドプレーにおいて、ボールキャリアーに味方プレイヤーが2人でバインドすることは反則になる？",
  //   choices: [
  //     "反則になる",
  //     "反則にならない",
  //   ],
  //   ans: [0],
  //   tags: ["モール"],
  //   exp: "2人以上であらかじめバインドしてしまった場合、フライングウェッジの反則となります。1人でのバインドは問題ありません",
  // },
  // {
  //   id: "m10",
  //   q: "ラインアウトでボールを確保した後、ジャンパーにリフターが2人でバインドすることは反則になる？",
  //   choices: [
  //     "反則になる",
  //     "反則にならない",
  //   ],
  //   ans: [1],
  //   tags: ["モール"],
  //   exp: "ラインアウトボックス内でリフター2人がジャンパーにバインドすることはフライングウェッジにはならず、プレーは継続されます。",
  // },
  {
    id: "m11",
    q: "モールが１度止まった後、アタック側が再び前進した。どうなる？",
    choices: [
      "プレー継続",
      "アタック側の反則",
      "ディフェンス側の反則",
    ],
    ans: [0],
    tags: ["モール"],
    exp: "１度止まっても、前進できればモールは継続されます。",
  },
  // {
  //   id: "m12",
  //   q: "モールが２度止まった後、アタック側が再び前進した。どうなる？",
  //   choices: [
  //     "プレー継続",
  //     "アタック側の反則",
  //     "ディフェンス側の反則",
  //   ],
  //   ans: [1],
  //   tags: ["モール"],
  //   exp: "２度止まった場合、モールからボールを出さなければならず、出せなかった場合、ディフェンス側のスクラムで再開されます(※アンプレアブルは厳密にはアタック側の「反則」ではなく、ボールが出せなくなった「状態」です)。",
  // },
  // {
  //   id: "m13",
  //   q: "モールが成立した後に、ディフェンス側が自陣側からモールを割っていき、アタック側のボールキャリアーを抱きかかえてボールを出せない状態にした。どうなる？",
  //   choices: [
  //     "プレー継続",
  //     "アタック側の反則",
  //     "ディフェンス側の反則",
  //   ],
  //   ans: [1],
  //   tags: ["モール"],
  //   exp: "自陣側からモールに参加すれば、モールを割ってアタック側にアプローチすることは反則にはなりません。ボールが出せなくなった場合、モールアンプレアブルとなり、ディフェンス側のスクラムで再開されます(※アンプレアブルは厳密にはアタック側の「反則」ではなく、ボールが出せなくなった「状態」です)。",
  // },
  // {
  //   id: "m14",
  //   q: "モールが成立した後に、ディフェンス側が横からモールを割っていき、アタック側のボールキャリアーを抱きかかえてボールを出せない状態にした。どうなる？",
  //   choices: [
  //     "プレー継続",
  //     "アタック側の反則",
  //     "ディフェンス側の反則",
  //   ],
  //   ans: [2],
  //   tags: ["モール","オフサイド"],
  //   exp: "モールは自陣側から参加しなければならず、横や敵陣側からモールに参加した場合、オフサイドとなり、アタック側にペナルティキックが与えられます。",
  // },
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
    else if (mode === 'intermediate' && tag === 'モール') {
      filteredData = freeQuestions;
      title = "【中級コース：モール】";
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