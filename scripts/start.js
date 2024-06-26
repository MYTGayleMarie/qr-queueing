const childProcess = require("child_process");
const fs = require("fs");
const readline = require("readline");
async function processLineByLine() {
const fileStream = fs.createReadStream(".env");
const rl = readline.createInterface({
input: fileStream,
crlfDelay: Infinity,
});
const outputs = [];
for await (const line of rl) {
outputs.push(line);
}
return outputs;
}
function writeToEnv(key = "", value = "") {
const empty = key === "" && value === "";
if (empty) {
fs.writeFile(".env", "", () => {});
} else {
fs.appendFile(".env", `${key}='${value.trim()}'\n`, (err) => {
if (err) console.log(err);
});
}
}
(async () => {
const results = await processLineByLine();
writeToEnv();
for (const result of results) {
if (!result.includes("REACT_APP_GIT_BRANCH")) {
if (!result.includes("REACT_APP_GIT_SHA")) {
const lineArray = result.split("=");
if (lineArray.length === 2) {
const key = lineArray[0].replace(/'/gi, "");
const value = lineArray[1].replace(/'/gi, "");
console.log({ key, value });
writeToEnv(key, value);
}
}
}
}
childProcess.exec("git rev-parse --abbrev-ref HEAD", (err, stdout) => {
writeToEnv("REACT_APP_GIT_BRANCH", stdout);
});
childProcess.exec("git rev-parse --short HEAD", (err, stdout) => {
writeToEnv("REACT_APP_GIT_SHA", stdout);
});
})();