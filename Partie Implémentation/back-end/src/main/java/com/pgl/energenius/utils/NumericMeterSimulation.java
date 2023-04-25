package com.pgl.energenius.utils;

import com.pgl.energenius.enums.HourType;
import com.pgl.energenius.enums.MeterType;
import com.pgl.energenius.model.Meter;
import com.pgl.energenius.model.reading.DoubleReading;
import com.pgl.energenius.model.reading.Reading;
import com.pgl.energenius.model.reading.SimpleReading;
import com.pgl.energenius.repository.MeterRepository;
import com.pgl.energenius.repository.ReadingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

@Component
public class NumericMeterSimulation {

    @Autowired
    private MeterRepository meterRepository;

    @Autowired
    private ReadingRepository readingRepository;

    @Scheduled(cron = "5 0 * * ?")
    public void simulateNumericReadings() {

        LocalDate now = LocalDate.now();
        String dateNow = now.format(DateTimeFormatter.ISO_DATE);
        String yesterday = now.minusDays(1).format(DateTimeFormatter.ISO_DATE);
        String twoDaysAgo = now.minusDays(2).format(DateTimeFormatter.ISO_DATE);

        List<Meter> meters = meterRepository.findByMeterType(MeterType.NUMERIC);

        for (Meter m : meters) {

            if (m.getStatus() != Meter.Status.AFFECTED) {
                continue;
            }

            Optional<Reading> lastReading = readingRepository.findByEANAndDate(m.getEAN(), yesterday);
            Optional<Reading> beforeLastReading = readingRepository.findByEANAndDate(m.getEAN(), twoDaysAgo);

            Reading reading;

            if (m.getHourType() == HourType.SIMPLE) {

                int value = 0;
                int delta;

                if (lastReading.isPresent()) {
                    value = ((SimpleReading) lastReading.get()).getValue();
                }

                if (beforeLastReading.isPresent()) {
                    delta = value - ((SimpleReading) beforeLastReading.get()).getValue();
                } else {
                    delta = (int) Math.round(Math.random() * (10 - 1) + 1);
                }

                int newVal = (int) Math.round(value + delta * (Math.random() * (1.3 - 0.7) + 0.7));

                reading = SimpleReading.builder()
                        .EAN(m.getEAN())
                        .date(dateNow)
                        .status(Reading.Status.ACCEPTED)
                        .value(newVal)
                        .build();

            } else {

                int dayValue = 0;
                int nightValue = 0;
                int dayDelta;
                int nightDelta;

                if (lastReading.isPresent()) {
                    dayValue = ((DoubleReading) lastReading.get()).getDayValue();
                    nightValue = ((DoubleReading) lastReading.get()).getNightValue();
                }

                if (beforeLastReading.isPresent()) {
                    dayDelta = dayValue - ((DoubleReading) beforeLastReading.get()).getDayValue();
                    nightDelta = nightValue - ((DoubleReading) beforeLastReading.get()).getNightValue();

                } else {
                    dayDelta = (int) Math.round(Math.random() * (10 - 1) + 1);
                    nightDelta = (int) Math.round(Math.random() * (10 - 1) + 1);
                }

                int newDayVal = (int) Math.round(dayValue + dayDelta * (Math.random() * (1.3 - 0.7) + 0.7));
                int newNightVal = (int) Math.round(nightDelta + nightDelta * (Math.random() * (1.3 - 0.7) + 0.7));

                reading = DoubleReading.builder()
                        .EAN(m.getEAN())
                        .date(dateNow)
                        .status(Reading.Status.ACCEPTED)
                        .dayValue(newDayVal)
                        .nightValue(newNightVal)
                        .build();
            }
            readingRepository.insert(reading);
        }
    }
}
