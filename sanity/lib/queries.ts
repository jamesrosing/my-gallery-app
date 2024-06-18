import { client } from './client';

// Define queries
export const allProceduresQuery = `*[_type == "procedure"]{_id, title}`;
export const casesByProcedureQuery = `*[_type == "case" && procedure._ref == $procedureId]{_id, title, media}`;
export const caseByIdQuery = `*[_type == "case" && _id == $caseId]{_id, title, media}`;

// Fetch all procedures
export const fetchAllProcedures = async () => {
  const procedures = await client.fetch(allProceduresQuery);
  return procedures;
};

// Fetch cases by procedure
export const fetchCasesByProcedure = async (procedureId: string) => {
  const cases = await client.fetch(casesByProcedureQuery, { procedureId });
  return cases;
};

// Fetch case by ID
export const fetchCaseById = async (caseId: string) => {
  const caseItem = await client.fetch(caseByIdQuery, { caseId });
  return caseItem[0]; // Assuming the query returns an array, we return the first item
};
