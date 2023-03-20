package com.pgl.energenius.Objects;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "languages")
/**
 * The languages used by the app
 */
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
