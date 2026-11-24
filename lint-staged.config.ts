import type { Configuration } from "lint-staged";

const config: Configuration = {
	"*.{ts,js,json,jsonc,yml,yaml,md,css}": "npm run lint:fix",
};

export default config;
