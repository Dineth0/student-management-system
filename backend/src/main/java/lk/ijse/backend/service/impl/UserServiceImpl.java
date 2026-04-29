package lk.ijse.backend.service.impl;

import jakarta.transaction.Transactional;
import lk.ijse.backend.dto.ResponseDTO;
import lk.ijse.backend.dto.UserRegistrationDTO;
import lk.ijse.backend.entity.Role;
import lk.ijse.backend.entity.Student;
import lk.ijse.backend.entity.User;
import lk.ijse.backend.repo.StudentRepo;
import lk.ijse.backend.repo.UserRepo;
import lk.ijse.backend.service.StudentService;
import lk.ijse.backend.service.UserService;
import lk.ijse.backend.util.VarList;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
@Transactional
public class UserServiceImpl implements UserService {

    private final UserRepo userRepo;
    private final StudentRepo studentRepo;
    private final PasswordEncoder passwordEncoder;
    private final ModelMapper modelMapper;


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
            user.setRole(Role.STUDENT);
            userRegistrationDTO.setRole(Role.STUDENT);
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

    @Override
    public UserDetails loadUserByUsername(String email) {
        User user = userRepo.findByEmail(email);
        if(user == null){
            throw new UsernameNotFoundException("User not found with email: " + email);
        }
        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPassword(),
                getAuthority(user)
        );
    }

    @Override
    public UserRegistrationDTO loadUserDetailsByUsername(String name) {
        User user =  userRepo.findByEmail(name);
        if(user == null){
            throw new UsernameNotFoundException("user not found");
        }
        UserRegistrationDTO userRegistrationDTO = modelMapper.map(user, UserRegistrationDTO.class);
        userRegistrationDTO.setRole(user.getRole());
        return userRegistrationDTO;
    }

    private Set<SimpleGrantedAuthority> getAuthority(User user) {
        Set<SimpleGrantedAuthority> authorities = new HashSet<>();
        authorities.add(new SimpleGrantedAuthority(user.getRole().toString()));
        return authorities;
    }

}
