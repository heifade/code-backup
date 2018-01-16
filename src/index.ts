import { option } from "yargs";
import chalk from "chalk";
import { spawnSync, SpawnSyncOptionsWithStringEncoding, execSync } from "child_process";

let pars = option("r", {
  alias: "winrar",
  demand: false,
  default: `C:/"Program Files"/WinRAR/WinRAR.exe`,
  describe: "WinRAR程序的URL",
  type: "string"
})
  .option("p", {
    alias: "password",
    demand: true,
    default: "",
    describe: "请输入压缩密码。",
    type: "string"
  })
  .option("s", {
    alias: "source",
    demand: true,
    // default: "",
    describe: "输入源目录。",
    type: "string"
  })
  .option("o", {
    alias: "out",
    demand: false,
    default: "",
    describe: "输入压缩包全名。",
    type: "string"
  }).argv;

let options: SpawnSyncOptionsWithStringEncoding = {
  encoding: "utf8",
  cwd: __dirname,
  stdio: [process.stdin, process.stdout, process.stderr]
};

try {
  let childProcess = spawnSync(`${pars.r}`, ["a", "-r", "-rv1", "-ibck", "-m5", "-or", "-agYYYYMMDDHHMMSS", `-hp${pars.p}`, ".rar", `${pars.s}`], options);

  console.log(childProcess);
} catch (e) {
  console.log("error", e);
}
