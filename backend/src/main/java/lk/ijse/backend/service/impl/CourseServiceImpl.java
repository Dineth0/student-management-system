package lk.ijse.backend.service.impl;

import lk.ijse.backend.dto.CourseDTO;
import lk.ijse.backend.entity.Course;
import lk.ijse.backend.repo.CourseRepo;
import lk.ijse.backend.service.CourseService;
import lk.ijse.backend.util.VarList;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CourseServiceImpl implements CourseService {

    private final CourseRepo courseRepo;
    private final ModelMapper modelMapper;

    @Override
    public int addCourse(CourseDTO courseDTO) {
        if(courseDTO.getId() != null && courseRepo.existsById(courseDTO.getId())){
            return VarList.Conflict;
        }else {
            try{
                courseRepo.save(modelMapper.map(courseDTO, Course.class));
                return VarList.Created;
            }catch (Exception e){
                return VarList.Internal_Server_Error;
            }
        }
    }

    @Override
    public int updateCourse(CourseDTO courseDTO) {
        try{
            if(courseDTO.getId() != null && courseRepo.existsById(courseDTO.getId())){
                courseRepo.save(modelMapper.map(courseDTO, Course.class));
                return VarList.Updated;
            }else {
                return VarList.Not_Found;
            }
        }catch (Exception e){
            return VarList.Internal_Server_Error;
        }

    }

    @Override
    public int deleteCourse(Long id) {
        try{
            if(courseRepo.existsById(id)){
                courseRepo.deleteById(id);
                return VarList.OK;
            }else {
                return VarList.Not_Found;
            }
        }catch (Exception e){
            return VarList.Internal_Server_Error;
        }
    }
}
