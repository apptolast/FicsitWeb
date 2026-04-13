#!/usr/bin/env node
// TeammateIdle hook: placeholder silencioso.
// Exit 0 = permite al teammate ir a idle normalmente.
// Para forzar que el teammate siga trabajando (buscar tareas en TaskList o notificar al lead):
//   process.stderr.write("Revisa TaskList. Si no hay tareas, notifica al lead.");
//   process.exit(2);
process.exit(0);
