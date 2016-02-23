package com.girltest.util;

/**
 * Created by huangweii on 2015/12/27.
 */
public class ConventionUtil {
    public static String convertBr(String input) {
        return input.replaceAll("\r\n", "<br>").replaceAll("\n", "<br>");
    }
}
