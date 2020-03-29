import java.rmi.AlreadyBoundException;
import java.rmi.RemoteException;
import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;
import java.rmi.server.UnicastRemoteObject;
import Student.*;

//Secondly, declare a remote object that implements the remote interface
public class Server implements StudentManagement {
    private StudentList studentList = new StudentList();

    //Implementing the remote method
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
        // RMI passes the stub as a representative for the remote object (instead of the remote object itself)
        StudentManagement stub = (StudentManagement) UnicastRemoteObject.exportObject(obj, 5000);

        //Binding the stub in the registry
        Registry registry = LocateRegistry.getRegistry();
        registry.bind("StudentManagement", stub);
    }
}
