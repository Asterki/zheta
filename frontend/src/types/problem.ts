/* ID, título, enunciado, firma (def solve(...)), restricciones y ejemplos de entrada/salida. Incluye 
también el tipo de la petición de envío (SubmitRequest) y su respuesta con el jobId (SubmitResponse).*/

// SUPUESTO PROVISIONAL: todos los campos de este archivo esperan el contrato de B01.
export interface ProblemExample {
  input: string;
  output: string;
  explanation?: string;
}

export interface Problem {
  id: string;
  title: string;
  statement: string;
  signature: string;
  starterCode: string;
  restrictions: string[];
  examples: ProblemExample[];
}

export interface SubmitRequest {
  problemId: string;
  code: string;
}

export interface ValidationErrorDetail {
  line?: number;
  code?: string;
  message: string;
}

// Unión discriminada: si success es true, jobId existe; si es false, hay errores.
export type SubmitResponse =
  | { success: true; jobId: string }
  | { success: false; validationErrors: ValidationErrorDetail[] };