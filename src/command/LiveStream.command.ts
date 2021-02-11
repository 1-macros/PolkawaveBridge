import { events, blocks } from '../service/Polkadot.scanner';
export async function Blocks() {
  await blocks();
}

export async function Events() {
  await events();
}
