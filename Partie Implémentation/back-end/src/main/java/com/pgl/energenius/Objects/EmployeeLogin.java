package com.pgl.energenius.Objects;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@AllArgsConstructor
@Document(collection = "employee_logins")
/**
 * The login informations of an employee
 */
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
