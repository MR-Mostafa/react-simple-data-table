export interface ProductItem {
	id: number;
	title: string;
	description: string;
	price: number;
	discountPercentage: 12.96;
	rating: number;
	stock: number;
	brand: string;
	category: string;
	thumbnail: string;
	images: string[];
}

export interface ProductList {
	products: ProductItem[];
	total: number;
	skip: number;
	limit: number;
}
