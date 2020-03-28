import javax.swing.*;
import java.rmi.NotBoundException;
import java.rmi.RemoteException;
import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;

public class Client {
    private Client() {};

    public static void main(String[] args) throws RemoteException, NotBoundException {
        String studentID = JOptionPane.showInputDialog("Nhập vào MSSV: ", "Ô nhập");
        Registry registry = LocateRegistry.getRegistry();
        StudentManagement stub = (StudentManagement) registry.lookup("StudentManagement");
        JOptionPane.showMessageDialog(null, stub.getStudentData(studentID));
    }
}
