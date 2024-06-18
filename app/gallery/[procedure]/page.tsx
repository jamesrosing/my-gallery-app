'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import GalleryItem from '../../../components/GalleryItem';
import { fetchCasesByProcedure, fetchCaseById } from '../../../sanity/lib/queries';

interface Media {
  _type: 'image' | 'video';
  url: string;
  mimeType?: string; // Optional, only for videos
}

interface Case {
  _id: string;
  title: string;
  media: Media[];
}

const ProcedurePage = () => {
  const searchParams = useSearchParams();
  const procedureId = searchParams.get('procedureId');
  const [cases, setCases] = useState<Case[]>([]);
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);

  useEffect(() => {
    if (procedureId) {
      const fetchCases = async () => {
        try {
          const data = await fetchCasesByProcedure(procedureId);
          console.log('Fetched cases:', data); // Log fetched cases
          setCases(data);
        } catch (error) {
          console.error('Failed to fetch cases:', error);
        }
      };

      fetchCases();
    }
  }, [procedureId]);

  const handleCaseClick = async (caseId: string) => {
    try {
      const caseData = await fetchCaseById(caseId);
      console.log('Fetched case:', caseData); // Log fetched case
      setSelectedCase(caseData);
    } catch (error) {
      console.error('Failed to fetch case:', error);
    }
  };

  return (
    <div className="flex">
      {/* Left Column: Procedure and Cases */}
      <div className="w-1/4 p-4">
        <h2 className="text-white mb-4">Cases</h2>
        <ul>
          {cases.map((caseItem) => (
            <li key={caseItem._id}>
              <button onClick={() => handleCaseClick(caseItem._id)} className="text-blue-500 hover:underline">
                {caseItem.title}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Middle Column: Selected Case Details */}
      <div className="w-1/2 p-4">
        {selectedCase ? (
          <GalleryItem caseData={selectedCase} />
        ) : (
          <h2 className="text-white">Select a case to view details</h2>
        )}
      </div>

      {/* Right Column: Cases List */}
      <div className="w-1/4 p-4">
        <h2 className="text-white mb-4">On this page</h2>
        <ul>
          {cases.map((caseItem) => (
            <li key={caseItem._id}>
              <button onClick={() => handleCaseClick(caseItem._id)} className="text-blue-500 hover:underline">
                {caseItem.title}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProcedurePage;
