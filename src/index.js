function fileChanged() {
    var fileSelect = document.querySelector('#file-path-selector input[type=file]');
    var fileName = document.querySelector('#file-path-selector .file-name');
    var settingsPath = fileSelect.files[0].path;
    fileName.textContent = settingsPath;
    loadSettings(settingsPath);
}

function saveSettings() {
    var settings = {};
    settings.cTitle1 = document.getElementById('field-commentator1-name').value;
    settings.cTitle2 = document.getElementById('field-commentator1-handle').value;
    settings.cTitle3 = document.getElementById('field-commentator2-name').value;
    settings.cTitle4 = document.getElementById('field-commentator2-handle').value;
    settings.game = document.getElementById('field-gametitle').value;
    settings.mText1 = document.getElementById('field-misc1').value;
    settings.mText2 = document.getElementById('field-misc2').value;
    settings.mText3 = document.getElementById('field-misc3').value;
    settings.mText4 = document.getElementById('field-misc4').value;
    settings.p1Name = document.getElementById('field-player1-name').value;
    settings.p1Score = document.getElementById('field-player1-score').value;
    settings.p1Team = document.getElementById('field-player1-team').value;
    settings.p2Name = document.getElementById('field-player2-name').value;
    settings.p2Score = document.getElementById('field-player2-score').value;
    settings.p2Team = document.getElementById('field-player2-team').value;
    settings.round = document.getElementById('field-gameround').value;
    settings.timestamp = Date.parse(document.getElementById('field-timestamp').value) / 1000;

    var fileSelect = document.querySelector('#file-path-selector input[type=file]');
    var settingsPath = fileSelect.files[0].path;

    window.electron.saveSettingsFile(JSON.stringify(settings), settingsPath);
    document.getElementById('notification-saved').classList.toggle('fade');
}

function loadSettings(settingsPath) {
    window.electron.loadSettingsFile(settingsPath).then((data) => {
        var jsonData = JSON.parse(data);
        document.getElementById('field-commentator1-name').value = jsonData.cTitle1;
        document.getElementById('field-commentator1-handle').value = jsonData.cTitle2;
        document.getElementById('field-commentator2-name').value = jsonData.cTitle3;
        document.getElementById('field-commentator2-handle').value = jsonData.cTitle4;
        document.getElementById('field-gametitle').value = jsonData.game;
        document.getElementById('field-player1-name').value = jsonData.p1Name;
        document.getElementById('field-player1-score').value = jsonData.p1Score;
        document.getElementById('field-player1-team').value = jsonData.p1Team;
        document.getElementById('field-player2-name').value = jsonData.p2Name;
        document.getElementById('field-player2-score').value = jsonData.p2Score;
        document.getElementById('field-player2-team').value = jsonData.p2Team;
        document.getElementById('field-gameround').value = jsonData.round;
        document.getElementById('field-timestamp').value = new Date(jsonData.timestamp * 1000).toISOString().split('T')[0];
        document.getElementById('field-misc1').value = jsonData.mText1;
        document.getElementById('field-misc2').value = jsonData.mText2;
        document.getElementById('field-misc3').value = jsonData.mText3;
        document.getElementById('field-misc4').value = jsonData.mText4;
    });
}

function switchPlayerInfo() {
    var settings = {};
    settings.p1Name = document.getElementById('field-player1-name').value;
    settings.p1Score = document.getElementById('field-player1-score').value;
    settings.p1Team = document.getElementById('field-player1-team').value;

    settings.p2Name = document.getElementById('field-player2-name').value;
    settings.p2Score = document.getElementById('field-player2-score').value;
    settings.p2Team = document.getElementById('field-player2-team').value;

    document.getElementById('field-player1-name').value = settings.p2Name;
    document.getElementById('field-player1-score').value = settings.p2Score;
    document.getElementById('field-player1-team').value = settings.p2Team;

    document.getElementById('field-player2-name').value = settings.p1Name;
    document.getElementById('field-player2-score').value = settings.p1Score;
    document.getElementById('field-player2-team').value = settings.p1Team;

    saveSettings();
}

function openTab(event, tabName) {
    var i, x, tablinks;
    x = document.getElementsByClassName("content-tab");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tab");
    for (i = 0; i < x.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" is-active", "");
    }
    document.getElementById(tabName).style.display = "block";
    event.currentTarget.className += " is-active";
}

function dismissMessage() {
    document.getElementById('notification-saved').classList.toggle('fade');
}

function modifyScore(id, amount) {
    var currentValue = parseInt(document.getElementById(id).value);
    currentValue = currentValue + amount;
    document.getElementById(id).value = currentValue;
}