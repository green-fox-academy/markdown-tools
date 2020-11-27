#!/usr/bin/env node

'use strict';

const { runCli } = require('../dist/src/cli.js');

const { argv, stdout, stderr } = process;

runCli({ argv, stdout, stderr }).then(process.exit);

