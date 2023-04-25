package com.pgl.energenius.utils;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.util.Properties;

@Service
public class EmailUtils {

    @Autowired
    private JavaMailSender javaMailSender;

    public void sendPasswordResetMail(String email, String token) throws MessagingException {

        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        helper.setTo(email);
        helper.setSubject("Reset Password Request");

        String resetUrl = "http://localhost:3000/create-pass/" + token;
        helper.setText("To reset your password, click on this link: " + resetUrl);

        javaMailSender.send(message);
    }

    public void sendExceedThreshold(String email, String EAN) throws MessagingException {

        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        helper.setTo(email);
        helper.setSubject("Production threshold");
        helper.setText("The production threshold of the production point " + EAN + "is exceeded. You can ask for a green certificate.");

        javaMailSender.send(message);
    }
}
