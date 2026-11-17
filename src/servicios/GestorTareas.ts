import { Tarea } from '../modelos/Tarea';
import { EstadoTarea } from '../modelos/Tipos';


/**
 * agrega una nueva tarea a la lista de forma inmutable (funcion pura)
 * @param tareas lista original de tareas (solo lectura)
 * @param nuevaTarea instancia de la nueva tarea a agregar
 * @returns nuevo arreglo con todas las tareas mas la nueva
 */

export const agregarTareaFunc = (tareas: readonly Tarea[], nuevaTarea: Tarea): Tarea[] => {
    return [...tareas, nuevaTarea];

}

/**
 * filtra y devuelve unicamente las tareas que no fueron eliminadas logicamente
 * utiliza la funcion de orden superior .filter()
 * @param tareas lista de tareas a evaluar
 * @returns nuevo arreglo solo con las tareas activas
 */

export const obtenerTareasActivasFunc = (tareas: readonly Tarea[]): Tarea[] => {
    return tareas.filter(t => !t.getEliminada());
};


/**
 * filtra las tareas activas que coincidan con un estado especifico
 * aplica composicion de funciones reutilizando obtenerTareasActivasFunc
 * @param tareas lista de tareas a filtrar
 * @param estadoBuscado estado por el cual se desea filtrar (pendiente, en progreso)
 * @returns nuevo arreglo con las tareas activas que tienen ese estado
 */
export const filtrarTareasPorEstadoFunc = (tareas: readonly Tarea[], estadoBuscado: EstadoTarea): Tarea[] => {
    return obtenerTareasActivasFunc(tareas).filter(t => t.getEstado() === estadoBuscado);
};



/**
 * ordena las tareas por fecha de vencimiento de forma ascendente sin mutar el arreglo original
 * las tareas sin fecha de vencimiento quedan al final
 * @param tareas lista de tareas a ordenar
 * @returns nueva copia del arreglo ordenada por vencimiento
 */
export const ordenarPorVencimientoFunc = (tareas: readonly Tarea[]): Tarea[] => {
    //copia para no mutar el arreglo original
    return [...tareas].sort((a, b) => {
        const fechaA = a.getFechaVencimiento()?.getTime() ?? Infinity;
        const fechaB = b.getFechaVencimiento()?.getTime() ?? Infinity;
        return fechaA - fechaB;
    });

}

/**
 * obtiene las tareas activas de un estado especifico ordenadas por su fecha de vencimiento
 * ejemplo de composición de funciones
 * @param tareas Lista de tareas original
 * @param estado Estado a buscar
 * @returns Nuevo arreglo filtrado y ordenado.
 */
//composicion de funciones (filtra activas por estado y despues las ordena)
export const obtenerTareasPorEstadoOrdenadasFunc = (tareas: readonly Tarea[], estado: EstadoTarea): Tarea[] => {
    return ordenarPorVencimientoFunc(filtrarTareasPorEstadoFunc(tareas, estado));
};

