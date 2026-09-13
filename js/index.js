jQuery("#js-button-drawer").click(function() {
  jQuery(this).toggleClass("is-checked");
  jQuery("#js-drawer").slideToggle();
  jQuery("body").toggleClass("is-fixed");
})

$(document).ready(function(){
  let currentIndex = 0;
  const images = $('.section img').not('.no-modal');
  
  // 拡大画像を表示する関数
  function showImage(index) {
    const imgElement = $(images[index]); // 現在の画像要素
    const src = imgElement.attr('src'); // 画像の src を取得
    const leadText = imgElement.closest('.section__content').find('.section__lead-text').html(); // 該当するテキストを取得
    
    // モーダル内に反映
    $('.modal img').attr('src', src);
    $('.modal__lead-text').html(leadText); // 取得したテキストを表示
    $('.modal').fadeIn();
  }
  
  // ギャラリー画像クリック時
  images.on('click', function(){
    currentIndex = images.index(this);
    showImage(currentIndex);
  });
  
  // クローズ処理（×ボタンまたは背景クリック）
  $('.close, .modal').click(function(e){
    if($(e.target).hasClass('close') || $(e.target).hasClass('modal')){
      $('.modal').fadeOut();
    }
  });
  
  // ナビゲーション：次の画像
  $('.next').click(function(e){
    e.stopPropagation();
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
  });
  
  // ナビゲーション：前の画像
  $('.prev').click(function(e){
    e.stopPropagation();
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
  });
  
  // スワイプ処理（タッチ操作）
  let touchStartX = null;
  let touchEndX = null;
  const threshold = 50;
  
  $('.modal-content').on('touchstart', function(e){
    touchStartX = e.originalEvent.touches[0].clientX;
  });
  
  $('.modal-content').on('touchend', function(e){
    touchEndX = e.originalEvent.changedTouches[0].clientX;
    let deltaX = touchStartX - touchEndX;
    if(Math.abs(deltaX) > threshold){
      if(deltaX > 0){
        // 左スワイプ → 次の画像
        currentIndex = (currentIndex + 1) % images.length;
      } else {
        // 右スワイプ → 前の画像
        currentIndex = (currentIndex - 1 + images.length) % images.length;
      }
      showImage(currentIndex);
    }
  });
});

$(function() {
  // h2にIDを自動付与
  $('.section__inner h2 .section__head-main').each(function(index) {
    const id = 'section-' + (index + 1);
    $(this).parent().attr('id', id);
    
    // 目次にリンクを追加
    $('#toc').append('<li><a href="#' + id + '">' + $(this).text() + '</a></li>');
  });

  // スムーズスクロール
// スムーズスクロール（ヘッダー分オフセット調整）
$('#toc a').on('click', function(e) {
  e.preventDefault();

  const target = $($(this).attr('href'));

  // 固定ヘッダーの高さを取得（idやclassを指定）
  const headerHeight = $('.header').outerHeight() || 0;

  $('html, body').animate(
    {
      scrollTop: target.offset().top - headerHeight
    },
    500
  );
});

});

document.addEventListener('DOMContentLoaded', () => {
  const navItems = document.querySelectorAll('.header__nav-item');

  navItems.forEach(item => {
    const parentLink = item.querySelector('.header__nav-link');
    const subNav = item.querySelector('.header__sub-nav');

    if (parentLink && subNav) {
      parentLink.addEventListener('click', (e) => {
        // 📱画面幅が768px以下の時（スマホ表示）のみ、クリックでのアコーディオン開閉を有効にする
        // 💻PC表示の時はJSは何もしない（CSSのホバーに任せる）
        if (window.innerWidth <= 768) {
          e.preventDefault(); 
          item.classList.toggle('is-open');
        }
      });
    }
  });
});