export interface Busqueda {
    nombre?: string,
    precio?: string,
    fecha?: string
}

export interface APIBusqueda {
    id: number
    nombre: string,
    precio: string,
    fecha: string
}

export interface APITotal {
    arandano: number,
    habanero: number,
    cacahuate: number,
    ajonjoli: number,
    arbol: number,
    total: number
}