package lk.ijse.backend.service.impl;

import jakarta.transaction.Transactional;
import lk.ijse.backend.dto.ResponseDTO;
import lk.ijse.backend.dto.UserRegistrationDTO;
import lk.ijse.backend.entity.Student;
import lk.ijse.backend.entity.User;
import lk.ijse.backend.repo.StudentRepo;
import lk.ijse.backend.repo.UserRepo;
import lk.ijse.backend.service.StudentService;
import lk.ijse.backend.service.UserService;
import lk.ijse.backend.util.VarList;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class UserServiceImpl implements UserService {

    private final UserRepo userRepo;
    private final StudentRepo studentRepo;
    private final PasswordEncoder passwordEncoder;


    @Override
    public int AddUser(UserRegistrationDTO userRegistrationDTO) {
        if(userRepo.existsByEmail(userRegistrationDTO.getEmail())){
            return VarList.Conflict;
        }
        try{
            User user = new User();
            user.setName(userRegistrationDTO.getName());
            user.setEmail(userRegistrationDTO.getEmail());

            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            user.setPassword(passwordEncoder.encode(userRegistrationDTO.getPassword()));

            userRepo.save(user);

            Student student = new Student();
            student.setName(userRegistrationDTO.getName());
            student.setEmail(userRegistrationDTO.getEmail());
            student.setPhone(userRegistrationDTO.getPhone());
            student.setBirthday(userRegistrationDTO.getBirthday());
            student.setNic(userRegistrationDTO.getNic());

            studentRepo.save(student);

            return VarList.Created;
        }catch(Exception e){
            return VarList.Internal_Server_Error;
        }
    }

}
