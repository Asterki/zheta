/* Lista los problemas y envía la solución (submitSolution). Devuelve el jobId o los errores de validación.*/

// Base mínima
import type { Problem, SubmitRequest, SubmitResponse } from '../types/problem';

const FALLBACK_PROBLEMS: Problem[] = [
  {
    id: 'suma-de-pares',
    title: 'Suma de pares',
    statement: 'Suma los números pares de una lista.',
    signature: 'def solve(arr: list[int]) -> int',
    restrictions: ['1 <= n <= 10^5', '|a_i| <= 10^9'],
    examples: [
      {
        input: '[1, 2, 3, 4]',
        output: '6',
        explanation: 'Los números pares son 2 y 4; su suma es 6.',
      },
    ],
    starterCode:
      'def solve(arr: list[int]) -> int:\n    total = 0\n    for x in arr:\n        if x % 2 == 0:\n            total += x\n    return total\n',
  },
];

export async function listProblems(): Promise<Problem[]> {
  return Promise.resolve(FALLBACK_PROBLEMS);
}

export async function submitSolution(
  request: SubmitRequest
): Promise<SubmitResponse> {
  void request;
  const generatedJobId = `job_${Math.random().toString(36).slice(2, 8)}`;
  return Promise.resolve({
    success: true,
    jobId: generatedJobId,
  });
}