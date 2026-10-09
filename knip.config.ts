import type { KnipConfig } from "knip";

const config: KnipConfig = {
	$schema: "https://unpkg.com/knip@5/schema.json",
	ignoreDependencies: ["@prisma/client"]
};

export default config;
