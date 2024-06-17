export const allProceduresQuery = `*[_type == "procedure"]`
export const casesByProcedureQuery = `*[_type == "case" && procedure._ref == $procedureId]`
