
# Configuración de GitHub para Vehicle Spruce System

Este documento proporciona instrucciones paso a paso para subir este proyecto a GitHub.

## Prerrequisitos

1. Tener una cuenta de GitHub
2. Tener Git instalado en tu computadora

## Pasos para subir el proyecto a GitHub

### 1. Crear un nuevo repositorio en GitHub

1. Ve a [github.com](https://github.com) e inicia sesión
2. Haz clic en el botón "+" en la esquina superior derecha y selecciona "New repository"
3. Nombra tu repositorio (por ejemplo, "vehicle-spruce-sys")
4. Opcionalmente, agrega una descripción
5. Elige la visibilidad (público o privado)
6. No inicialices el repositorio con README, .gitignore, o license
7. Haz clic en "Create repository"

### 2. Configurar Git en tu proyecto local

Abre una terminal en el directorio raíz de tu proyecto y ejecuta los siguientes comandos:

```bash
# Inicializar Git si aún no lo has hecho
git init

# Configurar tu nombre de usuario y correo electrónico (si es la primera vez que usas Git)
git config --global user.name "Tu Nombre"
git config --global user.email "tu.email@ejemplo.com"

# Agregar todos los archivos al área de preparación
git add .

# Crear el primer commit
git commit -m "Commit inicial: Vehicle Spruce System"

# Agregar el repositorio remoto que creaste en GitHub (reemplaza la URL con la de tu repositorio)
git remote add origin https://github.com/tu-usuario/vehicle-spruce-sys.git

# Subir los cambios al repositorio remoto
git push -u origin main
```

Nota: Si tu rama principal se llama "master" en lugar de "main", usa:
```bash
git push -u origin master
```

### 3. Verificar que todo se haya subido correctamente

1. Visita tu repositorio en GitHub
2. Deberías ver todos los archivos y carpetas de tu proyecto
3. También verás información sobre el último commit realizado

## Problemas comunes y soluciones

### Error de autenticación al hacer push

Si encuentras problemas de autenticación, es posible que necesites configurar un token de acceso personal (PAT):

1. Ve a [GitHub Settings > Developer Settings > Personal Access Tokens](https://github.com/settings/tokens)
2. Genera un nuevo token con permisos de repositorio
3. Utiliza este token como contraseña cuando Git te solicite credenciales

### Rama principal con nombre diferente

Si el comando `git push` falla porque no existe la rama "main", intenta:

```bash
# Ver qué rama tienes localmente
git branch

# Si tu rama se llama "master", usa:
git push -u origin master
```

## Actualizaciones futuras

Para subir cambios futuros al repositorio:

```bash
# Agregar archivos modificados
git add .

# Crear un commit con un mensaje descriptivo
git commit -m "Descripción de los cambios realizados"

# Subir los cambios
git push
```

## Ignorar archivos

Es importante no subir archivos sensibles como .env con credenciales.
El proyecto ya tiene un .gitignore configurado, pero asegúrate de que incluya:

```
# Archivos de entorno
.env
.env.local
.env.development
.env.test
.env.production

# Dependencias
/node_modules

# Archivos de compilación
/dist
/build

# Logs
*.log
```

Si necesitas modificar el .gitignore, simplemente edita el archivo .gitignore en la raíz del proyecto.
