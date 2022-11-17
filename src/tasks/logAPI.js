export async function logAPI(contracts, args) {
  contracts.forEach((contract) => {
    console.log(`------------------------------------------------------`);
    console.log(
      `Logging ${args.events ? "events" : ""} ${
        args.events && args.functions ? "and" : ""
      } ${args.functions ? "functions" : ""} for: ${contract.name}`
    );
    console.log(`------------------------------------------------------`);

    if (args.events) {
      console.log(`Events:`);
      contract.events.forEach((event) => {
        // console.log(`\t${event.name}`);
        const params = `${event.inputs.map((input) => input.type).join(", ")}`;

        console.log(`\t${event.name}(\x1b[0m\x1b[36m${params}\x1b[0m)`);
      });
    }

    if (args.functions) {
      console.log(`Functions:`);
      contract.functions.forEach((func) => {
        const params = `${func.inputs.map((input) => input.type).join(", ")}`;
        console.log(`\t${func.name}(\x1b[0m\x1b[36m${params}\x1b[0m)`);
      });
    }
  });
}
