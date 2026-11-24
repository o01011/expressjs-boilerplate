export type PageType<T> = {
	items: T[];
	page: number;
	limit: number;
	total: number;
};
