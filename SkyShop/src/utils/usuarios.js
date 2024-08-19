export const usuarios = [
    {
        username: "Jon Doe",
        role: false,
        email: "jondoe@gmail.com",
        createdAt: "01/01/1997",
    },
    {
        username: "Jon Doe2",
        role: false,
        email: "jondoe2@gmail.com",
        createdAt: "02/02/1997",
    },
    {
        username: "Jon Doe3",
        role: false,
        email: "jondoe3@gmail.com",
        createdAt: "03/03/1997",
    },
    {
        username: "Jon Doe4",
        role: false,
        email: "jondoe4@gmail.com",
        createdAt: "04/04/1997",
    }
];

/*
    esta funcion devuelve las primeras dos iniciales del nombre del usuario
    y si el usuario en su nombre cuenta con mas de dos palabras,
    osea tiene un segundo nombre o dos apellidos, o ambos casos,
    la funcion devuelve solo la inicial de la primer palabra
    y la inicial de la ultima palabra (asegurando q las inciales contengan el primer nombre y el primer apellido)
*/
export const obtenerIniciales = (nombre) => {
    const palabras = nombre.trim().split(' ');

    if (palabras.length === 2) {
        return palabras.map(palabra => palabra[0].toUpperCase()).join('');
    } else if (palabras.length >= 3) {
        return palabras[0][0].toUpperCase() + palabras[2][0].toUpperCase();
    } else {
        return palabras[0][0].toUpperCase();
    }
}

/*
    esta funcion retorna el primer y/o unico nombre
    del usuario y su apellido para que aparezca en el icono de usuario,
    para que si su username es de 5 palabras,
    los estilos CSS del icono de usuario del navbar
    no se vean afectados (por el ancho del texto)
*/
export const obtenerNombreAvatar = (username) => {
    const palabras = username.trim().split(' ');
    if(palabras.length === 2){
        return palabras[0] + " " + palabras[1];
    }else if(palabras.length > 2){
        return palabras[0] + " " + palabras[2];
    }
}