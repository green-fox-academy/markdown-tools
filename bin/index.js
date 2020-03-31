#!/usr/bin/env node

'use strict';

const { runCli } = require('../dist/cli.js');

process.exit(runCli(process.argv));
