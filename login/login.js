function login(){
    const username= document.getElementById('username').value;
    const password= document.getElementById('password').value;

   const storedUser=JSON.parse(localStorage.getItem('user'));
   
  if (
    storedUser &&
    username === storedUser.username &&
    password === storedUser.password
  ) {
    alert("ברוך הבא " + username + "!");
    localStorage.setItem('loggedInUser', JSON.stringify(storedUser));
    window.location.href = "../AllProducts.html";
  } else {
    alert("שם משתמש או סיסמה שגויים.");
  }
}