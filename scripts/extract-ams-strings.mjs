import fs from "fs";
const s = fs.readFileSync("ams-quote.js", "utf8");
const idx = s.indexOf("How far are you moving");
console.log(s.slice(idx, idx + 8000));
