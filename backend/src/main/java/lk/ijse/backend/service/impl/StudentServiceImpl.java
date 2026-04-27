package lk.ijse.backend.service.impl;

import lk.ijse.backend.dto.UserRegistrationDTO;
import lk.ijse.backend.entity.Student;
import lk.ijse.backend.repo.StudentRepo;
import lk.ijse.backend.service.StudentService;
import lk.ijse.backend.util.VarList;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StudentServiceImpl implements StudentService {

    private final StudentRepo studentRepo;

    @Override
    public int UpdateStudent(UserRegistrationDTO userRegistrationDTO) {
        try{
            if(studentRepo.existsById(userRegistrationDTO.getId())){
                Student student = studentRepo.findById(userRegistrationDTO.getId()).get();

                student.setName(userRegistrationDTO.getName());
                student.setPhone(userRegistrationDTO.getPhone());
                student.setBirthday(userRegistrationDTO.getBirthday());
                student.setNic(userRegistrationDTO.getNic());

                studentRepo.save(student);
                return VarList.Updated;
            }else {
                return VarList.Not_Found;
            }
        }catch(Exception e){
            return VarList.Internal_Server_Error;
        }
    }


}
