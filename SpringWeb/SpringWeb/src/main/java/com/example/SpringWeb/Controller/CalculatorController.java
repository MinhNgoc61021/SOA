package com.example.SpringWeb.Controller;

import com.example.SpringWeb.DTO.SumRequestDTO;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/calculating")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class CalculatorController {
    @PostMapping("/sum")
    public int sum(@RequestBody SumRequestDTO request) {
        return request.getFirstNumber() + request.getSecondNumber();
    }

    @GetMapping("/sqr/{number}")
    public double sqr(@PathVariable("number") Integer number) {
        return Math.pow(number, 2);
    }
}
