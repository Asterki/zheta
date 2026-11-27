import React, { useEffect, useMemo, useState } from 'react';
import { Alert, Spin } from 'antd';
import { TopBar } from './components/TopBar';
import { ProblemStatement } from './components/ProblemStatement';
import { CodeEditorPanel } from './components/CodeEditorPanel';
import useDraft from './hooks/useDraft';
import { listProblems } from './services/problemService';
import type { Problem, ValidationErrorDetail } from './types/problem';
import './App.css'

export const App: React.FC = () => {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [isLoadingProblems, setIsLoadingProblems] = useState<boolean>(true);
  const [problemsError, setProblemsError] = useState<string | null>(null);

  const [selectedProblemId, setSelectedProblemId] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<ValidationErrorDetail[]>([]);

  // Huecos reservados para futuras entregas (F02 / F03)
  const [jobId, setJobId] = useState<string | null>(null);
  const [selectedBlockId] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadProblems = async () => {
      setIsLoadingProblems(true);
      setProblemsError(null);

      try {
        const data = await listProblems();
        if (!isMounted) return;

        setProblems(data);
        if (data.length > 0) {
          setSelectedProblemId((currentId) => currentId ?? data[0].id);
        }
      } catch (error: unknown) {
        if (!isMounted) return;
        const messageText =
          error instanceof Error
            ? error.message
            : 'No se pudieron cargar los problemas.';
        setProblemsError(messageText);
      } finally {
        if (isMounted) {
          setIsLoadingProblems(false);
        }
      }
    };

    void loadProblems();

    return () => {
      isMounted = false;
    };
  }, []);

  const selectedProblem = useMemo<Problem | null>(() => {
    if (!selectedProblemId) return null;
    return problems.find((item) => item.id === selectedProblemId) ?? null;
  }, [problems, selectedProblemId]);

  const { code, updateCode } = useDraft(
    selectedProblemId ?? '',
    selectedProblem?.starterCode ?? ''
  );

  const handleSelectProblem = (id: string) => {
    setSelectedProblemId(id);
    setValidationErrors([]);
  };

  const handleSubmitted = (submittedJobId: string) => {
    setJobId(submittedJobId);
  };

  return (
    <div className="zheta-app" data-job-id={jobId ?? ''} data-block-id={selectedBlockId ?? ''}>
      <TopBar
        problems={problems}
        selectedProblemId={selectedProblemId}
        onSelectProblem={handleSelectProblem}
        code={code}
        problemId={selectedProblemId}
        onValidationError={setValidationErrors}
        onSubmitted={handleSubmitted}
      />

      {isLoadingProblems && (
        <div className="zheta-app__loading">
          <Spin description="Cargando problemas..." />
        </div>
      )}

      {!isLoadingProblems && problemsError && (
        <div className="zheta-app__error">
          <Alert
            type="error"
            showIcon
            message="Error al cargar problemas"
            description={problemsError}
          />
        </div>
      )}

      {!isLoadingProblems && !problemsError && (
        <main className="zheta-app__workspace">
          <div className="zheta-app__three-columns">
            <aside className="zheta-app__col zheta-app__col--left">
              <ProblemStatement problem={selectedProblem} />
            </aside>

            <section className="zheta-app__col zheta-app__col--center">
              <CodeEditorPanel
                problem={selectedProblem}
                code={code}
                onChangeCode={updateCode}
                validationErrors={validationErrors}
              />
            </section>

            <aside className="zheta-app__col zheta-app__col--right">
              {/* Marcador de posición para panel lateral derecho (F02) */}
            </aside>
          </div>

          <section className="zheta-app__bottom-panel">
            {/* Marcador de posición para panel inferior (F03 / F04) */}
          </section>
        </main>
      )}
    </div>
  );
};

export default App;