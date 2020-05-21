package com.example.SOAP;

import org.springframework.ws.server.endpoint.annotation.Endpoint;
import org.springframework.ws.server.endpoint.annotation.PayloadRoot;
import org.springframework.ws.server.endpoint.annotation.RequestPayload;
import org.springframework.ws.server.endpoint.annotation.ResponsePayload;
import main.com.example.SOAP.GetSumRequest;
import main.com.example.SOAP.GetSumResponse;

// Đăng ký class với Spring WS rằng class sẽ được sử dụng để xử lý request gửi đến
@Endpoint
public class CalculatorEndpoint {
    private static final String NAMESPACE_URI = "http://soa.com/soap/calculator";

    // Chọn method nào để xử lý request (ở đây là method Integer sum()), tùy thuộc vào namespace và localPart của message gửi đến
    @PayloadRoot(namespace = NAMESPACE_URI, localPart = "getSumRequest")

    @ResponsePayload
    public GetSumResponse sum(@RequestPayload GetSumRequest request) {
        GetSumResponse response = new GetSumResponse();
        response.setResult(request.getFirstNumber() + request.getSecondNumber());
        response.setError(null);
        return response;
    }
}