// const divisas = require("./divisas.json");
// const peliculas = require("./peliculas.json");
const pokemon = require("./pokemon.json");
const express = require("express");
const app = express();
app.use(express.json());
let ultimoID = 3;
/*
1.- Endpoint que indique todas las monedas disponibles
2.- Endpoint que indique dada una moneda cual es el valor en todas las demas
3.- Endpoint que indique dada moneda A y B cuanto vale A en B
*/
// app.get("/obtenerDivisas", function (request, response) {
//     const catalogo = divisas.map((divisa) => divisa.moneda);
//     console.log(catalogo);
//     response.end();
// });

// app.get("/obtenerValor", function (request, response) {
//     const moneda = request.body.moneda;
//     let catalogoCambio = divisas.filter((divisa) => divisa.moneda === moneda);

//     if (catalogoCambio.length) {
//         response.json(catalogoCambio[0].tipoCambio);
//     } else {
//         response.end("Error, no existe el tipo de cambio");
//     }
// });

// app.get("/divisas", function (request, response) {
//     const { divisa, tipoCambio } = request.query;

//     if (!divisa) {
//         response.end("Error, no se ha proporcionado la divisa");
//     } else if (!tipoCambio) {
//         response.end("Error, no se ha proporcionado el tipo de cambio");
//     } else {
//         const divisaEncontrada = divisas.filter(
//             ({ moneda }) => moneda === divisa
//         );

//         if (!divisaEncontrada.length) {
//             response.end("Error, no existe la divisa");
//         } else {
//             const tipoCambioEncontrado = divisaEncontrada[0].tipoCambio.filter(
//                 ({ moneda }) => moneda === tipoCambio
//             );

//             if (!tipoCambioEncontrado.length) {
//                 response.end("Error, no existe el tipo de cambio");
//             } else {
//                 response.json({ valor: tipoCambioEncontrado[0].valor });
//             }
//         }
//     }
// });

/**
 * Endpoints:
 *
 * 1. Obtener todas las peliculas
 *
 * 2. Obtener todas las peliculas de un genero
 * en particular
 *
 * 3. Obtener todas las peliculas donde participa
 * un actor en particular
 *
 * 4. Agregar una nueva pelicula (crear un nuevo ID)
 *
 * 5. Eliminar una pelicula (por su ID)
 */

app.get("/obtenerPeliculas", function (request, response) {
    response.json(peliculas);
});

app.get("/obtenerPorGenero/:genero", function (request, response) {
    const { genero } = request.params;

    const resultado = peliculas.filter((pelicula) =>
        pelicula.genero
            .map((genero) => genero.toLowerCase())
            .includes(genero.toLowerCase())
    );

    response.json(resultado);
});

app.get("/obtenerPorActor", function (request, response) {
    const { actor } = request.query;

    const resultado = peliculas.filter((pelicula) =>
        pelicula.actores
            .map((actor) => actor.toLowerCase())
            .includes(actor.toLowerCase())
    );

    response.json(resultado);
});

app.get("/eliminarPelicula", function (request, response) {
    const { id } = request.body;

    if (!id) {
        response.end("Error, no se proporcionó un ID");
        return;
    }

    const index = peliculas.findIndex((pelicula) => pelicula.id === id);

    if (index === -1) {
        response.end("No se encontró el ID");
    } else {
        peliculas.splice(index, 1);
        response.end(`Pelicula con ID ${id} eliminada`);
    }
});

app.get("/agregarPelicula", function (request, response) {
    const pelicula = request.body;

    // Vieja
    //pelicula.id = ++ultimoID;
    //peliculas.push(pelicula);

    // Moderna
    peliculas.push({ ...pelicula, id: ++ultimoID });

    response.end("Pelicula agregada");
});

/*
* 1. Obtener la lista de los NOMBRES y ID de los entrenadores
 *
 * 2. Obtener la info de un entrenador por su ID
 * 
 * 3. Obtener el listado de POKEMON de un entrenador (por ID)
 * 
 * 4. Crear un nuevo entrenador
 * 
 * 5. Agregar un pokemon a un entrenador
*/

app.get("/getnameid", function (request, response) {
    const namesids = pokemon.map(entrenador => [entrenador.id,entrenador.nombre])
    console.log(namesids)
    response.json(namesids);
});
app.get("/getinfoid", function (request, response) {
    const id = request.body.id;
    const result = pokemon.filter((entrenador) => entrenador.id === id);
    response.json(result);
});
app.get("/getpokemon", function (request, response) {
    const id = request.body.id;
    const result = pokemon.filter((entrenador) => entrenador.id === id);
    console.log("Este es el result",result)
    response.json(result[0].pokemon);
});
app.get("/addtrainer", function (request, response) {
    const trainer = request.body;
    pokemon.push({ ...trainer, id: ++ultimoID });
    response.end("Pokemon agregado");
});
app.get("/addpokemon", function (request, response) {
    //Pendiente
});
app.listen(8000, function () {
    console.log("Servidor corriendo en el puerto 8000");
});
