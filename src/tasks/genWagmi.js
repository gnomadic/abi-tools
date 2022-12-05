import { header } from "../templates/wagmi";

export async function getWagmi(contracts, args) {
  contracts.forEach((contract) => {
    console.log(`------------------------------------------------------`);
    console.log(
      `Generating Wagmi JS ${args.events ? "events" : ""} ${
        args.events && args.functions ? "and" : ""
      } ${args.functions ? "functions" : ""} for: ${contract.name}`
    );
    console.log(`------------------------------------------------------`);

    let content = header;

    

    if (args.events) {
      console.log(`Events:`);
      contract.events.forEach((event) => {
        const params = `${event.inputs
          .map(
            (input) =>
              `${input.indexed ? "indexed" : ""} ${cyan(input.type)} ${
                input.name
              }`
          )
          .join(", ")}`;

        console.log(`\t${event.name}(${params})`);
      });
    }

    if (args.functions) {
      console.log(`Functions:`);
      contract.functions.forEach((func) => {
        const params = `${func.inputs
          .map((input) => `${cyan(input.type)} ${input.name}`)
          .join(", ")}`;

        const outputs = `${func.outputs
          .map((output) => `${cyan(output.type)} ${output.name}`)
          .join(", ")}`;

        console.log(
          `\t${func.name}(${params}) ${magenta("returns")} ${outputs}`
        );
      });
    }
  });

  function cyan(value) {
    return `\x1b[0m\x1b[36m${value}\x1b[0m`; // blue
  }
  function magenta(value) {
    return `\x1b[0m\x1b[35m${value}\x1b[0m`; // blue
  }
}
