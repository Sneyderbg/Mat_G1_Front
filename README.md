# Front-End del módulo Matrícula y Ajustes G1 - UdeA
TODO: añadir descripción
# Ejecución y compilación

## Requisitos previos

- npm y Node.js [https://nodejs.org/en]
- react-scrips [https://www.npmjs.com/package/react-scripts]
- json-server (opcional) [https://www.npmjs.com/package/json-server] (para pruebas locales)

### Para ejecutar la app web:

```console
npm start
```

### Para compilar la versión de distribución:

```console
npm run build
```
----------

## Para usar datos de prueba locales:

En otra terminal:

```console
json-server -p 4000 -w .\db.json
```

>donde **_db.json_** es un archivo json que simula los datos de prueba, puede descargar el archivo base [aquí](https://drive.google.com/file/d/1GnYU-lIpAMOnwXR5E4IgixdmiZYVIkFc/view?usp=share_link)
