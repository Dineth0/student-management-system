package lk.ijse.backend.controller;

import lk.ijse.backend.dto.ResponseDTO;
import lk.ijse.backend.dto.StudentDTO;
import lk.ijse.backend.dto.UserRegistrationDTO;
import lk.ijse.backend.entity.Student;
import lk.ijse.backend.service.StudentService;
import lk.ijse.backend.util.VarList;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/student")
@CrossOrigin
@RequiredArgsConstructor
public class StudentController {

    private final StudentService studentService;

    @PutMapping("/updateStudent")
    public ResponseEntity<ResponseDTO> updateStudent(@RequestBody StudentDTO studentDTO) {
        try{
            int response = studentService.UpdateStudent(studentDTO);

            switch (response) {
                case VarList.Updated -> {
                    return ResponseEntity.status(HttpStatus.CREATED)
                            .body(new ResponseDTO(VarList.Created, "Student Saved", studentDTO));
                }
                case VarList.Not_Found -> {
                    return ResponseEntity.status(HttpStatus.NOT_FOUND)
                            .body(new ResponseDTO(VarList.Not_Found, "Student Not found", null));
                }
                default -> {
                    return ResponseEntity.status(HttpStatus.CREATED)
                            .body(new ResponseDTO(VarList.Internal_Server_Error, "Error while updating", null));
                }
            }
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDTO(VarList.Internal_Server_Error, e.getMessage(), null));
        }
    }

    @GetMapping("/getAllStudents")
    public ResponseEntity<ResponseDTO> getAllStudents() {
        try{
            List<StudentDTO> students = studentService.GetAllStudents();
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseDTO(VarList.OK,"suceess", students));
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDTO(VarList.Internal_Server_Error, e.getMessage(), null));
        }
    }

}
