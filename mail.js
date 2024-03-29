const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    pool: true,
    host: "smtp.yandex.ru", //"smtp-mail.outlook.com",
    port: 465, //587,
    secure: true,
    auth: {
        user: "smi-works", 
        pass: "chqndcyhwpdapobp"
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

let text = "Unsupported html content";
async function send(inp, file) {
    let tmp_tables = "<table style='border-collapse: collapse;'><tr><th>Товар</th><th>Количесвто (ед.изм.)</th><th>Вес (тонн)</th></tr>";
    let pre_tmp = inp["form_positions"].split("`");
    let tmp = pre_tmp[0].split("~");
    let tmp_2 = tmp.map((item) => item.split("|"));
    for (const i of tmp_2) {
        if (i[0] != "") {
            tmp_tables += "<tr>";
            tmp_tables += "<td style='text-align: center;padding:3px;border: 1px solid black;'>" + i[0] + "</td><td style='text-align: center;padding:3px;border: 1px solid black;'>" + i[3] + " " + i[4] + "</td><td style='text-align: center;padding:3px;border: 1px solid black;'>" + i[1] + " " + i[2] + "</td>";
            tmp_tables += "</tr>";
        }
    }
    tmp_tables += "<tr><td style='border:none'></td><td style='padding:3px;border:none;text-align: end;' colspan='2'>Общий вес:&nbsp;" + Number(pre_tmp[1]).toFixed(3) + "&nbsp;тн</td></tr></table>";

    let textHtml = "<p>Заказ от&nbsp;" + dd.toString() + "." + mm.toString() + "." + yyyy.toString() + "&nbsp;" + hrs.toString() + ":" + mns.toString() + "</p>" + 
    "<p>Клиент:&nbsp;" + inp["form-name"] + "</p>" + 
    "<p>E-mail:&nbsp;" + inp["form-mail"] + "</p>" +
    "<p>Телефон:&nbsp;" + inp["form-phone"] + "</p>" + 
    "<p>Склад:&nbsp;" + inp["form-city"] + "</p>" +
    "<p>Комментарии к заказу:&nbsp;" + inp["form-comms"] + "</p>" +
    "<p>ИНН:&nbsp;" + inp["form-inn"] + "</p>" + tmp_tables;
    let attchs = []
    if (typeof file != 'undefined')
        attchs = [{ filename: file.originalname, content: Uint8Array.from(file.buffer.data) }];
    console.log(await sendMail("kudryashov.s.a@gmail.com", "Заказ на сайте METALLIST", text, textHtml, attchs));
    let textHtml_toClient = "<p>Здравствуйте,&nbsp;" + inp["form-name"] + "!</p>" + 
    "<p>Уведомляем, что Ваш заказ на сайте <a href='https://metallistmarket.ru'>https://metallistmarket.ru</a> принят в обработку</p>" +
    tmp_tables + "<p>Уточнить детали заказа можно по телефону 8 926 000 9288</p><p>WhatsApp, Telegram, Viber: +7 927 253 39 55</p><p>Хорошего дня!</p>";
    console.log(await sendMail(inp["form-mail"], "Заказ на сайте METALLIST", text, textHtml_toClient, []));
    transporter.close();
}

process.on('message', async (msg) => {
    await send(msg[0], msg[1]);
    process.exit(0)});