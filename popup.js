'use strict'

let urls = '';

document.addEventListener('DOMContentLoaded', function () {
    var copyBtn = document.getElementById('copyUrls');
    copyBtn.addEventListener('click', function () {
        loadWindowList();
    });
});

function copyTextToClipboard(text) {
    navigator.clipboard.writeText(text).then(function () {
        appendToLog('URL of open tabs copied to clipboard successfully!');
    }, function (err) {
        appendToLog('Could not copy URLs: ' + err);
    });
}

function loadWindowList() {
    chrome.windows.getAll({ populate: true }, function (windowList) {
        for (var i = 0; i < windowList.length; i++) {
            for (var j = 0; j < windowList[i].tabs.length; j++) {
                urls += windowList[i].tabs[j].url + '\n';
            }
        }
        copyTextToClipboard(urls);
    });
}

function appendToLog(logLine) {
    document.getElementById('log')
        .appendChild(document.createElement('p'))
        .innerText = logLine;
}