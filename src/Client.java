import javax.swing.*;
import java.rmi.NotBoundException;
import java.rmi.RemoteException;
import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;

public class Client {
    private Client() {};

    public static void main(String[] args) throws RemoteException, NotBoundException {
        while (true) {
            String studentID = JOptionPane.showInputDialog("Nhập: ");
            if (studentID.matches("(.*)(^\\d{8}$)(.*)")) {
                Registry registry = LocateRegistry.getRegistry();
                StudentManagement stub = (StudentManagement) registry.lookup("StudentManagement");
                JOptionPane.showMessageDialog(null, stub.getStudentData(studentID));
            }
            else if (studentID.replace(" ", "").matches("(.*)^(exit)(.*)")) {
                break;
            }
        }

    }
}
