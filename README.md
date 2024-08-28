# Proyecto-Lugares-Ionic

Proyecto-Lugares-Ionic es una aplicación desarrollada en Ionic para la visualización de lugares turísticos. La aplicación permite a los usuarios iniciar sesión, ver lugares con imágenes y descripciones, dejar comentarios en los lugares, y a los administradores realizar un CRUD de los lugares.

<div style="display: flex; justify-content: space-between;">
  <img src="https://github.com/user-attachments/assets/3aa91b36-bfd8-49a9-964e-99fffa383cbb" alt="Login" style="width: 32%; height: auto;"/>
  <img src="https://github.com/user-attachments/assets/de28b30a-885b-4944-a369-3b24e408cd8c" alt="Vista de Lugares" style="width: 32%; height: auto;"/>
  <img src="https://github.com/user-attachments/assets/e196131d-af27-41c6-9914-e512232b3413" alt="Vista de un lugar" style="width: 32%; height: auto;"/>
</div>

## Características

- **Login:** Los usuarios pueden iniciar sesión en la aplicación.
- **Ver Lugares:** Los usuarios pueden ver una lista de lugares turísticos con sus respectivas imágenes y descripciones.
- **Comentarios:** Los usuarios pueden dejar comentarios en los lugares.
- **CRUD de Lugares:** Los administradores pueden agregar, editar, eliminar y ver lugares turísticos.

## Tecnologías Utilizadas

- **Frontend:** Ionic
- **Backend:** NodeJs, Express.js
- **Base de Datos:** PostgreSQL

## Instalación

Sigue los pasos a continuación para configurar y ejecutar el proyecto en tu entorno local.

### 1. Clonar el Repositorio

  ```bash
  git clone https://github.com/Lio10jr/Proyecto-Lugares-Ionic.git
  ```

### 2. Configuración del Backend

Navega a la carpeta backend:

  ```bash
  cd Proyecto-Lugares-Ionic/backEnd
  ```

Instala las dependencias:

  ```bash
  npm i
  ```

Configura la base de datos PostgreSQL:

  1. Crea una base de datos en PostgreSQL.

  2. Crea un archivo .env en la carpeta backend y agrega la configuración de la base de datos:

  ```bash
  DB_HOST=localhost
  DB_PORT=5432
  DB_USER=tu_usuario
  DB_PASSWORD=tu_contraseña
  DB_NAME=nombre_de_tu_base_de_datos
  ```

Inicia el servidor Express:
  ```bash
    npm start
  ```
El servidor estará disponible en `http://localhost:3000`.

Adicionalmente se agregan las siguientes variables de entorno:

  ```bash
    JWT_SECRET=escribe_tu_clave_secreta
    PORT=3000
  ```

### 3. Configuración del Ionic
Navega a la carpeta frontend:

  ```bash
  cd ../app-lugares
  ```

Instala las dependencias:

  ```bash
  npm install
  ```

Ejecuta la aplicación Ionic en tu navegador:

  ```bash
  ionic serve
  ```
La aplicación estará disponible en `http://localhost:8100`.

## Uso

1. Login
Abre la aplicación en tu navegador.
Inicia sesión con tus credenciales o crea una nueva cuenta de usuario.

2. Ver Lugares
Navega a la página principal para ver la lista de lugares.
Haz clic en un lugar para ver su imagen y descripción.

4. Dejar Comentarios
En la página de un lugar, escribe y envía un comentario.

6. Administración de Lugares
Si eres un administrador, navega a la sección de administración para agregar, editar o eliminar lugares.
