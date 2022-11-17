// and then we visit the /out directory to grab the json for each contract
// and then we finally pull out the abi json from that jsonfile.
var toml = require("toml");
const fsp = require("fs/promises");
var fs = require("fs");
var path = require("path");

export async function loadABI(args) {
  try {
    const tomldata = await fsp.readFile(args.toml, {
      encoding: "utf8",
    });

    var data = toml.parse(tomldata);
  } catch (e) {
    console.error(
      "Parsing error on line " +
        e.line +
        ", column " +
        e.column +
        ": " +
        e.message
    );
  }
  let srcdir = data.profile.default.src;
  let outdir = data.profile.default.out;

  // here we want to traverse the /src directory to get ABIs we care about

  let srcFiles = [];
  for await (const srcFile of walk(srcdir)) {
    srcFiles.push(path.basename(srcFile, ".sol"));
  }

  // srcFiles.forEach((file) => {
  //   console.log(file);
  // });

  // and then we visit the /out directory to grab the json for each contract
  let contracts = [];
  for (const element of srcFiles) {
    let abiFile = path.join(outdir, element + ".sol");
    // console.log(abiFile);
    let abi = JSON.parse(
      await fsp.readFile(path.join(abiFile, element + ".json"))
    );
    let events = [];
    let functions = [];
    abi.abi.forEach((element) => {
      if (element.type == "event") {
        events.push(element);
      } else if (element.type == "function") {
        functions.push(element);
      }
    });
    let contract = {
      name: element,
      abi: abi.abi,
      events: events,
      functions: functions,
    };
    contracts.push(contract);
  }

  return contracts;
}

async function* walk(dir) {
  for await (const d of await fs.promises.opendir(dir)) {
    const entry = path.join(dir, d.name);
    if (d.isDirectory()) yield* walk(entry);
    else if (d.isFile()) yield entry;
  }
}
