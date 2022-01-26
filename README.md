# BusesUY Frontend

BusesUY es un buscador de lineas de ómnibus de larga distancia interdepartamentales e internacionales en Uruguay. La principal motivación para su creación fue poder mostrar, además de líneas que no necesariamente pasan por Montevideo, posibilidades de transbordo entre localidades que no tienen conexiones directas.

El proyecto está actualmente funcionado en [BusesUY](https://busesuy.ares.uy/).

## BusesUY Backend

Este repositorio contiene el componente de frontend del proyecto, el cual se comunica con una API que se encuentra en este otro repositorio: [BusesUY Backend](https://github.com/ferares/busesuy-backend)

## Dependencias

Se utilizan [Node.js](https://nodejs.org/en/) y [npm](https://www.npmjs.com/) para el manejo de dependencias y proceso de desarrollo del frontend.

## Comandos

Los siguientes comandos están disponibles una vez instalados [Node.js](https://nodejs.org/en/) y [npm](https://www.npmjs.com/):

- `npm i` - Instala las dependencias del proyecto.
- `npm start` - Corre un servidor local en el puerto `4200` con hot reloading para desarrollo.
- `npm run buil` - Compila el proyecto para producción en la carpeta `dist`.
