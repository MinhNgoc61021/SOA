package Student;

import java.util.ArrayList;
import java.util.List;

public class StudentList {
    private List<Student> studentList = new ArrayList<Student>();

    public StudentList() {
        studentList.add(new Student("17021300",
                "Nguyễn Ngọc Minh",
                "K62-CACLC2",
                "0969535735",
                "17021300@vnu.edu.vn",
                "Hanoi, Vietnam"));

        studentList.add(new Student("17021304",
                "Nguyễn Nam",
                "K62-CACLC2",
                "0969535735",
                "17021304@vnu.edu.vn",
                "Hanoi, Vietnam"));

        studentList.add(new Student("17021306",
                "Phạm Công Nam",
                "K62-CACLC2",
                "0969535735",
                "17021306@vnu.edu.vn",
                "Hanoi, Vietnam"));
        studentList.add(new Student("17021307",
                "Tên gì đó",
                "K62-CACLC2",
                "0969535735",
                "17021307@vnu.edu.vn",
                "Hanoi, Vietnam"));

    }

    public List<Student> getStudentList() {
        return studentList;
    }
}
