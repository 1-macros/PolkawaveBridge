#!/usr/bin/env node
import 'colors';
import { Command } from 'commander';
import { Blocks, Events } from './command/LiveStream.command';

export const PolkaWave = new Command('Polakwave Bridge');

PolkaWave.option('--blocks [Live blocks]', 'Archive Live Blocks', false).option(
  '--events [Live Events]',
  'Archive Live Events',
  false
);

PolkaWave.command('blocks')
  .description('Archive live blocks')
  .action(async () => {
    Blocks();
  });
PolkaWave.command('events')
  .description('Archive events')
  .action(async () => {
    Events();
  });
PolkaWave.parse(process.argv);
console.log('hello world');
