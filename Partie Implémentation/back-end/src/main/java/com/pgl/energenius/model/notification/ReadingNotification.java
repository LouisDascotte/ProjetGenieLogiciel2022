package com.pgl.energenius.model.notification;

import com.pgl.energenius.model.Meter;
import com.pgl.energenius.model.Reading;
import lombok.*;
import lombok.experimental.SuperBuilder;

@EqualsAndHashCode(callSuper = true)
@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class ReadingNotification extends Notification {

    private Meter meter;

    private Reading reading;
}
