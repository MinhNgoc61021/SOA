import socket

sk = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
# AF_INET

sk.bind((socket.gethostname(), 1024))

sk.listen(5)

while True:
    clientSocket, address = sk.accept()
    print(f'Kết nối đến { address } thành công')
    clientSocket.send(bytes('Kết nối thành công','utf-8'))
    message_rcv = clientSocket.recv(1024)
    print(message_rcv)
    clientSocket.close()