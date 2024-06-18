'use client';


import { FC, useEffect, useState } from 'react';
import GalleryItem from './GalleryItem';
import { fetchGalleryItems } from '../sanity/lib/queries';

interface Media {
  _type: 'image' | 'video';
  url: string;
  mimeType?: string; // Optional, only for videos
}

interface GalleryItem {
  _id: string;
  title: string;
  media: Media[];
}

const Gallery: FC = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await fetchGalleryItems();
        console.log('Gallery Items:', data); // Debugging line
        setItems(data);
      } catch (error) {
        console.error('Error fetching gallery items:', error);
        setError('Failed to load gallery items.');
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((item) => (
        <GalleryItem key={item._id} item={item} />
      ))}
    </div>
  );
};

export default Gallery;

