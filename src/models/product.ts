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
    precio: number;
    accion: string;
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
    precio: string;
    accion: string;
}

// crear interfaz que contenga los campos a editar
// poner key pero no asignarle valor
