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

        studentList.add(new Student("17021300",
                "Nguyễn Ngọc Minh",
                "K62-CACLC2",
                "0969535735",
                "17021300@vnu.edu.vn",
                "Hanoi, Vietnam"));

        studentList.add(new Student("17021300",
                "Nguyễn Ngọc Minh",
                "K62-CACLC2",
                "0969535735",
                "17021300@vnu.edu.vn",
                "Hanoi, Vietnam"));

    }

    public List<Student> getStudentList() {
        return studentList;
    }
}
