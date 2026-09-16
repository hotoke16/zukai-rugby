$(document).ready(function() {
  
  let currentQuestions = [];
  let currentIndex = 0;
  let score = 0;

  // 全問題をひとまとめにする（検索用）
  // ※beginnerData, intermediateData, advancedData が読み込まれている前提
  const allDataPool = [...(typeof beginnerData !== 'undefined' ? beginnerData : []), 
                       ...(typeof intermediateData !== 'undefined' ? intermediateData : []), 
                       ...(typeof advancedData !== 'undefined' ? advancedData : [])];

  /* ====================================
     お気に入り機能のロジック (localStorage)
  ==================================== */
  // ストレージからお気に入りリスト(ID配列)を取得
  function getFavorites() {
    return JSON.parse(localStorage.getItem('rugbyFavs')) || [];
  }

  // お気に入り状態の切り替え
  function toggleFavorite(questionId) {
    let favs = getFavorites();
    if (favs.includes(questionId)) {
      favs = favs.filter(id => id !== questionId); // 削除
    } else {
      favs.push(questionId); // 追加
    }
    localStorage.setItem('rugbyFavs', JSON.stringify(favs));
    updateStarUI(questionId);
  }

  // 星マークの表示更新
  function updateStarUI(questionId) {
    const favs = getFavorites();
    const $favBtn = $('#fav-btn');
    if (favs.includes(questionId)) {
      $favBtn.text('★').addClass('active');
    } else {
      $favBtn.text('☆').removeClass('active');
    }
  }

  // ヘッダーの星マークが押されたときのイベント
  $('#fav-btn').on('click', function() {
    const currentQ = currentQuestions[currentIndex];
    if (currentQ && currentQ.id) {
      toggleFavorite(currentQ.id);
    }
  });

  /* ====================================
     ナビゲーション制御
  ==================================== */
  $('.mode-btn').on('click', function() {
    const mode = $(this).data('mode');
    const tag = $(this).data('tag');
    let filteredData = [];
    let title = "";

    if (mode === 'favorite') {
      // お気に入り問題のみ抽出
      const favs = getFavorites();
      filteredData = allDataPool.filter(q => favs.includes(q.id));
      if (filteredData.length === 0) {
        alert("お気に入りに登録された問題がありません。各問題の「☆」をタップして登録してください！");
        return;
      }
      title = "【お気に入りクイズ】";
    } else if (mode === 'beginner') {
      filteredData = beginnerData;
      title = "【初級コース】";
    } else if (mode === 'advanced') {
      filteredData = advancedData;
      title = "【上級コース】";
    } else if (mode === 'intermediate') {
      filteredData = intermediateData.filter(q => q.tags && q.tags.includes(tag));
      title = `【中級コース：${tag}】`;
    }

    // シャッフルして最大10問出題
    filteredData = shuffleArray(filteredData).slice(0, 10);
    startQuiz(filteredData, title);
  });

  // カスタムクイズ開始
  $('#start-custom-btn').on('click', function() {
    const count = parseInt($('#custom-count').val(), 10);
    const selectedTags = [];
    $('.tag-label input:checked').each(function() {
      selectedTags.push($(this).val());
    });

    if (selectedTags.length === 0) {
      alert("対象カテゴリーを1つ以上選択してください。");
      return;
    }

    const favs = getFavorites();
    const isFavChecked = selectedTags.includes("お気に入り");

    // 選択された条件に合致する問題を抽出
    let customPool = allDataPool.filter(q => {
      const matchTag = q.tags && q.tags.some(t => selectedTags.includes(t) && t !== "お気に入り");
      const matchFav = isFavChecked && favs.includes(q.id);
      return matchTag || matchFav; // タグが一致するか、お気に入りであれば採用
    });

    if (customPool.length === 0) {
      alert("該当する問題がありません。");
      return;
    }

    customPool = shuffleArray(customPool).slice(0, count);
    $('#custom-settings').slideUp();
    startQuiz(customPool, "【カスタムクイズ】");
  });

  /* ====================================
     クイズの実行ロジック
  ==================================== */
  function startQuiz(dataArray, titleLabel) {
    if(!dataArray || dataArray.length === 0) return;
    
    currentQuestions = [...dataArray];
    currentIndex = 0;
    score = 0;

    $('#nav-screen').hide();
    $('#result-screen').hide();
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
    
    // 星マークの状態を最新にする
    if (qData.id) {
      updateStarUI(qData.id);
      $('#fav-btn').show();
    } else {
      $('#fav-btn').hide(); // idがない問題の場合は非表示にしてエラーを防ぐ
    }
    
    const $choices = $('#choices-area');
    $choices.empty();

    qData.choices.forEach((choiceText, index) => {
      const $btn = $('<button>')
        .addClass('choice-btn')
        .text(choiceText)
        .attr('data-index', index);
      
      $btn.on('click', function() {
        $(this).toggleClass('selected');
        $('#submit-btn').prop('disabled', $('.choice-btn.selected').length === 0);
      });
      $choices.append($btn);
    });
  }

  $('#submit-btn').on('click', function() {
    const qData = currentQuestions[currentIndex];
    
    let userAns = [];
    $('.choice-btn.selected').each(function() {
      userAns.push(parseInt($(this).attr('data-index'), 10));
    });
    userAns.sort();
    
    const correctAns = qData.ans.slice().sort();
    const isCorrect = JSON.stringify(userAns) === JSON.stringify(correctAns);

    $('.choice-btn').prop('disabled', true);
    $('#submit-btn').hide();

    $('.choice-btn').each(function() {
      const idx = parseInt($(this).attr('data-index'), 10);
      if (correctAns.includes(idx)) {
        $(this).css({'border-color': 'var(--primary-green)', 'background-color': '#f1f8e9'});
      }
    });

    const $judge = $('#judge-text');
    if (isCorrect) {
      $judge.text('⭕️ 正解！').removeClass('incorrect').addClass('correct');
      score++;
    } else {
      $judge.text('❌ 不正解...').removeClass('correct').addClass('incorrect');
    }
    
    $('#exp-text').html(`<strong>解説：</strong><br>${qData.exp}`);
    $('#feedback-area').fadeIn(400);
  });

  $('#next-btn').on('click', function() {
    currentIndex++;
    if (currentIndex < currentQuestions.length) {
      loadQuestion();
    } else {
      showResult();
    }
  });

  function showResult() {
    $('#quiz-screen').hide();
    const total = currentQuestions.length;
    $('#result-score').text(`${total}問中 ${score}問正解！`);
    
    const $msg = $('#result-msg');
    if (score === total) {
      $msg.text('全問正解おめでとう！素晴らしい！').css('color', 'var(--correct)');
    } else if (score >= total * 0.7) {
      $msg.text('惜しい！あともう少し！').css('color', 'var(--primary-green)');
    } else {
      $msg.text('がんばろう！もう一度チャレンジ！').css('color', 'var(--incorrect)');
    }
    $('#result-screen').fadeIn(400);
  }

  function shuffleArray(array) {
    const arr = array.slice();
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

/* ====================================
     学習メモ機能のロジック (localStorage)
  ==================================== */
  // ストレージからメモデータを取得
  function getMemos() {
    return JSON.parse(localStorage.getItem('rugbyMemos')) || {};
  }

  // 「メモを保存」ボタンが押された時の処理
  $('#save-memo-btn').on('click', function() {
    const currentQ = currentQuestions[currentIndex];
    if (!currentQ || !currentQ.id) return;

    const memoText = $('#q-memo').val();
    let memos = getMemos();
    
    // 問題IDをキーにしてメモテキストを保存
    memos[currentQ.id] = memoText;
    localStorage.setItem('rugbyMemos', JSON.stringify(memos));

    // 「保存しました！」のメッセージをフワッと表示
    $('#memo-saved-msg').fadeIn(200).delay(1500).fadeOut(200);
  });

$('#submit-btn').on('click', function() {
    const qData = currentQuestions[currentIndex];
    
    // 〜〜〜 (既存の正誤判定などのコード) 〜〜〜
    
    $('#exp-text').html(`<strong>解説：</strong><br>${qData.exp}`);
    
    // ★ここから追記：問題の解説が出たタイミングで、過去のメモを読み込む
    const memos = getMemos();
    if (qData.id && memos[qData.id]) {
      $('#q-memo').val(memos[qData.id]); // 保存されているメモがあればセット
    } else {
      $('#q-memo').val(''); // なければテキストエリアを空にする
    }
    // ★追記ここまで

    $('#feedback-area').fadeIn(400);
  });
});