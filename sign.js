function validation(){
	let username = document.getElementById("username").value;
	let password = document.getElementById("password").value;
	let surname = document.getElementById("surname").value;
	let phone = document.getElementById("phone").value;
	let email = document.getElementById("email").value;




	let usercheck = /^[A-Za-z. ]{3,20}$/g;
	let passwordcheck = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/g;
	let surnamecheck = /^[A-Za-z. ]{3,20}/g;
	let emailcheck = /^[A-Za-z0-9_]{4,}@[A-Za-z]{2,}[.]{1}[A-Za-z.]{2,4}$/;
	let mobilecheck = /^(\+7|8)(\(?7\d{2}\)?)(\d{7}$)/;

	if(usercheck.test(username)){
		document.getElementById('usererror').innerHTML = " ";
			$("#username").css({"border":"2px solid green"});
	}
	else{
		document.getElementById('usererror').innerHTML = "**Username is Invalid";
		$("#username").css({"border":"2px solid red"});
		return false;
	}


	if(surnamecheck.test(surname)){
		document.getElementById('surnameerror').innerHTML = " ";
			$("#surname").css({"border":"2px solid green"});
	}
	else{
		document.getElementById('surnameerror').innerHTML = "**Surname is Invalid";
		$("#surname").css({"border":"2px solid red"});
		return false;
	}


	if(passwordcheck.test(password)){
	document.getElementById('passworderror').innerHTML = " ";
		$("#password").css({"border":"2px solid green"});
	}
	else{
		document.getElementById('passworderror').innerHTML = "**Password is Invalid(at least 8symbols)";
		$("#password").css({"border":"2px solid red"});
		return false;
	}


	if(emailcheck.test(email)){
	document.getElementById('emailerror').innerHTML = " ";
		$("#email").css({"border":"2px solid green"});
	}
	else{
		document.getElementById('emailerror').innerHTML = "**Uncorrect Email";
		$("#email").css({"border":"2px solid red"});
		return false;
	}


	if(mobilecheck.test(phone)){
	document.getElementById('mobileerror').innerHTML = " ";
		$("#mobile").css({"border":"2px solid green"});
	}
	else{
		document.getElementById('mobileerror').innerHTML = "**Uncorrect Mobile number";
		$("#mobile").css({"border":"2px solid red"});
		return false;
	}
	let Users = JSON.parse(localStorage.getItem('Users') || '[]');
	for(let i of Users){
		if(i.email == email){
			alert("This email already exists!");
			return;
		}
	}
	let user = {name: username, surname: surname, email: email,
		phone: phone, pass: password, ban: false, reas: ""};
	Users.push(user);
	localStorage.setItem('Users', JSON.stringify(Users));
}

function checkEmailLogIn() {
	let email = document.getElementById("logInEmail").value;
	let password = document.getElementById("logInPassword").value;
	let Users = JSON.parse(localStorage.getItem('Users') || '[]');
	if(email.length == 0 || password.length == 0) return;
	for(let i of Users){
		if(i.email == email){
			if(i.pass != password){
				alert("Wrong password!");
				return;
			}
			else{
				if(i.ban){
					alert("Sorry, you were banned by the administrator." +
						"\nWhy?\n " + i.reas);
					return;
				}
				else {
					localStorage.setItem('lastUser', JSON.stringify(i));
					window.location.href = 'page_1.html';
					return;
				}
			}
		}
	}
	alert("You are not registered!");
}

function checkUserLogInOut() {
	let lastUser = JSON.parse(localStorage.getItem('lastUser') || '[]');
	if(lastUser.length != 0){
		$('#checkUserLog').append('</id><a href="sign.html" onclick="clearUserLog()">Log Out</a>');

	}
	else{
		$('#checkUserLog').append('<a href="sign.html">Sign in</a>');
	}
}
function clearUserLog() {
	localStorage.setItem('lastUser', JSON.stringify([]));
}