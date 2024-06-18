'use client';

import React, { useState, useEffect } from 'react';
import Gallery from '../../components/Gallery';
import { fetchAllProcedures, fetchCasesByProcedure, fetchCaseById } from '../../sanity/lib/queries';

interface Procedure {
  _id: string;
  title: string;
}

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

const GalleryPage: React.FC = () => {
  const [procedures, setProcedures] = useState<Procedure[]>([]);
  const [selectedProcedure, setSelectedProcedure] = useState<string | null>(null);
  const [cases, setCases] = useState<Case[]>([]);
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);

  useEffect(() => {
    const fetchProcedures = async () => {
      try {
        const data = await fetchAllProcedures();
        console.log('Fetched procedures:', data); // Log fetched procedures
        setProcedures(data);
      } catch (error) {
        console.error('Failed to fetch procedures:', error);
      }
    };

    fetchProcedures();
  }, []);

  const handleProcedureClick = async (procedureId: string) => {
    setSelectedProcedure(procedureId);
    try {
      const data = await fetchCasesByProcedure(procedureId);
      console.log('Fetched cases:', data); // Log fetched cases
      setCases(data);
      setSelectedCase(null); // Reset selected case when a new procedure is selected
    } catch (error) {
      console.error('Failed to fetch cases:', error);
    }
  };

  const handleCaseClick = async (caseId: string) => {
    try {
      const data = await fetchCaseById(caseId);
      console.log('Fetched case:', data); // Log fetched case
      setSelectedCase(data);
    } catch (error) {
      console.error('Failed to fetch case:', error);
    }
  };

  console.log('GalleryPage State:', { procedures, selectedProcedure, cases, selectedCase });

  return (
    <Gallery
      procedures={procedures}
      selectedProcedure={selectedProcedure}
      onProcedureClick={handleProcedureClick}
      cases={cases}
      selectedCase={selectedCase}
      onCaseClick={handleCaseClick}
    />
  );
};

export default GalleryPage;
