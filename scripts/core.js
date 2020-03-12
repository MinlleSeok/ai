function init(text, options) {
    const ROOT = document.getElementById("game");
    ROOT.innerHTML = "";
    document.getElementById("user").childNodes[0].remove();
    
    typeText(0, ROOT, text, 150, choice, options);
}

function choice(options) {
    const selections = document.createElement('div');
    selections.className = "choice";

    const first = document.createElement('span');
    first.onclick = () => select(options[0], options[2]);
    first.textContent = options[0];
    selections.appendChild(first);

    const second = document.createElement('span');
    second.onclick = () => select(options[1], options[2]);
    second.textContent = options[1];
    selections.appendChild(second);

    document.getElementById("user").appendChild(selections);
}


function select(choose, answer) {
    const a = Math.round(Math.random() * 100);
    const b = Math.round(Math.random() * 100);

    const text = answer === choose ? 
        `고라지, ${choose}이지n너의 문제를 맞춰봐n${a} + ${b}` :
        `휴,, ${choose}라니n너의 문제를 맞춰봐n${a} + ${b}`;

    const luck = Math.round(Math.random() * 1);
    const luck2 = Math.round(Math.random() * 10);

    const options = luck == 1 ? 
        [a + b, a + b + luck2, a + b] : 
        [a + b - luck2, a + b, a + b];

    init(text, options);
}

function typeText(i, target, text, speed, callback, options) {
    if (i < text.length) {
        target.innerHTML += text.charAt(i) === 'n' ? "<br/>" : text.charAt(i);
        i++;
        window.setTimeout(typeText, speed, i, target, text, speed, callback, options);
    } else {
        callback(options);
    }
}

const firstText = "안녕, 휴먼.n나는 앵공지능이야n방구가 마렵군";
const firstOptions = ["방구 낀다", "방구 먹인다", "방구 먹인다"];

window.onload = init(firstText, firstOptions);