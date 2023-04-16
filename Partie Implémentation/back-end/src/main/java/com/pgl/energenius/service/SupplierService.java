package com.pgl.energenius.service;

import com.pgl.energenius.exception.ObjectNotFoundException;
import com.pgl.energenius.model.dto.SupplierLoginDto;
import com.pgl.energenius.exception.ObjectNotValidatedException;
import com.pgl.energenius.model.Supplier;
import com.pgl.energenius.model.SupplierLogin;
import com.pgl.energenius.repository.SupplierRepository;
import com.pgl.energenius.utils.ValidationUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
public class SupplierService {

    @Autowired
    private AuthenticationProvider authenticationProvider;

    @Autowired
    private SupplierRepository supplierRepository;

    @Autowired
    private ValidationUtils validationUtils;

    public Supplier insertSupplier(Supplier supplier) throws ObjectNotValidatedException {

        validationUtils.validate(supplier);
        return supplierRepository.insert(supplier);
    }

    public void saveSupplier(Supplier supplier) throws ObjectNotValidatedException {

        validationUtils.validate(supplier);
        supplierRepository.save(supplier);
    }

    public SupplierLogin authenticateSupplier(SupplierLoginDto supplierLoginDto) {

        Authentication auth = authenticationProvider.authenticate(
                new UsernamePasswordAuthenticationToken(supplierLoginDto.getLoginId(), supplierLoginDto.getPassword()));

        return (SupplierLogin) auth.getPrincipal();
    }

    public Supplier getSupplierByName(String name) throws ObjectNotFoundException {

        return supplierRepository.findByName(name)
                .orElseThrow(() -> new ObjectNotFoundException("Supplier not found with name: " + name));
    }
}
