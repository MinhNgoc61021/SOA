import java.rmi.AlreadyBoundException;
import java.rmi.RemoteException;
import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;
import java.rmi.server.UnicastRemoteObject;
import Student.*;

public class Server implements StudentManagement {
    StudentList studentList = new StudentList();

    @Override
    public String getStudentData(String StudentID) throws RemoteException {
        String foundStudent = "Không tìm thấy sinh viên";
        for (Student student:
                studentList.getStudentList()) {
            if (StudentID.equals(student.getID())) {
                foundStudent = student.toString();
                break;
            }
        }
        return foundStudent;
    }

    public static void main(String[] args) throws AlreadyBoundException, RemoteException {
        Server obj = new Server();
        StudentManagement stub = (StudentManagement) UnicastRemoteObject.exportObject(obj, 5000);
        Registry registry = LocateRegistry.getRegistry();
        registry.bind("StudentManagement", stub);
    }
}
