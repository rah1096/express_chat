$(document).ready(function() {
    var messages = [];
    var socket = io.connect('http://localhost:3000');
    var chatForm = $('#chatForm');
    var message = $('#chatInput');
    var chatWindow = $('#chatWindow');
    var userForm = $('#userForm');
    var username = $('#username');
    var users = $('#users');
    var error = $('#error');

    // Submmit User Form
    userForm.submit(function(e) {
        e.preventDefault();
        socket.emit('set user', username.val(), function(data) {
            if (data) {
                $('#userFormWrap').hide();
                $('#mainWrap').show();
            } else {
                error.html('Username is already taken');
            }
        });
    });

    // Display Usernames
    socket.on('users', function(data) {
        var html = '';
        for (var i = 0; i < data.length; i++) {
            html += '<li class="list-group-item">' + data[i] + '</li>'
        }
        users.html(html);
    })

})