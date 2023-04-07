package com.pgl.energenius.Objects.notifications;

import lombok.AllArgsConstructor;
import lombok.Builder.Default;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

/**
 * Notification
 */
@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@Document("notifications")
public class Notification {

    /**
     * The ID of the person who sends the notification
     */
    private ObjectId senderId;

    /**
     * The ID of the person who receives the notification
     */
    private ObjectId receiverId;

    /**
     * The date at which the notification was sent
     */
    @Default
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private Date date = new Date();

    /**
     * The message of the notification
     */
    @Default
    private Type type = Type.NOTIFICATION;

    @Default
    private Status status = Status.UNREAD;

    public enum Status {
        UNREAD,
        READ
    }

    public enum Type {
        READING_NOTIFICATION,
        NOTIFICATION
    }
}
