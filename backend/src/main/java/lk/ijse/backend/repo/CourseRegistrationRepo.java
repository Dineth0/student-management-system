package lk.ijse.backend.repo;

import lk.ijse.backend.entity.CourseRegistration;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CourseRegistrationRepo extends JpaRepository<CourseRegistration, Long> {
    boolean existsById(Long id);

    List<CourseRegistration> findByStudentId(Long studentId);
}
