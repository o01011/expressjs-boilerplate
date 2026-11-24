import { RuleConfigSeverity, type UserConfig } from "@commitlint/types";

const config: UserConfig = {
	defaultIgnores: true,
	extends: ["@commitlint/config-conventional"],
	helpUrl: "https://github.com/conventional-changelog/commitlint/#what-is-commitlint",
	rules: {
		"header-case": [RuleConfigSeverity.Error, "always", "lowercase"],
		"header-trim": [RuleConfigSeverity.Error, "always"],

		"references-empty": [RuleConfigSeverity.Disabled, "always"],

		"scope-case": [RuleConfigSeverity.Error, "always", "lowercase"],
		"scope-empty": [RuleConfigSeverity.Error, "never"],
		"scope-enum": [RuleConfigSeverity.Error, "always", ["api", "config", "db", "deps", "docker", "scripts"]],

		"subject-case": [RuleConfigSeverity.Error, "always", ["lowercase"]],
		"subject-empty": [RuleConfigSeverity.Error, "never"],

		"type-case": [RuleConfigSeverity.Error, "always", "lowercase"],
		"type-empty": [RuleConfigSeverity.Error, "never"],
		"type-enum": [RuleConfigSeverity.Error, "always", ["build", "chore", "ci", "docs", "feat", "fix", "perf", "refactor", "revert", "test"]],
	},
};

export default config;
