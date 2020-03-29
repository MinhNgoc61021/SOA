import Student.Student;

import java.rmi.Remote;
import java.rmi.RemoteException;

//Firstly, define the remote interface
// The remote interface design determines the types of parameters and return values for these methods
public interface StudentManagement extends Remote {
    String getStudentData(String StudentID) throws RemoteException;
}
