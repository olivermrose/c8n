import { faker } from "@faker-js/faker";
import { bench, describe } from "vitest";
import { every, filter, find, forEach, map, reduce, some } from "../src";

const accounts = faker.helpers.multiple(
	() => {
		return {
			name: faker.person.fullName(),
			email: faker.internet.email(),
			address: faker.location.streetAddress(),
			creditCard: {
				issuer: faker.finance.creditCardIssuer(),
				number: faker.finance.creditCardNumber(),
				security: faker.finance.creditCardCVV(),
				pin: faker.finance.pin(6),
			},
			username: faker.internet.username(),
			birthday: faker.date.birthdate(),
			age: faker.number.int({ min: 18, max: 80 }),
			createdAt: faker.date.recent({ days: 30 }),
		};
	},
	{ count: 200 },
);

const numbers = faker.helpers.multiple(() => faker.number.int(), { count: 200 });

describe("every", () => {
	bench("function", () => {
		every(numbers, (n) => n > 0);
	});

	bench("native", () => {
		numbers.values().every((n) => n > 0);
	});
});

describe("filter", () => {
	bench("function", () => {
		filter(accounts, (account) => account.age > 30);
	});

	bench("native", () => {
		accounts.values().filter((account) => account.age > 30);
	});
});

describe("find", () => {
	bench("function", () => {
		find(accounts, (account) => account.age > 30);
	});

	bench("native", () => {
		accounts.values().find((account) => account.age > 30);
	});
});

describe("forEach", () => {
	bench("function", () => {
		const people = [];

		forEach(accounts, (account) => {
			people.push(`${account.name} (${account.email}); ${account.age} y/o`);
		});
	});

	bench("native", () => {
		const people = [];

		accounts.values().forEach((account) => {
			people.push(`${account.name} (${account.email}); ${account.age} y/o`);
		});
	});
});

describe("map", () => {
	bench("function", () => {
		map(accounts, (account) => account.name);
	});

	bench("native", () => {
		accounts.values().map((account) => account.name);
	});
});

describe("reduce", () => {
	bench("function", () => {
		reduce(numbers, (a, b) => a + b, 0);
	});

	bench("native", () => {
		numbers.values().reduce((a, b) => a + b, 0);
	});
});

describe("some", () => {
	bench("function", () => {
		some(numbers, (n) => n > 100);
	});

	bench("native", () => {
		numbers.values().some((n) => n > 100);
	});
});
