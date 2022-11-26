

export class Finanzas {
    
    constructor(
        public descripcion: string,
        public monto: number,
        public tipo: string,
        public uid?: string, // Se coloca al final por que un campo opcional no puede ir antes de un campo requerido
        ) {}
}