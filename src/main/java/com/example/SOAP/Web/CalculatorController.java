package com.example.SOAP.Web;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
public class CalculatorController {

    @GetMapping("/calculating")
    public String greetingForm(Model model) {
        model.addAttribute("sum", new Sum());
        return "form";
    }

    @PostMapping("/result")
    public String greeting(@ModelAttribute Sum sum) {
        return "result";
    }
}
