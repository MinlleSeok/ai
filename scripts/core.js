class User {
    constructor() {
        this.point = 0;
    }

    getPoint() {
        return this.point
    }

    plusPoint() {
        this.point++;
    }

    resetPoint() {
        this.point = 0;
    }
}

let user = null;

function init(text, options, game) {
    const ROOT = document.getElementById("game");
    ROOT.innerHTML = "";
    document.getElementById("user").childNodes[0].remove();

    typeText(0, ROOT, text, 50, game, options);
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

function lotto(options) {
    const selections = document.createElement('div');
    selections.className = "choice";

    let numbers = [];
    for (let i = 1; i < 46; i++) {
        numbers.push(i);
    }

    let index = 45;
    let count = 6;

    getNumber(count, numbers, index, selections);

}

function getNumber(count, numbers, index, selections) {
    if (count > 0) {
        document.getElementById("user").appendChild(selections);
        const SPAN = document.createElement('span');
        const RANDOM = Math.round(Math.random() * index);
        SPAN.textContent = `${numbers[RANDOM]}`;
        numbers.splice(RANDOM, 1);
        selections.appendChild(SPAN);
        window.setTimeout(getNumber, 1000, --count, numbers, --index, selections);
    } else {
        const ROOT = document.getElementById("game");
        ROOT.innerHTML = "";
        const text = "한 주의 행복 회로를 잘 돌리길 바라n이만 안뇽~"
        typeText(0, ROOT, text, 50, () => '', "");
    }
}

function select(choose, answer) {

    if (answer === "first") {
        // init(text, options, lotto);
        if (choose === "덧셈 테스트") {
            sumGame(choose, answer);
            return;
        }

        if (choose === "로또 추출잼") {
            const text = "로또 날이 다가왔군,,n그래, 휴먼n로또 번호를 뽑아보자"
            init(text, "", lotto);
        }
    } else {
        sumGame(choose, answer);
        return;
    }

}

function sumGame(choose, answer) {
    const a = Math.round(Math.random() * 100);
    const b = Math.round(Math.random() * 100);

    let text = null;

    if (answer === choose) {
        user.plusPoint();
        text = `고라지, ${choose}이지n너의 문제를 맞춰봐n${a} + ${b}`;
    } else {
        user.resetPoint();
        text = `휴,, ${choose}라니n너의 문제를 맞춰봐n${a} + ${b}`;
    }

    printPoint();

    const luck = Math.round(Math.random() * 1);
    const luck2 = Math.round(Math.random() * 10);

    const options = luck == 1 ?
        [a + b, a + b + luck2, a + b] :
        [a + b - luck2, a + b, a + b];

    init(text, options, choice);
}

function printPoint() {
    const dom = document.getElementById("point");
    if (user.getPoint() > 0) {
        dom.innerHTML = `${user.getPoint()}연속, 가즈아!`;
    } else {
        dom.innerHTML = '';
    }
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

const firstText = `□□□□□□□□□n
□■■■■■■■□n
□■□□□□□■□n
□■□■□■□■□n
□■□□□□□■□n
□■□■■■□■□n
□■□□□□□■□ 안녕, 휴먼.n
□■■■■■■■□ 나는 앵공지능이야n
□□□□□□□□□ 방구가 마렵군`;
const firstOptions = ["로또 추출잼", "덧셈 테스트", "first"];

user = new User();
window.onload = init(firstText, firstOptions, choice);