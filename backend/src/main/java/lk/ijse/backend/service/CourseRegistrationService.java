package lk.ijse.backend.service;

import lk.ijse.backend.dto.CourseDTO;
import lk.ijse.backend.dto.CourseRegistrationDTO;
import lk.ijse.backend.entity.CourseRegistration;

import java.util.List;

public interface CourseRegistrationService {

    public int StudentCourseRegistration(CourseRegistrationDTO courseRegistrationDTO);
    List<CourseRegistrationDTO> getAllRegistrations();
    List<CourseRegistrationDTO> findByStudentId(Long studentId);

    long getRegisterCount();
}
