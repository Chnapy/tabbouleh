// #!/usr/bin/env node

import 'reflect-metadata';
import { REFLECT_JSON_ATTRIBUTES, REFLECT_JSON_CLASS } from '../src/annotation/ReflectKeys';

const fs = require('fs');
const yargs = require('yargs');

console.log('SCRIPT GO');

const cli = yargs
  .help()
  .version()
  .command('$0', 'Files and directories of classes', (yargs: any) => input(yargs.argv))
  // .command('output', 'Output', (yargs: any) => output(yargs.argv))
  .option('o', {
    alias: 'output'
  })
  .nargs('o', 1)
  .demandOption(['o'])
  .option('verbose', {
    alias: 'v',
    default: false
  })
  .strict();


const args = cli.argv;

if (!args._[0]) {
  cli.showHelp();
}

// tabbouleh(...process.argv);

function input(args: any) {
  console.log('INPUT ARGS', args);

  const inputFiles = args._ || [];
  const outputDir = args.o;

  if (!outputDir || !fs.existsSync(outputDir) || !fs.lstatSync(outputDir).isDirectory()) {
    throw new Error('Output directory not specified, or wrong, or is not a directory: ' + outputDir);
  }

  if (!inputFiles.length) {
    throw new Error('No input files or directories specified');
  }

  for (const fileOrDir of inputFiles) {

    if (!fs.existsSync(fileOrDir)) {
      throw new Error('File or directory specified doesn\'t exist: ' + fileOrDir);
    }

    if (fs.lstatSync(fileOrDir).isDirectory()) {
      loadDir(fileOrDir);
    } else {
      loadFile(fileOrDir);
    }

  }

}

function loadDir(dirPath: string) {
  fs.readdirSync(dirPath).forEach((filePath: string) => {
    loadFile(filePath);
  });
}

function loadFile(filePath: string) {

  const load = require(filePath);

  console.log('REQUIRE_LIST', load);

  for (const k of Object.keys(load)) {
    const value = load[k];

    if (typeof value !== 'function') {
      continue;
    }

    const metadata = Reflect.getMetadata(REFLECT_JSON_CLASS, value.prototype);

    if (!metadata) {
      continue;
    }

    const attributes = Reflect.getMetadata(REFLECT_JSON_ATTRIBUTES, value.prototype);

    console.log('KEEP', k, value, metadata, attributes);
  }

}

process.exit();
