package com.pgl.energenius.utils;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailUtils {

    @Autowired
    private JavaMailSender javaMailSender;

    public void sendPasswordResetMail(String email, String token) throws MessagingException {

        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        helper.setTo(email);
        helper.setSubject("Reset Password Request");

        String resetUrl = "http://localhost:8080/reset-password?token=" + token;
        helper.setText("To reset your password, click on this link: " + resetUrl);

        javaMailSender.send(message);
    }
}
