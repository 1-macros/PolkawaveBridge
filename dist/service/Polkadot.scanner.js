"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stream = exports.events = void 0;
const api_1 = require("@polkadot/api");
function events() {
    return __awaiter(this, void 0, void 0, function* () {
        const provider = new api_1.WsProvider('wss://rpc.polkadot.io');
        const api = yield api_1.ApiPromise.create({ provider });
        const events = yield api.query.system.events((events) => {
            console.log(`\nReceived ${events.length} events:`);
            events.forEach((record) => {
                const { event, phase } = record;
                const types = event.typeDef;
                // Show what we are busy with
                console.log(`\t${event.section}:${event.method}:: (phase=${phase.toString()})`);
                console.log(`\t\t${event.meta.documentation.toString()}`);
                // Loop through each of the parameters, displaying the type and data
                event.data.forEach((data, index) => {
                    console.log(`\t\t\t${types[index].type}: ${data.toString()}`);
                });
            });
        });
    });
}
exports.events = events;
function stream() {
    return __awaiter(this, void 0, void 0, function* () {
        const provider = new api_1.WsProvider('wss://rpc.polkadot.io');
        const api = yield api_1.ApiPromise.create({ provider });
        let count = 0;
        const unsubscribe = yield api.rpc.chain.subscribeNewHeads((header) => {
            console.log(`Chain is at block: #${header.number}`);
            console.log(`block info: #${header}`);
            if (++count === 256) {
                unsubscribe();
                process.exit(0);
            }
        });
    });
}
exports.stream = stream;
