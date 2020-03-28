package Student;

public class Student {
    private String ID;
    private String Name;
    private String Course;
    private String phoneNumber;
    private String Email;
    private String Address;

    public Student(String ID, String name, String course, String phoneNumber, String email, String address) {
        this.ID = ID;
        this.Name = name;
        this.Course = course;
        this.phoneNumber = phoneNumber;
        this.Email = email;
        this.Address = address;
    }

    public String getID() {
        return ID;
    }

    public String getName() {
        return Name;
    }

    public String getCourse() {
        return Course;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public String getEmail() {
        return Email;
    }

    public String getAddress() {
        return Address;
    }

    @Override
    public String toString() {
        return "Thông tin tìm thấy: " +
                "MSSV: " + ID +
                ", Tên: " + Name +
                ", Lớp: " + Course +
                ", SDT: " + phoneNumber +
                ", Email: " + Email +
                ", Địa chỉ: " + Address;
    }
}
