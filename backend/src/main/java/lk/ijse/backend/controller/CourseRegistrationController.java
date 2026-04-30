package lk.ijse.backend.controller;

import lk.ijse.backend.dto.CourseDTO;
import lk.ijse.backend.dto.CourseRegistrationDTO;
import lk.ijse.backend.dto.ResponseDTO;
import lk.ijse.backend.service.CourseRegistrationService;
import lk.ijse.backend.util.VarList;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/registration")
@CrossOrigin
@RequiredArgsConstructor
public class CourseRegistrationController {

    private final CourseRegistrationService courseRegistrationService;

    @PostMapping("/courseRegister")
    public ResponseEntity<ResponseDTO> CourseRegister(@RequestBody CourseRegistrationDTO courseRegistrationDTO) {
        try{
            int response = courseRegistrationService.StudentCourseRegistration(courseRegistrationDTO);
            switch (response) {
                case VarList.Created -> {
                    return ResponseEntity.status(HttpStatus.CREATED)
                            .body(new ResponseDTO(VarList.Created, "Registration Successfully", courseRegistrationDTO));
                }
                case VarList.Conflict -> {
                    return ResponseEntity.status(HttpStatus.CONFLICT)
                            .body(new ResponseDTO(VarList.Conflict, "Registration Already exists", null));
                }
                case VarList.Not_Found -> {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                            .body(new ResponseDTO(VarList.Not_Found, "Student or Course not found", null));
                }
                default -> {
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                            .body(new ResponseDTO(VarList.Internal_Server_Error, "Error While Saving", null));
                }
            }
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDTO(VarList.Internal_Server_Error, e.getMessage(), null));
        }
    }

    @GetMapping("/getAllRegistrations")
    public ResponseEntity<ResponseDTO> getAllRegistrations() {
        try{
            List<CourseRegistrationDTO> courseRegistrationDTO = courseRegistrationService.getAllRegistrations();
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseDTO(VarList.OK,"success", courseRegistrationDTO));
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDTO(VarList.Internal_Server_Error, e.getMessage(), null));
        }
    }
    @GetMapping("/user/{id}")
    public ResponseEntity<ResponseDTO> getRegistrationsByUser(@PathVariable Long id) {
        List<CourseRegistrationDTO> list = courseRegistrationService.findByStudentId(id);
        return ResponseEntity.status(HttpStatus.OK)
                .body(new ResponseDTO(VarList.OK, "Success", list));
    }

    @GetMapping("/count")
    public ResponseEntity<ResponseDTO> getCount() {
        try {
            long count = courseRegistrationService.getRegisterCount();
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseDTO(VarList.OK, "Success", count));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDTO(VarList.Internal_Server_Error, e.getMessage(), null));
        }
    }
}
