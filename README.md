# clinical_history_system

## Tabla de contenidos

- [Herramientas Utilizadas](#herramientas-utilizadas)
- [Prerrequisitos](#prerrequisitos)
- [Iniciar](#iniciar)
- [Estructura De Carpetas](#estructura-de-carpetas)
- [Consideraciones](#consideraciones)

### Herramientas Utilizadas

El stack manejado para el proyecto fue:

* [Node.js](https://nodejs.org/) 
* [Express](https://express.com/) 
* [Mongodb](https://mongodb.com/) 

### Prerrequisitos

* Node.js v-16.17.0
* Express v-4.18.2


## Iniciar

Para poder ejecutar el proyecto de manera local dejaré los siguientes pasos para su ejecución correcta:

### Correr aplicación de manera local 

1. Clonar el repositorio
   ```
   git clone <Nombre de la rama> https://github.com/jorgearbelaez/clinical_history_system.git
   ```
  
2. Instalar NPM packages 
   ```
   npm install
   ```
   ```
   npm i
   ```
   
3. Asignar las variables de entorno, creando el archvio `.env` en base al archivo `.env.example`.

   ```
   FRONTEND_URL = Ejemplo "http://127.0.0.1:5173"
   ```
   
### Estructura De Carpetas
  ```
                             
  backend  
  
     --Api                   manejo por features con sus repectivos(modelos,rutas,controladores y servicios)
     
     --auth                  lo relacionado a la autenticacion 
  
     --config                configuracion coneccion a base de datos, express, etc
     
     --helpers               Funciones de ayuda

     --middlewares           Validadores de datos

     --routes                conexiones url(rutas generales) 

        
  ```

### Consideraciones

