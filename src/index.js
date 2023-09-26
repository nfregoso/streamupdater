function saveSettings() {
    var settings = {};
    settings.cTitle1 = document.getElementById('field-commentator1-name').value;
    settings.cTitle2 = document.getElementById('field-commentator2-name').value;
    settings.cTitle3 = document.getElementById('field-commentator3-name').value;
    settings.game = document.getElementById('field-gametitle').value;
    settings.mText1 = "";
    settings.mText2 = "";
    settings.mText3 = "";
    settings.mText4 = "";
    settings.p1Name = document.getElementById('field-player1-name').value;
    settings.p1Score = document.getElementById('field-player1-score').value;
    settings.p1Team = document.getElementById('field-player1-team').value;
    settings.p2Name = document.getElementById('field-player2-name').value;
    settings.p2Score = document.getElementById('field-player2-score').value;
    settings.p2Team = document.getElementById('field-player2-team').value;
    settings.round = document.getElementById('field-gameround').value;
    settings.timestamp = Date.parse(document.getElementById('field-timestamp').value) / 1000;

    window.electron.saveSettingsFile(JSON.stringify(settings));
    document.getElementById('notification-saved').style.display = 'block';
}

function loadSettings() {
    window.electron.loadSettingsFile().then((data) => {
        console.log(data);
        var jsonData = JSON.parse(data);
        document.getElementById('field-commentator1-name').value = jsonData.cTitle1;
        document.getElementById('field-commentator2-name').value = jsonData.cTitle2;
        document.getElementById('field-commentator3-name').value = jsonData.cTitle3;
        document.getElementById('field-gametitle').value = jsonData.game;
        document.getElementById('field-player1-name').value = jsonData.p1Name;
        document.getElementById('field-player1-score').value = jsonData.p1Score;
        document.getElementById('field-player1-team').value = jsonData.p1Team;
        document.getElementById('field-player2-name').value = jsonData.p2Name;
        document.getElementById('field-player2-score').value = jsonData.p2Score;
        document.getElementById('field-player2-team').value = jsonData.p2Team;
        document.getElementById('field-gameround').value = jsonData.round;
        document.getElementById('field-timestamp').value = new Date(jsonData.timestamp * 1000).toISOString().split('T')[0];
    });
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
    document.getElementById('notification-saved').style.display = 'none';
}