package com.pgl.energenius.service;

import com.pgl.energenius.config.WebSecurityConfig;
import com.pgl.energenius.exception.InvalidUserDetailsException;
import com.pgl.energenius.exception.ObjectNotFoundException;
import com.pgl.energenius.model.contract.Contract;
import com.pgl.energenius.model.dto.SupplierLoginDto;
import com.pgl.energenius.exception.ObjectNotValidatedException;
import com.pgl.energenius.model.Supplier;
import com.pgl.energenius.model.SupplierLogin;
import com.pgl.energenius.model.dto.SupplierPreferenceDto;
import com.pgl.energenius.model.projection.ClientProjection;
import com.pgl.energenius.repository.ClientRepository;
import com.pgl.energenius.repository.ContractRepository;
import com.pgl.energenius.repository.SupplierRepository;
import com.pgl.energenius.utils.SecurityUtils;
import com.pgl.energenius.utils.ValidationUtils;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SupplierService {

    @Autowired
    private AuthenticationProvider authenticationProvider;

    @Autowired
    private SupplierRepository supplierRepository;

    @Autowired
    private ValidationUtils validationUtils;

    @Autowired
    private SecurityUtils securityUtils;

    @Autowired
    private UserService userService;

    @Autowired
    private ContractRepository contractRepository;

    @Autowired
    private ClientRepository clientRepository;

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

    public Supplier editPreferences(SupplierPreferenceDto supplierPreferenceDto) throws InvalidUserDetailsException, ObjectNotValidatedException {

        SupplierLogin supplierLogin = securityUtils.getCurrentSupplierLogin();
        Supplier supplier = supplierLogin.getSupplier();

        if (supplierPreferenceDto.getLang() != supplier.getLang()) {
            supplier.setLang(supplierPreferenceDto.getLang());
            saveSupplier(supplier);
        }

        if (supplierPreferenceDto.getNew_password() != null && WebSecurityConfig.passwordEncoder().matches(supplierPreferenceDto.getOld_password(), supplierLogin.getPassword())) {
            supplierLogin.setPassword(WebSecurityConfig.passwordEncoder().encode(supplierPreferenceDto.getNew_password()));
            userService.saveUser(supplierLogin);
        }
        return supplier;
    }

    public List<ClientProjection> getClientsNameAndId() throws InvalidUserDetailsException {

        Supplier supplier = securityUtils.getCurrentSupplierLogin().getSupplier();

        List<Contract> contracts = contractRepository.findBySupplierId(supplier.getId());
        List<ObjectId> clientIds = contracts.stream().map(Contract::getClientId).collect(Collectors.toList());

        return clientRepository.findAllByIdIn(clientIds, ClientProjection.class);
    }
}
