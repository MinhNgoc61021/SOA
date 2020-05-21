package com.example.SOAP.Web;

public class Sum {
    private int a;
    private int b;
    private int c;
    private int sum;

    public int getA() {
        return a;
    }

    public void setA(int a) {
        this.a = a;
    }

    public int getB() {
        return b;
    }

    public void setB(int b) {
        this.b = b;
    }

    public int getC() {
        return c;
    }

    public int getSum() {
        return this.a + this.b + this.c;
    }

    public void setC(int c) {
        this.c = c;
    }
}
