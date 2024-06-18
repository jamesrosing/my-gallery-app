'use client';

import { useSearchParams } from 'next/navigation'; // Use useSearchParams
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchCasesByProcedure } from '../../../sanity/lib/queries';

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

  useEffect(() => {
    if (procedureId) {
      const fetchCases = async () => {
        const data = await fetchCasesByProcedure(procedureId);
        setCases(data);
      };

      fetchCases();
    }
  }, [procedureId]);

  return (
    <div className="flex">
      {/* Left Column: Procedure and Cases */}
      <div className="w-1/4 p-4">
        <h2 className="text-white mb-4">Cases</h2>
        <ul>
          {cases.map((caseItem) => (
            <li key={caseItem._id}>
              <Link href={`/gallery/procedure/case?caseId=${caseItem._id}`} className="text-blue-500 hover:underline">
                {caseItem.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Middle Column: Placeholder for Case Selection */}
      <div className="w-1/2 p-4">
        <h2 className="text-white">Select a case to view details</h2>
      </div>

      {/* Right Column: Cases List */}
      <div className="w-1/4 p-4">
        <h2 className="text-white mb-4">On this page</h2>
        <ul>
          {cases.map((caseItem) => (
            <li key={caseItem._id}>
              <Link href={`/gallery/procedure/case?caseId=${caseItem._id}`} className="text-blue-500 hover:underline">
                {caseItem.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProcedurePage;
