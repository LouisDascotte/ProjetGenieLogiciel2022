package com.pgl.energenius.model.notification;

import com.pgl.energenius.model.reading.Reading;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.springframework.data.mongodb.core.mapping.DBRef;

@EqualsAndHashCode(callSuper = true)
@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class ReadingNotification extends Notification {

    private String EAN;

    @DBRef
    private Reading reading;
}
