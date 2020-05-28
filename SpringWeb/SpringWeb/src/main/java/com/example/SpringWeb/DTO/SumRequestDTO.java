package com.example.SpringWeb.DTO;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
public class SumRequestDTO {
    @Getter
    @Setter
    private int firstNumber;
    @Getter
    @Setter
    private int secondNumber;
}
