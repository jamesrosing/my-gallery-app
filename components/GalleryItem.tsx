import React from 'react';

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

interface GalleryItemProps {
  caseData: Case | null; // Allow null for initial state
}

const GalleryItem: React.FC<GalleryItemProps> = ({ caseData }) => {
  if (!caseData || !caseData.media) {
    return <div className="text-white">No media available for this case.</div>;
  }

  return (
    <div>
      <h2 className="text-white mb-4">{caseData.title}</h2>
      {caseData.media.map((media, index) => (
        <div key={index} className="mb-4">
          {media._type === 'image' ? (
            <img src={media.url} alt={caseData.title} className="object-cover w-full h-64" />
          ) : (
            <video controls className="w-full h-64">
              <source src={media.url} type={media.mimeType} />
            </video>
          )}
        </div>
      ))}
    </div>
  );
};

export default GalleryItem;
