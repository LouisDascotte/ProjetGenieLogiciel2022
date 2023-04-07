package com.pgl.energenius.Objects;

import com.pgl.energenius.Objects.DTOs.PortfolioDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Builder.Default;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

/**
 * The portfolio of a client
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "portfolios")
public class Portfolio {

    /**
     * The ID of the portfolio
     */
    @Id
    @Default
    private ObjectId id = new ObjectId();

    /**
     * The client that owns the portfolio
     */
    @DBRef(lazy = true)
    private Client client;

    /**
     * The address of the client that owns the portfolio
     */
    private String address;
    /**
     * The name of the portfolio
     */
    private String name;

    /**
     * The list of the supply points that are in the portfolio
     */
    @Default
    private List<SupplyPoint> supplyPoints = new ArrayList<>();

    public static PortfolioBuilder builder(PortfolioDto portfolioDto) {

        return builder()
                .address(portfolioDto.getAddress())
                .name(portfolioDto.getName());
    }

    public static PortfolioBuilder builder() {
        return new PortfolioBuilder();
    }
}
