export interface ProductItem {
	id: number;
	title: string;
	description: string;
	price: number;
	discountPercentage: number;
	rating: number;
	stock: number;
	brand: string;
	category: string;
	thumbnail: string;
	images: string[];
}

export type ProductsKeys = keyof Omit<ProductItem, 'images'>;

export interface ProductList {
	products: ProductItem[];
	total: number;
	skip: number;
	limit: number;
}

export interface AddNewProductProps {
	category: string;
	title: string;
	price: number;
	description: string;
}
