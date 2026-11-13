/*datos simulados para cada escenario (éxito, solución incorrecta, análisis incompleto, timeout, estado 
desconocido). Con la variable VITE_USE_MOCKS, los servicios devuelven estos datos o llaman al backend real 
sin que los componentes se enteren.*/

import type { Problem, SubmitResponse } from '../types/problem';

// SUPUESTO PROVISIONAL: datos simulados para F01 mientras se implementa B01.
export const MOCK_PROBLEMS: Problem[] = [
  {
    id: 'prob-suma-pares',
    title: 'Suma de pares',
    statement: 'Suma los números pares de una lista.',
    signature: 'def solve(arr: list[int]) -> int',
    starterCode: `def solve(arr: list[int]) -> int:
    total = 0
    for x in arr:
        if x % 2 == 0:
            total += x
    return total
`,
    restrictions: ['1 ≤ n ≤ 10⁵', '|aᵢ| ≤ 10⁹'],
    examples: [
      {
        input: '[1, 2, 3, 4]',
        output: '6',
        explanation: 'Los números pares son 2 y 4, cuya suma es 6.',
      },
    ],
  },
  {
    id: 'prob-busqueda-binaria',
    title: 'Búsqueda en arreglo ordenado',
    statement:
      'Dado un arreglo ordenado de enteros ascendentemente y un objetivo, devuelve el índice del objetivo o -1 si no existe.',
    signature: 'def solve(arr: list[int], target: int) -> int',
    starterCode: `def solve(arr: list[int], target: int) -> int:
    izquierda = 0
    derecha = len(arr) - 1
    while izquierda <= derecha:
        medio = (izquierda + derecha) // 2
        if arr[medio] == target:
            return medio
        elif arr[medio] < target:
            izquierda = medio + 1
        else:
            derecha = medio - 1
    return -1
`,
    restrictions: ['1 ≤ n ≤ 10⁶', '-10⁹ ≤ arr[i], target ≤ 10⁹'],
    examples: [
      { input: 'arr = [2, 5, 8, 12, 16], target = 12', output: '3' },
      { input: 'arr = [2, 5, 8, 12, 16], target = 7', output: '-1' },
    ],
  },
  {
    id: 'prob-pares-iguales',
    title: 'Conteo de pares iguales',
    statement:
      'Cuenta cuántos pares de índices (i, j) con i < j cumplen que arr[i] == arr[j].',
    signature: 'def solve(arr: list[int]) -> int',
    starterCode: `def solve(arr: list[int]) -> int:
    conteo = 0
    n = len(arr)
    for i in range(n):
        for j in range(i + 1, n):
            if arr[i] == arr[j]:
                conteo += 1
    return conteo
`,
    restrictions: ['1 ≤ n ≤ 5 × 10³', '0 ≤ arr[i] ≤ 10⁴'],
    examples: [{ input: '[1, 2, 1, 1]', output: '3' }],
  },
];

// SUPUESTO PROVISIONAL: respuesta exitosa simulada.
export const MOCK_SUBMIT_SUCCESS: SubmitResponse = {
  success: true,
  jobId: 'job_8f3a21',
};

// SUPUESTO PROVISIONAL: error de validación simulado. La interfaz pone el prefijo.
export const MOCK_SUBMIT_VALIDATION_ERROR: SubmitResponse = {
  success: false,
  validationErrors: [
    {
      line: 1,
      code: 'SIGNATURE_MISMATCH',
      message: 'La firma no coincide con la esperada',
    },
  ],
};