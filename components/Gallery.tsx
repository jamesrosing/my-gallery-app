import React from 'react';
import GalleryItem from './GalleryItem';

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

interface Procedure {
  _id: string;
  title: string;
}

interface GalleryProps {
  procedures: Procedure[];
  selectedProcedure: string | null;
  onProcedureClick: (procedureId: string) => void;
  cases: Case[];
  selectedCase: Case | null;
  onCaseClick: (caseId: string) => void;
}

const Gallery: React.FC<GalleryProps> = ({ procedures, selectedProcedure, onProcedureClick, cases, selectedCase, onCaseClick }) => {
  console.log('Gallery Props:', { procedures, selectedProcedure, cases, selectedCase });

  return (
    <div className="flex">
      {/* Left Column: Procedures and Cases */}
      <div className="w-1/4 p-4">
        <h2 className="text-white mb-4">Procedures</h2>
        <ul>
          {procedures.map((procedure) => (
            <li key={procedure._id}>
              <button onClick={() => onProcedureClick(procedure._id)} className="text-blue-500 hover:underline">
                {procedure.title}
              </button>
              {selectedProcedure === procedure._id && (
                <ul className="ml-4 mt-2">
                  {cases.map((caseItem) => (
                    <li key={caseItem._id}>
                      <button onClick={() => onCaseClick(caseItem._id)} className="text-blue-500 hover:underline">
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
          <GalleryItem caseData={selectedCase} />
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
                <button onClick={() => onCaseClick(caseItem._id)} className="text-blue-500 hover:underline">
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

export default Gallery;
