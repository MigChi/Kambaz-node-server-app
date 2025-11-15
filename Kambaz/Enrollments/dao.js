import { v4 as uuidv4 } from "uuid";

export default function EnrollmentsDao(db) {
  function findAllEnrollments() {
    return db.enrollments;
  }

  function enrollUserInCourse(userId, courseId) {
    const exists = db.enrollments.some(
      (e) => e.user === userId && e.course === courseId
    );

    if (!exists) {
      const newEnrollment = {
        _id: uuidv4(),
        user: userId,
        course: courseId,
      };
      db.enrollments.push(newEnrollment);
      return newEnrollment;
    }
    return null;
  }

  function unenrollUserFromCourse(userId, courseId) {
    const before = db.enrollments.length;
    db.enrollments = db.enrollments.filter(
      (e) => !(e.user === userId && e.course === courseId)
    );
    return db.enrollments.length < before; 
  }

  return {
    findAllEnrollments,
    enrollUserInCourse,
    unenrollUserFromCourse,
  };
}
