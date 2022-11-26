
export class Usuario {

    static fromFirestore( firestoreUser: any ) { //desestructuracion del objeto de firebase

        const { uid, nombre, email } = firestoreUser;

        return new Usuario(uid, nombre, email);
    }
    
    constructor(public uid: any, 
                public nombre: string, 
                public email: string
    ) {}

}

export const emptyUser = new Usuario( '0', '', '');