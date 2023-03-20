package com.pgl.energenius.Objects;

import lombok.AllArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * The languages used by the app
 */
@AllArgsConstructor
@Document(collection = "languages")
public class Language {

    /**
     * The abbreviation of the language
     */
    @Id
    private String abbreviation;

    /**
     * The name of the language
     */
    private String name;
}
