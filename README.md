# Parcial 1 - Aplicaciones Híbridas
### Alumno: Franco Campaiola

---

# GOTO Game JAM - Sistema de Votación de Jueces

## ¿Qué es?
GOTO Game JAM es una competencia anual donde equipos de desarrolladores se reúnen para crear un videojuego en un plazo de 48 horas. Como parte del proceso, un grupo de jueces evalúa y califica los videojuegos en varias categorías.

## ¿Cómo funciona?
La aplicación no cuenta con un frontend, siendo que todas las acciones se realizan a través de la API. 
A partir de ciertas consideraciones en función de lo solicitado, se desarrolló una API RESTful con Node.js y Express, utilizando MongoDB como base de datos.
Tiene ciertas validaciones para que no se puedan realizar acciones que no correspondan, como por ejemplo, votar más de una vez por un mismo juego.
Otras cuestiones adicionales refieren a distintos endpoint configurados para que se puedan realizar acciones como ver los juegos, ver los jueces, ver los votos, etc.

## ¿Qué tiene?
- Endpoint para generar una votación de un juego por un juez
- Endpoint para obtener los votos realizados por juego
- Endpoint para obtener los votos realizados por juez
- Endpoint para obtener los juegos ordenados por puntaje según su edición (y género, opcionalmente)
- Endpoint para obtener el promedio de puntaje de un juego
- CRUD de juegos

## Consideraciones
- Un juez sólo puede emitir una votación por juego
- Las puntuaciones deben estar entre 1 y 10
- Existen validaciones para asegurarse de que los jueces y juegos existan al registrar una votación

## Requerimientos
- NPM
- Node.js
- Express
- Yup
- MongoDB

## Instalación

### Clonar el repositorio
```
git clone https://github.com/francocampaiola/goto-gamejam-p1ah
```

## Instalación de paquetes utilizados
```
npm run dev
```

## Editar el archivo .env para desarrollo

```
PORT=
MONGO_URI=
MONGO_DB=
```
**NOTA:** El archivo .env no se encuentra en el repositorio por cuestiones de seguridad.

Para este proyecto se utilizó MongoDB Atlas como base de datos.

## ¡Algo no anda!
Podés crear un ```issue``` acá en el repositorio de GitHub.

## Para correr el entorno de desarrollo
```
npm run dev
```

## ¿Cómo contribuir?
Podés hacer un ```fork``` del repositorio y luego crear un ```pull request``` con tus cambios.

## Licencia
MIT

