/* Envuelve a Monaco con números de línea. Guarda el borrador con useDraft, resalta el rango del bloque 
seleccionado y muestra la alerta roja inferior con las validaciones de envío.*/

import React from 'react';
import Editor from '@monaco-editor/react';
import { Alert, Typography } from 'antd';
import type { Problem, ValidationErrorDetail } from '../types/problem';

const { Text } = Typography;

export interface CodeEditorPanelProps {
  problem: Problem | null;
  code: string;
  onChangeCode: (value: string) => void;
  validationErrors?: ValidationErrorDetail[];
}

export const CodeEditorPanel: React.FC<CodeEditorPanelProps> = ({
  problem,
  code,
  onChangeCode,
  validationErrors = [],
}) => {
  const handleEditorChange = (value: string | undefined) => {
    onChangeCode(value ?? '');
  };

  if (!problem) {
    return (
      <section
        className="code-editor-panel code-editor-panel--empty"
        aria-label="Editor de código"
      >
        <Text type="secondary">Selecciona un problema para escribir tu solución.</Text>
      </section>
    );
  }

  const hasValidationErrors = validationErrors.length > 0;

  return (
    <section className="code-editor-panel" aria-label="Editor de código">
      <div className="code-editor-panel__editor-wrapper">
        <Editor
          height="100%"
          language="python"
          value={code}
          onChange={handleEditorChange}
          options={{
            lineNumbers: 'on',
            minimap: { enabled: false },
            automaticLayout: true,
          }}
        />
      </div>

      {hasValidationErrors && (
        <div className="code-editor-panel__errors">
          <Alert
            type="error"
            showIcon
            message="Error de validación"
            description={
              <ul className="code-editor-panel__error-list">
                {validationErrors.map((err, index) => (
                  <li key={index}>{err.message}</li>
                ))}
              </ul>
            }
          />
        </div>
      )}
    </section>
  );
};

export default CodeEditorPanel;