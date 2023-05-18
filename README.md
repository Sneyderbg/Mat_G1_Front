# Front-End del módulo Matrícula y Ajustes G1 - UdeA

TODO: añadir descripción

# Ejecución y compilación

## Requisitos previos

- npm y Node.js [https://nodejs.org/en]
- react-scrips [https://www.npmjs.com/package/react-scripts]
- json-server (opcional) [https://www.npmjs.com/package/json-server] (para pruebas locales)

### Antes de ejecutar o compilar, se deben inicializar los modulos y dependecias:

```console
> npm install
```

### Para ejecutar la app web:

```console
> npm start
```

### Para compilar la versión de distribución:

```console
> npm run build
```

---

## Para usar datos de prueba locales:

En otra terminal:

```console
json-server -p 4000 -d 500 --routes .\routes.json -w .\db.json
```

---

> donde **_db.json_** es un archivo json que simula los datos de prueba y **_routes.json_** es el archivo para enrutar los endpoints, los puede descargar desde [este enlace](https://drive.google.com/drive/folders/1qXAaK7NFVH1zOViZdvUJvCtVgfej4rp9?usp=share_link).
>
> Estos archivos deben ir en el directorio raíz.
