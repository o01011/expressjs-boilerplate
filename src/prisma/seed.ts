import { faker } from "@faker-js/faker";
import { db } from "../db/db.ts";
import { TaskPriority, TaskStatus } from "./generated/enums.ts";

const TASK_COUNT = 50;
const TAG_NAMES = ["backend", "frontend", "devops", "bug", "feature", "documentation", "testing", "design", "performance", "security"];

const main = async () => {
	await db.$transaction(async (tx) => {
		await tx.task.deleteMany();
		await tx.tag.deleteMany();

		const tags = await Promise.all(TAG_NAMES.map((name) => tx.tag.create({ data: { name } })));

		await Promise.all(
			Array.from({ length: TASK_COUNT }, () =>
				tx.task.create({
					data: {
						title: faker.hacker.phrase(),
						description: faker.lorem.paragraph(),
						status: faker.helpers.arrayElement(Object.values(TaskStatus)),
						priority: faker.helpers.arrayElement(Object.values(TaskPriority)),
						dueDate: faker.datatype.boolean() ? faker.date.soon({ days: 30 }) : null,
						tags: {
							connect: faker.helpers.arrayElements(tags, faker.number.int({ min: 1, max: 3 })).map(({ id }) => ({ id })),
						},
					},
				}),
			),
		);
	});

	console.info(`Seeded ${TASK_COUNT} tasks and ${TAG_NAMES.length} tags.`);
};

main()
	.catch((error: unknown) => {
		console.error("Seed failed", error);
		process.exitCode = 1;
	})
	.finally(async () => {
		await db.$disconnect();
	});
