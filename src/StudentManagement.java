import Student.Student;

import java.rmi.Remote;
import java.rmi.RemoteException;

public interface StudentManagement extends Remote {
    String getStudentData(String StudentID) throws RemoteException;
}
