import { existsSync } from "node:fs";
import { execSync } from "node:child_process";
import { join } from "node:path";

import watch from "glob-watcher";
import { matcher } from "matcher";
import normalizePath from "normalize-path";
import chalk from "chalk";

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

const exludePackagePatterns = [
  "!@tools/*",
  "!*/mocks",
  "!*/msw",
  "!*/prisma",
  "!docs",
  "!@spawnmanager/*",
  "!experimental-rp",
];

/**
 * Get all packages of pnpm workspaces
 */

/*
 Get all packages of pnpm workspaces (
    execSync("pnpm m ls --json --depth=-1", {
      cwd: PWD,
      encoding: "utf-8",
    }).toString(),
  )


 Exclude exludePackages from packages list 

 For each package:
  - if there is a src folder then add it to the watch list and save in record<packageName, src folder path>
  - else add the package folder to the watch list and save in record<packageName, package folder path>

 Start watcher:
  - When a file changes, get the package name from the path and run the build script for that package (Be sure to redirect stdout to the console)
  */
const PWD = process.cwd();

const allPackages = JSON.parse(
  execSync("pnpm m ls --json --depth=-1", {
    cwd: PWD,
    encoding: "utf-8",
  }).toString(),
);

const packageNamesToScan = matcher(
  allPackages.map(({ name }) => name),
  exludePackagePatterns,
  { allPatterns: true },
);

const packagesToScan = allPackages.filter(({ name }) =>
  packageNamesToScan.includes(name),
);

const watchList = {};

packagesToScan.forEach((pkg) => {
  const srcPath = join(pkg.path, "src");

  if (existsSync(srcPath)) {
    watchList[pkg.name] = srcPath;
  } else {
    watchList[pkg.name] = pkg.path;
  }
});

const globalIgnorePatterns = ["!**/node_modules", "!**/dist"];

const pathToWatch = Object.values(watchList).map((path) =>
  normalizePath(join(path, "/**/*")),
);

var watcher = watch([...pathToWatch, ...globalIgnorePatterns]);

console.group("Watching:");

Object.keys(watchList).forEach((pkg) =>
  console.log(chalk.hex(packageNameToHexColor(pkg))(pkg)),
);

console.groupEnd();

watcher.on("change", (path) => {
  const [pkg] = Object.entries(watchList).find(([_, p]) => {
    return path.startsWith(p);
  });

  if (!pkg) {
    console.log("No package found for path", path);
    return;
  }

  const pkgWithColor = chalk.hex(packageNameToHexColor(pkg))(pkg);

  console.log(`[${pkgWithColor}]`, "Building...");

  execSync(`pnpm --filter ${pkg} build`, {
    cwd: PWD,
    stdio: "inherit",
  });

  console.log(`[${pkgWithColor}]`, "Done building");
});

console.log("\nStart watching...");
