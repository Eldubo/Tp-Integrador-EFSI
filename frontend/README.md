# Frontend Eventos

Aplicación frontend para gestión de eventos desarrollada con React, Vite y React Router.

## Mejoras implementadas

### 1. Corrección de flujo de autenticación
- Corregido el orden de parámetros en la función `login` del contexto de autenticación
- Implementado manejo adecuado de tokens expirados
- Protección de rutas basada en autenticación

### 2. Mejoras en manejo de errores
- Validación de formularios en frontend
- Manejo de errores de API con mensajes específicos
- Estados de carga para operaciones asíncronas
- Confirmación de acciones destructivas

### 3. Mejoras en la UI/UX
- Implementación de estilos CSS consistentes
- Uso de clases CSS predefinidas
- Feedback visual para estados de carga y errores
- Diseño responsive

### 4. Reutilización de código
- Creación de hook personalizado `useForm` para manejo de formularios
- Componentes reutilizables
- Estructura de proyecto organizada

### 5. Seguridad
- Manejo seguro de tokens de autenticación
- Protección contra accesos no autorizados
- Validación de datos de entrada

## Estructura del proyecto

```
src/
├── components/        # Componentes reutilizables
├── context/           # Contextos de React
├── hooks/             # Hooks personalizados
├── pages/             # Páginas de la aplicación
├── services/          # Servicios (API)
├── App.css            # Estilos globales
├── App.jsx            # Componente principal
├── main.jsx           # Punto de entrada
└── router.jsx         # Configuración de rutas
```

## Tecnologías utilizadas

- React 18
- Vite
- React Router v6
- Axios
- CSS custom

## Instalación

```bash
npm install
```

## Desarrollo

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Variables de entorno

- `VITE_API_URL`: URL base de la API backend

## Componentes principales

### Páginas
- **Login/Register**: Autenticación de usuarios
- **EventosList**: Listado de eventos con paginación
- **EventoDetalle**: Detalle de un evento específico
- **MisEventos**: Gestión de eventos creados por el usuario
- **CrearEventoForm**: Formulario para crear nuevos eventos
- **UbicacionesList**: Gestión de ubicaciones

### Componentes
- **EventoCard**: Tarjeta de visualización de eventos

### Contextos
- **AuthContext**: Manejo de estado de autenticación

### Hooks
- **useForm**: Hook personalizado para manejo de formularios

### Servicios
- **api**: Cliente HTTP configurado con interceptores
