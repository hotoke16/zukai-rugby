/* -----------------------------------------
   1. クイズデータの結合
----------------------------------------- */
const quizData = {
  beginner: beginnerData,
  intermediate: intermediateData,
  advanced: advancedData
};

/* -----------------------------------------
   2. グローバル変数の設定
----------------------------------------- */
let currentLevel = 'beginner'; 
let currentQuestionIndex = 0;  
let score = 0;                 

$(document).ready(function() {
  
  // アプリ初期化
  initQuiz();

  /* -----------------------------------------
     3. イベントリスナーの設定
  ----------------------------------------- */
  // 難易度切り替え
  $('.diff-btn').on('click', function() {
    $('.diff-btn').removeClass('active');
    $(this).addClass('active');
    currentLevel = $(this).data('level');
    initQuiz();
  });

  // 次へボタン
  $('#next-btn').on('click', function() {
    currentQuestionIndex++;
    const totalQuestions = quizData[currentLevel].length;

    if (currentQuestionIndex < totalQuestions) {
      loadQuestion();
    } else {
      showResult();
    }
  });

  // リトライボタン
  $('#retry-btn').on('click', function() {
    initQuiz();
  });

  // 【追加】回答するボタンのクリック処理
  $('#submit-btn').on('click', function() {
    judgeAnswer();
  });
});

/* -----------------------------------------
   4. 関数の定義
----------------------------------------- */

// クイズの初期化
function initQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  $('#result-area').hide();
  $('#quiz-area').fadeIn();
  loadQuestion();
}

// 問題の読み込みと表示
function loadQuestion() {
  const currentData = quizData[currentLevel][currentQuestionIndex];
  
  // UIリセット
  $('#feedback').hide();
  $('#submit-btn').show().prop('disabled', true); // 回答ボタンを表示し、初期は非活性
  
  $('#q-number').text(currentQuestionIndex + 1);
  $('#q-text').text(currentData.q);
  $('#q-image').attr('src', currentData.img);
  
  // 選択肢の生成
  const $choicesWrapper = $('#choices');
  $choicesWrapper.empty();
  
  currentData.choices.forEach((choice, index) => {
    const $btn = $('<button>')
      .addClass('choice-btn')
      .text(choice)
      .attr('data-index', index);
    
    // 選択肢のクリックは「選択状態のトグル（ON/OFF）」のみ行う
    $btn.on('click', function() {
      $(this).toggleClass('selected');
      
      // 1つ以上選択されていれば「回答する」ボタンを押せるようにする
      if ($('.choice-btn.selected').length > 0) {
        $('#submit-btn').prop('disabled', false);
      } else {
        $('#submit-btn').prop('disabled', true);
      }
    });
    
    $choicesWrapper.append($btn);
  });
}

// 【変更】回答ボタンを押した際の正誤判定処理
function judgeAnswer() {
  const currentData = quizData[currentLevel][currentQuestionIndex];
  
  // ユーザーが選択したボタンのインデックスを配列で取得
  let selectedIndices = [];
  $('.choice-btn.selected').each(function() {
    selectedIndices.push(parseInt($(this).attr('data-index')));
  });

  // 正解配列(ans)と選択した配列(selectedIndices)を比較
  // ※要素の並び順に影響されないよう、ソートして文字列化して比較します
  const correctAnsString = currentData.ans.slice().sort().toString();
  const userAnsString = selectedIndices.slice().sort().toString();
  
  const isCorrect = (correctAnsString === userAnsString);

  // 全ての選択肢と回答ボタンを無効化（操作不能にする）
  $('.choice-btn').prop('disabled', true);
  $('#submit-btn').hide();

  // 視覚的なフィードバック：本当の正解だった選択肢を目立たせる（任意）
  $('.choice-btn').each(function() {
    const btnIndex = parseInt($(this).attr('data-index'));
    if (currentData.ans.includes(btnIndex)) {
      $(this).addClass('is-correct-ans');
    }
  });

  // 正誤テキストとスコアの処理
  const $judgement = $('#judgement-text');
  if (isCorrect) {
    $judgement.text('⭕️ 正解！').removeClass('incorrect').addClass('correct');
    score++;
  } else {
    $judgement.text('❌ 不正解...').removeClass('correct').addClass('incorrect');
  }

  // 解説テキストのセットと表示
  $('#explanation-text').text(currentData.exp);
  $('#feedback').fadeIn(400);
}

// 結果画面の表示（変更なし）
function showResult() {
  $('#quiz-area').hide();
  
  const total = quizData[currentLevel].length;
  $('#score-display').text(`${total}問中 ${score}問正解！`);
  
  const $message = $('#message-display');
  
  if (score === total) {
    $message.text('全問正解おめでとう！素晴らしい！');
    $message.css('color', 'var(--correct-color)');
  } else if (score >= total * 0.7) {
    $message.text('惜しい！あともう少し！');
    $message.css('color', 'var(--primary-color)');
  } else {
    $message.text('がんばろう！もう一度チャレンジ！');
    $message.css('color', 'var(--incorrect-color)');
  }

  $('#result-area').fadeIn();
}