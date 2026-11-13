/* Puntos medidos (n, T(n), M(n)), puntos de evaluación reservados, curvas candidatas (n, n log n, n²…), 
familia elegida, error de ajuste (R²), variabilidad, un indicador de ajuste inconcluso y las sugerencias de 
la IA.*/

import type { MemoryUnit, ProvenanceType, TimeUnit } from './analysis';

export interface GrowthDataPoint {
  // SUPUESTO PROVISIONAL: puntos pendientes de B01/E04.
  n: number;
  timeValue: number | null;
  timeUnit: TimeUnit;
  memoryValue: number | null;
  memoryUnit: MemoryUnit;
  provenance: Extract<ProvenanceType, 'OBSERVADO' | 'ESTIMADO'>;
  isReservedEvaluationPoint: boolean; // SUPUESTO PROVISIONAL: criterio pendiente de E04
  timeStdDev?: number; // Misma unidad que timeValue
  memoryStdDev?: number; // Misma unidad que memoryValue
}

export interface CandidateCurve {
  // SUPUESTO PROVISIONAL: curvas candidatas pendientes de E04.
  id: string;
  familyLabel: string; // Ejemplo: "O(n log n)"
  formulaLatex: string;
  metric: 'TIEMPO' | 'MEMORIA';
  unit: TimeUnit | MemoryUnit;
  rSquared?: number;
  points: { n: number; value: number }[];
}

export interface AiSuggestion {
  // SUPUESTO PROVISIONAL: formato pendiente de M02/M03.
  id: string;
  title: string;
  explanation: string;
  suggestedCode?: string;
  targetLines?: { startLine: number; endLine: number };
  provenance: 'SUGERIDO_IA';
}

export interface GrowthReportResponse {
  // SUPUESTO PROVISIONAL: reporte consolidado pendiente de B01/E04/M03.
  jobId: string;
  inputFamily: string;
  selectedComplexityFamily: string | null;
  isFitInconclusive: boolean;
  inconclusiveReason?: string;
  fitErrorMetric?: { name: string; value: number }; // Ejemplo: R² o RMSE
  dataPoints: GrowthDataPoint[];
  candidateCurves: CandidateCurve[];
  aiStatus: 'DISPONIBLE' | 'NO_DISPONIBLE' | 'ERROR';
  aiSuggestions: AiSuggestion[];
}