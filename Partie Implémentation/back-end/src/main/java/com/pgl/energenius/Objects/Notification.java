package com.pgl.energenius.Objects;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.bson.types.ObjectId;

import java.util.Date;

@Data
@AllArgsConstructor
public class Notification {

    private ObjectId senderId;
    private Date date;
    private String content;
}
