import javax.swing.*;
import java.rmi.NotBoundException;
import java.rmi.RemoteException;
import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;

public class Client {
    private Client() {};

    public static void main(String[] args) throws RemoteException, NotBoundException {
        while (true) {
            //Get the input from the user
            String studentID = JOptionPane.showInputDialog("Nhập: ");
            if (studentID.matches("(.*)(^\\d{8}$)(.*)")) {
                //Get the RMI registry
                Registry registry = LocateRegistry.getRegistry();
                //Fetch the remote object (actually the stub) from the registry
                //lookup() returns an object of type remote, down cast it to the type StudentManagement
                StudentManagement stub = (StudentManagement) registry.lookup("StudentManagement");
                //Invoke the remote method
                JOptionPane.showMessageDialog(null, stub.getStudentData(studentID));
            }
            else if (studentID.replace(" ", "").matches("(.*)^(exit)(.*)")) {
                break;
            }
        }

    }
}
