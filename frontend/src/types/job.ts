/* Estado general del trabajo (en cola, ejecutando, terminado, fallido, timeout y uno desconocido para estados
 que el frontend no reconoce). Guarda el estado de cada etapa por separado (pruebas, profiling, modelado), 
 para que un fallo parcial no oculte resultados válidos. Separa también el resultado de las pruebas 
 (¿es correcta la solución?) del estado del análisis (¿terminó?), que es lo que F02 exige distinguir. 
 Incluye contadores de ok, fallos, excepciones y límites excedidos. */