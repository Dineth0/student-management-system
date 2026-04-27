package lk.ijse.backend.service;

import lk.ijse.backend.dto.CourseDTO;
import lk.ijse.backend.entity.Course;

import java.util.List;

public interface CourseService {
    int addCourse(CourseDTO courseDTO);

}
