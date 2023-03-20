package com.pgl.energenius.Objects;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.bson.types.ObjectId;

import java.util.Date;

/**
 * Notification
 */
@Data
@AllArgsConstructor
public class Notification {

    /**
     * The ID of the person who sends the notification
     */
    private ObjectId senderId;

    /**
     * The date at which the notification was sent
     */
    private Date date;

    /**
     * The content of the notification
     */
    private String content;
}
