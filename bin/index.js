#!/usr/bin/env node

'use strict';

const { runCli } = require('../dist/src/cli.js');

runCli(process.argv).then(process.exit);
