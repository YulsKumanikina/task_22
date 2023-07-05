const wsUri = "wss://ws.ifelse.io";

const output = document.getElementById("output");
const btnOpen = document.querySelector('.j-btn-open');
const btnClose = document.querySelector('.j-btn-close');
const btnSend = document.querySelector('.j-btn-send');
const input = document.querySelector('.input');

let websocket;

function writeToScreen(message) {
    let pre = document.createElement("p");
    pre.style.wordWrap = "break-word";
    pre.innerHTML = message;
    output.appendChild(pre);
}

btnOpen.addEventListener('click', () => {
    btnGeo.style.display = "block";
    output.style.display = "block";
    output.style.border = "1px solid black";
    output.style.borderRadius = "10px";
    output.style.paddingLeft = "5px";
    btnOpen.style.display = "none";
    btnClose.style.display = "block";
    btnSend.style.display = "block";
    input.style.display = "block"
    websocket = new WebSocket(wsUri);
    websocket.onopen = function (evt) {
        writeToScreen("CONNECTED");
    };
    websocket.onclose = function (evt) {
        writeToScreen("DISCONNECTED");
    };
    websocket.onmessage = function (evt) {
        writeToScreen(
            '<span style="color: blue;">СЕРВЕР: ' + evt.data + '</span>'
        );
    };
    websocket.onerror = function (evt) {
        writeToScreen(
            '<span style="color: red;">ERROR:</span> ' + evt.data
        );
    };
});

btnClose.addEventListener('click', () => {
    btnGeo.style.display = "none";
    btnOpen.style.display = "block";
    btnClose.style.display = "none";
    btnSend.style.display = "none";
    input.style.display = "none"
    output.innerHTML = "";
    websocket.close();
    websocket = null;
});

btnSend.addEventListener('click', () => {
    const message = input.value;
    writeToScreen("КЛИЕНТ: " + message);
    websocket.send(message);
});

const status = document.querySelector('#status');
const btnGeo = document.querySelector('.j-btn-geo');

// Функция, выводящая текст об ошибке
const error = () => {
    status.textContent = 'Невозможно получить ваше местоположение';
}

// Функция, срабатывающая при успешном получении геолокации
const success = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const message = '<a href=' + `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}` + '>Ссылка на карту</a>';
    writeToScreen(message);
}

btnGeo.addEventListener('click', () => {

    if (!navigator.geolocation) {
        status.textContent = 'Geolocation не поддерживается вашим браузером';
    } else {
        navigator.geolocation.getCurrentPosition(success, error);
    }
});