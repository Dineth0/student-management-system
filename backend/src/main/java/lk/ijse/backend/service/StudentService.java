package lk.ijse.backend.service;

import lk.ijse.backend.dto.StudentDTO;
import lk.ijse.backend.dto.UserRegistrationDTO;
import lk.ijse.backend.entity.Student;

import java.util.List;

public interface StudentService {
    public int UpdateStudent(StudentDTO studentDTO);
    public int DeleteStudent(Long id);
    public List<Student> GetAllStudents();
}
