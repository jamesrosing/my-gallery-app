'use client';

import { useEffect, useState } from 'react';
import { fetchAllProcedures, fetchCasesByProcedure, fetchCaseById } from '../../sanity/lib/queries';

interface Procedure {
  _id: string;
  title: string;
}

interface Case {
  _id: string;
  title: string;
  media: { _type: string; url: string; mimeType?: string }[];
}

const GalleryPage = () => {
  const [procedures, setProcedures] = useState<Procedure[]>([]);
  const [selectedProcedure, setSelectedProcedure] = useState<string | null>(null);
  const [cases, setCases] = useState<Case[]>([]);
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);

  useEffect(() => {
    const fetchProcedures = async () => {
      const data = await fetchAllProcedures();
      setProcedures(data);
    };

    fetchProcedures();
  }, []);

  const handleProcedureClick = async (procedureId: string) => {
    setSelectedProcedure(procedureId);
    const data = await fetchCasesByProcedure(procedureId);
    setCases(data);
    setSelectedCase(null); // Reset the selected case when a new procedure is selected
  };

  const handleCaseClick = async (caseId: string) => {
    const data = await fetchCaseById(caseId);
    setSelectedCase(data);
  };

  return (
    <div className="flex">
      {/* Left Column: Procedures and Cases */}
      <div className="w-1/4 p-4">
        <h2 className="text-white mb-4">Procedures</h2>
        <ul>
          {procedures.map((procedure) => (
            <li key={procedure._id}>
              <button onClick={() => handleProcedureClick(procedure._id)} className="text-blue-500 hover:underline">
                {procedure.title}
              </button>
              {selectedProcedure === procedure._id && (
                <ul className="ml-4 mt-2">
                  {cases.map((caseItem) => (
                    <li key={caseItem._id}>
                      <button onClick={() => handleCaseClick(caseItem._id)} className="text-blue-500 hover:underline">
                        {caseItem.title}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Middle Column: Case Details */}
      <div className="w-1/2 p-4">
        {selectedCase ? (
          <>
            <h2 className="text-white mb-4">{selectedCase.title}</h2>
            {selectedCase.media.map((media, index) => (
              <div key={index} className="mb-4">
                {media._type === 'image' ? (
                  <img src={media.url} alt={selectedCase.title} className="object-cover w-full h-64" />
                ) : (
                  <video controls className="w-full h-64">
                    <source src={media.url} type={media.mimeType} />
                  </video>
                )}
              </div>
            ))}
          </>
        ) : (
          <h2 className="text-white">Select a case to view details</h2>
        )}
      </div>

      {/* Right Column: Placeholder for "On this page" */}
      <div className="w-1/4 p-4">
        <h2 className="text-white">On this page</h2>
        {selectedProcedure && (
          <ul>
            {cases.map((caseItem) => (
              <li key={caseItem._id}>
                <button onClick={() => handleCaseClick(caseItem._id)} className="text-blue-500 hover:underline">
                  {caseItem.title}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default GalleryPage;

