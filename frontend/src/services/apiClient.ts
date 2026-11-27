/* Base de las llamadas HTTP (URL base, manejo de errores de red y timeouts). Convierte los fallos en errores
 con un formato único.*/

//Base mínima
export type ApiErrorKind = 'RED' | 'TIMEOUT' | 'HTTP' | 'RESPUESTA_INVALIDA';

export class ApiError extends Error {
  public readonly kind: ApiErrorKind;
  public readonly status?: number;

  constructor(kind: ApiErrorKind, message: string, status?: number) {
    super(message);
    this.name = 'ApiError';
    this.kind = kind;
    this.status = status;
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}