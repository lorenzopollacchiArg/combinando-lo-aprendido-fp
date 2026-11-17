import { DificultadTarea, EstadoTarea, Prioridad } from './Tipos';
import { v4 as uuidv4 } from 'uuid';

/**
 * clase tarea
 */

export class Tarea {
    private idRelacionados: string[] = [];
    private readonly id: string;
    private titulo: string;
    private descripcion: string;
    private estado: EstadoTarea;
    private dificultad: DificultadTarea;
    private prioridad: Prioridad;
    private readonly fechaCreacion: Date;
    private fechaUltimaEdicion: Date | null;
    private fechaVencimiento: Date | null;
    private eliminada: boolean;


    constructor(titulo: string, descripcion: string = "Sin Descripcion", dificultad: DificultadTarea = DificultadTarea.MEDIA, prioridad: Prioridad = Prioridad.MEDIA, fechaVencimiento: Date | null = null, id: string | null = null, estado: EstadoTarea | null = null, fechaCreacion: Date | null = null) {
        if (!titulo || titulo.trim().length === 0) {
            throw new Error("El titulo no puede estar vacio");
        }

        // ID: si viene el viejo por parametro lo usa pero si es null genera uno nuevo
        this.id = id ?? uuidv4();

        this.titulo = titulo;
        this.descripcion = descripcion;

        //  Estado: Si viene el viejo lo usa pero si es null  se crea como PENDIENTE.
        this.estado = estado ?? EstadoTarea.PENDIENTE;

        this.dificultad = dificultad;
        this.prioridad = prioridad;

        // Fechas: La de creacion recupera la vieja o genera nueva, la de edicion siempre es nueva
        this.fechaCreacion = fechaCreacion ?? new Date();
        this.fechaUltimaEdicion = new Date();
        this.fechaVencimiento = fechaVencimiento;

        this.eliminada = false;
    }

    public getId(): string {
        return this.id;
    }
    public getTitulo(): string {
        return this.titulo;
    }
    public getDescripcion(): string {
        return this.descripcion;
    }
    public getEstado(): EstadoTarea {
        return this.estado;
    }

    public getDificultad(): DificultadTarea {
        return this.dificultad;
    }

    public getPrioridad(): Prioridad {
        return this.prioridad;
    }

    public getFechaCreacion(): Date {
        return this.fechaCreacion
    }

    public getFechaVencimiento(): Date | null {
        return this.fechaVencimiento;
    }

    public getFechaUltimaEdicion(): Date | null {
        return this.fechaUltimaEdicion;
    }

    public cambiarTitulo(nuevoTitulo: string): void {
        if (!nuevoTitulo || nuevoTitulo.trim().length === 0) {
            throw new Error("El nuevo titulo no puede estar vacio");
        }
        this.titulo = nuevoTitulo;
        this.fechaUltimaEdicion = new Date();
    }
    public cambiarEstado(nuevoEstado: EstadoTarea): void {
        this.estado = nuevoEstado;
        this.fechaUltimaEdicion = new Date();
    }

    public cambiarDificultad(nuevaDificultad: DificultadTarea): void {
        this.dificultad = nuevaDificultad;
        this.fechaUltimaEdicion = new Date();
    }

    public CambiarPrioridad(nuevaPrioridad: Prioridad): void {
        this.prioridad = nuevaPrioridad;
        this.fechaUltimaEdicion = new Date();
    }

    public editarDescripcion(nuevaDescripcion: string): void {
        this.descripcion = nuevaDescripcion;
        this.fechaUltimaEdicion = new Date();
    }

    public ponerComoEliminada(): void {
        this.eliminada = true;
        this.fechaUltimaEdicion = new Date();
    }

    public getEliminada(): boolean {
        return this.eliminada;
    }

    public geIdRelacionados(): string[] {
        return [...this.idRelacionados];
    }

    public agregarRelacion(idRelacionados: string): void {
        if (!this.id || this.id.trim().length === 0) {
            throw new Error("El id relacionado no puede estar vacio");
        }
        if (!this.idRelacionados.includes(idRelacionados)) {
            this.idRelacionados.push(idRelacionados);
            this.fechaUltimaEdicion = new Date();
        }
    }
}