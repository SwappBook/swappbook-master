export interface Product {
    key?: string;
    titulo: string;
    autor: string;
    isbn: string;
    categoria: string;
    descripcion: string;
    user_id:string;
    latitude: number;
    longitude: number;
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

// crear interfaz que contenga los campos a editar
// poner key pero no asignarle valor