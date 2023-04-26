package com.pgl.energenius.model.notification;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder.Default;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

/**
 * The Notification class represents a notification.
 */
@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@Document("notifications")
public class Notification {

    @Id
    @Default
    private ObjectId id = new ObjectId();

    @NotNull
    private ObjectId senderId;

    @NotNull
    private ObjectId receiverId;

    @NotNull
    @Default
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private Date date = new Date();

    @NotNull
    private Type type;

    @NotNull
    @Default
    private Status status = Status.UNREAD;

    /**
     * The Status enum represents the status of the notification
     */
    public enum Status {
        UNREAD,
        READ
    }

    /**
     * The Status enum represents the type of the notification
     */
    public enum Type {
        READING_NOTIFICATION,
        CONTRACT_REQUEST_NOTIFICATION,
        ACCEPT_CONTRACT_NOTIFICATION,
        CANCEL_CONTRACT_REQUEST_NOTIFICATION,
        END_CONTRACT_NOTIFICATION,
        CANCEL_CONTRACT_NOTIFICATION,
        LINK_METER_NOTIFICATION,
        UNLINK_METER_NOTIFICATION,
        PRODUCTION_POINT_REQUEST_NOTIFICATION,
        PRODUCTION_POINT_ACCEPTED_NOTIFICATION,
        GREEN_CERTIFICATE_REQUEST_NOTIFICATION,
        GREEN_CERTIFICATE_ACCEPTED_NOTIFICATION,
        READING_REJECTED_NOTIFICATION,
        READING_MODIFIED_NOTIFICATION
    }
}
