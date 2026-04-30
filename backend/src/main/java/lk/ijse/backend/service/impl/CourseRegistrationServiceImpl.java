package lk.ijse.backend.service.impl;

import lk.ijse.backend.dto.CourseDTO;
import lk.ijse.backend.dto.CourseRegistrationDTO;
import lk.ijse.backend.entity.Course;
import lk.ijse.backend.entity.CourseRegistration;
import lk.ijse.backend.entity.Student;
import lk.ijse.backend.repo.CourseRegistrationRepo;
import lk.ijse.backend.repo.CourseRepo;
import lk.ijse.backend.repo.StudentRepo;
import lk.ijse.backend.service.CourseRegistrationService;
import lk.ijse.backend.util.VarList;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class CourseRegistrationServiceImpl implements CourseRegistrationService {

    private  final CourseRegistrationRepo courseRegistrationRepo;
    private  final StudentRepo studentRepo;
    private  final CourseRepo courseRepo;
    private final ModelMapper modelMapper;

    @Override
    public int StudentCourseRegistration(CourseRegistrationDTO courseRegistrationDTO) {
        try {
            if (courseRegistrationDTO.getId() != null && courseRegistrationRepo.existsById(courseRegistrationDTO.getId())) {
                return VarList.Conflict;
            }
            boolean studentExists = studentRepo.existsById(courseRegistrationDTO.getStudentId());
            boolean courseExists = courseRepo.existsById(courseRegistrationDTO.getCourseId());

            if (!studentExists || !courseExists) {
                return VarList.Not_Found;
            }
            Student student = studentRepo.findById(courseRegistrationDTO.getStudentId()).get();
            Course course = courseRepo.findById(courseRegistrationDTO.getCourseId()).get();

            CourseRegistration registration = modelMapper.map(courseRegistrationDTO, CourseRegistration.class);
            registration.setStudent(student);
            registration.setCourse(course);
            registration.setRegistrationDate(new java.sql.Date(System.currentTimeMillis()));
            registration.setPaymentStatus("PENDING");

            courseRegistrationRepo.save(registration);
            return VarList.Created;

        } catch (Exception e) {
            return VarList.Internal_Server_Error;
        }
    }

    @Override
    public List<CourseRegistrationDTO> getAllRegistrations() {
        List<CourseRegistration> courseRegistrations = courseRegistrationRepo.findAll();
        return courseRegistrations.stream().map(registration -> {
            CourseRegistrationDTO dto = modelMapper.map(registration, CourseRegistrationDTO.class);

            if (registration.getStudent() != null) {
                dto.setStudentId(registration.getStudent().getId());
                dto.setStudentName(registration.getStudent().getName());
            }

            if (registration.getCourse() != null) {
                dto.setCourseId(registration.getCourse().getId());
                dto.setCourseName(registration.getCourse().getName());
            }

            return dto;
        }).toList();
    }

    @Override
    public List<CourseRegistrationDTO> findByStudentId(Long studentId) {
        List<CourseRegistration> list = courseRegistrationRepo.findByStudentId(studentId);
        return list.stream()
                .map(reg -> modelMapper.map(reg, CourseRegistrationDTO.class))
                .toList();
    }

    @Override
    public long getRegisterCount() {
        return courseRegistrationRepo.count();
    }


}
