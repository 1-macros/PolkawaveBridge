import { ApiPromise, WsProvider } from '@polkadot/api';

export async function events() {
  const provider = new WsProvider('wss://rpc.polkadot.io');
  const api = await ApiPromise.create({ provider });
  const events = await api.query.system.events((events) => {
    console.log(`\nReceived ${events.length} events:`);

    events.forEach((record) => {
      const { event, phase } = record;
      const types = event.typeDef;

      // Show what we are busy with
      console.log(
        `\t${event.section}:${event.method}:: (phase=${phase.toString()})`
      );
      console.log(`\t\t${event.meta.documentation.toString()}`);

      // Loop through each of the parameters, displaying the type and data
      event.data.forEach((data, index) => {
        console.log(`\t\t\t${types[index].type}: ${data.toString()}`);
      });
    });
  });
}

export async function blocks() {
  const provider = new WsProvider('wss://rpc.polkadot.io');

  const api = await ApiPromise.create({ provider });

  let count = 0;
  const unsubscribe = await api.rpc.chain.subscribeNewHeads((header) => {
    console.log(`Chain is at block: #${header.number}`);
    console.log(`block info: #${header}`);

    if (++count === 256) {
      unsubscribe();
      process.exit(0);
    }
  });
}
