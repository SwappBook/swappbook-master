export interface Product {
    key?: string;
    titulo: string;
    autor: string;
    isbn: string;
    categoria: string;
    descripcion: string;
    user_id:string;
}

export interface ProductWithImage {
    key?: string;
    titulo: string;
    autor: string;
    isbn: string;
    categoria: string;
    descripcion: string;
    user_id:string;
    images_products: any[];
}