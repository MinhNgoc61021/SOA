import socket
import pickle

sk = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

sk.connect((socket.gethostname(), 1125))
# socket.gethostname because the data is being send and received on the same machine


while True:
    msg = sk.recv(1024)  # this is the buffer, 1024 is the size of the data chunk
    print(msg.decode('utf-8'))
    search = True
    while True:
        if msg.decode('utf-8') == 'Kết nối server thành công':
            student_id = input(f"Nhập tìm kiếm MSSV: ")
            sk.send(bytes(student_id, 'utf-8'))
            new_msg = sk.recv(1024)
            decoded_msg = pickle.loads(new_msg)
            if decoded_msg[1]['status'] == 'Found!':
                print(f"Tồn tại sinh viên! "
                      f"\nMSSV: {decoded_msg[0]['ID']}"
                      f"\nHọ và Tên: {decoded_msg[0]['Name']}"
                      f"\nKhóa: {decoded_msg[0]['Course']} "
                      f"\nSDT: {decoded_msg[0]['Phone number']}"
                      f"\nEmail: {decoded_msg[0]['Email']}"
                      f"\nĐịa chỉ: {decoded_msg[0]['Address']}")
                search = False
            elif decoded_msg[1]['status'] == 'Not found!':
                print(f"Không tìm thấy sinh viên có MSSV {student_id}!")
                search = False
