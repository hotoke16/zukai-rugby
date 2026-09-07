document.querySelector('#contactForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const form = e.target;
  const name = form.querySelector('[name="name"]').value;
  const email = form.querySelector('[name="email"]').value;
  const message = form.querySelector('[name="message"]').value;
  const submitButton = form.querySelector('button[type="submit"]');

  // メールアドレス形式チェック関数
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // バリデーション
  if (!name || !email || !message) {
    alert('すべてのフィールドを入力してください。');
    return;
  }

  if (!isValidEmail(email)) {
    alert('有効なメールアドレスを入力してください。');
    return;
  }

  // 送信中の表示
  submitButton.disabled = true;
  submitButton.classList.add('loading');

  const scriptURL = 'https://script.google.com/macros/s/AKfycbxG3BSAVI46izktY0rhG_BA31c-VY0_zjBgH84jSBb0m-Kq-EDX_2VN3I6OUxOs0WH5Zw/exec';
  const formData = new FormData();
  formData.append('name', name);
  formData.append('email', email);
  formData.append('message', message);

  fetch(scriptURL, {
    method: 'POST',
    body: formData,
  })
    .then(response => {
      if (response.ok) {
        document.querySelector('.contact-form-wrapper').style.display = 'none';
        document.querySelector('.form-success-message').style.display = 'block';
      } else {
        alert('送信に失敗しました。');
        submitButton.disabled = false;
        submitButton.classList.remove('loading');
      }
    })
    .catch(error => {
      alert('送信に失敗しました。ネットワークの問題かもしれません。');
      submitButton.disabled = false;
      submitButton.classList.remove('loading');
    });
});
