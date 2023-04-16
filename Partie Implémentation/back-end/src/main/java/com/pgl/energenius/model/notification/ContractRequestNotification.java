package com.pgl.energenius.model.notification;

import com.pgl.energenius.model.contract.Contract;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.springframework.data.mongodb.core.mapping.DBRef;

@EqualsAndHashCode(callSuper = true)
@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class ContractRequestNotification extends Notification {

    @DBRef(lazy = true)
    public Contract contract;
}
