'use client';


import { FC } from 'react';

interface Media {
  _type: 'image' | 'video';
  url: string;
  mimeType?: string; // Optional, only for videos
}

interface GalleryItemProps {
  item: {
    title: string;
    media: Media[];
  };
}

const GalleryItem: FC<GalleryItemProps> = ({ item }) => {
  return (
    <div className="relative">
      <h3>{item.title}</h3>
      {item.media.map((media, index) => (
        <div key={index}>
          {media._type === 'image' ? (
            <img
              src={media.url}
              alt={item.title}
              className="object-cover w-full h-64"
              loading="lazy"
            />
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
