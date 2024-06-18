import { client } from './client';

// Define queries
export const allProceduresQuery = `*[_type == "procedure"]{_id, title}`;
export const casesByProcedureQuery = `*[_type == "case" && procedure._ref == $procedureId]{_id, title, media{_type, asset->{url}, mimeType}}`;
export const caseByIdQuery = `*[_type == "case" && _id == $caseId]{_id, title, media{_type, asset->{url}, mimeType}}`; // Ensure media URLs are included

// Fetch all procedures
export const fetchAllProcedures = async () => {
  try {
    const procedures = await client.fetch(allProceduresQuery);
    console.log('Fetched procedures:', procedures); // Log fetched procedures
    return procedures;
  } catch (error) {
    console.error('Error fetching all procedures:', error);
    throw error;
  }
};

// Fetch cases by procedure
export const fetchCasesByProcedure = async (procedureId: string) => {
  try {
    const cases = await client.fetch(casesByProcedureQuery, { procedureId });
    console.log('Fetched cases for procedure:', procedureId, cases); // Log fetched cases
    return cases;
  } catch (error) {
    console.error('Error fetching cases by procedure:', error);
    throw error;
  }
};

// Fetch case by ID
export const fetchCaseById = async (caseId: string) => {
  try {
    const caseItem = await client.fetch(caseByIdQuery, { caseId });
    console.log('Fetched case by ID:', caseItem); // Log fetched case
    return caseItem[0]; // Assuming the query returns an array, we return the first item
  } catch (error) {
    console.error('Error fetching case by ID:', error);
    throw error;
  }
};
