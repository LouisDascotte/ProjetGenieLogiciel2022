package com.pgl.energenius.utils;

import com.pgl.energenius.exception.DateFormatException;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class DateUtils {

    public static void validateDateFormat(String dateStr) throws DateFormatException {

        try {
            LocalDate.parse(dateStr, DateTimeFormatter.ISO_DATE);

        } catch (Exception e) {
            throw new DateFormatException("The format of the date is not correct");
        }
    }
}
