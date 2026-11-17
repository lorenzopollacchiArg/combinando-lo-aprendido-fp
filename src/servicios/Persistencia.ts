import * as fs from 'fs';
import { Tarea } from '../modelos/Tarea';

const tareasGuardadas = 'tareas.json';

export function guardarTareas(tareas: readonly Tarea[]): void{
    try{ 
        const datosJSON = JSON.stringify(tareas, null, 2);
        fs.writeFileSync(tareasGuardadas, datosJSON, 'utf-8');
       

    }
    catch(error){
        console.error("Error al guardar las tareas:", error);
    }
}

export function cargarTareas(): Tarea[]{
    try {
         if(fs.existsSync(tareasGuardadas)){
            const datosJSON = fs.readFileSync(tareasGuardadas, 'utf-8');
            const tareasCargadas = JSON.parse(datosJSON).map((tarea: any) => new Tarea(tarea.titulo, tarea.descripcion, tarea.dificultad, tarea.prioridad, tarea.fechaVencimiento ? new Date(tarea.fechaVencimiento) : null , tarea.id, tarea.estado,tarea.fechaCreacion ? new Date(tarea.fechaCreacion): null));
            return tareasCargadas;
        } else {
            return [];
        }

    }
    catch(error){
        console.error("Error al cargar las tareas:", error);
        return [];
    }
}



