package com.pgl.energenius.Objects;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * The login informations of an employee
 */
@Data
@AllArgsConstructor
@Document(collection = "employee_logins")
public class EmployeeLogin {

    /**
     * The ID of the employee
     */
    @Id
    private String loginId;

    /**
     * The password of the employee
     */
    private String password;

    /**
     * The employee that owns those login infos
     */
    @DBRef(lazy = true)
    private Employee employee;
}
