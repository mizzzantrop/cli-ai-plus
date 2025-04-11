#!/usr/bin/env node

const { program } = require("commander");

program.name("mycli").description("My awesome CLI tool").version("1.0.0");

program
  .command("greet <name>")
  .description("Greet someone")
  .action((name) => {
    console.log(`Hello, ${name}!`);
  });

program
  .command("ai <name>")
  .description("Greet someone")
  .action((name) => {
    console.log(`Hello, ${name}!`);
  });

program.parse();
