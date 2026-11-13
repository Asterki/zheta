/* Estado general del trabajo (en cola, ejecutando, terminado, fallido, timeout y uno desconocido para estados
 que el frontend no reconoce). Guarda el estado de cada etapa por separado (pruebas, profiling, modelado), 
 para que un fallo parcial no oculte resultados válidos. Separa también el resultado de las pruebas 
 (¿es correcta la solución?) del estado del análisis (¿terminó?), que es lo que F02 exige distinguir. 
 Incluye contadores de ok, fallos, excepciones y límites excedidos. */

 // SUPUESTO PROVISIONAL: los estados oficiales los define B01.
export type JobStatus =
  | 'EN_COLA'
  | 'EN_EJECUCION'
  | 'COMPLETADO'
  | 'ERROR'
  | 'INCOMPLETO'
  | 'TIMEOUT'
  | 'DESCONOCIDO'; // Estado no reconocido: se muestra "Estado no compatible"

// SUPUESTO PROVISIONAL: estados por etapa pendientes de B01.
export type StageStatus =
  | 'PENDIENTE'
  | 'EN_CURSO'
  | 'COMPLETADA'
  | 'FALLIDA'
  | 'OMITIDA'
  | 'DESCONOCIDO';

// SUPUESTO PROVISIONAL: veredicto de la solución, independiente del estado del análisis.
export type TestVerdict = 'APROBADA' | 'INCORRECTA' | 'INDETERMINADO' | 'DESCONOCIDO';

export type StageName = 'PRUEBAS' | 'PROFILING' | 'MODELADO';

export interface StageState {
  // SUPUESTO PROVISIONAL: estructura de etapas pendiente de B01.
  name: StageName;
  status: StageStatus;
  rawStatus?: string; // Valor crudo si status === 'DESCONOCIDO'
  errorMessage?: string;
}

export interface TestCaseResult {
  // SUPUESTO PROVISIONAL: detalle de casos pendiente de B01.
  id: string;
  status: 'OK' | 'FALLO' | 'TIMEOUT' | 'EXCEPCION' | 'DESCONOCIDO';
  rawStatus?: string;
  inputPreview?: string;
  expectedOutput?: string;
  actualOutput?: string;
  errorMessage?: string;
  executionTimeMs?: number;
}

export interface TestSummary {
  // SUPUESTO PROVISIONAL: contadores pendientes de B01.
  verdict: TestVerdict;
  rawVerdict?: string; // Valor crudo si verdict === 'DESCONOCIDO'
  ok: number;
  failed: number;
  timeout: number;
  exceptions: number;
  cases?: TestCaseResult[];
}

export interface JobStatusResponse {
  // SUPUESTO PROVISIONAL: contrato de consulta pendiente de B01.
  jobId: string;
  problemId: string;
  status: JobStatus;
  rawStatus?: string; // Valor original del backend si status === 'DESCONOCIDO'
  stages: StageState[];
  // Opcional: en cola, o si falló la etapa de pruebas, puede no haber resultados.
  tests?: TestSummary;
}