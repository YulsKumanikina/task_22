const status = document.querySelector('#status');
const timeZone = document.querySelector('#timeZone');
const btn = document.querySelector('.j-btn-test');
const dateTime = document.querySelector('#dateTime');

const error = () => {
    status.textContent = 'Невозможно получить ваше местоположение';
}

const success = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    data = useRequest(`https://api.ipgeolocation.io/timezone?apiKey=32bcd4a6e4b548968e7afcdb682ac679&lat=${latitude}&long=${longitude}`, callback);
}

function callback(item) {
    timeZone.innerHTML = 'Временная зона, в которой находится пользователь: ' + item.timezone;
    dateTime.innerHTML = 'Местное дата и время: ' + item.date_time_txt;
}

function useRequest(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    
    xhr.onload = function() {
      if (xhr.status != 200) {
        console.log('Статус ответа: ', xhr.status);
      } else {
        const result = JSON.parse(xhr.response);
        if (callback) {
          callback(result);
        }
      }
    };
    
    xhr.onerror = function() {
      console.log('Ошибка! Статус ответа: ', xhr.status);
    };
    
    xhr.send();
  };


btn.addEventListener('click', () => {

    if (!navigator.geolocation) {
        status.textContent = 'Geolocation не поддерживается вашим браузером';
    } else {
        status.textContent = 'Определение местоположения…';
        navigator.geolocation.getCurrentPosition(success, error);
    }
});