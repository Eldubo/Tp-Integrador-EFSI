# Frontend - Tp-Integrador-EFSI

Este es el frontend de la aplicación de gestión de eventos, desarrollado en React + Vite. Permite a los usuarios autenticarse, ver y buscar eventos, inscribirse, crear y administrar sus propios eventos y ubicaciones.

## Funcionalidades principales
- **Autenticación de usuario:** Login y registro con manejo de token JWT.
- **Listado de eventos:** Visualización paginada de eventos, con búsqueda y filtrado.
- **Detalle de evento:** Información completa, inscripción/cancelación y visualización de ubicación.
- **Mis eventos:** Gestión de eventos creados por el usuario (editar, eliminar).
- **Crear evento:** Formulario con validaciones para crear nuevos eventos.
- **Ubicaciones:** Gestión de ubicaciones propias (crear, editar, eliminar).

## Tecnologías
- React 18 + Vite
- React Router DOM
- CSS moderno y modular
- Consumo de API RESTful

## Instalación y ejecución
1. Instalar dependencias:
   ```bash
   npm install
   ```
2. Ejecutar el servidor de desarrollo:
   ```bash
   npm run dev
   ```
3. Acceder a la app en [http://localhost:5173](http://localhost:5173)

## Estructura de carpetas
- `src/components/` - Componentes reutilizables y páginas principales
- `src/services/` - Lógica de comunicación con la API
- `src/assets/` - Recursos estáticos

## Notas
- Todas las llamadas a la API pasan por `src/services/api.js` para un manejo centralizado de autenticación y errores.
- El diseño es moderno, atractivo y adaptable a dispositivos móviles.
