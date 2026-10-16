import { db } from "../db/db";

const main = async () => {
	await db.task.deleteMany()
	await db.tag.deleteMany()

	const tags = await Promise.all(["backend", "frontend", "devops", "bug", "feature"].map((name) => db.tag.create({ data: { name } })))

	 const tasks = [
    {
      title: "Set up CI/CD pipeline",
      description: "Configure GitHub Actions for automated testing and deployment",
      status: "TODO" as const,
      priority: "HIGH" as const,
      tags: { connect: [{ id: tags[2]!.id }, { id: tags[4]!.id }] },
    },
    {
      title: "Fix login redirect bug",
      description: "Users are redirected to 404 after successful login",
      status: "IN_PROGRESS" as const,
      priority: "HIGH" as const,
      tags: { connect: [{ id: tags[1]!.id }, { id: tags[3]!.id }] },
    },
    {
      title: "Add dark mode support",
      description: "Implement theme switching with system preference detection",
      status: "TODO" as const,
      priority: "MEDIUM" as const,
      tags: { connect: [{ id: tags[1]!.id }, { id: tags[4]!.id }] },
    },
    {
      title: "Optimize database queries",
      description: "Add indexes and review N+1 query patterns",
      status: "TODO" as const,
      priority: "MEDIUM" as const,
      tags: { connect: [{ id: tags[0]!.id }] },
    },
    {
      title: "Write API documentation",
      description: "Document all endpoints with request/response examples",
      status: "DONE" as const,
      priority: "LOW" as const,
      tags: { connect: [{ id: tags[0]!.id }] },
    },
  ];

	for(const task of tasks) {
		await db.task.create({ data: task })
	}
}

main().catch((e) => {
	console.error("Seed failed", e)
	process.exit(1)
}).finally(async () => {
	await db.$disconnect()
})
