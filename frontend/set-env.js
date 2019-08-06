const { writeFile } = require("fs");
const { argv } = require("yargs");

const environment = argv.environment;
const isProd = environment === "prod";

require("dotenv").config({ path: `.env.${environment}` });

const targetPath = `./src/environments/environment.${environment}.ts`;

const apiUrl = process.env.API_URL || "http://localhost:3000/api/v1";

const envConfigFile = `export const environment = {
  production: ${isProd},
  apiUrl: '${apiUrl}'
};
`;

writeFile(targetPath, envConfigFile, function(err) {
    if (err) {
        console.log(err);
    }
    console.log(`Output generated at ${targetPath}`);
});
