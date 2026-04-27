package lk.ijse.backend.service.impl;

import lk.ijse.backend.dto.StudentDTO;
import lk.ijse.backend.dto.UserRegistrationDTO;
import lk.ijse.backend.entity.Student;
import lk.ijse.backend.repo.StudentRepo;
import lk.ijse.backend.repo.UserRepo;
import lk.ijse.backend.service.StudentService;
import lk.ijse.backend.util.VarList;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StudentServiceImpl implements StudentService {

    private final StudentRepo studentRepo;
    private final ModelMapper modelMapper;

    @Override
    public int UpdateStudent(StudentDTO studentDTO) {
        try{
            if(studentRepo.existsById(studentDTO.getId())){
                Student student = studentRepo.findById(studentDTO.getId()).get();

                student.setName(studentDTO.getName());
                student.setPhone(studentDTO.getPhone());
                student.setBirthday(studentDTO.getBirthday());
                student.setNic(studentDTO.getNic());

                studentRepo.save(student);
                return VarList.Updated;
            }else {
                return VarList.Not_Found;
            }
        }catch(Exception e){
            return VarList.Internal_Server_Error;
        }
    }

    @Override
    public int DeleteStudent(Long id) {
        try{
            if(studentRepo.existsById(id)){
                studentRepo.deleteById(id);
                return VarList.OK;
            }else {
                return VarList.Not_Found;
            }
        }catch(Exception e){
            return VarList.Internal_Server_Error;
        }

    }

    @Override
    public List<StudentDTO> GetAllStudents() {
        List<Student> students = studentRepo.findAll();
        return students.stream()
                .map(student -> modelMapper.map(student, StudentDTO.class))
                .toList();
    }


}
