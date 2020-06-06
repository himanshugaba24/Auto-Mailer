let puppeteer = require("puppeteer");
let fs = require("fs");
let detailsFile = process.argv[2];
let send = process.argv[3];
let subject = process.argv[4];
let message = process.argv[5];
let url, pwd, user, url1;
(async function () {
    let data = await fs.promises.readFile(detailsFile, "utf-8");
    let details = JSON.parse(data);
    url = details.url;
    user = details.user;
    pwd = details.pwd;
    url1=details.url1;
    // starts browser
    let browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ["--start-maximized", "--disable-notifications"],
        slowMo: 400
    });
    let numberofPages = await browser.pages();
    let tab = numberofPages[0];
    // goto page
    // 1. 
    await tab.goto(url, {
        waitUntil: "networkidle2"
    });

    await tab.waitForSelector(".whsOnd.zHQkBf");
    await tab.type(".whsOnd.zHQkBf", user, { delay: 200 });
    
    await tab.click(".RveJvd.snByac");
    await tab.waitForSelector(".whsOnd.zHQkBf");
    await tab.type(".whsOnd.zHQkBf", pwd, { delay: 200 });
    await tab.click(".RveJvd.snByac");
    console.log("User logged in");

    await tab.goto(url1,{waitUntil: "networkidle2"});
    await tab.click(".T-I.J-J5-Ji.T-I-KE.L3");
    await tab.waitForSelector(".vO")
    await tab.type(".vO",`${send}`);
    await tab.waitForSelector(".aoT")
    await tab.type(".aoT",`${subject}`);
    await tab.waitForSelector(".Am.Al.editable.LW-avf.tS-tW")
    await tab.type(".Am.Al.editable.LW-avf.tS-tW",`${message}`);
    await tab.click(".T-I.J-J5-Ji.aoO.v7.T-I-atl.L3")
    
})()