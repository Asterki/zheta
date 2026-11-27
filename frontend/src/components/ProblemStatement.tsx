/* Enunciado, firma en caja de código, restricciones y ejemplos de entrada/salida.*/

import React from 'react';
import { Typography, Space } from 'antd';
import type { Problem } from '../types/problem';

const { Title, Paragraph, Text } = Typography;

export interface ProblemStatementProps {
  problem: Problem | null;
}

export const ProblemStatement: React.FC<ProblemStatementProps> = ({ problem }) => {
  if (!problem) {
    return (
      <div className="problem-statement problem-statement--empty">
        <Text type="secondary">Selecciona un problema para comenzar.</Text>
      </div>
    );
  }

  return (
    <section className="problem-statement" aria-label="Enunciado del problema">
      <Title level={4} className="problem-statement__title">
        {problem.title}
      </Title>

      <div className="problem-statement__section">
        <Text strong className="problem-statement__label">
          Enunciado
        </Text>
        <Paragraph className="problem-statement__text">
          {problem.statement}
        </Paragraph>
      </div>

      <div className="problem-statement__section">
        <Text strong className="problem-statement__label">
          Firma
        </Text>
        <div className="problem-statement__signature">
          <Text code>{problem.signature}</Text>
        </div>
      </div>

      <div className="problem-statement__section">
        <Text strong className="problem-statement__label">
          Restricciones
        </Text>
        <ul className="problem-statement__restrictions">
          {problem.restrictions.map((restriction, index) => (
            <li
              key={`${index}-${restriction}`}
              className="problem-statement__restriction-item"
            >
              <Text>{restriction}</Text>
            </li>
          ))}
        </ul>
      </div>

      <div className="problem-statement__section">
        <Text strong className="problem-statement__label">
          Ejemplos
        </Text>
        <Space orientation="vertical" size="middle" className="problem-statement__examples">
          {problem.examples.map((example, index) => (
            <div key={index} className="problem-statement__example">
              <div className="problem-statement__example-io">
                <div>
                  <Text strong>Entrada: </Text>
                  <pre className="problem-statement__code-block">
                    <code>{example.input}</code>
                  </pre>
                </div>
                <div>
                  <Text strong>Salida: </Text>
                  <pre className="problem-statement__code-block">
                    <code>{example.output}</code>
                  </pre>
                </div>
              </div>
              {example.explanation && (
                <Paragraph className="problem-statement__explanation">
                  <Text type="secondary">{example.explanation}</Text>
                </Paragraph>
              )}
            </div>
          ))}
        </Space>
      </div>
    </section>
  );
};

export default ProblemStatement;