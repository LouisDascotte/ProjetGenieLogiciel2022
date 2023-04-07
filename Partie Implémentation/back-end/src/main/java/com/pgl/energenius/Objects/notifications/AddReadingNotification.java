package com.pgl.energenius.Objects.notifications;

import com.pgl.energenius.Objects.Meter;
import com.pgl.energenius.Objects.Reading;
import lombok.*;
import lombok.experimental.SuperBuilder;

@EqualsAndHashCode(callSuper = true)
@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class AddReadingNotification extends Notification {

    private Meter meter;

    private Reading reading;
}
