/* Bloques de código con su rango de líneas, conteo de iteraciones, tiempo inclusivo y exclusivo por separado, 
memoria y unidades. Guarda la derivación matemática (expresión en LaTeX, forma simplificada, supuestos, 
limitaciones) y la procedencia de cada dato: DERIVADO, OBSERVADO, ESTIMADO o SUGERIDO_IA.*/

export type ProvenanceType = 'DERIVADO' | 'OBSERVADO' | 'ESTIMADO' | 'SUGERIDO_IA';

export type TimeUnit = 'ns' | 'us' | 'ms' | 's';
export type MemoryUnit = 'B' | 'KiB' | 'MiB';

export interface MetricWithUnit {
  // SUPUESTO PROVISIONAL: formato de métricas pendiente de B01/E02.
  value: number | null;
  unit: TimeUnit | MemoryUnit | 'ops';
  provenance: ProvenanceType;
}

export interface BlockDerivation {
  // SUPUESTO PROVISIONAL: formato de derivación pendiente de E03.
  expressionLatex: string;
  simplifiedLatex: string;
  asymptoticClass: string; // Ejemplo: "Θ(n)"
  assumptions: string[];
  limitations: string[];
  provenance: 'DERIVADO';
}

export interface CodeBlockAnalysis {
  // SUPUESTO PROVISIONAL: estructura de bloques pendiente de B01/E02/E03.
  blockId: string;
  label: string; // Ejemplo: "for (líneas 3 a 5)"
  startLine: number;
  endLine: number;
  iterations?: MetricWithUnit;
  inclusiveTime?: MetricWithUnit; // Nunca se suma con el exclusivo
  exclusiveTime?: MetricWithUnit; // Nunca se suma con el inclusivo
  memoryPeak?: MetricWithUnit;
  isCompatible: boolean;
  incompatibilityReason?: string;
  derivation?: BlockDerivation;
}

export interface BlockAnalysisResponse {
  // SUPUESTO PROVISIONAL: respuesta pendiente de B01.
  jobId: string;
  blocks: CodeBlockAnalysis[];
}