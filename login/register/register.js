    document.getElementById('register-form').addEventListener('submit', function(e) {
      e.preventDefault();

      const username = document.getElementById('new-username').value;
      const password = document.getElementById('new-password').value;

      const existingUser = JSON.parse(localStorage.getItem('user'));
      if (existingUser && existingUser.username === username) {
        alert('שם המשתמש כבר קיים, בחר שם אחר.');
        return;
      }

      const newUser = { username, password };
      localStorage.setItem('user', JSON.stringify(newUser));

      alert('הרשמה בוצעה בהצלחה! עכשיו תוכל להתחבר.');
      window.location.href = '../login.html';
    });