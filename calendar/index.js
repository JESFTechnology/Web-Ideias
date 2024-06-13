const diasOcupados = [];
let SHEET_ID = 'ID'
let SHEET_TITLE = 'Name';
let SHEET_RANGE = 'A2:A100';
const FULL_URL = ('https://docs.google.com/spreadsheets/d/' + SHEET_ID + '/gviz/tq?sheet=' + SHEET_TITLE + '&range=' + SHEET_RANGE);
fetch(FULL_URL)
.then(res => res.text())
.then(rep => {
    let data = JSON.parse(rep.substr(47).slice(0, -2));
 
    const carousel_inner = document.getElementById('carousel_inner');
    const carousel_indicators = document.getElementById('carousel_indicators');

    let length = data.table.rows.length;

    for (let x = 0; x < length; x++) {
        const texto = `${data.table.rows[x].c[0].v}`;
        const regex = /\((\d{4}),(\d{1,2}),(\d{1,2})\)/;
        const match = texto.match(regex);
        if (match) {
            const ano = match[1];
            const mes = match[2].padStart(2, '0');
            const dia = match[3].padStart(2, '0');
            const dataFormatada = `${ano}-${mes}-${dia}`;
            diasOcupados.push(dataFormatada)
        }
    }
});

let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

const daysOfWeek = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
const today = new Date();
const dayOfWeek = daysOfWeek[today.getDay()];
const dia = today.getDate();
const mes = today.getMonth();

function renderCalendar() {
const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
const daysInMonth = getDaysInMonth(currentMonth, currentYear);
const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

document.getElementById("month").innerText = monthNames[currentMonth] + " " + currentYear;

let html = "";

for (let i = 0; i < firstDayOfMonth; i++) {
    html += "<div class='date-2'></div>";
}

for (let i = 1; i <= daysInMonth; i++) {
    const diaEscolhido = `${currentYear}-${currentMonth}-${i}`; // Dia que você deseja verificar
    if (isDiaOcupado(diaEscolhido)) {
        if (dia == i && currentMonth == mes) {
            html += "<div class='date-2 bg-danger text-white-2 border-warning-2'>" + i + "</div>";
        } else {
            html += "<div class='date-2 bg-danger text-white-2'>" + i + "</div>";
        }
    } else {
        const dataDeConfirma = new Date(currentYear, currentMonth, i); // Data específica
        const conferir = dataDeConfirma.getDay();
        const diaDaSemana = daysOfWeek[conferir]
        if (dia == i && currentMonth == mes) {
            if (diaDaSemana == 'Domingo' || diaDaSemana == 'Quarta-feira') {
                html += "<div class='date-2 border-warning-2 bg-warning-2'>" + i + "</div>";
            } else if (diaDaSemana == 'Sábado') {
                html += "<div class='date-2 border-warning-2 bg-info-2'>" + i + "</div>";
            } else {
                html += "<div class='date-2 border-warning-2'>" + i + "</div>";
            }
        } else {
            if (diaDaSemana == 'Domingo' || diaDaSemana == 'Quarta-feira') {
                html += "<div class='date-2 bg-warning-2'>" + i + "</div>";
            } else if (diaDaSemana == 'Sábado') {
                html += "<div class='date-2 bg-info-2'>" + i + "</div>";
            } else {
                html += "<div class='date-2'>" + i + "</div>";
            }
        }
    }
    if (i == daysInMonth) {
        const dataDeConfirma = new Date(currentYear, currentMonth, i); // Data específica
        const conferir = dataDeConfirma.getDay();
        const diaDaSemana = daysOfWeek[conferir]
        if (diaDaSemana != 'Domingo' && diaDaSemana != 'Sábado') {
            for (let x = conferir; x < 6; x++) {
                html += "<div class='date-2'></div>";
            }
        }
    }
}

document.querySelector(".dates-2").innerHTML = html;
}

function getDaysInMonth(month, year) {
return new Date(year, month + 1, 0).getDate();
}

function prevMonth() {
let mesAtual = new Date().getMonth();
let anoAtual = new Date().getFullYear();
currentMonth--;
if (currentMonth < mesAtual && anoAtual == currentYear) {
    currentMonth++;
    return;
}
if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
}
renderCalendar();
}

function nextMonth() {
currentMonth++;
if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
}
renderCalendar();
}

function isDiaOcupado(dia) {
const date = new Date(dia);
const diaFormatado = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
return diasOcupados.includes(diaFormatado);
}

renderCalendar();
