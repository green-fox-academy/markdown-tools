import { strict as assert } from 'assert';
import { Given, When, Then, Before, After } from 'cucumber';

Before(async function() {
  return this.cli.setup('.test');
})

After(async function() {
  return this.cli.tearDown();
})

Given('the package installed', {timeout: 30_000}, async function () {
  return this.cli.runSilent('npm link');
});

Given('a bash prompt in {string} as working directory', async function (directory: string) {
  return this.cli.cwd(directory);
});

Given('a file at {string}, containing:', async function (name: string, content: string) {
  return this.cli.writeFile({name, content});
});

When('the {string} command is executed', async function (command: string) {
  return this.cli.run(command);
});

Then('the file at {string}, should contain:', async function (name: string, content: string) {
  const actualContent: string = await this.cli.readFile(name);
  assert.equal(actualContent, content);
});

Then('it should print to the standard out:', async function (content: string) {
  const stdOut: string = await this.cli.getStdOut();
  assert.equal(stdOut, content);
});

Then('the last exit code should be {int}', async function (exitCode: number) {
  const lastExitCode: number = await this.cli.getLastExitCode();
  assert.equal(lastExitCode, exitCode);
});
