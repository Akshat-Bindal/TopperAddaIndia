export const withSchool = (schoolId, extra = {}) => {
  return {
    ...extra,
    school_id: schoolId
  };
};