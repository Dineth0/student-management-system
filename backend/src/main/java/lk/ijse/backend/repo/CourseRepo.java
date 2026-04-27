package lk.ijse.backend.repo;

import lk.ijse.backend.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseRepo extends JpaRepository<Course, Long> {
}
