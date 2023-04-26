package com.pgl.energenius.controller;

import com.pgl.energenius.exception.InvalidUserDetailsException;
import com.pgl.energenius.exception.ObjectNotFoundException;
import com.pgl.energenius.exception.ObjectNotValidatedException;
import com.pgl.energenius.exception.UnauthorizedAccessException;
import com.pgl.energenius.service.NotificationService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * The NotificationController class handles all HTTP requests related to notification
 */
@RestController
@RequestMapping("/api/notification")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    /**
     * PUT method to put a notification the current authenticated user as read.
     *
     * @return OK and Authenticated user's notification was changed to read. Otherwise, an appropriate HTTP status code.
     */
    @PutMapping("/{id}/read")
    public ResponseEntity<?> readNotification(@PathVariable("id") ObjectId notificationId) {

        try {
            notificationService.readNotification(notificationId);
            return ResponseEntity.ok().build();

        } catch (ObjectNotValidatedException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());

        } catch (ObjectNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());

        } catch (UnauthorizedAccessException | InvalidUserDetailsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * GET method to get the notification of the current authenticated user.
     *
     * @return OK and authenticated user's notifications if successful. Otherwise, an appropriate HTTP status code.
     */
    @GetMapping("/all")
    public ResponseEntity<?> getNotifications() {

        try {
            return new ResponseEntity<>(notificationService.getNotifications(), HttpStatus.OK);

        } catch (UnauthorizedAccessException | InvalidUserDetailsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * DELETE method to delete a notification of the current authenticated user.
     *
     * @return OK if successfully deleted notification. Otherwise, an appropriate HTTP status code.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteNotification(@PathVariable("id") ObjectId notificationId) throws ObjectNotFoundException, UnauthorizedAccessException, InvalidUserDetailsException {

        notificationService.deleteNotification(notificationId);
        return ResponseEntity.ok().build();
    }
}
