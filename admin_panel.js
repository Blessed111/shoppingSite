var t = 0;
function getUsersList(Users, a) {
    a = t + 1;
    $('tr[id="idForUpdateTheList"]').remove();
    for(let j = 0; j < 2; j++) {
        for (let i = 0; i < Users.length; i++) {
            if (a == 2 && !Users[i].ban) continue;
            if (a == 3 && Users[i].ban) continue;
            if(j == 0 && Users[i].ban) continue;
            if(j == 1 && !Users[i].ban) continue;
            let s = '<tr id="idForUpdateTheList"><td>' + Users[i].name + ' ' + Users[i].surname + '</td>';
            s += '<td>' + Users[i].email + '</td><td>' + Users[i].phone + '</td><td>' + Users[i].pass + '</td>';
            s += '<td><button class="greenClass" title="Update user data" onclick="userUpdateLogic(' + i + ')">U</button>' +
                ' <button class="greenClass" title="Delete user account" onclick="deleteUserAdmin(' + i + ')">D</button>';
            if (Users[i].ban) {
                s += ' <button class="redClass" title="Disable user" onclick="userBanLogic(' + i + ')">B</button></td>';
            } else {
                s += ' <button class="greenClass" title="Disable user" onclick="userBanLogic(' + i + ')">B</button></td>';
            }
            s += '</tr>';
            $('#hereUsers').append(s);
        }
    }
}
function deleteUserAdmin(b) {
    let Users = JSON.parse(localStorage.getItem('Users') || '[]');
    Users.splice(b, 1);
    localStorage.setItem('Users', JSON.stringify(Users));
    getUsersList(Users, 1);
}

function userBanLogic(s) {
    let Users = JSON.parse(localStorage.getItem('Users') || '[]');
    if(Users[s].ban){
        Users[s].ban = false;
        Users[s].reas = "";
        alert("User " + Users[s].email + " unbanned.");
        localStorage.setItem('Users', JSON.stringify(Users));
        getUsersList(Users, t + 1);
    }
    else{
        clearDivForBan();
        $('#divForBan').append('<div id="idForBanClear"><h3 class="h3Ban">Reason for user ban: ' + Users[s].email + '</h3>' +
            '<textarea id="textAreaForReasonBan" rows="10" cols="140"></textarea>' +
            '<button class="buttonBan" onclick="banSave(' + s + ')">Save</button> ' +
            '<button class="buttonBan" onclick="clearDivForBan()">Cancel</button></div>');
        window.location.replace('#divForBan');
        $('#divForBan').css({display: 'block'});
        $('#divForBan').animate({marginLeft: '-100px'});
    }
}
function banSave(z){
    let Users = JSON.parse(localStorage.getItem('Users') || '[]');
    Users[z].ban = true;
    Users[z].reas = $('#textAreaForReasonBan').val() || "";
    localStorage.setItem('Users', JSON.stringify(Users));
    clearDivForBan();
    getUsersList(Users, 1);
    alert("The user " + Users[z].email + " has been banned.\n" + Users[z].reas);
}

function userUpdateLogic(x) {
    clearDivForBan();
    let Users = JSON.parse(localStorage.getItem('Users') || '[]');
    $('#divForUpdateData').append('' +
        '<div id="divForUpdate"><h3> Update data: ' + Users[x].email + '</h3> ' +
        '<form id="formUpdate" onsubmit="updateDataSubmit(' + x + ')">' +
        '<input type="text" placeholder="Name" id="nameInAdminUp" required>' +
        ' <input type="text" placeholder="Surname" id="surnameInAdminUp" required>' +
        ' <input type="text" placeholder="Phone number" id="phoneInAdminUp" required>' + 
        ' <button form="formUpdate" class="updateButton">Submit</button> <button class="updateButton" onclick="clearDivForBan()">Cancel</button></form></div>');
    $('#nameInAdminUp').val(Users[x].name);
    $('#surnameInAdminUp').val(Users[x].surname);
    $('#phoneInAdminUp').val(Users[x].phone);
    window.location.replace('#divForUpdateData');
    $('#divForUpdateData').css({display: 'block'});
    $('#divForUpdateData').animate({marginLeft: '80px'});
}


function updateDataSubmit(emUp) {
    let Users = JSON.parse(localStorage.getItem('Users') || '[]');
    Users[emUp].name = $('#nameInAdminUp').val();
    Users[emUp].surname = $('#surnameInAdminUp').val();
    Users[emUp].phone = $('#phoneInAdminUp').val();
    alert("New data: " + Users[emUp].email
        + "\nName: " + Users[emUp].name + "\nSurname: " + Users[emUp].surname + "\nPhone: " + Users[emUp].phone);

    localStorage.setItem('Users', JSON.stringify(Users));
    getUsersList(Users, t + 1);
}

function clearDivForBan() {
    $('#idForBanClear').remove();
    $('#divForUpdate').remove();
    window.location.replace('#mainAdmin');
    $('#divForBan').css({display: 'none'});
    $('#divForBan').animate({marginLeft: '-1500px'});
    $('#divForUpdateData').css({display: 'none'});
    $('#divForUpdateData').animate({marginLeft: '-1500px'});
}

function addUserAdmin() {
    let em = $('#emailInAdmin').val();
    let Users = JSON.parse(localStorage.getItem('Users') || '[]');
    for(let i of Users){
        if(i.email == em){
            alert("This email already exists!");
            return;
        }
    }
    let user = {name: $('#nameInAdmin').val(), surname: $('#surnameInAdmin').val(), email: em,
    phone: $('#phoneInAdmin').val(), pass: $('#passInAdmin').val(), ban: false, reas: ""};
    Users.push(user);
    localStorage.setItem('Users', JSON.stringify(Users));
    alert("User " + em + " was registered!");
    $('#nameInAdmin').val('');
    $('#surnameInAdmin').val('');
    $('#phoneInAdmin').val('');
    $('#passInAdmin').val('');
    $('#emailInAdmin').val('');
    getUsersList(Users, t + 1);
}