# EcuCorte 🇪🇨⚡

## Descripción del Proyecto

EcuCorte es una aplicación backend diseñada para procesar y gestionar información sobre cortes de energía eléctrica en Ecuador. El sistema permite:

-    Recibir documentos con información de cortes de luz
-    Extraer texto de archivos PDF
-    Procesar la información de cortes
-    Preparar notificaciones para dispositivos móviles

## Requisitos Previos

-    Node.js (versión 18.x o superior)
-    pnpm -> install: https://pnpm.io/installation#using-other-package-managers

## Instalación

1. Clonar el repositorio

```bash
git clone https://github.com/RoberthLoorDev/ecucorte-express.git
cd ecucorte-express
```

2. Instalar dependencias

```bash
pnpm install
```

## Configuración

Crea un archivo `.env` en la raíz del proyecto con las configuraciones necesarias:

```env
PORT=3000
# Otras configuraciones...
```

## Ejecución del Proyecto

Para iniciar el servidor en modo desarrollo:

```bash
pnpm run dev
```

## Endpoints

-    **Ruta Inicial**: `http://localhost:3000/`

     -    Indica que el servidor está corriendo
     -    Responde con un mensaje de estado

-    **Carga de Documentos**: `http://localhost:3000/upload`
     -    Interfaz web para subir archivos PDF
     -    Extrae y muestra el texto del documento

## Bibliotecas Utilizadas

-    `multer`: Manejo de subida de archivos
-    Utilidad personalizada `pdfProcessor` para extracción de texto de PDFs

## Tecnologías Utilizadas

-    Node.js
-    Express.js
-    Sistema de notificaciones push
