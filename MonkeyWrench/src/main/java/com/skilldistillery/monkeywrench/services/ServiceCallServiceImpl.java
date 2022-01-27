package com.skilldistillery.monkeywrench.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.monkeywrench.entities.ServiceCall;
import com.skilldistillery.monkeywrench.repositories.ServiceCallRepository;

@Service
public class ServiceCallServiceImpl implements ServiceCallService{

	@Autowired
	private ServiceCallRepository serviceCallRepo;
	
	@Override
	public List<ServiceCall> getAllServiceCall() {
		return serviceCallRepo.findAll();
	}
	
	@Override
	public ServiceCall getServiceCallById(int serviceCallId) {
		return serviceCallRepo.findById(serviceCallId).get();
	}

	@Override
	public ServiceCall updateServiceCallById(ServiceCall sCall, int scId) {
		sCall.setId(scId);
		if(serviceCallRepo.existsById(scId)) {
			return serviceCallRepo.saveAndFlush(sCall);
		}
		return null;
	}
	
	@Override
	public ServiceCall createNewServiceCall(ServiceCall serviceCall) {
		serviceCall.setEstimate(false);
		serviceCall.setCompleted(false);
		return serviceCallRepo.save(serviceCall);
	}

	@Override
	public boolean deleteServiceCall(int scId) {
		boolean deleted = false;
		Optional<ServiceCall> op = serviceCallRepo.findById(scId);
		if(op.isPresent()) {
			ServiceCall sCall = op.get();
			serviceCallRepo.delete(sCall);
			deleted = true;
		}
		return deleted;
	}





}
