#!/usr/bin/env node
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
exports.PolaWave = void 0;
require("colors");
const commander_1 = require("commander");
const LiveStream_command_1 = require("./command/LiveStream.command");
exports.PolaWave = new commander_1.Command('Polakwave Bridge');
exports.PolaWave.option('--livestream [Live Stream]', 'LiveStream Polkadot blocks', false);
exports.PolaWave.command('livestream')
    .description('retrieve the public address and balance of your Arweave wallet')
    .action(() => __awaiter(void 0, void 0, void 0, function* () {
    LiveStream_command_1.Stream();
    LiveStream_command_1.Events();
}));
exports.PolaWave.parse(process.argv);
console.log('hello world');
