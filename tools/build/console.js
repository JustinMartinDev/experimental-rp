import { readFileSync } from "fs";
import path from "path";
import chalk from "chalk";

const packageNameToHexColor = (packageName) => {
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
};

const getLogInfo = () => {
  // Resolve and read the package.json file
  const pkgPath = path.resolve(process.cwd(), "package.json");
  const packageJson = JSON.parse(readFileSync(pkgPath, "utf-8"));

  // Extract the package name
  const packageName = packageJson.name || "Unnamed Package";

  const color = packageNameToHexColor(packageName);

  const now = new Date();
  const timestamp = now.toISOString().replace("T", " ").split(".")[0];

  return { packageName, color, timestamp };
};

const log = (action, message, logInfo) => {
  const { color, packageName, timestamp } = logInfo;

  console.log(
    `<${action}>`,
    `[${chalk.hex(color)(packageName)}]`,
    "-",
    message ?? chalk.greenBright(timestamp),
  );
};

export { packageNameToHexColor, getLogInfo, log };
