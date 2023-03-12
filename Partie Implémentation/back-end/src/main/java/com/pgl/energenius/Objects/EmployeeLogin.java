package com.pgl.energenius.Objects;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@AllArgsConstructor
@Document(collection = "employee_logins")
public class EmployeeLogin {

    @Id
    private String loginId;

    private String password;

    @DBRef(lazy = true)
    private Employee employee;
}
