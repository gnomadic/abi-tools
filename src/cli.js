import arg from "arg";
import inquirer from "inquirer";
import { getWagmi } from "./tasks/genWagmi";
import { loadABI } from "./tasks/loadABI";
import { logAPI } from "./tasks/logAPI";

function parseArgumentsIntoOptions(rawArgs) {
  const args = arg(
    {
      "--functions": Boolean,
      "--events": Boolean,
      "--toml": String,
      "--profile:": String,
      "-f": "--functions",
      "-e": "--events",
      "-t": "--toml",
      "-p": "--profile",
    },
    {
      argv: rawArgs.slice(2),
    }
  );
  return {
    job: args._[0],
    functions: args["--functions"] || true,
    events: args["--events"] || true,
    toml: args["--toml"] || "foundry.toml",
    // profile: args["--profile"] || "profile.default",
  };
}

async function promptForMissingOptions(options) {
  const defaultJob = "Log";

  const questions = [];
  if (!options.job) {
    questions.push({
      type: "list",
      name: "job",
      message: "Please choose which job to use",
      choices: ["log", "remixgen"],
      default: defaultJob,
    });
  }

  const answers = await inquirer.prompt(questions);
  return {
    ...options,
    job: options.job || answers.job,
  };
}

export async function cli(args) {
  let options = parseArgumentsIntoOptions(args);
  options = await promptForMissingOptions(options);
  let contracts = await loadABI(options);
  // console.log({ options });
  switch (options.job) {
    case "log":
      logAPI(contracts, options);
      break;
    case "remixgen":
      getWagmi(contracts, options);
      break;
  }
}
