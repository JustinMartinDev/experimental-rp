import { readFileSync } from "fs";
import { execSync } from "child_process";
import assert from "assert";
import { join } from "path";
import chalk from "chalk";

const { PWD, INIT_CWD } = process.env;

function packageNameToHexColor(packageName) {
  // Create a hash from the package name
  let hash = 0;
  for (let i = 0; i < packageName.length; i++) {
    hash = packageName.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Convert hash to a 6-digit hex color
  let color = "#";
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    color += ("00" + value.toString(16)).slice(-2);
  }
  return color;
}

// Scan each package.json file, search in dependencies and devDependencies if packageName is present
// If found, run the build script for that package

assert(PWD, "PWD is not defined");
assert(INIT_CWD, "INIT_CWD is not defined");

const { name: packageName } = JSON.parse(
  readFileSync(join(INIT_CWD, "package.json"), "utf8"),
);

const packageColor = packageNameToHexColor(packageName);

console.log("Build dependent for", chalk.hex(packageColor)(packageName));

const packagesJson = JSON.parse(
  execSync("pnpm m ls --json --depth=-1", {
    cwd: PWD,
    encoding: "utf-8",
  }).toString(),
);

const packagesToRebuild = packagesJson.filter(({ path }) => {
  const packageJsonData = JSON.parse(
    readFileSync(`${path}/package.json`, "utf8"),
  );

  const dependencies = packageJsonData.dependencies || {};
  const devDependencies = packageJsonData.devDependencies || {};

  const deps = [...Object.keys(dependencies), ...Object.keys(devDependencies)];

  return deps.includes(packageName);
});

console.log(
  `[${chalk.hex(packageColor)(packageName)}]`,
  `Found ${packagesToRebuild.length} packages to rebuild`,
  packagesToRebuild.map(({ name }) => name).join(", "),
);

for (const packageToRebuild of packagesToRebuild) {
  console.log(`Rebuilding ${packageToRebuild?.name}...`);

  execSync(`pnpm --filter=${packageToRebuild?.name} build`, {
    cwd: PWD,
  });
}
