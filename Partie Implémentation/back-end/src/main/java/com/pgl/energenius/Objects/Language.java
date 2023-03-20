package com.pgl.energenius.Objects;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "languages")
public class Language {

    @Id
    private String abbreviation;

    private String name;
}
