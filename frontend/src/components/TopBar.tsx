// Ruta: frontend/src/components/TopBar.tsx
/*logo ζ Zheta, Select de antd para cambiar de problema y el botón Enviar, con estados de carga y deshabilitado
mientras envía.*/

import React, { useState } from 'react';
import { Button, Select, message } from 'antd';
import type { Problem, ValidationErrorDetail } from '../types/problem';

export interface TopBarProps {
  problems: Problem[];
  selectedProblemId: string | null;
  onSelectProblem: (id: string) => void;
  code: string;
  problemId: string | null;
  onValidationError?: (errors: ValidationErrorDetail[]) => void;
  onSubmitted?: (jobId: string) => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  problems,
  selectedProblemId,
  onSelectProblem,
  code,
  problemId,
  onValidationError,
  onSubmitted,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastJobId, setLastJobId] = useState<string | null>(null);

  const hasValidSelection = Boolean(problemId) && code.trim().length > 0;

  const handleProblemChange = (value: string) => {
    setLastJobId(null);
    onValidationError?.([]);
    onSelectProblem(value);
  };

  const handleSubmit = async () => {
    if (!problemId || code.trim().length === 0) {
      message.warning('Selecciona un problema y escribe código antes de enviar.');
      return;
    }

    setIsSubmitting(true);
    setLastJobId(null);
    onValidationError?.([]);

    try {
      // Pendiente de conectar con la función de envío exportada por problemService.ts
      // y el manejo de errores exportado por apiClient.ts.
      message.info('Envío pendiente de conectar con problemService.');
      void onSubmitted;
      void setLastJobId;
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Ocurrió un error inesperado al enviar.';
      message.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <header className="top-bar">
      <div className="top-bar__brand">
        <span className="top-bar__logo">ζ Zheta</span>
      </div>

      <div className="top-bar__selector">
        <Select<string>
          showSearch
          placeholder="Selecciona un problema"
          value={selectedProblemId ?? undefined}
          onChange={handleProblemChange}
          optionFilterProp="label"
          options={problems.map((problem) => ({
            value: problem.id,
            label: problem.title,
          }))}
          className="top-bar__select"
        />
      </div>

      <div className="top-bar__actions">
        {lastJobId && (
          <span className="top-bar__job-id">Job: {lastJobId}</span>
        )}
        <Button
          type="primary"
          loading={isSubmitting}
          disabled={isSubmitting || !hasValidSelection}
          onClick={handleSubmit}
          className="top-bar__submit-btn"
        >
          Enviar
        </Button>
      </div>
    </header>
  );
};

export default TopBar;