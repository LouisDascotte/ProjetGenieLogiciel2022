package com.pgl.energenius.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;


@DataMongoTest
public class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

//    @Test
//    public void test_findByEmail() {

//        ClientLogin clientLogin = new ClientLogin("test@test", "", null);
//
//        userRepository.insert(clientLogin);
//
//        Optional<ClientLogin> clientLoginOptional = userRepository.findByEmail("test@test");
//        assertTrue(clientLoginOptional.isPresent());
//        assertEquals(clientLogin, clientLoginOptional.get());
//    }

//    @Test
//    public void test_findByLoginId() {

//        EmployeeLogin employeeLogin = new EmployeeLogin("1234567", "", null);
//
//        userRepository.insert(employeeLogin);
//
//        Optional<EmployeeLogin> employeeLoginOptional = userRepository.findByLoginId("1234567");
//        assertTrue(employeeLoginOptional.isPresent());
//        assertEquals(employeeLogin, employeeLoginOptional.get());
//    }
}
