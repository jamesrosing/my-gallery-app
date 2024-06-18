'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import GalleryItem from '../../../../components/GalleryItem';
import { fetchCaseById } from '../../../../sanity/lib/queries';

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

const CasePage: React.FC = () => {
  const searchParams = useSearchParams();
  const caseId = searchParams.get('caseId');
  const [caseData, setCaseData] = useState<Case | null>(null);

  useEffect(() => {
    console.log('Fetching case with ID:', caseId); // Log caseId
    if (caseId) {
      const fetchCase = async () => {
        try {
          const data = await fetchCaseById(caseId as string);
          console.log('Fetched case data:', data); // Log fetched data
          setCaseData(data);
        } catch (error) {
          console.error('Error fetching case data:', error);
        }
      };

      fetchCase();
    }
  }, [caseId]);

  return (
    <div className="flex">
      <div className="w-3/4 p-4">
        {caseData ? (
          <>
            <h2 className="text-white mb-4">{caseData.title}</h2>
            {caseData.media ? (
              caseData.media.map((media, index) => (
                <div key={index} className="mb-4">
                  {media._type === 'image' ? (
                    <img src={media.url} alt={caseData.title} className="object-cover w-full h-64" />
                  ) : (
                    <video controls className="w-full h-64">
                      <source src={media.url} type={media.mimeType} />
                    </video>
                  )}
                </div>
              ))
            ) : (
              <div className="text-white">No media available for this case.</div>
            )}
          </>
        ) : (
          <h2 className="text-white">Loading...</h2>
        )}
      </div>
    </div>
  );
};

export default CasePage;
