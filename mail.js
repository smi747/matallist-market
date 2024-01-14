const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    pool: true,
    host: "smtp.yandex.ru", //"smtp-mail.outlook.com",
    port: 465, //587,
    secure: true,
    auth: {
        user: "smi-works", 
        pass: ""
    }
})

async function sendMail(email, theme, text, textHtml, attchs) {

    let message = {
        from: "smi.works@yandex.ru",
        to: email,
        subject: theme,
        text: text,
        html: textHtml,
        attachments: attchs
    }

    let info = await transporter.sendMail(message)

    if (info.response.substr(0, 3) == '250') {
        return `Письмо успешно отправлено на адрес ${email}!`
    }

    return `Ошибка отправки письма на адрес ${email}!`
}

let info = {name: "test_name", city: "test_city", }

let today = new Date();
const yyyy = today.getFullYear();
let mm = today.getMonth() + 1; // Months start at 0!
let dd = today.getDate();
let hrs = today.getHours();
let mns = today.getMinutes();

let text = "Привет мир!";
let theme = "Тема письма";
async function send(inp, file) {
    let tmp_tables = "<style>td, th {padding:3px;border: 1px solid black;}</style><table style='border-collapse: collapse;'><tr><th>Товар</th><th>Количество (тонн)</th><th>Количесвто (ед.изм.)</th></tr>";
    let pre_tmp = inp["form_positions"].split("`");
    let tmp = pre_tmp[0].split("~");
    let tmp_2 = tmp.map((item) => item.split("|"));
    for (const i of tmp_2) {
        if (i[0] != "") {
            tmp_tables += "<tr>";
            tmp_tables += "<td>" + i[0] + "</td><td>" + i[1] + " " + i[2] + "</td><td>" + i[3] + " " + i[4] + "</td>";
            tmp_tables += "</tr>";
        }
    }
    tmp_tables += "</table>";

    let textHtml = "<p>Заказ от&nbsp;" + dd.toString() + "." + mm.toString() + "." + yyyy.toString() + "&nbsp;" + hrs.toString() + ":" + mns.toString() + "</p>" + 
    "<p>Клиент:&nbsp;" + inp["form-name"] + "</p>" + 
    "<p>E-mail:&nbsp;" + inp["form-mail"] + "</p>" +
    "<p>Телефон:&nbsp;" + inp["form-phone"] + "</p>" + 
    "<p>Склад:&nbsp;" + inp["form-city"] + "</p>" +
    "<p>Комментарии к заказу:&nbsp;" + inp["form-comms"] + "</p>" +
    "<p>ИНН:&nbsp;" + inp["form-inn"] + "</p>" + tmp_tables + "<p>Общий вес:&nbsp;" + pre_tmp[1] + "</p>";
    let attchs = []
    if (typeof file != 'undefined')
        attchs = [{ filename: file.originalname, content: Uint8Array.from(file.buffer.data) }];
    console.log(await sendMail("smi.works@yandex.ru", theme, text, textHtml, attchs));
    transporter.close();
}

process.on('message', async (msg) => {
    await send(msg[0], msg[1]);
    process.exit(0)});